import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Flux from 'flux';
import { connect } from './index';
import Textbox from './../../components/textbox';
import Store from './store';

let Dispatcher = new Flux.Dispatcher();

class BaseStore1 extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);
    this.name="BaseStore1";
    this.data = { text: 'text' };
  }
}

class BaseStore2 extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);
    this.name="BaseStore2";
    this.data = {};
  }
}

class NoDataStore extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);
    this.name="NoDate";
  }
}

class NoNameStore extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);
    this.data = {};
  }
}

class SimpleView extends React.Component {
  render() {
    return;
  }
}

class View extends React.Component {

  componentDidMount() {
    this.extraFunction(); 
  }

  componentWillUnmount() {
    this.extraFunction();
  }

  extraFunction() {
    // Nothing
  }

  render() { 
    
    let value = this.state.BaseStore1.get('text');

    return(
      <Textbox name="Test" value={ value } />    
    );
  }
}

let baseStore1 = new BaseStore1(Dispatcher);
let baseStore2 = new BaseStore2(Dispatcher);
let noNameStore = new NoNameStore(Dispatcher);
let noDataStore = new NoDataStore(Dispatcher);

describe('Connect', () => {
  describe('Add Store', () => {
    describe('When passed an array of stores', () => {
      it('tracks all stores', () => {
        let MultiStoreView = connect(View, [ baseStore1, baseStore2 ]);
        let instance = new MultiStoreView();
        expect(instance.state.BaseStore1).toEqual({ text: 'text' });
        expect(instance.state.BaseStore2).toEqual({});
      });
    });

    describe('when passed a single store', () => {
      it('tracks the store', () => {
        let SingleStoreView = connect(View, baseStore1);
        let instance = new SingleStoreView();
        expect(instance.state.BaseStore1).toEqual({ text: 'text' });
      });
    });

    describe('when a store has no name', () => {
      it('throughs an error', () => {
        expect(function () { connect(View, noNameStore) }).toThrowError(
          `You need to set the name property on your store. In ${noNameStore.constructor.name}'s constructor add 'this.name = "uniqueStoreName";'.`
        );
      });
    });

    describe('when a store has no data', () => {
      it('throughs an error', () => {
        expect(function () { connect(View, noDataStore) }).toThrowError(
          `You need to set the data property on your store. In ${noDataStore.constructor.name}'s constructor add 'this.data = ImmutableHelper.parseJSON({});'.`
        );
      });
    });
  });

  describe('View', () => {
    let MultiStoreView;
    let instance;

    beforeEach(() => {
      MultiStoreView = connect(View, [ baseStore1, baseStore2 ]);
      instance = new MultiStoreView('foo');
    });

    describe('constructor', () => {
      describe('when passing arguments', () => {
        it('sets the local arguments', () => {
          expect(instance.props).toEqual('foo');
        });
      });
    });

    describe('componentDidMount', () => {
      describe('when super has componentDidMount', () => {
        it('calls super.componentDidMount', () => {
          spyOn(instance, 'extraFunction')
          instance.componentDidMount();
          expect(instance.extraFunction).toHaveBeenCalled();
        });
      
        it('adds events listeners', () => {
          spyOn(baseStore1, 'addChangeListener');
          spyOn(baseStore2, 'addChangeListener');
          instance.componentDidMount();
          expect(baseStore1.addChangeListener).toHaveBeenCalledWith(instance._onChange);
          expect(baseStore2.addChangeListener).toHaveBeenCalledWith(instance._onChange);
        });
      });

      describe('when super has no componentDidMount', () => {
        beforeEach(() => {
          MultiStoreView = connect(SimpleView, [ baseStore1, baseStore2 ]);
          instance = new MultiStoreView('foo');
        });

        it('it adds events listeners', () => {
          spyOn(baseStore1, 'addChangeListener');
          instance.componentDidMount();
          expect(baseStore1.addChangeListener).toHaveBeenCalledWith(instance._onChange);
        });
      });
    });

    describe('componentWillUnmount', () => {
      describe('when super has componentWillUnmount', () => {
        it('calls super.componentWillUnmount', () => {
          spyOn(instance, 'extraFunction')
          instance.componentWillUnmount();
          expect(instance.extraFunction).toHaveBeenCalled();
        });

        it('removes change listeners', () => {
          spyOn(baseStore1, 'removeChangeListener');
          spyOn(baseStore2, 'removeChangeListener');
          instance.componentWillUnmount();
          expect(baseStore1.removeChangeListener).toHaveBeenCalledWith(instance._onChange);
          expect(baseStore2.removeChangeListener).toHaveBeenCalledWith(instance._onChange);
        });
      });
      describe('when super has no componentWillUnmount', () => {
        beforeEach(() => {
          MultiStoreView = connect(SimpleView, [ baseStore1, baseStore2 ]);
          instance = new MultiStoreView('foo');
        });

        it('it removes events listeners', () => {
          spyOn(baseStore1, 'removeChangeListener');
          instance.componentWillUnmount();
          expect(baseStore1.removeChangeListener).toHaveBeenCalledWith(instance._onChange);
        });
      });
    });

    describe('_onChange', () => {
      it('sets the state of the updated store using the passed key', () => {
        let MultiStoreView = connect(View, [ baseStore1, baseStore2 ]);
        let instance = new MultiStoreView();
        spyOn(instance, 'setState');
        instance._onChange('BaseStore1')
        expect(instance.setState).toHaveBeenCalledWith({ BaseStore1: { text: 'text' } });
      });
    });
  });
});
