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

  describe("when the fieldHelp is provided and string validation is set, with validationRedesignOptIn set to true", () => {
    it("returns ariaDescribedBy with fieldHelp and validationId combined", () => {
      expect(
        useInputAccessibility({
          id,
          fieldHelp,
          error,
          validationRedesignOptIn: true,
        })
      ).toEqual(
        expect.objectContaining({
          ariaDescribedBy: `${id}-field-help ${id}-validation`,
        })
      );
    });
  });

  describe.each([error, info, warning])(
    "when the id and %s prop is provided",
    (key) => {
      it("returns validationIconId based on that id", () => {
        expect(useInputAccessibility({ id, [key]: key })).toEqual(
          expect.objectContaining({
            validationId: `${id}-validation`,
          })
        );
      });

      it("returns undefined ariaDescribedby prop", () => {
        expect(useInputAccessibility({ id, [key]: key })).toEqual(
          expect.objectContaining({
            ariaDescribedBy: undefined,
          })
        );
      });

      describe("with validationRedesignOptIn set to true", () => {
        it("returns ariaDescribedBy containing validationId based on that id", () => {
          expect(
            useInputAccessibility({
              id,
              [key]: key,
              validationRedesignOptIn: true,
            })
          ).toEqual(
            expect.objectContaining({
              ariaDescribedBy: `${id}-validation`,
            })
          );
        });
      });
    }
  );
});
