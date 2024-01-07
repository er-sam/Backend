import mongoose, { Schema } from "mongoose";


const sellerSchema = new Schema({
    profile :{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    role :{
        type : Boolean,
        required : true,
        default : 1
    },
    total_earn:{
        type : Number,
        trim : true
    },
    gstn :{
        type : String,
        trim : true
    },
    pan :{
        type : String,
        trim : true
    },
    resident : {
        type : String,
        required : true
    }
},{timestamps:true})


export const Seller = mongoose.model("Seller",sellerSchema);