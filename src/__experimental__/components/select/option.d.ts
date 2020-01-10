import * as React from 'react';

export interface OptionProps {
  children?: React.ReactNode;
  text: string;
  value: string;
  options: object
}
declare const Option: React.ComponentType<OptionProps>;
export default Option;
