const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Define a function to replace placeholders in the source file
function injectEnvVariables(outputFilePath) {
  const envVariables = {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID || "",
    ALLOWED_USERS: process.env.ALLOWED_USERS.split(",") || [],
    COMMON_SHEET: process.env.COMMON_SHEET || "",
    PENDING_SHEET: process.env.PENDING_SHEET || "",
    FOOD_SHEET: process.env.FOOD_SHEET || "",
  };

  const updatedContent = `export const ENVS = ${JSON.stringify(
    envVariables,
    null,
    2
  )};`;

  fs.writeFileSync(outputFilePath, updatedContent, "utf8");
}

const outputFile = "server/envs.js";

injectEnvVariables(outputFile);
