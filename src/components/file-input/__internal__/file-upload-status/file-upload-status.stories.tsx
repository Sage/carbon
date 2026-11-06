import { Meta, StoryObj } from "@storybook/react-vite";
import FileUploadStatus from "./file-upload-status.component";

/**
 * Generates the `uploadStatus` props table in file-input.mdx. Tagged `!dev`
 * so it does not appear in the sidebar.
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

export const Default: Story = {};
