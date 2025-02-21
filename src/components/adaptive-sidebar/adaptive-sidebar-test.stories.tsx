import React, { useState } from "react";

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

export default {
  title: "Adaptive Sidebar/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Default = ({
  backgroundColor,
  childText,
  defaultState,
  renderAsModal,
}: {
  backgroundColor: "white" | "black" | "app";
  childText: string;
  defaultState: boolean;
  renderAsModal: boolean;
}) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(defaultState);
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
        <Box p={2}>{bodyText}</Box>
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
  childText: {
    control: "text",
    description: "The child text to render in the body",
  },
  defaultState: {
    control: "boolean",
    description: "The default state of the adaptive sidebar",
  },
  renderAsModal: {
    control: "boolean",
    description: "Render as a modal",
  },
  title: {
    control: "text",
    description: "The title text to render in the header",
  },
};

Default.args = {
  backgroundColor: "white",
  childText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent eu elit eget lacus fermentum porta at ut dui.",
  defaultState: false,
  renderAsModal: false,
};

export const WithForm = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);
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

export const ExampleImplementation = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] = useState(false);

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
            <Typography variant="segment-subheader" mt={2} mb={2}>
              Search
            </Typography>
            <Search
              placeholder="Enter a keyword or phrase"
              defaultValue=""
              searchButton
            />
            <Typography variant="segment-subheader" mt={2} mb={2}>
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
                        <Typography color="lightgray" m={0}>
                          1 articles
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
                        <Typography color="lightgray" m={0}>
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
                        <Typography color="lightgray" m={0}>
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
                        <Typography color="lightgray" m={0}>
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
