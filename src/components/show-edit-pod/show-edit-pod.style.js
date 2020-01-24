import styled, { css } from 'styled-components';
import { StyledFormFooter } from '../../__deprecated__/components/form/form.style.js';
import { StyledEditAction } from '../pod/pod.style.js';
import Pod from '../pod';
import Link from '../link';
import { isClassic } from '../../utils/helpers/style-helper';
import StyledDeleteButton from './delete-button.style.js';
import { baseTheme } from '../../style/themes';


const StyledPod = styled(Pod)`
  ${StyledFormFooter} {
    margin-top: ${({ theme }) => (isClassic(theme) ? 20 : 24)}px;
  }

  ${StyledEditAction} {
    ${({ theme }) => !isClassic(theme) && css`
      > a, button {
        height: 16px;
        width: 16px;
        padding: 16px;
      }
    `};
  }

  ${StyledDeleteButton} {
    color: ${({ theme }) => theme.colors.error};

    &:hover {
      color: ${({ theme }) => theme.colors.destructive.hover};
    }
  }

  .common-input__prefix {
    z-index: 5;
  }

  .carbon-show-edit-pod__transition-enter {
    opacity: 0;
  }

  .carbon-show-edit-pod__transition-enter.carbon-show-edit-pod__transition-enter-active {
    opacity: 1;
    transition: all 300ms ease-in;
  }

  .carbon-show-edit-pod__transition-exit {
    opacity: 0;
    position: absolute;
  }
`;

StyledPod.defaultProps = {
  theme: baseTheme
};

const StyledLink = styled(Link)`
  a {
    color: #C7384F;

    &:hover {
      color: #C11E20;
    }
  }
`;

export { StyledPod, StyledLink };
