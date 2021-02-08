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
  Scenario: Disable background UI
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "enableBackgroundUIFalse" object name
    Then Background UI is disabled

  # Sticky form footer tests
  @positive
  Scenario: Verify that stickyFormFooter is visible
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "stickyFooter" object name
    Then Dialog stickyFormFooter is visible

  @positive
  Scenario: Verify default story color
    When I open default "Dialog Test" component in noIFrame with "dialog" json from "commonComponents" using "stickyFooter" object name
    Then footer buttons have color "rgb(0, 129, 93)" and has 2 px border

  @positive
  Scenario: Verify that stickyFormFooter is not visible when scrolled to the bottom
    Given I open "Design System Form" component page "In dialog with sticky footer" in no iframe
      And I click on Open Preview button
    When I scroll to the bottom of the dialog
    Then The footer is not sticky