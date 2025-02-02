export class AuthorizationError extends Error {
  constructor(user) {
    super(`Not Authorized: ${user}`);
    this.name = "AuthorizationError";
  }
}
