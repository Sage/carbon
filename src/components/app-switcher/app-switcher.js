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
     * Compose each of the individual pieces from applicationJson
     *
     * @method composeDrawer
     * @return JSX Elements
     */

  compose = () => {
    let parsedJson = JSON.parse(this.props.applicationJson) || {};

    return parsedJson.items.map((section, index) => {
      let items = section.items.map((item,index) => {
        return (<DrawerItem href = {item.href} key = {'index-' + index} cname = {this.styles().appItem} name={item.name} /> );
      });

      return (
          <DrawerSection cname = {this.styles().sectionTitle} key={'index-' + index} items = {items} title={section.title}/>
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
    return (
            <span className={this.styles().menu} onClick={this.handleOpenWindow}>
              <Icon type='grid' />
              {this.props.menuTitle}
              { this.state.active ?
              <div onClick={this.handleCloseWindow} className={this.styles().drawer}>
                        {this.compose()}
                        <div className={this.styles().arrowUp} />
                     </div> : null }
                </span>
    );
  }

}

class DrawerSection extends React.Component {

  constructor(...props) {
    super(...props);
  }

  render() {
    return (
          <div>
            <div className = {this.props.cname} > {this.props.title} </div>
            <div>{this.props.items}</div>
          </div>
              );
  }
}

class DrawerItem extends React.Component {

  constructor(...props) {
    super(...props);
  }

  render() {  return ( <a href={this.props.href} className={this.props.cname}>
            {this.props.name}
              </a>);
  }
}