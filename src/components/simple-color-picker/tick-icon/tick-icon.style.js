import styled, { css } from "styled-components";
import Icon from "../../icon";
import getRgbValues from "../../../style/utils/get-rgb-values";

const getIconColor = (color) => {
  const rgbValues = getRgbValues(color);
  const [r, g, b] = rgbValues;
  // color contrast calculating formula as per W3 suggestions
  const redMultiplier = 299,
    greenMultiplier = 587,
    blueMultiplier = 114;
  const contrast =
    (Math.round(r * redMultiplier) +
      Math.round(g * greenMultiplier) +
      Math.round(b * blueMultiplier)) /
    1000;
  if (contrast < 128) return "var(--colorsUtilityYang100)";
  return "var(--colorsUtilityYin090)";
};

const StyledTickIcon = styled(Icon)`
  height: 22px;
  width: 22px;
  pointer-events: none;
  display: none;

  &::before {
    font-size: 22px;
    color: ${({ color }) => getIconColor(color)};
  }

  ${({ checked }) =>
    checked &&
    css`
       {
        display: block;
      }
    `}
`;

export default StyledTickIcon;
