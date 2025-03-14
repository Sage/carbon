import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../__spec_helper__/__internal__/test-utils";

import FileInput, { FileUploadStatusProps } from ".";

describe("rendering with no file uploaded", () => {
  it("renders a hidden HTML file input element", () => {
    render(<FileInput label="file input" onChange={() => {}} />);

    const hiddenInput = screen.getByLabelText("file input");

    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).not.toBeVisible();
  });

  it("renders an HTML button to choose a file to add", () => {
    render(<FileInput onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Select file" })).toBeVisible();
  });

  it("accepts an accept prop and passes it to the underlying input", () => {
    render(
      <FileInput
        label="file input"
        accept="image/*,.pdf"
        onChange={() => {}}
      />,
    );

    const hiddenInput = screen.getByLabelText("file input");

    expect(hiddenInput).toHaveAttribute("accept", "image/*,.pdf");
  });

  it("accepts a buttonText prop to change the button text", () => {
    render(<FileInput buttonText="add a file" onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "add a file" })).toBeVisible();
  });

  it("accepts a dragAndDropText prop to change the main text", () => {
    render(<FileInput dragAndDropText="drop zone" onChange={() => {}} />);

    expect(screen.getByText("drop zone")).toBeVisible();
  });

  it("accepts a label prop and renders it as a visible label", () => {
    render(<FileInput label="file input" onChange={() => {}} />);

    const label = screen.getByText("file input");

    expect(label).toBeVisible();
  });

  it("accepts an inputHint prop", () => {
    render(<FileInput inputHint="help" onChange={() => {}} />);

    const hintText = screen.getByText("help");

    expect(hintText).toBeVisible();
  });

  it("renders root container with correct data tag props", () => {
    render(
      <FileInput
        data-element="element-test"
        data-role="role-test"
        onChange={() => {}}
      />,
    );

    const rootContainer = screen.getByTestId("role-test");

    expect(rootContainer).toHaveAttribute("data-component", "file-input");
    expect(rootContainer).toHaveAttribute("data-element", "element-test");
  });

  it("renders with red, dashed border when error prop is true", () => {
    render(<FileInput error onChange={() => {}} />);

    const inputArea = screen.getByTestId("file-input-presentation");

    expect(inputArea).toHaveStyle(
      "border: var(--borderWidth200) dashed var(--colorsSemanticNegative500)",
    );
  });

  it("renders with red, dashed border and error message when error prop is passed as a string", () => {
    render(<FileInput error="error text" onChange={() => {}} />);

    const inputArea = screen.getByTestId("file-input-presentation");

    expect(inputArea).toHaveStyle(
      "border: var(--borderWidth200) dashed var(--colorsSemanticNegative500)",
    );
    expect(screen.getByText("error text")).toBeVisible();
  });

  it("accepts a name prop and passes it to the underlying input", () => {
    render(
      <FileInput label="file input" name="input-name" onChange={() => {}} />,
    );

    const hiddenInput = screen.getByLabelText("file input");

    expect(hiddenInput).toHaveAttribute("name", "input-name");
  });

  it("renders an asterisk next to label when required prop is passed", () => {
    render(<FileInput label="file input" required onChange={() => {}} />);

    expect(screen.getByText("file input")).toHaveStyleRule("content", '"*"', {
      modifier: "::after",
    });
  });

  it("renders a label with optional suffix when isOptional prop is passed", () => {
    render(<FileInput label="file input" isOptional onChange={() => {}} />);

    expect(screen.getByTestId("label-container")).toHaveStyleRule(
      "content",
      '"(optional)"',
      {
        modifier: "::after",
      },
    );
  });

  it("renders a root container with flex direction column when isVertical prop is true", () => {
    render(<FileInput isVertical onChange={() => {}} />);

    expect(screen.getByTestId("file-input-presentation")).toHaveStyle(
      "flex-direction: column",
    );
  });

  it("accepts a ref object", () => {
    const refObject: React.MutableRefObject<HTMLInputElement | null> = {
      current: null,
    };
    render(
      <FileInput label="file input" ref={refObject} onChange={() => {}} />,
    );

    const hiddenInput = screen.getByLabelText("file input");

    expect(refObject.current).toStrictEqual(hiddenInput);
  });

  it("accepts a callback ref", () => {
    const callbackRef = jest.fn();
    render(
      <FileInput label="file input" ref={callbackRef} onChange={() => {}} />,
    );

    const hiddenInput = screen.getByLabelText("file input");

    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(hiddenInput);
  });
});

