import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const nodeEnvIsDev = process.env.NODE_ENV === "development";
    const envBased = nodeEnvIsDev
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRODUCTION;

    let mongoURI =
      process.env.MONGO_URI ||
      envBased ||
      process.env.MONGO_URI_PRODUCTION ||
      process.env.MONGO_URI_DEV;

    let usedVar = "(none)";
    if (process.env.MONGO_URI) usedVar = "MONGO_URI";
    else if (envBased && envBased === process.env.MONGO_URI_PRODUCTION)
      usedVar = "MONGO_URI_PRODUCTION (via NODE_ENV)";
    else if (envBased && envBased === process.env.MONGO_URI_DEV)
      usedVar = "MONGO_URI_DEV (via NODE_ENV)";
    else if (process.env.MONGO_URI_PRODUCTION) usedVar = "MONGO_URI_PRODUCTION";
    else if (process.env.MONGO_URI_DEV) usedVar = "MONGO_URI_DEV";

    if (!mongoURI) {
      throw new Error(
        `Mongo URI missing for NODE_ENV="${process.env.NODE_ENV}" — check your .env or Render environment variables.`,
      );
    }

    await mongoose.connect(mongoURI);

    console.log(
      `✅ MongoDB Connected (${process.env.NODE_ENV === "production" ? "production" : "development"} DB) — using ${usedVar}`,
    );

    if (process.env.MONGO_URI_PRODUCTION && nodeEnvIsDev) {
      console.warn(
        "⚠️ Warning: MONGO_URI_PRODUCTION is set but NODE_ENV is 'development'. If this is your production server, set NODE_ENV=production or set MONGO_URI explicitly to the production DB.",
      );
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
