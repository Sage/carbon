import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../src/components/button";
import { Wrapper } from "../common.style";
import {
  HeadingBackgroundWrapper,
  HeadingContentWrapper,
  CodeButtonWrapper,
  GitHubLinkWrapper,
} from "./header.style";

const Header = () => {
  const { t } = useTranslation();

  return (
    <HeadingBackgroundWrapper>
      <Wrapper>
        <HeadingContentWrapper>
          <div>
            <h1>{t("homepage.page_header_large.heading1")}</h1>
            <h2>{t("homepage.page_header_large.heading2")}</h2>
          </div>
          <CodeButtonWrapper>
            <Button
              buttonType="darkBackground"
              target="_blank"
              href="https://github.com/Sage/carbon"
              size="large"
              target="_blank"
            >
              {t("navigation.github.view")}
            </Button>
            <Button
              buttonType="primary"
              target="_blank"
              href="https://github.com/Sage/carbon/blob/master/docs/getting-started.stories.mdx"
              size="large"
              target="_blank"
              ml={2}
            >
              {t("navigation.github.download")}
            </Button>
          </CodeButtonWrapper>
          <GitHubLinkWrapper>
            <div data-component="link">
              <a tabIndex="0" href="https://www.npmjs.com/package/carbon-react">
                <span>
                  <img
                    src="https://img.shields.io/npm/v/carbon-react.svg"
                    alt="npm"
                  />
                </span>
              </a>
            </div>
          </GitHubLinkWrapper>
        </HeadingContentWrapper>
      </Wrapper>
    </HeadingBackgroundWrapper>
  );
};

export default Header;
