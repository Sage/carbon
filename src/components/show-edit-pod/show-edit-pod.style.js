import styled, { css } from 'styled-components';
import { StyledFormFooter } from '../../__deprecated__/components/form/form.style.js';
import { StyledEditAction } from '../pod/pod.style.js';
import Pod from '../pod';
import Button from '../button';
import Link from '../link';
import { isClassic } from '../../utils/helpers/style-helper';


const StyledPod = styled(Pod)`
  ${StyledFormFooter} {
    margin-top: ${({ theme }) => (isClassic(theme) ? 20 : 24)}px;
  }

  ${StyledEditAction} {
    ${({ theme }) => !isClassic(theme) && css`
      > a, button {
        height: 16px;
        width: 16px;
        padding: 20px;
      }
    `};
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

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.colors.error};
  padding-right: 0px;
  padding-left: 0px;
  margin-right: 0px;

  &:hover {
    color: ${({ theme }) => theme.colors.destructive.hover};
  }
`;

const StyledLink = styled(Link)`
  a {
    color: #C7384F;

    &:hover {
      color: #C11E20;
    }
  }
`;

export { StyledPod, StyledButton, StyledLink };
