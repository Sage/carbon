import React, { useState } from "react";
import Form, { FormProps } from ".";
import Button from "../button";
import Textbox from "../textbox";
import { Tab, Tabs } from "../tabs";
import Box from "../box";
import CarbonProvider from "../carbon-provider/carbon-provider.component";
import Textarea from "../textarea";
import Dialog from "../dialog";
import DateInput, { DateChangeEvent } from "../date";
import { Select, MultiSelect, Option } from "../select";
import DialogFullScreen from "../dialog-full-screen";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { Checkbox } from "../checkbox";
import Hr from "../../components/hr";
import Switch from "../switch";
import InlineInputs from "../inline-inputs";
import Typography from "../typography";
import Link from "../link";

export const FormComponent = (props: Partial<FormProps>) => {
  return (
    <Form
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      {...props}
    >
      <Textbox label="Textbox1" />
      <Textbox label="Textbox2" />
      <Textbox label="Textbox3" />
    </Form>
  );
};

export const FormWithLeftSidedButtons = () => (
  <Form
    leftSideButtons={
      <>
        <Button onClick={() => {}} ml={2}>
          Cancel
        </Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    buttonAlignment="left"
  >
    <Textbox label="Textbox" />
  </Form>
);

export const FormWithRightSidedButtons = () => (
  <Form
    rightSideButtons={
      <>
        <Button onClick={() => {}} ml={2}>
          Other
        </Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    buttonAlignment="right"
  >
    <Textbox label="Textbox" />
  </Form>
);

export const FormWithFullWidthButtons = (props: Partial<FormProps>) => (
  <Form
    saveButton={
      <Button buttonType="primary" type="submit" fullWidth>
        Submit
      </Button>
    }
    {...props}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithFooterChildren = (props: Partial<FormProps>) => {
  const footerNode = (
    <Box>
      <Typography>
        This is the footer text that will be added to provide information about
        the form content.
      </Typography>
      <Link icon="placeholder" href="#">
        This is a link
      </Link>
    </Box>
  );

  return (
    <Form {...props} footerChildren={footerNode}>
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
    </Form>
  );
};

export const DefaultWithStickyFooter = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
  >
    <Tabs mb={2}>
      <Tab
        pl="3px"
        customLayout={
          <Box mx="16px" my="10px">
            Tab1
          </Box>
        }
        tabId="tab1"
      />
    </Tabs>
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
  </Form>
);

export const StickyFooterVariant = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
    stickyFooterVariant="grey"
  >
    <Tabs mb={2}>
      <Tab
        pl="3px"
        customLayout={
          <Box mx="16px" my="10px">
            Tab1
          </Box>
        }
        tabId="tab1"
      />
    </Tabs>
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
  </Form>
);

export const WithFullWidthButtons = () => (
  <CarbonProvider validationRedesignOptIn>
    <Form
      fullWidthButtons
      onSubmit={() => "submit"}
      stickyFooter
      leftSideButtons={
        <Button mb={3} onClick={() => "cancel"} fullWidth>
          Cancel
        </Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit" fullWidth>
          Save
        </Button>
      }
      errorCount={3}
      warningCount={2}
    >
      <Tabs mb={2}>
        <Tab
          pl="3px"
          customLayout={
            <Box mx="16px" my="10px">
              Tab1
            </Box>
          }
          tabId="tab1"
        />
      </Tabs>
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
    </Form>
  </CarbonProvider>
);

export const WithErrorsSummary = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithWarningsSummary = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    warningCount={1}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithBothErrorsAndWarningsSummary = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={2}
    warningCount={2}
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithAdditionalButtons = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={
      <>
        <Button onClick={() => "cancel"}>Other</Button>
        <Button onClick={() => "cancel"} ml={2}>
          Cancel
        </Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button onClick={() => "cancel"}>Reset</Button>
        <Button onClick={() => "cancel"} ml={2}>
          Other
        </Button>
      </>
    }
  >
    <Textbox label="Textbox" />
  </Form>
);

export const WithButtonsAlignedToTheLeft = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={
      <>
        <Button onClick={() => "cancel"}>Other</Button>
        <Button onClick={() => "cancel"} ml={2}>
          Cancel
        </Button>
      </>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    rightSideButtons={
      <>
        <Button onClick={() => "cancel"}>Reset</Button>
        <Button onClick={() => "cancel"} ml={2}>
          Other
        </Button>
      </>
    }
    buttonAlignment="left"
  >
    <Textbox label="Textbox" />
  </Form>
);

export const InDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => "save"}>
              Submit
            </Button>
          }
        >
          <Textbox label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};

