export interface FormattingButtonProps {
  isActive: boolean;
}

export interface ListFormattingButtonProps extends FormattingButtonProps {
  setPairedButtonState: () => void;
}
