import globals from "globals";
import pluginJs from "@eslint/js";
import pluginJest from "eslint-plugin-jest";
import react from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["scripts/", "build/", "dist/", "babel.config.js"] },
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
    },
  },
  {
    files: ["**/*.spec.js", "**/*.test.js"],
    plugins: { jest: pluginJest },
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },
  {
    files: ["server/**/*.js"],
    languageOptions: {
      globals: {
        Session: "readonly",
        HtmlService: "readonly",
        SpreadsheetApp: "readonly",
        Logger: "readonly",
        doGet: "readonly",
      },
    },
  },
  pluginJs.configs.recommended,
];
