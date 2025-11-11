export type ValidationRule<T> = (props: T) => string | null;

export function createPropValidator<T>(
  component: string,
  rules: ValidationRule<T>[],
) {
  return function validateProps(props: T): boolean {
    const errors = rules
      .map((rule) => rule(props))
      .filter((msg): msg is string => Boolean(msg));

    if (errors.length > 0 && process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error(`[${component}]`, ...errors);
    }

    return errors.length === 0;
  };
}

export default createPropValidator;
