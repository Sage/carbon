import React, { useState } from "react";
import { Tile, TileContent, TileHeader, TileProps } from ".";
import {
  TILE_BORDER_VARIANTS,
  TILE_ORIENTATIONS,
  TILE_THEMES,
  TILE_HIGHLIGHT_VARIANTS,
} from "./tile.config";
import Box from "../box";
import Textarea from "../textarea";
import Button from "../button";

export default {
  title: "Tile/Test",
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
    borderVariant: {
      options: TILE_BORDER_VARIANTS,
      control: {
        type: "select",
      },
    },
    highlightVariant: {
      options: [undefined, ...TILE_HIGHLIGHT_VARIANTS],
      control: {
        type: "select",
      },
    },
  },
};

interface TileStoryProps {
  contentOneChildren?: string;
  contentOneWidth?: string;
  contentTwoChildren?: string;
  contentTwoWidth?: string;
  contentThreeChildren?: string;
  contentThreeWidth?: string;
}

export const DefaultStory = ({
  contentOneChildren,
  contentOneWidth,
  contentTwoChildren,
  contentTwoWidth,
  contentThreeChildren,
  contentThreeWidth,
  ...args
}: TileProps & TileStoryProps) => {
  const contentOneProps = {
    key: "one",
    children: contentOneChildren,
    width: contentOneWidth,
  };
  const contentTwoProps = {
    key: "two",
    children: contentTwoChildren,
    width: contentTwoWidth,
  };
  const contentThreeProps = {
    key: "three",
    children: contentThreeChildren,
    width: contentThreeWidth,
  };
  const tileContent = [
    contentOneProps.children ? <TileContent {...contentOneProps} /> : undefined,
    contentTwoProps.children ? <TileContent {...contentTwoProps} /> : undefined,
    contentThreeProps.children ? (
      <TileContent {...contentThreeProps} />
    ) : undefined,
  ];
  return (
    <Tile p={8} {...args}>
      {tileContent}
    </Tile>
  );
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  variant: "tile",
  orientation: "horizontal",
  width: "",
  contentOneChildren: "Test Body One",
  contentOneWidth: "",
  contentTwoChildren: "Test Body Two",
  contentTwoWidth: "",
  contentThreeChildren: "Test Body Three",
  contentThreeWidth: "",
};

export const GreyWithTextArea = () => {
  const dummyText = [
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  ];
  const [textAreaValue, setTextAreaValue] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextAreaValue(e.target.value);
  };
  const buttonAction = () => {
    setTextAreaValue(dummyText[Math.floor(Math.random() * dummyText.length)]);
  };
  return (
    <Tile
      p={0}
      mx={1}
      orientation="vertical"
      variant="grey"
      width="50%"
      roundness="small"
    >
      <TileContent>
        <TileHeader pl={3} py={1} variant="grey">
          <Button iconType="settings" onClick={buttonAction}>
            Generate content
          </Button>
        </TileHeader>
        <Box p={0}>
          <Textarea
            rows={20}
            value={textAreaValue}
            onChange={onChange}
            borderRadius={[
              "borderRadius000",
              "borderRadius000",
              "borderRadius050",
              "borderRadius050",
            ]}
          />
        </Box>
      </TileContent>
    </Tile>
  );
};

export const MultipleTiles = () => {
  return (
    <Box p={2} display="flex" flexDirection="column" gap="20px">
      <Tile>
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <Tile orientation="vertical">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </Box>
  );
};
MultipleTiles.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};
