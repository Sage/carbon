import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Can be used to integrate React components into
 * pre-existing user interfaces.
 *
 * == How to use a MountInApp component:
 *
 * Import the component:
 *
 *   import MountInApp from 'carbon/lib/components/mount-in-app';
 *
 * Imagine that your pre-existing user interface has
 * a <div id="put_carbon_component_here" /> inside
 * which you want to put your new React component.
 *
 * To do that create a new React component that renders:
 *
 *   <MountInApp targetId="put_carbon_component_here">
 *     <div>Hello</div>
 *     <div>I'm a react component rendered in an existing UI</div>
 *   </MountInApp>
 *
 */
class MountInApp extends React.Component {

  static propTypes = {
    // the ID of the element in which the children components will be rendered.
    targetId: React.PropTypes.string
  };

  get contentHtml() {
    return (
      <div className='carbon-mount-in-app'>
        { this.props.children }
      </div>
    );
  }

  get targetElement() {
    return document.getElementById(this.props.targetId);
  }

  componentDidMount() {
    if (this.targetElement) {
      ReactDOM.render(this.contentHtml, this.targetElement);
    }
  }

  render() {
    return null;
  }

}

export default MountInApp;

