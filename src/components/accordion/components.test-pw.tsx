import React from "react";

import Box from "../box";
import { Checkbox } from "../checkbox";
import { Dl, Dt, Dd } from "../definition-list";
import SplitButton from "../split-button";
import Button from "../button/button.component";
import Link from "../link/link.component";

import { Accordion, AccordionProps } from ".";

const errorVal = "error";
const warningVal = "warning";
const infoVal = "info";

// stories for component testing
export const AccordionComponent = (props: Partial<AccordionProps>) => {
  return (
    <Accordion
      onChange={() => {}}
      subTitle="Sub Title"
      title="Title"
      width="100%"
      {...props}
    >
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

export const AccordionWithIcon = () => {
  const [errors] = React.useState({
    one: errorVal,
  });
  const [warnings] = React.useState({
    one: warningVal,
  });

  const [expanded, setExpanded] = React.useState({
    one: false,
  });

  return (
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
    >
      <Checkbox label="Add error" />
    </Accordion>
  );
};

export const AccordionWithError = () => {
  const [errors] = React.useState({
    one: errorVal,
    two: errorVal,
    three: errorVal,
  });

  return (
    <Box mt={2}>
      <Accordion title="Heading" error={errors.one}>
        <Box p={1}>
          <Checkbox label="Add error" error={!!errors.one} />
        </Box>
      </Accordion>
    </Box>
  );
};

export const AccordionWithWarning = () => {
  const [warnings] = React.useState({
    one: warningVal,
  });

  return (
    <Box mt={2}>
      <Accordion title="Heading" warning={warnings.one}>
        <Box p={1}>
          <Checkbox label="Add warning" warning={!!warnings.one} />
        </Box>
      </Accordion>
    </Box>
  );
};

export const AccordionWithInfo = () => {
  const [infos] = React.useState({
    one: infoVal,
  });

  return (
    <Box mt={2}>
      <Accordion title="Heading" info={infos.one}>
        <Box p={1}>
          <Checkbox label="Add info" info={!!infos.one} />
        </Box>
      </Accordion>
    </Box>
  );
};

export const DynamicContent = () => {
  const [contentCount, setContentCount] = React.useState(3);
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
      <Button data-element="add-content" onClick={() => modifyContentCount(1)}>
        Add content
      </Button>
      <Button
        data-element="remove-content"
        onClick={() => modifyContentCount(-1)}
        ml={2}
      >
        Remove content
      </Button>
      <Accordion title="Title" expanded>
        {Array.from(Array(contentCount).keys()).map((value) => (
          <div key={value}>Content</div>
        ))}
      </Accordion>
    </>
  );
};

// stories from storybook to import
export const AccordionDefault = (props: Partial<AccordionProps>) => {
  return (
    <Accordion title="Heading" {...props}>
      <div>Content</div>
      <div>Content</div>
      <div>Content</div>
    </Accordion>
  );
};

export const AccordionWithBoxAndDifferentPaddings = () => {
  return (
    <Box>
      <Accordion
        expanded
        disableContentPadding
        headerSpacing={{
          p: 2,
        }}
        title="Accordion controlled"
      >
        <Box p={2} pr="21px">
          <Box bg="gray">
            This is example content inside of the Box component with gray
            background
          </Box>
          <div>
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
          </div>
        </Box>
      </Accordion>
      <Accordion
        disableContentPadding
        headerSpacing={{
          p: 3,
        }}
        title="Accordion with a very long title Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in ornare neque. Maecenas pellentesque et erat tincidunt mollis.
                Etiam diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula. "
      >
        <Box p={3} pr="29px">
          <Box bg="gray">
            This is example content inside of the Box component with gray
            background
          </Box>
          <div>
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
          </div>
        </Box>
      </Accordion>
    </Box>
  );
};

export const AccordionWithDefinitionList = () => {
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

export const AccordionWithSplit = () => {
  return (
    <Accordion expanded title="Accordion">
      <SplitButton text="Split Button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </SplitButton>
    </Accordion>
  );
};
