import React from 'react';
import Icon from './../icon';
import classNames from 'classnames';
import Event from './../../utils/helpers/events';
import { validProps } from '../../utils/ether';

import EditButton from './edit-button';
import PodContent from './pod-content';

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
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),

    /**
     * Optional subtitle for the pod
     *
     * @property subtitle
     * @type {String}
     */
    subtitle: React.PropTypes.string,

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
    ]),

    /**
     * Determines if the editable pod content should be full width.
     *
     * @property editContentFullWidth
     * @type {Boolean}
     */
    editContentFullWidth: React.PropTypes.bool,

    /**
     *
     * Determines if the edit button should be hidden until the user
     * hovers over the content.
     *
     * @property displayEditButtonOnHover
     * @type {Boolean}
     */
    displayEditButtonOnHover: React.PropTypes.bool,

    /**
     *
     * Determines if clicking the pod content calls the onEdit action
     *
     * @property triggerEditOnContent
     * @type {Boolean}
     */
    triggerEditOnContent: React.PropTypes.bool
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
  componentWillMount() {
    this.setState({ collapsed: this.props.collapsed });
  }

  /** // OUT
   * A lifecycle called immediatly before new props cause a re-render // OUT
   * Resets the hover state if active // OUT
   * // OUT
   * @method componentWillReceiveProps // OUT
   */ // OUT
  componentWillReceiveProps() { // OUT
    if (this.state.hoverEdit) { // OUT
      this.toggleHoverState(false); // OUT
    } // OUT
  } // OUT

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
   * Checks that the title is a string rather than something else as it can be JSX
   *
   * @method titleIsString
   * @return {Boolean}
   */
  titleIsString = () => {
    return typeof this.props.title === 'string';
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
    return classNames("carbon-pod", this.props.className,
      `carbon-pod--${ this.props.alignTitle }`, {
        "carbon-pod--editable": this.props.onEdit,
        'carbon-pod--is-hovered': this.state.hoverEdit,
        'carbon-pod--content-triggers-edit': this.shouldContentHaveEditProps
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

  /** // OUT
   * Returns props related to the edit event // OUT
   * // OUT
   * @method editProps // OUT
   * @return {Object} // OUT
   */ // OUT
  get editProps() { // OUT
    let props = { // OUT
      onMouseEnter: this.toggleHoverState.bind(this, true), // OUT
      onMouseLeave: this.toggleHoverState.bind(this, false), // OUT
      onFocus: this.toggleHoverState.bind(this, true), // OUT
      onBlur: this.toggleHoverState.bind(this, false) // OUT
    }; // OUT
 // OUT
    if (typeof this.props.onEdit === "string") { // OUT
      props.to = this.props.onEdit; // OUT
    } else if (typeof this.props.onEdit === "object") { // OUT
      props = this.props.onEdit; // OUT
    } else { // OUT
      props.onClick = this.processPodEditEvent; // OUT
      props.onKeyDown = this.processPodEditEvent; // OUT
    } // OUT
 // OUT
    return props; // OUT
  } // OUT

  /**
   * Determines if the content pod should share the editProps
   *
   * @method shouldContentHaveEditProps
   * @return {Boolean}
   */
  get shouldContentHaveEditProps() {
    return (this.props.triggerEditOnContent || this.props.displayEditButtonOnHover) && this.props.onEdit;
  }

  /** // OUT
   * Processes the edit event only on certain event types // OUT
   * // OUT
   * @method processPodEditEvent // OUT
   * @param {Object} the event // OUT
   */ // OUT
  processPodEditEvent = (ev) => { // OUT
    if (Event.isEnterKey(ev) || !Event.isEventType(ev, 'keydown')) { // OUT
      ev.preventDefault(); // OUT
      this.props.onEdit(ev); // OUT
    } // OUT
  } // OUT

  /** // OUT
   * Toggle the state of hovering the edit button. // OUT
   * // OUT
   * @method toggleHoverState // OUT
   * @return {Void} // OUT
   */ // OUT
  toggleHoverState = (val) => { // OUT
    this.setState({ hoverEdit: val }); // OUT
  } // OUT

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let content,
        { ...props } = validProps(this);

    delete props.className;

    if (!this.state.collapsed) { content = this.podContent; }

    this.onEdit = function() { console.log('action has happened!'); };

    let commonProps = {
      as: this.props.as,
      border: this.props.border,
      editAction: this.onEdit,
      padding: this.props.padding
    };

    let contentEditProps = {
      showButton: this.props.displayEditButtonOnHover,
      triggerOnContentClick: this.props.triggerEditOnContent
    };

    return (
      <div className='carbon-pod'>
        <PodContent
          { ...commonProps }
          contentEdit={ contentEditProps }
        >
          { this.podHeader }
          { content }
        </PodContent>
        <EditButton { ...commonProps } />
        { this.footer }
      </div>
    );
  }
}

export default Pod;
