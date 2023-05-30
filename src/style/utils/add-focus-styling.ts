const innerThickness = "3px";
const outerThickness = "6px";

export default (inset = false) => {
  let focusStyling = `0px 0px 0px ${innerThickness} var(--colorsSemanticFocus500), 0px 0px 0px ${outerThickness} var(--colorsUtilityYin090)`;

  if (inset) {
    focusStyling = `inset 0px 0px 0px ${innerThickness} var(--colorsUtilityYin090), inset 0px 0px 0px ${outerThickness} var(--colorsSemanticFocus500)`;
  }
  return `
    outline: none;
    box-shadow: ${focusStyling};
  `;
};
