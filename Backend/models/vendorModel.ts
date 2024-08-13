import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema(
  {
    venderName: {
      type: String,
      required: true,
    },
    venderEmail: {
      type: String,
      required: true,
    },
    venderPassword: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const venderModel = mongoose.model("vendors", vendorSchema);
export default venderModel;
