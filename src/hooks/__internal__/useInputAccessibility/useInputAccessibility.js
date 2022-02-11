export default function useInputAccessibility({
  id,
  error,
  warning,
  info,
  label,
  fieldHelp,
}) {
  const labelId = label ? `${id}-label` : undefined;

  const validationIconId = [error, warning, info].filter(
    (validation) => typeof validation === "string"
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
