import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Crumb from "./crumb.component";

test("passes href to the anchor element isCurrent is false", () => {
  render(<Crumb href="foo">Link text</Crumb>);

  const link = screen.getByRole("link", { name: "Link text" });

  expect(link).toHaveAttribute("href", "foo");
});

test("does not pass href to the anchor element when isCurrent is true", () => {
  render(
    <Crumb href="foo" data-role="crumb" isCurrent>
      Link text
    </Crumb>,
  );

  const anchor = screen.getByTestId("link-anchor");

  expect(anchor).not.toHaveAttribute("href", "foo");
});

test("calls onClick callback when the crumb link is clicked", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <Crumb href="#" onClick={onClick}>
      Link text
    </Crumb>,
  );

  const link = screen.getByRole("link", { name: "Link text" });
  await user.click(link);

  expect(onClick).toHaveBeenCalledTimes(1);
});

test("does not call onClick callback when isCurrent is true", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup();
  render(
    <Crumb href="#" onClick={onClick} isCurrent>
      Link text
    </Crumb>,
  );

  const link = screen.getByText("Link text");
  await user.click(link);

  expect(onClick).toHaveBeenCalledTimes(0);
});
