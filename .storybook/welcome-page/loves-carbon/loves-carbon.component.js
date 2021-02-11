import React from "react";
import { useTranslation } from "react-i18next";
import Heading from "../components-demo/component-heading";
import { Wrapper, LovesCarbonWrapper, Image } from "./loves-carbon.style";
import devices from "./devices.png";
import Link from "../../../src/components/link";

const LovesCarbon = () => {
  const { t } = useTranslation();

  return (
    <LovesCarbonWrapper>
      <Wrapper>
        <div>
          <Heading
            title={t("homepage.sage_loves_carbon.heading")}
            titleSuffix={t("homepage.sage_loves_carbon.heading_suffix")}
            divider
            text={t("homepage.sage_loves_carbon.text")}
          />
          <Link href={t("sage_href")} icon="arrow" iconAlign="right">
            {t("homepage.sage_loves_carbon.learn_more")}
          </Link>
        </div>
        <Image src={devices} />
      </Wrapper>
    </LovesCarbonWrapper>
  );
};

export default LovesCarbon;
