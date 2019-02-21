import * as React from 'react';
import { ColorTypes } from '../../utils/helpers/options-helper/option-helper';

export interface FlashProps {
  className?: string;
  /** Sets the theme of the notification */

  as?: ColorTypes;
  /** A callback for when the notification is dismissed. You can use this prop to close the notification */
  onDismiss?: (...args: any[]) => any;

  /**
   * The message provided to the flash component. This can be built in multiple formats e.g.
   * A string: 'Alert' Array: ['Alert One', 'Alert Two']
   * An object with description:
   *   { description: 'Alert' }
   * An object with key/value pair:
   *   { first_name: 'is required', last_name: 'is required' }
   * An object with description & nested key/value pairs:
   *   { description: { first_name: 'is required', last_name: 'is required' } }
   */
  message?: string | string[] | { description: string } | object;

  /** A boolean to control the open/closed state of the notification */
  open?: boolean;

  /**
   * Sets the time in Milliseconds the flash remains on the screen. After the timeout it will call the onDimiss
   * callback. This will remove the close icon when set.
   */
  timeout?: number;
}

/**
 * A Flash widget.
 *
 * The flash is rendered in two sections: a ventral message 'flash', and a dorsal coloured, expanding 'slider'.
 */
declare const Flash: React.Component<FlashProps, {}>;
export default Flash;
