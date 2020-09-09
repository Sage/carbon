import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';

const LabelStyle = styled.label`
  color: ${({ theme }) => theme.text.color};
  display: block;
  font-weight: 600;

  ${({ disabled, theme }) => disabled && css`
    color: ${theme.disabled.disabled};
  `}
`;

LabelStyle.defaultProps = {
  theme: BaseTheme
};

LabelStyle.propTypes = {
  disabled: PropTypes.bool
};

export const StyledLabelContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  ${({
    align, inline, pr, pl, width, theme
  }) => inline && css`
    box-sizing: border-box;
    margin-bottom: 0;
    ${pr && css`padding-right: ${pr * theme.spacing}px;`};
    ${pl && css`padding-left: ${pl * theme.spacing}px;`};
    justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'};
    width: ${width === 0 ? StyledLabelContainer.defaultProps.width : width}%;
  `}

  ${({
    childOfForm,
    inline,
    align,
    optional
  }) => childOfForm && css`
    ${!inline && css`
      margin-bottom: 12px;
    `}

    ${inline && align === 'right' && css`
      margin-left: 12px;
    `}

    ${optional && css`
      ::after {
        content: '(optional)';
        font-weight: 350;
        margin-left: 4px;
      }
    `}
  `}

  ${({ styleOverride }) => styleOverride};
`;

StyledLabelContainer.defaultProps = {
  align: 'right',
  inputSize: 'medium',
  theme: BaseTheme,
  width: 30
};

StyledLabelContainer.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  inline: PropTypes.bool,
  inputSize: PropTypes.oneOf(OptionsHelper.sizesRestricted),
  width: PropTypes.number,
  readOnly: PropTypes.bool,
  pr: PropTypes.number,
  pl: PropTypes.number,
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default LabelStyle;
