import styled from 'styled-components';
import baseTheme from '../../../../../style/themes/base';
import { Input as ColorOptionInput } from '../../../input';
import StyledColorSampleBox from '../../color-sample-box/style/color-sample-box.style';
import ColorOptionInputClassicStyle from './color-option-input-classic.style';

const StyledColorOptionInput = styled(ColorOptionInput)`
  position: absolute;
  opacity: 0;
  height: 56px;
  width: 56px;
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  &:focus + ${StyledColorSampleBox} {
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.focus};
  }

  ${ColorOptionInputClassicStyle}
`;

StyledColorOptionInput.defaultProps = {
  theme: baseTheme
};

export default StyledColorOptionInput;
