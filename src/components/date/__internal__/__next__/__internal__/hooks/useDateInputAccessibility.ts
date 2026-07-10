import type React from "react";
import { useRef } from "react";

import guid from "../../../../../../__internal__/utils/helpers/guid";
import useInputAccessibility from "../../../../../../hooks/__internal__/useInputAccessibility/useInputAccessibility";
import useRegisterValidationToTabs from "../../../../../../hooks/__internal__/useRegisterValidationToTabs/useRegisterValidationToTabs";
import useUniqueId from "../../../../../../hooks/__internal__/useUniqueId";

interface UseDateInputAccessibilityProps {
  ariaDescribedBy?: string;
  error?: string | boolean;
  id?: string;
  inputHint?: React.ReactNode;
  label?: string;
  labelId?: string;
  name?: string;
  prefix?: string;
  warning?: string | boolean;
}

const useDateInputAccessibility = ({
  ariaDescribedBy: ariaDescribedByProp,
  error,
  id,
  inputHint,
  label,
  labelId: labelIdProp,
  name,
  prefix,
  warning,
}: UseDateInputAccessibilityProps) => {
  const [inputId, inputName] = useUniqueId(id, name);
  const hintId = useRef(guid());
  const inputHintId = inputHint ? hintId.current : undefined;
  const inputPrefixId = prefix ? `${inputId}-prefix` : undefined;

  const {
    labelId: generatedLabelId,
    validationId,
    ariaDescribedBy,
  } = useInputAccessibility({
    id: inputId,
    validationRedesignOptIn: true,
    error,
    warning,
    label,
  });

  const inputAriaDescribedBy = [
    inputHintId,
    inputPrefixId,
    ariaDescribedBy,
    ariaDescribedByProp,
  ]
    .filter(Boolean)
    .join(" ");

  useRegisterValidationToTabs(!!error, !!warning, inputId);

  return {
    inputAriaDescribedBy,
    inputHintId,
    inputId,
    inputName,
    inputPrefixId,
    labelId: labelIdProp || generatedLabelId,
    validationId,
  };
};

export default useDateInputAccessibility;
