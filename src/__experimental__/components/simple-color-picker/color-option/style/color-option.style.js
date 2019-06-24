import styled from 'styled-components';
import colorOptionClassicStyles from './color-option-classic.style';
import baseTheme from '../../../../../style/themes/base';

const StyledColorOption = styled.li`
  width: 56px;
  height: 56px;
  margin-right: 2px;
  margin-bottom: 2px;
  list-style: none;

  &:hover {
    cursor: pointer;

  }

  ${colorOptionClassicStyles}
`;

StyledColorOption.defaultProps = {
  theme: baseTheme
};

export default StyledColorOption;
