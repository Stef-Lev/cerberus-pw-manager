import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_URI);

  return {
    connection: mongoose.connection,
    async closeConnection() {
      await mongoose.connection.close();
    },
  };
};

export default connectDB;
