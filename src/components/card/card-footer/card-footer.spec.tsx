import React from "react";
import { mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import CardFooter, { CardFooterProps } from ".";
import StyledCardFooter from "./card-footer.style";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import Link from "../../link";
import CardContext from "../__internal__/card-context";

describe("CardFooter", () => {
  it("matches expected styling when it contains non-interactive content", () => {
    const tree = TestRenderer.create(
      <CardFooter>
        <Link icon="link" href="https://carbon.sage.com/">
          View Stripe Dashboard
        </Link>
      </CardFooter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("matches expected styling when it contains interactive styling", () => {
    const tree = TestRenderer.create(
      <CardFooter>
        <div id="non-interactive">View Stripe Dashboard</div>
      </CardFooter>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("when variant prop is `transparent`, render with transparent background", () => {
    const cardFooter = mount(
      <CardFooter variant="transparent">
        <div id="non-interactive">View Stripe Dashboard</div>
      </CardFooter>
    );

    assertStyleMatch(
      {
        backgroundColor: "transparent",
      },
      cardFooter.find(StyledCardFooter)
    );
  });

  it.each<CardFooterProps["roundness"]>(["default", "large"])(
    "renders with the expected border radius styling when roundness is %s",
    (roundness) => {
      assertStyleMatch(
        {
          borderBottomLeftRadius: `var(--borderRadius${
            roundness === "default" ? "1" : "2"
          }00)`,
          borderBottomRightRadius: `var(--borderRadius${
            roundness === "default" ? "1" : "2"
          }00)`,
        },
        mount(
          <CardContext.Provider value={{ roundness }}>
            <CardFooter>foo</CardFooter>
          </CardContext.Provider>
        ).find(StyledCardFooter)
      );
    }
  );
});
