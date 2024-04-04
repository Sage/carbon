import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rootTagTestRtl } from "../../__internal__/utils/helpers/tags/tags-specs/tags-specs";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";

import FileInput, { FileUploadStatusProps } from ".";

describe("rendering with no file uploaded", () => {
  it("renders a hidden HTML file input element", () => {
    render(<FileInput label="file input" onChange={() => {}} />);
    const hiddenInput = screen.queryByLabelText("file input");
    expect(hiddenInput).toBeInTheDocument();
    expect(hiddenInput).not.toBeVisible();
  });

  it("renders an HTML button to choose a file to add", () => {
    render(<FileInput onChange={() => {}} />);
    expect(
      screen.queryByRole("button", { name: "Select file" })
    ).toBeInTheDocument();
  });

  it("accepts an accept prop and passes it to the underlying input", () => {
    render(
      <FileInput label="file input" accept="image/*,.pdf" onChange={() => {}} />
    );
    const hiddenInput = screen.queryByLabelText("file input");
    expect(hiddenInput).toHaveAttribute("accept", "image/*,.pdf");
  });

  it("accepts a buttonText prop to change the button text", () => {
    render(<FileInput buttonText="add a file" onChange={() => {}} />);
    expect(
      screen.queryByRole("button", { name: "add a file" })
    ).toBeInTheDocument();
  });

  it("accepts a dragAndDropText prop to change the main text", () => {
    render(<FileInput dragAndDropText="drop zone" onChange={() => {}} />);
    expect(screen.queryByText("drop zone")).toBeInTheDocument();
  });

  it("accepts a label prop and renders it as a visible label", () => {
    render(<FileInput label="file input" onChange={() => {}} />);
    const label = screen.getByText("file input");
    expect(label).toBeInTheDocument();
    expect(label).toBeVisible();
  });

  it("accepts an inputHint prop", () => {
    render(<FileInput inputHint="help" onChange={() => {}} />);
    const hintText = screen.getByText("help");
    expect(hintText).toBeInTheDocument();
    expect(hintText).toBeVisible();
  });

  it("accepts data tag props", () => {
    render(
      <FileInput
        data-element="element-test"
        data-role="role-test"
        onChange={() => {}}
      />
    );
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement?.parentElement?.parentElement
      ?.parentElement as HTMLElement;
    rootTagTestRtl(wrapperElement, "file-input", "element-test", "role-test");
  });

  it("accepts an error prop as a boolean", () => {
    render(<FileInput error onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement;
    assertStyleMatch(
      {
        border: "var(--borderWidth200) dashed var(--colorsSemanticNegative500)",
      },
      wrapperElement
    );
  });

  it("accepts an error prop as a string", () => {
    render(<FileInput error="error text" onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement;
    assertStyleMatch(
      {
        border: "var(--borderWidth200) dashed var(--colorsSemanticNegative500)",
      },
      wrapperElement
    );
    expect(screen.getByText("error text")).toBeVisible();
  });

  it("accepts a name prop and passes it to the underlying input", () => {
    render(
      <FileInput label="file input" name="input-name" onChange={() => {}} />
    );
    const hiddenInput = screen.queryByLabelText("file input");
    expect(hiddenInput).toHaveAttribute("name", "input-name");
  });

  it("accepts a required prop", () => {
    render(<FileInput label="file input" required onChange={() => {}} />);
    const label = screen.getByText("file input");
    assertStyleMatch({ content: '"*"' }, label, { modifier: "::after" });
  });

  it("accepts an isOptional prop", () => {
    render(<FileInput label="file input" isOptional onChange={() => {}} />);
    const label = screen.getByText("file input");
    assertStyleMatch({ content: '"(optional)"' }, label.parentElement, {
      modifier: "::after",
    });
  });

  it("accepts an isVertical prop which removes the CSS max-height", () => {
    render(<FileInput isVertical onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    assertStyleMatch({ maxHeight: undefined }, wrapperElement);
  });

  it("accepts a ref object", () => {
    const refObject: React.MutableRefObject<HTMLInputElement | null> = {
      current: null,
    };
    render(
      <FileInput label="file input" ref={refObject} onChange={() => {}} />
    );
    const hiddenInput = screen.queryByLabelText("file input");
    expect(refObject.current).toBe(hiddenInput);
  });

  it("accepts a callback ref", () => {
    const callbackRef = jest.fn();
    render(
      <FileInput label="file input" ref={callbackRef} onChange={() => {}} />
    );
    const hiddenInput = screen.queryByLabelText("file input");
    expect(callbackRef).toHaveBeenCalledTimes(1);
    expect(callbackRef).toHaveBeenCalledWith(hiddenInput);
  });
});

describe("interactions", () => {
  it("clicking the button fires a click on the hidden file input", async () => {
    const inputOnClick = jest.spyOn(HTMLInputElement.prototype, "click");
    render(<FileInput onChange={() => {}} />);
    await userEvent.click(screen.getByRole("button", { name: "Select file" }));
    expect(inputOnClick).toHaveBeenCalledTimes(1);
  });

  it("uploading a file via the hidden input calls the onChange prop with the file as argument", async () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    const onChange = jest.fn();
    render(<FileInput label="file input" onChange={onChange} />);
    const hiddenInput = screen.getByLabelText("file input");
    await userEvent.upload(hiddenInput, file);
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
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.dragOver(document.body, {
      dataTransfer: { files: [file], types: ["Files"] },
    });
    assertStyleMatch(
      { border: "var(--borderWidth200) dashed var(--colorsUtilityMajor400)" },
      wrapperElement
    );
  });

  it("dragging a file onto the page causes the error state border-colour to change", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" error onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.dragOver(document.body, {
      dataTransfer: { files: [file], types: ["Files"] },
    });
    assertStyleMatch(
      {
        border: "var(--borderWidth200) dashed var(--colorsSemanticNegative600)",
      },
      wrapperElement
    );
  });

  it("dragging something that isn't a file has no effect", () => {
    render(<FileInput label="file input" onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.dragOver(document.body, {
      dataTransfer: { files: [], types: [] },
    });
    assertStyleMatch(
      { border: "var(--borderWidth100) dashed var(--colorsUtilityMajor300)" },
      wrapperElement
    );
  });

  it("dragging a file over the input area causes the background of the input area to change", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.dragOver(wrapperElement, {
      dataTransfer: { files: [file], types: ["Files"] },
    });
    assertStyleMatch(
      { background: "var(--colorsUtilityMajor100)" },
      wrapperElement
    );
  });

  it("dragging a file over the input area and then away causes the background of the input area to return to the default", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    render(<FileInput label="file input" onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.dragOver(wrapperElement, {
      dataTransfer: { files: [file], types: ["Files"] },
    });
    fireEvent.dragLeave(wrapperElement, {
      dataTransfer: { files: [file], types: ["Files"] },
    });
    assertStyleMatch(
      { background: "var(--colorsUtilityYang100)" },
      wrapperElement
    );
  });

  it("dragging something that isn't a file over the input area has no effect", () => {
    render(<FileInput label="file input" onChange={() => {}} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.dragOver(wrapperElement, {
      dataTransfer: { files: [], types: [] },
    });
    assertStyleMatch(
      { background: "var(--colorsUtilityYang100)" },
      wrapperElement
    );
  });

  it("dragging and dropping a file over the input area calls the onChange prop with the dragged file as argument", () => {
    const file = new File(["dummy file content"], "foo.txt", {
      type: "text/plain",
    });
    const onChange = jest.fn();
    render(<FileInput label="file input" onChange={onChange} />);
    const wrapperElement = screen.getByText("or drag and drop your file")
      .parentElement as HTMLElement;
    fireEvent.drop(wrapperElement, { dataTransfer: { files: [file] } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0][0]).toBe(file);
  });
});

