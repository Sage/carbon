import React, { useState } from "react";
import MultiActionButton from "./multi-action-button.component";
import Button from "../button";
import { Accordion } from "../accordion";
import Dialog from "../dialog";

import { buttonSubtextPreview } from "../../../cypress/locators/button";
import { pressTABKey, keyCode } from "../../../cypress/support/helper";
import {
  multiActionButtonList,
  multiActionButtonListContainer,
  multiActionButtonText,
  multiActionButton,
  multiActionButtonComponent,
} from "../../../cypress/locators/multi-action-button";
import { accordionDefaultTitle } from "../../../cypress/locators/accordion";
import { alertDialogPreview } from "../../../cypress/locators/dialog";
import {
  SIZE,
  CHARACTERS,
} from "../../../cypress/support/component-helper/constants";
import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";
import { useJQueryCssValueAndAssert } from "../../../cypress/support/component-helper/common-steps";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];
const MultiActionButtonList = ({ ...props }) => {
  return (
    <div>
      <MultiActionButton text="Multi Action Button" {...props}>
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </div>
  );
};

const MultiActionNestedInDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <MultiActionButton text="default text">
        <Button>Example Button</Button>
        <Button>Example Button with long text</Button>
        <Button>Short</Button>
      </MultiActionButton>
    </Dialog>
  );
};

context("Tests for MultiActionButton component", () => {
  describe("check props for MultiActionButton component", () => {
    it.each(testData)(
      "should render Multi Action Button text using %s as special characters",
      (text) => {
        CypressMountWithProviders(<MultiActionButtonList text={text} />);

        multiActionButtonText().should("have.text", text);
      }
    );

    it("should check Multi Action Button data element prop", () => {
      CypressMountWithProviders(
        <MultiActionButtonList data-element="multi-action-button-cypress-element" />
      );

      multiActionButtonComponent().should(
        "have.attr",
        "data-element",
        "multi-action-button-cypress-element"
      );
    });

    it("should check Multi Action Button data role prop", () => {
      CypressMountWithProviders(
        <MultiActionButtonList data-role="multi-action-button-cypress-role" />
      );

      multiActionButtonComponent().should(
        "have.attr",
        "data-role",
        "multi-action-button-cypress-role"
      );
    });

    it.each(testData)(
      "should render Multi Action Button subtext with %s as special characters",
      (subtext) => {
        CypressMountWithProviders(
          <MultiActionButtonList size="large" subtext={subtext} />
        );

        buttonSubtextPreview().should("have.text", subtext);
      }
    );

    it.each([
      [SIZE.SMALL, 32],
      [SIZE.MEDIUM, 40],
      [SIZE.LARGE, 48],
    ])("should render Multi Action Button with %s size", (size, height) => {
      CypressMountWithProviders(<MultiActionButtonList size={size} />);

      multiActionButtonComponent().then(($el) => {
        useJQueryCssValueAndAssert($el, "height", height);
      });
    });

    it.each(["left", "right"])(
      "should align the button to the %s",
      (alignment) => {
        CypressMountWithProviders(<MultiActionButtonList align={alignment} />);

        multiActionButtonComponent().should("have.css", `margin-${alignment}`);
      }
    );

    it("should check Multi Action Button is disabled", () => {
      CypressMountWithProviders(
        <MultiActionButtonList disabled text="Multi Action Button" />
      );

      multiActionButtonComponent().trigger("mouseover", { force: true });
      multiActionButtonComponent()
        .children()
        .should("be.disabled")
        .and("have.attr", "disabled");
    });

    it("should invoke Multi Action Button component and expands and contains three items", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButtonComponent().trigger("mouseover");
      multiActionButtonList()
        .eq(0)
        .should("have.text", "Example Button")
        .and("be.visible");
      multiActionButtonList()
        .eq(1)
        .should("have.text", "Example Button with long text")
        .and("be.visible");
      multiActionButtonList()
        .eq(2)
        .should("have.text", "Short")
        .and("be.visible");
    });

    it("should render Multi Action Button with golden border when hit Tab key 1 time", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      pressTABKey(1);
      multiActionButtonComponent()
        .children()
        .then(($el) => {
          const values = $el.css("border").split(" ");
          expect(parseInt(values[0])).to.be.within(1, 3);
          expect(values[1]).to.equals("solid");
          expect(`${values[2]}${values[3]}${values[4]}`.trim()).to.equals(
            "rgb(255,181,0)"
          );
        });
    });

    it("should render Multi Action Button with specific background colour when hovering", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButtonComponent().trigger("mouseover");
      multiActionButton().should(
        "have.css",
        "background-color",
        "rgb(0, 77, 42)"
      );
    });

    it("should invoke Multi Action Button component in a hidden container", () => {
      CypressMountWithProviders(
        <Accordion title="Heading">
          <MultiActionButtonList />
        </Accordion>
      );

      accordionDefaultTitle()
        .trigger("keydown", keyCode("Enter"))
        .then(() => {
          multiActionButtonComponent().children().trigger("mouseover");
          multiActionButtonList()
            .eq(0)
            .should("have.text", "Example Button")
            .and("be.visible");
          multiActionButtonList()
            .eq(1)
            .should("have.text", "Example Button with long text")
            .and("be.visible");
          multiActionButtonList()
            .eq(2)
            .should("have.text", "Short")
            .and("be.visible");
        });
    });

    it("when width is passed, should render Button with justify-content: space-between", () => {
      CypressMountWithProviders(<MultiActionButtonList width="70%" />);

      multiActionButton().should(
        "have.css",
        "justify-content",
        "space-between"
      );
    });

    it("when width is passed, should render Button parent with specified width (70% / 945px) ", () => {
      CypressMountWithProviders(<MultiActionButtonList width="70%" />);

      multiActionButton().then(($el) => {
        useJQueryCssValueAndAssert($el, "width", 956);
      });
    });
  });

  describe("when nested inside of a Dialog component", () => {
    it("should not close the Dialog when SplitButton is closed by pressing an escape key", () => {
      CypressMountWithProviders(<MultiActionNestedInDialog />);
      multiActionButtonComponent().trigger("mouseover");
      multiActionButtonList()
        .eq(0)
        .should("have.text", "Example Button")
        .and("be.visible");

      multiActionButtonComponent().type("{esc}");
      multiActionButtonListContainer().should("not.exist");
      alertDialogPreview().should("exist");

      multiActionButtonComponent().type("{esc}");
      alertDialogPreview().should("not.exist");
    });
  });
});

