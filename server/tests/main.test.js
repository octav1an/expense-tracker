import { doGet } from "../main";
import { AuthorizationError } from "../errors";

jest.mock("../envs", () => ({
  ENVS: {
    ALLOWED_USERS: ["allowed@example.com"],
    ALLOWED_API_KEYS: ["valid-key"],
  },
}));

// eslint-disable-next-line no-undef
global.Session = {
  getEffectiveUser: jest.fn(() => ({
    getEmail: jest.fn(() => "allowed@example.com"),
  })),
};

// eslint-disable-next-line no-undef
global.HtmlService = {
  createTemplateFromFile: jest.fn(() => ({
    evaluate: jest.fn(() => ({
      addMetaTag: jest.fn(),
    })),
  })),
};

describe("doGet", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should authorize a valid user with a valid key", () => {
    const mockEvent = { parameter: { key: "valid-key" } };
    expect(() => doGet(mockEvent)).not.toThrow();
  });

  it("should throw an error if the API key is invalid", () => {
    const mockEvent = { parameter: { key: "invalid-key" } };

    expect(() => doGet(mockEvent)).toThrow(AuthorizationError);
  });

  it("should throw an error if the user is not authorized", () => {
    Session.getEffectiveUser.mockImplementation(() => ({
      getEmail: () => "unauthorized@example.com",
    }));

    const mockEvent = { parameter: { key: "valid-key" } };

    expect(() => doGet(mockEvent)).toThrow(AuthorizationError);
  });
});
