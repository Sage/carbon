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
    }

    if (Array.isArray(js)) {
      return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toList();
    }

    return Immutable.Seq(js).map(ImmutableHelper.parseJSON).toMap();
  }
};

export default ImmutableHelper;
