export default (inset = false) => {
  let focusStyling = "var(--focus-shadow-default)";

  if (inset) {
    focusStyling = "var(--focus-shadow-inset)";
  }

  return `
    -webkit-box-shadow: ${focusStyling};
    box-shadow: ${focusStyling};

    outline: transparent 3px solid;
  `;
};
