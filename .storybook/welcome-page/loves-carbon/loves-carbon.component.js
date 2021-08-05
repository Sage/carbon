import React from "react";
import Heading from "../components-demo/component-heading";
import { Wrapper, LovesCarbonWrapper, Image } from "./loves-carbon.style";
import devices from "./devices.png";
import Link from "../../../src/components/link";

const LovesCarbon = () => (
  <LovesCarbonWrapper>
    <Wrapper>
      <div>
        <Heading
          title="Sage Loves "
          titleSuffix="Carbon"
          divider
          text="Carbon is the heart of global Sage products for hundreds of thousands of users worldwide. Designers and developers at Sage and beyond help Carbon to constantly evolve. Carbon is loaded with knowledge, keeping you ahead in cutting-edge user experience."
        />
        <Link href="http://www.sage.com" icon="arrow" iconAlign="right">
          Learn more about Sage
        </Link>
      </div>
      <Image src={devices} />
    </Wrapper>
  </LovesCarbonWrapper>
);

export default LovesCarbon;
