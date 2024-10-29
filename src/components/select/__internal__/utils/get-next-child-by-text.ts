import React from "react";

function findElementStartingWithText(
  textToMatch: string,
  list: React.ReactElement[],
) {
  return list.findIndex((child) => {
    return child.props.text
      ?.toLowerCase()
      .startsWith(textToMatch.toLowerCase());
  });
}

function getListOfMatches(
  arrayOfChildren: React.ReactElement[],
  lastCharacter: string,
) {
  return arrayOfChildren.reduce((acc: number[], child, index) => {
    if (
      child.props.text &&
      child.props.text.toLowerCase().startsWith(lastCharacter.toLowerCase())
    ) {
      acc.push(index);
    }

    return acc;
  }, []);
}

function getIndexOfNextElement(listOfMatches: number[], previousIndex: number) {
  const isLastIndex = previousIndex === listOfMatches[listOfMatches.length - 1];

  if (isLastIndex) {
    return listOfMatches[0];
  }

  return listOfMatches[listOfMatches.indexOf(previousIndex) + 1];
}

/**
 * Recreates HTML Select element functionality of finding first match based on typed characters
 * */
export default function getNextChildByText(
  textToMatch: string,
  arrayOfChildren: React.ReactElement[],
  previousIndex = -1,
) {
  const lastCharacter = textToMatch.slice(-1);
  const isTheSameCharacter = textToMatch
    .split("")
    .every((character) => character === lastCharacter);
  let indexOfMatch = findElementStartingWithText(textToMatch, arrayOfChildren);
  const listOfMatches = getListOfMatches(arrayOfChildren, lastCharacter);

  if (isTheSameCharacter && listOfMatches.length > 1) {
    indexOfMatch = getIndexOfNextElement(listOfMatches, previousIndex);
  }

  return arrayOfChildren[indexOfMatch];
}
