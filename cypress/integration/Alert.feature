Feature: Alert component
  I want to change Alert component properties

  @positive
  Scenario Outline: Change Alert component title
    Given I open Alert component page
    When I set title to "<title>"
      And I open Alert preview
    Then Alert title on preview is "<title>"
    Examples:
      | title                         |
      | First Label Test              |
      | Second label test             |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                            |
      | <>                             |

  @positive
  Scenario Outline: Change Alert subtitle
    Given I open Alert component page
    When I set subtitle to "<subtitle>"
      And I open Alert preview
    Then Alert subtitle on preview is "<subtitle>"
    Examples:
      | subtitle                 |
      | example subtext          |
      | 1!@#$%^*()_+-=~[];:.,?{} |
      | 汉字                       |
      | <>                       |


  @positive
  Scenario Outline: Change Alert children
    Given I open Alert component page
    When I set children to "<children>"
      And I open Alert preview
    Then Alert children on preview is "<children>"
    Examples:
      | children                 |
      | example subtext          |
  | 1!@#$%^*()_+-=~[];:.,?{} |
  | 汉字                       |
  | <>                       |

  @positive
  Scenario: Enable background UI
    Given I open Alert component page
    When I check enableBackgroundUI
      And I open Alert preview
    Then Background UI is enabled

  @negative
  Scenario: Disable background UI
    Given I open Alert component page
    When I uncheck enableBackgroundUI
      And I open Alert preview
    Then Background UI is disabled

    @positive
  Scenario: Disable escape key
    Given I open Alert component page
    When I check disableEscKey
      And I open Alert preview
      And I hit ESC key
    Then Alert dialog is visible

@negative
Scenario: Enable escape key
  Given I open Alert component page
  When I uncheck disableEscKey
    And I open Alert preview
    And I hit ESC key
  Then Alert dialog is not visible


# @positive
# Scenario Outline: Set hight for Alert dialog
# Given I open Alert component page
# When I set height to "<height>"
# And I open Alert preview
# Then Alert dialog hight is set to "<hight>"




# do not apply storybook
# @positive
#   Scenario: Open checkbox will open Alert dialog
#     Given I open Alert component page
#     When I check open checkbox
#     Then Alert dialog is visible

# @positive
#   Scenario: Close Alert dialog via close icon
#     Given I open Alert component page
#       And I check open checkbox
#     When I click close icon
#     Then Alert dialog is not visible