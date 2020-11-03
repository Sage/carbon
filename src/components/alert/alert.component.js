import React from "react";
import Dialog from "../dialog";
import AlertStyle from "./alert.style.js";

class Alert extends Dialog {
  componentTags(props) {
    return {
      "data-component": "alert",
      "data-element": props["data-element"],
      "data-role": props["data-role"],
    };
  }

  get closeIcon() {
    return <AlertStyle>{super.closeIcon}</AlertStyle>;
  }
}

Alert.defaultProps = {
  ...Dialog.defaultProps,
  role: "alertdialog",
  size: "extra-small",
};

export default Alert;
