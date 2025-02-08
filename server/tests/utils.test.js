import {
  getNameFromEmail,
  getPersonalSheetName,
  parseFormData,
  splitAmount,
  validateFormData,
} from "../utils";
import { addContext } from "../utils";
import { ENVS } from "../envs";

describe("getNameFromEmail", () => {
  test("should return the name part of the email", () => {
    const email = "john.doe@example.com";
    const result = getNameFromEmail(email);
    expect(result).toBe("john.doe");
  });

  test("should return null if the input is not a string", () => {
    const email = 12345;
    const result = getNameFromEmail(email);
    expect(result).toBeNull();
  });

  test("should return an empty string if the email has no name part", () => {
    const email = "@example.com";
    const result = getNameFromEmail(email);
    expect(result).toBe("");
  });

  test('should handle emails with multiple "@" symbols correctly', () => {
    const email = "john.doe@subdomain@example.com";
    const result = getNameFromEmail(email);
    expect(result).toBe("john.doe");
  });
});

describe("getPersonalSheetName", () => {
  test("should return sheet name with -data suffix", () => {
    const email = "john.doe@example.com";
    const result = getPersonalSheetName(email);
    expect(result).toBe("john.doe-data");
  });
});

describe("parseFormData", () => {
  test("should return the form data that is stored", () => {
    const formData = {
      formType: "personalSpace",
      amount: "1",
      category: "Basic",
      date: "2025-01-26",
      userEmail: "john.doe@example.com",
      details: "test details",
      paidForOtherPartner: false,
      shop: "test shop",
      subCategory: "Rent",
    };

    const result = parseFormData(formData);
    const expectedResult = [
      "2025-01-26",
      "1",
      "Basic",
      "Rent",
      "test shop",
      "test details",
      "john.doe@example.com",
    ];
    expect(result).toStrictEqual(expectedResult);
  });
});

describe("splitAmount", () => {
  test("should the return the parsed data with the amount split for every user", () => {
    const formData = {
      formType: "commonSpace",
      amount: "1",
      category: "Basic",
      date: "2025-01-26",
      details: "test details",
      paidForOtherPartner: false,
      shop: "test shop",
      subCategory: "Rent",
    };

    const result = splitAmount(formData, 2);
    const expected = { ...formData, amount: 0.5 };
    expect(result).toStrictEqual(expected);
  });

  test("should return the split amount for 3 users", () => {
    const formData = {
      amount: "3",
    };
    const result = splitAmount(formData, 3);
    const expected = { ...formData, amount: 1 };
    expect(result).toStrictEqual(expected);
  });
});

describe("validateFormData", () => {
  test("amount value should be a valid number", () => {
    const formData = {
      amount: "invalid number",
    };
    expect(() => validateFormData(formData)).toThrow();
  });

  test("amount value should not be negative number", () => {
    const formData = {
      amount: "-1",
    };
    expect(() => validateFormData(formData)).toThrow();
  });

  test("amount value should not be zero", () => {
    const formData = {
      amount: "0",
    };
    expect(() => validateFormData(formData)).toThrow();
  });
});

jest.mock("../envs", () => ({
  ENVS: {
    USER_CELL_COLORS: ["red", "blue"],
    ALLOWED_USERS: ["user1@example.com", "user2@example.com"],
  },
}));

describe("addContext", () => {
  test("should add userEmail, id, and cellColor to formData", () => {
    const formData = { amount: "100" };
    const user = "user1@example.com";
    const result = addContext(formData, user, "01012023-123456-789");
    expect(result).toEqual({
      amount: "100",
      userEmail: user,
      id: "01012023-123456-789",
      cellColor: "red",
    });
  });

  test("should add context correctly for another user", () => {
    const formData = { amount: "200" };
    const user = "user2@example.com";
    const result = addContext(formData, user, "01012023-123456-789");
    expect(result).toEqual({
      amount: "200",
      userEmail: user,
      id: "01012023-123456-789",
      cellColor: "blue",
    });
  });
});
