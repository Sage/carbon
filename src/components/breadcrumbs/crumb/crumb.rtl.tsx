import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Crumb from "./crumb.component";

const LINK_TEXT = "Link text";

describe("Crumb", () => {
  it("passes href to the anchor element isCurrent is false", () => {
    render(<Crumb href="foo">{LINK_TEXT}</Crumb>);

    const anchor = screen.getByRole("link");
    expect(anchor?.textContent?.trim()).toBe(LINK_TEXT);
    expect(anchor).toHaveAttribute("href", "foo");
  });

  it("does not pass href to the anchor element when isCurrent is true", () => {
    render(
      <Crumb href="foo" isCurrent>
        {LINK_TEXT}
      </Crumb>
    );

    // eslint-disable-next-line testing-library/no-node-access
    const anchor = screen.getByText(LINK_TEXT).closest("a");
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
        {LINK_TEXT}
      </Crumb>
    );

    const link = screen.getByText(LINK_TEXT);
    await userEvent.click(link);

    expect(handleClickFn).toHaveBeenCalledTimes(1);
  });

  it("does not call the handleClick callback if one is passed and isCurrent is true", async () => {
    const handleClickFn = jest.fn();

    render(
      <Crumb href="#" onClick={handleClickFn} isCurrent>
        {LINK_TEXT}
      </Crumb>
    );
    const link = screen.getByText(LINK_TEXT);
    await userEvent.click(link);

    expect(handleClickFn).toHaveBeenCalledTimes(0);
  });
});
