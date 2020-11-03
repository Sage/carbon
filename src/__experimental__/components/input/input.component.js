import React, { useEffect, useContext, useRef } from "react";
import PropTypes from "prop-types";
import StyledInput from "./input.style";
import {
  InputContext,
  InputGroupContext,
} from "../../../__internal__/input-behaviour";

const Input = React.forwardRef(
  (
    {
      autoFocus,
      inputRef,
      onClick,
      onChangeDeferred,
      onChange,
      onBlur,
      onFocus,
      deferTimeout,
      type = "text",
      id,
      name,
      ...rest
    },
    ref
  ) => {
    const context = useContext(InputContext);
    const groupContext = useContext(InputGroupContext);
    const deferredTimeout = useRef(null);
    const input = ref || useRef(null);

    useEffect(() => {
      if (autoFocus && input.current) input.current.focus();
    }, [autoFocus, input]);

    useEffect(() => {
      if (inputRef) inputRef(input);
    }, [input, inputRef]);

    useEffect(() => {
      if (context.inputRef) context.inputRef(input);
    }, [context, input]);

    const handleClick = (ev) => {
      if (onClick) onClick(ev);
      input.current.focus();
    };

    const handleFocus = (ev) => {
      if (onFocus) onFocus(ev);
      if (context.onFocus) context.onFocus(ev);
      if (groupContext.onFocus) groupContext.onFocus(ev);
      if (type === "text") selectTextOnFocus(input);
    };

    const handleBlur = (ev) => {
      if (onBlur) onBlur(ev);
      if (context.onBlur) context.onBlur(ev);
      if (groupContext.onBlur) groupContext.onBlur(ev);
    };

    const handleDeferred = ({ currentTarget, target }) => {
      if (onChangeDeferred) {
        clearTimeout(deferredTimeout.current);
        deferredTimeout.current = setTimeout(() => {
          onChangeDeferred({ currentTarget, target });
        }, deferTimeout || 750);
      }
    };

    const handleChange = (ev) => {
      if (onChange) onChange(ev);
      handleDeferred(ev);
    };

    return (
      <StyledInput
        {...rest}
        name={name}
        type={type}
        id={id || name}
        ref={input}
        data-element="input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onChange={handleChange}
      />
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  inputRef: PropTypes.func, // a callback to retrieve the input reference
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  autoFocus: PropTypes.bool,
  onChange: PropTypes.func,
  onChangeDeferred: PropTypes.func,
  deferTimeout: PropTypes.number,
  type: PropTypes.string,
};

function selectTextOnFocus(input) {
  // setTimeout is required so the dom has a chance to place the cursor in the input
  setTimeout(() => {
    if (input.current) {
      const { length } = input.current.value;
      const cursorStart = input.current.selectionStart;
      const cursorEnd = input.current.selectionEnd;
      // only select text if cursor is at the very end or the very start of the value
      if (
        (cursorStart === 0 && cursorEnd === 0) ||
        (cursorStart === length && cursorEnd === length)
      ) {
        if (document.activeElement === input.current) {
          input.current.setSelectionRange(0, length);
        }
      }
    }
  });
}

export default Input;
