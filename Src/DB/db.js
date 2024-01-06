import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();


const connectDB=async()=>{
    try {
        const q= await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`db connected @ ${q.connection.host}`);
        
    } catch (error) {
        console.log("MOngoErr",error);
        process.exit(1);
    }
}

export default connectDB;