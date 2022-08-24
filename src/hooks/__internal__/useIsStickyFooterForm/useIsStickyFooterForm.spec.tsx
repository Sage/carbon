import React from "react";
import { render, screen } from "@testing-library/react";
import useIsStickyFooterForm from ".";
import Form from "../../../components/form";

const BUTTON_TEXT = "button";

const MockComponent = ({ children }: { children: React.ReactNode }) => {
  const result = useIsStickyFooterForm(children);

  return (
    <button disabled={result} type="button">
      {BUTTON_TEXT}
    </button>
  );
};

describe("useIsStickyFooterForm", () => {
  it("does not disable the button if there is no Form in the passed children", () => {
    render(<MockComponent>foo</MockComponent>);
    expect(screen.getByText(BUTTON_TEXT)).not.toBeDisabled();
  });

  it("does not disable the button if the only Form in the passed children has no sticky footer", () => {
    render(
      <MockComponent>
        <Form />
      </MockComponent>
    );
    expect(screen.getByText(BUTTON_TEXT)).not.toBeDisabled();
  });

  it("disables the button if there is Form with a sticky footer in the passed children", () => {
    render(
      <MockComponent>
        <Form stickyFooter />
      </MockComponent>
    );
    expect(screen.getByText(BUTTON_TEXT)).toBeDisabled();
  });
});
