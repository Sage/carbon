import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { Dl, Dt, Dd } from "../definition-list";
import Link from "../link";
import Button from "../button";
import Typography from "../typography";
import Box from "../box";
import FlexTileDivider from "./flex-tile-divider";

import { FlexTileCell, FlexTileContainer, Tile, TileFooter } from ".";

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
    width: true,
  },
  { p: 3 },
);

const meta: Meta<typeof Tile> = {
  title: "Tile",
  component: Tile,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const DefaultStory: Story = () => {
  return (
    <Tile>
      <Box width="30%">Test Body One</Box>
      <Box width="40%">Test Body Two</Box>
      <Box width="30%">Test Body Three</Box>
    </Tile>
  );
};
DefaultStory.storyName = "Default";
DefaultStory.parameters = { chromatic: { disableSnapshot: false } };

export const OutlineStory: Story = () => {
  return (
    <Tile outline>
      <Box width="30%">Test Body One</Box>
      <Box width="40%">Test Body Two</Box>
      <Box width="30%">Test Body Three</Box>
    </Tile>
  );
};
OutlineStory.storyName = "Outline";
OutlineStory.parameters = { chromatic: { disableSnapshot: false } };

export const RadiusStory: Story = () => {
  return (
    <>
      <Tile radius="moderate" outline mb={3}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile radius="curved" outline>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
};
RadiusStory.storyName = "Radius";

export const WithTileFooter: Story = () => {
  return (
    <Box>
      <Tile px={0} pb={0} width={400} outline statusKeyline="red">
        <Box>
          <Box px={3}>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter>Example text</TileFooter>
        </Box>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} width={400} outline>
        <Box>
          <Box px={3}>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter variant="selected">Example text</TileFooter>
        </Box>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} width={400} outline>
        <Box>
          <Box px={3}>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter variant="active">Example text</TileFooter>
        </Box>
      </Tile>
    </Box>
  );
};
WithTileFooter.storyName = "With TileFooter";
WithTileFooter.parameters = { chromatic: { disableSnapshot: false } };

export const CustomWidths: Story = () => {
  return (
    <Box>
      <Tile variant="tile" width="75%" outline radius="moderate">
        <Box>Test Body</Box>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" width={1 / 4} outline radius="moderate">
        <Box>Test Body</Box>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" width={150} outline radius="moderate">
        <Box>Test Body</Box>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" outline radius="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width={150}>Test Body Two</Box>
        <Box width={1 / 4}>Test Body Three</Box>
      </Tile>
    </Box>
  );
};
CustomWidths.storyName = "Custom Widths";

export const CustomHeights: Story = () => {
  return (
    <Box display="flex" flexDirection="row" height="250px" gap="8px">
      <Tile variant="tile" height="35%" width="150px" outline radius="moderate">
        <Box>
          <Box flexDirection="column">
            <Typography display="block" variant="strong">
              Title
            </Typography>
            Content
          </Box>
        </Box>
      </Tile>
      <Tile variant="tile" height="50%" width="150px" outline radius="moderate">
        <Box flexDirection="column">
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
      </Tile>
      <Tile variant="tile" height="75%" width="150px" outline radius="moderate">
        <Box flexDirection="column">
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
          <Box>Content</Box>
        </Box>
      </Tile>
      <Tile
        variant="tile"
        height="100%"
        width="150px"
        outline
        radius="moderate"
      >
        <Box flexDirection="column">
          <Box>
            <Typography display="block" variant="strong">
              Title
            </Typography>
            Content
          </Box>
          <Box>Content</Box>
          <Box>Content</Box>
        </Box>
      </Tile>
    </Box>
  );
};
CustomHeights.storyName = "Custom Heights";

