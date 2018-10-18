import { createStore, combineReducers } from 'redux'

const reducers = {};

const ReducerRegistry = function() {
  this.register = (name, reducer) => {
    reducers[name] = reducer;

    if (this.store) {
      this.store.replaceReducer(combineReducers(reducers));
    }
  }

  this.createStore = (initialReducers, ...args) => {
    Object.assign(reducers, initialReducers);
    this.store = createStore(combineReducers(reducers), ...args);
    return this.store;
  }
}

export default new ReducerRegistry();
