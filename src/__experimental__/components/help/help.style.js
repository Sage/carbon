import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledHelp = styled.a`
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-left: 8px;
  text-decoration: none;
  top: -1px;

  &:hover {
    color: '#255BC7';
    text-decoration: underline;
  }
`;

StyledHelp.defaultProps = {
  theme: baseTheme
};

export default StyledHelp;
