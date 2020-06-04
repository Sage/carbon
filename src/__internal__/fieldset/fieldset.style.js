import styled, { css } from 'styled-components';

const StyledFieldset = styled.fieldset`
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
  ${({ inline }) => inline && css`
    margin-right: 32px;
    height: 34px;
  `}
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  legend {
    padding: 0;
    font-weight: 600;
    line-height: 24px;
    margin-right: 4px;
  }

  ${({ styleOverride }) => styleOverride};
`;

export {
  StyledFieldset,
  StyledFieldsetContent,
  StyledLegendContainer
};
