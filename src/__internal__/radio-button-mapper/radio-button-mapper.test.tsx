import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButtonMapper from ".";

const ControlledRadioButtons = () => {
  const [value, setValue] = useState<string | undefined>(undefined);

  return (
    <RadioButtonMapper
      name="test"
      value={value}
      onBlur={(e) => {
        setValue(e.target.value);
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    >
      <input type="radio" id="radio-1" value="one" />
      <input type="radio" id="radio-2" value="two" />
    </RadioButtonMapper>
  );
};

test("renders radio children with expected `name` prop", () => {
  render(
    <RadioButtonMapper name="test">
      <input type="radio" id="radio-1" value="one" />
      <input type="radio" id="radio-2" value="two" />
    </RadioButtonMapper>,
  );

  const radioButtons = screen.getAllByRole("radio");

  expect(radioButtons[0]).toHaveAttribute("name", "test");
  expect(radioButtons[1]).toHaveAttribute("name", "test");
});

test("checks and unchecks correct radios when inputs are controlled", async () => {
  const user = userEvent.setup();
  render(<ControlledRadioButtons />);

  const radios = screen.getAllByRole("radio");

  const radio1 = radios[0];
  const radio2 = radios[1];

  expect(radio1).not.toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio1);

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("checks and unchecks correct radios when inputs are uncontrolled", async () => {
  const user = userEvent.setup();
  render(
    <RadioButtonMapper name="test">
      <input type="radio" id="radio-1" value="one" />
      <input type="radio" id="radio-2" value="two" />
    </RadioButtonMapper>,
  );

  const radios = screen.getAllByRole("radio");
  const radio1 = radios[0];
  const radio2 = radios[1];

  expect(radio1).not.toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio1);

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("checks and unchecks correct radios when `defaultChecked` is set", async () => {
  const user = userEvent.setup();
  render(
    <RadioButtonMapper name="test">
      <input type="radio" id="radio-1" value="one" defaultChecked />
      <input type="radio" id="radio-2" value="two" />
    </RadioButtonMapper>,
  );

  const radios = screen.getAllByRole("radio");
  const radio1 = radios[0];
  const radio2 = radios[1];

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("calls `onChange` callback when a radio child is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <RadioButtonMapper name="test" onChange={onChange}>
      <input type="radio" id="radio-1" value="one" />
    </RadioButtonMapper>,
  );

  const radio = screen.getByRole("radio");
  await user.click(radio);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({ target: radio }),
  );
});

test("calls `onBlur` callback when a radio child is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <RadioButtonMapper name="test" onBlur={onBlur}>
      <input type="radio" id="radio-1" value="one" />
      <input type="radio" id="radio-2" value="two" />
    </RadioButtonMapper>,
  );

  const radios = screen.getAllByRole("radio");
  const radio1 = radios[0];
  const radio2 = radios[1];

  await user.click(radio1);
  await user.click(radio2);

  expect(onBlur).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledWith(
    expect.objectContaining({ target: radio1 }),
  );
});

test("accepts non-valid React element children", () => {
  expect(() => {
    render(
      <RadioButtonMapper name="test">
        {[
          <input key="radio1" name="foo" value="foo" />,
          "foo",
          undefined,
          null,
          false,
        ]}
      </RadioButtonMapper>,
    );
  }).not.toThrow();
});
