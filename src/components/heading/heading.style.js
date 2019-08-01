import styled from 'styled-components';
import Icon from '../icon';
import baseTheme from '../../style/themes/base';

const StyledIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.border};
  cursor: pointer;
  top: 50%;
  z-index: 1002;
  position: absolute;

  .carbon-heading--has-divider & {
    margin-top: -8px;
  }

  &, &.carbon-icon {
    position: absolute;
    display: block;
    color: ${({ theme }) => theme.icon};
  }
  
  &:before, &.carbon-icon:before {
    font-size: 24px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.icon.focus};
  }
`;

StyledIcon.defaultProps = {
  theme: baseTheme
};

export default StyledIcon;
