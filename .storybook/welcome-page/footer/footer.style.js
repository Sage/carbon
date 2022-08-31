import styled from "styled-components";
import LogoSvg from "./sage_logo.svg";

export const Background = styled.div`
  margin-top: -1px;
  background-color: #000000;
  left: 0;
  right: 0;
`;

export const StyledFooter = styled.div`
  box-sizing: border-box;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  width: 100%;

  @media (min-width: 800px) {
    align-items: center;
    flex-direction: row;
  }
`;

export const Corporate = styled.div`
  display: flex;
  font-size: 13px;
  flex-direction: column;
  @media (min-width: 800px) {
    text-align: right;
  }
`;

export const SageIcon = styled.span`
  background-image: url(${LogoSvg});
  background-repeat: no-repeat;
  background-position: center;
  margin: 20px auto 20px;
  @media (min-width: 800px) {
    margin: 0 0 0 auto;
  }
  height: 26px;
  width: 47px;
`;

export const Legal = styled.span``;
