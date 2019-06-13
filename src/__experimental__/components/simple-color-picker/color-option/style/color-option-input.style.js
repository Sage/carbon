import styled from 'styled-components';
import baseTheme from '../../../../../style/themes/base';
// eslint-disable-next-line import/no-named-as-default
import Input from '../../../input';
import ColorOptionInputClassicStyle from './color-option-input-classic.style';
import StyledColorSampleBox from './color-sample-box.style';

const StyledColorOptionInput = styled(Input)`
  position: absolute;
  opacity: 0;
  height: 56px;
  width: 56px;
  margin: 0;

  &:hover {
    cursor: pointer;
  }

  &:checked + ${StyledColorSampleBox} {
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.primary};
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
