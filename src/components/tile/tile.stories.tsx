import React from "react";
import { ComponentStory } from "@storybook/react";

import {
  ResponsiveCell,
  ResponsiveTileContainer,
  Tile,
  TileContent,
  TileFooter,
} from ".";

import { Dl, Dt, Dd } from "../definition-list";
import Link from "../link";
import Button from "../button";
import { Accordion } from "../accordion";
import Typography from "../typography";
import Box from "../box";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Icon from "../icon";
import VerticalDivider from "../vertical-divider";
import Hr from "../hr";
import StyledDivider from "./flow-cell/flow-cell.style";

export const SIZES = ["small", "medium", "large"] as const;
export const VALIDATIONS = ["error", "warning", "info"] as const;

export const DefaultStory: ComponentStory<typeof Tile> = () => (
  <Tile>
    <TileContent>Test Body One</TileContent>
    <TileContent>Test Body Two</TileContent>
    <TileContent>Test Body Three</TileContent>
  </Tile>
);

export const LargeRoundness: ComponentStory<typeof Tile> = () => (
  <Tile roundness="large">
    <TileContent>Test Body One</TileContent>
    <TileContent>Test Body Two</TileContent>
    <TileContent>Test Body Three</TileContent>
  </Tile>
);

export const Vertical: ComponentStory<typeof Tile> = () => (
  <Tile orientation="vertical">
    <TileContent>Test Body One</TileContent>
    <TileContent>Test Body Two</TileContent>
    <TileContent>Test Body Three</TileContent>
  </Tile>
);

export const WithTileFooter: ComponentStory<typeof Tile> = () => (
  <Box>
    <Tile orientation="vertical" width={400}>
      <TileContent>
        <Typography pb={2} variant="h4" fontWeight="bold">
          Example header
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
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
          <Typography pb={2} variant="h4" fontWeight="bold">
            Example header
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
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
          <Typography pb={2} variant="h4" fontWeight="bold">
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
          <Typography pb={2} variant="h4" fontWeight="bold">
            Example header
          </Typography>
          <Typography>
            Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
            tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi
            ex voluptate occaecat veniam. Magna aliqua velit aliquip dolore
            pariatur nostrud deserunt amet.
          </Typography>
        </Box>
        <TileFooter p={2} variant="black" />
      </TileContent>
    </Tile>
  </Box>
);

