import React from "react";
import Tile, { TileProps } from ".";
import TileFooter from "./tile-footer/tile-footer.component";
import Content from "../content";
import { Dl, Dt, Dd } from "../definition-list";
import Accordion from "../accordion/accordion.component";
import Button from "../button/button.component";
import Typography from "../typography/typography.component";
import { TILE_ORIENTATIONS, TILE_THEMES } from "./tile.config";

export default {
  title: "Tile/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    variant: {
      options: TILE_THEMES,
      control: {
        type: "select",
      },
    },
    orientation: {
      options: TILE_ORIENTATIONS,
      control: {
        type: "select",
      },
    },
  },
};

interface TileStoryProps {
  contentOneChildren?: string;
  contentOneTitle?: string;
  contentOneWidth?: string;
  contentTwoChildren?: string;
  contentTwoTitle?: string;
  contentTwoWidth?: string;
  contentThreeChildren?: string;
  contentThreeTitle?: string;
  contentThreeWidth?: string;
}

export const DefaultStory = ({
  contentOneChildren,
  contentOneTitle,
  contentOneWidth,
  contentTwoChildren,
  contentTwoTitle,
  contentTwoWidth,
  contentThreeChildren,
  contentThreeTitle,
  contentThreeWidth,
  ...args
}: TileProps & TileStoryProps) => {
  const contentOneProps = {
    key: "one",
    children: contentOneChildren,
    title: contentOneTitle,
    width: contentOneWidth,
  };
  const contentTwoProps = {
    key: "two",
    children: contentTwoChildren,
    title: contentTwoTitle,
    width: contentTwoWidth,
  };
  const contentThreeProps = {
    key: "three",
    children: contentThreeChildren,
    title: contentThreeTitle,
    width: contentThreeWidth,
  };
  const tileContent = [
    contentOneProps.children ? <Content {...contentOneProps} /> : undefined,
    contentTwoProps.children ? <Content {...contentTwoProps} /> : undefined,
    contentThreeProps.children ? <Content {...contentThreeProps} /> : undefined,
  ];
  return <Tile {...args}>{tileContent}</Tile>;
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  variant: "tile",
  orientation: "horizontal",
  width: "",
  contentOneChildren: "Test Body One",
  contentOneTitle: "Test Title One",
  contentOneWidth: "",
  contentTwoChildren: "Test Body Two",
  contentTwoTitle: "Test Title Two",
  contentTwoWidth: "",
  contentThreeChildren: "Test Body Three",
  contentThreeTitle: "Test Title Three",
  contentThreeWidth: "",
};

export const TileComponent = ({ ...props }) => {
  return (
    <Tile {...props}>
      <Content title="Test Title One">Test Body One</Content>
      <Content title="Test Title Two">Test Body Two</Content>
      <Content title="Test Title Three">Test Body Three</Content>
    </Tile>
  );
};

export const TileFooterComponent = ({ ...props }) => {
  return (
    <Tile p={0} orientation="vertical">
      <Accordion p={0} borders="none" title="Accordion">
        <Dl dtTextAlign="left" ddTextAlign="right">
          <Dt>Coffee Subscription</Dt>
          <Dd>£7.00 a month</Dd>
          <Dt>Grind Size</Dt>
          <Dd>Espresso</Dd>
          <Dt>Quantity</Dt>
          <Dd>3kg</Dd>
          <Dd>
            <Button
              buttonType="tertiary"
              href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
            >
              Have a promo code?
            </Button>
          </Dd>
        </Dl>
      </Accordion>
      <TileFooter {...props} p={3}>
        <Typography pr={2} display="inline" variant="b">
          Example footer text
        </Typography>
        <Typography display="inline">Example text</Typography>
      </TileFooter>
    </Tile>
  );
};

export const DlTileComponent = ({ ...props }) => {
  return (
    <div>
      <Dl data-element="dl" {...props}>
        <Dt>Coffee Subscription</Dt>
        <Dd data-element="dd">£7.00 a month</Dd>
        <Dt>Grind Size</Dt>
        <Dd>Espresso</Dd>
        <Dt>Quantity</Dt>
        <Dd>3kg</Dd>
      </Dl>
    </div>
  );
};
