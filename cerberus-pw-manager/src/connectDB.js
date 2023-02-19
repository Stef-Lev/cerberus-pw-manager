import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGODB_URI, () => console.log("DB connected"));
};

export default connectDB;
