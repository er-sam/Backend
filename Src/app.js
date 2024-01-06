import express from 'express'
import cors from 'cors'
import cookiesParser from 'cookie-parser'
import dotenv from 'dotenv'
import UserRouter from './Routes/userRoute.js'
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

app.use('/api/v1/auth',UserRouter);



export {app};