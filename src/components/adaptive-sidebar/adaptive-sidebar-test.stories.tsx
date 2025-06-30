import React, { useLayoutEffect, useState } from "react";

import { StoryObj } from "@storybook/react/*";
import AdaptiveSidebar from ".";
import Box from "../box";
import Button from "../button";
import { Checkbox } from "../checkbox";
import DateInput, { DateChangeEvent } from "../date";
import Form from "../form";
import Hr from "../hr";
import Icon from "../icon";
import IconButton from "../icon-button";
import Search from "../search";
import { Select, Option } from "../select";
import Textbox from "../textbox";
import { Tile } from "../tile";
import Typography from "../typography";

import isChromatic from "../../../.storybook/isChromatic";

const defaultOpenState = isChromatic();

export default {
  title: "Adaptive Sidebar/Test",
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: "fullscreen",
    info: { disable: true },
  },
};

type StoryType = StoryObj<typeof AdaptiveSidebar>;

export const Default: StoryType = ({
  backgroundColor,
  childText,
  renderAsModal,
}: {
  backgroundColor: "white" | "black" | "app";
  childText: string;
  renderAsModal: boolean;
}) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const bodyText =
    "Praesent vulputate accumsan quam eget pellentesque. Sed condimentum, diam ut dapibus ornare, enim sem gravida dolor, vel molestie arcu nulla eget orci. Mauris vulputate in massa eu ornare. Aenean condimentum ligula a quam mattis, sit amet cursus augue consectetur. Mauris mollis tristique ex, vitae dapibus sapien bibendum at. Fusce blandit, tellus sit amet commodo vehicula, velit ipsum viverra urna, at feugiat magna ante non est. Nullam malesuada urna et varius rhoncus. Fusce ac blandit leo.";

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">{childText}</Typography>
      </Box>
      <AdaptiveSidebar
        backgroundColor={backgroundColor}
        open={adaptiveSidebarOpen}
        renderAsModal={renderAsModal}
        width="300px"
      >
        <Box p={2} display="flex" flexDirection="column">
          <Button onClick={() => setAdaptiveSidebarOpen(false)} mb={2}>
            Close
          </Button>
          {bodyText}
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};

Default.storyName = "Default";
Default.argTypes = {
  backgroundColor: {
    control: {
      type: "select",
    },
    options: ["app", "white", "black"],
  },
  renderAsModal: {
    control: "boolean",
    description: "Render as a modal",
  },
};

Default.args = {
  backgroundColor: "white",
  renderAsModal: false,
};

Default.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];

Default.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 900] },
  layout: "fullscreen",
  themeProvider: {
    chromatic: { theme: "sage" },
  },
};

export const WithForm: StoryObj = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const [date, setDate] = useState("01/06/2020");
  const selectOptions = [
    {
      id: "1",
      name: "Orange",
    },
    {
      id: "2",
      name: "Blue",
    },
    {
      id: "3",
      name: "Green",
    },
    {
      id: "4",
      name: "Black",
    },
    {
      id: "5",
      name: "Yellow",
    },
    {
      id: "6",
      name: "White",
    },
    {
      id: "7",
      name: "Magenta",
    },
    {
      id: "8",
      name: "Cyan",
    },
    {
      id: "9",
      name: "Red",
    },
    {
      id: "10",
      name: "Grey",
    },
    {
      id: "11",
      name: "Purple",
    },
  ];

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">
          This demonstrates using complex components within the adaptive sidebar
        </Typography>
      </Box>
      <AdaptiveSidebar open={adaptiveSidebarOpen} width="500px">
        <Form
          m={2}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
          leftSideButtons={
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          }
        >
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <DateInput
            name="date"
            label="Birthday"
            value={date}
            onChange={(e: DateChangeEvent) =>
              setDate(e.target.value.formattedValue)
            }
          />
          <Select label="Color">
            {selectOptions.map((option) => (
              <Option key={option.name} value={option} text={option.name} />
            ))}
          </Select>
          <Textbox label="Pet Name" />
          <DateInput
            name="date"
            label="Pet's birthday"
            value={date}
            onChange={(e: DateChangeEvent) =>
              setDate(e.target.value.formattedValue)
            }
          />
          <Checkbox name="checkbox" label="Do you like my Dog" />
          <div>This is an example of an adaptive with a Form as content</div>
        </Form>
      </AdaptiveSidebar>
    </Box>
  );
};

WithForm.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];

WithForm.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 900] },
  layout: "fullscreen",
  themeProvider: {
    chromatic: { theme: "sage" },
  },
};

