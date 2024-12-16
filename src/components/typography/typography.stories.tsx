import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../box";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Typography, { List, ListItem } from ".";

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Typography> = {
  title: "Typography",
  component: Typography,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const VariantsStory: Story = () => (
  <>
    <Typography variant="h1-large">Heading Level 1 Large</Typography>
    <Typography variant="h1">Heading Level 1</Typography>
    <Typography variant="h1" as="h2">
      Heading Level 1 as H2
    </Typography>
    <Typography variant="h2">Heading Level 2</Typography>
    <Typography variant="h3">Heading Level 3</Typography>
    <Typography variant="h4">Heading Level 4</Typography>
    <Typography variant="h5">Heading Level 5</Typography>
    <Typography variant="segment-header">Segment Header</Typography>
    <Typography variant="segment-header-small">Segment Header Small</Typography>
    <Typography variant="segment-subheader">Segment Subheader</Typography>
    <Typography variant="segment-subheader-alt">
      Segment Subheader Alternative
    </Typography>
    <Typography variant="h1" color="blackOpacity74">
      Black Opacity 74
    </Typography>
    <Typography variant="h1" color="blackOpacity65">
      Black Opacity 65
    </Typography>
    <Typography variant="h1" color="blackOpacity55">
      Black Opacity 55
    </Typography>
    <Typography variant="p">
      This is standard text, it is the default variant if you do not supply a
      variant prop. It has no special importance, but it does have a default
      margin bottom. You have to provide your own margin and padding to all
      other variants.
    </Typography>
    <Typography variant="p">
      If you want to{" "}
      <Typography variant="b">draw attention to content</Typography>, and that
      content has the same importance as standard text you should use the
      &quot;b&quot; variant.
    </Typography>
    <Typography variant="strong" display="block" mb={1}>
      Only when the text is more important should you use the strong variant.
    </Typography>
    <Typography variant="p">
      When you want to <Typography variant="em">stress emphasis</Typography> use
      the &quot;em&quot; variant. If you are using the variant for styling
      purposes{" "}
      <Typography variant="em" as="i">
        ensure you override the element
      </Typography>
    </Typography>
    <Typography variant="small" display="block" mb={1}>
      The small variant renders a small element, which is used for small print.
      The small variant also has a smaller appearance.
    </Typography>
    <Typography variant="big" display="block" mb={1}>
      The big variant uses larger font-face to draw attention but content has
      the same importance as standard text.
    </Typography>
    <Typography variant="span">
      The span variant, which is an inline element, can be used just as you
      would normally expect.
    </Typography>
    <Typography variant="p">
      The 1<Typography variant="sup">st</Typography>, 2
      <Typography variant="sup">nd</Typography> are examples of superscript.
    </Typography>
    <Typography variant="p">
      H<Typography variant="sub">2</Typography>O is an example of subscript
    </Typography>
  </>
);
VariantsStory.storyName = "Variants";
VariantsStory.parameters = { info: { disable: true } };

export const TruncateStory: Story = () => (
  <>
    <Box height={80} width={350} backgroundColor="yellow">
      <Typography truncate>
        The is an example of using the truncate prop with a block element.
      </Typography>
    </Box>
    <Box height={80} width={350} backgroundColor="red">
      <Typography truncate variant="b" display="block">
        The is an example of using the truncate prop with an inline element.
        Changing the display type to be a block element allows it to actually
        truncate.
      </Typography>
    </Box>
    <Box height={80} width={350} backgroundColor="lightblue">
      <Typography truncate textOverflow="clip">
        The is an example of using the truncate prop with custom text-overflow.
      </Typography>
    </Box>
  </>
);
TruncateStory.storyName = "Truncate";
TruncateStory.parameters = { info: { disable: true } };

export const ScreenReaderOnlyStory: Story = () => (
  <>
    <Typography>
      This is regular text, that can be seen, but under it is visually hidden
      text. Check the source to see it or use a screen reader.
    </Typography>
    <Typography screenReaderOnly>
      This text is visually hidden and will only be read out by a screen reader.
    </Typography>
  </>
);
ScreenReaderOnlyStory.storyName = "Screen Reader Only";
ScreenReaderOnlyStory.parameters = { info: { disable: true } };

export const Lists: Story = () => (
  <>
    <Typography>Unordered List</Typography>
    <List>
      <ListItem>
        Milk <Typography variant="b">2L</Typography>{" "}
        <Typography variant="em">Skimmed</Typography>
      </ListItem>
      <ListItem>
        Bread <Typography variant="b">500g</Typography>
      </ListItem>
      <ListItem>
        Sugar <Typography variant="b">1Kg</Typography>
      </ListItem>
    </List>

    <Typography>Ordered List</Typography>
    <List as="ol">
      <ListItem>
        Milk <Typography variant="b">2L</Typography>{" "}
        <Typography variant="em">Skimmed</Typography>
      </ListItem>
      <ListItem>
        Bread <Typography variant="b">500g</Typography>
      </ListItem>
      <ListItem>
        Sugar <Typography variant="b">1Kg</Typography>
      </ListItem>
    </List>
  </>
);
Lists.storyName = "Lists";
Lists.parameters = { info: { disable: true } };

export const ListItemInheritance: Story = () => (
  <>
    <Typography>Default</Typography>
    <List>
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>

    <Typography>Big</Typography>
    <List variant="big">
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>

    <Typography>Small</Typography>
    <List variant="small">
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>

    <Typography>H1</Typography>
    <List variant="h1">
      <ListItem>item 1</ListItem>
      <ListItem>item 2</ListItem>
      <ListItem>item 3</ListItem>
    </List>
  </>
);
ListItemInheritance.storyName = "List Item Inheritance";
ListItemInheritance.parameters = { info: { disable: true } };
