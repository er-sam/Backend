import mongoose, { Schema } from "mongoose";

const offerSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    distcount:{
        type : Number,
        required : true
    }
},{timestamps:true})

export const Offer = mongoose.model("Offer",offerSchema);