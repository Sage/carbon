import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class MountInApp extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node,

    /**
     * ID of the element in which the children components will be rendered.
     */
    targetId: PropTypes.string
  }

  componentDidMount() {
    if (this.targetElement) {
      ReactDOM.render(this.contentHtml, this.targetElement);
    }
  }

  componentWillUnmount() {
    this.targetElement.firstChild.remove();
  }

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

  render() {
    return null;
  }
}

export default MountInApp;
