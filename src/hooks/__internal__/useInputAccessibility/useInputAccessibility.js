export default function useInputAccessibility({
  id,
  error,
  warning,
  info,
  label,
  labelHelp,
  fieldHelp,
}) {
  const labelId = label ? `${id}-label` : undefined;

  const tooltipId = [error, warning, info, labelHelp].filter(
    (validation) => typeof validation === "string"
  ).length
    ? `${id}-tooltip`
    : undefined;

  const fieldHelpId = fieldHelp ? `${id}-field-help` : undefined;

  const ariaDescribedBy = [fieldHelpId, tooltipId].filter(Boolean).join(" ");

  const ariaLabelledBy = labelId;

  return {
    labelId,
    tooltipId,
    fieldHelpId,
    ariaDescribedBy,
    ariaLabelledBy,
  };
}
