export interface FormattingButtonProps {
  /** Whether the button is active or not, relative to the text at the current cursor position */
  isActive: boolean;
  /** The namespace of the editor that this button belongs to */
  namespace: string;
}
