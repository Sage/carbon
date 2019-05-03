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
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario Outline: Change Alert subtitle
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
  Scenario Outline: Change Alert children
    When I set children to "<children>"
      And I open component preview
    Then Alert children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      | <>                       |

  @positive
  Scenario: Enable background UI
    When I check enableBackgroundUI
      And I open component preview
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    When I check enableBackgroundUI
      And I uncheck enableBackgroundUI
      And I open component preview
    Then Background UI is disabled

  @positive
  Scenario: Disable escape key
    When I check disableEscKey
      And I open component preview
      And I hit ESC key
    Then Alert is visible

  @negative
  Scenario: Enable escape key
    When I uncheck disableEscKey
      And I open component preview
      And I hit ESC key
    Then Alert is not visible

  @positive
  Scenario Outline: Set height for Alert dialog
    When I set height to "<height>"
      And I open component preview
    Then Alert height is set to "<height>"
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
    Then Alert height is set to "<height>"
    Examples:
      | height                   |
      | -1                       |
      | -10                      |
      | 1!@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario: ShowCloseIcon can close Alert
    When I enable showCloseIcon
      And I open component preview
    Then closeIcon is visible
      And I click closeIcon
      And Alert is not visible

  @negative
  Scenario: ShowCloseIcon is disabled
    When I disable showCloseIcon
      And I open component preview
    Then closeIcon is not visible

  @positive
  Scenario Outline: Set Alert size to small, medium and large
    When I set component size to "<sizeName>"
      And I open component preview
    Then Alert size property on preview is "<sizePropertyInPx>"
    Examples:
      | sizeName     | sizePropertyInPx |
      | extra-small  |       300        |
      | small        |       380        |
      | medium-small |       540        |
      | medium       |       750        |
      | medium-large |       850        |
      | large        |       960        |
      | extra-large  |       1080       |