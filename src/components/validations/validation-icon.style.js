import styled from "styled-components";
import BaseTheme from "../../style/themes/base";
import StyledIcon from "../icon/icon.style";

const ValidationIconStyle = styled.div`
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  border: 0;
  outline: none;

  ${StyledIcon}:before {
    color: ${({ validationType, theme }) => theme.colors[validationType]};
  }

  ${StyledIcon}:focus {
    outline: solid 2px ${({ theme }) => theme.colors.focus};
  }
`;

ValidationIconStyle.defaultProps = {
  validationType: "error",
  theme: BaseTheme,
};

export default ValidationIconStyle;
