/* eslint-disable no-console */
import { Meta, StoryObj } from "@storybook/react";
import React, { useMemo, useState } from "react";
import { allModes } from "../../../.storybook/modes";
import isChromatic from "../../../.storybook/isChromatic";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import AdaptiveSidebar from ".";
import Box from "../box";
import GlobalHeader from "../global-header";
import { Select, Option } from "../select";
import Typography from "../typography";

import Button from "../button";
import Hr from "../hr";
import { Menu, MenuItem } from "../menu";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
  padding: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof AdaptiveSidebar> = {
  title: "Adaptive Sidebar",
  component: AdaptiveSidebar,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      modes: {
        desktop: allModes.chromatic,
      },
    },
  },
  decorators: [
    (Story) => (
      <Box height="250px">
        <Story />
      </Box>
    ),
  ],
};

const CommonTemplate = (
  adaptiveSidebarOpen: boolean,
  setAdaptiveSidebarOpen: (v: boolean) => void,
) => {
  return (
    <Box>
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
  );
};

export default meta;
type Story = StoryObj<typeof AdaptiveSidebar>;

export const Basic: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
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
      <AdaptiveSidebar open={adaptiveSidebarOpen} width="300px">
        <Box p={2} display="flex" flexDirection="column">
          <Button onClick={() => setAdaptiveSidebarOpen(false)} mb={2}>
            Close
          </Button>
          Adaptive sidebar content
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
Basic.storyName = "Basic";

export const Default: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
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
      <AdaptiveSidebar open={adaptiveSidebarOpen} width="300px">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
        </Box>
        <Hr my={0} mx={1} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This is the main content of the adaptive sidebar
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
Default.storyName = "Default";

export const Complex: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <>
      <GlobalHeader aria-label="Global header component with basic menu">
        Example
        <Menu menuType="black" flex="1" flexDirection="row-reverse">
          <MenuItem
            onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          >
            Help
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <Box position="fixed" top="40px" display="flex" flexDirection="row">
        <Box display="inline-flex" flexDirection="row" height="100vh">
          <Box display="flex" flexDirection="column">
            <Typography variant="h1">Content</Typography>
            <Typography variant="h2">Sub-header</Typography>
            <Typography variant="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at
              odio ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu
              sapien tempus porta. Nullam sodales nisi ut orci efficitur, nec
              ullamcorper nunc pulvinar. Integer eleifend a augue ac accumsan.
              Fusce ultrices auctor aliquam. Sed eu metus sit amet est tempor
              ullamcorper. Praesent eu elit eget lacus fermentum porta at ut
              dui.
            </Typography>
          </Box>
          <AdaptiveSidebar open={adaptiveSidebarOpen} width="500px">
            <Box display="flex" flexDirection="column" pb={5}>
              <Button onClick={() => setAdaptiveSidebarOpen(false)} m={2}>
                Close
              </Button>
              <Typography variant="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                consequat facilisis sapien, vitae tempor nulla tempor cursus.
                Mauris et efficitur urna. Sed nibh metus, suscipit vitae maximus
                eu, consequat in nibh. Vivamus eu felis diam. Vestibulum est
                libero, rhoncus in neque ut, posuere faucibus nunc. Praesent
                porttitor sodales viverra. Curabitur ultricies varius mattis.
              </Typography>

              <Typography variant="p">
                Duis varius rutrum risus, ac tincidunt dui tristique in. Nulla
                et iaculis massa. Suspendisse finibus eleifend sodales. Nulla
                facilisi. Nunc eleifend risus lorem, ac dignissim libero
                venenatis non. Sed tristique nunc vel arcu pharetra, sit amet
                tincidunt leo dictum. Nam et mi in quam consectetur pretium.
                Curabitur id tempus massa, eget lacinia nisi. Nullam quis urna
                ac ante interdum scelerisque. Integer pretium cursus orci nec
                malesuada. Aenean nec est in diam suscipit bibendum. Proin
                viverra justo nec nulla laoreet, sit amet aliquam massa dictum.
                Nam ac mauris ac elit commodo convallis. Sed in tortor lobortis
                mi rhoncus congue a ut dolor. Etiam faucibus a nisl et
                convallis.
              </Typography>

              <Typography variant="p">
                Ut interdum vel nulla vel posuere. Nullam a odio viverra, tempus
                lorem et, commodo justo. Ut eget massa molestie, fringilla ante
                et, sagittis lorem. Donec feugiat sodales dignissim. Ut auctor
                eget ante a interdum. Integer sem risus, bibendum sit amet
                porttitor a, ultricies non elit. Nam nunc quam, scelerisque non
                mauris vel, mollis rhoncus leo. Proin in ligula sapien.
              </Typography>

              <Typography variant="p">
                Quisque sed elementum nibh, sit amet imperdiet turpis. Duis
                fermentum lacus in aliquet auctor. Nam tortor mauris, elementum
                nec urna ut, sollicitudin congue felis. Nunc porta, tellus ac
                vestibulum malesuada, quam libero mollis augue, ac lobortis
                metus quam semper lacus. Orci varius natoque penatibus et magnis
                dis parturient montes, nascetur ridiculus mus. Sed erat odio,
                lacinia nec urna quis, elementum tristique nisi. Donec commodo
                lacinia tortor a sagittis.{" "}
              </Typography>
            </Box>
          </AdaptiveSidebar>
        </Box>
      </Box>
    </>
  );
};
Complex.storyName = "Complex";

