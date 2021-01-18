import Option from "../option/option.component";

export default function isExpectedOption(element, expectedValue) {
  if (
    element.type !== Option ||
    expectedValue === null ||
    expectedValue === undefined
  ) {
    return false;
  }

  if (
    typeof element.props.value === "object" &&
    element.props.value.id !== null &&
    element.props.value.id !== undefined
  ) {
    return element.props.value.id === expectedValue.id;
  }

  return element.props.value === expectedValue;
}
