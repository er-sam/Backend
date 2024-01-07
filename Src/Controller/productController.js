import { Category } from "../Model/Category.modal.js";
import { Product } from "../Model/Product.modal.js";
import { User } from "../Model/User.modal.js";
import { Order } from "../Model/order.modal.js";
import { ApiError } from "../Utils/apiErr.js";
import { ApiResponse } from "../Utils/apiRes.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadFileOnCloud } from "../Utils/cloudanary.js";

const addCatrgory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) {
      return res.status(401).send(new ApiError(401, "Invalid Inputs"));
    }
    const d = await Category({ name: category }).save({ new: true });
    return res.status(200).send(new ApiResponse(200, d, "category created"));
  } catch (error) {
    console.log("categoryErr:", error);
    return res.status(500).send(new ApiError(500, "Internal Error"));
  }
});

const addProduct = asyncHandler(async (req, res) => {
  console.log("object", req.body);
  try {
    const { name, price, category, discount, brand } = req.body;
    if (!name || !price || !category || !brand) {
      throw new ApiError(401, "Inavlid Inputs");
    }
    const imgpath = req.file?.path;
    if (!imgpath) {
      throw new ApiError(401, "Inavlid Image Path");
    }
    const imageres = await uploadFileOnCloud(imgpath);
    if (!imageres?.url) {
      throw new ApiError(401, "Err in uploading image");
    }
    console.log(imageres);
    const data = await new Product({
      name: name,
      price: price,
      category: category,
      image: imageres?.url,
      discount: discount,
      brand: brand,
      owner: req.user._id,
    }).save({ new: true });
    return res.status(200).send(new ApiResponse(200, data, "product saved"));
  } catch (error) {
    console.log("prodErr:", error);
    return res.status(500).send(new ApiError(500, error, "Internal Error"));
  }
});

export { addCatrgory, addProduct };
