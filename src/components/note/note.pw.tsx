import React from "react";
import { test } from "../../../playwright/helpers/base-test";
import {
  NoteComponent,
  NoteComponentWithInlineControl,
  NoteComponentWithPreviews,
} from "./components.test-pw";
import { CHARACTERS } from "../../../playwright/support/constants";
import { checkAccessibility } from "../../../playwright/support/helper";

const testData = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

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
