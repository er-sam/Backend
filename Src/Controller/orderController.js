import { User } from "../Model/User.modal.js";
import { Order } from "../Model/order.modal.js";
import { ApiError } from "../Utils/apiErr.js";
import { ApiResponse } from "../Utils/apiRes.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

const orderPlacemnents = asyncHandler(async (req, res) => {
  try {
    const { product, address, pin, totalprice, quantity } = req.body;
    if (!product || !address || !pin || !totalprice) {
      // return res.status(401).send(new ApiError(401, "invalid operations"));
      throw new ApiError(401, "Invalid Inputs");
    }
    const user = await User.findById(req.user._id);
    const order = {
      product: product,
      address: address,
      pin: pin,
      buyer: req.user._id,
      quantity: quantity,
      totalPrice: totalprice,
    };
    const newOrder = await new Order(order).save(
      { new: true },
      { validateBeforeSave: false }
    );
    if(!newOrder){
        return res.send(new ApiError(401, "Something went wrong"));
    }
    return res.status(200).send(new ApiResponse(200,newOrder,"Order Placed"));
  } catch (error){
    console.log("OrderErr:",error);
    return res.status(500).send(new ApiError(500,error,"Internal Error"));
  }
});



const orderCancelled=asyncHandler(async(req,res)=>{
    const {oid} = req.params;
    if(oid){
        return res.send(new ApiError(401, "Invalid Inputs"));
    }

    const odr = await Order.findByIdAndDelete(oid);
    return res.status(200).send(new ApiResponse(200,odr,"Order deleted"));
})



const showOrder = asyncHandler(async(req,res)=>{
    const order = await Order.aggregate([
        {
            $match:{buyer:req.user._id},
            $group:{ _id: "$product"},
            $addFields :{
                total :{
                    $sum : "$product"
                }
            }
        }
    ]).populate('product');

    return res.status(200).send(new ApiResponse(200,order,"order fetched successfully"))
})



export {
    orderPlacemnents,
    orderCancelled,
    showOrder
}