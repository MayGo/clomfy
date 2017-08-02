export class AuthError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(response.statusText);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthError.prototype);
    this.response = response;
  }
}
