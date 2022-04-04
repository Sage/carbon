import React, { useMemo } from "react";
import CharacterCount from "../../../__internal__/character-count";
import useLocale from "../useLocale";

const getFormatNumber = (value: number, locale: string) =>
  new Intl.NumberFormat(locale).format(value);

const useCharacterCount = (
  value: string,
  characterLimit?: string,
  warnOverLimit = false,
  enforceCharacterLimit = true
): [string | undefined, JSX.Element | null] => {
  const l = useLocale();
  const isOverLimit = useMemo(() => {
    if (value && characterLimit) {
      return value.length > parseInt(characterLimit, 10);
    }
    return false;
  }, [value, characterLimit]);

  return [
    enforceCharacterLimit && characterLimit ? characterLimit : undefined,
    characterLimit ? (
      <CharacterCount
        isOverLimit={isOverLimit && warnOverLimit}
        value={getFormatNumber(value.length, l.locale())}
        limit={getFormatNumber(+characterLimit, l.locale())}
        data-element="character-limit"
      />
    ) : null,
  ];
};

export default useCharacterCount;
