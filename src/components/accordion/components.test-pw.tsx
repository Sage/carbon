import React from "react";

import Box from "../box";
import { Checkbox } from "../checkbox";
import { Dl, Dt, Dd } from "../definition-list";
import SplitButton from "../split-button";
import Textbox from "../textbox";
import Button from "../button/button.component";
import Link from "../link/link.component";

import { Accordion, AccordionGroup, AccordionProps } from ".";

const errorVal = "error";
const warningVal = "warning";
const infoVal = "info";

interface ValidationObject {
  one: string;
  two: string;
  three: string;
}

type Validations = keyof ValidationObject;

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
      >
        <Checkbox label="Add error" />
      </Accordion>
    </AccordionGroup>
  );
};

export const AccordionGroupWithError = () => {
  const [errors] = React.useState({
    one: errorVal,
    two: errorVal,
    three: errorVal,
  });

  return (
    <Box mt={2}>
      <AccordionGroup>
        <Accordion title="Heading" error={errors.one}>
          <Box p={1}>
            <Checkbox label="Add error" error={!!errors.one} />
          </Box>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export const AccordionGroupWithWarning = () => {
  const [warnings] = React.useState({
    one: warningVal,
  });

  return (
    <Box mt={2}>
      <AccordionGroup>
        <Accordion title="Heading" warning={warnings.one}>
          <Box p={1}>
            <Checkbox label="Add warning" warning={!!warnings.one} />
          </Box>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export const AccordionGroupWithInfo = () => {
  const [infos] = React.useState({
    one: infoVal,
  });

  return (
    <Box mt={2}>
      <AccordionGroup>
        <Accordion title="Heading" info={infos.one}>
          <Box p={1}>
            <Checkbox label="Add info" info={!!infos.one} />
          </Box>
        </Accordion>
      </AccordionGroup>
    </Box>
  );
};

export const AccordionGroupComponent = () => {
  return (
    <AccordionGroup>
      <Accordion title="First Accordion" onChange={() => {}} width="100%">
        <Box p={2}>
          <Textbox label="Textbox in an Accordion" />
        </Box>
      </Accordion>
      <Accordion title="Second Accordion" onChange={() => {}} width="100%">
        <Box p={2}>
          <Box height="100px" bg="primary" />
        </Box>
      </Accordion>
      <Accordion title="Third Accordion" onChange={() => {}} width="100%">
        <div>Content</div>
      </Accordion>
    </AccordionGroup>
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
      <Accordion title="Title" defaultExpanded>
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

export const AccordionGroupDefault = () => {
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
          <div>Content</div>
          <div>Content</div>
          <div>Content</div>
        </Box>
      </Accordion>
    </AccordionGroup>
  );
};

export const AccordionGroupValidation = () => {
  const [errors, setErrors] = React.useState({
    one: errorVal,
    two: errorVal,
    three: errorVal,
  });
  const [warnings, setWarnings] = React.useState({
    one: warningVal,
    two: warningVal,
    three: warningVal,
  });
  const [infos, setInfos] = React.useState({
    one: infoVal,
    two: infoVal,
    three: infoVal,
  });
  const [expanded, setExpanded] = React.useState({
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
    setter((previous: ValidationObject) => ({ ...previous, [id]: update }));
  };

  return (
    <Box>
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
          <Box p={1}>
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
          <Box p={1}>
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
          <Box p={1}>
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
