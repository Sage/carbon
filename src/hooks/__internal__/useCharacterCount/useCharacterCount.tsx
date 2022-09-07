import React, { useMemo } from "react";
import CharacterCount from "../../../__internal__/character-count";
import useLocale from "../useLocale";

const getFormatNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale).format(value);

const useCharacterCount = (
  value = "",
  characterLimit?: number,
  warnOverLimit = false,
  enforceCharacterLimit = true
): [number | undefined, JSX.Element | null] => {
  const isCharacterLimitValid =
    typeof characterLimit === "number" && !Number.isNaN(characterLimit);
  const l = useLocale();
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
        isOverLimit={isOverLimit && warnOverLimit}
        value={getFormatNumber(value.length, l.locale())}
        limit={getFormatNumber(characterLimit, l.locale())}
        data-element="character-limit"
      />
    ) : null,
  ];
};

export default useCharacterCount;
