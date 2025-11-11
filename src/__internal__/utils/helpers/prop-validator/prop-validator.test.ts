import { createPropValidator, ValidationRule } from "./prop-validator";

describe("createPropValidator", () => {
  let consoleErrorSpy: jest.SpyInstance;
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    process.env = OLD_ENV;
  });

  it("returns true when there are no rules", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validate = createPropValidator<any>("test", []);
    const result = validate({ foo: "bar" });
    expect(result).toBe(true);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("returns true when all rules return null", () => {
    const rules: ValidationRule<{ a: number }>[] = [() => null, () => null];
    const validate = createPropValidator("test", rules);
    const result = validate({ a: 5 });
    expect(result).toBe(true);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("returns false and logs errors when rules return messages (non-production)", () => {
    process.env.NODE_ENV = "development";
    const rules: ValidationRule<{ name: string }>[] = [
      ({ name }) => (name ? null : "Name is required"),
      ({ name }) => (name === "bad" ? "Invalid name" : null),
    ];
    const validate = createPropValidator("test", rules);

    const result = validate({ name: "" });

    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith("[test]", "Name is required");
  });

  it("returns false but does not log in production mode", () => {
    process.env.NODE_ENV = "production";
    const rules: ValidationRule<{ name: string }>[] = [() => "Always invalid"];
    const validate = createPropValidator("test", rules);
    const result = validate({ name: "foo" });

    expect(result).toBe(false);
    expect(consoleErrorSpy).not.toHaveBeenCalled();
  });

  it("filters out falsy values properly (e.g. undefined, null, empty string)", () => {
    process.env.NODE_ENV = "development";
    const rules: ValidationRule<{ id: number }>[] = [
      () => null,
      () => "",
      () => undefined as unknown as string | null,
      () => "Actual error",
    ];
    const validate = createPropValidator("test", rules);

    const result = validate({ id: 1 });
    expect(result).toBe(false);
    expect(consoleErrorSpy).toHaveBeenCalledWith("[test]", "Actual error");
  });
});
