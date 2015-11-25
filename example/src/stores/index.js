import Constants from 'constants';
import Store from '../../../lib/utils/flux/store';
import ImmutableHelper from '../../../lib/utils/helpers/immutable';
import Dispatcher from '../dispatcher';

class DropdownStore extends Store {
  constructor(Dispatcher) {
    super(Dispatcher);

    // define the namespace for the store - this will be used by the component
    // to access the data in the store
    this.name = 'dropdownStore';
    // define the store's initial data (this should use Immutable.js)
    this.data = ImmutableHelper.parseJSON({ 'items':
                       [{'id' : 1,  'name': 'foo'
                       },
                       {'id' : 2,  'name': 'foof'
                       },
                       {'id' : 3,  'name': 'dfdf'
                       },
                       {'id' : 4,  'name': 'fdfd'
                       },
                       {'id' : 5,  'name': 'gfhg'
                       },
                       {'id' : 6,  'name': 'gfgf'
                       },
                       {'id' : 7,  'name': 'asdg'
                       },
                       {'id' : 8,  'name': 'asdas'
                       }]
                     });
  }

  // we create a function that uses the constant we defined, this subscribes
  // the store to the this particular action so it will trigger when the
  // action is dispatched
  [Constants.UPDATE_VALUE](action) {
    // we modify the data and update `this.data` to the new data (remember that
    // we are working with immutable data)
    this.data = this.data.set('displayValue', action.value);
  }
}

// initialize the store (another singleton for your application)
export default new DropdownStore(Dispatcher);
