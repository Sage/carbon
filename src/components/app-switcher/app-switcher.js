import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Icon from 'components/icon';

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
     * Pseudo private class for the styles
     *
     * @method styles
     * @private
     * @return Hash
     */

  styles = () => {
    return {
      appItem: "carbon-switcher-app-item",
      menu: classNames((this.state.active ? "carbon-switcher-menu-active" : ""), "carbon-switcher-menu-title"),
      sectionTitle: "carbon-switcher-section-title",
      drawer: "carbon-switcher-drop-down",
      arrowUp: "carbon-switcher-arrow-up"
    };
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
     * Return each of the rendered application items
     *
     * @method createAppItems
     * @return JSX Elements
     */

  createAppItems = (section) => {
    return ( section.items.map((item,index) => {
      return (<a href = {item.href} key = {'index-' + index} className = {this.styles().appItem}>
                    {item.name}
                </a>);
    })
    );
  }

    /**
     * Return each of the rendered application sections
     *
     * @method createAppSections
     * @return JSX Elements
     */

  createAppSections = () => {
    let parsedJson = JSON.parse(this.props.applicationJson) || {};
    return parsedJson.items.map((section, index) => {
      let items = this.createAppItems(section);
      return (
                <div key={'index-' + index}>
                  <div className = {this.styles().sectionTitle} > {section.title} </div>
                  <div>{items}</div>
                </div>
      );
    });
  };

    /**
     * Return the rendered application drawer
     *
     * @method createAppDrawer
     * @return JSX Elements
     */

  createAppDrawer = () => {
    let sections = this.createAppSections();
    return (
            <div onClick={this.handleCloseWindow} className={this.styles().drawer}>
                {sections}
              <div className={this.styles().arrowUp} />
            </div>
    );
  }

    /**
     * The main render method
     *
     * @method render
     * @return JSX Elements
     */

  render() {
    let appDrawer = this.createAppDrawer();

    return (
            <span className={this.styles().menu} onClick={this.handleOpenWindow}>
              <Icon type='grid' />
              <span> {this.props.menuTitle} </span>
                { this.state.active ? appDrawer : null }
                </span>
    );
  }

}