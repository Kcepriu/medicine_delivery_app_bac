import mongoose from "mongoose";

const { DB_HOST = "" } = process.env;
console.log("DB_HOST", DB_HOST);

const connectDB = async () => {
  try {
    const DB = await mongoose.connect(DB_HOST);
    console.log(
      `Mongo db is connected. Name: ${DB.connection.name}. Port: ${DB.connection.port}. Host: ${DB.connection.host}`
    );
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
