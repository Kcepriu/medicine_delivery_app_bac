import path from "path";
import dotenv from "dotenv";

const configPath = path.join(__dirname, ".", "config", ".env");

dotenv.config({ path: configPath });
// require("dotenv").config({ path: configPath });

import connectDB from "./config/connectDB";
import app from "./app";

const { PORT = 3000 } = process.env;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
