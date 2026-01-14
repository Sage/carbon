import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { IconType } from "../../../../icon";

class MentionTypeaheadOption extends MenuOption {
  id: string;
  name: string;
  initials?: string;
  src?: string;
  iconType?: IconType;

  constructor(
    id: string,
    name: string,
    initials?: string,
    iconType?: IconType,
    src?: string,
  ) {
    super(id);

    this.id = id;
    this.name = name;
    this.src = src;
    this.iconType = iconType;
    this.initials = initials;
  }
}

export default MentionTypeaheadOption;
