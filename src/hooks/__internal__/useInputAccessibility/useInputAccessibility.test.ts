import useInputAccessibility from ".";

const id = "test-id";
const label = "label";
const fieldHelp = "fieldHelp";
const error = "error";
const warning = "warning";
const info = "info";

test("returns all aria related props when all arguments are passed", () => {
  expect(useInputAccessibility({ id, label, fieldHelp })).toMatchObject({
    labelId: `${id}-label`,
    validationId: undefined,
    fieldHelpId: `${id}-field-help`,
    ariaDescribedBy: `${id}-field-help`,
  });
});

test("returns aria props without labelId when label is not provided", () => {
  expect(useInputAccessibility({ id, fieldHelp })).toMatchObject({
    labelId: undefined,
    validationId: undefined,
    fieldHelpId: `${id}-field-help`,
    ariaDescribedBy: `${id}-field-help`,
  });
});

test("returns ariaDescribedBy with fieldHelp and validationId combined when the fieldHelp is provided and string validation is set, with validationRedesignOptIn set to true", () => {
  expect(
    useInputAccessibility({
      id,
      fieldHelp,
      error,
      validationRedesignOptIn: true,
    }),
  ).toEqual(
    expect.objectContaining({
      ariaDescribedBy: `${id}-field-help ${id}-validation`,
    }),
  );
});

describe.each([error, info, warning])(
  "when the id and %s prop is provided",
  (key) => {
    it(`returns validationIconId based on that id for ${key}`, () => {
      expect(useInputAccessibility({ id, [key]: key })).toEqual(
        expect.objectContaining({
          validationId: `${id}-validation`,
        }),
      );
    });

    it(`returns undefined ariaDescribedby prop for ${key}`, () => {
      expect(useInputAccessibility({ id, [key]: key })).toEqual(
        expect.objectContaining({
          ariaDescribedBy: undefined,
        }),
      );
    });

    it(`returns ariaDescribedBy containing validationId based on that id for ${key} with validationRedesignOptIn set to true`, () => {
      expect(
        useInputAccessibility({
          id,
          [key]: key,
          validationRedesignOptIn: true,
        }),
      ).toEqual(
        expect.objectContaining({
          ariaDescribedBy: `${id}-validation`,
        }),
      );
    });
  },
);
