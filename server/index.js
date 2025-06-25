import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import signInRoute from './routes/userRoute.js';
import { connectDB } from './config/db.js';

const app = express();
const port = 3000;
connectDB()
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', signInRoute);

app.listen(port, () => {
    console.log(`server is running ${port}`);
});