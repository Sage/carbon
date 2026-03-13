import React from "react";
import { render } from "@testing-library/react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import FormSubmissionPlugin from ".";
import {
  SerializeLexical,
  generateHTMLWithInlineStyles,
} from "../../__utils__/helpers";

jest.mock("@lexical/react/LexicalComposerContext");
jest.mock("../../__utils__/helpers");

const mockAddEventListener = jest.fn();
const mockRemoveEventListener = jest.fn();
const mockGetRootElement = jest.fn();
const mockIsEditable = jest.fn();

const mockEditor = {
  getRootElement: mockGetRootElement,
  isEditable: mockIsEditable,
};

const mockSerializeLexical = SerializeLexical as jest.MockedFunction<
  typeof SerializeLexical
>;
const mockGenerateHTMLWithInlineStyles =
  generateHTMLWithInlineStyles as jest.MockedFunction<
    typeof generateHTMLWithInlineStyles
  >;

beforeEach(() => {
  jest.clearAllMocks();
  (useLexicalComposerContext as jest.Mock).mockReturnValue([mockEditor]);
  mockIsEditable.mockReturnValue(true);
  mockSerializeLexical.mockReturnValue({
    htmlString: "<p>Hello</p>",
    json: "{}",
  } as never);
  mockGenerateHTMLWithInlineStyles.mockReturnValue(
    '<p style="font-family: sans-serif">Hello</p>',
  );
});

const mockForm = () => {
  const form = document.createElement("form");
  const rootEl = document.createElement("div");
  // eslint-disable-next-line testing-library/no-node-access -- no clean alternative in RTL
  rootEl.closest = jest.fn().mockReturnValue(form);
  form.addEventListener = mockAddEventListener;
  form.removeEventListener = mockRemoveEventListener;
  mockGetRootElement.mockReturnValue(rootEl);
  return form;
};

describe("FormSubmissionPlugin", () => {
  it("returns null (renders nothing)", () => {
    mockGetRootElement.mockReturnValue(null);
    const { container } = render(<FormSubmissionPlugin />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not attach a submit listener when onFormSubmission is not provided", () => {
    mockForm();
    render(<FormSubmissionPlugin />);
    expect(mockAddEventListener).not.toHaveBeenCalled();
  });

  it("does not attach a submit listener when no parent form is found", () => {
    const rootEl = document.createElement("div");
    // eslint-disable-next-line testing-library/no-node-access -- no clean alternative in RTL
    rootEl.closest = jest.fn().mockReturnValue(null);
    mockGetRootElement.mockReturnValue(rootEl);

    render(<FormSubmissionPlugin onFormSubmission={jest.fn()} />);

    expect(mockAddEventListener).not.toHaveBeenCalled();
  });

  it("does not attach a submit listener when getRootElement returns null", () => {
    mockGetRootElement.mockReturnValue(null);
    render(<FormSubmissionPlugin onFormSubmission={jest.fn()} />);
    expect(mockAddEventListener).not.toHaveBeenCalled();
  });

  it("attaches a submit listener when onFormSubmission and a parent form are present", () => {
    mockForm();
    render(<FormSubmissionPlugin onFormSubmission={jest.fn()} />);
    expect(mockAddEventListener).toHaveBeenCalledWith(
      "submit",
      expect.any(Function),
    );
  });

  it("removes the submit listener on unmount", () => {
    mockForm();
    const { unmount } = render(
      <FormSubmissionPlugin onFormSubmission={jest.fn()} />,
    );
    const attachedHandler = mockAddEventListener.mock.calls[0][1];
    unmount();
    expect(mockRemoveEventListener).toHaveBeenCalledWith(
      "submit",
      attachedHandler,
    );
  });

  it("calls onFormSubmission with formattedValues including htmlStringWithInlineStyles on form submit", () => {
    const onFormSubmission = jest.fn();
    mockForm();
    render(<FormSubmissionPlugin onFormSubmission={onFormSubmission} />);

    const handleSubmit = mockAddEventListener.mock.calls[0][1];
    handleSubmit();

    expect(onFormSubmission).toHaveBeenCalledWith({
      htmlString: "<p>Hello</p>",
      json: "{}",
      htmlStringWithInlineStyles:
        '<p style="font-family: sans-serif">Hello</p>',
    });
  });

  it("does not call onFormSubmission when editor is not editable", () => {
    const onFormSubmission = jest.fn();
    mockIsEditable.mockReturnValue(false);
    mockForm();
    render(<FormSubmissionPlugin onFormSubmission={onFormSubmission} />);

    const handleSubmit = mockAddEventListener.mock.calls[0][1];
    handleSubmit();

    expect(onFormSubmission).not.toHaveBeenCalled();
  });

  it("calls onFormSubmission with empty string when htmlString is falsy", () => {
    const onFormSubmission = jest.fn();
    mockSerializeLexical.mockReturnValue({
      htmlString: "",
      json: "{}",
    } as never);
    mockForm();
    render(<FormSubmissionPlugin onFormSubmission={onFormSubmission} />);

    const handleSubmit = mockAddEventListener.mock.calls[0][1];
    handleSubmit();

    expect(generateHTMLWithInlineStyles).not.toHaveBeenCalled();
    expect(onFormSubmission).toHaveBeenCalledWith({
      htmlString: "",
      json: "{}",
      htmlStringWithInlineStyles: "",
    });
  });
});
