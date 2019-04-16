import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import sizes from '../input/input-sizes.style';
import { THEMES } from '../../../style/themes';

const LabelStyle = styled.label`
  color: ${({ theme }) => theme.text.color};
  cursor: pointer;
  font-weight: 600;
  padding: 0 0 8px;
  width: 100%;

  ${({
    align, inline, inputSize, width
  }) => inline && css`
    box-sizing: border-box;
    padding-bottom: 0;
    padding-right: ${sizes[inputSize].padding};
    text-align: ${align};
    width: ${width === 0 ? LabelStyle.defaultProps.width : width}%;
    ${inputSize === 'small' && css`padding-top: 8px;`}
    ${inputSize === 'medium' && css`padding-top: 12px;`}
    ${inputSize === 'large' && css`padding-top: 16px;`}
  `}

  ${({ inline, theme }) => theme.name === THEMES.classic && css`
    padding-left: 6px;
    padding-right: 6px;

    ${inline && css`
      padding-left: 0;
      padding-top: 7px;
      padding-right: 8px;
    `}
  `}
`;

LabelStyle.defaultProps = {
  align: 'left',
  inputSize: 'medium',
  theme: BaseTheme,
  width: 30
};

LabelStyle.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  inline: PropTypes.bool,
  inputSize: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  width: PropTypes.number
};

export default LabelStyle;
