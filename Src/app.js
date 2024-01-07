import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'
import dotenv from 'dotenv'
import userRouter from './Routes/userRoute.js'
import orderRoute from './Routes/orderRoute.js'
import productRoute from './Routes/productRoute.js'
const app = express();
dotenv.config()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    Credential : true
}))
app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookiesParser());

app.use('/api/v1/auth',userRouter);
app.use('/api/v1/order',orderRoute);
app.use('/api/v1/category',productRoute);
app.use('/api/v1/product',productRoute);

export {app};