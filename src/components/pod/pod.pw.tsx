import React from "react";
import { test, expect } from "../../../playwright/helpers/base-test";
import Pod, { PodProps } from ".";
import {
  PodExample,
  PodDefault,
  EditExample,
  SoftDeleteExample,
  SoftDeleteExampleWithChildren,
  PodWithVariantTypes,
  PodWithHeading,
} from "./components.test-pw";
import {
  podComponent,
  podBlock,
  podTitle,
  podSubTitle,
  podContent,
  podFooter,
  podEdit,
  podEditIcon,
  podDelete,
  podDeleteIcon,
  podUndo,
  podUndoIcon,
} from "../../../playwright/components/pod/index";
import {
  checkCSSOutline,
  assertCssValueIsApproximately,
  checkAccessibility,
} from "../../../playwright/support/helper";
import { SIZE, CHARACTERS } from "../../../playwright/support/constants";
import { VariantTypes } from "../typography/typography.component";

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

const variantTypes2: VariantTypes[] = ["h2", "h3", "p", "em", "b"];

test.describe("Prop tests for Pod", () => {
  (
    [
      [true, "1px", "solid", "rgb(204, 214, 219)"],
      [false, "0px", "none", "rgba(0, 0, 0, 0.9)"],
    ] as [PodProps["border"], string, string, string][]
  ).forEach(([boolVal, borderVal, style, color]) => {
    test(`should render with border value as ${borderVal} when border prop is ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample border={boolVal} />);

      const elem = podBlock(page);
      await checkCSSOutline(elem, borderVal, "border", style, color);
    });
  });

  specialCharacters.forEach((children) => {
    test(`should render with ${children} as children`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample>{children}</PodExample>);

      page.getByText(children);
      await expect(podContent(page)).toHaveCSS("text-align", "left");
    });
  });

  (
    [
      [SIZE.EXTRASMALL, 120, 66],
      [SIZE.SMALL, 120, 66],
      [SIZE.MEDIUM, 136, 82],
      [SIZE.LARGE, 184, 98],
      [SIZE.EXTRALARGE, 216, 130],
    ] as [PodProps["size"], number, number][]
  ).forEach(([size, expectedHeight, expectedWidth]) => {
    test(`should render with ${size} as size and ${expectedHeight} as height and ${expectedWidth} as width`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample size={size} />);

      await assertCssValueIsApproximately(
        podBlock(page),
        "height",
        expectedHeight,
      );

      await assertCssValueIsApproximately(
        podBlock(page),
        "width",
        expectedWidth,
      );
    });
  });

  (
    [
      ["primary", "rgb(255, 255, 255)", "none"],
      ["secondary", "rgb(242, 245, 246)", "none"],
      ["tertiary", "rgb(237, 241, 242)", "none"],
      ["tile", "rgb(255, 255, 255)", "rgba(2, 18, 36, 0.2) 0px 2px 3px 0px"],
      ["transparent", "rgba(0, 0, 0, 0)", "none"],
    ] as [PodProps["variant"], string, string][]
  ).forEach(([variant, color, boxShadow]) => {
    test(`should render with ${variant} as variant when color is ${color} and boxShadow is ${boxShadow}`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample variant={variant} />);

      await expect(podBlock(page)).toHaveCSS("background-color", `${color}`);

      await expect(podBlock(page)).toHaveCSS("box-shadow", boxShadow);
    });
  });

  specialCharacters.forEach((title) => {
    test(`should render with ${title} as title`, async ({ mount, page }) => {
      await mount(<PodExample title={title} />);

      await expect(podTitle(page)).toHaveText(title);
    });
  });

  ([1, 2, 3, 4, 5] as const).forEach((headingLevel) => {
    test(`should render title node when node is passed as h${headingLevel} variants`, async ({
      mount,
      page,
    }) => {
      await mount(<PodWithHeading headingLevel={headingLevel} />);

      const variantLocator = page.getByRole("heading", {
        name: "Title",
        level: headingLevel,
      });

      await expect(variantLocator).toBeAttached();
    });
  });

  specialCharacters.forEach((subtitle) => {
    test(`should render with ${subtitle} as subtitle`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample subtitle={subtitle} />);

      await expect(podSubTitle(page)).toHaveText(subtitle);
    });
  });

  variantTypes2.forEach((variantType) => {
    test(`should render subtitle node when node is passed as ${variantType} variant`, async ({
      mount,
      page,
    }) => {
      const title = "title";
      const subtitle = "subtitle";
      await mount(<PodWithVariantTypes title subtitle={subtitle} />);

      const variantLocator = page.locator('[data-element="subtitle"]');

      await expect(variantLocator).toContainText(title);
    });
  });

  (
    ["left", "center", "right"] as (PodProps["alignTitle"] | undefined)[]
  ).forEach((alignTitle) => {
    test(`should render when text is aligned to the ${
      alignTitle || "default"
    }`, async ({ mount, page }) => {
      await mount(<PodExample alignTitle={alignTitle} />);

      if (alignTitle !== undefined) {
        await expect(podTitle(page)).toHaveCSS("text-align", alignTitle);
      }
    });
  });

  specialCharacters.forEach((footerText) => {
    test(`should render when footer text is ${footerText}`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample footer={footerText} />);

      await expect(podFooter(page)).toHaveText(footerText);

      await expect(podFooter(page)).toBeVisible();
    });
  });

  [100, 200, 300].forEach((height) => {
    test(`should render correct height when height is ${height}`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample height={height} />);

      await expect(podComponent(page)).toHaveCSS("height", `${height}px`);
    });
  });

  (
    [
      [false, 82],
      [true, 1308],
    ] as [PodProps["editContentFullWidth"], number][]
  ).forEach(([boolVal, expectedWidth]) => {
    test(`should render with editContentFullWidth as ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample editContentFullWidth={boolVal} />);

      await assertCssValueIsApproximately(
        podBlock(page),
        "width",
        expectedWidth,
      );
    });
  });

  (
    [
      [true, "rgb(0, 103, 56)"],
      [false, "rgb(255, 255, 255)"],
    ] as [PodProps["triggerEditOnContent"], string][]
  ).forEach(([boolVal, color]) => {
    test(`should render with correct background color when triggerEditOnContent is ${boolVal} and hovered`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample triggerEditOnContent={boolVal} />);

      await expect(podBlock(page)).toHaveCSS(
        "background-color",
        "rgb(255, 255, 255)",
      );

      await podBlock(page).hover();

      await expect(podBlock(page)).toHaveCSS("background-color", color);

      await expect(podEdit(page)).toHaveCSS("background-color", color);
    });
  });

  test.describe("check styling for Pod component", () => {
    test("should render with expected border radius styling on the main container also with edit and delete buttons", async ({
      mount,
      page,
    }) => {
      await mount(<PodExample>Foo</PodExample>);

      await expect(podBlock(page)).toHaveCSS("border-radius", "8px");

      await expect(podEdit(page)).toHaveCSS("border-radius", "8px");

      await expect(podDelete(page)).toHaveCSS("border-radius", "8px");
    });

    test("should render with expected border radius styling on the soft delete/undo button", async ({
      mount,
      page,
    }) => {
      await mount(
        <PodExample onUndo={() => {}} softDelete>
          Foo
        </PodExample>,
      );

      await expect(podUndo(page)).toHaveCSS("border-radius", "8px");
    });
  });
});
test.describe("when onDelete prop is passed", () => {
  test("should call onDelete callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <PodExample
        onDelete={() => {
          callbackCount += 1;
        }}
      />,
    );
    const deleteButton = podDelete(page);
    await deleteButton.click();
    expect(callbackCount).toBe(1);
  });

  test("should render when delete button is focused and internalEditButton prop is true, delete button and Pod component have correct border styles", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onDelete={() => {}} internalEditButton>
        Content
      </Pod>,
    );

    await podDelete(page).focus();
    await expect(podDelete(page)).toHaveCSS(
      "outline",
      "rgb(255, 188, 25) solid 3px",
    );

    await expect(podBlock(page)).toHaveCSS(
      "border",
      "1px solid rgb(204, 214, 219)",
    );
  });

  test("when delete button is hovered over and internalEditButton prop is true, delete button does not have default hover colours", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onDelete={() => {}} internalEditButton>
        Content
      </Pod>,
    );

    await podDelete(page).hover();

    await expect(podDelete(page)).not.toHaveCSS(
      "background-color",
      "rgb(164, 45, 60)",
    );
    await expect(podDeleteIcon(page)).not.toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
  });
});

