import React from "react";
import { useTranslation } from "react-i18next";
import { Wrapper } from "../common.style";
import {
  Background,
  StyledFooter,
  Corporate,
  SageIcon,
  Legal,
} from "./footer.style";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Background>
      <StyledFooter>
        <Wrapper>
          <Corporate>
            <SageIcon />
            <Legal>{t("footer.legal")}</Legal>
          </Corporate>
        </Wrapper>
      </StyledFooter>
    </Background>
  );
};

export default Footer;
