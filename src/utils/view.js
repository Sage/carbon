export function connect(ComposedView, Stores) {
  return class View extends ComposedView {

    constructor(...args) {
      super(...args);
      this.state = Object.assign({}, this.state, this._getStoreStates());
    }

    componentDidMount() {
      if (super.componentDidMount) { super.componentDidMount(); }

      for (var key in Stores) {
        Stores[key].addChangeListener(this._onChange, key);
      }
    }

    componentWillUnmount() {
      if (super.componentWillUnmount) { super.componentWillMount(); }

      for (var key in Stores) {
        Stores[key].removeChangeListener(this._onChange, key);
      }
    }

    _onChange = (key) => {
      this.setState({ [key]: Stores[key].getState() });
    }

    _getStoreStates = () => {
      var states = {};

      for (var key in Stores) {
        states[key] = Stores[key].getState();
      }

      return states;
    }

  }
};
