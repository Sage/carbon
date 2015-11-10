import React from 'react';

var View = (ComposedView, Stores) => class extends React.Component {

  componentDidMount = () => {
    for (var key in Stores) {
      Stores[key].addChangeListener(this._onChange, key);
    }
  }

  componentWillUnmount = () => {
    for (var key in Stores) {
      Stores[key].removeChangeListener(this._onChange, key);
    }
  }

  _onChange = (key) => {
    this.setState({ [key]: Stores[key].getState() });
  }


  getStoreStates = () => {
    var states = {};
    for (var key in Stores) {
      states[key] = Stores[key].getState();
    }
    return states;
  }

  state = this.getStoreStates();

  render() {
    return (
      <ComposedView {...this.props} {...this.state} />
    );
  }
};

export default View;
