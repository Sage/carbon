/**
* Generate Input Name
*
* If a form exists, generate an input name based on its model name.
*
* For example, for a form with a model name of 'user' and an input with a name
* of 'age' you will get 'user[age]'.
*
* @method generateInputName
* @param {String} name
* @param {Object} form
*/
export function generateInputName(name, form) {
  let formName = name;

  if (form && form.model) {
    formName = form.model;
    formName += (name.charAt(0) === "[") ? name : `[${name}]`;
  }

  return formName;
}
