Feature: Row component
  I want to change Row component properties

  @positive
  Scenario: Enable columnDivide
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "columnDivide" object name
    Then columnDivide is set

  @positive
  Scenario: Disable columnDivide
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "columnDivideFalse" object name
    Then columnDivide is not set

  @positive
  Scenario Outline: Set columnAlign to <gutter>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then gutter on preview is "<gutter>"
    Examples:
      | gutter       | nameOfObject          |
      | extra-small  | gutterExtraSmall      |
      | small        | gutterSizeSmall       |
      | medium-small | gutterSizeMediumSmall |
      | medium       | gutterSizeMedium      |
      | medium-large | gutterSizeMediumLarge |
      | large        | gutterSizeLarge       |
      | extra-large  | gutterSizeExtraLarge  |

  @positive
  Scenario Outline: Set columnAlign to <direction>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then columnAlign on preview is "<direction>"
    Examples:
      | direction | nameOfObject     |
      | left      | columnAlignLeft  |
      | right     | columnAlignRight |

  @positive
  Scenario Outline: Set columnOffset to <columnOffset>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then columnOffset on preview is <columnOffset>
    Examples:
      | columnOffset | nameOfObject     |
      | -100         | columnOffset-100 |
      | -1           | columnOffset-1   |
      | 0            | columnOffset0    |
      | 1            | columnOffset1    |
      | 100          | columnOffset100  |

  @negative
  Scenario Outline: Set columnOffset out of scope to <columnOffset>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then columnOffset on preview is <columnOffset>
    Examples:
      | columnOffset            | nameOfObject                 |
      | mp150ú¿¡üßä             | columnOffsetOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | columnOffsetSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Set columnSpan to <columnSpan>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then columnSpan on preview is <columnSpan>
    Examples:
      | columnSpan | nameOfObject   |
      | -100       | columnSpan-100 |
      | -1         | columnSpan-1   |
      | 0          | columnSpan0    |
      | 1          | columnSpan1    |
      | 100        | columnSpan100  |

  @positive
  Scenario Outline: Set columnSpan out of scope to <columnSpan>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then columnSpan on preview is <columnSpan>
    Examples:
      | columnSpan              | nameOfObject               |
      | mp150ú¿¡üßä             | columnSpanOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | columnSpanSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|


  @positive
  Scenario Outline: Set children to <children>
    When I open default "Row" component in noIFrame with "row" json from "commonComponents" using "<nameOfObject>" object name
    Then column text is <children>
    Examples:
      | children                | nameOfObject             |
      | mp150ú¿¡üßä             | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | childrenSpecialCharacter |
# @ignore because of FE-2782
# | &"'<>|