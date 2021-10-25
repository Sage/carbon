import React from "react";
import { mount } from "enzyme";
import FileInputComponent from "./file-input.component";
import { assertStyleMatch } from "../../__spec_helper__/test-utils";
import {
  ErrorBorder,
  ErrorMessage,
  FileDropArea,
  FileInput,
  FileInputForm,
  FileInputLabel,
  FileInputTitle,
} from "./file-input.style";
import StyledButton from "../button/button.style";
import LoaderBar from "../loader-bar/loader-bar.component";
import Button from "../button";
import { baseTheme } from "../../style/themes";

describe("File Input", () => {
  let wrapper;

  describe("when only necessary props are passed", () => {
    it("renders correctly", () => {
      wrapper = render({});
      expect(wrapper.find(FileInputForm).exists()).toBe(true);
      expect(wrapper.find(FileDropArea).exists()).toBe(true);
      expect(wrapper.find(FileInput).exists()).toBe(true);
      expect(wrapper.find(FileInputLabel).exists()).toBe(true);
      expect(wrapper.find(FileInputTitle).exists()).toBe(true);
      expect(wrapper.find(ErrorBorder).exists()).toBe(false);
      expect(wrapper.find(ErrorMessage).exists()).toBe(false);
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
    beforeEach(() => {
      wrapper = render({ label: "Custom label" });
    });

    it("renders correctly", () => {
      expect(
        wrapper.containsMatchingElement(<div>Custom label</div>)
      ).toBeTruthy();
    });
  });

  describe("disabled", () => {
    beforeEach(() => {
      wrapper = render({ disabled: true });
    });
    it("renders correctly", () => {
      expect(wrapper.find(StyledButton).props().disabled).toBeTruthy();
    });
  });

  describe("input file", () => {
    afterEach(() => {
      window.URL.createObjectURL.mockReset();
    });
    window.URL.createObjectURL = jest.fn();

    it("the file name is displayed after choosing", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>photo.png</span>)).toBe(
        true
      );
    });

    it("handles long file names", () => {
      wrapper = render();
      const file = new File(["file"], "verylongfilenamefortestpurposes.png", {
        type: "image/png",
      });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(
        wrapper.containsMatchingElement(<span>verylongfi...oses.png</span>)
      ).toBe(true);
    });

    it("the number of files is displayed when more than one selected with allowMultiple prop", () => {
      wrapper = render({ allowMultiple: true });
      const file1 = new File(["file1"], "photo1.png", { type: "image/png" });
      const file2 = new File(["file2"], "photo2.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("change", { target: { files: [file1, file2] } });
      wrapper.update();
      expect(wrapper.text().includes("2 files selected.")).toBe(true);
    });

    it("the filename is displayed when one selected with allowMultiple prop", () => {
      wrapper = render({ allowMultiple: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(wrapper.text().includes("photo.png")).toBe(true);
    });

    it("shows Cancel button while uploading the file", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.setProps({ isUploading: true });
      expect(wrapper.containsMatchingElement(<span>Cancel</span>)).toBe(true);
    });

    describe("accept prop", () => {
      it("accepts the correct type if it is a string", () => {
        wrapper = render({ accept: "image/png" });
        const file = new File(["file"], "photo.png", { type: "image/png" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        expect(wrapper.containsMatchingElement(<span>photo.png</span>)).toBe(
          true
        );
      });

      it("accepts the correct type if it is an array of strings", () => {
        wrapper = render({ accept: ["application/pdf", "image/png"] });
        const file = new File(["file"], "photo.png", { type: "image/png" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        expect(wrapper.containsMatchingElement(<span>photo.png</span>)).toBe(
          true
        );
      });

      it("declines the invalid type", () => {
        wrapper = render({ accept: "image/png" });
        const file = new File(["file"], "photo.png", { type: "image/jpg" });
        wrapper
          .find(FileInput)
          .simulate("change", { target: { files: [file] } });
        wrapper.update();
        expect(wrapper.text().includes("Invalid file type!")).toBe(true);
      });
    });
  });

  describe("draggable prop", () => {
    it("shows secondary placeholder", () => {
      wrapper = render({
        draggable: true,
        dragPlaceholder: "Drop the file here.",
      });
      expect(wrapper.text().includes("Drop the file here.")).toBe(true);
    });
  });

  describe("isUploading prop", () => {
    it("renders the loading bar", () => {
      wrapper = render({ isUploading: true });
      expect(wrapper.find(LoaderBar).exists()).toBe(true);
    });

    it("does not render the loading bar when input is disabled", () => {
      wrapper = render({ isUploading: true, disabled: true });
      expect(wrapper.find(LoaderBar).exists()).toBe(false);
    });
  });

  describe("Button", () => {
    it("can be clicked", () => {
      wrapper = render();
      wrapper.find(Button).props().onClick();
    });

    it("shows Remove button when file is chosen", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>Remove</span>)).toBe(true);
    });

    it("shows Remove Choose button when file removed", () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      wrapper.find(Button).simulate("click");
      wrapper.update();
      expect(wrapper.containsMatchingElement(<span>Choose</span>)).toBe(true);
      expect(wrapper.containsMatchingElement(<span>photo.png</span>)).toBe(
        false
      );
    });

    it("Cancel button calls cancelAction method", () => {
      const cancelAction = jest.fn();
      wrapper = render({ cancelAction });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.setProps({ isUploading: true });
      wrapper.update();
      wrapper.find(Button).simulate("click");
      expect(cancelAction).toHaveBeenCalled();
    });
  });

  describe("cancelAction prop", () => {
    it("calls cancelAction", () => {
      wrapper = render({ isUploading: true });
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper.find(FileInput).simulate("change", { target: { files: [file] } });
      wrapper.update();
      wrapper.find(Button).simulate("click");
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
        { backgroundColor: baseTheme.menu.light.divider },
        wrapper.find(FileDropArea)
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
        wrapper.find(FileDropArea)
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

    it("Change style when drag leave", async () => {
      wrapper = render();
      const file = new File(["file"], "photo.png", { type: "image/png" });
      wrapper
        .find(FileDropArea)
        .simulate("dragleave", { target: { files: [file] } });
      wrapper.update();
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
      expect(
        wrapper.find(FileInput).containsMatchingElement(<span>photo.png</span>)
      ).toBe(false);
    });
    it("shows error when more than one file is dropped to non-multiple input", () => {
      wrapper = render({ draggable: true });
      const file1 = new File(["file1"], "photo1.png", { type: "image/png" });
      const file2 = new File(["file2"], "photo2.png", { type: "image/png" });
      wrapper
        .find(FileInput)
        .simulate("dragover", { target: { files: [file1, file2] } });
      wrapper
        .find(FileInput)
        .simulate("drop", { dataTransfer: { files: [file1, file2] } });
      wrapper.update();
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
    });
  });

  describe("error prop", () => {
    it("renders correctly", async () => {
      wrapper = render({ error: "Custom error" });
      expect(wrapper.find(ErrorBorder).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).text().includes("Custom error")).toBe(
        true
      );
    });

    it("renders proper border", async () => {
      wrapper = render({ error: "Custom error", draggable: true });
      assertStyleMatch(
        { border: `2px dashed ${baseTheme.colors.error}` },
        wrapper.find(FileInputLabel)
      );
    });
  });
});

function render(props = {}, renderer = mount) {
  return renderer(
    <FileInputComponent fileChooseAction={jest.fn()} {...props} />
  );
}
