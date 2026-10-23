import React from "react";
import { Page } from "@playwright/test";
import path from "path";
import { readFileSync } from "fs";
import { test, expect } from "../../../playwright/helpers/base-test";
import FileInputComponent, {
  CancelToPickerHarness,
  CancelledDelayedDropFocusHarness,
  CrossListFocusPreservationHarness,
  DelayedDropFocusHarness,
  DuplicateFilenameFocusPreservationHarness,
  DropFocusHarness,
  FocusPreservationHarness,
  SecondaryActionFocusPreservationHarness,
  StatusTransitionFocusHarness,
} from "./components.test-pw";
import { selectFileButton } from "../../../playwright/components/file-input";
import { checkAccessibility } from "../../../playwright/support/helper";
import { FileUploadStatusProps } from ".";

declare global {
  interface File {
    toJSON: () => object;
  }
}

// util needed for testing the file argument passed to onChange - browser File objects natively JSON serialise only to
// the empty object.
// Playwright uses JSON serialisation to send data between the browser and Node, but File objects by default all stringify
// as empty objects. Therefore, need to override this for the test to work properly
const enableFileJSON = (page: Page) => {
  return page.evaluate(() => {
    File.prototype.toJSON = function () {
      return { name: this.name, type: this.type };
    };
  });
};

// adapted from https://github.com/microsoft/playwright/issues/13364#issuecomment-1156288428
const dragFile = async ({
  page,
  eventName,
  selector,
  filePath,
  fileName,
  fileType = "",
}: {
  page: Page;
  eventName: string;
  selector: string;
  filePath: string;
  fileName: string;
  fileType?: string;
}) => {
  const buffer = readFileSync(filePath).toString("base64");

  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, localFileName, localFileType }) => {
      const dataTransferObject = new DataTransfer();

      const blobData = await fetch(bufferData).then((res) => res.blob());

      const file = new File([blobData], localFileName, { type: localFileType });
      dataTransferObject.items.add(file);
      return dataTransferObject;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      localFileName: fileName,
      localFileType: fileType,
    },
  );

  await page.dispatchEvent(selector, eventName, { dataTransfer });
};

const uploadingStatusProps: FileUploadStatusProps = {
  status: "uploading",
  filename: "foo.pdf",
  onAction: () => {},
  progress: 30,
  message: "my status message",
};
const completedStatusProps: FileUploadStatusProps = {
  status: "completed",
  filename: "foo.pdf",
  onAction: () => {},
  href: "http://carbon.sage.com",
  target: "_blank",
  rel: "noreferrer",
  message: "my status message",
};
const previouslyStatusProps: FileUploadStatusProps = {
  status: "previously",
  filename: "foo.pdf",
  href: "http://carbon.sage.com",
  target: "_blank",
  rel: "noreferrer",
  message: "my status message",
};
const errorStatusProps: FileUploadStatusProps = {
  status: "error",
  filename: "foo.pdf",
  onAction: () => {},
  message: "my status message",
};

const uploadStatuses = [
  uploadingStatusProps,
  completedStatusProps,
  previouslyStatusProps,
  errorStatusProps,
];
const actionableUploadStatuses = [
  { statusProps: uploadingStatusProps, actionName: "Cancel" },
  { statusProps: completedStatusProps, actionName: "Delete" },
  { statusProps: errorStatusProps, actionName: "Remove" },
];

test.describe("responsive sizing", () => {
  [280, 400].forEach((width) => {
    test(`fills a ${width}px parent container by default`, async ({
      mount,
      page,
    }) => {
      await mount(
        <div data-role="parent-container" style={{ width }}>
          <FileInputComponent />
        </div>,
      );

      const parent = page.getByTestId("parent-container");
      const dropZone = page.getByTestId("file-input-presentation");
      const parentWidth = await parent.evaluate(
        (element) => element.getBoundingClientRect().width,
      );
      const dropZoneWidth = await dropZone.evaluate(
        (element) => element.getBoundingClientRect().width,
      );

      expect(dropZoneWidth).toBe(parentWidth);
    });
  });

  test("treats minWidth and maxWidth as independent constraints", async ({
    mount,
    page,
  }) => {
    await mount(
      <div style={{ width: 500 }}>
        <FileInputComponent minWidth="250px" maxWidth="600px" />
      </div>,
    );

    await expect(page.getByTestId("file-input-presentation")).toHaveCSS(
      "width",
      "500px",
    );
  });

  test("constrains the validation message to the drop zone's maxWidth", async ({
    mount,
    page,
  }) => {
    await mount(
      <div style={{ width: 800 }}>
        <FileInputComponent
          maxWidth="300px"
          error="The file is required and no file has been uploaded on submission."
        />
      </div>,
    );

    const dropZoneBox = await page
      .getByTestId("file-input-presentation")
      .boundingBox();
    const messageBox = await page
      .getByText(
        "The file is required and no file has been uploaded on submission.",
      )
      .boundingBox();

    expect(dropZoneBox?.width).toBe(300);
    expect(messageBox?.width).toBeLessThanOrEqual(300);
  });
});

