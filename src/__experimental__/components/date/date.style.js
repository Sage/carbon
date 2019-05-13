import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import InputPresentationStyle from '../input/input-presentation.style';
import dateClassicStyle from './date-classic.style';

const StyledDateInput = styled.div`
  & ${InputPresentationStyle} {
    flex: none;
    width: 135px;
  }

  ${dateClassicStyle}
`;

StyledDateInput.defaultProps = {
  theme: baseTheme
};

export default StyledDateInput;
