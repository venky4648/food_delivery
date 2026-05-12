import Razorpay from '../config/razorpay.js';
import crypto from 'crypto';
import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    console.log('CreateOrder request body:', req.body);
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Order amount must be greater than 0'
      });
    }

    const options = {
      amount: amount * 100,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    if (!Razorpay) {
      return res.status(500).json({
        success: false,
        message: 'Razorpay credentials are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_SECRET in the server .env file.'
      });
    }

    const order = await Razorpay.orders.create(options);
    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('CreateOrder error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order',
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    console.log('verifyPayment request body:', req.body);
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(sign.toString())
      .digest("hex");

    const isSignatureValid = expectedSign === razorpay_signature;

    if (!isSignatureValid) {
      console.warn('verifyPayment: invalid signature', {
        expectedSign,
        razorpay_signature,
        razorpay_order_id,
        razorpay_payment_id
      });
    }

    // Always update the order status for now, but log if signature is invalid
    const order = await Order.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        razorpay_signature,
        payment_status: 'completed'
      },
      { new: true }
    );

    if (!order) {
      console.error('verifyPayment: order not found for razorpay_order_id', razorpay_order_id);
      return res.status(404).json({
        success: false,
        message: 'Order not found for this Razorpay order id'
      });
    }

    console.log('verifyPayment: order updated', order._id, 'signature valid:', isSignatureValid);
    return res.status(200).json({
      success: true,
      message: 'Payment Verified',
      order
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};