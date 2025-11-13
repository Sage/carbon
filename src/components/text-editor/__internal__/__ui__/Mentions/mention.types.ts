import { IconType } from "../../../../icon";

export type Mention = {
  /** The ID of the Mention entry */
  id: string;
  /** The name shown in the list */
  name: string;
  /** The initials to be shown in the Mention's avatar */
  initials?: string;
  /** The icon to be used in the Mention's avatar */
  iconType?: IconType;
  /** The source URL of the image to be shown in the Mention's avatar */
  src?: string;
};

export default Mention;
