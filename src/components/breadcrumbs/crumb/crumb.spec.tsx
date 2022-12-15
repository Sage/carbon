import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Crumb from "./crumb.component";

const LINK_TEXT = "Link text";

describe("Crumb", () => {
  it("passes href to the anchor element isCurrent is false", () => {
    render(<Crumb href="foo" text={LINK_TEXT} />);

    const link = screen.getByText(LINK_TEXT);
    expect(link).toBeInTheDocument();
    expect(link?.closest("a")).toHaveAttribute("href", "foo");
  });

  it("does not pass href to the anchor element when isCurrent is true", () => {
    render(<Crumb href="foo" text={LINK_TEXT} isCurrent />);

    const anchor = screen.getByText(LINK_TEXT).closest("a");
    expect(anchor).not.toHaveAttribute("href", "foo");

    expect(anchor).toHaveStyle({
      color: "gray",
      textDecoration: "none",
      cursor: "text",
    });
  });

  it("calls the onClick callback if one is passed and isCurrent is false", () => {
    const onClickFn = jest.fn();

    render(<Crumb href="foo" text={LINK_TEXT} onClick={onClickFn} />);
    const link = screen.getByText(LINK_TEXT);
    fireEvent.click(link);

    expect(onClickFn).toHaveBeenCalled();
  });

  it("does not call the onClick callback if one is passed and isCurrent is true", () => {
    const onClickFn = jest.fn();

    render(<Crumb href="foo" text={LINK_TEXT} onClick={onClickFn} isCurrent />);
    const link = screen.getByText(LINK_TEXT);
    fireEvent.click(link);

    expect(onClickFn).not.toHaveBeenCalled();
  });
});
