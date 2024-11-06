import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import { Dl, Dt, Dd } from "../definition-list";
import Link from "../link";
import Button from "../button";
import { Accordion } from "../accordion";
import Typography from "../typography";
import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Icon from "../icon";
import Hr from "../hr";
import VerticalDivider from "../vertical-divider";
import FlexTileDivider from "./flex-tile-divider";

import {
  FlexTileCell,
  FlexTileContainer,
  Tile,
  TileContent,
  TileFooter,
  TileHeader,
} from ".";

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
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const DefaultStory: Story = () => {
  return (
    <Tile>
      <TileContent>Test Body One</TileContent>
      <TileContent>Test Body Two</TileContent>
      <TileContent>Test Body Three</TileContent>
    </Tile>
  );
};
DefaultStory.storyName = "Default";

export const SmallRoundness: Story = () => {
  return (
    <Tile roundness="small">
      <TileContent>Test Body One</TileContent>
      <TileContent>Test Body Two</TileContent>
      <TileContent>Test Body Three</TileContent>
    </Tile>
  );
};
SmallRoundness.storyName = "Small Roundness";

export const LargeRoundness: Story = () => {
  return (
    <Tile roundness="large">
      <TileContent>Test Body One</TileContent>
      <TileContent>Test Body Two</TileContent>
      <TileContent>Test Body Three</TileContent>
    </Tile>
  );
};
LargeRoundness.storyName = "Large Roundness";

export const Vertical: Story = () => {
  return (
    <Tile orientation="vertical">
      <TileContent>Test Body One</TileContent>
      <TileContent>Test Body Two</TileContent>
      <TileContent>Test Body Three</TileContent>
    </Tile>
  );
};
Vertical.storyName = "Vertical";

export const WithTileFooter: Story = () => {
  return (
    <Box>
      <Tile orientation="vertical" width={400}>
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example header
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
          <TileFooter variant="transparent" pt={2}>
            <Typography pr={2} display="inline" variant="b">
              Example bold text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </TileFooter>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={400}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter p={3}>
            <Typography pr={2} display="inline" variant="b">
              Example bold text
            </Typography>
            <Typography display="inline">Example text</Typography>
          </TileFooter>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={425}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>Labore ipsum nostrud quis aliquip</Typography>
            <Hr />
            <Typography>Labore ipsum nostrud quis aliquip</Typography>
          </Box>
          <TileFooter p={1}>
            <Box
              width="100%"
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
              >
                Edit Button
              </Button>
              <VerticalDivider tint={80} py={0} px={2} h={20} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
              <VerticalDivider tint={80} py={0} px={2} h={20} />
              <Button
                p={0}
                iconPosition="after"
                iconType="edit"
                buttonType="tertiary"
                ml={2}
              >
                Edit Button
              </Button>
            </Box>
          </TileFooter>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={400}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter p={2} variant="black" />
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile px={0} pb={0} orientation="vertical" width={400}>
        <TileContent>
          <Box px={3}>
            <Typography pb={2} variant="h4" fontWeight="500">
              Example header
            </Typography>
            <Typography>
              Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
              tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor
              nisi ex voluptate occaecat veniam. Magna aliqua velit aliquip
              dolore pariatur nostrud deserunt amet.
            </Typography>
          </Box>
          <TileFooter p={2} variant="grey" />
        </TileContent>
      </Tile>
    </Box>
  );
};
WithTileFooter.storyName = "With TileFooter";

export const WithTileHeader: Story = () => (
  <Box>
    <Tile orientation="vertical" width={400}>
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
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile px={0} pt={0} orientation="vertical" width={400}>
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
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile px={0} pt={0} orientation="vertical" width={400}>
      <TileContent>
        <TileHeader p={2} variant="black" />
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile px={0} pt={0} orientation="vertical" width={400}>
      <TileContent>
        <TileHeader p={2} variant="grey" />
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
      </TileContent>
    </Tile>
  </Box>
);
WithTileHeader.storyName = "With TileHeader";

export const WithButtonInTileHeader: Story = () => {
  const dummyText = [
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
  ];
  const [content1, setContent1] = useState(dummyText[0]);
  const [content2, setContent2] = useState(dummyText[1]);

  const buttonAction = () => {
    setContent1(dummyText[Math.floor(Math.random() * dummyText.length)]);
    setContent2(dummyText[Math.floor(Math.random() * dummyText.length)]);
  };

  return (
    <Tile px={0} pt={0} orientation="vertical" variant="grey" width={425}>
      <TileContent>
        <TileHeader pl={3} py={1} variant="grey">
          <Button iconType="settings" onClick={buttonAction}>
            Generate content
          </Button>
        </TileHeader>
        <Box px={3} pt={3}>
          <Typography pb={2} variant="h4" fontWeight="500">
            Example tile body
          </Typography>
          <Typography>{content1}</Typography>
          <Hr />
          <Typography>{content2}</Typography>
        </Box>
      </TileContent>
    </Tile>
  );
};
WithButtonInTileHeader.storyName = "With Button in TileHeader";

