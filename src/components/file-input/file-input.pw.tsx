import React from "react";
import { Page } from "@playwright/test";
import path from "path";
import { readFileSync } from "fs";
import { test, expect } from "../../../playwright/helpers/base-test";
import FileInputComponent, {
  DuplicateFilenameFocusPreservationHarness,
  DropFocusHarness,
  FocusPreservationHarness,
  SecondaryActionFocusPreservationHarness,
} from "./components.test-pw";
import { selectFileButton } from "../../../playwright/components/file-input";
import { checkAccessibility } from "../../../playwright/support/helper";
import { FileUploadStatusProps } from ".";
import Box from "../box";

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

test.describe("with uploadStatus prop", () => {
  test("in the completed state, the filename is plain text and Preview links to href", async ({
    mount,
    page,
  }) => {
    await mount(<FileInputComponent uploadStatus={completedStatusProps} />);
    await expect(
      page.getByRole("link", {
        name: completedStatusProps.filename,
        exact: true,
      }),
    ).toHaveCount(0);
    const preview = page.getByRole("link", {
      name: `Preview ${completedStatusProps.filename}`,
    });
    await expect(preview).toHaveAttribute(
      "href",
      completedStatusProps.href as string,
    );
    await expect(preview).toHaveAttribute("target", "_blank");
    await expect(preview).toHaveAttribute("rel", "noreferrer");
  });

  test("scrolls a long status-card list inside a height-constrained parent", async ({
    mount,
    page,
  }) => {
    await mount(
      <Box height="600px" width="500px">
        <FileInputComponent
          multiple
          uploadStatus={Array.from({ length: 10 }, (_, index) => ({
            id: `file-${index}`,
            status: "completed" as const,
            filename: `file-${index}.pdf`,
            onDelete: () => {},
          }))}
        />
      </Box>,
    );

    const list = page.getByRole("list", { name: "Current files (10)" });
    const listScroller = list.locator("..");
    const clientHeight = await listScroller.evaluate(
      (element) => element.clientHeight,
    );
    const scrollHeight = await listScroller.evaluate(
      (element) => element.scrollHeight,
    );
    expect(clientHeight).toBeGreaterThan(0);
    expect(scrollHeight).toBeGreaterThan(clientHeight);
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

  test("after a controlled drop, focuses Select files before the new file action", async ({
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
      page.getByRole("button", { name: /Select files$/ }),
    ).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(
      page.getByRole("button", { name: "Delete README.md" }),
    ).toBeFocused();
  });

  // A Field error must not prevent a real file drop from reaching onChange.
  test("dropping a file while a Field error is present passes the file to onChange", async ({
    mount,
    page,
  }) => {
    await enableFileJSON(page);
    const onChangeCalls: File[] = [];
    const onChange = (files: FileList) => {
      onChangeCalls.push(files[0]);
    };
    await mount(
      <FileInputComponent
        error="Select at least one file"
        onChange={onChange}
      />,
    );
    await dragFile({
      page,
      eventName: "drop",
      selector: '[data-role="file-input-presentation"]',
      filePath: path.join(process.cwd(), "playwright", "README.md"),
      fileName: "README.md",
      fileType: "text/markdown",
    });
    expect(onChangeCalls.length).toBe(1);
    expect(onChangeCalls[0].name).toBe("README.md");
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

  test("should pass accessibility tests with a populated current and previous files collection", async ({
    mount,
    page,
  }) => {
    // Exercises the named-list markup with more than one item per
    // collection, which the single-status checks above never render.
    await mount(<FileInputComponent uploadStatus={uploadStatuses} />);
    await checkAccessibility(page);
  });
});

test.describe("focus management", () => {
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

  test("removing a middle card's focused action moves focus to the next card's action", async ({
    mount,
    page,
  }) => {
    await mount(<FocusPreservationHarness />);
    await page.getByRole("button", { name: "Remove b.pdf" }).click();
    await expect(
      page.getByRole("button", { name: "Remove c.pdf" }),
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

  test("removing the only remaining card's focused action returns focus to Select files", async ({
    mount,
    page,
  }) => {
    await mount(<FocusPreservationHarness />);
    await page.getByRole("button", { name: "Remove a.pdf" }).click();
    await page.getByRole("button", { name: "Remove b.pdf" }).click();
    await page.getByRole("button", { name: "Remove c.pdf" }).click();
    await expect(
      page.getByRole("button", { name: /Select files$/ }),
    ).toBeFocused();
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
    await page.getByRole("button", { name: "Delete a.pdf" }).click();
    await expect(
      page.getByRole("button", { name: "Delete b.pdf" }),
    ).toBeFocused();
  });
});
