import React, { useLayoutEffect, useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import AdaptiveSidebar from ".";
import Box from "../box";
import Button from "../button/__next__";
import Search from "../search";
import { Select, Option } from "../select";
import { Tile } from "../tile";
import Typography from "../typography";
import { Menu, MenuItem } from "../menu";
import GlobalHeader from "../global-header";

const lightGreyBackground: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  backgroundColor: "rgb(242, 245, 246)",
};

const meta: Meta<typeof AdaptiveSidebar> = {
  title: "Adaptive Sidebar/Test",
  component: AdaptiveSidebar,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export default meta;
type Story = StoryObj<typeof AdaptiveSidebar>;

export const ExampleImplementation: StoryObj = {
  render: () => {
    const [isHidden, setIsHidden] = useState(false);

    return (
      <Box height="calc(100vh - 40px)">
        <GlobalHeader>
          <Menu menuType="black" flex="1" flexDirection="row-reverse">
            <MenuItem onClick={() => setIsHidden(!isHidden)}>Help</MenuItem>
          </Menu>
        </GlobalHeader>
        <Box display="flex" flexDirection="row" mt="40px" height="100%">
          <Box width="100%">
            <Typography variant="h1">Main content</Typography>
          </Box>
          <AdaptiveSidebar open hidden={isHidden} variant="inverse">
            <Box display="flex" flexDirection="column" height="100%">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                m={2}
              >
                <Typography variant="h2" inverse>
                  Sidebar Title
                </Typography>
                <Button
                  onClick={() => setIsHidden(true)}
                  variantType="secondary"
                  inverse
                >
                  Hide
                </Button>
              </Box>
              <Box m={2} display="flex" flex="1 1 auto">
                <Tile p={2} height="100%">
                  <Box display="flex" flexDirection="column" width="100%">
                    <Typography variant="h3" mb={1}>
                      What are you looking for?
                    </Typography>
                    <Search value="" onChange={() => {}} />
                  </Box>
                </Tile>
              </Box>
            </Box>
          </AdaptiveSidebar>
        </Box>
      </Box>
    );
  },
  parameters: {
    chromatic: { viewports: [767, 1200] },
  },
};

export const WithDropdown: Story = {
  render: () => {
    // This is to ensure the select dropdown opens when the page loads
    const selectRef = React.useRef<HTMLInputElement>(null);
    useLayoutEffect(() => {
      selectRef.current?.focus();
    }, []);
    const [selected, setSelected] = useState("");
    const [selected2, setSelected2] = useState("");

    return (
      <>
        <Box width="50%" display="flex" flexDirection="column">
          <Typography variant="h1">Page content</Typography>
          <Select
            ref={selectRef}
            openOnFocus
            name="simple"
            id="simple"
            label="open dropdown and decrease screen size until sidebar changes to modal"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
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
        <AdaptiveSidebar open width="50%" p={2}>
          <Box px={2}>
            <Typography variant="h1">Sidebar content</Typography>
            <Select
              name="simple-2"
              id="simple-2"
              label="open to test that the input and dropdowns show when the adaptive sidebar is open & triggered"
              value={selected2}
              onChange={(e) => setSelected2(e.target.value)}
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
        </AdaptiveSidebar>
      </>
    );
  },
  parameters: {
    chromatic: { viewports: [767, 900] },
  },
  decorators: [
    (Story) => (
      <div style={lightGreyBackground}>
        <Story />
      </div>
    ),
  ],
};