test.describe("interactions", () => {
  test("clicking empty drop-zone space does not open the file picker", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    let fileChooserOpened = false;
    page.on("filechooser", () => {
      fileChooserOpened = true;
    });

    await page
      .getByTestId("file-input-presentation")
      .click({ position: { x: 4, y: 4 } });

    expect(fileChooserOpened).toBe(false);
    await expect(
      page.getByRole("button", { name: "File input Select file", exact: true }),
    ).not.toBeFocused();
  });

  test("clicking empty space beside the label does not open the file picker", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    let fileChooserOpened = false;
    page.on("filechooser", () => {
      fileChooserOpened = true;
    });

    const labelSet = page
      .getByText("File input", { exact: true })
      .locator("..");
    const { width, height } = await labelSet.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    });
    await labelSet.click({
      position: { x: width - 4, y: height / 2 },
    });

    expect(fileChooserOpened).toBe(false);
  });

  test("retains an uncontrolled native selection for validation and form submission", async ({
    mount,
    page,
  }) => {
    await mount(
      <form aria-label="File upload form">
        <FileInputComponent required name="attachment" />
      </form>,
    );
    await page.locator('input[type="file"]').setInputFiles({
      name: "README.md",
      mimeType: "text/markdown",
      buffer: readFileSync(path.join(process.cwd(), "playwright", "README.md")),
    });

    const nativeState = await page
      .getByRole("form", { name: "File upload form" })
      .evaluate((form: HTMLFormElement) => {
        const input =
          form.querySelector<HTMLInputElement>('input[type="file"]');
        const submittedFile = new FormData(form).get("attachment") as File;
        return {
          fileCount: input?.files?.length,
          formValid: form.checkValidity(),
          submittedFilename: submittedFile.name,
        };
      });

    expect(nativeState).toEqual({
      fileCount: 1,
      formValid: true,
      submittedFilename: "README.md",
    });
  });

  test("clicking the button allows choosing a file which is passed to the onChange callback", async ({
    mount,
    page,
  }) => {
    await enableFileJSON(page);
    const onChangeCalls: File[] = [];
    const onChange = (files: FileList) => {
      onChangeCalls.push(files[0]);
    };
    await mount(<FileInputComponent onChange={onChange} />);
    const fileChooserPromise = page.waitForEvent("filechooser");
    await selectFileButton(page).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(process.cwd(), "playwright", "README.md"),
    );
    expect(onChangeCalls.length).toBe(1);
    expect(onChangeCalls[0].name).toBe("README.md");
    expect(onChangeCalls[0].type || "text/markdown").toBe("text/markdown");
  });

  test("announces a multi-file picker result with the focused button", async ({
    mount,
    page,
  }) => {
    await mount(
      <FileInputComponent multiple required inputHint="PDF files only" />,
    );
    const selectButton = page.getByRole("button", { name: /Select files$/ });
    const fileChooserPromise = page.waitForEvent("filechooser");
    await selectButton.click();
    const fileChooser = await fileChooserPromise;
    const buffer = readFileSync(
      path.join(process.cwd(), "playwright", "README.md"),
    );

    await fileChooser.setFiles([
      { name: "a.pdf", mimeType: "application/pdf", buffer },
      { name: "b.pdf", mimeType: "application/pdf", buffer },
    ]);

    await expect(selectButton).toBeFocused();
    await expect(selectButton).toHaveAccessibleDescription(
      "Selected files: a.pdf, b.pdf. This field is required. PDF files only",
    );
  });

  test("dragging and dropping a file passes it to the onChange callback", async ({
    mount,
    page,
  }) => {
    await enableFileJSON(page);
    const onChangeCalls: File[] = [];
    const onChange = (files: FileList) => {
      onChangeCalls.push(files[0]);
    };
    await mount(<FileInputComponent onChange={onChange} />);

    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    expect(onChangeCalls.length).toBe(1);
    expect(onChangeCalls[0]).toMatchObject({
      name: "README.md",
      type: "text/markdown",
    });
  });

  test("reflects real document and drop-zone drag state, then restores its appearance", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    const dropZone = page.getByTestId("file-input-presentation");
    const getDragStyles = () =>
      dropZone.evaluate((element) => {
        const border = element.querySelector("rect");
        if (!border) throw new Error("File Input dashed border was not found");

        const dropZoneStyles = window.getComputedStyle(element);
        const borderStyles = window.getComputedStyle(border);
        return {
          backgroundColor: dropZoneStyles.backgroundColor,
          stroke: borderStyles.stroke,
          strokeWidth: borderStyles.strokeWidth,
        };
      });
    const initialStyles = await getDragStyles();
    const filePath = path.join(process.cwd(), "playwright", "README.md");

    await dragFile({
      page,
      eventName: "dragover",
      selector: "body",
      filePath,
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await expect
      .poll(async () => (await getDragStyles()).strokeWidth)
      .not.toBe(initialStyles.strokeWidth);

    await dragFile({
      page,
      eventName: "dragleave",
      selector: "body",
      filePath,
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await expect.poll(getDragStyles).toEqual(initialStyles);

    await dragFile({
      page,
      eventName: "dragover",
      selector: '[data-role="file-input-presentation"]',
      filePath,
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await expect
      .poll(async () => (await getDragStyles()).backgroundColor)
      .not.toBe(initialStyles.backgroundColor);
    await expect
      .poll(async () => (await getDragStyles()).stroke)
      .not.toBe(initialStyles.stroke);

    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath,
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await expect.poll(getDragStyles).toEqual(initialStyles);
  });
});

test.describe("focus management", () => {
  test("after a controlled drop, focuses Delete before Preview for a completed file", async ({
    mount,
    page,
  }) => {
    await mount(<DropFocusHarness />);
    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });

    await expect(
      page.getByRole("button", { name: "Delete README.md" }),
    ).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Delete README.md" }),
    ).toHaveAccessibleDescription("File uploaded");
    await expect(
      page.getByRole("link", { name: "Preview README.md" }),
    ).not.toBeFocused();
  });

  test("after a controlled drop, focuses Cancel for an uploading file", async ({
    mount,
    page,
  }) => {
    await mount(<DropFocusHarness status="uploading" />);
    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });

    await expect(
      page.getByRole("button", { name: "Cancel README.md" }),
    ).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Cancel README.md" }),
    ).toHaveAccessibleDescription("Uploading…");
  });

  test("after a controlled drop, focuses Remove before Retry for a failed file", async ({
    mount,
    page,
  }) => {
    await mount(<DropFocusHarness status="error" />);
    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });

    await expect(
      page.getByRole("button", { name: "Remove README.md" }),
    ).toBeFocused();
    await expect(
      page.getByRole("button", { name: "Remove README.md" }),
    ).toHaveAccessibleDescription("Error details");
    await expect(
      page.getByRole("button", { name: "Retry README.md" }),
    ).not.toBeFocused();
  });

  test("focuses the new file action after a delayed controlled update", async ({
    mount,
    page,
  }) => {
    await mount(<DelayedDropFocusHarness />);
    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });

    await expect(
      page.getByRole("button", { name: "Delete README.md" }),
    ).toBeFocused();
  });

  test("does not focus a delayed status after focus leaves the picker", async ({
    mount,
    page,
  }) => {
    await mount(<CancelledDelayedDropFocusHarness />);
    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });

    await expect(
      page.getByRole("button", { name: "File input Select file", exact: true }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    const showStatus = page.getByRole("button", { name: "Show status" });
    await expect(showStatus).toBeFocused();
    await page.keyboard.press("Enter");

    await expect(
      page.getByRole("button", { name: "Delete README.md" }),
    ).toBeVisible();
    await expect(showStatus).toBeFocused();
  });

  test("preserves focus when a file changes status without an explicit id", async ({
    mount,
    page,
  }) => {
    await mount(<StatusTransitionFocusHarness />);

    await page.getByRole("button", { name: "Cancel a.pdf" }).click();

    await expect(
      page.getByRole("button", { name: "Delete a.pdf" }),
    ).toBeFocused();
  });

  test("removing the first card's focused action moves focus to the next card's action", async ({
    mount,
    page,
  }) => {
    await mount(<FocusPreservationHarness />);
    await page.getByRole("button", { name: "Remove a.pdf" }).click();
    await expect(
      page.getByRole("button", { name: "Remove b.pdf" }),
    ).toBeFocused();
  });

  test("removing the last card's focused action moves focus to the previous card's action", async ({
    mount,
    page,
  }) => {
    await mount(<FocusPreservationHarness />);
    await page.getByRole("button", { name: "Remove c.pdf" }).click();
    await expect(
      page.getByRole("button", { name: "Remove b.pdf" }),
    ).toBeFocused();
  });

  test("removing the only remaining card's focused action returns focus to Select file", async ({
    mount,
    page,
  }) => {
    await mount(<FocusPreservationHarness />);
    await page.getByRole("button", { name: "Remove a.pdf" }).click();
    await page.getByRole("button", { name: "Remove b.pdf" }).click();
    await page.getByRole("button", { name: "Remove c.pdf" }).click();
    const selectButton = page.getByRole("button", {
      name: "File input Select file",
      exact: true,
    });
    await expect(selectButton).toBeFocused();
    await expect(selectButton).toHaveAccessibleDescription(
      "File removed: c.pdf.",
    );
  });

  test("removing the first of two same-named cards moves focus to the surviving duplicate's action, not a detached node", async ({
    mount,
    page,
  }) => {
    await mount(<DuplicateFilenameFocusPreservationHarness />);
    const removeAButtons = page.getByRole("button", { name: "Remove a.pdf" });
    await removeAButtons.first().click();
    await expect(
      page.getByRole("button", { name: "Remove a.pdf" }),
    ).toBeFocused();
  });

  test("removing a card with Preview moves focus to the next card, not its removed secondary action", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryActionFocusPreservationHarness />);
    const nextDeleteButton = page.getByRole("button", {
      name: "Delete b.pdf",
    });
    await nextDeleteButton.evaluate((element) => {
      element.addEventListener(
        "focus",
        () => {
          const description = (element.getAttribute("aria-describedby") || "")
            .split(" ")
            .map((id) => document.getElementById(id)?.textContent || "")
            .filter(Boolean)
            .join(" ");
          element.dataset.descriptionWhenFocused = description;
        },
        { once: true },
      );
    });
    await page.getByRole("button", { name: "Delete a.pdf" }).click();
    await expect(nextDeleteButton).toBeFocused();
    await expect(nextDeleteButton).toHaveAccessibleDescription(
      "File deleted: a.pdf. File uploaded",
    );
    await expect(nextDeleteButton).toHaveAttribute(
      "data-description-when-focused",
      "File deleted: a.pdf. File uploaded",
    );
    await expect(page.locator('[aria-live="polite"]')).toBeEmpty();

    await page.getByRole("link", { name: "Preview b.pdf" }).focus();
    await expect(nextDeleteButton).toHaveAccessibleDescription("File uploaded");
  });

  test("prepares a cancellation description before focus returns to Select files", async ({
    mount,
    page,
  }) => {
    await mount(<CancelToPickerHarness />);
    const selectButton = page.getByRole("button", { name: /Select files$/ });
    await selectButton.evaluate((element) => {
      element.addEventListener(
        "focus",
        () => {
          const description = (element.getAttribute("aria-describedby") || "")
            .split(" ")
            .map((id) => document.getElementById(id)?.textContent || "")
            .filter(Boolean)
            .join(" ");
          element.dataset.descriptionWhenFocused = description;
        },
        { once: true },
      );
    });

    await page.getByRole("button", { name: "Cancel a.pdf" }).click();

    await expect(selectButton).toBeFocused();
    await expect(selectButton).toHaveAccessibleDescription(
      "Upload cancelled: a.pdf.",
    );
    await expect(selectButton).toHaveAttribute(
      "data-description-when-focused",
      "Upload cancelled: a.pdf.",
    );
  });

  test("clears a temporary removal result when Preview is activated", async ({
    mount,
    page,
  }) => {
    await mount(<SecondaryActionFocusPreservationHarness />);
    const previewButton = page.getByRole("link", { name: "Preview a.pdf" });

    await page.getByRole("button", { name: "Delete b.pdf" }).click();

    await expect(previewButton).toBeFocused();
    await expect(previewButton).toHaveAccessibleDescription(
      "File deleted: b.pdf.",
    );

    await previewButton.click();

    await expect(previewButton).toBeFocused();
    await expect(previewButton).toHaveAccessibleDescription("");
  });

  test("removing the final current file moves focus to the remaining previous-files list", async ({
    mount,
    page,
  }) => {
    await mount(<CrossListFocusPreservationHarness />);

    await page
      .getByRole("button", { name: "Delete current.pdf" })
      .press("Enter");

    await expect(
      page.getByRole("list", { name: "Previously uploaded file (1)" }),
    ).toBeFocused();
  });
});

