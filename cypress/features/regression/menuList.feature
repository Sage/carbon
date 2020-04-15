Feature: MenuList component
  I want to change MenuList component default properties

  Background: Open MenuList component default page
    Given I open "MenuList" component page

  @positive
  Scenario Outline: Change MenuList title to <title>
    When I set title to "<title>"
    Then title on preview is "<title>"
    Examples:
      | title                   |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @ignore
  # @positive doesn't work on Carbon Demo site
  Scenario Outline: Change MenuList filterPlaceholder to <text>
    When I set filterPlaceholder to "<text>"
    Then filterPlaceholder on preview is "<text>"
    Examples:
      | text                    |
      | mp150ú¿¡üßä             |
      | !@#$%^*()_+-=~[];:.,?{} |

  @positive
  Scenario Outline: Check search field
    Given I click into menu item second element
    When I change search parameter to "<parameter>"
    Then search result is "<result>"
      And results count is <resultsCount>
    Examples:
      | parameter | result                                      | resultsCount |
      | Fir       | First Sub Item                              | 1            |
      | Sec       | Second Sub Item                             | 1            |
      | Thi       | Third Sub Item                              | 1            |
      | d         | Second Sub ItemThird Sub Item               | 2            |
      | tem       | First Sub ItemSecond Sub ItemThird Sub Item | 3            |

  @ignore
  # @positive doesn't work on Carbon Demo site
  Scenario: Enable initially open
    When I check initiallyOpen checkbox
    Then MenuList component is expanded

  @ignore
  # @positive doesn't work on Carbon Demo site
  Scenario: Enable and disable innitially open
    Given I check initiallyOpen checkbox
    When I uncheck initiallyOpen checkbox
    Then MenuList component is not expanded

  @positive
  Scenario: Disable filter
    Given I click into menu item second element
    When I uncheck filter checkbox
    Then filter is disabled

  @positive
  Scenario: Disable and enable filter
    Given I uncheck filter checkbox
      And I check filter checkbox
      And I set title to "title"
    When I click into menu item second element
    Then filter is enabled

  @positive
  Scenario: Disable collapsible
    Given I set title to "title"
      And I uncheck collapsible checkbox
    When I click into title
    Then MenuList component is expanded