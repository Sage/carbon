import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import { Accordion, AccordionGroup } from ".";
import Box from "../box/box.component";
import Button from "../button/button.component";
import { Checkbox } from "../checkbox";
import { Dl, Dt, Dd } from "../definition-list";
import Link from "../link/link.component";
import Textbox from "../textbox/textbox.component";

const errorVal = "error";
const warningVal = "warning";
const infoVal = "info";

interface ValidationObject {
  one: string;
  two: string;
  three: string;
}

type Validations = keyof ValidationObject;

export const AccordionDefault: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const WithDisableContentPadding: ComponentStory<
  typeof Accordion
> = () => {
  return (
    <Accordion disableContentPadding title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const Transparent: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion scheme="transparent" title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const Small: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion size="small" title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const Subtitle: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion subTitle="Sub title" title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const Fullborder: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion borders="full" title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const LeftAlignedIcon: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion iconAlign="left" title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const DifferentWidth: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion width="500px" title="Heading">
      <Box>Content</Box>
      <Box>Content</Box>
      <Box>Content</Box>
    </Accordion>
  );
};

export const WithDifferentPaddingAndMargin: ComponentStory<
  typeof Accordion
> = () => {
  return (
    <>
      <Accordion m={0} p={0} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion m={1} p={1} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion m={2} p={2} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion m={3} p={3} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion m={4} p={4} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion m={5} p={5} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion m={6} p={6} title="Accordion">
        <Box>content</Box>
      </Accordion>
    </>
  );
};

export const WithDifferentPaddingAndMarginInAccordionTitle: ComponentStory<
  typeof Accordion
> = () => {
  return (
    <>
      <Accordion headerSpacing={{ p: 0 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 1 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 2 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 3 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 4 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 5 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
      <Accordion headerSpacing={{ p: 6 }} title="Accordion">
        <Box>content</Box>
      </Accordion>
    </>
  );
};

export const WithBoxComponentAndDifferentPaddings: ComponentStory<
  typeof Accordion
> = () => {
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

export const OpeningButton: ComponentStory<typeof Accordion> = () => {
  return (
    <Box m="8px">
      <Accordion
        title="More info"
        openTitle="Less info"
        scheme="transparent"
        borders="none"
        iconAlign="left"
        buttonHeading
        buttonWidth={200}
        error="hello"
      >
        <Box>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Accordion>
      <Accordion
        title="More info"
        openTitle="Less info"
        scheme="transparent"
        borders="none"
        iconAlign="right"
        buttonHeading
        buttonWidth={200}
      >
        <Box>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Accordion>
      <Accordion
        scheme="transparent"
        borders="none"
        title="More info"
        openTitle="Less info"
        buttonHeading
        headerSpacing={{ px: 0 }}
        buttonWidth={96}
      >
        <Box>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Accordion>
      <Accordion
        scheme="transparent"
        borders="none"
        title="More info"
        openTitle="Less info"
        iconAlign="left"
        buttonHeading
        buttonWidth={120}
        headerSpacing={{ px: 1 }}
      >
        <Box>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Accordion>
    </Box>
  );
};

export const Grouped: ComponentStory<typeof Accordion> = () => {
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

export const WithValidationIcon: ComponentStory<typeof Accordion> = () => {
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
    msg: string
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

export const WithDynamicContent: ComponentStory<typeof Accordion> = () => {
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
      <Accordion title="Title">
        {Array.from(Array(contentCount).keys()).map((value) => (
          <Box key={value}>Content</Box>
        ))}
      </Accordion>
    </>
  );
};

export const WithDefinitionList: ComponentStory<typeof Accordion> = () => {
  return (
    <Accordion title="Heading" expanded>
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
    </Accordion>
  );
};
