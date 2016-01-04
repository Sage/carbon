import React from 'react';
import Dialog from '../dialog';
import Button from '../button';

/**
 * A Confirm widget.
 *
 * == How to use a Confirm in a component:
 *
 * In your file
 *
 *   import Confirm from 'carbon/lib/components/confirm';
 *
 * To render a Confirm:
 *
 *   <Confirm cancelHandler={ customEventHandler } open={ false }/>
 *
 * The component rendering the Confirm must pass down a prop of 'open' in order to open the confrim dialog.
 * 
 * You need to provide a custom cancel event handler to handle a close event via the 'no' button
 *
 * You need to provide a custom confirm event handler to handle a close event via the 'yes' button
 *
 * @class Confirm
 * @constructor
 */
class Confirm extends Dialog {

  static propTypes = {

    /**
     * A custom event handler when a confirmation takes place
     *
     * @property confirmHandler
     * @type {Function}
     */
    confirmHandler: React.PropTypes.func.isRequired
  }

  constructor() {
    super();
  }
  
  /**
   * Returns classes title for the confirm, combines with dialog class names.
   *
   * @method dialogTitleClasses
   */
  get dialogTitleClasses() {
    let classes = super.dialogTitleClasses;
    classes += ' ui-confirm__title';
    return classes;
  }

  /**
   * Returns classes for the confirm, combines with dialog class names.
   *
   * @method dialogClasses
   */
  get dialogClasses() {
    let classes = super.dialogClasses;
    classes += ' ui-confirm__confirm';
    return classes;
  }

  /**
   * Get the yes and no buttons for the confirm dialog
   *
   * @method confirmButtons
   * @return {Object} JSX yes and no buttons
   */
  get confirmButtons() {
    return (
      <div className='ui-confirm__buttons' >
        <div className='ui-confirm__button ui-confirm__no'>
          <Button as='secondary' onClick={ this.props.cancelHandler }>No</Button>
        </div>

        <div className='ui-confirm__button ui-confirm__yes'>
          <Button as='primary' onClick={ this.props.confirmHandler }>Yes</Button>
        </div>
      </div>
    );
  }

  /**
   * Returns HTML and text for the confirm body. Appends the two
   * confirm buttons to super dialogHTML
   *
   * @method dialogTitle
   */
  get dialogHTML() {
    let dialog = super.dialogHTML;
    dialog.props.children.push(this.confirmButtons);
    return dialog;
  }
}

export default Confirm;
