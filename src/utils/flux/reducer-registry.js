import { createStore, combineReducers } from 'redux'

const ReducerRegistry = function() {
  this.store = createStore(() => {});
  this.reducers = {};

  this.register = (name, reducer) => {
    this.reducers[name] = reducer;
    this.store.replaceReducer(combineReducers(this.reducers));
  }
}

export default new ReducerRegistry();
