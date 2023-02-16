require("dotenv").config();
import mongoose from "mongoose";

console.log(process.env.MONGO_URI);
const connectDB = async () => mongoose.connect(process.env.MONGO_URI);

export default connectDB;
