import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FlatTableCheckbox, {
  FlatTableCheckboxProps,
} from "./flat-table-checkbox.component";
import guid from "../../../__internal__/utils/helpers/guid";

jest.mock("../../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345",
);

interface ControlledCheckboxProps
  extends Omit<FlatTableCheckboxProps, "checked"> {
  initialChecked?: boolean;
}

const ControlledCheckbox = ({
  initialChecked = false,
  ...props
}: ControlledCheckboxProps) => {
  const [checked, setChecked] = React.useState(initialChecked);
  return (
    <FlatTableCheckbox
      {...props}
      checked={checked}
      onChange={(e) => {
        setChecked(!checked);
        props.onChange?.(e);
      }}
      data-testid="checkbox"
    />
  );
};

test("should stop propagation when the user clicks on the input element", async () => {
  const parentOnClick = jest.fn();
  const childOnClick = jest.fn();
  const user = userEvent.setup();
  render(
    <table>
      <tbody>
        <tr onClick={parentOnClick}>
          <ControlledCheckbox onChange={() => {}} onClick={childOnClick} />
        </tr>
      </tbody>
    </table>,
  );

  await user.click(screen.getByRole("checkbox"));

  expect(childOnClick).toHaveBeenCalled();
  expect(parentOnClick).not.toHaveBeenCalled();
});

test("should stop propagation when the user presses a key that is not up or down arrow", async () => {
  const parentOnKeyDown = jest.fn();
  const user = userEvent.setup();
  render(
    <table>
      <tbody>
        <tr onKeyDown={parentOnKeyDown}>
          <ControlledCheckbox onChange={() => {}} />
        </tr>
      </tbody>
    </table>,
  );
  act(() => {
    screen.getByRole("checkbox").focus();
  });
  await user.keyboard("{a}");

  expect(parentOnKeyDown).not.toHaveBeenCalled();
});

test("should not stop propagation when the user presses down arrow key", async () => {
  const parentOnKeyDown = jest.fn();
  const user = userEvent.setup();
  render(
    <table>
      <tbody>
        <tr onKeyDown={parentOnKeyDown}>
          <ControlledCheckbox onChange={() => {}} />
        </tr>
      </tbody>
    </table>,
  );
  act(() => {
    screen.getByRole("checkbox").focus();
  });
  await user.keyboard("{ArrowDown}");

  expect(parentOnKeyDown).toHaveBeenCalled();
});

test("should not stop propagation when the user presses up arrow key", async () => {
  const parentOnKeyDown = jest.fn();
  const user = userEvent.setup();
  render(
    <table>
      <tbody>
        <tr onKeyDown={parentOnKeyDown}>
          <ControlledCheckbox onChange={() => {}} />
        </tr>
      </tbody>
    </table>,
  );
  act(() => {
    screen.getByRole("checkbox").focus();
  });
  await user.keyboard("{ArrowUp}");

  expect(parentOnKeyDown).toHaveBeenCalled();
});

test("should render a 'td' element by default and have the expected data-element attribute", () => {
  render(
    <table>
      <tbody>
        <tr>
          <ControlledCheckbox onChange={() => {}} />
        </tr>
      </tbody>
    </table>,
  );
  const checkboxCell = screen.getByRole("cell");

  expect(checkboxCell).toHaveAttribute(
    "data-element",
    "flat-table-checkbox-cell",
  );
});

test("should render an element to match the `as` prop value when it is set and have the expected data-element attribute", () => {
  render(
    <table>
      <thead>
        <tr>
          <ControlledCheckbox onChange={() => {}} as="th" />
        </tr>
      </thead>
    </table>,
  );
  const checkboxCell = screen.getByRole("columnheader");

  expect(checkboxCell).toHaveAttribute(
    "data-element",
    "flat-table-checkbox-header",
  );
});

test("should not render the checkbox when the selectable prop is false", () => {
  render(
    <table>
      <tbody>
        <tr>
          <ControlledCheckbox onChange={() => {}} selectable={false} />
        </tr>
      </tbody>
    </table>,
  );

  expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
});

test("should render the component with the expeced `data-attributes`", () => {
  render(
    <table>
      <tbody>
        <tr>
          <ControlledCheckbox
            onChange={() => {}}
            data-role="ft-checkbox"
            data-element="overridden-data-element"
          />
        </tr>
      </tbody>
    </table>,
  );
  const checkboxCell = screen.getByRole("cell");

  expect(checkboxCell).toHaveAttribute("data-component", "flat-table-checkbox");
  expect(checkboxCell).toHaveAttribute(
    "data-element",
    "overridden-data-element",
  );
  expect(checkboxCell).toHaveAttribute("data-role", "ft-checkbox");
});
