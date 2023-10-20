import { Meta, StoryObj } from "@storybook/react";
import FileUploadStatus from "./file-upload-status.component";

/**
 * This file is used primarily as a means to generate the props table.
 * It contains the tag: ["hideInSidebar"] so that it is not included in the sidebar.
 */

const meta: Meta<typeof FileUploadStatus> = {
  title: "File Upload Status",
  component: FileUploadStatus,
  tags: ["hideInSidebar"],
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
