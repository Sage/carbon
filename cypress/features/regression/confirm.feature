Feature: Confirm component
  I want to check Confirm component properties

  @positive
  Scenario Outline: Change cancelLabel in inner context in Confirm dialog to <cancelLabel>
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then cancel button content on preview is <cancelLabel>
    Examples:
      | cancelLabel             | nameOfObject                |
      | mp150ú¿¡üßä             | cancelLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | cancelLabelSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change confirmLabel in inner context in Confirm dialog to <confirmLabel>
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then confirm button content on preview is <confirmLabel>
    Examples:
      | confirmLabel            | nameOfObject                 |
      | mp150ú¿¡üßä             | confirmLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | confirmLabelSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change title in Confirm dialog to <title>
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then dialog title context on preview is <title>
    Examples:
      | title                   | nameOfObject          |
      | mp150ú¿¡üßä             | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | titleSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change subtitle in Confirm dialog to <subtitle>
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then dialog subtitle context is <subtitle>
    Examples:
      | subtitle                | nameOfObject             |
      | mp150ú¿¡üßä             | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{} | subtitleSpecialCharacter |
  # @ignore because of FE-2782
  # | &"'<>|

  @positive
  Scenario Outline: Change the height of Confirm dialog to <height>
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then Confirm dialog input height is <height>
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 10     | height10     |
      | 999    | height999    |
      | 1500   | height1500   |

  @positive
  Scenario Outline: Change the size of Confirm dialog to <sizeName>
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then Confirm dialog size property on preview is <sizePropertyInPx>
    Examples:
      | sizeName     | sizePropertyInPx | nameOfObject    |
      | extra-small  | 300              | sizeExtraSmall  |
      | small        | 380              | sizeSmall       |
      | medium-small | 540              | sizeMediumSmall |
      | medium       | 750              | sizeMedium      |
      | medium-large | 850              | sizeMediumLarge |
      | large        | 960              | sizeLarge       |
      | extra-large  | 1080             | sizeExtraLarge  |

  @positive
  Scenario: Enable background UI
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "enableBackgroundUIFalse" object name
    Then Background UI is disabled

  @negative
  Scenario: Close icon disabled
    When I open default "Confirm" component in noIFrame with "confirm" json from "commonComponents" using "enableBackgroundUIFalse" object name
    Then Close icon is not visible