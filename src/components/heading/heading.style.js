import styled from 'styled-components';
import Icon from '../icon';
import StyledIcon from '../icon/icon.style';
import baseTheme from '../../style/themes/base';

const StyledHeading = styled.div`
  width: 100%;
`;

const StyledHeadingIcon = styled(Icon)`
  color: ${({ theme }) => theme.colors.border};
  cursor: pointer;
  top: 50%;
  z-index: 1002;
  position: absolute;

  .carbon-heading--has-divider & {
    margin-top: -8px;
  }

  &, &.${StyledIcon} {
    position: absolute;
    display: block;
    color: ${({ theme }) => theme.icon};
  }
  
  &:before, &${StyledIcon}:before {
    font-size: 24px;
  }
  
  &:hover {
    color: ${({ theme }) => theme.icon.focus};
  }
`;

StyledHeadingIcon.defaultProps = {
  theme: baseTheme
};

export {
  StyledHeadingIcon,
  StyledHeading
};
