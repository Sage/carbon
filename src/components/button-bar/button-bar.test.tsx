import React from "react";
import { render, screen } from "@testing-library/react";

import Button from "../button";
import Icon from "../icon";
import IconButton from "../icon-button";
import ButtonBar from "./button-bar.component";

describe("When ButtonBar children are Button components", () => {
  it("should render the Buttons as expected", () => {
    render(
      <ButtonBar>
        <Button aria-label="button-in-bar">foo</Button>
        <Button aria-label="button-in-bar">bar</Button>
        <Button aria-label="button-in-bar">baz</Button>
      </ButtonBar>,
    );

    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });

    expect(buttonChildren).toHaveLength(3);
  });

  it("should render the Buttons with icons as expected when the 'iconType' prop is set", () => {
    render(
      <ButtonBar>
        <Button aria-label="button-in-bar" iconType="bin">
          foo
        </Button>
        <Button aria-label="button-in-bar" iconType="bin">
          bar
        </Button>
        <Button aria-label="button-in-bar" iconType="bin">
          baz
        </Button>
      </ButtonBar>,
    );

    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });
    const icons = screen.getAllByTestId("icon");

    expect(buttonChildren).toHaveLength(3);
    expect(icons).toHaveLength(3);
  });

  it("should render the Buttons with 'size' prop set to 'medium'", () => {
    render(
      <ButtonBar>
        <Button aria-label="button-in-bar">foo</Button>
        <Button aria-label="button-in-bar">bar</Button>
        <Button aria-label="button-in-bar">baz</Button>
      </ButtonBar>,
    );

    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });

    buttonChildren.forEach((button) => {
      expect(button).toHaveStyle("min-height: 40px");
    });

    buttonChildren.forEach((button) => {
      expect(button).toHaveStyleRule("font-size", "var(--fontSizes100)");
    });
  });

  it("should render the Buttons with the 'iconPosition' prop set to 'before'", () => {
    render(
      <ButtonBar>
        <Button aria-label="button-in-bar" iconType="bin">
          foo
        </Button>
        <Button aria-label="button-in-bar" iconType="bin">
          bar
        </Button>
        <Button aria-label="button-in-bar" iconType="bin">
          baz
        </Button>
      </ButtonBar>,
    );

    const icons = screen.getAllByTestId("icon");

    icons.forEach((childIcon) => {
      expect(childIcon).toHaveStyle("margin-right: var(--spacing100)");
    });
  });

  it("should render the Buttons with the 'fullWidth' prop set to 'false'", () => {
    render(
      <ButtonBar data-role="button-bar">
        <Button aria-label="button-in-bar">foo</Button>
        <Button aria-label="button-in-bar">bar</Button>
        <Button aria-label="button-in-bar">baz</Button>
      </ButtonBar>,
    );

    const buttonBar = screen.getByTestId("button-bar");
    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });

    expect(buttonBar).not.toHaveStyle("width: 100%");

    buttonChildren.forEach((button) => {
      expect(button).not.toHaveStyle("width: 100%");
    });
  });

  it("should render the Buttons correctly when the 'size' prop is 'small' and 'fullWidth' is 'true'", () => {
    render(
      <ButtonBar size="small" fullWidth>
        <Button aria-label="button-in-bar">foo</Button>
        <Button aria-label="button-in-bar">bar</Button>
        <Button aria-label="button-in-bar">baz</Button>
      </ButtonBar>,
    );

    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });

    buttonChildren.forEach((button) => {
      expect(button).toHaveStyle("min-height: 28px");
    });
  });

  it("should render the Buttons correctly when the 'size' prop is 'medium' and 'fullWidth' is 'true'", () => {
    render(
      <ButtonBar size="medium" fullWidth>
        <Button aria-label="button-in-bar">foo</Button>
        <Button aria-label="button-in-bar">bar</Button>
        <Button aria-label="button-in-bar">baz</Button>
      </ButtonBar>,
    );

    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });

    buttonChildren.forEach((button) => {
      expect(button).toHaveStyle("min-height: 36px");
    });
  });

  it("should render the Buttons correctly when the 'size' prop is 'large' and 'fullWidth' is 'true'", () => {
    render(
      <ButtonBar size="large" fullWidth>
        <Button aria-label="button-in-bar">foo</Button>
        <Button aria-label="button-in-bar">bar</Button>
        <Button aria-label="button-in-bar">baz</Button>
      </ButtonBar>,
    );

    const buttonChildren = screen.getAllByRole("button", {
      name: "button-in-bar",
    });

    buttonChildren.forEach((button) => {
      expect(button).toHaveStyle("min-height: 44px");
    });
  });
});

describe("When ButtonBar children are IconButton components", () => {
  it("should render the IconButtons as expected", () => {
    render(
      <ButtonBar>
        <IconButton aria-label="icon-button-in-bar">
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="icon-button-in-bar">
          <Icon type="bin" />
        </IconButton>
        <IconButton aria-label="icon-button-in-bar">
          <Icon type="bin" />
        </IconButton>
      </ButtonBar>,
    );

    const iconButtonChildren = screen.getAllByRole("button", {
      name: "icon-button-in-bar",
    });

    const icons = screen.getAllByTestId("icon");

    expect(iconButtonChildren).toHaveLength(3);
    expect(icons).toHaveLength(3);
  });
});
