export function pressESCKey() {
  // using Shift+Esc - because of storybook shortcuts override
  cy.get("body").type("{shift}{esc}");
}

export function pressTABKey(count: number) {
  for (let i = 0; i < count; i++) {
    cy.get("body").tab();
  }
}

export function pressShiftTABKey(count: number) {
  for (let i = 0; i < count; i++) {
    cy.get("body").tab({ shift: true });
  }
}

export function continuePressingTABKey(count: number, shift = false) {
  for (let i = 0; i < count; i++) {
    cy.focused().tab({ shift });
  }
}

const positions = {
  first: 0,
  second: 1,
  third: 2,
  fourth: 3,
  fifth: 4,
  sixth: 5,
  seventh: 6,
  eighth: 7,
  ninth: 8,
  tenth: 9,
  eleventh: 10,
  thirteenth: 12,
};

export function positionOfElement(type: keyof typeof positions): number {
  return positions[type];
}

const colors = {
  primary: "rgb(51, 92, 109)",
  secondary: "rgb(204, 214, 219)",
  tertiary: "rgba(0, 0, 0, 0)",
};

export function themeColor(type: keyof typeof colors): string {
  return colors[type];
}

const tableHeaderSizes = {
  compact: "25px",
  small: "32px",
  medium: "40px",
  large: "48px",
};
export function tableHeaderSize(type: keyof typeof tableHeaderSizes): string {
  return tableHeaderSizes[type];
}

const keys = {
  downarrow: { key: "ArrowDown", keyCode: 40, which: 40 },
  uparrow: { key: "ArrowUp", keyCode: 38, which: 38 },
  leftarrow: { key: "ArrowLeft", keyCode: 37, which: 37 },
  rightarrow: { key: "ArrowRight", keyCode: 39, which: 39 },
  Enter: { key: "Enter", keyCode: 13, which: 13 },
  EnterForce: { key: "Enter", keyCode: 13, which: 13, force: true },
  Space: { key: " ", keyCode: 32, which: 32 },
  Tab: { key: "Tab", keyCode: 9, which: 9 },
  Home: { key: "Home", keyCode: 36, which: 36 },
  End: { key: "End", keyCode: 35, which: 35 },
  Esc: { key: "Escape", keyCode: 27, which: 27 },
  ShiftHold: { key: "Shift", keyCode: 16, which: 16, release: false },
  pagedown: { key: "PageDown", keyCode: 34, which: 34 },
  pageup: { key: "PageUp", keyCode: 33, which: 33 },
};
export function keyCode(
  type: keyof typeof keys
): {
  key: string;
  keyCode: number;
  which: number;
  force?: boolean;
  release?: boolean;
} {
  return keys[type];
}

/**
 * Converts from a "matrix(a, b, c, d, e, f)" string output from a CSS transform: rotate
 * to the actual rotation angle, while accounting for rounding errors in the calculation.
 * Adapted from https://css-tricks.com/get-value-of-css-rotation-through-javascript/ */
export function getRotationAngle(cssTransformString: string) {
  const matrixValues = cssTransformString
    .split("(")[1]
    .split(")")[0]
    .split(",")
    .map(Number);
  const [a, b] = matrixValues;
  const angleInRadians = Math.atan2(b, a);
  const angleInDegrees = angleInRadians * (180 / Math.PI);
  return Math.round(angleInDegrees);
}
