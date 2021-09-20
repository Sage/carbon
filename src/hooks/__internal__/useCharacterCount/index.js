import React, { useMemo } from "react";
import CharacterCount from "../../../__internal__/character-count";
import useLocale from "../useLocale";

const getFormatNumber = (value, locale) =>
  new Intl.NumberFormat(locale).format(value);

const useCharacterCount = (
  value,
  characterLimit,
  warnOverLimit = false,
  enforceCharacterLimit = true
) => {
  const l = useLocale();
  const isOverLimit = useMemo(
    () => value && value.length > parseInt(characterLimit, 10),
    [value, characterLimit]
  );

  return [
    enforceCharacterLimit && characterLimit ? characterLimit : undefined,
    characterLimit ? (
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
