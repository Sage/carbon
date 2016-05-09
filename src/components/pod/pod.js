import css from './../../utils/css';
import React from 'react';
import Icon from './../icon';
import classNames from 'classnames';

/**
 * A Pod widget.
 *
 * This widget is a provides a wrapper in which to render other widgets.
 *
 * == How to use a Pod in a component:
 *
 * In your file:
 *
 *   import Pod from 'carbon/lib/components/pod';
 *
 * In the render the Pod:
 *
 *   <Pod />
 *
 * @class Pod
 * @constructor
 */
class Pod extends React.Component {

  static propTypes = {

    /**
     * Enables/disables the border around the pod.
     *
     * @property border
     * @type {Boolean}
     * @default true
     */
    border: React.PropTypes.bool,

    /**
     * Determines the padding around the pod.
     * Values: "none", "small", "medium" or "large".
     *
     * @property padding
     * @type {String}
     * @default medium
     */
    padding: React.PropTypes.string,

    /**
     * Applies a theme to the Pod.
     * Value: primary, secondary, tile
     *
     * @property as
     * @type {Boolean}
     * @default primary
     */
    as: React.PropTypes.string,

    /**
     * The collapsed state of the pod
     *
     * undefined - Pod is not collapsible
     * true - Pod is closed
     * false - Pod is open
     *
     * @property collapsed
     * @type {Boolean}
     */
    collapsed: React.PropTypes.bool,

    /**
     * Title for the pod h2 element
     * always shown
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string,

    /**
     * Description for the pod
     * Not shown if collapsed
     *
     * @property title
     * @type {String}
     */
    description: React.PropTypes.string,

    /**
     * A component to render as a Pod footer.
     *
     * @property footer
     * @type {String}
     */
    footer: React.PropTypes.object
  }

  static defaultProps = {
    border: true,
    as: "primary",
    padding: "medium"
  }

  /**
   * A lifecycle called immediatly before initial render
   * Sets the initial state of collasped
   *
   * @method componentWillMount
   */
  componentWillMount = () => {
    this.setState({ collapsed: this.props.collapsed });
  }

  /**
   * Returns HTML and text for the pod header.
   * Includes:
   *    Title
   *    Collapsible arrow if collapsible
   *
   * @method podHeader
   */
  get podHeader() {
    if (!this.props.title) { return; }
    let pod,
        headerProps = {};

    headerProps.className = `ui-pod__header ${css.unselectable}`;

    if (this.state.collapsed !== undefined) {
      pod = this.podCollapsible;
      headerProps.onClick = this.toggleCollapse;
      headerProps.className += " ui-pod__header--" + this.state.collapsed;
    }

    return (
      <div { ...headerProps }>
        <h2 className="ui-pod__title" >{ this.props.title }</h2>
        { pod }
      </div>
    );
  }

  /**
   * Returns HTML and text for the pod description.
   *
   * @method podDescription
   */
  get podDescription() {
    return (
        this.props.description ?
          <div className="ui-pod__description">{ this.props.description }</div> :
          null
    );
  }

  /**
   * Returns the collapsible icon.
   *
   * @method podCollapsible
   */
  get podCollapsible() {
    let className = 'ui-pod__arrow ui-pod__arrow--' + this.state.collapsed;

    return(
      <Icon type='dropdown' className={ className } />
    );
  }

  /**
   * Returns the pod description and children.
   *
   * @method podContent
   */
  get podContent() {
    return(
      <div className='ui-pod__collapsible-content'>
        { this.podDescription }
        <div className='ui-pod__content'>
          { this.props.children }
        </div>
      </div>
    );
  }

  /**
   * Toggles the opening and closing of the pod
   *
   * @method toggleCollapse
   */
  toggleCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  /**
   * Main Class getter
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    return classNames(
      'ui-pod',
      this.props.className,
      `ui-pod--${this.props.as}`, {
        'ui-pod--no-border': !this.props.border,
        'ui-pod--footer': this.props.footer
      }
    );
  }

  /**
   * Classes for the content.
   *
   * @method contentClasses
   * @return {String}
   */
  get contentClasses() {
    return classNames(
      'ui-pod__content',
      `ui-pod__content--${this.props.as}`,
      `ui-pod--padding-${this.props.padding}`, {
        'ui-pod__content--footer': this.props.footer,
        'ui-pod--no-border': !this.props.border
      }
    );
  }

  /**
   * Classes for the footer.
   *
   * @method footerClasses
   * @return {String}
   */
  get footerClasses() {
    return classNames(
      'ui-pod__footer',
      `ui-pod__footer--${this.props.as}`,
      `ui-pod--padding-${this.props.padding}`, {
        'ui-pod--no-border': !this.props.border
      }
    );
  }

  /**
   * Returns the footer component.
   *
   * @method footer
   * @return {String}
   */
  get footer() {
    if (!this.props.footer) { return null; }

    return (
      <div className={ this.footerClasses }>
        { this.props.footer }
      </div>
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let content;

    if (!this.state.collapsed) { content = this.podContent; }

    return (
      <div className={ this.mainClasses }>
        <div className={ this.contentClasses } >
          { this.podHeader }
          { content }
        </div>
        { this.footer }
      </div>
    );
  }
}

export default Pod;
