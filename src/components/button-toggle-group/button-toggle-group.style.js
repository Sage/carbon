// import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
// import { THEMES } from '../../style/themes';

const ButtonToggleGroupStyle = styled.div`
  ${({ inputWidth }) => inputWidth && css`
    width: ${`${inputWidth}%`};
  `};
`;

export default ButtonToggleGroupStyle;
