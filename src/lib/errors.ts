export class AppError extends Error {
  constructor(message: string, readonly code = "INTERNAL_ERROR") {
    super(message);
    this.name = "AppError";
  }
}
