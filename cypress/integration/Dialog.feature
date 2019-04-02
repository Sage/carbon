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
      | Title Label Test         |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Change Dialog subtitle
    When I set subtitle to "<subtitle>"
      And I open component preview
    Then component subtitle on preview is "<subtitle>"
    Examples:
      | subtitle                 |
      | Example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario Outline: Set Dialog size to small, medium and large
    When I set component size to "<size>"
      And I open component preview
    Then Dialog size property on preview is "<size>"
    Examples:
      | size   |
      | small  |
      | medium |
      | large  |

  @positive
  Scenario: ShowCloseIcon can close Dialog
    When I enable showCloseIcon
      And I open component preview
    Then CloseIcon is visible
      And I click CloseIcon
      And dialog is not visible

  @positive
  Scenario: Disable ShowCloseIcon
    When I disable showCloseIcon
      And I open component preview
    Then CloseIcon is not visible

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
    Then Background UI is enabled

  @positive
  Scenario: Disable background UI
    When I uncheck enableBackgroundUI
      And I open component preview
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    When I check disableEscKey
      And I open component preview
      And I hit ESC key
    Then dialog is visible

  @positive
  Scenario: Enable escape key
    When I uncheck disableEscKey
      And I open component preview
      And I hit ESC key
    Then dialog is not visible
