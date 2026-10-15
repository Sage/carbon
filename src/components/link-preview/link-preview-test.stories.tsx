import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import carbonLogo from "../../../logo/carbon-logo.png";
import carbonSageLogo from "../../../.assets/carbon-by-sage-logo.png";
import LinkPreview from ".";
import Box from "../box";

const meta: Meta<typeof LinkPreview> = {
  title: "Link Preview/Test",
  component: LinkPreview,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};
export default meta;
type Story = StoryObj<typeof LinkPreview>;

export const Chromatic: Story = {
  render: (args) => (
    <Box display="flex" flexDirection="column" gap={2}>
      <LinkPreview {...args} size="small" title="Small" />
      <LinkPreview {...args} size="medium" title="Medium" />
      <LinkPreview {...args} size="large" title="Large" />

      <LinkPreview
        {...args}
        size="small"
        title="Small"
        onClose={() => {}}
        as="div"
      />
      <LinkPreview
        {...args}
        size="medium"
        title="Medium"
        onClose={() => {}}
        as="div"
      />
      <LinkPreview
        {...args}
        size="large"
        title="Large"
        onClose={() => {}}
        as="div"
      />

      <LinkPreview {...args} size="small" isLoading />
      <LinkPreview {...args} size="medium" isLoading />
      <LinkPreview {...args} size="large" isLoading />

      <LinkPreview {...args} url="" />

      <LinkPreview {...args} image={{ url: carbonLogo }} />
      <LinkPreview {...args} image={{ url: carbonSageLogo }} />

      <LinkPreview
        {...args}
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid dolor dolores, dolorum facere suscipit veniam magni harum quidem repellendus laboriosam fugiat ab facilis voluptatem ipsum rerum? Nisi, odio accusamus!"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tempora."
        url="lorem-ipsum-dolor-sit-amet-consectetur-adipisicing-elit-Atque-tempora.com"
      />
      <LinkPreview
        {...args}
        title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aliquid dolor dolores, dolorum facere suscipit veniam magni harum quidem repellendus laboriosam fugiat ab facilis voluptatem ipsum rerum? Nisi, odio accusamus!"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, tempora."
        onClose={() => {}}
        as="div"
      />
    </Box>
  ),
  args: {
    title: "Title",
    url: "https://carbon.sage.com",
    description: "Description",
  },
};
