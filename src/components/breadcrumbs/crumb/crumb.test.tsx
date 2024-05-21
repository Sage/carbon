import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Crumb from "./crumb.component";

describe("Crumb", () => {
  it("passes href to the anchor element isCurrent is false", () => {
    render(<Crumb href="foo">Link text</Crumb>);

    const link = screen.getByRole("link", { name: "Link text" });

    expect(link).toHaveAttribute("href", "foo");
  });

  it("does not pass href to the anchor element when isCurrent is true", () => {
    render(
      <Crumb href="foo" data-role="crumb" isCurrent>
        Link text
      </Crumb>
    );

    const anchor = screen.getByTestId("link-anchor");
    expect(anchor).not.toHaveAttribute("href", "foo");
    expect(anchor).toHaveStyle({
      color: "var(--colorsYin055)",
      textDecoration: "none",
      cursor: "text",
    });
  });

  it("calls the handleClick callback if one is passed and isCurrent is false", async () => {
    const handleClickFn = jest.fn();
    render(
      <Crumb href="#" onClick={handleClickFn}>
        Link text
      </Crumb>
    );

    const link = screen.getByRole("link", { name: "Link text" });
    await userEvent.click(link);

    expect(handleClickFn).toHaveBeenCalledTimes(1);
  });

  it("does not call the handleClick callback if one is passed and isCurrent is true", async () => {
    const handleClickFn = jest.fn();
    render(
      <Crumb href="#" onClick={handleClickFn} isCurrent>
        Link text
      </Crumb>
    );

    const link = screen.getByText("Link text");
    await userEvent.click(link);

    expect(handleClickFn).toHaveBeenCalledTimes(0);
  });
});
