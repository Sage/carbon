import React from "react";
import { screen } from "@testing-library/react";

import BatchSelection from ".";
import Button from "../button";
import ButtonMinor from "../button-minor";
import Icon from "../icon";
import IconButton from "../icon-button";
import Link from "../link";
import { render } from "../../__spec_helper__/__internal__/test-utils";

test("Renders with children", () => {
  render(
    <BatchSelection selectedCount={0}>
      <IconButton>
        <Icon type="edit" />
      </IconButton>
    </BatchSelection>,
  );

  const iconButton = screen.getByRole("button", { name: "edit" });

  expect(iconButton).toBeVisible();
  expect(iconButton).toBeEnabled();
});

test("Renders with provided data- attributes", () => {
  render(
    <BatchSelection data-element="bar" data-role="baz" selectedCount={0}>
      <IconButton>
        <Icon type="edit" />
      </IconButton>
    </BatchSelection>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("Renders as hidden when the `hidden` prop is true", () => {
  render(
    <BatchSelection data-role="batch-selection" selectedCount={0} hidden>
      <IconButton>
        <Icon type="bin" />
      </IconButton>
    </BatchSelection>,
  );

  const batchSelection = screen.getByTestId("batch-selection");

  expect(batchSelection).not.toBeVisible();
});

test("`IconButton` children should be automatically disabled via context", () => {
  render(
    <BatchSelection colorTheme="dark" selectedCount={0} disabled>
      <IconButton>
        <Icon type="edit" />
      </IconButton>
    </BatchSelection>,
  );

  const iconButton = screen.getByRole("button", { name: "edit" });

  expect(iconButton).toBeDisabled();
});

test("`Button` children should be automatically disabled via context", () => {
  render(
    <BatchSelection colorTheme="light" selectedCount={0} disabled>
      <Button iconType="edit" />
    </BatchSelection>,
  );

  const button = screen.getByRole("button", { name: "edit" });

  expect(button).toBeDisabled();
});

test("`ButtonMinor` children should be automatically disabled via context", () => {
  render(
    <BatchSelection colorTheme="white" selectedCount={0} disabled>
      <ButtonMinor iconType="edit" />
    </BatchSelection>,
  );

  const minorButton = screen.getByRole("button", { name: "edit" });

  expect(minorButton).toBeDisabled();
});

test("`Link` children should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link>Link as an anchor</Link>
    </BatchSelection>,
  );

  const link = screen.getByTestId("link-anchor");

  expect(link).toHaveStyle("cursor: not-allowed");

  link.focus();

  expect(link).not.toHaveFocus();
});

test("`Link` children rendered as a button should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link onClick={() => {}}>Link as a button</Link>
    </BatchSelection>,
  );

  const linkButton = screen.getByRole("button", {
    name: "Link as a button",
  });

  expect(linkButton).toBeDisabled();
});
