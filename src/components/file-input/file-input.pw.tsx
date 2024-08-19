import React from "react";
import { Page } from "@playwright/test";
import { test, expect } from "@playwright/experimental-ct-react17";
import path from "path";
import { readFileSync } from "fs";
import FileInputComponent from "./components.test-pw";
import {
  hiddenInput,
  selectFileButton,
  label,
  fileInput,
} from "../../../playwright/components/file-input";
import {
  checkAccessibility,
  verifyRequiredAsteriskForLabel,
  assertCssValueIsApproximately,
} from "../../../playwright/support/helper";
import { CHARACTERS } from "../../../playwright/support/constants";
import { FileUploadStatusProps } from ".";

declare global {
  interface File {
    toJSON: () => object;
  }
}

// util needed for testing the file argument passed to onChange - browser File objects natively JSON serialise only to
// the empty object.
// Playwright uses JSON serialisation to send data between the browser and Node, but File objects by default all stringify
// as empty objects. Therefore need to override this for the test to work properly
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

const specialCharacters = [CHARACTERS.DIACRITICS, CHARACTERS.SPECIALCHARACTERS];

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
  onAction: () => {},
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

test.describe("FileInput component", () => {
  test("should render a hidden file input and visible button", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    await expect(hiddenInput(page, "File input")).toBeHidden();
    await expect(selectFileButton(page)).toBeVisible();
  });

  [
    "audio/*",
    "video/*",
    "image/*",
    ".pdf",
    ".jpg",
    ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ].forEach((accept) => {
    test(`should render with accept prop '${accept}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent accept={accept} />);
      const input = await hiddenInput(page, "File input");
      await expect(input).toHaveAttribute("accept", accept);
    });
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with buttonText '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent buttonText={testVal} />);
      const buttonElement = await selectFileButton(page, testVal);
      await expect(buttonElement).toBeVisible();
    });
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with dragAndDropText '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent dragAndDropText={testVal} />);
      await expect(page.getByText(testVal)).toBeVisible();
    });
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with visible label '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent label={testVal} />);
      const input = await hiddenInput(page, testVal);
      await expect(input).toHaveCount(1);
      const labelElement = await label(page);
      await expect(labelElement).toHaveText(testVal);
      await expect(labelElement).toBeVisible();
    });
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with visible inputHint '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent inputHint={testVal} />);
      const inputHintElement = await page.getByText(testVal);
      await expect(inputHintElement).toBeVisible();
    });
  });

  test("should render with boolean error prop", async ({ mount, page }) => {
    await mount(<FileInputComponent error />);
    const borderColor = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("border-color"),
      );
    // TODO: should check token value (--colorsSemanticNegative500), rewrite this when we have the equivalent playwright util merged in
    await expect(borderColor).toBe("rgb(203, 55, 74)");
  });

  test("should render with string error prop", async ({ mount, page }) => {
    await mount(<FileInputComponent error="error text" />);
    const borderColor = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("border-color"),
      );
    // TODO: should check token value (--colorsSemanticNegative500), rewrite this when we have the equivalent playwright util merged in
    await expect(borderColor).toBe("rgb(203, 55, 74)");
    const errorMessage = await page.getByText("error text");
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveCSS("color", "rgb(203, 55, 74)");
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with id '${testVal}'`, async ({ mount, page }) => {
      await mount(<FileInputComponent id={testVal} />);
      const input = await hiddenInput(page, "File input");
      await expect(input).toHaveAttribute("id", testVal);
    });
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with name prop '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent name={testVal} />);
      await expect(hiddenInput(page, "File input")).toHaveAttribute(
        "name",
        testVal,
      );
    });
  });

  test("should render with required prop", async ({ mount, page }) => {
    await mount(<FileInputComponent required />);
    await verifyRequiredAsteriskForLabel(page);
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with data-element prop '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent data-element={testVal} />);
      await expect(fileInput(page)).toHaveAttribute("data-element", testVal);
    });
  });

  specialCharacters.forEach((testVal) => {
    test(`should render with data-role prop '${testVal}'`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent data-role={testVal} />);
      await expect(fileInput(page)).toHaveAttribute("data-role", testVal);
    });
  });
});

