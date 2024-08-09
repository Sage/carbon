import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionGroup } from ".";
import Box from "../box/box.component";
import Button from "../button/button.component";
import { Checkbox } from "../checkbox";
import { Dl, Dt, Dd } from "../definition-list";
import Link from "../link/link.component";
import Textbox from "../textbox/textbox.component";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

const errorVal = "error";
const warningVal = "warning";
const infoVal = "info";

interface ValidationObject {
  one: string;
  two: string;
  three: string;
}
type Validations = keyof ValidationObject;

const styledSystemProps = generateStyledSystemProps({
  spacing: true,
});

const meta: Meta<typeof Accordion> = {
  title: "Accordion",
  component: Accordion,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const AccordionDefault: Story = () => {
  return (
    <Accordion title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
AccordionDefault.storyName = "Default";

export const WithDisableContentPadding: Story = () => {
  return (
    <Accordion disableContentPadding title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
WithDisableContentPadding.storyName = "With disableContentPadding prop";
WithDisableContentPadding.parameters = {
  chromatic: { disableSnapshot: false },
};

export const Transparent: Story = () => {
  return (
    <Accordion scheme="transparent" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Transparent.storyName = "Transparent";
Transparent.parameters = { chromatic: { disableSnapshot: false } };

export const Small: Story = () => {
  return (
    <Accordion size="small" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Small.storyName = "Small";

export const Subtitle: Story = () => {
  return (
    <Accordion subTitle="Sub title" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Subtitle.storyName = "Subtitle";

export const Fullborder: Story = () => {
  return (
    <Accordion borders="full" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
Fullborder.storyName = "Full Border";

export const LeftAlignedIcon: Story = () => {
  return (
    <Accordion iconAlign="left" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
LeftAlignedIcon.storyName = "Left Aligned Icon";

export const DifferentWidth: Story = () => {
  return (
    <Accordion width="500px" title="Heading">
      <Box mt={2}>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
DifferentWidth.storyName = "Different Width";

export const WithDifferentPaddingAndMargin: Story = () => {
  return (
    <>
      <Accordion m={0} p={0} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={1} p={1} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={2} p={2} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={3} p={3} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={4} p={4} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={5} p={5} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion m={6} p={6} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
};
WithDifferentPaddingAndMargin.storyName = "With Different Padding and Margin";

export const WithDifferentPaddingAndMarginInAccordionTitle: Story = () => {
  return (
    <>
      <Accordion headerSpacing={{ p: 0 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 1 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 2 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 3 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 4 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 5 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 6 }} title="Accordion">
        <Box mt={2}>content</Box>
      </Accordion>
    </>
  );
};
WithDifferentPaddingAndMarginInAccordionTitle.storyName =
  "With Different Padding and Margin in Accordion Title";

export const WithBoxComponentAndDifferentPaddings: Story = () => {
  const [isOpen, setOpen] = useState(true);
  return (
    <>
      <Accordion
        expanded={isOpen}
        onChange={() => {
          setOpen(!isOpen);
        }}
        disableContentPadding
        headerSpacing={{ p: 2 }}
        title="Accordion controlled"
      >
        <Box p={2} pr="21px">
          <Box bg="gray">
            This is example content inside of the Box component with gray
            background
          </Box>
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in
            ornare neque. Maecenas pellentesque et erat tincidunt mollis. Etiam
            diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula.
            Cras eget lorem aliquam lorem mollis fringilla a sit amet nisl.
            Donec semper odio elit, tempus ultrices est molestie id. Ut sit amet
            sollicitudin ipsum, eu tristique ligula. Praesent velit velit,
            finibus ut odio sit amet, fringilla iaculis lacus. Aliquam facilisis
            libero nec ipsum tincidunt imperdiet. Ut commodo mi ac odio blandit,
            ac molestie ante dapibus. Ut molestie auctor turpis, quis ultrices
            ante aliquet eu. Aenean et condimentum arcu, non malesuada elit.
            Cras a magna vestibulum, semper tortor id, molestie eros.
          </Box>
        </Box>
      </Accordion>
      <Accordion
        disableContentPadding
        headerSpacing={{ p: 3 }}
        title="Accordion with a very long title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in ornare neque. Maecenas pellentesque et erat tincidunt mollis. 
                Etiam diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula. "
      >
        <Box p={3} pr="29px">
          <Box bg="gray">
            This is example content inside of the Box component with gray
            background
          </Box>
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in
            ornare neque. Maecenas pellentesque et erat tincidunt mollis. Etiam
            diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula.
            Cras eget lorem aliquam lorem mollis fringilla a sit amet nisl.
            Donec semper odio elit, tempus ultrices est molestie id. Ut sit amet
            sollicitudin ipsum, eu tristique ligula. Praesent velit velit,
            finibus ut odio sit amet, fringilla iaculis lacus. Aliquam facilisis
            libero nec ipsum tincidunt imperdiet. Ut commodo mi ac odio blandit,
            ac molestie ante dapibus. Ut molestie auctor turpis, quis ultrices
            ante aliquet eu. Aenean et condimentum arcu, non malesuada elit.
            Cras a magna vestibulum, semper tortor id, molestie eros.
          </Box>
        </Box>
      </Accordion>
      <Accordion
        disableContentPadding
        headerSpacing={{ p: 4 }}
        title="Accordion"
      >
        <Box p={4} pr="37px">
          <Box bg="gray">
            This is example content inside of the Box component with gray
            background
          </Box>
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in
            ornare neque. Maecenas pellentesque et erat tincidunt mollis. Etiam
            diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula.
            Cras eget lorem aliquam lorem mollis fringilla a sit amet nisl.
            Donec semper odio elit, tempus ultrices est molestie id. Ut sit amet
            sollicitudin ipsum, eu tristique ligula. Praesent velit velit,
            finibus ut odio sit amet, fringilla iaculis lacus. Aliquam facilisis
            libero nec ipsum tincidunt imperdiet. Ut commodo mi ac odio blandit,
            ac molestie ante dapibus. Ut molestie auctor turpis, quis ultrices
            ante aliquet eu. Aenean et condimentum arcu, non malesuada elit.
            Cras a magna vestibulum, semper tortor id, molestie eros.
          </Box>
        </Box>
      </Accordion>
      <Accordion
        disableContentPadding
        headerSpacing={{ p: 5 }}
        title="Accordion"
      >
        <Box p={5} pr="45px">
          <Box bg="gray">
            This is example content inside of the Box component with gray
            background
          </Box>
          <Box>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in
            ornare neque. Maecenas pellentesque et erat tincidunt mollis. Etiam
            diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula.
            Cras eget lorem aliquam lorem mollis fringilla a sit amet nisl.
            Donec semper odio elit, tempus ultrices est molestie id. Ut sit amet
            sollicitudin ipsum, eu tristique ligula. Praesent velit velit,
            finibus ut odio sit amet, fringilla iaculis lacus. Aliquam facilisis
            libero nec ipsum tincidunt imperdiet. Ut commodo mi ac odio blandit,
            ac molestie ante dapibus. Ut molestie auctor turpis, quis ultrices
            ante aliquet eu. Aenean et condimentum arcu, non malesuada elit.
            Cras a magna vestibulum, semper tortor id, molestie eros.
          </Box>
        </Box>
      </Accordion>
    </>
  );
};
WithBoxComponentAndDifferentPaddings.storyName =
  "With Box Component and Different Padding";
WithBoxComponentAndDifferentPaddings.parameters = {
  chromatic: { disableSnapshot: false },
};

export const Grouped: Story = () => {
  return (
    <AccordionGroup>
      <Accordion title="First Accordion">
        <Box p={2}>
          <Textbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion title="Second Accordion">
        <Box p={2}>
          <Textbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion title="Third Accordion">
        <Box p={2}>
          <Box>Content</Box>
          <Box>Content</Box>
          <Box>Content</Box>
        </Box>
      </Accordion>
    </AccordionGroup>
  );
};
Grouped.storyName = "Grouped";

export const WithValidationIcon: Story = () => {
  const [errors, setErrors] = useState({
    one: errorVal,
    two: errorVal,
    three: errorVal,
  });
  const [warnings, setWarnings] = useState({
    one: warningVal,
    two: warningVal,
    three: warningVal,
  });
  const [infos, setInfos] = useState({
    one: infoVal,
    two: infoVal,
    three: infoVal,
  });
  const [expanded, setExpanded] = useState({
    one: false,
    two: false,
    three: true,
  });

  const handleChange = (
    id: Validations,
    type: ValidationObject,
    setter: React.Dispatch<React.SetStateAction<ValidationObject>>,
    msg: string,
  ) => {
    const update = type[id] ? undefined : msg;
    setter((previous) => ({ ...previous, [id]: update }));
  };
  return (
    <Box mt="16px">
      <AccordionGroup>
        <Accordion
          title="Heading"
          expanded={expanded.one}
          onChange={() =>
            setExpanded((previousState) => ({
              ...previousState,
              one: !previousState.one,
            }))
          }
          error={errors.one}
          warning={warnings.one}
          info={infos.one}
        >
          <Box p="8px">
            <Checkbox
              label="Add error"
              error={!!errors.one}
              onChange={() => handleChange("one", errors, setErrors, "error")}
              checked={!!errors.one}
            />
            <Checkbox
              label="Add warning"
              warning={!!warnings.one}
              onChange={() =>
                handleChange("one", warnings, setWarnings, "warning")
              }
            />
            <Checkbox
              label="Add info"
              info={!!infos.one}
              onChange={() => handleChange("one", infos, setInfos, "info")}
            />
          </Box>
        </Accordion>
        <Accordion
          title="Heading"
          expanded={expanded.two}
          onChange={() =>
            setExpanded((previousState) => ({
              ...previousState,
              two: !previousState.two,
            }))
          }
          subTitle="Sub title"
          error={errors.two}
          warning={warnings.two}
          info={infos.two}
        >
          <Box p="8px">
            <Checkbox
              label="Add error"
              error={!!errors.two}
              onChange={() => handleChange("two", errors, setErrors, "error")}
              checked={!!errors.two}
            />
            <Checkbox
              label="Add warning"
              warning={!!warnings.two}
              onChange={() =>
                handleChange("two", warnings, setWarnings, "warning")
              }
            />
            <Checkbox
              label="Add info"
              info={!!infos.two}
              onChange={() => handleChange("two", infos, setInfos, "info")}
            />
          </Box>
        </Accordion>
        <Accordion
          title="Heading"
          expanded={expanded.three}
          onChange={() =>
            setExpanded((previousState) => ({
              ...previousState,
              three: !previousState.three,
            }))
          }
          subTitle="This is a longer sub title"
          error={errors.three}
          warning={warnings.three}
          info={infos.three}
        >
          <Box p="8px">
            <Checkbox
              label="Add error"
              error={!!errors.three}
              onChange={() => handleChange("three", errors, setErrors, "error")}
              checked={!!errors.three}
            />
            <Checkbox
              label="Add warning"
              warning={!!warnings.three}
              onChange={() =>
                handleChange("three", warnings, setWarnings, "warning")
              }
            />
            <Checkbox
              label="Add info"
              info={!!infos.three}
              onChange={() => handleChange("three", infos, setInfos, "info")}
            />
          </Box>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};
WithValidationIcon.storyName = "With Validation Icon";

export const WithDynamicContent: Story = () => {
  const [contentCount, setContentCount] = useState(3);
  const modifyContentCount = (modifier: number) => {
    if (modifier === 1) {
      setContentCount(contentCount + 1);
    }
    if (modifier === -1 && contentCount > 0) {
      setContentCount(contentCount - 1);
    }
  };

  return (
    <>
      <Button onClick={() => modifyContentCount(1)}>Add content</Button>
      <Button onClick={() => modifyContentCount(-1)} ml={2}>
        Remove content
      </Button>
      <Accordion mt={2} title="Title">
        {Array.from(Array(contentCount).keys()).map((value) => (
          <Box key={value} mt={2}>
            Content
          </Box>
        ))}
      </Accordion>
    </>
  );
};
WithDynamicContent.storyName = "With dynamic content";

export const WithDefinitionList: Story = () => {
  const [isOpen, setOpen] = useState(true);
  return (
    <Accordion
      title="Heading"
      onChange={() => {
        setOpen(!isOpen);
      }}
      expanded={isOpen}
    >
      <Dl>
        <Dt>Drink</Dt>
        <Dd>Coffee</Dd>
        <Dt>Brew Method</Dt>
        <Dd>Stove Top Moka Pot</Dd>
        <Dt>Brand of Coffee</Dt>
        <Dd>Magic Coffee Beans</Dd>
        <Dt>Website</Dt>
        <Dd>
          <Link href="www.sage.com">Magic Coffee Beans Website</Link>
        </Dd>
        <Dt>Email</Dt>
        <Dd>
          <Link href="magic@coffeebeans.com">magic@coffeebeans.com</Link>
        </Dd>
        <Dt mb={0}>Main and Registered Address</Dt>
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
    </Accordion>
  );
};
WithDefinitionList.storyName = "With Definition List";
WithDefinitionList.parameters = { chromatic: { disableSnapshot: false } };

export const AccordionSubtle: Story = () => {
  return (
    <Accordion title="Heading" variant="subtle">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};
AccordionSubtle.storyName = "Subtle Variant";
