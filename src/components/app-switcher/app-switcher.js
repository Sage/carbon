import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'components/icon';
import DrawerItem from './drawer-item';
import DrawerSection from './drawer-section';

/**
 * Renders an application (drawer) switcher
 * @class AppSwitcher
 */

export default class AppSwitcher extends React.Component {

  static propTypes = {
        /**
         * The json blob for the application links
         *
         * @property applicationJson
         * @type {String}
         * @default ''
         */
    applicationJson: PropTypes.string.isRequired,

        /**
         * The title of the menu item
         *
         * @property menuTitle
         * @type {String}
         * @default ''
         */
    menuTitle: PropTypes.string

  }


    /**
     * Constructor method setting properties
     *
     * @method constructor
     * @return {Void}
     */

  constructor(...props) {
    super(...props);

    this.state = {
      active: false
    };
  }

    /**
     * Handle when the user clicks on the main menu icon
     *
     * @method handleOpenWindow
     * @return {Void}
     */

  handleOpenWindow = () => {
    document.addEventListener('click', this.handleCloseWindow);
    this.setState({active: true});
  }

    /**
     * Handle when the user clicks anywhere on the screen after
     * the main menu is activated
     *
     * @method handleCloseWindow
     * @return {Void}
     */

  handleCloseWindow = () => {
    document.removeEventListener('click', this.handleCloseWindow);
    this.setState({active: false});
  }

    /**
     * Compose each of the individual pieces
     *
     * @method composeDrawer
     * @return JSX Elements
     */

  compose = () => {
    let parsedJson = JSON.parse(this.props.applicationJson) || {};

    return parsedJson.items.map((section, index) => {
      let items = section.items.map((item,index) => {
        return (
        <DrawerItem href = {item.href} key = {'index-' + index} name={item.name}/>);
      });

      return (
          <DrawerSection key={'index-' + index} title={section.title}>
              {items}
          </DrawerSection>
        );
    });

  };


    /**
     * The main render method
     *
     * @method render
     * @return JSX Elements
     */

  render() {
    let menu = classNames((this.state.active ? "carbon-switcher-menu-active" : ""), "carbon-switcher-menu-title");

    return (
            <span className={menu} onClick={this.handleOpenWindow}>
              <Icon type='grid' />
              {this.props.menuTitle}
              { this.state.active ?
              <div onClick={this.handleCloseWindow} className="carbon-switcher-drop-down">
                        {this.compose()}
                        <div className= "carbon-switcher-arrow-up" />
                     </div> : null }
                </span>
    );
  }

}
