import express from 'express';
import { createOrder, updateOrderPayment, getOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.post('/update-payment', updateOrderPayment);
router.get('/:orderId', getOrder);

export default router;
