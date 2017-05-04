import React from 'react';
import PropTypes from 'prop-types';
import Icon from './../icon';
import Link from './../link';
import classNames from 'classnames';
import Event from './../../utils/helpers/events';
import { validProps } from '../../utils/ether';
import { tagComponent } from '../../utils/helpers/tags';

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
    border: PropTypes.bool,

    /**
     * Determines the padding around the pod.
     * Values: 'none', 'small', 'medium' or 'large'.
     *
     * @property padding
     * @type {String}
     * @default medium
     */
    padding: PropTypes.string,

    /**
     * Applies a theme to the Pod.
     * Value: primary, secondary, tile
     *
     * @property as
     * @type {String}
     * @default primary
     */
    as: PropTypes.string,

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
    collapsed: PropTypes.bool,

    /**
     * Title for the pod h4 element
     * always shown
     *
     * @property title
     * @type {String}
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Optional subtitle for the pod
     *
     * @property subtitle
     * @type {String}
     */
    subtitle: PropTypes.string,

    /**
     * Aligns the title to left, right or center
     *
     * @property alignTitle
     * @type {String}
     * @default left
     */
    alignTitle: PropTypes.string,

    /**
     * Description for the pod
     * Not shown if collapsed
     *
     * @property title
     * @type {String}
     */
    description: PropTypes.string,

    /**
     * A component to render as a Pod footer.
     *
     * @property footer
     * @type {String | Object}
     */
    footer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Supplies an edit action to the pod.
     *
     * @property onEdit
     * @type {String|Function|Object}
     */
    onEdit: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.object
    ]),

    /**
     * Determines if the editable pod content should be full width.
     *
     * @property editContentFullWidth
     * @type {Boolean}
     */
    editContentFullWidth: PropTypes.bool,

    /**
     * Determines if the edit button should be hidden until the user
     * hovers over the content.
     *
     * @property displayEditButtonOnHover
     * @type {Boolean}
     */
    displayEditButtonOnHover: PropTypes.bool,

    /**
     * Determines if clicking the pod content calls the onEdit action
     *
     * @property triggerEditOnContent
     * @type {Boolean}
     */
    triggerEditOnContent: PropTypes.bool,

    /**
     * Resets edit button styles to an older version
     *
     * @property internalEditButton
     * @type {Boolean}
     */
    internalEditButton: PropTypes.bool
  }

  static defaultProps = {
    border: true,
    as: 'primary',
    padding: 'medium',
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

  /**
   * A lifecycle called immediatly before new props cause a re-render
   * Resets the hover state if active
   *
   * @method componentWillReceiveProps
   */
  componentWillReceiveProps() {
    if (this.state.hoverEdit) {
      this.toggleHoverState(false);
    }
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
      subtitle = <h5 className='carbon-pod__subtitle' data-element='subtitle'>{ this.props.subtitle }</h5>;
    }

    return (
      <div { ...headerProps }>
        <h4 className='carbon-pod__title' data-element='title'>{ this.props.title }</h4>
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
    if (this.props.description) {
      return <div className='carbon-pod__description'>{ this.props.description }</div>;
    } else {
      return null;
    }
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
    return classNames('carbon-pod', this.props.className,
      `carbon-pod--${ this.props.alignTitle }`, {
        'carbon-pod--editable': this.props.onEdit,
        'carbon-pod--is-hovered': this.state.hoverEdit,
        'carbon-pod--content-triggers-edit': this.shouldContentHaveEditProps,
        'carbon-pod--internal-edit-button': this.props.internalEditButton
      }
    );
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
      `carbon-pod__block--padding-${this.props.padding}`,
      `carbon-pod__block--${this.props.as}`, {
        'carbon-pod__block--no-border': !this.props.border,
        'carbon-pod__block--full-width': this.props.editContentFullWidth,
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
      `carbon-pod__edit-action--${this.props.as}`,
      `carbon-pod__edit-action--padding-${this.props.padding}`, {
        'carbon-pod__edit-action--no-border': !this.props.border,
        'carbon-pod__display-on-hover': this.props.displayEditButtonOnHover
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
      <div className={ this.footerClasses } data-element='footer'>
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

    return (
      <div className='carbon-pod__edit-button-container' { ...this.hoverOverEditEvents } >
        <Link icon='edit' className={ this.editActionClasses } { ...this.linkProps() }/>
      </div>
    );
  }

  /**
   * Returns event related props for triggering and highlighting edit functionality
   *
   * @method linkProps
   * @return {Object} props
   */
  linkProps = () => {
    let props = {
      'data-element': 'edit'
    };

    if (typeof this.props.onEdit === 'string') {
      props.to = this.props.onEdit;
    } else if (typeof this.props.onEdit === 'object') {
      props = this.props.onEdit;
    }

    return props;
  }

  /**
   * Returns event related props for triggering and highlighting edit functionality
   *
   * @method hoverOverEditEvents
   * @return {Object}
   */
  get hoverOverEditEvents() {
    let props = {
      onMouseEnter: this.toggleHoverState.bind(this, true),
      onMouseLeave: this.toggleHoverState.bind(this, false),
      onFocus: this.toggleHoverState.bind(this, true),
      onBlur: this.toggleHoverState.bind(this, false)
    };

    if (typeof this.props.onEdit === 'function') {
      props.onClick = this.processPodEditEvent;
      props.onKeyDown = this.processPodEditEvent;
    }

    return props;
  }

  /**
   * Determines if the content pod should share the editProps
   *
   * @method shouldContentHaveEditProps
   * @return {Boolean}
   */
  get shouldContentHaveEditProps() {
    return (this.props.triggerEditOnContent || this.props.displayEditButtonOnHover) && this.props.onEdit;
  }

  /**
   * Processes the edit event only on certain event types
   *
   * @method processPodEditEvent
   * @param {Object} the event
   */
  processPodEditEvent = (ev) => {
    if (Event.isEnterKey(ev) || !Event.isEventType(ev, 'keydown')) {
      ev.preventDefault();
      this.props.onEdit(ev);
    }
  }

  /**
   * Toggle the state of hovering the edit button.
   *
   * @method toggleHoverState
   * @return {Void}
   */
  toggleHoverState = (val) => {
    this.setState({ hoverEdit: val });
  }

  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let content,
        { ...props } = validProps(this),
        hoverOverEditEvents = {};

    delete props.className;

    if (this.titleIsString()) {
      props.title = this.props.title;
    }

    if (!this.state.collapsed) { content = this.podContent; }

    if (this.shouldContentHaveEditProps) {
      hoverOverEditEvents = this.hoverOverEditEvents;
      hoverOverEditEvents.tabIndex = '0';
    }

    return (
      <div className={ this.mainClasses } { ...props } { ...tagComponent('pod', this.props) }>
        <div className={ this.blockClasses } { ...hoverOverEditEvents }>
          <div className={ this.contentClasses } >
            { this.podHeader }
            { content }
          </div>
          { this.footer }
        </div>

        { this.edit }
      </div>
    );
  }
}

export default Pod;
