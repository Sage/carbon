import React from "react";
import { useTranslation } from "react-i18next";
import {
  Wrapper,
  GetStartedWrapper,
  Text,
  CheckoutText,
} from "./get-started.style";
import Button from "../../../src/components/button";

const GetStarted = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <GetStartedWrapper>
        <Text>{t("homepage.get_started.ready")}</Text>
        <CheckoutText>{t("homepage.get_started.checkout")}</CheckoutText>
        <Button
          buttonType="darkBackground"
          href="https://github.com/Sage/carbon"
          size="large"
          target="_blank"
        >
          {t("navigation.github.view")}
        </Button>
        <Button
          buttonType="primary"
          href="https://github.com/Sage/carbon/blob/master/docs/getting-started.stories.mdx"
          size="large"
          target="_blank"
          ml={2}
        >
          {t("navigation.github.download")}
        </Button>
      </GetStartedWrapper>
    </Wrapper>
  );
};

export default GetStarted;
