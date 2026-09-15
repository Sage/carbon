export default (inset = false, inverse = false) => {
  let focusStyling = inverse
    ? "var(--focus-shadow-inverse-default)"
    : "var(--focus-shadow-default)";

  if (inset) {
    focusStyling = inverse
      ? "var(--focus-shadow-inset-inverse)"
      : "var(--focus-shadow-inset)";
  }

  return `
    -webkit-box-shadow: ${focusStyling};
    box-shadow: ${focusStyling};

    outline: transparent 3px solid;
  `;
};
