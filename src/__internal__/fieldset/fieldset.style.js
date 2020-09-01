import styled, { css } from 'styled-components';
import { space } from 'styled-system';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';

const StyledFieldset = styled.fieldset`
  ${space}
  border: none;
  margin: 0;
  padding: 0;
  min-width: 0;
  min-inline-size: 0;

  ${({ styleOverride }) => styleOverride};
`;


const StyledFieldsetContent = styled.div`
  ${({ inline }) => inline && 'display: flex;'}
`;

const StyledLegendContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  ${({
    inline,
    width,
    align,
    rightPadding,
    theme
  }) => inline && css`
    box-sizing: border-box;
    margin: 0;
    height: 34px;
    ${width && `width: ${width}%`};
    justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'};
    padding-right: ${rightPadding * theme.spacing}px;
  `}

  legend {
    padding: 0;
    font-weight: 600;
    line-height: 24px;
  }

  ${({ styleOverride }) => styleOverride};
`;

StyledLegendContainer.defaultProps = {
  align: 'right',
  theme: BaseTheme
};

StyledLegendContainer.propTypes = {
  inline: PropTypes.bool,
  width: PropTypes.number,
  align: PropTypes.oneOf(['left', 'right']),
  rightPadding: PropTypes.oneOf([1, 2])
};

export {
  StyledFieldset,
  StyledFieldsetContent,
  StyledLegendContainer
};
