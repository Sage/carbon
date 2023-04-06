import React from "react";

import StyledCharacterCount from "./character-count.style";
import useLocale from "../../hooks/__internal__/useLocale";

interface CharacterCountProps {
  value: number;
  limit: number;
  isOverLimit: boolean;
  "data-element"?: string;
}

const CharacterCount = ({
  value,
  limit,
  isOverLimit,
  "data-element": dataElement,
}: CharacterCountProps) => {
  const limitMinusValue: number = +limit - +value;
  const valueMinusLimit: number = +value - +limit;
  const l = useLocale();

  const getFormatNumber = (rawValue: number, locale: string) =>
    new Intl.NumberFormat(locale).format(rawValue);

  return (
    <StyledCharacterCount
      aria-live="polite"
      isOverLimit={isOverLimit}
      data-element={dataElement}
    >
      {!isOverLimit
        ? l.characterCount.charactersLeft(
            limitMinusValue,
            getFormatNumber(limitMinusValue, l.locale())
          )
        : l.characterCount.tooManyCharacters(
            valueMinusLimit,
            getFormatNumber(valueMinusLimit, l.locale())
          )}
    </StyledCharacterCount>
  );
};

export default CharacterCount;
