import * as React from "react";

export interface GroupedCharacterProps {
  /** character to be used as separator - has to be a 1 character string */
  separator?: string;
  /** pattern by which input value should be grouped */
  groups?: any[];
  /** Input value if component is meant to be used as a controlled component */
  value?: string;
  /** Default input value if component is meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** on change handler which receives the event with object as a value containing rawValue and formattedValue */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** on blur handler which receives the event with object as a value containing rawValue and formattedValue */
  onBlur?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
}

declare const GroupedCharacter: React.FunctionComponent<GroupedCharacterProps>;

export default GroupedCharacter;
