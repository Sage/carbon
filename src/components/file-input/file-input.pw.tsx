import React from "react";
import { Page } from "@playwright/test";
import path from "path";
import { readFileSync } from "fs";
import { test, expect } from "../../../playwright/helpers/base-test";
import FileInputComponent from "./components.test-pw";
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
    expect(onChangeCalls.length).toBe(1);
    expect(onChangeCalls[0].name).toBe("README.md");
    expect(onChangeCalls[0].type || "text/markdown").toBe("text/markdown");
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
    expect(onChangeCalls.length).toBe(1);
    expect(onChangeCalls[0]).toMatchObject({
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
    expect(borderWidth).toBe("2px");
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
    expect(borderWidth).toBe("1px");
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
    expect(borderWidth).toBe("1px");
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
    expect(borderColor).toBe("rgb(162, 44, 59)");
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
    expect(backgroundColor).toBe("rgb(204, 214, 219)");
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