export const CustomWidths: ComponentStory<typeof Tile> = () => (
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

export const CustomHeights: ComponentStory<typeof Tile> = () => (
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

export const Active: ComponentStory<typeof Tile> = () => (
  <Tile variant="active" orientation="horizontal">
    <TileContent width="40%">Test Body One</TileContent>
    <TileContent width="80%">Test Body Two</TileContent>
    <TileContent width="120%">Test Body Three</TileContent>
  </Tile>
);

export const CustomBorders: ComponentStory<typeof Tile> = () => (
  <Box>
    <Tile
      orientation="vertical"
      width={400}
      borderWidth="borderWidth200"
      borderVariant="selected"
    >
      <TileContent>
        <Typography pb={2} variant="h4" fontWeight="bold">
          Selected variant
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
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
        <Typography pb={2} variant="h4" fontWeight="bold">
          Positive variant
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
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
        <Typography pb={2} variant="h4" fontWeight="bold">
          Negative variant
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
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
        <Typography pb={2} variant="h4" fontWeight="bold">
          Caution variant
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
        </Typography>
      </TileContent>
    </Tile>
    <Box my={3} />
    <Tile orientation="vertical" width={400} borderWidth="borderWidth100">
      <TileContent>
        <Typography pb={2} variant="h4" fontWeight="bold">
          Default/neutral variant
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
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
        <Typography pb={2} variant="h4" fontWeight="bold">
          Info variant
        </Typography>
        <Typography>
          Labore ipsum nostrud quis aliquip esse cillum excepteur commodo
          tempor. Ex tempor sunt culpa culpa tempor culpa. Laboris dolor nisi ex
          voluptate occaecat veniam. Magna aliqua velit aliquip dolore pariatur
          nostrud deserunt amet.
        </Typography>
      </TileContent>
    </Tile>
  </Box>
);
CustomBorders.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const WithInline: ComponentStory<typeof Tile> = () => (
  <Tile variant="tile" orientation="horizontal">
    <TileContent width="80%">Test Body One</TileContent>
    <TileContent width="80%">Test Body Two</TileContent>
    <TileContent width="80%">Test Body Three</TileContent>
  </Tile>
);

export const WithDifferentPaddingAndMargin: ComponentStory<
  typeof Tile
> = () => (
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

export const WithDefinitionListDefault: ComponentStory<typeof Tile> = () => (
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

export const WithDefinitionListAndCustomWidth: ComponentStory<
  typeof Tile
> = () => (
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

export const WithDefinitionListAndCustomTextAlignment: ComponentStory<
  typeof Tile
> = () => (
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

export const WithDefinitionListAndActionPopoverAndIconSupport: ComponentStory<
  typeof Tile
> = () => (
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

export const WithAccordion: ComponentStory<typeof Tile> = () => (
  <Tile p={0} orientation="horizontal">
    <Accordion p={0} headerSpacing={{ p: 3 }} borders="none" title="Accordion">
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

WithAccordion.parameters = { chromatic: { disableSnapshot: true } };

export const WithAccordionAndTileFooter: ComponentStory<typeof Tile> = () => (
  <Tile p={0} orientation="vertical">
    <Accordion p={0} headerSpacing={{ p: 3 }} borders="none" title="Accordion">
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

WithAccordionAndTileFooter.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ResponsiveDefaultStory: ComponentStory<typeof Tile> = () => (
  <Tile m={0} py={0}>
    <ResponsiveTileContainer>
      <ResponsiveCell py={2}>
        Test Body One
        <Hr
          position="absolute"
          bottom="0px"
          left="0px"
          width="100vw"
          m="0px 0px -1px 0px"
        />
      </ResponsiveCell>
      <ResponsiveCell py={2}>
        Test Body Two
        <Hr
          position="absolute"
          bottom="0px"
          left="0px"
          width="100vw"
          m="0px 0px -1px 0px"
        />
      </ResponsiveCell>
      <ResponsiveCell py={2}>
        Test Body Three With a very very long text
      </ResponsiveCell>
    </ResponsiveTileContainer>
  </Tile>
);

export const CustomGaps: ComponentStory<typeof Tile> = () => (
  <>
    <Tile my={1} py={0}>
      <ResponsiveTileContainer>
        <ResponsiveCell hasDivider flexGrow={0} flexBasis="fit-content" py={2}>
          <Box backgroundColor="#dedede">Test Body One</Box>
        </ResponsiveCell>
        <ResponsiveCell hasDivider flexGrow={0} flexBasis="fit-content" py={2}>
          <Box backgroundColor="#dedede">Test Body Two</Box>
        </ResponsiveCell>
        <ResponsiveCell flexGrow={0} flexBasis="fit-content" py={2}>
          <Box backgroundColor="#dedede">
            Test Body Three With a very very long text
          </Box>
        </ResponsiveCell>
      </ResponsiveTileContainer>
    </Tile>
    <Tile my={1} py={0}>
      <ResponsiveTileContainer columnGap={6}>
        <ResponsiveCell hasDivider flexGrow={0} flexBasis="fit-content" py={2}>
          <Box backgroundColor="#dedede">Test Body One</Box>
        </ResponsiveCell>
        <ResponsiveCell hasDivider flexGrow={0} flexBasis="fit-content" py={2}>
          <Box backgroundColor="#dedede">Test Body Two</Box>
        </ResponsiveCell>
        <ResponsiveCell flexGrow={0} flexBasis="fit-content" py={2}>
          <Box backgroundColor="#dedede">
            Test Body Three With a very very long text
          </Box>
        </ResponsiveCell>
      </ResponsiveTileContainer>
    </Tile>
  </>
);

export const FixedContainers: ComponentStory<typeof Tile> = () => (
  <Tile my={1} py={0}>
    <ResponsiveTileContainer>
      <ResponsiveCell hasDivider flexGrow={0} flexBasis="fit-content" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Fixed fit-content
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexGrow={0} flexBasis="80px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Fixed 80px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexGrow={0} flexBasis="120px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Fixed 120px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexGrow={0} flexBasis="160px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Fixed 160px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexGrow={0} flexBasis="200px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Fixed 200px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell flexGrow={0} flexBasis="240px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Fixed 240px
        </Box>
      </ResponsiveCell>
    </ResponsiveTileContainer>
  </Tile>
);

export const FlexContainers: ComponentStory<typeof Tile> = () => (
  <Tile my={1} py={0}>
    <ResponsiveTileContainer>
      <ResponsiveCell hasDivider flexBasis="fit-content" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex fit-content
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexBasis="80px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 80px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexBasis="120px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 120px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexBasis="160px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 160px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexBasis="200px" py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 200px
        </Box>
      </ResponsiveCell>
      <ResponsiveCell flexBasis="240px" py={2} maxWidth="400px">
        <Box backgroundColor="#dedede" width="100%">
          Flex 240px - maxWidth 400px
        </Box>
      </ResponsiveCell>
    </ResponsiveTileContainer>
  </Tile>
);

export const ProportionateWidths: ComponentStory<typeof Tile> = () => (
  <Tile my={1} py={0}>
    <ResponsiveTileContainer>
      <ResponsiveCell hasDivider flexGrow={1} py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 160px normal
        </Box>
      </ResponsiveCell>
      <ResponsiveCell hasDivider flexGrow={2} py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 160px wide
        </Box>
      </ResponsiveCell>
      <ResponsiveCell flexGrow={3} py={2}>
        <Box backgroundColor="#dedede" width="100%">
          Flex 160px extra-wide
        </Box>
      </ResponsiveCell>
    </ResponsiveTileContainer>
  </Tile>
);

export const Align: ComponentStory<typeof Tile> = () => (
  <ResponsiveTileContainer>
    <ResponsiveCell hasDivider justifyContent="flex-start">
      <Box>Align left</Box>
    </ResponsiveCell>
    <ResponsiveCell hasDivider justifyContent="flex-end">
      <Box>Align right</Box>
    </ResponsiveCell>
    <ResponsiveCell justifyContent="center">
      <Box>Align center</Box>
    </ResponsiveCell>
  </ResponsiveTileContainer>
);
