import styled from 'styled-components';
import { baseTheme } from '../../../style/themes';

const StyledSelectListContainer = styled.div`
  background-color: white;
  box-shadow: ${({ theme }) => `${theme.shadows.depth1}`};
  position: absolute;
  width: 100%;
`;

StyledSelectListContainer.defaultProps = {
  maxHeight: '180px',
  theme: baseTheme
};

export default StyledSelectListContainer;
