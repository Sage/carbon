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
        setValidity: this.setValidity
      }
    }
  }

  setValidity = (valid) => {
    console.log(valid)
    this.context.tab.changeValidity(this.props.id, valid);
    this.setState({ isValid: valid }); 
  }

  isValid = () => {
    return this.state.isValid;
  }

  get mainClasses() {
    let classes = this.props.className;
    if (!this.state.isValid) {
      classes += ' ui-tab-item--errors';
    }

    return 'ui-tab-item ' + classes;
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
