import React from "react";
import Button from "../../../src/components/button";
import { Wrapper } from "../common.style";
import {
  HeadingBackgroundWrapper,
  HeadingContentWrapper,
  CodeButtonWrapper,
  GitHubLinkWrapper,
} from "./header.style";

const Header = () => (
  <HeadingBackgroundWrapper>
    <Wrapper>
      <HeadingContentWrapper>
        <div>
          <h1>
            Carbon is a library of React components for building great web
            applications
          </h1>
          <h2>
            Carbon is open source. It's hosted, developed, and maintained on
            GitHub.
          </h2>
        </div>
        <CodeButtonWrapper>
          <Button
            buttonType="darkBackground"
            href="https://github.com/Sage/carbon"
            size="large"
            target="_blank"
          >
            View on GitHub
          </Button>
          <Button
            buttonType="primary"
            href="https://carbon.sage.com/?path=/docs/getting-started-installation--docs"
            size="large"
            target="_blank"
            ml={2}
          >
            Install Carbon
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

export default Header;