export const CustomWidths: Story = () => {
  return (
    <Box>
      <Tile variant="tile" orientation="horizontal" width="75%">
        <TileContent>Test Body</TileContent>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" orientation="horizontal" width={1 / 4}>
        <TileContent>Test Body</TileContent>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" orientation="horizontal" width={150}>
        <TileContent>Test Body</TileContent>
      </Tile>
      <Box my={3} />
      <Tile variant="tile" orientation="horizontal">
        <TileContent width="30%">Test Body One</TileContent>
        <TileContent width={150}>Test Body Two</TileContent>
        <TileContent width={1 / 4}>Test Body Three</TileContent>
      </Tile>
    </Box>
  );
};
CustomWidths.storyName = "Custom Widths";

export const CustomHeights: Story = () => {
  return (
    <Box display="flex" flexDirection="row" height="250px" gap="8px">
      <Tile variant="tile" orientation="vertical" height="35%">
        <Box>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
      </Tile>
      <Tile variant="tile" orientation="vertical" height="50%">
        <Box pt={2}>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
      </Tile>
      <Tile variant="tile" orientation="vertical" height="75%">
        <Box>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
        <Box>Content</Box>
      </Tile>
      <Tile variant="tile" orientation="vertical" height="100%">
        <Box>
          <Typography display="block" variant="strong">
            Title
          </Typography>
          Content
        </Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Tile>
    </Box>
  );
};
CustomHeights.storyName = "Custom Heights";

export const Active: Story = () => {
  return (
    <Tile variant="active" orientation="horizontal">
      <TileContent width="40%">Test Body One</TileContent>
      <TileContent width="80%">Test Body Two</TileContent>
      <TileContent width="120%">Test Body Three</TileContent>
    </Tile>
  );
};
Active.storyName = "Active";

export const Grey: Story = () => {
  return (
    <Tile variant="grey" orientation="horizontal">
      <TileContent width="40%">Test Body One</TileContent>
      <TileContent width="80%">Test Body Two</TileContent>
      <TileContent width="120%">Test Body Three</TileContent>
    </Tile>
  );
};
Grey.storyName = "Grey";

export const CustomBorders: Story = () => {
  return (
    <Box>
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth200"
        borderVariant="selected"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Selected variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth200"
        borderVariant="positive"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Positive variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth200"
        borderVariant="negative"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Negative variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth300"
        borderVariant="caution"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Caution variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile orientation="vertical" width={400} borderWidth="borderWidth100">
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Default/neutral variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
      <Box my={3} />
      <Tile
        orientation="vertical"
        width={400}
        borderWidth="borderWidth400"
        borderVariant="info"
      >
        <TileContent>
          <Typography pb={2} variant="h4" fontWeight="500">
            Info variant
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </TileContent>
      </Tile>
    </Box>
  );
};
CustomBorders.storyName = "Custom Borders";
CustomBorders.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithInline: Story = () => {
  return (
    <Tile variant="tile" orientation="horizontal">
      <TileContent width="80%">Test Body One</TileContent>
      <TileContent width="80%">Test Body Two</TileContent>
      <TileContent width="80%">Test Body Three</TileContent>
    </Tile>
  );
};
WithInline.storyName = "With Inline";

export const WithDifferentPaddingAndMargin: Story = () => {
  return (
    <>
      <Tile p={0} m={0} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={1} m={1} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={2} m={2} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={3} m={3} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={4} m={4} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
      <Tile p={5} m={5} variant="tile" orientation="horizontal">
        <TileContent width="50%">Example TileContent</TileContent>
      </Tile>
    </>
  );
};
WithDifferentPaddingAndMargin.storyName = "With Different Padding and Margin";

