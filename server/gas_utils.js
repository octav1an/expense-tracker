import { ENVS } from "./envs";
import { parseFormData } from "./utils";

/**
 * Returns the Sheet object using the name, if not found will create the Sheet with the given name
 * @param {String} name
 * @returns
 */
export const getOrCreateSheet = (name) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet();
    sheet.setName(name);
  }

  return sheet;
};

/**
 *  Writes an array to specified spread sheet with a sheet name,
 * the operation is synchronous
 * @param {string} sheet
 * @param {Object} contextualFormData Validate and contextualized form data with all necessary data
 */
export const write = (sheet, contextualFormData) => {
  // Utilities.sleep(5000);
  const row = parseFormData(contextualFormData);

  // TODO: I think I want to insert new entries at the end of the spreadsheet
  // Insert a range before the 5th row
  sheet.insertRowBefore(5);

  // Write data to the 5th row
  var range = sheet.getRange(5, 1, 1, row.length);
  range.setValues([row]);
};

/**
 * Creates the transaction context, by making the spreadsheet active
 */
export const initContext = () => {
  const ss = SpreadsheetApp.openById(ENVS.SPREADSHEET_ID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
};
