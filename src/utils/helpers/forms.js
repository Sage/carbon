export function generateInputName(name, form) {
  let formName = name;

  if (form) {
    formName = form.model;
    formName += (name.charAt(0) === "[") ? name : `[${name}]`;
  }

  return formName;
};
