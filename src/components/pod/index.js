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

  componentWillMount = () => {
    this.setState({ collapsed: this.props.collapsed });
  }

  /**
   * Returns HTML and text for the dialog title.
   * Adds collapsible arrow if applicable
   *
   * @method podTitle
   */
  get podTitle() {
    let pod,
        headerProps = {};

    headerProps.className = "ui-pod__header unselectable";

    if(this.state.collapsed !== undefined) {
      pod = this.podCollapsible;
      headerProps.onClick = this.toggleCollapse;
      headerProps.className += " ui-pod__header--" + this.state.collapsed;
    }

    return (
        this.props.title ?
          <div { ...headerProps }>
            <h2 className="ui-pod__title" >{ this.props.title }</h2>
          { pod }
          </div> :
          null
    );
  }

  /**
   * Returns HTML and text for the dialog description.
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

  /**
   * Returns the collapsible icon.
   *
   * @method podCollapsible
   */
  get podCollapsible() {
    let className = 'ui-pod__arrow ui-pod__arrow--' + this.state.collapsed

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
   * Renders the component.
   *
   * @method render
   */
  render() {
    let className = "ui-pod ";
    let content;

    className += this.props.className ? this.props.className : '';

    if(!this.state.collapsed) {
      content = this.podContent;
    }

    return (
      <div className={ className } >
        { this.podTitle }
        { content }
      </div>
    );
  }

}

export default Pod;
