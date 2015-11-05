class InputHelper {

  static mainClasses = (componentName, props) => {
    let mainClasses = `${componentName}` +
        props.input.mainClasses() +
        props.validation.mainClasses();

    return mainClasses;
  }

  static inputClasses = (componentName, props) => {
    let inputClasses =  `${componentName}__input` +
        props.input.inputClasses() +
        props.validation.inputClasses();

    return inputClasses;
  }
}

export default InputHelper;
