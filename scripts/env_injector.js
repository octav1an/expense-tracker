const fs = require("fs");
const dotenv = require("dotenv");

// Load environment variables
const env = dotenv.config().parsed;

// Define a function to replace placeholders in the source file
function injectEnvVariables(filePath, outputFilePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Replace placeholders with environment variable values
  for (const key in env) {
    const regex = new RegExp(`let ${key}=`, "g");
    if (regex.test(content)) {
      content = content.replace(regex, `let ${key}="${env[key]}";`);
    }
  }

  fs.writeFileSync(outputFilePath, content, "utf8");
}

const entryFile = "server/envs_tmp.gs";
const outputFile = "server/envs.gs";
injectEnvVariables(entryFile, outputFile);
