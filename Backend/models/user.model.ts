import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    userPassword: {
      type: String,
      required: true,
      select: false,
    },
    location: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    OTP: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);
export default userModel;
