import React from "react";
import {
  Wrapper,
  GetStartedWrapper,
  Text,
  CheckoutText,
} from "./get-started.style";
import Button from "../../../src/components/button";

const GetStarted = () => (
  <Wrapper>
    <GetStartedWrapper>
      <Text>Ready to Get Started?</Text>
      <CheckoutText>
        Check out the Github repository or download Carbon
      </CheckoutText>
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
        href="https://github.com/Sage/carbon/blob/master/docs/getting-started.stories.mdx"
        size="large"
        target="_blank"
        ml={2}
      >
        Install Carbon
      </Button>
    </GetStartedWrapper>
  </Wrapper>
);

export default GetStarted;
