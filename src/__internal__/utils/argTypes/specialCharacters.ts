export const singleSpecialCharacters = {
  options: [
    "minus",
    "questionMark",
    "hash",
    "at",
    "dollar",
    "percent",
    "caret",
    "exclamation",
    "asterisk",
  ],
  mapping: {
    minus: "-",
    questionMark: "?",
    hash: "#",
    at: "@",
    dollar: "$",
    percent: "%",
    caret: "^",
    exclamation: "!",
    asterisk: "*",
  },
};

export const email = {
  options: ["email"],
  mapping: {
    email: "test.frontend.squad@gmail.com",
  },
};

export const number = {
  options: ["floatNumberCommaString", "floatMinusNumberCommaString"],
  mapping: {
    floatNumberCommaString: "0,112",
    floatMinusNumberCommaString: "-0,112",
  },
};

export default {
  options: ["undefined", "otherLanguage", "specialCharacters"],
  mapping: {
    // eslint-disable-next-line object-shorthand
    undefined: undefined,
    otherLanguage: "mp150ú¿¡üßä",
    specialCharacters: "!@#$%^*()_+-=~[];:.,?{}&\"'<>",
  },
};
