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
      <Text>Ready to get started?</Text>
      <CheckoutText>
        Check out the GitHub repository or download Carbon
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
        href="https://carbon.sage.com/?path=/docs/getting-started-installation--docs"
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
