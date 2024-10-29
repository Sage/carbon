import React from "react";

import {
  StyledCharacterCountWrapper,
  StyledCharacterCount,
  VisuallyHiddenCharacterCount,
  VisuallyHiddenHint,
} from "./character-count.style";
import useLocale from "../../hooks/__internal__/useLocale";

interface CharacterCountProps {
  ariaLive?: "off" | "polite";
  value: number;
  debouncedValue?: number;
  limit: number;
  isDebouncedOverLimit?: boolean;
  isOverLimit: boolean;
  visuallyHiddenHintId?: string;
}

const CharacterCount = ({
  ariaLive = "off",
  value,
  debouncedValue = value,
  limit,
  isDebouncedOverLimit,
  isOverLimit,
  visuallyHiddenHintId,
}: CharacterCountProps) => {
  const limitMinusValue: number = +limit - +value;
  const valueMinusLimit: number = +value - +limit;
  const debouncedLimitMinusValue: number = +limit - +debouncedValue;
  const debouncedValueMinusLimit: number = debouncedValue - +limit;
  const l = useLocale();

  const getFormatNumber = (rawValue: number, locale: string) =>
    new Intl.NumberFormat(locale).format(rawValue);

  return (
    <StyledCharacterCountWrapper>
      <VisuallyHiddenHint
        data-element="visually-hidden-hint"
        data-role="visually-hidden-hint"
        id={visuallyHiddenHintId}
      >
        {l.characterCount.visuallyHiddenHint(
          getFormatNumber(limit, l.locale()),
        )}
      </VisuallyHiddenHint>
      <StyledCharacterCount
        aria-hidden="true"
        isOverLimit={isOverLimit}
        data-element="character-count"
        data-role="character-count"
      >
        {!isOverLimit
          ? l.characterCount.charactersLeft(
              limitMinusValue,
              getFormatNumber(limitMinusValue, l.locale()),
            )
          : l.characterCount.tooManyCharacters(
              valueMinusLimit,
              getFormatNumber(valueMinusLimit, l.locale()),
            )}
      </StyledCharacterCount>
      <VisuallyHiddenCharacterCount
        data-element="visually-hidden-character-count"
        data-role="visually-hidden-character-count"
        aria-live={ariaLive}
      >
        {!isDebouncedOverLimit
          ? l.characterCount.charactersLeft(
              debouncedLimitMinusValue,
              getFormatNumber(debouncedLimitMinusValue, l.locale()),
            )
          : l.characterCount.tooManyCharacters(
              debouncedValueMinusLimit,
              getFormatNumber(debouncedValueMinusLimit, l.locale()),
            )}
      </VisuallyHiddenCharacterCount>
    </StyledCharacterCountWrapper>
  );
};

export default CharacterCount;
