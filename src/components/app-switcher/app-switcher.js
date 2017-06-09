import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Renders an application drawers that can be used to switch programs
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
     * Return the classes for the styles
     *
     * @method styles
     * @return Hash
     */

  get styles() {
    const prefix = 'react-switcher-';
    return {
      appItem: prefix + "app-item",
      menu: classNames((this.state.active ? prefix + "menu-active" : ""), prefix + "menu-title"),
      sectionTitle: prefix + "section-title",
      drawer: prefix + "drawer",
      arrowUp: prefix + "arrow-up",
      symbol: prefix + "symbol"
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
      active: false,
      applications: {}
    };
  }

    /**
     * A lifecycle method that is called after the initial render.
     *
     * @method componentDidMount
     * @return {Void}
     */

  componentDidMount() {
    this.setState({applications: JSON.parse(this.props.applicationJson)});
  }

    /**
     * A SVG dice icon 16 x 16
     *
     * @method SVGIcon
     * @return JSX Elements
     */

  SVGIcon = () => {
    return (<svg className= {this.styles.symbol} viewBox="0 0 16 16" >
          <g>
            <rect  x="0" y="0" width="4" height="4" rx="1"></rect>
            <rect  x="6" y="0" width="4" height="4" rx="1"></rect>
            <rect  x="12" y="0" width="4" height="4" rx="1"></rect>
            <rect  x="0" y="6" width="4" height="4" rx="1"></rect>
            <rect  x="6" y="6" width="4" height="4" rx="1"></rect>
            <rect  x="12" y="6" width="4" height="4" rx="1"></rect>
            <rect  x="0" y="12" width="4" height="4" rx="1"></rect>
            <rect  x="6" y="12" width="4" height="4" rx="1"></rect>
            <rect  x="12" y="12" width="4" height="4" rx="1"></rect>
          </g>
        </svg>);
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
      return (<a href = {item.href} key = {'index-' + index} className = {this.styles.appItem}>
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
    let applicationSections = this.state.applications.items || [];
    return applicationSections.map((section, index) => {
      let items = this.createAppItems(section);
      return (
                <div key={'index-' + index}>
                  <div className = {this.styles.sectionTitle} > {section.title} </div>
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
            <div onClick={this.handleCloseWindow} className={this.styles.drawer}>
                {sections}
              <div className={this.styles.arrowUp} />
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
    let SVGIcon = this.SVGIcon();
    let appDrawer = this.createAppDrawer();

    return (
            <span className={this.styles.menu} onClick={this.handleOpenWindow}>
                {SVGIcon}
              <span> Accounting </span>
                { this.state.active ? appDrawer : null }
                </span>
    );
  }

}