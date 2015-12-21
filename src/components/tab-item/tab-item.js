import React from 'react';
import _ from 'lodash';

class TabItem extends React.Component {

  state = {
    isValid: true
  }

  static contextTypes = {
    tab: React.PropTypes.object
  }

  static childContextTypes = {
    tabItem: React.PropTypes.object
  }

  getChildContext() {
    return {
      tabItem: {
        // attachToTabItem: this.attachToTabItem,
        // detachFromTabItem: this.detachFromTabItem,
        setValidity: this.setValidity
      }
    }
  }

  setValidity = (valid) => {
    console.log(valid)
    this.context.tab.changeValidity(this.props.id, valid);
    this.setState({ isValid: valid }); 
  }

  // attachToTabItem = (component) => {
  //   let namespace = component.props.namespace;
  //   let row_id    = component.props.row_id;
  //   let name      = component.props.name;
  //
  //   // TODO: cannot use constructor name:
  //   if (component.constructor.name === "InputGrid") {
  //     this.tables[name] = component;
  //   } else if (namespace && row_id) {
  //     if (!this.inputs[namespace]) {
  //       this.inputs[namespace] = {};
  //     }
  //
  //     if (!this.inputs[namespace][row_id]) {
  //       this.inputs[namespace][row_id] = {};
  //     }
  //
  //     this.inputs[namespace][row_id][name] = component;
  //   } else {
  //     this.inputs[name] = component;
  //   }
  // }
  //
  // detachFromTabItem = (component) => {
  //   let namespace = component.props.namespace;
  //   let row_id    = component.props.row_id;
  //   let name      = component.props.name;
  //
  //   if (component.constructor.name === "InputGrid") {
  //     delete this.tables[name];
  //   } else if (namespace && row_id) {
  //     delete this.inputs[namespace][row_id][name];
  //   } else {
  //     delete this.inputs[name];
  //   }
  // }
  //
  isValid = () => {
    return this.state.isValid;
  }

  get mainClasses() {
    return 'ui-tab-item ' + this.props.className;
  }
  
  render() { 
    return(
      <div className={ this.mainClasses }>
        { this.props.children }
      </div>
    );
  }
}

export default TabItem;