export const WithDefinitionListDefault: Story = () => {
  return (
    <Tile width="95%">
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
    <Tile width="95%">
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

export const WithDefinitionListAndCustomTextAlignment: Story = () => {
  return (
    <Tile width="40%">
      <Dl w={40} dtTextAlign="left" ddTextAlign="right">
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
    </Tile>
  );
};
WithDefinitionListAndCustomTextAlignment.storyName =
  "With Definition List and Custom Text Alignment";

export const WithDefinitionListAndActionPopoverAndIconSupport: Story = () => {
  return (
    <Tile width="60%">
      <Dl>
        <Dt>
          <Box paddingTop="4px" display="inline-flex" alignItems="center">
            Term example
          </Box>
        </Dt>
        <Dd>
          <Box display="inline-flex" alignItems="center">
            <Icon type="tick" mr={1} />
            <Box>Details example</Box>
          </Box>
        </Dd>
        <Dt>
          <Box paddingTop="4px">Term example</Box>
        </Dt>
        <Dd>
          <Box display="inline-flex" alignItems="center">
            <Box mr={1}>Details example</Box>
            <Icon type="tick" />
          </Box>
        </Dd>
        <Dt>
          <Box paddingTop="4px">Term example</Box>
        </Dt>
        <Dd>
          <Box display="inline-flex" alignItems="center">
            <Icon mr={1} type="tick" />
            <Box mr={2}>Details example</Box>
            <ActionPopover rightAlignMenu>
              <ActionPopoverItem>Option 1</ActionPopoverItem>
              <ActionPopoverItem>Option 2</ActionPopoverItem>
            </ActionPopover>
          </Box>
        </Dd>
        <Dt>
          <Box paddingTop="4px">Term example</Box>
        </Dt>
        <Dd>
          <Box display="inline-flex" alignItems="center">
            <Box mr={2}>Details example</Box>
            <ActionPopover rightAlignMenu>
              <ActionPopoverItem>Option 1</ActionPopoverItem>
              <ActionPopoverItem>Option 2</ActionPopoverItem>
            </ActionPopover>
          </Box>
        </Dd>
      </Dl>
    </Tile>
  );
};
WithDefinitionListAndActionPopoverAndIconSupport.storyName =
  "With Definition List and Action Popover and Icon Support";

export const WithAccordion: Story = () => {
  return (
    <Tile p={0} orientation="horizontal">
      <Accordion
        p={0}
        headerSpacing={{ p: 3 }}
        borders="none"
        title="Accordion"
      >
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
    </Tile>
  );
};
WithAccordion.storyName = "With Accordion";
WithAccordion.parameters = { chromatic: { disableSnapshot: true } };

export const WithAccordionAndTileFooter: Story = () => {
  return (
    <Tile p={0} orientation="vertical">
      <Accordion
        p={0}
        headerSpacing={{ p: 3 }}
        borders="none"
        title="Accordion"
      >
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
      <TileFooter p={3}>
        <Typography pr={2} display="inline" variant="b">
          Example footer text
        </Typography>
        <Typography display="inline">Example text</Typography>
      </TileFooter>
    </Tile>
  );
};
WithAccordionAndTileFooter.storyName = "With Accordion and TileFooter";
WithAccordionAndTileFooter.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ResponsiveDefaultStory: Story = () => {
  return (
    <Tile m={0} py={0}>
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

export const CustomGaps: Story = () => {
  return (
    <>
      <Tile my={1} py={0}>
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
      <Tile my={1} py={0}>
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
    <Tile my={1} py={0}>
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
    <Tile my={1} py={0}>
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
    <Tile my={1} py={0}>
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
    <Tile my={1} py={0}>
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
    <Tile m={0} p={0}>
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

export const HighlightVariantGradientStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="gradient">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="gradient" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
HighlightVariantGradientStory.storyName = "Highlight variant gradient story";

export const HighlightVariantSuccessStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="success">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="success" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
HighlightVariantSuccessStory.storyName = "Highlight variant success story";

export const HighlightVariantNeutralStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="neutral">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="neutral" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
HighlightVariantNeutralStory.storyName = "Highlight variant neutral story";

export const HighlightVariantErrorStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="error">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="error" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
HighlightVariantErrorStory.storyName = "Highlight variant error story";

export const HighlightVariantWarningStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="warning">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="warning" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
HighlightVariantWarningStory.storyName = "Highlight variant warning story";

export const HighlightVariantInfoStory: Story = () => {
  return (
    <>
      <Tile highlightVariant="info">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
      <br />
      <Tile highlightVariant="info" roundness="large">
        <TileContent>Test Body One</TileContent>
        <TileContent>Test Body Two</TileContent>
        <TileContent>Test Body Three</TileContent>
      </Tile>
    </>
  );
};
HighlightVariantInfoStory.storyName = "Highlight variant info story";
