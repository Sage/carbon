import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import styled from "styled-components";
import Box from "../box";
import Divider from "./divider.component";
import Typography from "../typography";

const meta: Meta<typeof Divider> = {
  title: "Divider/Test",
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

interface SquareProps {
  size?: string;
}

const Square = styled.div<SquareProps>`
  height: ${({ size }) => size || "56px"};
  width: ${({ size }) => size || "56px"};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const AllChromaticScenarios: Story = () => {
  return (
    <Box display="flex" flexDirection="column" gap={6} p={4}>
      <Box>
        <Typography mb={2}>Default</Typography>
        <Box display="inline-flex">
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
        </Box>
        <Divider type="horizontal" />
      </Box>

      <Box>
        <Typography mb={2}>Variants</Typography>
        <Box display="inline-flex" mb={3}>
          <Square />
          <Divider variant="typical" />
          <Square />
          <Divider variant="prominent" />
          <Square />
        </Box>
        <Divider type="horizontal" variant="prominent" />
      </Box>

      <Box>
        <Typography mb={2}>Inverse</Typography>
        <Box bg="#000000" p={4}>
          <Box display="inline-flex" mb={3}>
            <Square />
            <Divider variant="typical" inverse />
            <Square />
            <Divider variant="prominent" inverse />
            <Square />
          </Box>
          <Divider type="horizontal" inverse />
          <Divider type="horizontal" variant="prominent" inverse />
        </Box>
      </Box>

      <Box>
        <Typography mb={2}>Height</Typography>
        <Box display="inline-flex" alignItems="flex-start">
          <Box>
            <Square />
            <Divider h="100px" pt={1} pb={1} />
            <Square />
          </Box>
          <Divider pl={3} pr={3} h={215} />
          <Box>
            <Square />
            <Divider h="100px" pt={5} pb={5} />
            <Square />
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography mb={2}>Display Inline</Typography>
        <Box>
          Eggs
          <Divider displayInline />
          Flour
          <Divider displayInline />
          Milk
        </Box>
      </Box>
    </Box>
  );
};

AllChromaticScenarios.storyName = "All Chromatic Scenarios";
