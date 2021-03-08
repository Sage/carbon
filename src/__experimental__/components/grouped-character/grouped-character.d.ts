import * as React from "react";
import { TextboxProps } from "../textbox";

export interface GroupedCharacterProps extends TextboxProps {
  /** Default input value if component is meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** pattern by which input value should be grouped */
  groups?: number[];
  /** Handler for blur event */
  onBlur?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for change event if input is meant to be used as a controlled component */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** character to be used as separator - has to be a 1 character string */
  separator?: string;
  /** Input value if component is meant to be used as a controlled component */
  value?: string;
}

declare const GroupedCharacter: React.FunctionComponent<GroupedCharacterProps>;

export default GroupedCharacter;
