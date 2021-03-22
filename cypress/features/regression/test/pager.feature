Feature: Pager component
  I want to test Pager component properties

  @positive
  Scenario Outline: Set totalRecords to <totalRecords>
    When I open Test default "Pager" component in noIFrame with "pager" json from "test" using "<nameOfObject>" object name
    Then totalRecords is set to "<totalRecords>" items
      And I am on 1st of "<maxPages>" pages
    Examples:
      | totalRecords | maxPages | nameOfObject      |
      | 0            | 0        | totalRecords0     |
      | 10           | 1        | totalRecords10    |
      | 100          | 10       | totalRecords100   |
      | 111          | 12       | totalRecords111   |
      | 1000         | 100      | totalRecords1000  |
      | 99999        | 10000    | totalRecords99999 |

  @positive
  Scenario: Set totalRecords to 1 and check spell of item word
    When I open Test default "Pager" component in noIFrame with "pager" json from "test" using "totalRecords1" object name
    Then totalRecords is set to "1" item
      And I am on 1st of "1" pages

  @negative
  Scenario Outline: Set totalRecords out of scope to <totalRecords>
    When I open Test default "Pager" component in noIFrame with "pager" json from "test" using "<nameOfObject>" object name
    Then totalRecords is set to "<totalRecords>" items
      And I am on 1st of "1" pages
    Examples:
      | totalRecords | nameOfObject     |
      | -1           | totalRecords-1   |
      | -10          | totalRecords-10  |
      | -100         | totalRecords-100 |

  @negative
  Scenario Outline: Set totalRecords out of scope to <totalRecords>
    When I open Test default "Pager" component in noIFrame with "pager" json from "test" using "<nameOfObject>" object name
    Then totalRecords is set to "" items
      And I am on 1st of "1" pages
    Examples:
      | totalRecords                 | nameOfObject                 |
      | mp150ú¿¡üßä                  | totalRecordsOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | totalRecordsSpecialCharacter |

  @positive
  Scenario Outline: Set pageSize to <pageSize> items
    When I open Test default "Pager" component in noIFrame with "pager" json from "test" using "<nameOfObject>" object name
    Then pageSize is set to "<pageSize>" items
      And I am on 1st of "<maxPages>" pages
    Examples:
      | pageSize | maxPages | nameOfObject |
      | 10       | 10       | pageSize10   |
      | 25       | 4        | pageSize25   |
      | 50       | 2        | pageSize50   |
      | 100      | 1        | pageSize100  |

  @positive
  Scenario: Set pageSize to 1 item
    When I open Test default "Pager" component in noIFrame with "pager" json from "test" using "pageSize1" object name
    Then pageSize is set to "1" item
      And I am on 1st of "100" pages

  @positive
  Scenario Outline: Pagination <button> button is disabled after clicking on last button
    Given I open Test default "Pager" component in noIFrame with "pager" json from "test" using "default" object name
    When I click "last" pagination button
    Then pagination "<button>" button is disabled
    Examples:
      | button |
      | next   |
      | last   |

  @positive
  Scenario Outline: Pagination <button> button is disabled after clicking on first button
    Given I open Test default "Pager" component in noIFrame with "pager" json from "test" using "default" object name
      And I click "last" pagination button
    When I click "first" pagination button
    Then pagination "<button>" button is disabled
    Examples:
      | button   |
      | first    |
      | previous |

  @positive
  Scenario Outline: Pagination <button> button is disabled after previous paginate
    Given I open Test default "Pager" component in noIFrame with "pager" json from "test" using "default" object name
      And I type "10" to input pagination
    When I press previous button 9 times
    Then pagination "<button>" button is disabled
    Examples:
      | button   |
      | first    |
      | previous |

  @positive
  Scenario Outline: Pagination <button> button is disabled after clicking next button
    Given I open Test default "Pager" component in noIFrame with "pager" json from "test" using "default" object name
    When I press next button 9 times
    Then pagination "<button>" button is disabled
    Examples:
      | button |
      | next   |
      | last   |

  @positive
  Scenario: Pagination input has golden border
    Given I open "Design System Pager" component page "default story" in no iframe
    When I click on pagination input
    Then pagination input has golden border

  @positive
  Scenario: Current page displays 0 when zero pages
    Given I open "Design System Pager" component page "loading state" in no iframe
      And I click on pagination input
    When I hit Tab key 1 time in no Iframe
    Then Current page input is set to 0