test.describe("with uploadStatus prop", () => {
  uploadStatuses.forEach((statusProps) => {
    test(`with status ${statusProps.status}, no hidden input or button is rendered`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent uploadStatus={statusProps} />);
      await expect(hiddenInput(page, "File input")).toHaveCount(0);
      await expect(selectFileButton(page)).toHaveCount(0);
    });
  });

  uploadStatuses.forEach((statusProps) => {
    test(`with status ${statusProps.status}, an icon of the correct type is rendered`, async ({
      mount,
      page,
    }) => {
      await mount(
        <FileInputComponent
          uploadStatus={{ ...statusProps, iconType: "pdf" }}
        />,
      );

      const icon = page.getByTestId("icon");

      await expect(icon).toBeAttached();
      await expect(icon).toHaveAttribute("data-element", "pdf");
    });
  });

  uploadStatuses.forEach((statusProps) => {
    test(`with status ${statusProps.status}, a file_generic icon is rendered if iconType is not specified`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent uploadStatus={{ ...statusProps }} />);

      const icon = page.getByTestId("icon");

      await expect(icon).toBeAttached();
      await expect(icon).toHaveAttribute("data-element", "file_generic");
    });
  });

  test("in the uploading state, it renders a status message", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={uploadingStatusProps} />);
    await expect(page.getByText("my status message")).toBeVisible();
  });

  test("in the uploading state, it renders a cancel button", async ({
    mount,
    page,
  }) => {
    let clickCount = 0;
    const onAction = () => {
      clickCount += 1;
    };
    await mount(
      <FileInputComponent
        uploadStatus={{ ...uploadingStatusProps, onAction }}
      />,
    );
    const actionButton = await page.getByRole("button", {
      name: "Cancel upload",
    });
    await expect(actionButton).toBeVisible();
    await actionButton.click();
    await expect(clickCount).toBe(1);
  });

  test("in the uploading state, it renders the file name, but not as a link", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={uploadingStatusProps} />);
    await expect(page.getByText("foo.pdf")).toBeVisible();
    await expect(page.getByRole("link", { name: "foo.pdf" })).toHaveCount(0);
  });

  test("in the uploading state, it renders a progress bar with progress matching the progress prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={uploadingStatusProps} />);

    const progressTrackerBar = page.locator(
      '[data-element="progress-tracker-bar"]',
    );
    const innerBar = page.locator('[data-element="inner-bar"]');

    await expect(progressTrackerBar).toBeVisible();
    await assertCssValueIsApproximately(innerBar, "width", 83);
  });

  test("in the uploading state with no progress, it renders a loader par with no aria-valuenow", async ({
    mount,
    page,
  }) => {
    await mount(
      <FileInputComponent
        uploadStatus={{ ...uploadingStatusProps, progress: undefined }}
      />,
    );
    const loaderBar = await page.getByRole("progressbar");
    await expect(loaderBar).toBeVisible();
    await expect(await loaderBar.getAttribute("aria-valuenow")).toBeNull();
  });

  test("in the completed state, it renders a status message", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={completedStatusProps} />);
    await expect(page.getByText("my status message")).toBeVisible();
  });

  test("in the completed state, it renders a delete button", async ({
    mount,
    page,
  }) => {
    let clickCount = 0;
    const onAction = () => {
      clickCount += 1;
    };
    await mount(
      <FileInputComponent
        uploadStatus={{ ...completedStatusProps, onAction }}
      />,
    );
    const actionButton = await page.getByRole("button", {
      name: "Delete file",
    });
    await expect(actionButton).toBeVisible();
    await actionButton.click();
    await expect(clickCount).toBe(1);
  });

  test("in the completed state, it renders the file name as a link with the provided props", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={completedStatusProps} />);
    const link = await page.getByRole("link", { name: "foo.pdf" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "http://carbon.sage.com");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noreferrer");
  });

  test("in the completed state, it does not render a progress bar", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={completedStatusProps} />);
    await expect(page.getByRole("progressbar")).toHaveCount(0);
  });

  test("in the previously state, it does not render a status message", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={previouslyStatusProps} />);
    await expect(page.getByText("my status message")).toHaveCount(0);
  });

  test("in the previously state, it renders the file name as a link with the provided props", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={previouslyStatusProps} />);
    const link = await page.getByRole("link", { name: "foo.pdf" });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute("href", "http://carbon.sage.com");
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noreferrer");
  });

  test("in the previously state, it renders a delete button", async ({
    mount,
    page,
  }) => {
    let clickCount = 0;
    const onAction = () => {
      clickCount += 1;
    };
    await mount(
      <FileInputComponent
        uploadStatus={{ ...previouslyStatusProps, onAction }}
      />,
    );
    const actionButton = await page.getByRole("button", {
      name: "Delete file",
    });
    await expect(actionButton).toBeVisible();
    await actionButton.click();
    await expect(clickCount).toBe(1);
  });

  test("in the previously state, it does not render a progress bar", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={previouslyStatusProps} />);
    await expect(page.getByRole("progressbar")).toHaveCount(0);
  });

  test("in the error state, it renders a status message", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={errorStatusProps} />);
    await expect(page.getByText("my status message")).toBeVisible();
  });

  test("in the error state, it renders a clear button", async ({
    mount,
    page,
  }) => {
    let clickCount = 0;
    const onAction = () => {
      clickCount += 1;
    };
    await mount(
      <FileInputComponent uploadStatus={{ ...errorStatusProps, onAction }} />,
    );
    const actionButton = await page.getByRole("button", { name: "Clear" });
    await expect(actionButton).toBeVisible();
    await actionButton.click();
    await expect(clickCount).toBe(1);
  });

  test("in the error state, it renders the file name, but not as a link", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={errorStatusProps} />);
    await expect(page.getByText("foo.pdf")).toBeVisible();
    await expect(page.getByRole("link", { name: "foo.pdf" })).toHaveCount(0);
  });

  test("in the error state, it does not render a progress bar", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={errorStatusProps} />);
    await expect(page.getByRole("progressbar")).toHaveCount(0);
  });
});

