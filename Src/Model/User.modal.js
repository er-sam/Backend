import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

 
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return null;
  this.password = await bcrypt.hash(this.password, 11);
  next();
});



UserSchema.methods.validatePassword = async function(password){
try {
  return await bcrypt.compare(password, this.password);
} catch (error) {
  console.log("validationErr",error);
}
};



//Access Token Generating
UserSchema.methods.genAccessToken = async function(){
try {
  return await jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      avatar: this.avatar,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
} catch (error) {
  console.log("AccessErr:",error);
}
};




//Refresh Token Generating
UserSchema.methods.genRefreshToken = async function(){
try {
  return await jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
} catch (error) {
  console.log("RefErr:",error);
}
};



export const User = mongoose.model("User", UserSchema);
