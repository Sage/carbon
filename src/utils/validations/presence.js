var PresenceValidator = {
  validate: function(value) {
    if (value && value.get) {
      if (value.get('id')) {
        return true;
      } else {
        return false;
      }
    } else {
      if (value) {
        return true;
      } else {
        return false;
      }
    }
  },

  message: function() {
    return "This field is required.";
  }
};

export default PresenceValidator;
