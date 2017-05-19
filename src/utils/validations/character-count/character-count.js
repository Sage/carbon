import ValidationsHelper from './../../helpers/validations';
import { charCount } from '../../ether';

/**
 * A Character Count Validator object.
 *
 * == How to use this validator ==
 *
 * Import the validator into your component:
 *
 *  `import CharacterCountValidator from 'utils/validations/character-count'`
 *
 * Assign the validator to the validations prop, passing the required param:
 *
 * To validate that a character count not over a given number, set a 'limit'.
 *
 *  e.g.
 *
 *  `<TextArea validations={ [new CharacterCountValidator({ limit: 1000 })] }/>`
 *
 * would validate that a textarea field cannot exceed 1000 characters long.
 *
 * @constructor CharacterCountValidator
 */
class CharacterCountValidator {

  /**
   * @method constructor
   * @param {Object} params
   */
  constructor(params = {}) {
    if (!params.limit) {
      throw new Error("You must set a 'limit' value.");
    }

    /**
     * An optional custom validation message.
     *
     * @property customMessage
     * @type {String}
     */
    this.customMessage = params.customMessage;

    /**
     * Character count limit.
     *
     * @property limit
     * @type {Number}
     */
    this.limit = params.limit;
  }

  /**
   * This will validate whether the character count is less than or equal to the limit.
   *
   * @method validate
   * @param {String} value to check
   * @return {Boolean} true if value is valid
   */
  validate = (value) => {
    return (!value || (charCount(value) <= this.limit));
  }

  /**
   * This is the message returned when this validation fails.
   *
   * @method message
   * @return {String} the error message to display
   */
  message = () => {
    return ValidationsHelper.validationMessage(
        this.customMessage,
        'errors.messages.too_long',
        { count: this.limit }
    );
  }
}

export default CharacterCountValidator;