test.describe("accessibility tests for FileInput", () => {
  test("should pass accessibility tests with label", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with inputHint prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent inputHint="help" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with boolean error prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent error />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with string error prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent error="error text" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent required />);
    await expect(
      page.getByRole("button", { name: /Select file$/ }),
    ).toHaveAccessibleDescription("This field is required.");
    await checkAccessibility(page);
  });

  actionableUploadStatuses.forEach(({ statusProps, actionName }) => {
    test(`should pass accessibility tests with upload status ${statusProps.status}`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent uploadStatus={statusProps} />);
      await expect(
        page.getByRole("button", {
          name: `${actionName} ${statusProps.filename}`,
        }),
      ).toHaveAccessibleDescription(statusProps.message as string);
      await checkAccessibility(page);
    });
  });

  test("should pass accessibility tests with upload status previously", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={previouslyStatusProps} />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with the multiple-file error summary", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent multiple uploadStatus={uploadStatuses} />);
    await expect(
      page.getByRole("list", {
        name: "Current files (3) 1 file couldn't be uploaded",
      }),
    ).toBeVisible();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a string error alongside a single-file status", async ({
    mount,
    page,
  }) => {
    await mount(
      <FileInputComponent
        error="The file has expired"
        uploadStatus={completedStatusProps}
      />,
    );
    await expect(page.getByText("The file has expired")).toBeVisible();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a thumbnail and determinate upload progress", async ({
    mount,
    page,
  }) => {
    await mount(
      <FileInputComponent
        uploadStatus={{ ...uploadingStatusProps, thumbnailSrc: "" }}
      />,
    );
    await expect(
      page.getByRole("progressbar", { name: "foo.pdf" }),
    ).toHaveAttribute("aria-valuenow", "30");
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with an indeterminate upload and a visible status message", async ({
    mount,
    page,
  }) => {
    await mount(
      <FileInputComponent
        uploadStatus={{ ...uploadingStatusProps, progress: undefined }}
      />,
    );
    await expect(page.getByText("my status message")).toBeVisible();
    await expect(page.getByRole("img")).toHaveCount(0);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with an indeterminate upload and no visible status message", async ({
    mount,
    page,
  }) => {
    await mount(
      <FileInputComponent
        uploadStatus={{
          ...uploadingStatusProps,
          progress: undefined,
          message: "",
        }}
      />,
    );
    await expect(
      page.getByRole("img", { name: "foo.pdf: Uploading…" }),
    ).toBeVisible();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests while a file is dragged over the drop zone", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    const dropZone = page.getByTestId("file-input-presentation");
    const getBackgroundColor = () =>
      dropZone.evaluate((element) => getComputedStyle(element).backgroundColor);
    const initialBackgroundColor = await getBackgroundColor();

    await dragFile({
      page,
      eventName: "dragover",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await expect.poll(getBackgroundColor).not.toBe(initialBackgroundColor);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with a focused status list", async ({
    mount,
    page,
  }) => {
    // The list is a programmatic focus fallback (tabIndex -1) once its last
    // action is removed; focus it directly to scan its focused state.
    await mount(
      <FileInputComponent multiple uploadStatus={previouslyStatusProps} />,
    );
    const statusList = page.getByRole("list", {
      name: "Previously uploaded file (1)",
    });
    await statusList.focus();
    await expect(statusList).toBeFocused();
    await checkAccessibility(page);
  });

  test("should pass accessibility tests when disabled", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent disabled inputHint="PDF files only" />);
    await expect(
      page.getByRole("button", { name: /Select file$/ }),
    ).toBeDisabled();
    // Disabled UI components are exempt from WCAG colour-contrast requirements
    await checkAccessibility(page, undefined, "color-contrast");
  });
});
