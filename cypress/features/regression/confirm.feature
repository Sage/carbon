Feature: Confirm component
  I want to check Confirm component properties

  @positive
  Scenario Outline: Change cancelLabel in inner context in Confirm dialog to <cancelLabel>
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then cancel button content on preview is <cancelLabel>
    Examples:
      | cancelLabel                  | nameOfObject                |
      | mp150ú¿¡üßä                  | cancelLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | cancelLabelSpecialCharacter |

  @positive
  Scenario Outline: Change confirmLabel in inner context in Confirm dialog to <confirmLabel>
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then confirm button content on preview is <confirmLabel>
    Examples:
      | confirmLabel                 | nameOfObject                 |
      | mp150ú¿¡üßä                  | confirmLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | confirmLabelSpecialCharacter |

  @positive
  Scenario Outline: Change title in Confirm dialog to <title>
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then dialog title context on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change subtitle in Confirm dialog to <subtitle>
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then dialog subtitle context is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change the height of Confirm dialog to <height>
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then Confirm dialog input height is <height>
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 10     | height10     |
      | 999    | height999    |
      | 1500   | height1500   |

  @positive
  Scenario Outline: Change the size of Confirm dialog to <sizeName>
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
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
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @positive
  Scenario Outline: <icon> icon on the header
    When I open default "Confirm Test" component in noIFrame with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then <icon> icon is displayed on the header
    Examples:
      | icon    | nameOfObject |
      | error   | iconError    |
      | warning | iconWarning  |
      | empty   | default      |

  @positive
  Scenario: Cancel button type is set to tertiary
    Given I open "Confirm" component page "cancel button type" in no iframe
    When I open component preview in noIFrame
    Then cancel button type is set to "tertiary"

  @positive
  Scenario: Buttons have destructive CSS properties
    Given I open "Confirm" component page "destructive" in no iframe
    When I open component preview in noIFrame
    Then cancel button type is set to "destructive"
      And confirm button type is set to "destructive"

  @positive
  Scenario: Cancel button is disabled
    Given I open "Confirm" component page "disable cancel" in no iframe
    When I open component preview in noIFrame
    Then "cancel" button is disabled

  @positive
  Scenario: Confirm button is disabled
    Given I open "Confirm" component page "disable confirm" in no iframe
    When I open component preview in noIFrame
    Then "confirm" button is disabled

  @positive
  Scenario: Confirm button is in loading state
    Given I open "Confirm" component page "is loading confirm" in no iframe
    When I open component preview in noIFrame
    Then confirm button type is set to "isLoadingConfirm"