import React, { useState } from "react";
import Button from "../../../../src/components/button";
import Textbox from "../../../../src/components/textbox";
import NumberInput from "../../../../src/components/number";
import Decimal from "../../../../src/components/decimal";
import { Select, Option } from "../../../../src/components/select";
import { Wrapper, ContentWrapper } from "../../common.style";
import {
  ComponentShowcaseWrapper,
  StyledDemoWrapper,
  StyledDemoRow,
  StyledComponentWrapper,
} from "./demo.style";
import DemoTable from "./demo-table";
import DateRange from "../../../../src/components/date-range";
import Heading from "../component-heading";

const Demo = () => {
  const [numberValue, setNumberValue] = useState("0");
  const [dateValue, setDateValue] = useState(["01/01/2020", "14/02/2020"]);
  const handleDateChange = ({ target }) => {
    const newValue = [
      target.value[0].formattedValue,
      target.value[1].formattedValue,
    ];
    setDateValue(newValue);
  };
  return (
    <ComponentShowcaseWrapper>
      <ContentWrapper>
        <Heading
          title="The building blocks of "
          titleSuffix="awesome UI"
          text="Powerful components, flexible configurations, easy code, and amazing user experience - all working together to build your incredible web application."
          divider
          centerAlign
        />
        <Wrapper>
          <StyledDemoWrapper>
            <StyledDemoRow
              styling={{
                display: "flex",
                flexFlow: "wrap",
                width: "100%",
                paddingLeft: "7%",
              }}
            >
              <StyledComponentWrapper styling={{ padding: "1%" }}>
                <Button buttonType="primary">Primary</Button>
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ padding: "1%" }}>
                <Button buttonType="secondary">Secondary</Button>
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ padding: "1%" }}>
                <Button buttonType="tertiary">Tertiary</Button>
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ padding: "1%" }}>
                <Button buttonType="primary" destructive>
                  Destructive
                </Button>
              </StyledComponentWrapper>
            </StyledDemoRow>
            <StyledDemoRow styling={{ display: "flex" }}>
              <StyledComponentWrapper styling={{ width: "30%", padding: "1%" }}>
                <Textbox placeholder="Carbon Textbox" inputIcon="search" />
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ width: "30%", padding: "1%" }}>
                <NumberInput
                  value={numberValue}
                  onChange={(e) => setNumberValue(e.target.value)}
                />
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ width: "30%", padding: "1%" }}>
                <Decimal />
              </StyledComponentWrapper>
            </StyledDemoRow>
            <StyledDemoRow styling={{ display: "flex" }}>
              <StyledComponentWrapper
                styling={{ width: "100%", padding: "1.5%" }}
              >
                <DateRange value={dateValue} onChange={handleDateChange} />
              </StyledComponentWrapper>
            </StyledDemoRow>
            <StyledDemoRow styling={{ display: "flex" }}>
              <StyledComponentWrapper
                styling={{ width: "95%", padding: "1.5%" }}
              >
                <Select defaultValue="" placeholder="Carbon Select">
                  <Option value="1" text="Red" />
                  <Option value="2" text="Blue" />
                </Select>
              </StyledComponentWrapper>
            </StyledDemoRow>
            <StyledDemoRow styling={{ display: "flex" }}>
              <StyledComponentWrapper
                styling={{ width: "100%", padding: "1.5%", margin: "40px 0px" }}
              >
                <DemoTable />
              </StyledComponentWrapper>
            </StyledDemoRow>
          </StyledDemoWrapper>
        </Wrapper>
      </ContentWrapper>
    </ComponentShowcaseWrapper>
  );
};

export default Demo;
