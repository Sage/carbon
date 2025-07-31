import { useState } from "react";

type FormState = { [key: string]: string };
type FormStateBoolean = { [key: string]: boolean };

export function useMultiInput(initialState: FormState = {}) {
  const [state, setState] = useState<FormState>(initialState);

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const reset = () => setState(initialState);

  return {
    state,
    setValue,
    reset,
    setState,
  };
}

export function useMultiInputBoolean(initialState: FormStateBoolean = {}) {
  const [state, setState] = useState<FormStateBoolean>(initialState);

  const setValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = target;
    setState((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const reset = () => setState(initialState);

  return {
    state,
    setValue,
    reset,
    setState,
  };
}

export default useMultiInput;
