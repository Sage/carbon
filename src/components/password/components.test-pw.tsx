import React, { useState } from "react";
import Password, { PasswordProps } from ".";

export const SIZES = ["small", "medium", "large"] as const;
export const VALIDATIONS = ["error", "warning", "info"] as const;

export const PasswordComponent = ({
  onChange,
  label = "Password",
  ...props
}: Omit<PasswordProps, "value">) => {
  const [state, setState] = useState("test");
  const setValue = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setState(ev.target.value);
    if (onChange) {
      onChange(ev);
    }
  };
  return (
    <Password label={label} value={state} onChange={setValue} {...props} />
  );
};
