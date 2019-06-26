import styled, { css } from 'styled-components';
import Icon from '../../../../components/icon';
import getRgbValues from '../../../../style/utils/get-rgb-values';
import baseTheme from '../../../../style/themes/base';

const getIconColor = (color, theme) => {
  const rgbValues = getRgbValues(color);
  const [r, g, b] = rgbValues;
  const contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;
  if (contrast < 128) return theme.colors.white;
  return theme.text.color;
};

const StyledTickIcon = styled(Icon)`
  &.carbon-icon {
    height: 22px;
    width: 22px;
    pointer-events: none;
    display: none;

    &::before {
      font-size: 22px;
      color: ${({ color, theme }) => getIconColor(color, theme)};
    }

    ${({ checked }) => checked && css`
      {
        display: block;
      }
    `}
  }
`;

StyledTickIcon.defaultProps = {
  theme: baseTheme
};

export default StyledTickIcon;
