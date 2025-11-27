import { useRef, useEffect } from "react";

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

  const validationCounterRef = useRef(0);
  const previousMessageRef = useRef<string>("");

  useEffect(() => {
    if (currentValidationMessage !== previousMessageRef.current) {
      if (currentValidationMessage) {
        validationCounterRef.current += 1;
      }
      previousMessageRef.current = currentValidationMessage;
    }
  }, [currentValidationMessage]);

  const hasValidation = [error, warning, info].some(
    (validation) => validation && typeof validation === "string",
  );

  const validationId = hasValidation
    ? `${id}-validation-${validationCounterRef.current}`
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
