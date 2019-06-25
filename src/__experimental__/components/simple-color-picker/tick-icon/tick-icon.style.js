import styled, { css } from 'styled-components';
import Icon from '../../../../components/icon';
import getRgbValues from '../../../../style/utils/get-rgb-values';

const getIconColor = (color, theme) => {
  let rgbValues;
  if (color[0] === '#') rgbValues = getRgbValues(color);
  const [r, g, b] = rgbValues;
  const contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
  return contrast >= 128 ? theme.text.color : theme.colors.white;
};

const StyledTickIcon = styled(Icon)`
  &.carbon-icon {
    height: 22px;
    width: 22px;
    pointer-events: none;
    display: none;

    &::before {
      font-size: 22px;
      color: ${({ bgColor, theme }) => getIconColor(bgColor, theme)};
    }

    ${({ checked }) => checked && css`
      {
        display: block;
      }
    `}
  }
`;

export default StyledTickIcon;
