import { useEffect, useState } from "react";
import usePrevious from "../usePrevious";

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

  const currentValidationMessage =
    (typeof error === "string" && error) ||
    (typeof warning === "string" && warning) ||
    (typeof info === "string" && info) ||
    "";

  const [validationCounter, setValidationCounter] = useState(1);
  const previousMessage = usePrevious(currentValidationMessage);

  useEffect(() => {
    if (
      previousMessage !== undefined &&
      currentValidationMessage &&
      currentValidationMessage !== previousMessage
    ) {
      setValidationCounter((count) => count + 1);
    }
  }, [currentValidationMessage, previousMessage]);

  const validationId = [error, warning, info].filter(
    (validation) => validation && typeof validation === "string",
  ).length
    ? `${id}-validation-${validationCounter}`
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
