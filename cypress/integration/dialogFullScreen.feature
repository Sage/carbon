Feature: Dialog Full Screen component
  I want to change Dialog Full Screen component properties

  Background: Open Alert component page
    Given I open "Dialog Full Screen" component page

  @positive
  Scenario Outline: Change Dialog Full Screen component title
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
  Scenario Outline: Change Dialog Full Screen subtitle
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
  Scenario Outline: Change Dialog Full Screen children
    When I set children to "<children>"
      And I open component preview
    Then Dialog Full Screen children on preview is "<children>"
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
      And I hit ESC key on Full Dialog Screen
    Then Dialog Full Screen is visible

  @negative
  Scenario: Enable escape key
    When I uncheck disableEscKey
      And I open component preview
      And I hit ESC key on Full Dialog Screen
    Then Dialog Full Screen is not visible

 @positive
  Scenario: Close icon
    When I open component preview
      And I click close icon
    Then Dialog Full Screen is not visible