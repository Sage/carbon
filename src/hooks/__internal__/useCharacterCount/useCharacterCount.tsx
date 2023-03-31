import React, { useMemo, useRef } from "react";
import CharacterCount from "../../../__internal__/character-count";
import useLocale from "../useLocale";
import guid from "../../../__internal__/utils/helpers/guid";

const useCharacterCount = (
  value = "",
  characterLimit?: number,
  enforceCharacterLimit = true
): [
  number | undefined,
  JSX.Element | null,
  string | undefined,
  string | null
] => {
  const isCharacterLimitValid =
    typeof characterLimit === "number" && !Number.isNaN(characterLimit);
  const l = useLocale();
  const hintString = l.characterCount.hintString();
  const hintId = useRef(guid());
  const isOverLimit = useMemo(() => {
    if (value && isCharacterLimitValid) {
      return value.length > characterLimit;
    }
    return false;
  }, [value, characterLimit, isCharacterLimitValid]);

  return [
    enforceCharacterLimit && isCharacterLimitValid ? characterLimit : undefined,
    isCharacterLimitValid ? (
      <CharacterCount
        isOverLimit={isOverLimit}
        value={value.length}
        limit={characterLimit}
        data-element="character-limit"
      />
    ) : null,
    hintId.current,
    isCharacterLimitValid ? hintString : null,
  ];
};

export default useCharacterCount;
