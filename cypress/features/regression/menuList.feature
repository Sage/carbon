Feature: MenuList component
  I want to test MenuList component default properties

  @positive
  Scenario Outline: Change MenuList title to <title>
    When I open basic "MenuList Test" component in noIFrame with "menuList" json from "commonComponents" using "<nameOfObject>" object name
    Then title on preview is <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @ignore
  # @positive doesn't work on Carbon Demo site
  Scenario Outline: Change MenuList filterPlaceholder to <text>
    Given I open basic "MenuList Test" component in noIFrame with "menuList" json from "commonComponents" using "<nameOfObject>" object name
    When I set filterPlaceholder to <filterPlaceholder> word
    Then filterPlaceholder on preview is <filterPlaceholder>
    Examples:
      | filterPlaceholder            | nameOfObject                      |
      | mp150ú¿¡üßä                  | filterPlaceholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | filterPlaceholderSpecialCharacter |

  @positive
  Scenario: Disable collapsible
    Given I open basic "MenuList Test" component in noIFrame with "menuList" json from "commonComponents" using "collapsibleFalse" object name
    When I click into title
    Then MenuList component is expanded

  @positive
  Scenario: Enable collapsible
    Given I open basic "MenuList Test" component in noIFrame with "menuList" json from "commonComponents" using "collapsible" object name
    When I click into title
    Then MenuList component is not expanded

  @positive
  Scenario Outline: Check search field
    Given I open "MenuList Test" component page "basic"
      And I click into menu item second element in Iframe
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