import { ENVS } from "./envs";
import {
  addContext,
  getPersonalSheetName,
  splitAmount,
  validateFormData,
} from "./utils";
import { getOrCreateSheet, initContext, write } from "./gas_utils";

// eslint-disable-next-line no-unused-vars
function doGet() {
  var userEmail = Session.getEffectiveUser().getEmail();
  console.log("userEmail", userEmail);
  // TODO: Add api key check
  // TODO: check for allowed users

  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag(
      "viewport",
      "width=device-width, initial-scale=1, user-scalable=no"
    );
}

// eslint-disable-next-line no-unused-vars
function POST_foodForm(formData) {
  // TODO: check for allowed users
  const userEmail = Session.getEffectiveUser().getEmail();
  initContext();
  const sheet = getOrCreateSheet(ENVS.FOOD_SHEET);
  const contextualFormData = addContext(formData, userEmail);
  write(sheet, contextualFormData);
}

// eslint-disable-next-line no-unused-vars
function POST_sharedForm(formData) {
  initContext();
  const userEmail = Session.getEffectiveUser().getEmail();
  validateFormData(formData);
  let contextualFormData = addContext(formData, userEmail);

  // Get or create the personal sheet
  const personalSheet = getOrCreateSheet(getPersonalSheetName(userEmail));
  switch (formData["_formType"]) {
    case "personalSpace": {
      write(personalSheet, contextualFormData);
      break;
    }
    case "commonSpace": {
      // Write to common sheet
      const commonSheet = getOrCreateSheet(ENVS.COMMON_SHEET);
      write(commonSheet, contextualFormData);

      // Write to personal sheets
      const userCount = ENVS.ALLOWED_USERS.length;
      // The amount will normally be split between users, but not when one partner pays for the other partner
      if (!formData["paidForOtherPartner"]) {
        contextualFormData = splitAmount(contextualFormData, userCount);
        write(personalSheet, contextualFormData); // Write to current user personal sheet
      }

      // FIXME: only 2 users are supported for now
      const otherUsers = ENVS.ALLOWED_USERS.filter(
        (email) => email !== userEmail
      );
      for (let user of otherUsers) {
        // Write to others user's personal sheets
        const otherUserPersonalSheet = getOrCreateSheet(
          getPersonalSheetName(user)
        );
        write(otherUserPersonalSheet, contextualFormData);
      }

      // Write to pending list
      const pendingSheet = getOrCreateSheet(ENVS.PENDING_SHEET);
      write(pendingSheet, contextualFormData);
      break;
    }
    default:
      throw new Error(`Not implemented: formType=${formData["_formType"]}`);
  }
}

// const print = () => {
//   var userEmail = Session.getEffectiveUser().getEmail();
//   console.log("checkl");
//   console.log(getNameFromEmail(userEmail));
// };
