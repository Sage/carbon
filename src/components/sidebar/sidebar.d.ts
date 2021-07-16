import * as React from "react";
import Modal, { ModalProps } from "../modal/modal";

export interface SidebarContextProps {
  isInSidebar: boolean;
}
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

declare const SidebarContext: React.Context<SidebarContextProps>;
declare class Sidebar extends Modal<SidebarProps> {}

export default Sidebar;
