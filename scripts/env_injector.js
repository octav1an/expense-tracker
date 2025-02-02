const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

/**
 * Creates the envs.js file with values taken from .env file to avoid exposing any sensitive data
 * @param {*} outputFilePath
 */
function injectEnvVariables(outputFilePath) {
  const envVariables = {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID || "",
    ALLOWED_USERS: process.env.ALLOWED_USERS.split(",") || [],
    ALLOWED_API_KEYS: process.env.ALLOWED_API_KEYS.split(",") || [],
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
