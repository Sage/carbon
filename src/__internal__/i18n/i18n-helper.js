import i18n from "i18next";
import BigNumber from "bignumber.js";

export const getFormat = (lng) => ({
  delimiter: i18n.t("carbon:number.format.delimiter", {
    defaultValue: ",",
  }),
  separator: i18n.t("carbon:number.format.separator", {
    defaultValue: ".",
  }),
  unit: i18n.t("carbon:number.currency.format.unit", {
    lng,
    defaultValue: "£",
  }),
  format: i18n.t("carbon:number.currency.format.format", {
    lng,
    defaultValue: "%u%n",
  }),
});

export const getFormatDecimal = (
  valueToFormat = 0,
  precision = 2,
  options = {}
) => {
  const locale = options.locale || i18n.language || "en";
  const { separator, delimiter } = getFormat(locale);
  const num = new BigNumber(valueToFormat);
  const format = {
    decimalSeparator: separator,
    groupSeparator: delimiter,
    groupSize: 3,
  };

  return num.toFormat(precision, format);
};
