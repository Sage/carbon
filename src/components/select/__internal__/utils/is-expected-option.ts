import Option from "../../option";
import OptionRow from "../../option-row/option-row.component";
import ActionOption from "../../action-option";
import isExpectedValue from "./is-expected-value";

export default function isExpectedOption(
  element: React.ReactElement,
  expectedValue?: string | Record<string, unknown> | null,
) {
  const isSelectableActionOption =
    element.type === ActionOption && !element.props.onClick;

  if (
    element.type !== Option &&
    element.type !== OptionRow &&
    !isSelectableActionOption
  ) {
    return false;
  }

  if (expectedValue === null || expectedValue === undefined) {
    return false;
  }

  const { length } =
    typeof expectedValue === "string"
      ? expectedValue
      : Object.keys(expectedValue);

  if (!length) {
    return false;
  }

  return isExpectedValue(element.props.value, expectedValue);
}
