import styled, { css } from 'styled-components';
import InputPresentationStyle from '../input/input-presentation.style';
import { THEMES } from '../../../style/themes';
import baseTheme from '../../../style/themes/base';

const StyledDateInput = styled.div`
  & ${InputPresentationStyle} {
    flex: none;
    width: 135px;

    ${({ theme }) => theme.name === THEMES.classic && css`
        width: 120px;
      `}
  }
`;

StyledDateInput.defaultProps = {
  theme: baseTheme
};

export default StyledDateInput;