test.describe("interactions", () => {
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
    await expect(onChangeCalls.length).toBe(1);
    await expect(onChangeCalls[0]).toMatchObject({
      name: "README.md",
      type: "text/markdown",
    });
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
      selector: '[data-component="file-input"] > div > div > div:last-child',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await expect(onChangeCalls.length).toBe(1);
    await expect(onChangeCalls[0]).toMatchObject({
      name: "README.md",
      type: "text/markdown",
    });
  });

  test("while dragging a file, the component border becomes thicker", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    await dragFile({
      page,
      eventName: "dragover",
      selector: "body",
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    const borderWidth = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("border-width"),
      );
    await expect(borderWidth).toBe("2px");
  });

  test("when dragging a file off the document, the component border returns to the original thickness", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    await dragFile({
      page,
      eventName: "dragover",
      selector: "body",
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await dragFile({
      page,
      eventName: "dragleave",
      selector: "body",
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    const borderWidth = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("border-width"),
      );
    await expect(borderWidth).toBe("1px");
  });

  test("after dropping a file, the component border returns to the original thickness", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    await dragFile({
      page,
      eventName: "dragover",
      selector: "body",
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    await dragFile({
      page,
      eventName: "drop",
      selector: "body",
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    const borderWidth = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("border-width"),
      );
    await expect(borderWidth).toBe("1px");
  });

  test("while dragging a file with the component in the error state, the border color changes", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent error />);
    await dragFile({
      page,
      eventName: "dragover",
      selector: "body",
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    const borderColor = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("border-color"),
      );
    // TODO: should check token value (--colorsSemanticNegative600), rewrite this when we have the equivalent playwright util merged in
    await expect(borderColor).toBe("rgb(162, 44, 59)");
  });

  test("while dragging a file over the component, the background color changes", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent />);
    await dragFile({
      page,
      eventName: "dragover",
      selector: '[data-component="file-input"] > div > div > div:last-child',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    const backgroundColor = await page
      .getByText("or drag and drop your file")
      .evaluate((el) =>
        window
          .getComputedStyle(el.parentElement as HTMLElement)
          .getPropertyValue("background-color"),
      );
    await expect(backgroundColor).toBe("rgb(204, 214, 219)");
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

  test("should pass accessibility tests with accept prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent accept="image/*" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with buttonText prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent buttonText="add a file" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with dragAndDropText prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent dragAndDropText="drop zone" />);
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

  test("should pass accessibility tests with id prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent id="custom-id" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with name prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent name="input-name" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with required prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent required />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with data-element prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent data-element="custom-data-element" />);
    await checkAccessibility(page);
  });

  test("should pass accessibility tests with data-role prop", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent data-role="custom-data-role" />);
    await checkAccessibility(page);
  });

  uploadStatuses.forEach((statusProps) => {
    test(`should pass accessibility tests with upload status ${statusProps.status}`, async ({
      mount,
      page,
    }) => {
      await mount(<FileInputComponent uploadStatus={statusProps} />);
      await checkAccessibility(page);
    });
  });
});