// there are more comprehensive tests for the FileUploadStatus subcomponent in that component's subfolder - this
// is just to check that the prop on FileUpload does as it should. Using RTL not enzyme we can't directly check
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
        />
      );
      const hiddenInput = screen.queryByLabelText("file input");
      const button = screen.queryByRole("button", { name: "Select file" });
      expect(hiddenInput).not.toBeInTheDocument();
      expect(button).not.toBeInTheDocument();
    }
  );

  it("when the status is `uploading`, a progress bar or loader bar is rendered", () => {
    render(
      <FileInput
        uploadStatus={{
          status: "uploading",
          filename: "foo.pdf",
          onAction: () => {},
          progress: 30,
        }}
        onChange={() => {}}
      />
    );
    expect(screen.queryByRole("progressbar")).toBeInTheDocument();
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
      />
    );
    expect(screen.queryByRole("link", { name: "foo.pdf" })).toBeInTheDocument();
    expect(screen.queryByText("File upload status")).toBeInTheDocument();
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
      />
    );
    expect(screen.queryByRole("link", { name: "foo.pdf" })).toBeInTheDocument();
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
      />
    );
    const wrapperElement = screen.getByText("File upload status").parentElement
      ?.parentElement as HTMLElement;
    assertStyleMatch(
      {
        border: "var(--borderWidth200) solid var(--colorsSemanticNegative500)",
      },
      wrapperElement
    );
  });
});
