import React, { useState } from "react";

import Heading from "../component-heading";
import { Wrapper, ContentWrapper } from "../../common.style";
import Button from "../../../../src/components/button";
import DateRange from "../../../../src/components/date-range";
import Decimal from "../../../../src/components/decimal";
import NumberInput from "../../../../src/components/number";
import { Select, Option } from "../../../../src/components/select";
import Textbox from "../../../../src/components/textbox";

import DemoTable from "./demo-table";
import {
  ComponentShowcaseWrapper,
  StyledDemoWrapper,
  StyledDemoRow,
  StyledComponentWrapper,
} from "./demo.style";

const Demo = () => {
  const [decimalValue, setDecimalValue] = useState("0.01");
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
                <Textbox
                  placeholder="Carbon Textbox"
                  inputIcon="search"
                  aria-label="An example textbox component with spyglass input icon"
                />
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ width: "30%", padding: "1%" }}>
                <NumberInput
                  value={numberValue}
                  onChange={(e) => setNumberValue(e.target.value)}
                  aria-label="An example numerical input component"
                />
              </StyledComponentWrapper>
              <StyledComponentWrapper styling={{ width: "30%", padding: "1%" }}>
                <Decimal
                  aria-label="An example decimal input component"
                  value={decimalValue}
                  onChange={(e) => setDecimalValue(e.target.value.rawValue)}
                />
              </StyledComponentWrapper>
            </StyledDemoRow>
            <StyledDemoRow styling={{ display: "flex" }}>
              <StyledComponentWrapper
                styling={{ width: "100%", padding: "1.5%" }}
              >
                <DateRange
                  value={dateValue}
                  onChange={handleDateChange}
                  endDateProps={{
                    "aria-label":
                      "The end date input of the example date range component",
                  }}
                  startDateProps={{
                    "aria-label":
                      "The start date input of the example date range component",
                  }}
                />
              </StyledComponentWrapper>
            </StyledDemoRow>
            <StyledDemoRow styling={{ display: "flex" }}>
              <StyledComponentWrapper
                styling={{ width: "95%", padding: "1.5%" }}
              >
                <Select
                  defaultValue=""
                  placeholder="Carbon Select"
                  aria-label="An example select component with two options"
                >
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
