import useInputAccessibility from ".";

describe("useInputAccessibility", () => {
  const id = "test-id";
  const label = "label";
  const fieldHelp = "fieldHelp";
  const error = "error";
  const warning = "warning";
  const info = "info";

  it("returns all aria related props when all arguments are passed", () => {
    expect(useInputAccessibility({ id, label, fieldHelp })).toMatchObject({
      labelId: `${id}-label`,
      validationId: undefined,
      fieldHelpId: `${id}-field-help`,
      ariaDescribedBy: `${id}-field-help`,
    });
  });

  it("returns aria props without labelId when label is not provided", () => {
    expect(useInputAccessibility({ id, fieldHelp })).toMatchObject({
      labelId: undefined,
      validationId: undefined,
      fieldHelpId: `${id}-field-help`,
      ariaDescribedBy: `${id}-field-help`,
    });
  });

  it.each([error, info, warning])(
    "returns proper validationIconId when %s is provided",
    (key) => {
      expect(useInputAccessibility({ id, [key]: key })).toMatchObject({
        labelId: undefined,
        validationId: `${id}-validation`,
        fieldHelpId: undefined,
        ariaDescribedBy: `${id}-validation`,
      });
    }
  );
});
