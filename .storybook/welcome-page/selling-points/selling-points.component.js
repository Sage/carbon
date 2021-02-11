import React from "react";
import { useTranslation } from "react-i18next";
import { Wrapper, SellingPoint } from "./selling-points.style";
import Item from "./selling-points-item.component";
import Panel from "./selling-point-panel.component";
import Heading from "../components-demo/component-heading";
import { ContentWrapper } from "../common.style";

const SellingPointsGrid = () => {
  const { t } = useTranslation();

  return (
    <div>
      <ContentWrapper>
        <Heading
          title={t("homepage.selling_points.heading")}
          titleSuffix={t("homepage.selling_points.heading_suffix")}
          divider
          centerAlign
          text={t("homepage.selling_points.text")}
        />
      </ContentWrapper>
      <Wrapper>
        <ItemsWrapper>{Items()}</ItemsWrapper>
      </Wrapper>
    </div>
  );
};

const ItemsWrapper = ({ columns, children }) => (
  <SellingPoint columns={columns}>{children}</SellingPoint>
);

const Items = () => {
  const { t } = useTranslation();

  return ["point", "flexible", "brush", "hammer", "plug", "collaborate"].map(
    (item) => {
      return (
        <Item key={item}>
          <Panel
            icon={item}
            heading={t(`homepage.selling_points.${item}.heading`)}
            text={t(`homepage.selling_points.${item}.text`)}
          />
        </Item>
      );
    }
  );
};

export default SellingPointsGrid;
