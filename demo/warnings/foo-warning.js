class FooWarning {
  validate = (value) => {
    if (value == "foo") {
      return false;
    } else {
      return true;
    }
  }

  message = () => {
    return "You have typed foo!";
  }
}

export default FooWarning;