export const WithCustomWidth: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar open={adaptiveSidebarOpen} width="70%">
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Hr my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
WithCustomWidth.storyName = "With Custom Width";

export const WithCustomHeight: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100%"
      backgroundColor="lightgray"
    >
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar open={adaptiveSidebarOpen} height="98vh">
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Hr my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
WithCustomHeight.storyName = "With Custom Height";

export const BackgroundVariants: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const [colour, setColour] = useState("white");

  const colours = useMemo(() => {
    switch (colour) {
      case "app":
        return {
          backgroundColor: "var(--colorsUtilityMajor025)",
          color: "var(--colorsUtilityYin090)",
        };
      case "black":
        return {
          backgroundColor: "var(--colorsUtilityYin100)",
          color: "var(--colorsUtilityYang100)",
        };
      case "white":
      default:
        return {
          backgroundColor: "var(--colorsUtilityYang100)",
          color: "var(--colorsUtilityYin090)",
        };
    }
  }, [colour]);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
        <Box display="flex" flexDirection="row" gap={4}>
          <Box width="300px">
            <Select
              name="color"
              id="color"
              label="Background Color"
              labelInline
              onChange={(e) => setColour(e.target.value)}
              value={colour}
            >
              {[
                { label: "App", value: "app" },
                { label: "Black", value: "black" },
                { label: "White", value: "white" },
              ].map(({ label, value }) => (
                <Option text={label} key={value} value={value} />
              ))}
            </Select>
          </Box>
          <Button
            onClick={() => {
              setAdaptiveSidebarOpen(!adaptiveSidebarOpen);
            }}
            mb={2}
          >
            Toggle Sidebar
          </Button>
        </Box>
        <Typography variant="p" mt={2}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at odio
          ultricies, luctus dolor at, fringilla elit. Nulla non nunc eu sapien
          tempus porta. Nullam sodales nisi ut orci efficitur, nec ullamcorper
          nunc pulvinar. Integer eleifend a augue ac accumsan. Fusce ultrices
          auctor aliquam. Sed eu metus sit amet est tempor ullamcorper. Praesent
          eu elit eget lacus fermentum porta at ut dui.
        </Typography>
      </Box>

      <AdaptiveSidebar
        backgroundColor={colour as "white" | "black" | "app"}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3" {...colours}>
              Content
            </Typography>
            <Button
              buttonType="primary"
              onClick={() => setAdaptiveSidebarOpen(false)}
            >
              Close
            </Button>
          </Box>
          <Hr my={0} />
          <Box display="flex" flexDirection="column">
            <Typography {...colours}>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
BackgroundVariants.storyName = "Background Variants";

export const WithAdaptiveBreakpoint: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar
        adaptiveBreakpoint={650}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Hr my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
WithAdaptiveBreakpoint.storyName = "With Adaptive Breakpoint";

export const RenderAsModal: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      {CommonTemplate(adaptiveSidebarOpen, setAdaptiveSidebarOpen)}

      <AdaptiveSidebar renderAsModal open={adaptiveSidebarOpen} width="300px">
        <Box display="flex" flexDirection="column" m={2}>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            p={1}
          >
            <Typography variant="h3">Content</Typography>
            <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
          </Box>
          <Hr my={0} />
          <Box display="flex" flexDirection="column">
            <Typography>
              This is the main content of the adaptive sidebar
            </Typography>
          </Box>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
RenderAsModal.storyName = "Render As Dialog";
RenderAsModal.decorators = [
  (RenderAsModalStory) => (
    <Box height="98vh">
      <RenderAsModalStory />
    </Box>
  ),
];

export const WithCustomBorderColor: Story = () => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);

  return (
    <Box display="flex" flexDirection="row">
      <Box>
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
        width="300px"
        borderColor="--colorsActionMajor500"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          p={1}
        >
          <Typography variant="h3">Content</Typography>
          <Button onClick={() => setAdaptiveSidebarOpen(false)}>Close</Button>
        </Box>
        <Hr my={0} mx={1} />
        <Box display="flex" flexDirection="column" p={1}>
          <Typography>
            This is the main content of the adaptive sidebar
          </Typography>
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};
WithCustomBorderColor.storyName = "With Custom Border Color";
