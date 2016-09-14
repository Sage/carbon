import Immutable from 'immutable';

/**
* Immutable Helper
*
* Provides helper methods for working with immutable data.
*
* @object ImmutableHelper
* @param {String} name
* @param {Object} form
*/
const ImmutableHelper = {

  /**
  * Parses a regular JSON object into an Immutable data object, mapping the data
  * correctly and applying custom transforms to make the data easier to work with.
  *
  * @method parseJSON
  * @param {Object} js
  */
  parseJSON: (js) => {
    if (typeof js !== 'object' || js === null) {
      if (typeof js === 'number') {
        return String(js);
      }
      return js;
    } else {
      if (Array.isArray(js)) {
        // create the immutable object
        return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toList();
      } else {
        // create the immutable object
        return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toOrderedMap();
      }
    }
  },

  /**
  * Checks whether passed in collection is Immutable list or ordered map
  *
  * @method isImmutable
  * @param {OrderedMap || List} collection
  */
  isImmutable: (collection) => {
    return Immutable.OrderedMap.isOrderedMap(collection) || Immutable.List.isList(collection);
  }

};

export default ImmutableHelper;