describe("pressing ArrowUp while MultiActionButton is open", () => {
  it("should move focus to previous child button and should not loop to last button when first is focused", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(1).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(0).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("uparrow"));
        multiActionButtonList().eq(0).should("be.focused");
      });
  });
});

describe("pressing shift and tab while MultiActionButton is open", () => {
  it("should move focus to previous child button and focus the main button when pressed and first button is focused", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(1).focus();
        multiActionButton().eq(0).tab({ shift: true });
        multiActionButtonList().eq(0).should("be.focused");
        multiActionButton().eq(0).tab({ shift: true });
        multiActionButton().eq(0).should("be.focused");
      });
  });
});

describe("pressing ArrowDown while MultiActionButton is open", () => {
  it("should move focus to next child button and should not loop to first button when last is focused", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(1).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(2).should("be.focused");
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("downarrow"));
        multiActionButtonList().eq(2).should("be.focused");
      });
  });
});

describe("pressing tab while MultiActionButton is open", () => {
  it("should move focus to next child button and to second MultiActionButton when end of list reached", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(1).focus();
        multiActionButton().eq(0).tab();
        multiActionButtonList().eq(2).should("be.focused");
        multiActionButton().eq(0).tab();
        multiActionButton().eq(1).should("be.focused");
      });
  });
});

describe("pressing metaKey + ArrowUp while MultiActionButton is open", () => {
  it("should move focus to first child button", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowUp" });
        multiActionButtonList().eq(0).should("be.focused");
      });
  });
});

describe("pressing ctrlKey + ArrowUp while MultiActionButton is open", () => {
  it("should move focus to first child button", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowUp" });
        multiActionButtonList().eq(0).should("be.focused");
      });
  });
});

describe("pressing Home while MultiActionButton is open", () => {
  it("should move focus to first child button", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(2).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("Home"));
        multiActionButtonList().eq(0).should("be.focused");
      });
  });
});

describe("pressing metaKey + ArrowDown while MultiActionButton is open", () => {
  it("should move focus to last child button", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { metaKey: true, key: "ArrowDown" });
        multiActionButtonList().eq(2).should("be.focused");
      });
  });
});

describe("pressing ctrlKey + ArrowDown while MultiActionButton is open", () => {
  it("should move focus to last child button", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", { ctrlKey: true, key: "ArrowDown" });
        multiActionButtonList().eq(2).should("be.focused");
      });
  });
});

describe("pressing End while MultiActionButton is open", () => {
  it("should move focus to last child button", () => {
    CypressMountWithProviders(
      <>
        <MultiActionButtonList />
        <MultiActionButtonList />
      </>
    );

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(0).focus();
        multiActionButtonListContainer()
          .eq(0)
          .trigger("keydown", keyCode("End"));
        multiActionButtonList().eq(2).should("be.focused");
      });
  });
});

describe("pressing esc while MultiActionButton is open", () => {
  it("should close MultiActionButton", () => {
    CypressMountWithProviders(<MultiActionButtonList />);

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(1).focus();
        multiActionButtonComponent().type("{esc}");
        multiActionButtonListContainer().should("not.exist");
      });
  });
});

describe("clicking one of the additional buttons", () => {
  it("should close MultiActionButton", () => {
    CypressMountWithProviders(<MultiActionButtonList />);

    multiActionButton()
      .eq(0)
      .trigger("mouseover")
      .then(() => {
        multiActionButtonList().eq(0).click();

        multiActionButtonListContainer().should("not.exist");
      });
  });
});

describe.each(["Enter", "Space", "downarrow"])(
  "pressing %s key on the main button",
  (key) => {
    it("opens MultiActionButton list and focuses first button", () => {
      CypressMountWithProviders(<MultiActionButtonList />);

      multiActionButton()
        .eq(0)
        .trigger("keydown", keyCode(key))
        .then(() => {
          multiActionButtonList().eq(0).should("be.focused");
        });
    });
  }
);

// https://github.com/cypress-io/cypress/issues/21511
describe("should check colors for MultiActionButton component", () => {
  it.each([
    ["primary", "rgb(0, 126, 69)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0)"],
    ["secondary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgb(0, 126, 69)"],
    ["tertiary", "rgba(0, 0, 0, 0)", "rgb(0, 126, 69)", "rgba(0, 0, 0, 0)"],
  ])(
    "check %s type of Multi action button uses %s as background color and %s as color and %s as border color",
    (buttonType, backgroundColor, color, borderColor) => {
      CypressMountWithProviders(
        <MultiActionButtonList buttonType={buttonType} />
      );

      multiActionButtonComponent().children().as("button");

      cy.get("@button").should("have.css", "background-color", backgroundColor);
      cy.get("@button").should("have.css", "color", color);
      cy.get("@button").should("have.css", "border-color", borderColor);
    }
  );
});
