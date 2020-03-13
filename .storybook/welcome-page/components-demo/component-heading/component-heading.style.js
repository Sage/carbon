import styled from 'styled-components';

export const StyledComponentHeader = styled.header`
  align-items:${({ centerAlign }) => centerAlign ? 'center' : 'flex-start'};
  text-align:${({ centerAlign }) => centerAlign ? 'center' : 'left'};
  display: flex;
  flex-direction: column;
  margin-bottom: 60px;

  hr {
    background-color: #668592;
    border: none;
    height: 2px;
    margin: 0 0 24px;
    width: 60px;
  }
`;

export const StyledHeading = styled.h2`
  font-size: 24px;
  line-height: 1.22em;
  margin: 0 0 24px;

  span {
    color: #000;
    font-weight: 700;
  }
`;

export const StyledText = styled.span`
  display: inline-block;
  font-size: 16px;
  line-height: 1.22em;
  max-width: 450px;
`;