describe("interactions", () => {
  it("clicking the button fires a click on the hidden file input", async () => {
    const user = userEvent.setup();
    const inputOnClick = jest.spyOn(HTMLInputElement.prototype, "click");
    render(<FileInput onChange={() => {}} />);

    await user.click(screen.getByRole("button", { name: "Select file" }));

    expect(inputOnClick).toHaveBeenCalledTimes(1);
  });

  it("uploading a file via the hidden input calls the onChange prop with the file as argument", async () => {
    const user = userEvent.setup();
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    const onChange = jest.fn();
    render(<FileInput label="file input" onChange={onChange} />);

    const hiddenInput = screen.getByLabelText("file input");
    await user.upload(hiddenInput, file);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0][0]).toBe(file);
  });

  // note: these style changes on dragging are better tested with Playwright (and will be too). The tests are here as
  // well in order to achieve coverage - because that's still better than just putting istanbul ignore everywhere.
  it("dragging a file onto the page causes the border style of the input area to change", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" onChange={() => {}} />);

    fireEvent.dragOver(document.body, {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(screen.getByTestId("file-input-presentation")).toHaveStyle(
      "border: var(--borderWidth200) dashed var(--colorsUtilityMajor400)",
    );
  });

  it("dragging a file onto the page causes the error state border-colour to change", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" error onChange={() => {}} />);

    fireEvent.dragOver(document.body, {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(screen.getByTestId("file-input-presentation")).toHaveStyle(
      "border: var(--borderWidth200) dashed var(--colorsSemanticNegative600)",
    );
  });

  it("dragging something that isn't a file has no effect", () => {
    render(<FileInput label="file input" onChange={() => {}} />);

    fireEvent.dragOver(document.body, {
      dataTransfer: { files: [], types: [] },
    });

    expect(screen.getByTestId("file-input-presentation")).toHaveStyle(
      "border: var(--borderWidth100) dashed var(--colorsUtilityMajor300)",
    );
  });

  it("dragging a file over the input area causes the background of the input area to change", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" onChange={() => {}} />);

    const inputArea = screen.getByTestId("file-input-presentation");

    fireEvent.dragOver(inputArea, {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(inputArea).toHaveStyle("background: var(--colorsUtilityMajor100)");
  });

  it("dragging a file over the input area and then away causes the background of the input area to return to the default", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" onChange={() => {}} />);

    const inputArea = screen.getByTestId("file-input-presentation");

    fireEvent.dragOver(inputArea, {
      dataTransfer: { files: [file], types: ["Files"] },
    });
    fireEvent.dragLeave(inputArea, {
      dataTransfer: { files: [file], types: ["Files"] },
    });

    expect(inputArea).toHaveStyle("background: var(--colorsUtilityYang100)");
  });

  it("dragging something that isn't a file over the input area has no effect", () => {
    render(<FileInput label="file input" onChange={() => {}} />);

    const inputArea = screen.getByTestId("file-input-presentation");

    fireEvent.dragOver(inputArea, {
      dataTransfer: { files: [], types: [] },
    });

    expect(inputArea).toHaveStyle("background: var(--colorsUtilityYang100)");
  });

  it("dragging and dropping a file over the input area calls the onChange prop with the dragged file as argument", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    const onChange = jest.fn();
    render(<FileInput label="file input" onChange={onChange} />);

    const inputArea = screen.getByTestId("file-input-presentation");

    fireEvent.drop(inputArea, { dataTransfer: { files: [file] } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0][0]).toBe(file);
  });
});

// there are more comprehensive tests for the FileUploadStatus subcomponent in that component's subfolder - this
// is just to check that the prop on FileUpload does as it should. Using RTL we can't directly check
// the props passed to the subcomponent so we have to check this indirectly.
describe("with uploadStatus prop set", () => {
  it.each([
    {
      status: "uploading",
      filename: "foo.pdf",
      onAction: () => {},
      progress: 30,
    },
    {
      status: "completed",
      filename: "foo.pdf",
      onAction: () => {},
      href: "http://carbon.sage.com",
    },
    {
      status: "previously",
      filename: "foo.pdf",
      onAction: () => {},
      href: "http://carbon.sage.com",
    },
    { status: "error", filename: "foo.pdf", onAction: () => {} },
  ] as FileUploadStatusProps[])(
    "when the status is `$status`, the hidden file input and the button are not rendered",
    (statusProps) => {
      render(
        <FileInput
          label="file input"
          uploadStatus={statusProps}
          onChange={() => {}}
        />,
      );

      const hiddenInput = screen.queryByLabelText("file input");
      const button = screen.queryByRole("button", { name: "Select file" });

      expect(hiddenInput).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    },
  );

  it("when the status is `uploading` and progress is set, a progress tracker is rendered", () => {
    render(
      <FileInput
        uploadStatus={{
          status: "uploading",
          filename: "foo.pdf",
          onAction: () => {},
          progress: 30,
        }}
        onChange={() => {}}
      />,
    );

    expect(screen.getByTestId("progress-tracker-bar")).toBeVisible();
    expect(screen.getByTestId("inner-bar")).toHaveStyle({ width: "30%" });
  });

  it("when the status is `completed`, a link is rendered with the status message", () => {
    render(
      <FileInput
        uploadStatus={{
          status: "completed",
          filename: "foo.pdf",
          onAction: () => {},
          href: "http://carbon.sage.com",
        }}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("link", { name: "foo.pdf" })).toBeVisible();
    expect(screen.getByText("File upload status")).toBeVisible();
  });

  it("when the status is `previously`, a link is rendered with no message", () => {
    render(
      <FileInput
        uploadStatus={{
          status: "previously",
          filename: "foo.pdf",
          onAction: () => {},
          href: "http://carbon.sage.com",
        }}
        onChange={() => {}}
      />,
    );

    expect(screen.getByRole("link", { name: "foo.pdf" })).toBeVisible();
    expect(screen.queryByText("File upload status")).not.toBeInTheDocument();
  });

  it("when the status is `error`, the component has an error-colored border", () => {
    render(
      <FileInput
        uploadStatus={{
          status: "error",
          filename: "foo.pdf",
          onAction: () => {},
        }}
        onChange={() => {}}
      />,
    );

    const fileUploadStatus = screen.getByTestId("file-upload-status");

    expect(fileUploadStatus).toHaveStyle(
      "border: var(--borderWidth200) solid var(--colorsSemanticNegative500)",
    );
  });
});
