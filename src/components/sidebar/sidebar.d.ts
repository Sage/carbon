import * as React from "react";
import { ModalProps } from "../modal/modal";

export interface SidebarProps extends ModalProps {
  /** Set this prop to false to hide the translucent background when the dialog is open. */
  enableBackgroundUI?: boolean;
  /** Node that will be used as sidebar header. */
  header?: React.ReactNode;
  /** Sets the position of sidebar, either left or right. */
  position?: string;
  /** Sets the size of the sidebar when open. */
  size?: string;
}

declare class Sidebar extends React.Component<SidebarProps> {}

export default Sidebar;
