import React from "react";
import { mount } from "enzyme";
import { css } from "styled-components";

import FileInputComponent from "./file-input.component";
import {
  HintText,
  FileDropArea,
  FileInput,
  FileInputContent,
  FileInputContentWrapper,
  FileInputContainer,
  FileInputForm,
  FirstSegment,
  FormattedText,
  NeutralLoaderBar,
  Placeholder,
  StyledButton,
  StyledLink,
  StyledProgressTracker,
  ValidationBorder,
  ValidationMessage,
} from "./file-input.style";
import StyledLoaderBar, {
  InnerBar as InnerLoaderBar,
} from "../loader-bar/loader-bar.style";
import { InnerBar as InnerProgressBar } from "../progress-tracker/progress-tracker.style";
import Label from "../../__internal__/label/label.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import { baseTheme } from "../../style/themes";

describe("File Input", () => {
  let wrapper;

  describe("when only necessary props are passed", () => {
    it("renders correctly", () => {
      wrapper = render({});
      expect(wrapper.find(FileInputForm).exists()).toBe(true);
      expect(wrapper.find(FileDropArea).exists()).toBe(true);
      expect(wrapper.find(FileInput).exists()).toBe(true);
      expect(wrapper.find(FileInputContent).exists()).toBe(true);
      expect(wrapper.find(FileInputContentWrapper).exists()).toBe(true);
      expect(wrapper.find(FileInputContainer).exists()).toBe(true);
      expect(wrapper.find(Placeholder).exists()).toBe(true);
      expect(wrapper.find(StyledButton).exists()).toBe(true);
      expect(wrapper.find(HintText).exists()).toBe(false);
      expect(wrapper.find(FirstSegment).exists()).toBe(false);
      expect(wrapper.find(FormattedText).exists()).toBe(false);
      expect(wrapper.find(StyledLink).exists()).toBe(false);
      expect(wrapper.find(NeutralLoaderBar).exists()).toBe(false);
      expect(wrapper.find(StyledProgressTracker).exists()).toBe(false);
      expect(wrapper.find(ValidationBorder).exists()).toBe(false);
      expect(wrapper.find(ValidationMessage).exists()).toBe(false);
    });
  });

  describe("with different sizes", () => {
    it("loads 'small' size correctly", () => {
      wrapper = render({ size: "small" });
      expect(wrapper.find(StyledButton).props().size).toBe("small");
      assertStyleMatch({ minHeight: "32px" }, wrapper.find(StyledButton));
    });

    it("loads 'medium' size correctly", () => {
      wrapper = render({ size: "medium" });
      expect(wrapper.find(StyledButton).props().size).toBe("medium");
      assertStyleMatch({ minHeight: "40px" }, wrapper.find(StyledButton));
    });

    it("loads 'large' size correctly", () => {
      wrapper = render({ size: "large" });
      expect(wrapper.find(StyledButton).props().size).toBe("large");
      assertStyleMatch({ minHeight: "48px" }, wrapper.find(StyledButton));
    });
  });

  describe("label property", () => {
    it("renders correctly", () => {
      wrapper = render({ label: "Custom label" });
      expect(
        wrapper.containsMatchingElement(<Label>Custom label</Label>)
      ).toBeTruthy();
    });
  });

  describe("hintText property", () => {
    beforeEach(() => {
      wrapper = render({
        hintText: "Hint text",
      });
    });

    it("renders correctly", () => {
      expect(
        wrapper.containsMatchingElement(<HintText>Hint text</HintText>)
      ).toBeTruthy();
    });

    it("renders the correct hint text styles", () => {
      assertStyleMatch(
        { color: baseTheme.fileInput.hintText },
        wrapper.find(HintText)
      );
    });
  });

  describe("when disabled = true", () => {
    it("renders the correct styles for disabled prop", () => {
      wrapper = render({ disabled: true });
      assertStyleMatch(
        {
          background: baseTheme.disabled.input,
          borderColor: baseTheme.disabled.border,
        },
        wrapper.find(FileDropArea)
      );
      assertStyleMatch(
        {
          background: baseTheme.disabled.background,
          color: baseTheme.disabled.text,
        },
        wrapper.find(StyledButton)
      );
      assertStyleMatch(
        {
          borderColor: baseTheme.disabled.border,
          background: baseTheme.disabled.input,
        },
        wrapper.find(FileInputContent)
      );
    });

    it("renders the correct styles for disabled and draggable props", () => {
      wrapper = render({ disabled: true, draggable: true });
      assertStyleMatch(
        {
          border: `1px dashed ${baseTheme.fileInput.border}`,
          borderColor: baseTheme.disabled.border,
        },
        wrapper.find(FileDropArea)
      );
    });

    it("renders the correct styles when file was added and has disabled prop", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      wrapper.setProps({ disabled: true });
      assertStyleMatch(
        {
          color: baseTheme.disabled.text,
        },
        wrapper.find(StyledButton)
      );
      assertStyleMatch(
        {
          borderColor: baseTheme.disabled.border,
          background: baseTheme.disabled.input,
        },
        wrapper.find(FileInputContent)
      );
    });

    it("components get the right props", () => {
      expect(wrapper.find(StyledButton).props().disabled).toBeTruthy();
      expect(wrapper.find(FileDropArea).props().disabled).toBeTruthy();
      expect(wrapper.find(Label).props().disabled).toBeTruthy();
      expect(wrapper.find(FileInputContent).props().disabled).toBeTruthy();
    });
  });

  describe("input file", () => {
    afterEach(() => {
      window.URL.createObjectURL.mockReset();
    });
    window.URL.createObjectURL = jest.fn();

    it("handleFileChoose is not called when the user doesn't select any file", () => {
      const handleFileChoose = jest.fn();
      wrapper = render();
      wrapper.find(FileInput).simulate("change", { target: { files: [] } });
      wrapper.update();
      expect(handleFileChoose).toHaveBeenCalledTimes(0);
    });

    it("the file name is displayed after choosing", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(wrapper.find(FormattedText).text()).toBe("photo.png");
    });

    it("handles long file names", () => {
      wrapper = render();
      const file = new File(["file"], "verylongfilenamefortestpurposes.png", {
        type: "image/png",
      });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(
        wrapper.containsMatchingElement(
          <span>verylongfilenamefortestpurp</span>
        )
      ).toBe(true);
      expect(wrapper.containsMatchingElement(<span>oses.png</span>)).toBe(true);
    });

    it("the number of files is displayed when more than one selected with allowMultiple prop", () => {
      wrapper = render({ allowMultiple: true });
      const file1 = new File(["file1"], "photo1.png", { type: "image/png" });
      const file2 = new File(["file2"], "photo2.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("change", { target: { files: [file1, file2] } });
      wrapper.update();
      expect(wrapper.text().includes("2 files selected")).toBe(true);
    });

    it("the filename is displayed when one selected with allowMultiple prop", () => {
      wrapper = render({ allowMultiple: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(wrapper.text().includes("photo.png")).toBe(true);
    });

    describe("accept prop", () => {
      it("accepts the correct type if it is a string", () => {
        wrapper = render({ accept: "image/png" });
        const file = new File(["file"], "photo.png", { type: "image/png" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        expect(wrapper.find(FormattedText).text()).toBe("photo.png");
      });

      it("accepts the correct type if it is an array of strings", () => {
        wrapper = render({ accept: ["application/pdf", "image/png"] });
        const file = new File(["file"], "photo.png", { type: "image/png" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        expect(wrapper.find(FormattedText).text()).toBe("photo.png");
      });

      it("call onFileRejected when an added file has an incorrect type", () => {
        const onFileRejected = jest.fn();
        wrapper = render({ accept: "image/png", onFileRejected });
        const file = new File(["file"], "fileName.pdf", {
          type: "application/pdf",
        });

        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        expect(onFileRejected).toHaveBeenCalledWith(
          [file],
          "INVALID_FILE_TYPE"
        );
      });
    });
  });

  describe("draggable prop", () => {
    beforeEach(() => {
      wrapper = render({
        draggable: true,
        dragPlaceholder: "Drop the file here.",
      });
    });

    it("shows secondary placeholder", () => {
      expect(wrapper.find(Placeholder).text()).toBe("Drop the file here.");
    });

    it("renders the correct styles for draggable prop", () => {
      assertStyleMatch(
        {
          color: baseTheme.text.placeholder,
        },
        wrapper.find(Placeholder)
      );
      assertStyleMatch(
        {
          border: `1px dashed ${baseTheme.fileInput.border}`,
          borderRight: "none",
        },
        wrapper.find(FileDropArea)
      );
    });
  });

  describe("isUploading prop", () => {
    describe("loader bar", () => {
      beforeEach(() => {
        wrapper = render({
          loaderType: "untracked",
          accept: ["application/pdf", "image/png"],
        });
        const file = new File(["file"], "photo.png", { type: "image/png" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        wrapper.setProps({ isUploading: true });
      });

      it("renders the loading bar correctly", () => {
        expect(wrapper.find(NeutralLoaderBar).exists()).toBe(true);
      });

      it("show the loading bar when input is disabled", () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find(NeutralLoaderBar).exists()).toBe(true);
      });

      it("renders the correct loader bar styles", () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.fileInput.loaderBar.background,
          },
          wrapper.find(NeutralLoaderBar),
          {
            modifier: css`
              ${StyledLoaderBar}
            `,
          }
        );
        assertStyleMatch(
          {
            backgroundColor: baseTheme.fileInput.loaderBar.innerBackground,
          },
          wrapper.find(NeutralLoaderBar),
          {
            modifier: css`
              ${InnerLoaderBar}
            `,
          }
        );
      });
    });

    describe("progress tracker", () => {
      beforeEach(() => {
        wrapper = render({
          loaderType: "tracked",
          accept: ["application/pdf", "image/png"],
        });
        const file = new File(["file"], "photo.png", { type: "image/png" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        wrapper.setProps({ isUploading: true, progress: 10 });
      });

      it("renders the progress tracker correctly", () => {
        expect(wrapper.find(StyledProgressTracker).exists()).toBe(true);
      });

      it("show the progress tracker when input is disabled", () => {
        wrapper.setProps({ disabled: true });
        expect(wrapper.find(StyledProgressTracker).exists()).toBe(true);
      });

      it("renders red color for the progress bar when error is shown ", () => {
        wrapper.setProps({ error: "Error message" });
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.error,
          },
          wrapper.find(StyledProgressTracker),
          {
            modifier: css`
              ${InnerProgressBar}
            `,
          }
        );
      });
    });
  });

  describe("Button", () => {
    describe("renders the correct styles for the selected button type", () => {
      describe("primary button", () => {
        beforeEach(() => {
          wrapper = render({ buttonType: "primary" });
        });

        it("shows correct color for default style", () => {
          assertStyleMatch(
            {
              background: baseTheme.fileInput.minorButton.primary,
            },
            wrapper.find(StyledButton)
          );
        });

        it("shows color change on hover", () => {
          assertStyleMatch(
            {
              background: baseTheme.fileInput.minorButton.hover,
              borderColor: baseTheme.fileInput.minorButton.hover,
            },
            wrapper.find(StyledButton),
            { modifier: ":hover" }
          );
        });

        it("shows correct color when button is disabled", () => {
          wrapper.setProps({ disabled: true });
          assertStyleMatch(
            {
              background: baseTheme.disabled.background,
              color: baseTheme.disabled.text,
            },
            wrapper.find(StyledButton)
          );
        });

        it("doesn't change color when button is disabled and hovered over", () => {
          wrapper.setProps({ disabled: true });
          assertStyleMatch(
            {
              background: baseTheme.disabled.background,
              color: baseTheme.disabled.text,
              borderColor: baseTheme.disabled.background,
            },
            wrapper.find(StyledButton),
            { modifier: ":hover" }
          );
        });
      });

      describe("secondary button", () => {
        beforeEach(() => {
          wrapper = render({ buttonType: "secondary" });
        });

        it("shows correct color for default style", () => {
          assertStyleMatch(
            {
              background: "transparent",
              border: `2px solid ${baseTheme.fileInput.minorButton.primary}`,
              color: baseTheme.fileInput.minorButton.primary,
            },
            wrapper.find(StyledButton)
          );
        });

        it("shows color change on hover", () => {
          assertStyleMatch(
            {
              background: baseTheme.fileInput.minorButton.hover,
              borderColor: baseTheme.fileInput.minorButton.hover,
            },
            wrapper.find(StyledButton),
            { modifier: ":hover" }
          );
        });

        it("shows correct color when button is disabled", () => {
          wrapper.setProps({ disabled: true });
          assertStyleMatch(
            {
              background: baseTheme.disabled.background,
              border: `2px solid ${baseTheme.disabled.background}`,
              color: baseTheme.disabled.text,
            },
            wrapper.find(StyledButton)
          );
        });
      });
    });

    it("can be clicked", () => {
      wrapper = render();
      wrapper.find(StyledButton).props().onClick();
    });

    it("renders the correct styles for the primary button type", () => {});

    it("shows Cancel button while uploading the file", () => {
      wrapper = render();
      const file = new File(["file"], "fileName.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.setProps({ isUploading: true });
      expect(wrapper.containsMatchingElement(<span>Cancel</span>)).toBe(true);
    });

    it("shows Remove button when file is chosen", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>Remove</span>)).toBe(true);
      expect(wrapper.text().includes("photo.png")).toBe(true);
    });

    it("shows Remove button when files are chosen", () => {
      wrapper = render({ allowMultiple: true });
      const file1 = new File(["file1"], "photo1.png", { type: "image/png" });
      const file2 = new File(["file2"], "photo2.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("change", { target: { files: [file1, file2] } });
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>Remove</span>)).toBe(true);
      expect(wrapper.text().includes("2 files selected")).toBe(true);
    });

    it("shows Choose button after removing the file", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      wrapper.find(StyledButton).simulate("click");
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>Choose</span>)).toBe(true);
      expect(wrapper.text().includes("photo.png")).toBe(false);
    });

    it("shows Choose button after removing several files", () => {
      wrapper = render({ allowMultiple: true });
      const file1 = new File(["file1"], "photo1.png", { type: "image/png" });
      const file2 = new File(["file2"], "photo2.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("change", { target: { files: [file1, file2] } });
      wrapper.update();
      wrapper.find(StyledButton).simulate("click");
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>Choose</span>)).toBe(true);
      expect(wrapper.text().includes("2 files selected")).toBe(false);
    });

    it("Cancel button calls cancelAction method", () => {
      const cancelAction = jest.fn();
      wrapper = render({ cancelAction });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.setProps({ isUploading: true });
      wrapper.update();
      wrapper.find(StyledButton).simulate("click");
      expect(cancelAction).toHaveBeenCalled();
    });
  });

  describe("cancelAction prop", () => {
    it("calls cancelAction", () => {
      wrapper = render({ isUploading: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      wrapper.find(StyledButton).simulate("click");
      wrapper.update();
    });

    it("calls the cancelAction correctly when passed", () => {
      const cancelAction = jest.fn();
      wrapper = render({ cancelAction });
      wrapper.invoke("cancelAction")();
      expect(cancelAction).toHaveBeenCalled();
    });
  });

  describe("Drag movements", () => {
    it("Change style when drag enter with draggable prop", async () => {
      wrapper = render({ draggable: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper
        .find(FileDropArea)
        .simulate("dragover", { target: { files: [file] } });
      wrapper.update();
      assertStyleMatch(
        {
          backgroundColor: baseTheme.colors.dashedHoverBackground,
          borderWidth: "2px",
        },
        wrapper.find(FileInputContent)
      );
      assertStyleMatch(
        { color: baseTheme.text.color },
        wrapper.find(Placeholder)
      );
    });

    it("Change style when drag leave with draggable prop", async () => {
      wrapper = render({ draggable: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper
        .find(FileDropArea)
        .simulate("dragleave", { target: { files: [file] } });
      wrapper.update();
      assertStyleMatch(
        { backgroundColor: undefined },
        wrapper.find(FileInputContent)
      );
    });

    it("works fine without draggable prop", async () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper
        .find(FileDropArea)
        .simulate("dragover", { target: { files: [file] } });
      wrapper
        .find(FileDropArea)
        .simulate("drop", { dataTransfer: { files: [file] } });
      wrapper.update();
      assertStyleMatch(
        { backgroundColor: undefined },
        wrapper.find(FileDropArea)
      );
    });

    it("shows file name when the file is dropped", () => {
      wrapper = render({ draggable: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("dragover", { target: { files: [file] } });
      wrapper
        .find(FileInput)
        .simulate("drop", { dataTransfer: { files: [file] } });
      wrapper.update();
      expect(wrapper.find(FormattedText).text()).toBe("photo.png");
    });

    it("calls onFileRejected when more than one file is dropped to non-multiple input", () => {
      const onFileRejected = jest.fn();
      wrapper = render({ draggable: true, onFileRejected });
      const file1 = new File(["file1"], "photo1.png", { type: "image/png" });
      const file2 = new File(["file2"], "photo2.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("dragover", { target: { files: [file1, file2] } });
      wrapper
        .find(FileInput)
        .simulate("drop", { dataTransfer: { files: [file1, file2] } });
      wrapper.update();
      expect(onFileRejected).toHaveBeenCalledWith(
        [file1, file2],
        "MULTIPLE_FILES"
      );
    });
  });

  describe("error prop", () => {
    beforeEach(() => {
      wrapper = render({ onFileRejected: jest.fn(), error: "Custom error" });
    });

    it("renders correctly", () => {
      expect(wrapper.find(ValidationBorder).exists()).toBe(true);
      expect(
        wrapper.find(ValidationMessage).text().includes("Custom error")
      ).toBe(true);
    });

    it("renders the correct styles for error prop", () => {
      assertStyleMatch(
        { border: `2px solid ${baseTheme.colors.error}` },
        wrapper.find(FileInputContent)
      );
      assertStyleMatch(
        { backgroundColor: baseTheme.colors.error },
        wrapper.find(ValidationBorder)
      );
      assertStyleMatch(
        { color: baseTheme.colors.error, fontWeight: "bold" },
        wrapper.find(ValidationMessage)
      );
    });

    it("renders the correct styles for error and draggable props", () => {
      wrapper.setProps({ draggable: true });
      assertStyleMatch(
        {
          border: `2px solid ${baseTheme.colors.error}`,
          borderStyle: "dashed",
        },
        wrapper.find(FileInputContent)
      );
      assertStyleMatch(
        { backgroundColor: baseTheme.colors.error },
        wrapper.find(ValidationBorder)
      );
      assertStyleMatch(
        { color: baseTheme.colors.error, fontWeight: "bold" },
        wrapper.find(ValidationMessage)
      );
    });
  });

  describe("warning prop", () => {
    beforeEach(() => {
      wrapper = render({ warning: "Caution message" });
    });

    it("renders correctly", () => {
      expect(wrapper.find(ValidationBorder).exists()).toBe(true);
      expect(
        wrapper.find(ValidationMessage).text().includes("Caution message")
      ).toBe(true);
    });

    it("renders the correct styles for error prop", () => {
      assertStyleMatch(
        { backgroundColor: baseTheme.colors.warning },
        wrapper.find(ValidationBorder)
      );
      assertStyleMatch(
        { color: baseTheme.colors.warning },
        wrapper.find(ValidationMessage)
      );
    });
  });

  describe("readOnly prop", () => {
    beforeEach(() => {
      wrapper = render({ readOnly: true });
      expect(wrapper.find(StyledButton).exists()).toBe(true);
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
    });

    it("button disappears when file input is read-only", () => {
      expect(wrapper.find(StyledButton).exists()).toBe(false);
    });

    it("renders the correct styles for readOnly prop", () => {
      assertStyleMatch(
        { color: baseTheme.text.color },
        wrapper.find(StyledLink),
        { modifier: "a" }
      );
      assertStyleMatch(
        {
          height: "40px",
          background: baseTheme.disabled.input,
          border: `1px solid ${baseTheme.disabled.border}`,
        },
        wrapper.find(FileInputContent)
      );
    });
  });

  describe("id prop", () => {
    it("sets the id specified by the user", () => {
      wrapper = render({ id: "file-input-user-id" });

      expect(wrapper.find(FileInput).props().id).toEqual("file-input-user-id");
    });

    it("sets id default if no id prop are given", () => {
      wrapper = render({ label: "Custom label" });

      expect(wrapper.find(FileInput).props().id).toEqual(
        "file-upload-Custom label"
      );
    });
  });
});

function render(props = {}, renderer = mount) {
  return renderer(
    <FileInputComponent fileChooseAction={jest.fn()} {...props} />
  );
}
