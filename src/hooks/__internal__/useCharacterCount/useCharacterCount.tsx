import React, { useMemo, useRef, useEffect, useState } from "react";
import CharacterCount from "../../../__internal__/character-count";
import guid from "../../../__internal__/utils/helpers/guid";
import useDebounce from "../useDebounce";

const useCharacterCount = (
  value = "",
  characterLimit?: number,
  characterCountAriaLive?: "off" | "polite",
): [JSX.Element | null, string | undefined] => {
  const isCharacterLimitValid =
    typeof characterLimit === "number" && !Number.isNaN(characterLimit);

  const [debouncedValue, setDebouncedValue] = useState(value);
  const debounceWaitTime = 2000;

  const updateDebouncedValue = useDebounce((newValue) => {
    setDebouncedValue(newValue);
  }, debounceWaitTime);

  useEffect(() => {
    if (characterLimit) {
      updateDebouncedValue(value);
    }
  }, [value, characterLimit, updateDebouncedValue]);

  const hintId = useRef(guid());
  const isOverLimit = useMemo(() => {
    if (value && isCharacterLimitValid) {
      return value.length > characterLimit;
    }
    return false;
  }, [value, characterLimit, isCharacterLimitValid]);

  const isDebouncedOverLimit = useMemo(() => {
    if (debouncedValue && isCharacterLimitValid) {
      return debouncedValue.length > characterLimit;
    }
    return false;
  }, [debouncedValue, characterLimit, isCharacterLimitValid]);

  return [
    isCharacterLimitValid ? (
      <CharacterCount
        ariaLive={characterCountAriaLive}
        isOverLimit={isOverLimit}
        isDebouncedOverLimit={isDebouncedOverLimit}
        value={value.length}
        debouncedValue={debouncedValue.length}
        limit={characterLimit}
        visuallyHiddenHintId={hintId.current}
      />
    ) : null,
    isCharacterLimitValid ? hintId.current : undefined,
  ];
};

export default useCharacterCount;
