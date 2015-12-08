/**
 * This will validate an input for presence.
 *
 * @object PresenceValidator
 */
var PresenceValidator = function() {
  return {
    /**
     * This will validate the given value, and return a valid status.
     *
     * @method validate
     * @param {String} value
     * @return {Boolean}
     */
    validate: function(value) {
      if (value && value.get) {
        // if value is an immutable object, we probably want to judge that it has
        // a value by an ID attribute. This relates to components such as
        // DropdownSuggest which has an immutable object as its value.
        if (value.get('id')) {
          return true;
        } else {
          return false;
        }
      } else {
        // for regular inputs, we can just use it's regular value
        if (value) {
          return true;
        } else {
          return false;
        }
      }
    },

    /**
     * This is the message returned when this validation fails.
     *
     * @method message
     * @return {String}
     */
    message: function() {
      return "This field is required.";
    }
  }
};

export default PresenceValidator;
