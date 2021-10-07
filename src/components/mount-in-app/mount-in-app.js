import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Logger from "../../__internal__/utils/logger";

let deprecatedWarnTriggered = false;

class MountInApp extends React.Component {
  componentDidMount() {
    if (this.targetElement) {
      ReactDOM.render(this.contentHtml, this.targetElement);
    }

    if (!deprecatedWarnTriggered) {
      deprecatedWarnTriggered = true;
      Logger.deprecate(
        // eslint-disable-next-line max-len
        "The `MountInApp` component is deprecated and will soon be removed. We recommend using React Portals instead (https://reactjs.org/docs/portals.html)"
      );
    }
  }

  componentWillUnmount() {
    this.targetElement.removeChild(this.targetElement.firstChild);
  }

  get contentHtml() {
    return (
      <div data-component="mount-in-app" className="carbon-mount-in-app">
        {this.props.children}
      </div>
    );
  }

  get targetElement() {
    return document.getElementById(this.props.targetId);
  }

  render() {
    return null;
  }
}

MountInApp.propTypes = {
  /**
   * Children elements
   */
  children: PropTypes.node,

  /**
   * ID of the element in which the children components will be rendered.
   */
  targetId: PropTypes.string,
};

export default MountInApp;
