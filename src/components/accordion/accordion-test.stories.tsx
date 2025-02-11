import React, { useMemo, useState } from "react";
import { action } from "@storybook/addon-actions";
import { Accordion, AccordionGroup } from ".";
import Textbox from "../textbox";
import Box from "../box";
import MultiActionButton from "../multi-action-button";
import SplitButton from "../split-button";
import Button from "../button/button.component";

import { Dl, Dt, Dd } from "../definition-list";
import Link from "../link/link.component";
import { Checkbox } from "../checkbox";

export default {
  title: "Accordion/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    iconAlign: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    iconType: {
      options: ["chevron_down", "chevron_down_thick", "dropdown"],
      control: {
        type: "select",
      },
    },
    borders: {
      options: ["default", "full"],
      control: {
        type: "select",
      },
    },
    size: {
      options: ["large", "small"],
      control: {
        type: "select",
      },
    },
    variant: {
      options: ["standard", "subtle"],
      control: {
        type: "select",
      },
    },
    disableContentPadding: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const Default = ({ ...args }) => (
  <Accordion
    onChange={action("expansionToggled")}
    {...{
      customPadding: 0,
      title: "Title",
      subTitle: "Sub Title",
      width: "100%",
      ...args,
    }}
  >
    <Box mt={2}>Content</Box>
    <Box>Content</Box>
    <Box>Content</Box>
  </Accordion>
);

Default.storyName = "default";

export const Grouped = ({ ...args }) => (
  <AccordionGroup>
    <Accordion
      title="First Accordion"
      onChange={action("expansionToggled")}
      {...args}
    >
      <Box p={2}>
        <Textbox label="Textbox in an Accordion" />
      </Box>
    </Accordion>
    <Accordion
      title="Second Accordion"
      onChange={action("expansionToggled")}
      {...args}
    >
      <Box p={2}>
        <Textbox label="Textbox in an Accordion" />
      </Box>
    </Accordion>
    <Accordion
      title="Third Accordion"
      onChange={action("expansionToggled")}
      {...args}
    >
      <Box p={2}>
        <Box mt={2}>Content</Box>
        <Box>Content</Box>
        <Box>Content</Box>
      </Box>
    </Accordion>
  </AccordionGroup>
);

Grouped.storyName = "grouped";

export const AccordionWithMultiAction = () => {
  return (
    <Accordion title="Accordion">
      <MultiActionButton text="Multi Action Button">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
        <Button>Button 4</Button>
        <Button>Button 5</Button>
      </MultiActionButton>
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

AccordionWithMultiAction.storyName =
  "Accordion with MultiAction and Split Button";

export const AccordionWithDefinitionList = () => {
  const [isOpen, setOpen] = useState<boolean>(true);
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
AccordionWithDefinitionList.storyName = "Accordion With Definition List";

export const AccordionWithValidations = () => {
  const [validationKey, setValidationKey] = useState<string>("error");
  const props = useMemo(() => {
    return {
      title: "Validation",
      [validationKey]: `${validationKey}`,
    };
  }, [validationKey]);

  return (
    <AccordionGroup>
      <Accordion {...props}>
        <Checkbox
          label="Error"
          error
          onChange={() => setValidationKey("error")}
          checked={validationKey === "error"}
          mb={2}
        />
        <Checkbox
          label="Warning"
          warning
          onChange={() => setValidationKey("warning")}
          checked={validationKey === "warning"}
          mb={2}
        />
        <Checkbox
          label="Info"
          info
          onChange={() => setValidationKey("info")}
          checked={validationKey === "info"}
          mb={2}
        />
      </Accordion>
    </AccordionGroup>
  );
};
AccordionWithValidations.storyName = "Accordion With Validation";
AccordionWithValidations.parameters = {
  chromatic: { disableSnapshot: false },
};

export const WithBoxComponentAndDifferentPaddings = () => {
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
