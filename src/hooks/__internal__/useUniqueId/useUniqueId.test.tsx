import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../../__spec_helper__/__internal__/test-utils";

import useUniqueId from ".";
import createGuid from "../../../__internal__/utils/helpers/guid";

const guid = "guid-12345";

jest.mock("../../../__internal__/utils/helpers/guid");

(createGuid as jest.MockedFunction<typeof createGuid>).mockImplementation(
  () => guid,
);

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
  expect(inputElement).toHaveAttribute("id", guid);
  expect(inputElement).toHaveAttribute("name", guid);
});

test("does not provide unique id when id is passed in", () => {
  render(<MockComponent id="foo" />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("id", "foo");
  expect(inputElement).toHaveAttribute("name", guid);
});

test("does not provide unique name when name is passed in", () => {
  render(<MockComponent name="foo" />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("id", guid);
  expect(inputElement).toHaveAttribute("name", "foo");
});

test("does not provide unique id or name when values are passed in", () => {
  render(<MockComponent id="foo" name="bar" />);
  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveAttribute("id", "foo");
  expect(inputElement).toHaveAttribute("name", "bar");
});
