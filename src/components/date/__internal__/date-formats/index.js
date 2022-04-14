// The order of this array is important
const EU_FORMATS = [
  "d M yyyy",
  "dd M yyyy",
  "d MM yyyy",
  "dd MM yyyy",
  "d M yy",
  "dd M yy",
  "d MM yy",
  "dd MM yy",
  "d",
  "d M",
  "dd",
  "d MM",
  "dd M",
  "dd MM",
];

// The order of this array is important
const NA_FORMATS = [
  "M",
  "M d",
  "MM",
  "M dd",
  "MM d",
  "MM dd",
  "M d yy",
  "MM d yy",
  "M dd yy",
  "MM dd yy",
  "M d yyyy",
  "MM d yyyy",
  "M dd yyyy",
  "MM dd yyyy",
];

// The order of this array is important
const CN_FORMATS = [
  "M",
  "M d",
  "MM",
  "M dd",
  "MM d",
  "MM dd",
  "yy d M",
  "yy d MM",
  "yy dd M",
  "yy dd MM",
  "yyyy d M",
  "yyyy d MM",
  "yyyy dd M",
  "yyyy dd MM",
];

const SEPARATORS = ["", ".", ",", "-", "/", ":"];

const generateFormats = (formatArray) =>
  formatArray.reduce((arr, formatString) => {
    const array = [...arr, formatString];
    if (formatString.includes(" ")) {
      SEPARATORS.forEach((char) =>
        array.push(formatString.replace(/ /g, char))
      );
    }
    return array;
  }, []);

const getFormatData = ({ code }) => {
  if (["en-CA", "en-US"].includes(code)) {
    return {
      format: "MM/dd/yyyy",
      formats: generateFormats(NA_FORMATS),
    };
  }

  if (
    ["de", "de-DE", "de-DE", "de-CH", "de-AT", "pl", "pl-PL"].includes(code)
  ) {
    return {
      format: "dd.MM.yyyy",
      formats: generateFormats(EU_FORMATS),
    };
  }

  if (["zh", "zh-CN", "zh-HK", "zh-TW"].includes(code)) {
    return {
      format: "yyyy-MM-dd",
      formats: generateFormats(CN_FORMATS),
    };
  }

  return {
    format: "dd/MM/yyyy",
    formats: generateFormats(EU_FORMATS),
  };
};

export default getFormatData;
