import React from "react";
import GroupedCharacter, {
  CustomEvent,
  GroupedCharacterProps,
} from "./grouped-character.component";

export default ({
  onChange,
  groups,
  separator,
  ...props
}: Partial<GroupedCharacterProps>) => {
  const [state, setState] = React.useState("");

  const setValue = (event: CustomEvent) => {
    setState(event.target.value.rawValue);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <GroupedCharacter
      label="GroupedCharacter"
      value={state}
      onChange={setValue}
      groups={groups || [2, 2, 3]}
      separator={separator || "-"}
      {...props}
    />
  );
};
