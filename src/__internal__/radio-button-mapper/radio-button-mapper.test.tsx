import React, { useState } from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RadioButtonMapper from ".";
import RadioButton from "../../components/radio-button";
import { render } from "../../__spec_helper__/__internal__/test-utils";

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
      <RadioButton id="radio-1" value="one" label="One" />
      <RadioButton id="radio-2" value="two" label="Two" />
    </RadioButtonMapper>
  );
};

test("renders RadioButton children with expected `name` prop", () => {
  render(
    <RadioButtonMapper name="test">
      <RadioButton id="radio-1" value="one" />
      <RadioButton id="radio-2" value="two" />
    </RadioButtonMapper>,
  );

  const radioButtons = screen.getAllByRole("radio");

  expect(radioButtons[0]).toHaveAttribute("name", "test");
  expect(radioButtons[1]).toHaveAttribute("name", "test");
});

test("checks and unchecks correct RadioButtons when inputs are controlled", async () => {
  const user = userEvent.setup();
  render(<ControlledRadioButtons />);

  const radio1 = screen.getByRole("radio", { name: "One" });
  const radio2 = screen.getByRole("radio", { name: "Two" });

  expect(radio1).not.toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio1);

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("checks and unchecks correct RadioButtons when inputs are uncontrolled", async () => {
  const user = userEvent.setup();
  render(
    <RadioButtonMapper name="test">
      <RadioButton id="radio-1" value="one" label="One" />
      <RadioButton id="radio-2" value="two" label="Two" />
    </RadioButtonMapper>,
  );

  const radio1 = screen.getByRole("radio", { name: "One" });
  const radio2 = screen.getByRole("radio", { name: "Two" });

  expect(radio1).not.toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio1);

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("checks and unchecks correct RadioButtons when `defaultChecked` is set", async () => {
  const user = userEvent.setup();
  render(
    <RadioButtonMapper name="test">
      <RadioButton id="radio-1" value="one" defaultChecked label="One" />
      <RadioButton id="radio-2" value="two" label="Two" />
    </RadioButtonMapper>,
  );

  const radio1 = screen.getByRole("radio", { name: "One" });
  const radio2 = screen.getByRole("radio", { name: "Two" });

  expect(radio1).toBeChecked();
  expect(radio2).not.toBeChecked();

  await user.click(radio2);

  expect(radio1).not.toBeChecked();
  expect(radio2).toBeChecked();
});

test("calls `onChange` callback when a RadioButton child is clicked", async () => {
  const user = userEvent.setup();
  const onChange = jest.fn();
  render(
    <RadioButtonMapper name="test" onChange={onChange}>
      <RadioButton id="radio-1" value="one" label="One" />
      <RadioButton id="radio-2" value="two" label="Two" />
    </RadioButtonMapper>,
  );

  const radio1 = screen.getByRole("radio", { name: "One" });
  await user.click(radio1);

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledWith(
    expect.objectContaining({ target: radio1 }),
  );
});

test("calls `onBlur` callback when a RadioButton child is blurred", async () => {
  const user = userEvent.setup();
  const onBlur = jest.fn();
  render(
    <RadioButtonMapper name="test" onBlur={onBlur}>
      <RadioButton id="radio-1" value="one" label="One" />
      <RadioButton id="radio-2" value="two" label="Two" />
    </RadioButtonMapper>,
  );

  const radio1 = screen.getByRole("radio", { name: "One" });
  const radio2 = screen.getByRole("radio", { name: "Two" });
  await user.click(radio1);
  await user.click(radio2);

  expect(onBlur).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledWith(
    expect.objectContaining({ target: radio1 }),
  );
});

test("accepts non-RadioButton children", () => {
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
