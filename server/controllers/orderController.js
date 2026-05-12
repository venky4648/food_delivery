import Order from '../models/orderModel.js';

export const createOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      region,
      zip,
      country,
      items,
      amount,
      razorpay_order_id
    } = req.body;

    if (!firstName || !lastName || !email || !phone || !razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const order = await Order.create({
      firstName,
      lastName,
      email,
      phone,
      street,
      city,
      region,
      zip,
      country,
      items,
      amount,
      razorpay_order_id,
      payment_status: 'pending'
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      orderId: order._id
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create order'
    });
  }
};

export const updateOrderPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    console.log('updateOrderPayment request body:', req.body);

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
      console.error('updateOrderPayment: order not found for razorpay_order_id', razorpay_order_id);
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    console.log('updateOrderPayment: order updated', order._id);
    res.status(200).json({
      success: true,
      message: 'Order payment updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update order'
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch order'
    });
  }
};
