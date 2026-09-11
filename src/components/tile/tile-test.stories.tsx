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
import Button from "../button/__next__";
import { Typography } from "../..";

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
    children: contentOneChildren,
    width: contentOneWidth,
  };
  const contentTwoProps = {
    children: contentTwoChildren,
    width: contentTwoWidth,
  };
  const contentThreeProps = {
    children: contentThreeChildren,
    width: contentThreeWidth,
  };
  const tileContent = [
    contentOneProps.children ? (
      <TileContent key="one" {...contentOneProps} />
    ) : undefined,
    contentTwoProps.children ? (
      <TileContent key="two" {...contentTwoProps} />
    ) : undefined,
    contentThreeProps.children ? (
      <TileContent key="three" {...contentThreeProps} />
    ) : undefined,
  ];
  return (
    <Tile p={8} {...args} outline radius="moderate">
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
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value);
  };
  const buttonAction = () => {
    setTextAreaValue(dummyText[Math.floor(Math.random() * dummyText.length)]);
  };
  return (
    <Tile p={0} mx={1} variant="grey" width="50%" radius="moderate" outline>
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
              "borderRadius200",
              "borderRadius200",
            ]}
          />
        </Box>
      </TileContent>
    </Tile>
  );
};

export const MultipleTiles = () => {
  return (
    <Box p={2} display="flex" flexDirection="column">
      <Tile outline radius="moderate">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </Box>
  );
};

export const DeprecatedTileContentAndTileHeader = () => {
  return (
    <Box>
      <Tile orientation="vertical" width={400} outline>
        <TileContent>
          <TileHeader variant="transparent" pb={2}>
            <Typography pr={2} display="inline" variant="b">
              Example bold text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </TileHeader>
          <Box pt={2}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example tile body
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pt={0} orientation="vertical" width={400} outline>
        <TileContent>
          <TileHeader p={3}>
            <Typography pr={2} display="inline" variant="b">
              Example bold text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </TileHeader>
          <Box px={3} pt={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example tile body
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pt={0} orientation="vertical" width={400} outline>
        <TileContent>
          <TileHeader p={2} variant="black" />
          <Box px={3} pt={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example tile body
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pt={0} orientation="vertical" width={400} outline>
        <TileContent>
          <TileHeader p={2} variant="grey" />
          <Box px={3} pt={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example tile body
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
        </TileContent>
      </Tile>
    </Box>
  );
};
