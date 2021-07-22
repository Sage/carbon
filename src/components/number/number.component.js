import React, { useRef } from "react";
import Textbox from "../textbox";

const Number = ({ onChange, onKeyDown, value, ...rest }) => {
  const selectionStart = useRef();
  const selectionEnd = useRef();

  const handleOnChange = (event) => {
    if (isValidNumber(event.target.value) && onChange) {
      onChange(event);
    } else {
      event.target.value = value || null;
      event.target.setSelectionRange(
        selectionStart.current,
        selectionEnd.current
      );
    }
  };

  const handleKeyDown = (ev) => {
    selectionStart.current = ev.target.selectionStart;
    selectionEnd.current = ev.target.selectionEnd;

    if (onKeyDown) {
      onKeyDown(ev);
    }
  };
  return (
    <Textbox
      {...rest}
      value={value}
      onChange={handleOnChange}
      onKeyDown={handleKeyDown}
    />
  );
};

function isValidNumber(value) {
  const regex = new RegExp("^[-]?[0-9]*$");
  const result = regex.test(value);

  return result;
}

Number.propTypes = {
  ...Textbox.propTypes,
};

export default Number;
