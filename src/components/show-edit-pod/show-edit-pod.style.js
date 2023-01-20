import styled from "styled-components";
import { StyledFormFooter } from "../form/form.style";
import { StyledContent } from "../pod/pod.style";
import Pod from "../pod";

const StyledPod = styled(Pod)`
  ${StyledFormFooter} {
    margin-top: 24px;
  }

  ${StyledContent} {
    padding: 16px;
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

export default StyledPod;
