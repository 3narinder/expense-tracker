import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { ensureDefaultCategories } from "./utils/defaultCategories.js";

dotenv.config({ path: new URL("./.env", import.meta.url).pathname });

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureDefaultCategories();

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
