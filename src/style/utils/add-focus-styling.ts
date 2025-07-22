export default (inset = false) => {
  let focusStyling =
    "0px 0px 0px var(--borderWidth300) var(--colorsSemanticFocus500), 0px 0px 0px var(--borderWidth600) var(--colorsUtilityYin090)";

  if (inset) {
    focusStyling =
      "inset 0px 0px 0px var(--borderWidth300) var(--colorsUtilityYin090), inset 0px 0px 0px var(--borderWidth600) var(--colorsSemanticFocus500)";
  }

  return `
    -webkit-box-shadow: ${focusStyling};
    box-shadow: ${focusStyling};

    outline: transparent 3px solid;
  `;
};
