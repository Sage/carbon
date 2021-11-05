import Option from "../option/option.component";
import OptionRow from "../option-row/option-row.component";
import isExpectedValue from "./is-expected-value";

export default function isExpectedOption(element, expectedValue) {
  if (element.type !== Option && element.type !== OptionRow) {
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
