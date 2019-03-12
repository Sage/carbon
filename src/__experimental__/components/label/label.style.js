import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const LabelStyle = styled.label`
  color: ${({ theme }) => theme.text.color};
  cursor: pointer;
  font-weight: bold;
  padding: 6px 0 14px;
  width: 100%;

  ${({
    align, inline, inputSize, width, theme
  }) => inline && css`
    box-sizing: border-box;
    padding-bottom: 0;
    padding-right: ${theme.input[inputSize].padding};
    padding-top: ${calcInlineLabelTop(theme.input[inputSize].height)};
    text-align: ${align};
    width: ${width}%;
  `}
`;

LabelStyle.defaultProps = {
  align: 'left',
  theme: BaseTheme,
  width: 30
};

LabelStyle.propTypes = {
  align: PropTypes.string,
  inline: PropTypes.bool,
  inputSize: PropTypes.string,
  width: PropTypes.number
};

function calcInlineLabelTop(inputPresentationHeight) {
  const height = inputPresentationHeight.substring(0, inputPresentationHeight.length - 2);
  const inputHeight = 17;
  return `${Math.ceil((height - inputHeight) / 2)}px`;
}

export default LabelStyle;
