import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Flash extends React.Component {

  static propTypes = {
    /**
     * A custom close event handler
     *
     * @property cancelHandler
     * @type {Function}
     */
    cancelHandler: React.PropTypes.func,

    /**
     * Sets the open state of the flash
     *
     * @property open
     * @type {Boolean}
     * @default false
     */
    open: React.PropTypes.bool.isRequired,

    mode: React.PropTypes.string,

    done: React.PropTypes.func
  }
  /**
   * Returns classes title for the confirm, combines with dialog class names.
   *
   * @method dialogTitleClasses
   */
  get componentTitleClasses() {
    return ' ui-flash__title';
  }

  /**
   * Returns classes for the alert, combines with dialog class names..
   *
   * @method dialogClasses
   */
  get componentClasses() {
    let classes = 'ui-flash__flash';


    return classes;
  }

  /**
   * Returns classes for the component.
   *
   * @method mainClasses
   * @return {String} Main className
   */
  get mainClasses() {
    let classes = 'ui-flash';

    if (this.props.className) {
      classes += ` ${this.props.className}`;
    }

    return classes;
  }

  /**
   * Returns HTML and text for the flash title.
   *
   * @method flashTitle
   * @return {String} title to display
  //  */
  // get flashTitle() {
  //   return (
  //       this.props.title ?
  //         <h3 className={ this.componentTitleClasses }>{ this.props.title }</h3> :
  //         null
  //   );
  // }

  /**
   * Returns the computed HTML for the dialog.
   *
   * @method dialogHTML
   * @return {Object} JSX for dialog
   */
  get flashHTML() {
    return (
      <div className={ this.componentClasses }>
        <h3 className={ this.componentTitleClasses }>{ this.props.title }</h3>
      </div>
    );
  }

    // state = { active: false }
    //
    // componentDidUpdate() {
    //   if (!this.state.active && this.props.open === true) {
    //     this.setState({ active: true });
    //     setTimeout(() => {
    //       this.props.done()
    //       this.setState({active: false});
    //     }, 3000);
    //   }
    // }

  get sliderHTML() {
    let classes = 'ui-flash-slider';

    if(this.props.mode == 'success') {
      classes += ' ui-flash-slider__mode--success';
    }
    return (
      <div className={ classes }>

      </div>
    );
  }
        // <Icon className="ui-flash__close" type="close" onClick={ this.props.cancelHandler } />
  /**
   * Renders the component.
   *
   * @method render
   * @return {Object} JSX
   */
  render() {
    let flashHTML, sliderHTML;

    if (this.props.open) {
      flashHTML = this.flashHTML;
      sliderHTML = this.sliderHTML;
    }

    return (
      <div className={ this.mainClasses }>
        <ReactCSSTransitionGroup
          transitionName="ui-flash__flash"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 500 }>
          { sliderHTML }
          <ReactCSSTransitionGroup
            transitionName="ui-flash-slider"
            transitionEnterTimeout={ 500 }
            transitionLeaveTimeout={ 500} >
            { flashHTML }
          </ReactCSSTransitionGroup>
        </ReactCSSTransitionGroup>
      </div>
    );
    // return (
    //   <div className={ this.mainClasses }>
    //     <ReactCSSTransitionGroup
    //       transitionName="ui-flash__flash"
    //       transitionEnterTimeout={ 500 }
    //       transitionLeaveTimeout={ 500} >
    //       { sliderHTML }
    //   </ReactCSSTransitionGroup>
    //   </div>
    // );

    // return (
    //   <div className={ this.mainClasses }>
    //       { flashHTML }
    //   </div>
    // );
  }

}

export default Flash;
