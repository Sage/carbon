import styled from 'styled-components';
import ValidationIconStyle from '../../../components/validations/validation-icon.style';
import StyledHelp from '../../../components/help/help.style';
import baseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';

const IconWrapperStyle = styled.div`
  display: inline-block;
  margin: 0;
  margin-left: 4px;
  width: 24px;
  height: 24px;
  position: relative;
  margin-top: -2px;
  vertical-align: top;

  :focus{
    outline: ${({ theme }) => (isClassic(theme) ? 'none' : `2px solid ${theme.colors.focus}`)};
  }

  ${ValidationIconStyle}, ${StyledHelp} {
    position: static;
  }
`;

IconWrapperStyle.defaultProps = {
  theme: baseTheme
};

export default IconWrapperStyle;
