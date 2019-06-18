import styled from 'styled-components';
import baseTheme from '../../../../../style/themes/base';
import Input from '../../../input/input.component';
import ColorOptionInputClassicStyle from './color-option-input-classic.style';
import StyledColorSampleBox from '../../color-sample-box/style/color-sample-box.style';

const StyledColorOptionInput = styled(Input)`
  position: absolute;
  opacity: 0;
  height: 56px;
  width: 56px;
  margin: 0;

  &:checked + ${StyledColorSampleBox}, &:focus + ${StyledColorSampleBox} {
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }

  ${ColorOptionInputClassicStyle}
`;

StyledColorOptionInput.defaultProps = {
  theme: baseTheme
};

export default StyledColorOptionInput;
