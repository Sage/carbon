import css from './../../utils/css';
import React from 'react';
import Icon from './../icon';
import Link from './../link';
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
     * @type {String}
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
     * Title for the pod h4 element
     * always shown
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string,

    /**
     * Aligns the title to left, right or center
     *
     * @property alignTitle
     * @type {String}
     * @default left
     */
    alignTitle: React.PropTypes.string,

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
    footer: React.PropTypes.object,

    /**
     * Supplies an edit action to the pod.
     *
     * @property onEdit
     * @type {String|Function|Object}
     */
    onEdit: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.func,
      React.PropTypes.object
    ])
  }

  static defaultProps = {
    border: true,
    as: "primary",
    padding: "medium",
    alignTitle: 'left'
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

    let pod, subtitle, headerProps = {};

    if (this.state.collapsed !== undefined) {
      pod = this.podCollapsible;
      headerProps.onClick = this.toggleCollapse;
    }

    headerProps.className = this.headerClasses;

    if (this.props.subtitle) {
      subtitle = <h5 className="carbon-pod__subtitle" >{ this.props.subtitle }</h5>;
    }

    return (
      <div { ...headerProps }>
        <h4 className="carbon-pod__title" >{ this.props.title }</h4>
        { subtitle }
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
          <div className="carbon-pod__description">{ this.props.description }</div> :
          null
    );
  }

  /**
   * Returns the collapsible icon.
   *
   * @method podCollapsible
   */
  get podCollapsible() {
    let className = 'carbon-pod__arrow carbon-pod__arrow--' + this.state.collapsed;

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
      <div className='carbon-pod__collapsible-content'>
        { this.podDescription }
        <div className='carbon-pod__content'>
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
  }

  get mainClasses() {
    return classNames("carbon-pod", this.props.className, css.clearfix, {
      "carbon-pod--editable": this.props.onEdit
    });
  }

  /**
   * Main Class getter
   *
   * @method blockClasses
   * @return {String} Main className
   */
  get blockClasses() {
    return classNames(
      'carbon-pod__block',
      `carbon-pod__block--${this.props.as}`, {
        'carbon-pod__block--no-border': !this.props.border,
        'carbon-pod__block--footer': this.props.footer
      }
    );
  }

  /**
   * Header classes getter
   *
   * @method headerClasses
   * @return {String} header className
   */
  get headerClasses() {
    return classNames(
      `carbon-pod__header`,
      `carbon-pod__header--${ this.props.alignTitle }`,
      {
        [`carbon-pod__header--${ this.state.collapsed }`]: this.state.collapsed !== undefined
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
      'carbon-pod__content',
      `carbon-pod__content--${this.props.as}`,
      `carbon-pod__content--padding-${this.props.padding}`, {
        'carbon-pod__content--footer': this.props.footer,
        'carbon-pod--no-border': !this.props.border
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
      'carbon-pod__footer',
      `carbon-pod__footer--${this.props.as}`,
      `carbon-pod__footer--padding-${this.props.padding}`, {
        'carbon-pod--no-border': !this.props.border
      }
    );
  }

  /**
   * Classes for the edit action.
   *
   * @method editActionClasses
   * @return {String}
   */
  get editActionClasses() {
    return classNames(
      'carbon-pod__edit-action',
      `carbon-pod__edit-action--padding-${this.props.padding}`, {
        'carbon-pod__edit-action--no-border': !this.props.border
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
   * Returns the edit action if defined.
   *
   * @method edit
   * @return {Object} JSX
   */
  get edit() {
    if (!this.props.onEdit) { return null; }

    let props = {};

    if (typeof this.props.onEdit === "string") {
      props.to = this.props.onEdit;
    } else if (typeof this.props.onEdit === "object") {
      props = this.props.onEdit;
    } else {
      props.onClick = this.props.onEdit;
    }

    return (
      <Link icon="edit" className={ this.editActionClasses } { ...props } />
    );
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let content, { ...props } = this.props;

    delete props.className;

    if (!this.state.collapsed) { content = this.podContent; }

    return (
      <div className={ this.mainClasses }>
        { this.edit }

        <div className={ this.blockClasses } { ...props }>
          <div className={ this.contentClasses } >
            { this.podHeader }
            { content }
          </div>
          { this.footer }
        </div>
      </div>
    );
  }
}

export default Pod;
