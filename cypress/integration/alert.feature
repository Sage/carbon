Feature: Alert component
  I want to change Alert component properties

  Background: Open Alert component page
    Given I open "Alert" component page with button

  @positive
  Scenario Outline: Change Alert component title
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
  Scenario Outline: Change Alert subtitle
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
  Scenario Outline: Change Alert children
    When I set children to "<children>"
      And I open component preview
    Then Alert children on preview is "<children>"
    Examples:
      | children                 |
      | Example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |

  @positive
  Scenario: Enable background UI
    When I check enableBackgroundUI
      And I open component preview
    Then Background UI is enabled

  @negative
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

  @negative
  Scenario: Enable escape key
    When I uncheck disableEscKey
      And I open component preview
      And I hit ESC key
    Then dialog is not visible

  @positive
  Scenario Outline: Set height for Alert dialog
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
  Scenario Outline: Set out of scope characters to height for Alert dialog
    When I set height to "<height>"
      And I open component preview
    Then Dialog height is not set to "<height>"
    Examples:
      | height                   |
      | -1                       |
      | -10                      |
      | 1!@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: ShowCloseIcon can close Alert
    When I enable showCloseIcon
      And I open component preview
    Then CloseIcon is visible
      And I click CloseIcon
      And dialog is not visible

  @negative
  Scenario: ShowCloseIcon is disabled
    When I disable showCloseIcon
      And I open component preview
    Then CloseIcon is not visible

  @positive
  Scenario Outline: Set Alert size to small, medium and large
    When I set component size to "<size>"
      And I open component preview
    Then Dialog size property on preview is "<size>"
    Examples:
      | size         |
      | extra-small  |
      | small        |
      | medium-small |
      | medium       |
      | medium-large |
      | large        |
      | extra-large  |
