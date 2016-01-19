import React from 'react';
import Icon from './../icon';

class MultiActionButton extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    as: React.PropTypes.string
  }

  static defaultProps = {
    as: 'secondary',
  }

  state = {
    /**
     * Defines whether the list is currently hovered over
     *
     * @property overList
     * @type {Boolean}
     * @default false
     */
    overList: false,

    /**
     * Defines whether the button is currently hovered over
     *
     * @property overButton
     * @type {Boolean}
     * @default false
     */
    overButton: false,

    /**
     * The ID of the highlighted item in the list.
     *
     * @property highlighted
     * @type {Number}
     * @default 0 first element
     */
    highlighted: 0
  }

  /**
   * Handles what happens on mouse enter of the button
   *
   * @method handleMouseEnter
   */
  handleMouseEnter = () => {
    this.setState({ overButton: true });
  }

  /**
   * Handles what happens on mouse leave of the button.
   *
   * @method handleMouseLeave
   */
  handleMouseLeave = () => {
    this.setState({ overButton: false });
  }

  /*
   * Handles when the mouse hovers over the list.
   *
   * @method handleMouseEnterList
   */
  handleMouseEnterList = () => {
    this.setState({ overList: true });
  }

  /**
   * Handles when the mouse leaves the list.
   *
   * @method handleMouseLeaveList
   */
  handleMouseLeaveList = () => {
    this.setState({ overList: false });
  }

  /**
   * Handles when the mouse enters a line item
   *
   * @method handleMouseEnterListItem
   * @param {Event} ev mouse enter event
   */
  handleMouseEnterListItem = (ev) => {
    this.setState({ highlighted: Number(ev.target.id) });
  }

  /**
   * A getter for props to be applied to the button
   *
   * @method buttonProps
   */
  get buttonProps() {
    let props = {};
    props.className='ui-multi-action-button__button';
    props.className += ' ui-button ui-button--' + this.props.as;
    props.onMouseEnter = this.handleMouseEnter;
    props.onMouseLeave = this.handleMouseLeave;

    return props;
  }

  /**
   * A getter for props to be applied to the list (ul)
   *
   * @method listProps
   */
  get listProps() {
    let props = {};
    props.className='ui-multi-action-button__list';
    props.onMouseEnter = this.handleMouseEnterList;
    props.onMouseLeave = this.handleMouseLeaveList;

    return props;
  }

  /**
   * A getter for props to be applied to each line item (li)
   *
   * @method listItemProps
   */
  get listItemProps() {
    let props = {};
    props.className='ui-multi-action-button__list__item';
    props.onMouseEnter = this.handleMouseEnterListItem;
    props.onMouseLeave = this.handleMouseLeaveListItem;

    return props;
  }

  get options() {
    let actions = this.props.actions;

    let results = actions.map((action, index) => {
      let props = this.listItemProps;

      if (this.state.highlighted == index) {
        props.className += ' ui-multi-action-button__list__item--highlighted'
      }
      
      if (action.get('callback')) {
        props.onClick = action.get('callback');

        return ( 
          <li id={ index } key={ index } { ...props } >
            { action.get('text') }
          </li>
        );
      } else if (action.get('href')) {
        return (
          <a key={ index } href={ action.get('href') }>
            <li id={ index } { ...props }>
              { action.get('text') }
            </li>
          </a>
        );
      }
    });

    return results;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let list;

    // if (this.state.overList || this.state.overButton) {
      list = (
        <ul { ...this.listProps } >
          { this.options }
        </ul>
      );
    // }


    return (
      <div>
        <span { ...this.buttonProps }>
          { this.props.label } <Icon type='dropdown' className='ui-multi-action-button__icon' />
        </span>
        { list }
      </div>
    );
  }
}

export default MultiActionButton;
