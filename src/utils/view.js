import React from 'react';

const View = (ComposedView, Stores) => class extends React.Component {

  componentDidMount = () => {
    for (let key in Stores) {
      Stores[key].addChangeListener(this._onChange, key);
    }
  }

  componentWillUnmount = () => {
    for (let key in Stores) {
      Stores[key].removeChangeListener(this._onChange, key);
    }
  }

  _onChange = (key) => {
    this.setState({ [key]: Stores[key].getState() });
  }


  getStoreStates = () => {

    let states = {};
    for (let key in Stores) {

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
