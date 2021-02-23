import filterObjectProperties from "../../utils/helpers/filter-object-properties";

const marginPropertyNames = [
  "margin",
  "m",
  "marginLeft",
  "ml",
  "marginRight",
  "mr",
  "marginTop",
  "mt",
  "marginBottom",
  "mb",
  "marginX",
  "mx",
  "marginY",
  "my",
];

export default function filterStyledSystemMarginProps(originalObject) {
  return filterObjectProperties(originalObject, marginPropertyNames);
}
