import * as React from 'react';

interface ValidationShape {
  message: () => any;
  validate: () => any;
}

type ValidationsPropType = () => any | (() => any | ValidationShape)[];

type ValuePropType = string | any[];

export interface WithValidationProps {
  children?: React.ReactNode;
  name: string;
  value?: string | any[];
  onBlur?: () => void;
  onChange?: () => void;
  validations?: ValidationsPropType;
  warnings?: ValidationsPropType;
  info?: ValidationsPropType;
  forceUpdateTriggerToggle?: boolean;
  addInputToFormState?: (name: string, value: ValuePropType) => void;
  unblockValidation?: boolean;
}

type ComponentPropType = React.ComponentClass | React.FunctionComponent;

declare function withValidation(C: ComponentPropType): React.ComponentClass<WithValidationProps>;

export default withValidation;
