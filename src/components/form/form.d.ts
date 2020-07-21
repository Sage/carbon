
import * as React from 'react';
import { FormSpacingMultiplier } from '../../utils/helpers/options-helper/options-helper';

export interface FormProps {
 /** Alignment of buttons */
 buttonAlignment: 'left' | 'right';

 /** Enables the sticky footer. */
 stickyFooter?: boolean;

 /** Additional buttons rendered on the left side of the save button */
 leftSideButtons?: React.ReactNode;

 /** Additional buttons rendered on the right side of the save button */
 rightSideButtons?: React.ReactNode;

 /** Callback passed to the form element */
 onSubmit?: (event: React.FormEvent<HTMLFormElement>) => any;

 /** Child elements */
 children?: React.ReactNode;

 /** Save button to be rendered */
 saveButton?: React.ReactNode;

 /** The total number of errors present in the form */
 errorCount?: number;

 /** The total number of warnings present in the form */
 warningCount?: number;

 /** Multipler for vertical spacing between fields, times theme.spacing */
 fieldSpacingMultiplier?: FormSpacingMultiplier;
}

declare const Form: React.FunctionComponent<FormProps>;
export default Form;
