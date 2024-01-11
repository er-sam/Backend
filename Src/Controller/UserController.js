import { User } from "../Model/User.modal.js";
import { ApiError } from "../Utils/apiErr.js";
import { ApiResponse } from "../Utils/apiRes.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { uploadFileOnCloud } from "../Utils/cloudanary.js";

//GENEREATE TOKENS
const generateAccessAndRefreshTokens = async (user_id) => {
  console.log("-", user_id);
  try {
    const user = await User.findById(user_id);
    const accesToken = await user.genAccessToken();
    const refToken = await user.genRefreshToken();
    // console.log(accesToken, refToken);
    user.refreshToken = refToken;
    await user.save({ validateBeforeSave: false });

    return { accesToken, refToken, user };
  } catch (error) {
    console.log("Token Err", error);
    throw new ApiError(500, "Err in generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password, avatar, address } = req.body;
    if (!name || !email || !phone || !password) {
      throw new ApiError(400, "Invalid Inputs");
    }
    if (await User.findOne({ email })) {
      new ApiError(401, "User is already register")
    }
    const avtarimgPath = req.file?.path;
    if (!avtarimgPath) {
      throw new ApiError(401, "Avatar image not found");
    }
    const avatarimg = await uploadFileOnCloud(avtarimgPath);
    if(!avatarimg.url){
      throw new ApiError(401,"Error in uploading avatar...");
    }
    const user = await new User({
      name: name,
      email: email,
      phone: phone,
      password: password,
      avatar: avatarimg?.url,
      address: ""
    }).save({ new: true });

    return res.status(201).send(new ApiResponse(200, user, "User created.."));
  // } catch (error) {
  //   console.log("reg", error);
  //  throw new ApiError(500,error.Error);
  // }
});





const loginController = asyncHandler(async (req, res) => {
  //if(await(await User.findOne({email})).validatePassword(password))
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400), send(new ApiError(400, "Invalid Inputs"));
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400), send(new ApiError(400, "User not found"));
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return (
        res.status(400), send(new ApiError(401, "Invalid user or password"))
      );
    }
    const data = await generateAccessAndRefreshTokens(user._id);
    const userdata = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      address: user.address,
    };
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", data.accesToken, options)
      .cookie("refreshToken", data.refToken, options)
      .json(
        new ApiResponse(200, {
          userdata,
          accesToken: data.accesToken,
          refToken: data.refToken,
        })
      );

    // return res.status(200).send(new ApiResponse(200,user,"user logged in"))
  } catch (err) {
    console.log("loginErr", err);
    return res.status(500).send(new ApiError(500, "Internal Server Error"));
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out successfully" });
});

const changePassword = asyncHandler(async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const isvalid = await user.validatePassword(password);

    if (!isvalid) {
      throw new ApiError(401, "Inavlid password....");
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password changed successfully"));
  } catch (error) {
    console.log("changepass", error);
    throw new ApiError(500, "Internal Server Error");
  }
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export {
  registerUser,
  loginController,
  logoutUser,
  changePassword,
  getCurrentUser,
};
