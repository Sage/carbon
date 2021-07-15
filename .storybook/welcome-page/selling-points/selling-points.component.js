import React from "react";
import { Wrapper, SellingPoint } from "./selling-points.style";
import Item from "./selling-points-item.component";
import Panel from "./selling-point-panel.component";
import Heading from "../components-demo/component-heading";
import { ContentWrapper } from "../common.style";

const sellingPoints = {
  point: {
    heading: "Easy, fast, powerful",
    text:
      "Over 50 components and 340 configurations bring your killer app to life.",
  },
  flexible: {
    heading: "Beautifully flexible",
    text:
      "Carbon is beautiful out-of-the-box, down to colours, icons, and style.",
  },
  brush: {
    heading: "Designed for UX",
    text:
      "Meet your users’ needs with a simple, elegant, delightful experience.",
  },
  hammer: {
    heading: "Build smarter",
    text: "Hundreds of thousands of users worldwide help Carbon evolve.",
  },
  plug: {
    heading: "Powered by you",
    text:
      "Carbon powers your app. Contribute your code, so you can power Carbon too.",
  },
  collaborate: {
    heading: "Seamlessly collaborative",
    text:
      "With Carbon’s UI Kit, designers and developers speak the same language.",
  },
};

const SellingPointsGrid = () => (
  <div>
    <ContentWrapper>
      <Heading
        title="Ready, set, "
        titleSuffix="code!"
        divider
        centerAlign
        text="Besides having beautiful UI that is easy to use, you’ll find there’s so much more to using Carbon on your next project."
      />
    </ContentWrapper>
    <Wrapper>
      <ItemsWrapper>{Items()}</ItemsWrapper>
    </Wrapper>
  </div>
);

const ItemsWrapper = ({ columns, children }) => (
  <SellingPoint columns={columns}>{children}</SellingPoint>
);

const Items = () => {
  return ["point", "flexible", "brush", "hammer", "plug", "collaborate"].map(
    (item) => {
      return (
        <Item key={item}>
          <Panel
            icon={item}
            heading={sellingPoints[item].heading}
            text={sellingPoints[item].text}
          />
        </Item>
      );
    }
  );
};

export default SellingPointsGrid;
