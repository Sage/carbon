import styled from 'styled-components';
import { baseTheme } from '../../../style/themes';

const overhang = 4;

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  position: absolute;
  z-index: 2000;
  top: 100%;
  width: calc(100% + ${2 * overhang}px);
  z-index: 2000;
  left: -${overhang}px;
`;

StyledSelectListContainer.defaultProps = {
  maxHeight: '180px',
  theme: baseTheme
};

export default StyledSelectListContainer;
