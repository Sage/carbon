import React from "react";
import { render, screen } from "@testing-library/react";

import BatchSelection from ".";
import Button from "../button";
import ButtonMinor from "../button-minor";
import Icon from "../icon";
import IconButton from "../icon-button";
import Link from "../link";

test("`IconButton` children should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      <IconButton>
        <Icon type="edit" />
      </IconButton>
    </BatchSelection>
  );

  const iconButton = screen.getByRole("button", { name: "edit" });

  expect(iconButton).toBeDisabled();
});

test("`Button` children should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      <Button iconType="edit" />
    </BatchSelection>
  );

  const button = screen.getByRole("button", { name: "edit" });

  expect(button).toBeDisabled();
});

test("`ButtonMinor` children should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      <ButtonMinor iconType="edit" />
    </BatchSelection>
  );

  const minorButton = screen.getByRole("button", { name: "edit" });

  expect(minorButton).toBeDisabled();
});

test("`Link` children should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      <Link>Link as an anchor</Link>
    </BatchSelection>
  );

  const link = screen.getByTestId("link-anchor");

  expect(link).toHaveStyle("cursor: not-allowed");

  link.focus();

  expect(link).not.toHaveFocus();
});

test("`Link` children rendered as a button should be automatically disabled via context", () => {
  render(
    <BatchSelection selectedCount={0} disabled>
      <Link onClick={() => {}}>Link as a button</Link>
    </BatchSelection>
  );

  const linkButton = screen.getByRole("button", {
    name: "Link as a button",
  });

  expect(linkButton).toBeDisabled();
});
