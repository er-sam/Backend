import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new Schema({
    name :{
        type : String,
        required : true,
    },
    price :{
        type : Number,
        required : true
    },
    brand:{
        type : String,
        required : true,
        trim : true
    },
    image:{
        type : String,
        required : true,
        trim : true
    },
    category:{
        type : String,
        required : true,
        trim : true
    },
    owner :{
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    discount :{
        type : Number,
        trim : true,
        default : 0
    },
},{timestamps:true})

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product",productSchema);