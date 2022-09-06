export default function useInputAccessibility({
  id,
  error,
  warning,
  info,
  label,
  fieldHelp,
}: {
  id: string;
  error?: string | boolean;
  warning?: string | boolean;
  info?: string | boolean;
  label?: React.ReactNode;
  fieldHelp?: React.ReactNode;
}): {
  labelId?: string;
  validationIconId?: string;
  fieldHelpId?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
} {
  const labelId = label ? `${id}-label` : undefined;

  const validationIconId = [error, warning, info].filter(
    (validation) => validation && typeof validation === "string"
  ).length
    ? `${id}-validation-icon`
    : undefined;

  const fieldHelpId = fieldHelp ? `${id}-field-help` : undefined;

  const ariaDescribedBy = [fieldHelpId, validationIconId]
    .filter(Boolean)
    .join(" ");

  const ariaLabelledBy = labelId;

  return {
    labelId,
    validationIconId,
    fieldHelpId,
    ariaDescribedBy,
    ariaLabelledBy,
  };
}
