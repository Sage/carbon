Feature: Dialog component
  I want to change Dialog component properties

  Background: Open Dialog component page
    Given I open "Dialog" component page

  @positive
  Scenario Outline: Set height for Dialog dialog
    When I set height to "<height>"
      And I open component preview
    Then Dialog height is set to "<height>"
    Examples:
      | height |
      | 0      |
      | 1      |
      | 10     |
      | 100    |

  @negative
  Scenario Outline: Set out of scope characters to height
    When I set height to "<height>"
      And I open component preview
    Then Dialog height is not set to "<height>"
    Examples:
      | height                   |
      | -1                       |
      | -10                      |
      | 1!@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Change Dialog component title
    When I set title to "<title>"
      And I open component preview
    Then component title on preview is "<title>"
    Examples:
      | title                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Dialog subtitle
    When I set subtitle to "<subtitle>"
      And I open component preview
    Then component subtitle on preview is "<subtitle>"
    Examples:
      | subtitle                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Set Dialog size to small, medium and large
    When I set component size to "<sizeName>"
      And I open component preview
    Then Dialog size property on preview is "<sizePropertyInPx>"
    Examples:
      | sizeName     | sizePropertyInPx |
      | extra-small  |       300        |
      | small        |       380        |
      | medium-small |       540        |
      | medium       |       750        |
      | medium-large |       850        |
      | large        |       960        |
      | extra-large  |       1080       |

  @positive
  Scenario: ShowCloseIcon can close Dialog
    When I enable showCloseIcon
      And I open component preview
    Then closeIcon is visible
      And I click closeIcon
      And Dialog is not visible

  @positive
  Scenario: Disable ShowCloseIcon
    When I disable showCloseIcon
      And I open component preview
    Then closeIcon is not visible

  @positive
  Scenario: Enable StickyFormFooter
    When I enable stickyFormFooter
      And I open component preview
    Then stickyFormFooter is enabled

  @positive
  Scenario: Disable StickyFormFooter
    When I enable stickyFormFooter
      And I disable stickyFormFooter
      And I open component preview
    Then stickyFormFooter is disabled

  @positive
  Scenario: Enable background UI
    When I check enableBackgroundUI
      And I open component preview
    Then background UI is enabled

  @positive
  Scenario: Disable background UI
    When I check enableBackgroundUI
      And I uncheck enableBackgroundUI
      And I open component preview
    Then background UI is disabled

  @positive
  Scenario: Disable escape key
    When I check disableEscKey
      And I open component preview
      And I hit ESC key
    Then Dialog is visible

  @positive
  Scenario: Enable escape key
    When I uncheck disableEscKey
      And I open component preview
      And I hit ESC key
    Then Dialog is not visible

  @positive
  Scenario Outline: Click outside Dialog without background and Dialog remains open
    When I uncheck enableBackgroundUI
      And I open component preview
      And I click on "<position>" outside dialog
    Then Dialog is visible
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |

  @positive
  Scenario Outline: Click on background outside Dialog and Dialog remains open
    When I open component preview
      And I click on background "<position>" outside dialog
    Then Dialog is visible
    Examples:
      | position |
      | top      |
      | topRight |
      | right    |