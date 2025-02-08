import { ENVS } from "./envs";
import { CELL_COLORS } from "./constants";
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

    // Add sheet headers
    let headers = getSheetHeaders(name);
    let range = sheet.getRange(4, 1, 1, headers.length);
    range
      .setValues([headers])
      .setBackground(CELL_COLORS.HEADERS)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle")
      .setFontWeight("bold");

    for (let column_idx of headers.keys()) {
      if (column_idx === headers.length - 1) {
        // Increase width for the user column which is the last (range is 1 index based)
        sheet.setColumnWidth(headers.length, 200);
        continue;
      }
      sheet.setColumnWidth(column_idx + 1, 150); // range is 1 index based
    }
  }

  return sheet;
};

const getSheetHeaders = (name) => {
  switch (name) {
    case ENVS.FOOD_SHEET:
      return ["Date", "Amount", "Shop", "Details", "User"];
    case ENVS.COMMON_SHEET:
    case ENVS.PENDING_SHEET:
    case name.endsWith("-data") && name: // Every sheet name that ends in '-data' is a user sheet
      return [
        "Date",
        "Amount",
        "Category",
        "Sub-category",
        "Shop",
        "Details",
        "User",
      ];
    default:
      throw new Error(`Not implemented: sheet_name=${name}`);
  }
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
  let range = sheet.getRange(5, 1, 1, row.length);
  range.setValues([row]);
};

/**
 * Creates the transaction context, by making the spreadsheet active
 */
export const initContext = () => {
  const ss = SpreadsheetApp.openById(ENVS.SPREADSHEET_ID);
  SpreadsheetApp.setActiveSpreadsheet(ss);
};
