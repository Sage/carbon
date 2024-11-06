export default function useInputAccessibility({
  id,
  validationRedesignOptIn,
  error,
  warning,
  info,
  label,
  fieldHelp,
}: {
  id: string;
  validationRedesignOptIn?: boolean;
  error?: string | boolean;
  warning?: string | boolean;
  info?: string | boolean;
  label?: React.ReactNode;
  fieldHelp?: React.ReactNode;
}): {
  labelId?: string;
  validationId?: string;
  fieldHelpId?: string;
  ariaDescribedBy?: string;
} {
  const labelId = label ? `${id}-label` : undefined;

  const validationId = [error, warning, info].filter(
    (validation) => validation && typeof validation === "string",
  ).length
    ? `${id}-validation`
    : undefined;

  const fieldHelpId = fieldHelp ? `${id}-field-help` : undefined;
  const descriptionList = fieldHelpId ? [fieldHelpId] : [];

  if (validationRedesignOptIn && validationId) {
    descriptionList.push(validationId);
  }

  const ariaDescribedBy = descriptionList.length
    ? descriptionList.filter(Boolean).join(" ")
    : undefined;

  return {
    labelId,
    validationId,
    fieldHelpId,
    ariaDescribedBy,
  };
}
