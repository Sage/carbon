Feature: Dialog component
  I want to test Dialog component properties

  @positive
  Scenario Outline: Set height for Dialog to <height>
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog height is set to <height>
    Examples:
      | height | nameOfObject |
      | 0      | height0      |
      | 1      | height1      |
      | 100    | height100    |

  @negative
  Scenario Outline: Set out of scope characters to <height>
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog height is not set to <height>
    Examples:
      | height                       | nameOfObject           |
      | -1                           | height-1               |
      | -10                          | height-10              |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | heightSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog component title to <title>
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then component title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change Dialog subtitle to <subtitle>
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then component subtitle on preview is <subtitle>
    Examples:
      | subtitle                     | nameOfObject             |
      | mp150ú¿¡üßä                  | subtitleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subtitleSpecialCharacter |

  @positive
  Scenario Outline: Set Dialog size to <sizeName>
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "<nameOfObject>" object name
    Then Dialog size property on preview is "<sizePropertyInPx>"
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
  Scenario: Disable ShowCloseIcon
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "showCloseIconFalse" object name
    Then closeIcon is not visible

  @positive
  Scenario: Enable background UI
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "enableBackgroundUI" object name
    Then Background UI is enabled

  @positive
  Scenario: Verify that stickyFormFooter is not visible when scrolled to the bottom
    Given I open "Design System Form" component page "In dialog with sticky footer" in no iframe
      And I click on Open Preview button
    When I scroll to the bottom of the dialog
    Then The footer is not sticky

  @positive
  Scenario: Disable escape key
    Given I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "disableEscKey" object name
      And I wait 500
    When I hit ESC key in noIframe
    Then Dialog is visible

  @positive
  Scenario: Enable escape key
    Given I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "enabledEscKey" object name
    When I hit ESC key in noIframe
    Then Dialog is not visible

  @positive
  Scenario: ShowCloseIcon can close Dialog
    Given I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "showCloseIcon" object name
      And closeIcon is visible
    When I click closeIcon
      And Dialog is not visible

  @positive
  Scenario Outline: Click outside Dialog without background and Dialog remains open
    Given I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "enableBackgroundUI" object name
    When I click on "<position>" outside dialog
    Then Dialog is visible
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  @positive
  Scenario Outline: Click on background outside Dialog and Dialog remains open
    Given I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "default" object name
    When I click on background "<position>" outside dialog
    Then Dialog is visible
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |