import useInputAccessibility from ".";

describe("useInputAccessibility", () => {
  const id = "test-id";
  const label = "label";
  const labelHelp = "labelHelp";
  const fieldHelp = "fieldHelp";
  const error = "error";
  const warning = "warning";
  const info = "info";

  it("returns all aria related props when all arguments are passed", () => {
    expect(
      useInputAccessibility({ id, label, labelHelp, fieldHelp })
    ).toMatchObject({
      labelId: `${id}-label`,
      tooltipId: `${id}-tooltip`,
      fieldHelpId: `${id}-field-help`,
      ariaDescribedBy: `${id}-field-help ${id}-tooltip`,
      ariaLabelledBy: `${id}-label`,
    });
  });

  it("returns aria props without labelId and ariaAlbelledBy when label is not provided", () => {
    expect(useInputAccessibility({ id, labelHelp, fieldHelp })).toMatchObject({
      labelId: undefined,
      tooltipId: `${id}-tooltip`,
      fieldHelpId: `${id}-field-help`,
      ariaDescribedBy: `${id}-field-help ${id}-tooltip`,
      ariaLabelledBy: undefined,
    });
  });

  it("returns aria props without tooltipId fieldHelp/error/warning/info are not provided", () => {
    expect(useInputAccessibility({ id, label, fieldHelp })).toMatchObject({
      labelId: `${id}-label`,
      tooltipId: undefined,
      fieldHelpId: `${id}-field-help`,
      ariaDescribedBy: `${id}-field-help`,
      ariaLabelledBy: `${id}-label`,
    });
  });

  it.each([labelHelp, error, info, warning])(
    "returns proper tooltipId when %s is provided",
    (key) => {
      expect(useInputAccessibility({ id, [key]: key })).toMatchObject({
        labelId: undefined,
        tooltipId: `${id}-tooltip`,
        fieldHelpId: undefined,
        ariaDescribedBy: `${id}-tooltip`,
        ariaLabelledBy: undefined,
      });
    }
  );
});
