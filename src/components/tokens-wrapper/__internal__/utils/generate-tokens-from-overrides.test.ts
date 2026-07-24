import { overrideTokens } from "./generate-tokens-from-overrides";

test("overrideTokens returns string with light `primaryBrand` color token overridden", () => {
  const overrides = {
    light: {
      primaryBrand: "#ff0000",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--mode-color-action-main-default: #ff0000;");
  expect(result).toContain("--mode-color-action-main-default-alt: #ff0000cc;");
  expect(result).toContain("--mode-color-action-main-default-alt3: #ff000008;");
});

test("overrideTokens returns string with light `primaryBrand` color token overridden with `red`", () => {
  const overrides = {
    light: {
      primaryBrand: "red",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--mode-color-action-main-default: red");
  expect(result).toContain("--mode-color-action-main-default-alt: #ff0000cc;");
  expect(result).toContain("--mode-color-action-main-default-alt3: #ff000008;");
});

test("overrideTokens returns string with light `primaryBrand` color token overridden with `rgb(255, 0, 0)`", () => {
  const overrides = {
    light: {
      primaryBrand: "rgb(255, 0, 0)",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--mode-color-action-main-default: rgb(255, 0, 0)");
  expect(result).toContain("--mode-color-action-main-default-alt: #ff0000cc;");
  expect(result).toContain("--mode-color-action-main-default-alt3: #ff000008;");
});

test("overrideTokens returns string with light `primaryBrand` color token overridden with `hsl(0, 100%, 50%)`", () => {
  const overrides = {
    light: {
      primaryBrand: "hsl(0, 100%, 50%)",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain(
    "--mode-color-action-main-default: hsl(0, 100%, 50%)",
  );
  expect(result).toContain("--mode-color-action-main-default-alt: #ff0000cc;");
  expect(result).toContain("--mode-color-action-main-default-alt3: #ff000008;");
});

test("overrideTokens returns string with light `primaryBrand` color token overridden with `foo`", () => {
  const consoleWarnSpy = jest
    .spyOn(console, "warn")
    .mockImplementation(() => {});
  const overrides = {
    light: {
      primaryBrand: "foo",
    },
  };
  const result = overrideTokens(overrides);

  expect(consoleWarnSpy).toHaveBeenCalledWith(
    'Unable to parse color value "foo". Please provide a valid hex, rgb(a), hsl(a), or named color.',
  );
  expect(result).toContain("--mode-color-action-main-default: foo;");
  expect(result).toContain("--mode-color-action-main-default-alt: foo;");
  expect(result).toContain("--mode-color-action-main-default-alt3: foo;");
  consoleWarnSpy.mockRestore();
});

test("overrideTokens returns string with remaining light color tokens overridden", () => {
  const overrides = {
    light: {
      primaryBrand: "#ff0000",
      primaryBrandHover: "#00ff00",
      primaryBrandActive: "#0000ff",
      onPrimaryBrand: "#ffffff",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--mode-color-action-main-hover: #00ff00;");
  expect(result).toContain("--mode-color-action-main-hover-alt: #00ff0026;");
  expect(result).toContain("--mode-color-action-main-default-alt2: #00ff00;");
  expect(result).toContain("--mode-color-action-main-active: #0000ff;");
  expect(result).toContain("--mode-color-action-main-active-alt: #0000ff4d;");
  expect(result).toContain("--mode-color-action-main-hover-alt2: #0000ff;");
  expect(result).toContain("--mode-color-action-main-with-default: #ffffff;");
  expect(result).toContain("--mode-color-action-main-with-hover: #ffffff;");
  expect(result).toContain("--mode-color-action-main-with-active: #ffffff;");
});

test("overrideTokens returns string with all light color tokens overridden except `onPrimaryBrand`", () => {
  const overrides = {
    light: {
      primaryBrand: "#ff0000",
      primaryBrandHover: "#00ff00",
      primaryBrandActive: "#0000ff",
      onPrimaryBrandHover: "#cccccc",
      onPrimaryBrandActive: "#999999",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--mode-color-action-main-hover: #00ff00;");
  expect(result).toContain("--mode-color-action-main-hover-alt: #00ff0026;");
  expect(result).toContain("--mode-color-action-main-default-alt2: #00ff00;");
  expect(result).toContain("--mode-color-action-main-active: #0000ff;");
  expect(result).toContain("--mode-color-action-main-active-alt: #0000ff4d;");
  expect(result).toContain("--mode-color-action-main-hover-alt2: #0000ff;");
  expect(result).not.toContain("--mode-color-action-main-with-default");
  expect(result).toContain("--mode-color-action-main-with-hover: #cccccc;");
  expect(result).toContain("--mode-color-action-main-with-active: #999999;");
});

test("overrideTokens returns string with light inverse color tokens overridden", () => {
  const overrides = {
    light: {
      primaryBrand: "#ff0000",
      inverse: {
        primaryBrand: "#d0ff00",
        primaryBrandHover: "#ffbb00",
        primaryBrandActive: "#00a2ff",
        onPrimaryBrand: "#ffffff",
        onPrimaryBrandHover: "#cccccc",
        onPrimaryBrandActive: "#999999",
      },
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain(
    "--mode-color-action-main-inverse-default: #d0ff00;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-default-alt: #d0ff00cc;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-default-alt3: #d0ff0008;",
  );
  expect(result).toContain("--mode-color-action-main-inverse-hover: #ffbb00;");
  expect(result).toContain(
    "--mode-color-action-main-inverse-hover-alt: #ffbb0026;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-default-alt2: #ffbb00;",
  );
  expect(result).toContain("--mode-color-action-main-inverse-active: #00a2ff;");
  expect(result).toContain(
    "--mode-color-action-main-inverse-active-alt: #00a2ff4d;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-hover-alt2: #00a2ff;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-with-default: #ffffff;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-with-hover: #cccccc;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-with-active: #999999;",
  );
});

test("overrideTokens returns string with dark `primaryBrand` color token overridden", () => {
  const overrides = {
    dark: {
      primaryBrand: "#00ff00",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain(
    '&.carbon-dark-mode, &[data-carbon-theme="dark"] { --mode-color-action-main-default: #00ff00; --mode-color-action-main-default-alt: #00ff00cc; --mode-color-action-main-default-alt3: #00ff0008; }',
  );
});

test("overrideTokens returns string with remaining dark color tokens overridden", () => {
  const overrides = {
    dark: {
      primaryBrand: "#00ff00",
      primaryBrandHover: "#00ff00",
      primaryBrandActive: "#0000ff",
      onPrimaryBrand: "#ffffff",
      onPrimaryBrandHover: "#cccccc",
      onPrimaryBrandActive: "#999999",
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain(
    '&.carbon-dark-mode, &[data-carbon-theme="dark"] { --mode-color-action-main-default: #00ff00;',
  );
  expect(result).toContain("--mode-color-action-main-hover: #00ff00;");
  expect(result).toContain("--mode-color-action-main-hover-alt: #00ff0026;");
  expect(result).toContain("--mode-color-action-main-default-alt2: #00ff00;");
  expect(result).toContain("--mode-color-action-main-active: #0000ff;");
  expect(result).toContain("--mode-color-action-main-active-alt: #0000ff4d;");
  expect(result).toContain("--mode-color-action-main-hover-alt2: #0000ff;");
  expect(result).toContain("--mode-color-action-main-with-default: #ffffff;");
  expect(result).toContain("--mode-color-action-main-with-hover: #cccccc;");
  expect(result).toContain("--mode-color-action-main-with-active: #999999;");
});

test("overrideTokens returns string with dark inverse color tokens overridden", () => {
  const overrides = {
    dark: {
      primaryBrand: "#00ff00",
      inverse: {
        primaryBrand: "#d0ff00",
        primaryBrandHover: "#ffbb00",
        primaryBrandActive: "#00a2ff",
        onPrimaryBrand: "#ffffff",
        onPrimaryBrandHover: "#cccccc",
        onPrimaryBrandActive: "#999999",
      },
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain('&.carbon-dark-mode, &[data-carbon-theme="dark"]');
  expect(result).toContain(
    "--mode-color-action-main-inverse-default-alt: #d0ff00cc;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-default-alt3: #d0ff0008;",
  );
  expect(result).toContain("--mode-color-action-main-inverse-hover: #ffbb00;");
  expect(result).toContain(
    "--mode-color-action-main-inverse-hover-alt: #ffbb0026;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-default-alt2: #ffbb00;",
  );
  expect(result).toContain("--mode-color-action-main-inverse-active: #00a2ff;");
  expect(result).toContain(
    "--mode-color-action-main-inverse-active-alt: #00a2ff4d;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-hover-alt2: #00a2ff;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-with-default: #ffffff;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-with-hover: #cccccc;",
  );
  expect(result).toContain(
    "--mode-color-action-main-inverse-with-active: #999999;",
  );
});

test("overrideTokens returns string with focus color tokens overridden", () => {
  const overrides = {
    focus: {
      inner: "#00ff00",
      outer: "#0000ff",
      alt: "#ffffff",
      inverse: {
        inner: "#ffff00",
        outer: "#5d00ff",
        alt: "#a9490e74",
      },
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--mode-color-action-focus-default: #00ff00;");
  expect(result).toContain("--mode-color-action-focus-with-default: #0000ff;");
  expect(result).toContain(
    "--mode-color-action-focus-with-default-alt: #ffffff;",
  );
  expect(result).toContain(
    "--mode-color-action-focus-inverse-default: #ffff00;",
  );
  expect(result).toContain(
    "--mode-color-action-focus-inverse-with-default: #5d00ff;",
  );
  expect(result).toContain(
    "--mode-color-action-focus-inverse-with-default-alt: #a9490e74;",
  );
});

test("overrideTokens returns string with font family tokens overridden", () => {
  const overrides = {
    font: {
      family: {
        component: "Arial, sans-serif",
        heading: "Helvetica, sans-serif",
        subheading: "Verdana, sans-serif",
        body: "Times New Roman, serif",
        other: "Courier New, monospace",
      },
    },
  };
  const result = overrideTokens(overrides);

  expect(result).toContain(
    "--global-font-families-component: Arial, sans-serif;",
  );
  expect(result).toContain(
    "--global-font-families-heading: Helvetica, sans-serif;",
  );
  expect(result).toContain(
    "--global-font-families-subheading: Verdana, sans-serif;",
  );
  expect(result).toContain(
    "--global-font-families-body: Times New Roman, serif;",
  );
  expect(result).toContain(
    "--global-font-families-other: Courier New, monospace;",
  );
});

test("overrideTokens returns string with border radius scale token overridden", () => {
  const overrides = {
    borderRadiusScale: "0.5",
  };
  const result = overrideTokens(overrides);

  expect(result).toContain("--global-radius-scale: 0.5;");
});
