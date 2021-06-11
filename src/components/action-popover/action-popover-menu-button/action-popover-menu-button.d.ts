export interface ActionPopoverMenuButtonProps {
  children?: string;
  buttonType?: string;
  iconType?: string;
  iconPosition?: string;
  size?: string;
}

declare function ActionPopoverMenuButton(
  props: ActionPopoverMenuButtonProps
): JSX.Element;

export default ActionPopoverMenuButton;
