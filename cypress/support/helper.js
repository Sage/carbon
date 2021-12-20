import DEBUG_FLAG from ".";

const stringToURL = (str) => str.toLowerCase().replace(/ /g, "-");

function prepareUrl(component, suffix = "default story") {
  let url = Cypress.config().baseUrl;
  const story = Cypress.env("iframe");
  // eslint-disable-next-line no-unused-expressions
  url += story;
  return `${url}${stringToURL(component)}--${stringToURL(suffix)}`;
}

export function visitComponentUrl(component, suffix) {
  const onBeforeLoad = cy.spy();
  cy.visit(prepareUrl(component, suffix), {
    onBeforeLoad,
  });
}

// eslint-disable-next-line max-params
export function visitComponentUrlWithParameters(
  component,
  story,
  json = "",
  path = "",
  nameOfObject = ""
) {
  const onBeforeLoad = cy.spy();
  cy.fixture(`${path}/${json}`).then(($json) => {
    const el = $json[nameOfObject];
    let url = "&args=";
    for (const prop in el) {
      if (prop === "theme") {
        url += `&theme=${encodeURIComponent(el[prop])}`;
      } else {
        url += `${prop}:${encodeURIComponent(el[prop])};`;
      }
    }
    cy.visit(`${prepareUrl(component, story)}${url}`, {
      onBeforeLoad,
    });
  });
}

export function dragAndDrop(
  draggableElement,
  destinationPosition,
  startFromHight
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
        log: DEBUG_FLAG,
        release: false,
      })
      .trigger("mousemove", "topRight", { force: true, release: false })
      .trigger("mousemove", "topLeft", { force: true, release: false })
      .wait(100, { log: DEBUG_FLAG });
  }
  draggableElement.trigger("mouseup", { force: true, release: true });
}

export function pressESCKey() {
  // using Shift+Esc - because of storybook shortcuts override
  cy.get("body").type("{shift}{esc}");
}

export function pressTABKey(count) {
  const body = cy.get("body");
  for (let i = 0; i < count; i++) {
    body.tab();
  }
}

export function pressShiftTABKey(count) {
  const body = cy.get("body");
  for (let i = 0; i < count; i++) {
    body.tab({ shift: true });
  }
}

export function continuePressingTABKey(count) {
  const focused = cy.focused();
  for (let i = 0; i < count; i++) {
    focused.tab();
  }
}

export function positionOfElement(type) {
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
    nineteenth: "19",
  }[type];
}

export function positionOfPaginationButton(type) {
  return {
    first: "0",
    previous: "1",
    next: "2",
    last: "3",
  }[type];
}

export function themeColor(type) {
  return {
    primary: "rgb(51, 92, 109)",
    secondary: "rgb(204, 214, 219)",
    tertiary: "rgba(0, 0, 0, 0)",
  }[type];
}

export function tableHeaderSize(type) {
  return {
    compact: "25px",
    small: "32px",
    medium: "40px",
    large: "48px",
  }[type];
}

export function keyCode(type) {
  return {
    downarrow: { key: "ArrowDown", keyCode: 40, which: 40 },
    uparrow: { key: "ArrowUp", keyCode: 38, which: 38 },
    leftarrow: { key: "ArrowLeft", keyCode: 37, which: 37 },
    rightarrow: { key: "ArrowRight", keyCode: 39, which: 39 },
    Enter: { key: "Enter", keyCode: 13, which: 13 },
    Space: { key: " ", keyCode: 32, which: 32 },
    Tab: { key: "Tab", keyCode: 9, which: 9 },
    Home: { key: "Home", keyCode: 36, which: 36 },
    End: { key: "End", keyCode: 35, which: 35 },
    Esc: { key: "Escape", keyCode: 27, which: 27 },
  }[type];
}
