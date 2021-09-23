Feature: Confirm component
  I want to check Confirm component properties

  @positive
  Scenario Outline: Change cancelLabel in inner context in Confirm dialog to <cancelLabel>
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then cancel button content on preview is <cancelLabel>
    Examples:
      | cancelLabel                  | nameOfObject                |
      | mp150ú¿¡üßä                  | cancelLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | cancelLabelSpecialCharacter |

  @positive
  Scenario Outline: Change confirmLabel in inner context in Confirm dialog to <confirmLabel>
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then confirm button content on preview is <confirmLabel>
    Examples:
      | confirmLabel                 | nameOfObject                 |
      | mp150ú¿¡üßä                  | confirmLabelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | confirmLabelSpecialCharacter |

  @positive
  Scenario Outline: Change title in Confirm dialog to <title>
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then dialog title context on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change subtitle in Confirm dialog to <subtitle>
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then dialog subtitle context is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Change the height of Confirm dialog to <height> but not bigger than viewportHeight
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then Confirm dialog input height is <height>
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 10     | height10     |
      | 999    | height999    |
      | 1500   | height1500   |

  @positive
  Scenario Outline: Change the size of Confirm dialog to <sizeName>
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
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
  Scenario Outline: <icon> icon on the header
    When I open default "Confirm Test" component with "confirm" json from "commonComponents" using "<nameOfObject>" object name
    Then <icon> icon is displayed on the header
    Examples:
      | icon    | nameOfObject |
      | error   | iconError    |
      | warning | iconWarning  |
      | empty   | default      |

  @positive
  Scenario: Cancel button type is set to tertiary
    Given I open "Confirm" component page "cancel button type"
    When I open component preview
    Then cancel button type is set to "tertiary"

  @positive
  Scenario: Buttons have destructive CSS properties
    Given I open "Confirm" component page "destructive"
    When I open component preview
    Then cancel button type is set to "destructive"
      And confirm button type is set to "destructive"

  @positive
  Scenario: Cancel button is disabled
    Given I open "Confirm" component page "disable cancel"
    When I open component preview
    Then "cancel" button is disabled

  @positive
  Scenario: Confirm button is disabled
    Given I open "Confirm" component page "disable confirm"
    When I open component preview
    Then "confirm" button is disabled

  @positive
  Scenario: Confirm button is in loading state
    Given I open "Confirm" component page "is loading confirm"
    When I open component preview
    Then confirm button type is set to "isLoadingConfirm"

  @positive
  Scenario: Disable escape key
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "disableEscKey" object name
    When I hit ESC key
    Then Confirm dialog is visible

  @positive
  Scenario: Enable escape key
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "enabledEscKey" object name
    When I hit ESC key
    Then Confirm dialog is not visible

  @positive
  Scenario: Close icon enabled
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "showCloseIcon" object name
    When I click closeIcon
    Then Confirm dialog is not visible

  @positive
  Scenario: Confirm dialog should dissapear after click onto cancelButton
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "default" object name
    When I click on a cancelButton
    Then Confirm dialog is not visible

  @positive
  Scenario: Confirm dialog should dissapear after click onto confirmButton
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "default" object name
    When I click on a confirmButton
    Then Confirm dialog is not visible

  @positive
  Scenario: Verify that there is no possibility to close Confirm when cancelButton is disabled via click on cancel button
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "disableCancel" object name
    When I click on a cancelButton
    Then Confirm dialog is visible

  @positive
  Scenario: Verify that there is no possibility to close Confirm when cancelButton is disabled via ESC key
    Given I open default "Confirm Test" component with "confirm" json from "commonComponents" using "disableCancelTrue" object name
    When I hit ESC key
    Then Confirm dialog is visible

  @ignore
  # test ignored until we resolve issue with close icon
  Scenario: Verify that there is no possibility to close Confirm when cancelButton is disabled via click on close icon
    Given I check disableCancel checkbox
    When I click closeIcon
    Then Confirm dialog is visible

  @positive
  Scenario: Verify the confirm action for Confirm dialog
    Given I open "Confirm Test" component page "default"
    When I click on a confirmButton
    Then confirm action was called in Actions Tab

  @positive
  Scenario: Verify the cancel action for Confirm dialog
    Given I open "Confirm Test" component page "default"
    When I click on a cancelButton
    Then cancel action was called in Actions Tab