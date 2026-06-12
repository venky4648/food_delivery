import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import signInRoute from './routes/userRoute.js';
import paymentRoutes from './routes/paymentRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import foodRouter from './routes/foodRoute.js';
import { connectDB } from './config/db.js';

const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', signInRoute);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));

app.listen(port, () => {
    console.log(`server is running ${port}`);
});