import { ButtonProps } from "../__next__/button.component";

const getIconColor = ({
  inverse,
  variant,
  variantType,
  disabled,
}: Pick<ButtonProps, "inverse" | "variant" | "variantType" | "disabled">) => {
  if (inverse) {
    if (variantType === "primary") {
      return "#000";
    }
    if (disabled) {
      return "rgba(255, 255, 255, 0.42)";
    }
    return "#FFF";
  }

  if (variant === "ai") {
    return disabled
      ? "var(--button-ai-label-disabled, #0000006B)"
      : "var(--button-ai-label-active, #000)";
  }

  if (variantType === "primary") {
    return "var(--button-typical-primary-label-default, #FFF)";
  }

  if (variant === "destructive") {
    return disabled
      ? "var(--button-destructive-secondary-label-disabled, rgba(0, 0, 0, 0.42))"
      : "var(--button-destructive-secondary-label-default, #DB004E)";
  }

  return disabled
    ? "var(--button-typical-secondary-label-disabled, #0000006B)"
    : "var(--button-typical--secondary-label-active, #000)";
};

export default getIconColor;
