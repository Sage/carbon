Feature: Pager component
  I want to change Pager component properties

  Background: Open Pager component page
    Given I open "Pager" component page

  @positive
  Scenario Outline: Set totalRecords to <totalRecords>
    When I set totalRecords to "<totalRecords>"
    Then totalRecords is set to "<totalRecords>"
      And I am on 1st of "<maxPages>" pages
    Examples:
      | totalRecords | maxPages |
      | 0            | 1        |
      | 1            | 1        |
      | 10           | 1        |
      | 100          | 10       |
      | 111          | 12       |
      | 1000         | 100      |
      | 99999        | 10000    |

  @negative
  Scenario Outline: Set totalRecords out of scope
    When I set totalRecords to "<totalRecords>"
    Then totalRecords is set to "0"
      And I am on 1st of "1" pages
    Examples:
      | totalRecords |
      | -1           |
      | -10          |
      | -100         |

  @negative
  Scenario Outline: Set totalRecords out of scope
    When I set totalRecords to "<totalRecords>"
    Then totalRecords is set to ""
      And I am on 1st of "1" pages
    Examples:
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set pageSize to <pageSize>
    When I select pageSize to "<pageSize>"
      And I check showPageSizeSelection checkbox
    Then pageSize is set to "<pageSize>"
      And I am on 1st of "<maxPages>" pages
    Examples:
      | pageSize | maxPages |
      | 10       | 10       |
      | 25       | 4        |
      | 50       | 2        |

  @positive
  Scenario: Enable showPageSizeSelection and verify default value
    When I check showPageSizeSelection checkbox
    Then pageSize is visible
      And pageSize is set to "10"

  @positive
  Scenario: Enable and disable showPageSizeSelection
    When I check showPageSizeSelection checkbox
      And I uncheck showPageSizeSelection checkbox
    Then pageSize is not visible

  @positive
  Scenario: Pagination previous arrow is disabled
    #  When I open "Pager" component page
    Then previous pagination arrow is disabled

  @positive
  Scenario: Pagination next arrow is disabled
    When I paginate next 9 times
    Then next pagination arrow is disabled

  @positive
  Scenario: Pagination previous arrow is disabled after previous paginate
    When I type "10" to input pagination
      And I paginate previous 9 times
    Then previous pagination arrow is disabled

  @positive
  Scenario: Pagination previous and next arrow are disabled
    When I set totalRecords to "1"
      And I select pageSize to "10"
    Then previous pagination arrow is disabled
      And next pagination arrow is disabled

