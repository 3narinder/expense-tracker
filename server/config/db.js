import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_URI_DEV
        : process.env.MONGO_URI_PRODUCTION;

    if (!mongoURI) {
      throw new Error(
        `Mongo URI missing for NODE_ENV="${process.env.NODE_ENV}" — check your .env or Render environment variables.`,
      );
    }

    await mongoose.connect(mongoURI);

    console.log(
      `✅ MongoDB Connected (${process.env.NODE_ENV === "production" ? "production" : "development"} DB)`,
    );
  } catch (error) {
    process.exit(1);
  }
};

export default connectDB;
