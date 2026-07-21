import { Dispatch, SetStateAction, useCallback, useState } from "react";

export interface UseDatePickerStateProps {
  onPickerOpen?: () => void;
  onPickerClose?: () => void;
}

export interface UseDatePickerStateReturn {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  openPicker: () => void;
  closePicker: () => void;
  togglePicker: () => void;
}

const useDatePickerState = ({
  onPickerOpen,
  onPickerClose,
}: UseDatePickerStateProps): UseDatePickerStateReturn => {
  const [open, setOpen] = useState(false);

  const openPicker = useCallback(() => {
    if (open) return;

    setOpen(true);
    onPickerOpen?.();
  }, [onPickerOpen, open]);

  const closePicker = useCallback(() => {
    if (!open) return;

    setOpen(false);
    onPickerClose?.();
  }, [onPickerClose, open]);

  const togglePicker = useCallback(() => {
    if (open) {
      setOpen(false);
      onPickerClose?.();
    } else {
      setOpen(true);
      onPickerOpen?.();
    }
  }, [onPickerClose, onPickerOpen, open]);

  return { open, setOpen, openPicker, closePicker, togglePicker };
};

export default useDatePickerState;
