export function dragAndDrop(
  draggableElement: Cypress.Chainable,
  destinationPosition: number,
  startFromHight: number
) {
  const ROW_HIGHT = 45;
  const TEN_PIXEL_MOVE = 10;

  draggableElement
    .trigger("mousedown", { force: true, release: false })
    .wait(500) // required for correct drag&drop headless browser (500ms)
    .trigger("mousemove", { force: true, release: false })
    .wait(100); // required for correct drag&drop headless browser (100ms)
  // put row record on top of page, then move down every TEN_PIXEL_MOVE
  for (
    let i = 0;
    i < startFromHight + destinationPosition * ROW_HIGHT;
    i += TEN_PIXEL_MOVE
  ) {
    draggableElement
      .trigger("mousemove", {
        clientY: i,
        force: true,
        release: false,
      })
      .trigger("mousemove", "topRight", { force: true, release: false })
      .trigger("mousemove", "topLeft", { force: true, release: false })
      .wait(100);
  }
  draggableElement.trigger("mouseup", { force: true, release: true });
}

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

export function continuePressingTABKey(count: number) {
  for (let i = 0; i < count; i++) {
    cy.focused().tab();
  }
}

export function positionOfElement(type: string) {
  return {
    first: "0",
    second: "1",
    third: "2",
    fourth: "3",
    fifth: "4",
    sixth: "5",
    seventh: "6",
    eighth: "7",
    ninth: "8",
    tenth: "9",
    eleventh: "10",
    thirteenth: "13",
    nineteenth: "19",
  }[type];
}

export function positionOfPaginationButton(type: string) {
  return {
    first: "0",
    previous: "1",
    next: "2",
    last: "3",
  }[type];
}

export function themeColor(type: string) {
  return {
    primary: "rgb(51, 92, 109)",
    secondary: "rgb(204, 214, 219)",
    tertiary: "rgba(0, 0, 0, 0)",
  }[type];
}

export function tableHeaderSize(type: string) {
  return {
    compact: "25px",
    small: "32px",
    medium: "40px",
    large: "48px",
  }[type];
}

export function keyCode(type: string) {
  return {
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
  }[type];
}

// converts from a "matrix(a, b, c, d, e, f)" string output from a CSS transform: rotate
// to the actual rotation angle, while accounting for rounding errors in the calculation.
// Adapted from https://css-tricks.com/get-value-of-css-rotation-through-javascript/
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
