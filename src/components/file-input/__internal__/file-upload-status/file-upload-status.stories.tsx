import { Meta, StoryObj } from "@storybook/react-vite";
import FileUploadStatus from "./file-upload-status.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["!dev"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FileUploadStatus> = {
  title: "File Upload Status",
  component: FileUploadStatus,
  tags: ["!dev"],
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof FileUploadStatus>;

export const Default: Story = {
  args: {
    children: [],
  },
};
