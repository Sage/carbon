Feature: Card component
  I want to test Card component

  @positive
  Scenario: Verify the shadow whithout interactive card
    Given I open "Card" component page "default story"
    Then Card component has non-interactive shadow

  @positive
  Scenario: Verify the interactive card shadow
  Given I open "Card" component page "interactive"
    When I hover mouse onto Card component
    Then Card component has interactive shadow

  @positive
  Scenario Outline: Drag <cardItem> card to the <columnName> column
    Given I open "Card" component page "with draggable"
    When I drag "<cardItem>" Card from the column to "<columnName>" column
    Then "<cardItem>" Card is dragged to "<columnName>" column
      And "1" column has <lengthOfFirstColumn> length
      And "2" column has <lengthOfSecondColumn> length
    Examples:
      | cardItem | columnName | lengthOfFirstColumn | lengthOfSecondColumn |
      | 1        | 2          | 2                   | 2                    |
      | 3        | 1          | 4                   | 0                    |
      | 4        | 2          | 2                   | 2                    |

  @positive
  Scenario: Drag First and Second Cards to the Product Two column
    Given I open "Card" component page "with draggable"
    When I drag "1" Card from the column to "2" column
      And I drag "2" Card from the column to "2" column
    Then "1" Card is dragged to "2" column
      And "2" Card is dragged to "2" column
      And "1" column has 1 length
      And "2" column has 3 length

  @positive
  Scenario: Drag First and Second and Third Cards to the Product Two column
    Given I open "Card" component page "with draggable"
    When I drag "1" Card from the column to "2" column
      And I drag "2" Card from the column to "2" column
      And I drag "4" Card from the column to "2" column
    Then "1" Card is dragged to "2" column
      And "2" Card is dragged to "2" column
      And "4" Card is dragged to "2" column
      And "1" column has 0 length
      And "2" column has 4 length