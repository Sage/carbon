import React from 'react';
import { Link } from 'react-router';

class Chrome extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="ui-demo">
        <div className="ui-demo__header">
          <div className="ui-demo__header-contents">
            <div className="ui-demo__menu">
              <Link to="/">Carbon</Link>
              <Link to="/actions">Actions/Navigation</Link>
              <Link to="/forms">Forms</Link>
              <Link to="/grids">Grids</Link>
              <Link to="/charts">Charts</Link>
              <Link to="/notifications">Notifications</Link>
              <Link to="/modals">Modals</Link>
              <Link to="/layout">Layout</Link>
              <Link to="/design">Design</Link>
              <Link to="/misc">Misc</Link>
            </div>
          </div>
        </div>

        <div className="ui-demo__content">
          { this.props.children }
        </div>
        <div className='ui-demo__footer'>
        </div>
      </div>
    );
  }
}

export default Chrome;