export const InDialogWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => "save"}>
              Submit
            </Button>
          }
          stickyFooter
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
            disablePortal
          />
          <Select
            name="simple-disabled-portal"
            id="simple-disabled-portal"
            label="Simple Select - disabled portal"
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect
            name="multi-disabled-portal"
            id="multi-disabled-portal"
            label="Multi Select - disabled portal"
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          <Select name="simple" id="simple" label="Simple Select">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          <MultiSelect name="multi" id="multi" label="Multi Select">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </MultiSelect>
          {Array.from({ length: 10 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
        </Form>
      </Dialog>
    </>
  );
};

export const InDialogFullScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
          <Form
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" onClick={() => "save"}>
                Submit
              </Button>
            }
          >
            <Textbox label="Textbox" />
          </Form>
        </Box>
      </DialogFullScreen>
    </>
  );
};

export const InDialogFullScreenWithStickyFooter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("04/04/2019");
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => "save"}>
              Submit
            </Button>
          }
          stickyFooter
        >
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
          <DateInput
            label="Date"
            name="dateinput"
            value={date}
            onChange={(ev: DateChangeEvent) =>
              setDate(ev.target.value.formattedValue)
            }
          />
          <Select name="simple" id="simple" label="label">
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Brown" value="4" />
            <Option text="Green" value="5" />
            <Option text="Orange" value="6" />
            <Option text="Pink" value="7" />
            <Option text="Purple" value="8" />
            <Option text="Red" value="9" />
            <Option text="White" value="10" />
            <Option text="Yellow" value="11" />
          </Select>
          {Array.from({ length: 15 }).map((_, index) => (
            <Textbox key={`textbox-${index + 1}`} label="Textbox" />
          ))}
        </Form>
      </DialogFullScreen>
    </>
  );
};

export const FormAlignmentExample = () => {
  const [date, setDate] = useState("04/04/2019");
  return (
    <Form
      onSubmit={() => "submit"}
      leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      fieldSpacing={4}
    >
      <Textbox
        key="input-one"
        label="Field 1"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        fieldHelp="This is some help text"
      />
      <Textbox
        key="input-two"
        label="Field 2"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        labelSpacing={2}
      />
      <RadioButtonGroup
        name="legend"
        onChange={() => "RADIO CHANGE"}
        legend="Legend"
        legendInline
        legendWidth={10}
        legendSpacing={2}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <DateInput
        name="date"
        label="Date picker"
        labelInline
        labelWidth={10}
        value={date}
        onChange={(ev: DateChangeEvent) =>
          setDate(ev.target.value.formattedValue)
        }
      />
      <RadioButtonGroup
        name="nolegend"
        onChange={() => "RADIO CHANGE"}
        legend="Legend above"
        ml="10%"
      >
        <RadioButton
          id="group-2-input-1"
          value="group-2-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-2-input-2"
          value="group-2-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Textarea
        key="input-three"
        label="Field 3"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
      <Checkbox
        name="checkbox1"
        onChange={() => "CHECKBOX 1"}
        label="Checkbox 1"
        ml="10%"
      />
      <Checkbox
        name="checkbox2"
        onChange={() => "CHECKBOX 2"}
        label="Checkbox 2"
        ml="10%"
      />
      <Hr ml="10%" mr="60%" mb={7} />
      <Button buttonType="tertiary" ml="calc(10% - 24px)">
        Tertiary
      </Button>
      <Textbox
        key="input-four"
        label="Field 4"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
      <Switch
        name="switch"
        label="Switch"
        labelInline
        onChange={() => "SWITCH"}
        labelWidth={10}
        labelSpacing={2}
        mb={4}
      />
      <Textbox
        key="input-five"
        label="Field 5"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
      />
    </Form>
  );
};

export const WithLabelsInline = () => (
  <Form
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox label="Textbox" labelInline labelWidth={30} />
    <InlineInputs
      label="Inline Inputs"
      gutter="none"
      labelWidth={30}
      labelId="inline-inputs"
    >
      <Textbox aria-labelledby="inline-inputs" />
      <Textbox aria-labelledby="inline-inputs" />
      <Select aria-labelledby="inline-inputs">
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="1" />
        <Option value="3" text="option 3" key="1" />
      </Select>
    </InlineInputs>
    <InlineInputs
      label="Inline Inputs with a gutter"
      gutter="large"
      labelWidth={30}
      labelId="inline-inputs-second"
    >
      <Textbox aria-labelledby="inline-inputs-second" />
      <Textbox aria-labelledby="inline-inputs-second" />
      <Select aria-labelledby="inline-inputs-second">
        <Option value="1" text="option 1" key="1" />
        <Option value="2" text="option 2" key="1" />
        <Option value="3" text="option 3" key="1" />
      </Select>
    </InlineInputs>
  </Form>
);

export const WithCustomFooterPadding = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="With custom footer padding"
      >
        <Form
          onSubmit={() => "submit"}
          leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
          stickyFooter
          footerPadding={{ px: 8 }}
        >
          <Textbox label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};
