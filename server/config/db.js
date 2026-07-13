import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URI_PRODUCTION
        : process.env.MONGO_URI_DEV;

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
    console.error("❌ MongoDB Connection Failed");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
