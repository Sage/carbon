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

  expect(result.current.ariaDescribedBy).toBe(
    `${id}-field-help ${id}-validation-0`,
  );
});

describe("when validation props are provided", () => {
  it("returns validationId with counter for error", () => {
    const { result } = renderHook(() => useInputAccessibility({ id, error }));

    expect(result.current.validationId).toBe(`${id}-validation-0`);
  });

  it("returns validationId with counter for warning", () => {
    const { result } = renderHook(() => useInputAccessibility({ id, warning }));

    expect(result.current.validationId).toBe(`${id}-validation-0`);
  });

  it("returns validationId with counter for info", () => {
    const { result } = renderHook(() => useInputAccessibility({ id, info }));

    expect(result.current.validationId).toBe(`${id}-validation-0`);
  });

  it("returns undefined ariaDescribedby prop for error", () => {
    const { result } = renderHook(() => useInputAccessibility({ id, error }));

    expect(result.current.ariaDescribedBy).toBeUndefined();
  });

  it("returns undefined ariaDescribedby prop for warning", () => {
    const { result } = renderHook(() => useInputAccessibility({ id, warning }));

    expect(result.current.ariaDescribedBy).toBeUndefined();
  });

  it("returns undefined ariaDescribedby prop for info", () => {
    const { result } = renderHook(() => useInputAccessibility({ id, info }));

    expect(result.current.ariaDescribedBy).toBeUndefined();
  });

  it("returns ariaDescribedBy for error with validationRedesignOptIn", () => {
    const { result } = renderHook(() =>
      useInputAccessibility({
        id,
        error,
        validationRedesignOptIn: true,
      }),
    );

    expect(result.current.ariaDescribedBy).toBe(`${id}-validation-0`);
  });

  it("returns ariaDescribedBy for warning with validationRedesignOptIn", () => {
    const { result } = renderHook(() =>
      useInputAccessibility({
        id,
        warning,
        validationRedesignOptIn: true,
      }),
    );

    expect(result.current.ariaDescribedBy).toBe(`${id}-validation-0`);
  });

  it("returns ariaDescribedBy for info with validationRedesignOptIn", () => {
    const { result } = renderHook(() =>
      useInputAccessibility({
        id,
        info,
        validationRedesignOptIn: true,
      }),
    );

    expect(result.current.ariaDescribedBy).toBe(`${id}-validation-0`);
  });
});

test("validationId changes when error message changes", () => {
  const { result, rerender } = renderHook(
    ({ error }) => useInputAccessibility({ id, error }),
    { initialProps: { error: "First error" } },
  );

  expect(result.current.validationId).toBe(`${id}-validation-0`);

  rerender({ error: "Second error" });

  expect(result.current.validationId).toBe(`${id}-validation-1`);
});
