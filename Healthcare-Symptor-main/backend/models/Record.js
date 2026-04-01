import mongoose from "mongoose";

const recordSchema = new mongoose.Schema(
  {
    symptoms: String,
    result: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Record", recordSchema);