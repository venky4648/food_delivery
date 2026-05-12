import Razorpay from 'razorpay';

const { RAZORPAY_KEY_ID, RAZORPAY_SECRET } = process.env;
let razorpay = null;

if (RAZORPAY_KEY_ID && RAZORPAY_SECRET) {
  razorpay = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_SECRET,
  });
} else {
  console.warn('Razorpay credentials are missing. Set RAZORPAY_KEY_ID and RAZORPAY_SECRET in .env to enable payment routes.');
}

export default razorpay;
