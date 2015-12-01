import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Icon from 'components/icon';

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

  state = {
    collapsible: undefined
  }

  componentWillMount = () => {
    if(this.props.collapsible) {
      if(this.props.collaspible == 'closed') {
        this.setState({ collapsible: 'closed' });
      } else {
        this.setState({ collapsible: 'open' });
      }
    }
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method podTitle
   */
  get podTitle() {
    let pod;
    if(this.state.collapsible) {
      pod = this.podCollapsible;
    }

    return (
        this.props.title ?
          <div className="ui-pod__title" onClick={ this.toggleCollapse }>
            <h2>{ this.props.title }</h2>
          { pod }
          </div> :
          null
    );
  }

  /**
   * Returns HTML and text for the dialog title.
   *
   * @method podTitle
   */
  get podDescription() {
    return (
        this.props.description ?
          <div className="ui-pod__description">{ this.props.description }</div> :
          null
    );
  }

  get podCollapsible() {
    let className = 'ui-pod__arrow ui-pod__arrow--' + this.state.collapsible;

    return(
      <Icon type='dropdown' className={ className } /> 
    );
  }

  toggleCollapse = () => {
    let newState = this.state.collapsible === 'open' ? 'closed' : 'open'
    this.setState({ collapsible: newState });
  };

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    let className = "ui-pod";
    let content;
    className += this.props.className ? this.props.className : '';

    if(this.state.collapsible) {
      className += " collapsible " + this.state.collapsible; 

      if(this.state.collapsible === 'open') {
        content = (<div className='ui-pod__full-content'>
          { this.podDescription }
          <div className='ui-pod__content' >
            { this.props.children }
          </div>
        </div>);
      }
    }


    return (
      <div className={ className } >
        { this.podTitle }
        <ReactCSSTransitionGroup
          transitionName='pod'
          transitionEnterTimeout={ 100 }
          transitionLeaveTimeout={ 100 } >
          { content }
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}

export default Pod;
