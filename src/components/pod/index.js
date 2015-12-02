import React from 'react';
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

  static propTypes = {

    /**
     * The collapsed state of the pod
     *
     * underfined - Pod is not collapsible
     * true - Pod is closed
     * false - Pod is open
     *
     * @property collapsed
     * @type {Boolean}
     */
    collapsed: React.PropTypes.bool
  }

  /**
   * A lifecycle called immediatly before initial render
   * Sets the initial state of collasped
   *
   * @method componentDidUpdate
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
    if(!this.props.title) { return; }
    let pod,
        headerProps = {};

    headerProps.className = "ui-pod__header unselectable";

    if(this.state.collapsed !== undefined) {
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
        { this.podHeader }
        { content }
      </div>
    );
  }

}

export default Pod;
