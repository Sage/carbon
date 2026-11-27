import React from "react";
import { render, screen } from "@testing-library/react";
import useUniqueId from ".";

interface Props {
  id?: string;
  name?: string;
}

const MockComponent = (props: Props = {}): JSX.Element => {
  const [id, name] = useUniqueId(props.id, props.name);
  return <input id={id} name={name} />;
};

test("provides unique id and name when no values passed in", () => {
  render(<MockComponent />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement.getAttribute("id")).toBeTruthy();
  expect(inputElement.getAttribute("name")).toBeTruthy();
});

test("provides distinct id and name values", () => {
  render(<MockComponent />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement.getAttribute("id")).not.toBe(
    inputElement.getAttribute("name"),
  );
});

test("does not provide unique id when id is passed in", () => {
  render(<MockComponent id="foo" />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("id", "foo");
  expect(inputElement.getAttribute("name")).toBeTruthy();
});

test("does not provide unique name when name is passed in", () => {
  render(<MockComponent name="foo" />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement.getAttribute("id")).toBeTruthy();
  expect(inputElement).toHaveAttribute("name", "foo");
});

test("does not provide unique id or name when values are passed in", () => {
  render(<MockComponent id="foo" name="bar" />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("id", "foo");
  expect(inputElement).toHaveAttribute("name", "bar");
});
