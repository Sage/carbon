import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import InputPresentationStyle from '../input/input-presentation.style';
import dateClassicStyle from './date-classic.style';

const StyledDateInput = styled.div`
  display: inline-block;
  & ${InputPresentationStyle} {
    flex: none;
    width: ${({ size }) => (size === 'large' ? '140px' : '135px')};
  }

  ${dateClassicStyle}
`;

StyledDateInput.defaultProps = {
  theme: baseTheme
};

export default StyledDateInput;
