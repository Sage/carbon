import { MenuOption } from "@lexical/react/LexicalTypeaheadMenuPlugin";

export class MentionTypeaheadOption extends MenuOption {
  id: string;

  name: string;

  picture: JSX.Element;

  constructor(id: string, name: string, picture: JSX.Element) {
    super(id);

    this.id = id;
    this.name = name;
    this.picture = picture;
  }
}

export default MentionTypeaheadOption;
