import { renderHook } from "@testing-library/react";
import useInputAccessibility from ".";

const id = "test-id";
const label = "label";
const fieldHelp = "fieldHelp";
const error = "error";
const warning = "warning";
const info = "info";

test("returns all aria related props when all arguments are passed", () => {
  const { result } = renderHook(() =>
    useInputAccessibility({ id, label, fieldHelp }),
  );

  expect(result.current).toMatchObject({
    labelId: `${id}-label`,
    validationId: undefined,
    fieldHelpId: `${id}-field-help`,
    ariaDescribedBy: `${id}-field-help`,
  });
});

test("returns aria props without labelId when label is not provided", () => {
  const { result } = renderHook(() => useInputAccessibility({ id, fieldHelp }));

  expect(result.current).toMatchObject({
    labelId: undefined,
    validationId: undefined,
    fieldHelpId: `${id}-field-help`,
    ariaDescribedBy: `${id}-field-help`,
  });
});

test("returns ariaDescribedBy with fieldHelp and validationId combined when the fieldHelp is provided and string validation is set, with validationRedesignOptIn set to true", () => {
  const { result } = renderHook(() =>
    useInputAccessibility({
      id,
      fieldHelp,
      error,
      validationRedesignOptIn: true,
    }),
  );

  expect(result.current).toEqual(
    expect.objectContaining({
      ariaDescribedBy: `${id}-field-help ${id}-validation-1`,
    }),
  );
});

describe.each([
  ["error", error],
  ["info", info],
  ["warning", warning],
])("when the id and %s prop is provided", (keyName, keyValue) => {
  it(`returns validationIconId based on that id for ${keyName}`, () => {
    const { result } = renderHook(() =>
      useInputAccessibility({ id, [keyName]: keyValue }),
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        validationId: `${id}-validation-1`,
      }),
    );
  });

  it(`returns undefined ariaDescribedby prop for ${keyName}`, () => {
    const { result } = renderHook(() =>
      useInputAccessibility({ id, [keyName]: keyValue }),
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        ariaDescribedBy: undefined,
      }),
    );
  });

  it(`returns ariaDescribedBy containing validationId based on that id for ${keyName} with validationRedesignOptIn set to true`, () => {
    const { result } = renderHook(() =>
      useInputAccessibility({
        id,
        [keyName]: keyValue,
        validationRedesignOptIn: true,
      }),
    );

    expect(result.current).toEqual(
      expect.objectContaining({
        ariaDescribedBy: `${id}-validation-1`,
      }),
    );
  });
});
