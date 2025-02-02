import { ENVS } from "./envs";
import { AuthorizationError } from "./errors";

/**
 * Parse form data and return the data as a list that will be a row in the spreadsheet
 * @param {Object} formData
 * @returns
 */
export const parseFormData = (formData) => {
  var fieldsToParse = [
    "date",
    "amount",
    "category",
    "subCategory",
    "shop",
    "details",
    "userEmail",
  ];
  var parsedData = [];
  for (let field of fieldsToParse) {
    if (field in formData) {
      parsedData.push(formData[field]);
    }
  }
  return parsedData;
};

export const validateFormData = (formData) => {
  const amount = formData["amount"];
  if (!isNumber(amount)) {
    throw new Error("'amount' is not a valid number");
  }
  if (Number(amount) <= 0) {
    throw new Error(`amount is equal or smaller than zero amount=${amount}`);
  }
};

const isNumber = (value) => {
  return !isNaN(value) && value.trim() !== "";
};

/**
 * Add context to the form data such as user email
 * @param {Object} formData
 * @param {string} user
 */
export const addContext = (formData, user) => {
  formData["userEmail"] = user;
  return formData;
};

/**
 * Returns the email name without domain, this is used as personal sheet's name
 * @param {String} email
 * @returns
 */
export const getNameFromEmail = (email) => {
  if (typeof email === "string") {
    return email.split("@")[0];
  }
  return null;
};

export const getPersonalSheetName = (email) => {
  return `${getNameFromEmail(email)}-data`;
};

/**
 * Split the amount from the parsed data based on the number of user
 * @param {*} formData Validated form data
 * @param {*} userCount
 * @returns
 */
export const splitAmount = (formData, userCount) => {
  return {
    ...formData,
    amount: formData["amount"] / userCount,
  };
};

/**
 * Checks if the external call is authorized
 *
 * @param {*} user User email
 * @param {*} key Api key
 */
export const isAuthorizedExternal = (user, key) => {
  if (!ENVS.ALLOWED_API_KEYS.includes(key)) {
    throw new AuthorizationError(user);
  }
  isAuthorizedInternal(user);
};

/**
 * Checks if the internal call is authorized,
 * for internal call the api key is not passed
 *
 * @param {*} user User email
 */
export const isAuthorizedInternal = (user) => {
  if (!ENVS.ALLOWED_USERS.includes(user)) {
    throw new AuthorizationError(user);
  }
};
