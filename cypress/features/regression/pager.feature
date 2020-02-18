Feature: Pager component
  I want to test Pager component properties

  Background: Open Pager component default page
    Given I open "Pager" component page

  @positive
  Scenario Outline: Set totalRecords to <totalRecords>
    When I set totalRecords to "<totalRecords>"
    Then totalRecords is set to "<totalRecords>" items
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
  Scenario Outline: Set totalRecords out of scope to <totalRecords>
    When I set totalRecords to "<totalRecords>"
    Then totalRecords is set to "<totalRecords>" items
      And I am on 1st of "1" pages
    Examples:
      | totalRecords |
      | -1           |
      | -10          |
      | -100         |

  @negative
  Scenario Outline: Set totalRecords out of scope to <totalRecords>
    When I set totalRecords to "<totalRecords>"
    Then totalRecords is set to "" items
      And I am on 1st of "1" pages
    Examples:
      | totalRecords            |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Set pageSize to <pageSize>
    Given I select pageSize to "<pageSize>"
    When I check showPageSizeSelection checkbox
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
    Given I check showPageSizeSelection checkbox
    When I uncheck showPageSizeSelection checkbox
    Then pageSize is not visible

  @positive
  Scenario Outline: Pagination <button> button is disabled
    # commented because of BDD default scenario Given - When - Then
    #  When I open "Pager" component page
    Then pagination "<button>" button is disabled
    Examples:
      | button   |
      | first    |
      | previous |

  @positive
  Scenario Outline: Pagination <button> button is disabled after clicking on last button
    When I click "last" pagination button
    Then pagination "<button>" button is disabled
    Examples:
      | button |
      | next   |
      | last   |

  @positive
  Scenario Outline: Pagination <button> button is disabled after clicking on first button
    Given I click "last" pagination button
    When I click "first" pagination button
    Then pagination "<button>" button is disabled
    Examples:
      | button   |
      | first    |
      | previous |

  @positive
  Scenario Outline: Pagination <button> button is disabled after previous paginate
    Given I type "10" to input pagination
    When I click previous button 9 times
    Then pagination "<button>" button is disabled
    Examples:
      | button   |
      | first    |
      | previous |

  @positive
  Scenario Outline: Pagination <button> button is disabled after clicking next button
    When I click next button 9 times
    Then pagination "<button>" button is disabled
    Examples:
      | button |
      | next   |
      | last   |

  @positive
  Scenario: Pagination buttons are disabled
    When I set totalRecords to "1"
      And I select pageSize to "10"
    Then pagination buttons are disabled

  @positive
  Scenario: Pagination input has golden border
    When I click on pagination input
    Then pagination input has golden border