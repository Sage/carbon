import Option from "../option/option.component";
import isExpectedValue from "./is-expected-value";

export default function isExpectedOption(element, expectedValue) {
  if (
    element.type !== Option ||
    expectedValue === null ||
    expectedValue === undefined
  ) {
    return false;
  }

  return isExpectedValue(element.props.value, expectedValue);
}
