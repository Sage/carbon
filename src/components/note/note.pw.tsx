import React from "react";
import { test, expect } from "@playwright/experimental-ct-react";
import {
  NoteComponent,
  NoteComponentWithInlineControl,
  NoteComponentWithPreviews,
} from "./components.test-pw";
import Box from "../box";
import { tooltipPreview } from "../../../playwright/components/index";
import { linkPreview } from "../../../playwright/components/link-preview/index";
import { CHARACTERS } from "../../../playwright/support/constants";
import {
  noteComponent,
  noteHeader,
  noteFooterCreatedBy,
  noteFooterChangeTime,
  noteStatus,
  noteContent,
} from "../../../playwright/components/note/index";
import {
  checkAccessibility,
  getStyle,
} from "../../../playwright/support/helper";
import { actionPopoverWrapper } from "../../../playwright/components/action-popover/index";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

test.describe("check props for Note component", () => {
  testData.forEach((text) => {
    test(`should render with text prop set to ${text}`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent text={text} />);

      await expect(noteContent(page)).toHaveText(text);
    });
  });

  [
    { width: 30, widthInPx: 75 },
    { width: 75, widthInPx: 187 },
  ].forEach(({ width, widthInPx }) => {
    test(`should render with width prop set to ${width}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <Box width="250px">
          <NoteComponent width={width} />
        </Box>,
      );

      const widthVal = await getStyle(noteComponent(page), "width");
      const value = parseInt(widthVal);

      await expect(noteComponent(page)).toHaveAttribute("width", `${width}`);
      expect(value).toBeGreaterThanOrEqual(widthInPx - 1);
      expect(value).toBeLessThanOrEqual(widthInPx + 1);
    });
  });

  test("should render with inlineControl prop", async ({ mount, page }) => {
    await mount(<NoteComponentWithInlineControl />);

    await expect(actionPopoverWrapper(page)).toBeVisible();
  });

  testData.forEach((title) => {
    test(`should render with title prop set to ${title}`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent title={title} />);

      await expect(noteHeader(page)).toHaveText(title);
    });
  });

  testData.forEach((name) => {
    test(`should render with name prop set to ${name}`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent name={name} />);

      await expect(noteFooterCreatedBy(page)).toHaveText(name);
    });
  });

  test("should render with createdDate prop", async ({ mount, page }) => {
    const createdDate = "25 June 2022, 11:57 AM";

    await mount(<NoteComponent createdDate={createdDate} />);

    await expect(noteFooterChangeTime(page)).toHaveText(createdDate);
  });

  testData.forEach((value) => {
    test(`should render with status prop set to ${value}`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NoteComponent
          status={{
            text: value,
            timeStamp: `${CHARACTERS.STANDARD}`,
          }}
        />,
      );

      await noteStatus(page).hover();
      await expect(noteStatus(page)).toHaveText(value);
      await expect(tooltipPreview(page)).toHaveText(CHARACTERS.STANDARD);
    });
  });

  test("should render with previews prop", async ({ mount, page }) => {
    await mount(<NoteComponentWithPreviews />);

    await expect(linkPreview(page)).toHaveCount(2);
    await expect(linkPreview(page).nth(0)).toBeVisible();
    await expect(linkPreview(page).nth(1)).toBeVisible();
  });
});

test.describe("check styling for Note component", () => {
  test("should render with expected border radius styling", async ({
    mount,
    page,
  }) => {
    await mount(<NoteComponent />);

    await expect(noteComponent(page)).toHaveCSS("border-radius", "8px");
  });
});

test.describe("check action events for Note component", () => {
  test("should call onLinkAdded callback when a valid url is detected", async ({
    mount,
    page,
  }) => {
    let hasOnLinkAddedBeenCalledCount = 0;

    await mount(
      <NoteComponent
        text="https://carbon.s"
        onLinkAdded={() => {
          hasOnLinkAddedBeenCalledCount += 1;
        }}
      />,
    );

    await expect(page.getByText("https://carbon.s")).toBeAttached();
    expect(hasOnLinkAddedBeenCalledCount).toBe(1);
  });
});

test.describe("Accessibility tests for Note component", () => {
  testData.forEach((text) => {
    test(`should render with noteContent prop as ${text} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent text={text} />);

      await checkAccessibility(page);
    });
  });

  [{ width: 30 }, { width: 75 }].forEach(({ width }) => {
    test(`should render with width prop is set to ${width} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent width={width} />);

      await checkAccessibility(page);
    });
  });

  test("should render with inlineControl prop for accessibility tests", async ({
    mount,
    page,
  }) => {
    await mount(<NoteComponentWithInlineControl />);

    await checkAccessibility(page);
  });

  testData.forEach((title) => {
    test(`should render with title prop set to ${title} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent title={title} />);

      await checkAccessibility(page);
    });
  });

  testData.forEach((name) => {
    test(`should render with name prop set to ${name} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(<NoteComponent name={name} />);

      await checkAccessibility(page);
    });
  });

  test("should render with createdDate prop for accessibility tests", async ({
    mount,
    page,
  }) => {
    const createdDate = "25 June 2022, 11:57 AM";

    await mount(<NoteComponent createdDate={createdDate} />);

    await checkAccessibility(page);
  });

  testData.forEach((value) => {
    test(`should render with status prop set to ${value} for accessibility tests`, async ({
      mount,
      page,
    }) => {
      await mount(
        <NoteComponent
          status={{
            text: value,
            timeStamp: `${CHARACTERS.STANDARD}`,
          }}
        />,
      );

      await checkAccessibility(page);
    });
  });

  test("should render with previews prop for accessibility tests", async ({
    mount,
    page,
  }) => {
    await mount(<NoteComponentWithPreviews />);

    await checkAccessibility(page);
  });
});