test.describe("when onEdit prop is passed", () => {
  test("when displayEditButtonOnHover is true, edit button is only visible when user clicks on Pod component", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onEdit={() => {}} displayEditButtonOnHover>
        Content
      </Pod>,
    );

    await expect(podEdit(page)).not.toBeVisible();

    await podContent(page).click();
    await expect(podEdit(page)).toBeVisible();
  });

  test("when displayEditButtonOnHover is true, edit button is only visible when Pod component is hovered over", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onEdit={() => {}} displayEditButtonOnHover>
        Content
      </Pod>,
    );

    await expect(podEdit(page)).not.toBeVisible();
    await podBlock(page).hover();

    await expect(podEdit(page)).toBeVisible();
  });

  test("when displayEditButtonOnHover is true, edit button is only visible when Pod component is focused", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onEdit={() => {}} displayEditButtonOnHover>
        Content
      </Pod>,
    );

    await expect(podEdit(page)).not.toBeVisible();

    await podBlock(page).focus();
    await expect(podEdit(page)).toBeVisible();
  });

  test("when displayEditButtonOnHover is false, edit button should be rendered", async ({
    mount,
    page,
  }) => {
    await mount(<PodExample displayEditButtonOnHover={false} />);

    await expect(podEdit(page)).toBeVisible();
  });

  test("when internalEditButton is true, edit button does not have default hover colours when hovered over", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onEdit={() => {}} internalEditButton>
        Content
      </Pod>,
    );

    await podEdit(page).hover();

    await expect(podEdit(page)).not.toHaveCSS(
      "background-color",
      "rgb(0, 103, 56)",
    );

    await expect(podEditIcon(page)).not.toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
  });

  (
    [
      [true, 1366],
      [false, 82],
    ] as [PodProps["internalEditButton"], number][]
  ).forEach(([boolVal, expectedWidth]) => {
    test(`when internalEditButton is ${boolVal}, width value is correct`, async ({
      mount,
      page,
    }) => {
      await mount(<PodExample internalEditButton={boolVal} />);

      await assertCssValueIsApproximately(
        podBlock(page),
        "width",
        expectedWidth,
      );
    });
  });

  (
    [
      [true, "rgba(0, 0, 0, 0)"],
      [false, "rgb(0, 103, 56)"],
    ] as [PodProps["internalEditButton"], string][]
  ).forEach(([boolVal, color]) => {
    test(`when internalEditButton is ${boolVal} and edit button is hovered, Pod background colours are correct`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Pod onEdit={() => {}} internalEditButton={boolVal}>
          Content
        </Pod>,
      );

      await expect(podBlock(page)).toHaveCSS(
        "background-color",
        "rgb(255, 255, 255)",
      );

      await podEdit(page).hover();
      await expect(podEdit(page)).toHaveCSS("background-color", color);
    });
  });
});

