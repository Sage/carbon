import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';

const StyledDateInput = styled.div`
    box-sizing: content-box;
    width: ${({ theme }) => ((theme.name === THEMES.classic) ? '120px' : '130px')};
`;

StyledDateInput.defaultProps = {
  theme: baseTheme
};

export default StyledDateInput;
