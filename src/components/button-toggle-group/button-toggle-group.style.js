import styled, { css } from 'styled-components';

const ButtonToggleGroupStyle = styled.div`
  ${({ inputWidth }) => inputWidth && css`
    width: ${`${inputWidth}%`};
  `};
`;

export default ButtonToggleGroupStyle;
