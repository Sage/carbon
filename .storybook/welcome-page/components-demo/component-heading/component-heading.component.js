import React from 'react';
import { StyledComponentHeader, StyledHeading, StyledText } from './component-heading.style';

const ComponentHeading = ({ centerAlign, title, titleSuffix, text, divider }) => (
  <StyledComponentHeader centerAlign={ centerAlign }>
    { title && <StyledHeading>{ title } { titleSuffix && <span>{ titleSuffix } </span> }</StyledHeading> }
    { divider && <hr /> }
    { text && <StyledText>{ text }</StyledText> }
  </StyledComponentHeader>
);

export default ComponentHeading;
