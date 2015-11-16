import React from 'react';

/**
 * A Pod widget.
 *
 *  This widget is a provides a wrapper in which to render other widgets.
 *
 * == How to use a Pod in a component:
 *
 * In your file
 *
 *  import Textarea from 'carbon/lib/components/pod';
 *
 *  In the render method:
 *
 *    <Pod />
 *
 * @class Pod
 * @constructor
 **/
class Pod extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className="ui-pod">
        { this.props.children }
      </div>
    );
  }

}

export default Pod;
