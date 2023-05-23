const addFocusStyling = (innerThickness = "2px", outerThickness = "4px") => `
outline: none;
box-shadow: 0 0 0 ${innerThickness} var(--colorsSemanticFocus500), 0 0 0 ${outerThickness} var(--colorsUtilityYin090); 
`;
export default addFocusStyling;
