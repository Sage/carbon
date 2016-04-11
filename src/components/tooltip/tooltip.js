import React from 'react';

/**
* A Tooltip widget.
*
* == How to use a Tooltip in a component:
*
* In your file:
*
*   import Tooltip from 'carbon/lib/components/tooltip'
*
* To render the Tooltip:
*
*   <Tooltip>
*     My tooltip content
*   </Tooltip>
*
* @class Tooltip
* @constructor
*/
class Tooltip extends React.Component {

  render() {
    return(
      <div className='ui-tooltip'>
          { this.props.children }
        <span className='ui-tooltip__pointer'>
        </span>
      </div>
    );
  }
}

export default Tooltip;