test.describe("when onUndo and softDelete props are passed", () => {
  (
    [
      [true, "be.visible"],
      [false, "not.exist"],
    ] as [PodProps["softDelete"], string][]
  ).forEach(([boolVal, state]) => {
    test(`should render when softDelete is ${boolVal} that undo button is ${state}`, async ({
      mount,
      page,
    }) => {
      await mount(<SoftDeleteExample softDelete={boolVal} />);

      if (boolVal) {
        await expect(podUndo(page)).toBeVisible();
      } else {
        await expect(podUndo(page)).not.toBeVisible();
      }
    });
  });

  test("should call onUndo callback when a click event is triggered", async ({
    mount,
    page,
  }) => {
    let callbackCount = 0;
    await mount(
      <SoftDeleteExample
        onUndo={() => {
          callbackCount += 1;
        }}
      />,
    );
    const undo = podUndo(page);
    await undo.click();
    expect(callbackCount).toBe(1);
  });

  test("undo button does not have default hover colours when hovered over and internalEditButton prop is true", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onUndo={() => {}} softDelete internalEditButton>
        Content
      </Pod>,
    );

    await podUndo(page).hover();

    await expect(podUndo(page)).not.toHaveCSS(
      "background-color",
      "rgb(0, 103, 56)",
    );

    await expect(podUndoIcon(page)).not.toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
  });

  test("renders block with correct background colour", async ({
    mount,
    page,
  }) => {
    const blockBackgroundColor = "rgb(230, 235, 237)";

    await mount(<SoftDeleteExampleWithChildren />);

    await expect(podBlock(page)).toHaveCSS(
      "background-color",
      blockBackgroundColor,
    );
  });

  test("renders children with correct text colours", async ({
    mount,
    page,
  }) => {
    const childrenColor = "rgba(0, 0, 0, 0.65)";

    await mount(<SoftDeleteExampleWithChildren />);

    await expect(page.getByText("Content")).toHaveCSS("color", childrenColor);
    await expect(page.getByText("More content")).toHaveCSS(
      "color",
      childrenColor,
    );
  });
});

test.describe("Accessibility tests", () => {
  test("should pass tests for PodDefault", async ({ mount, page }) => {
    await mount(<PodDefault />);

    await checkAccessibility(page);
  });

  test("should pass tests for Pod internalEditButton", async ({
    mount,
    page,
  }) => {
    await mount(
      <Pod onDelete={() => {}} internalEditButton>
        Content
      </Pod>,
    );

    await podDelete(page).focus();

    await checkAccessibility(page);
  });

  test("should pass tests for Pod EditExample", async ({ mount, page }) => {
    await mount(<EditExample />);

    await checkAccessibility(page);
  });

  [true, false].forEach((boolVal) => {
    test(`should pass tests for Pod SoftDeleteExample when softDelete prop sets to ${boolVal}`, async ({
      mount,
      page,
    }) => {
      await mount(<SoftDeleteExample softDelete={boolVal} />);

      await checkAccessibility(page);
    });
  });

  test("should pass tests for SoftDeleteExampleWithChildren Example", async ({
    mount,
    page,
  }) => {
    await mount(<SoftDeleteExampleWithChildren />);

    await checkAccessibility(page);
  });
});