export const Standard: Story = () => {
  return (
    <>
      <Tile variant="standard" radius="moderate" my={2}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="standard" mb={3} outline radius="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
};
Standard.storyName = "Standard";

export const StandardInverse: Story = () => {
  return (
    <Box backgroundColor="#2e2e2e" p={2}>
      <Tile variant="standard" radius="moderate" inverse mb={2}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="standard" outline radius="moderate" inverse>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </Box>
  );
};
StandardInverse.storyName = "Standard Inverse";

export const Alt: Story = () => {
  return (
    <>
      <Tile variant="alt" mb={3} outline radius="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="alt" radius="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
};
Alt.storyName = "Alt";

export const AltInverse: Story = () => {
  return (
    <Box backgroundColor="#2e2e2e" p={2}>
      <Tile variant="alt" outline inverse radius="moderate" mb={2}>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="alt" inverse radius="moderate">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </Box>
  );
};
AltInverse.storyName = "Alt Inverse";

export const Positive: Story = () => {
  return (
    <>
      <Tile variant="positive" mb={3} outline>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="positive">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
};
Positive.storyName = "Positive";

export const Negative: Story = () => {
  return (
    <>
      <Tile variant="negative" mb={3} outline>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="negative">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
};
Negative.storyName = "Negative";

export const Unavailable: Story = () => {
  return (
    <>
      <Tile variant="unavailable" mb={3} outline>
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
      <Tile variant="unavailable">
        <Box width="30%">Test Body One</Box>
        <Box width="40%">Test Body Two</Box>
        <Box width="30%">Test Body Three</Box>
      </Tile>
    </>
  );
};
Unavailable.storyName = "Unavailable";

export const WithDifferentPaddingAndMargin: Story = () => {
  return (
    <>
      <Tile p={0} m={0} variant="tile" outline width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={1} m={1} variant="tile" outline width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={2} m={2} variant="tile" outline width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={3} m={3} variant="tile" outline width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={4} m={4} variant="tile" outline width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
      <Tile p={5} m={5} variant="tile" outline width="90%">
        <Box width="50%">Example Text</Box>
      </Tile>
    </>
  );
};
WithDifferentPaddingAndMargin.storyName = "With Different Padding and Margin";

export const WithDefinitionListDefault: Story = () => {
  return (
    <Tile width="95%" outline>
      <Dl>
        <Dt>Drink</Dt>
        <Dd>Coffee</Dd>
        <Dt>Brew Method</Dt>
        <Dd>Stove Top Moka Pot</Dd>
        <Dt>Brand of Coffee</Dt>
        <Dd>Magic Coffee Beans</Dd>
        <Dt>Website</Dt>
        <Dd>
          <Link href="www.sage.com">Magic Coffee Beans' Website</Link>
        </Dd>
        <Dt>Email</Dt>
        <Dd>
          <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
        </Dd>
        <Dt>Main and Registered Address</Dt>
        <Dd mb="4px">Magic Coffee Beans,</Dd>
        <Dd mb="4px">In The Middle of Our Street,</Dd>
        <Dd mb="4px">Madness,</Dd>
        <Dd mb="4px">CO4 3VE</Dd>
        <Dd>
          <Button
            buttonType="tertiary"
            iconType="link"
            iconPosition="after"
            href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
          >
            View in Google Maps
          </Button>
        </Dd>
      </Dl>
    </Tile>
  );
};
WithDefinitionListDefault.storyName = "With Definition List Default";

export const WithDefinitionListAndCustomWidth: Story = () => {
  return (
    <Tile width="95%" outline>
      <Dl w={40}>
        <Dt>Drink</Dt>
        <Dd>Coffee</Dd>
        <Dt>Brew Method</Dt>
        <Dd>Stove Top Moka Pot</Dd>
        <Dt>Brand of Coffee</Dt>
        <Dd>Magic Coffee Beans</Dd>
        <Dt>Website</Dt>
        <Dd>
          <Link href="www.sage.com">Magic Coffee Beans' Website</Link>
        </Dd>
        <Dt>Email</Dt>
        <Dd>
          <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
        </Dd>
        <Dt>Main and Registered Address</Dt>
        <Dd mb="4px">Magic Coffee Beans,</Dd>
        <Dd mb="4px">In The Middle of Our Street,</Dd>
        <Dd mb="4px">Madness,</Dd>
        <Dd mb="4px">CO4 3VE</Dd>
        <Dd>
          <Button
            buttonType="tertiary"
            iconType="link"
            iconPosition="after"
            href="https://goo.gl/maps/GMReLoBpbn9mdZVZ7"
          >
            View in Google Maps
          </Button>
        </Dd>
      </Dl>
    </Tile>
  );
};
WithDefinitionListAndCustomWidth.storyName =
  "With Definition List and Custom Width";

export const ResponsiveDefaultStory: Story = () => {
  return (
    <Tile m={0} py={0} outline radius="moderate">
      <FlexTileContainer>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body One
        </FlexTileCell>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body Two
        </FlexTileCell>
        <FlexTileCell py={2}>
          <FlexTileDivider />
          Test Body Three With a very very long text
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
ResponsiveDefaultStory.storyName = "Responsive Tile";
ResponsiveDefaultStory.parameters = { chromatic: { disableSnapshot: false } };

export const CustomGaps: Story = () => {
  return (
    <>
      <Tile my={1} py={0} outline radius="moderate">
        <FlexTileContainer>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body One</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body Two</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">
              Test Body Three With a very very long text
            </Box>
          </FlexTileCell>
        </FlexTileContainer>
      </Tile>
      <Tile my={1} py={0} outline radius="moderate">
        <FlexTileContainer columnGap={6}>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body One</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">Test Body Two</Box>
          </FlexTileCell>
          <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
            <FlexTileDivider />
            <Box backgroundColor="#dedede">
              Test Body Three With a very very long text
            </Box>
          </FlexTileCell>
        </FlexTileContainer>
      </Tile>
    </>
  );
};
CustomGaps.storyName = "Responsive Tile with Custom Gaps";

export const FixedContainers: Story = () => {
  return (
    <Tile my={1} py={0} outline radius="moderate">
      <FlexTileContainer>
        <FlexTileCell flexGrow={0} flexBasis="fit-content" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed fit-content
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="80px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 80px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="120px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 120px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="160px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 160px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="200px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 200px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={0} flexBasis="240px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Fixed 240px
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
FixedContainers.storyName = "Responsive Tile with Fixed Width for Cells";

export const FlexContainers: Story = () => {
  return (
    <Tile my={1} py={0} outline radius="moderate">
      <FlexTileContainer>
        <FlexTileCell flexBasis="80px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 80px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="120px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 120px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="160px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="200px" py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 200px
          </Box>
        </FlexTileCell>
        <FlexTileCell flexBasis="240px" py={2} maxWidth="400px">
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 240px - maxWidth 400px
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
FlexContainers.storyName = "Responsive Tile with Flex Width for Cells";

export const ProportionateWidths: Story = () => {
  return (
    <Tile my={1} py={0} outline radius="moderate">
      <FlexTileContainer>
        <FlexTileCell flexGrow={1} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px normal
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={2} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px wide
          </Box>
        </FlexTileCell>
        <FlexTileCell flexGrow={3} py={2}>
          <FlexTileDivider />
          <Box backgroundColor="#dedede" width="100%">
            Flex 160px extra-wide
          </Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
ProportionateWidths.storyName = "Responsive Tile with Proportionate Widths";

export const Align: Story = () => {
  return (
    <Tile my={1} py={0} outline radius="moderate">
      <FlexTileContainer>
        <FlexTileCell justifyContent="flex-start" py={2}>
          <FlexTileDivider />
          <Box>Align left</Box>
        </FlexTileCell>
        <FlexTileCell justifyContent="flex-end" py={2}>
          <FlexTileDivider />
          <Box>Align right</Box>
        </FlexTileCell>
        <FlexTileCell justifyContent="center" py={2}>
          <FlexTileDivider />
          <Box>Align center</Box>
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
Align.storyName = "Responsive Tile with Align Content";

export const ResponsiveWithOverflowVisibleStory: Story = () => {
  return (
    <Tile m={0} p={0} outline radius="moderate">
      <FlexTileContainer overflow="visible">
        <FlexTileCell py={2}>Test Body One</FlexTileCell>
        <FlexTileCell py={2}>Test Body Two</FlexTileCell>
        <FlexTileCell py={2}>
          Test Body Three With a very very long text
        </FlexTileCell>
      </FlexTileContainer>
    </Tile>
  );
};
ResponsiveWithOverflowVisibleStory.storyName =
  "Responsive with Overflow Visible";

export const StatusKeylines: Story = () => {
  return (
    <>
      <Tile statusKeyline="blue" radius="moderate" outline>
        <Box>blue</Box>
      </Tile>
      <br />
      <Tile statusKeyline="green" outline radius="moderate">
        <Box>green</Box>
      </Tile>
      <br />
      <Tile statusKeyline="orange" outline radius="moderate">
        <Box>orange</Box>
      </Tile>
      <br />
      <Tile statusKeyline="red" roundness="small" outline radius="moderate">
        <Box>red</Box>
      </Tile>
      <br />
      <Tile statusKeyline="neutral" outline radius="moderate">
        <Box>neutral</Box>
      </Tile>
      <br />
      <Tile statusKeyline="purple" outline radius="moderate">
        <Box>purple</Box>
      </Tile>
      <br />
      <Tile statusKeyline="ai" outline radius="moderate">
        <Box>ai</Box>
      </Tile>
    </>
  );
};
StatusKeylines.storyName = "Status Keylines";
StatusKeylines.parameters = { chromatic: { disableSnapshot: false } };
