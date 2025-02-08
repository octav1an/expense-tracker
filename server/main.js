import { ENVS } from "./envs";
import {
  addContext,
  generateTxId,
  getPersonalSheetName,
  isAuthorizedExternal,
  isAuthorizedInternal,
  splitAmount,
  validateFormData,
} from "./utils";
import { getOrCreateSheet, initContext, writeTx } from "./gas_utils";

function doGet(e) {
  var userEmail = Session.getEffectiveUser().getEmail();
  isAuthorizedExternal(userEmail, e.parameter.key);

  return HtmlService.createTemplateFromFile("index")
    .evaluate()
    .addMetaTag(
      "viewport",
      "width=device-width, initial-scale=1, user-scalable=no"
    );
}

// eslint-disable-next-line no-unused-vars
function POST_foodForm(formData) {
  const userEmail = Session.getEffectiveUser().getEmail();
  isAuthorizedInternal(userEmail);
  initContext();
  const sheet = getOrCreateSheet(ENVS.FOOD_SHEET);
  const contextualFormData = addContext(formData, userEmail, generateTxId());
  writeTx(sheet, contextualFormData);
}

// eslint-disable-next-line no-unused-vars
function POST_sharedForm(formData) {
  const userEmail = Session.getEffectiveUser().getEmail();
  isAuthorizedInternal(userEmail);
  initContext();
  validateFormData(formData);
  let contextualFormData = addContext(formData, userEmail, generateTxId());

  // Get or create the personal sheet
  const personalSheet = getOrCreateSheet(getPersonalSheetName(userEmail));
  switch (formData["formType"]) {
    case "personalSpace": {
      writeTx(personalSheet, contextualFormData);
      break;
    }
    case "commonSpace": {
      // Write to common sheet
      const commonSheet = getOrCreateSheet(ENVS.COMMON_SHEET);
      writeTx(commonSheet, contextualFormData);

      // Write to personal sheets
      const userCount = ENVS.ALLOWED_USERS.length;
      // The amount will normally be split between users, but not when one partner pays for the other partner
      // TODO: add tests
      if (!formData["paidForOtherPartner"]) {
        contextualFormData = splitAmount(contextualFormData, userCount);
        writeTx(personalSheet, contextualFormData); // Write to current user personal sheet
      }

      // TODO: only 2 users are supported for now
      const otherUsers = ENVS.ALLOWED_USERS.filter(
        (email) => email !== userEmail
      );
      for (let user of otherUsers) {
        // Write to others user's personal sheets
        const otherUserPersonalSheet = getOrCreateSheet(
          getPersonalSheetName(user)
        );
        writeTx(otherUserPersonalSheet, contextualFormData);
      }

      // Write to pending list
      const pendingSheet = getOrCreateSheet(ENVS.PENDING_SHEET);
      writeTx(pendingSheet, contextualFormData);
      break;
    }
    default:
      throw new Error(`Not implemented: formType=${formData["formType"]}`);
  }
}

export { doGet };