export const ExampleImplementation: StoryObj = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row" id="wrapper" height="100vh">
      <Box id="content">
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>
      <AdaptiveSidebar
        open={adaptiveSidebarOpen}
        backgroundColor="black"
        width="768px"
        borderColor="var(--colorsUtilityYin050)"
      >
        <Box
          p={2}
          borderRadius="borderRadius200"
          m={2}
          backgroundColor="var(--colorsUtilityMajor025)"
          color="var(--colorsUtilityYin090)"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h2">Help and support</Typography>
            <Button
              buttonType="primary"
              onClick={() => setAdaptiveSidebarOpen(false)}
            >
              Hide
            </Button>
          </Box>
          <Hr my={1} />
          <Box display="flex" flexDirection="column">
            <Typography variant="h3" mt={2} mb={2}>
              Search
            </Typography>
            <Search
              placeholder="Enter a keyword or phrase"
              defaultValue=""
              searchButton
            />
            <Typography variant="h3" mt={2} mb={2}>
              Subjects
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <Tile variant="tile" orientation="horizontal" p={2}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography display="block" variant="strong" mb={0}>
                      Check your business details
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      justifyContent="space-between"
                    >
                      <Box display="flex" flexDirection="row" gap={1}>
                        <Icon type="download" />
                        <Typography color="var(--colorsGray750)" m={0}>
                          1 article
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton aria-label="icon-button" onClick={() => {}}>
                      <Icon type="chevron_right" />
                    </IconButton>
                  </Box>
                </Box>
              </Tile>

              <Tile variant="tile" orientation="horizontal" p={2}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography display="block" variant="strong" mb={0}>
                      Add or import customers and suppliers
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      justifyContent="space-between"
                    >
                      <Box display="flex" flexDirection="row" gap={1}>
                        <Icon type="download" />
                        <Typography color="var(--colorsGray750)" m={0}>
                          2 articles
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton aria-label="icon-button" onClick={() => {}}>
                      <Icon type="chevron_right" />
                    </IconButton>
                  </Box>
                </Box>
              </Tile>

              <Tile variant="tile" orientation="horizontal" p={2}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography display="block" variant="strong" mb={0}>
                      Work with bank accounts
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      justifyContent="space-between"
                    >
                      <Box display="flex" flexDirection="row" gap={1}>
                        <Icon type="download" />
                        <Typography color="var(--colorsGray750)" m={0}>
                          6 articles
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton aria-label="icon-button" onClick={() => {}}>
                      <Icon type="chevron_right" />
                    </IconButton>
                  </Box>
                </Box>
              </Tile>

              <Tile variant="tile" orientation="horizontal" p={2}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                  width="100%"
                >
                  <Box display="flex" flexDirection="column" gap={1}>
                    <Typography display="block" variant="strong" mb={0}>
                      Record sales or purchases
                    </Typography>
                    <Box
                      display="flex"
                      flexDirection="row"
                      gap={1}
                      justifyContent="space-between"
                    >
                      <Box display="flex" flexDirection="row" gap={1}>
                        <Icon type="download" />
                        <Typography color="var(--colorsGray750)" m={0}>
                          5 articles
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton aria-label="icon-button" onClick={() => {}}>
                      <Icon type="chevron_right" />
                    </IconButton>
                  </Box>
                </Box>
              </Tile>
            </Box>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};

ExampleImplementation.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];

ExampleImplementation.parameters = {
  chromatic: { disableSnapshot: false, viewports: [1200, 900] },
  layout: "fullscreen",
  themeProvider: {
    chromatic: { theme: "sage" },
  },
};

export const WithDropdown: StoryObj = () => {
  // This is to ensure the select dropdown opens when the page loads
  const selectRef = React.useRef<HTMLInputElement>(null);
  useLayoutEffect(() => {
    selectRef.current?.focus();
  }, []);

  return (
    <Box margin="var(--spacing200)" display="flex" flexDirection="row">
      <Box width="50%" display="flex" flexDirection="column">
        <Typography variant="h1">Page content</Typography>
        <Select
          ref={selectRef}
          openOnFocus
          name="simple"
          id="simple"
          label="open dropdown and decrease screen size until sidebar changes to modal"
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
      </Box>
      <AdaptiveSidebar open width="50%">
        <Typography variant="h1">Sidebar content</Typography>
        <Select
          name="simple-2"
          id="simple-2"
          label="open to test that the input and dropdowns show when the adaptive sidebar is open & triggered"
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
      </AdaptiveSidebar>
    </Box>
  );
};

WithDropdown.decorators = [
  (Story) => (
    <Box height="100vh" width="100vw">
      <Story />
    </Box>
  ),
];

WithDropdown.parameters = {
  chromatic: { disableSnapshot: false, viewports: [767, 900] },
  layout: "fullscreen",
  themeProvider: {
    chromatic: { theme: "sage" },
  },
};
