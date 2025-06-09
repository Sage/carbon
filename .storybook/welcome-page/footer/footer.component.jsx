import React from "react";
import { Wrapper } from "../common.style";
import {
  Background,
  StyledFooter,
  Corporate,
  SageIcon,
  Legal,
} from "./footer.style";

const Footer = () => (
  <Background>
    <StyledFooter>
      <Wrapper>
        <Corporate>
          <SageIcon />
          <Legal>
            {"\u00A9"} The Sage Group plc. {new Date().getFullYear()}. Licensed
            under Apache 2.
          </Legal>
        </Corporate>
      </Wrapper>
    </StyledFooter>
  </Background>
);

export default Footer;
