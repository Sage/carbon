Feature: Table classic component
  I want to change Table classic component properties

  Background: Open Table component page classic
    Given I open "Table" component page classic

  @positive
  Scenario Outline: TotalRecords is set to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then totalRecords is set to "<totalRecords>" records
    Examples:
      | totalRecords |
      | 0            |
      | 1            |
      | 10           |
      | 100          |
      | 99999999     |
      | -1           |
      | -10          |

  @positive
  Scenario Outline: TotalRecords is set out of scope to <totalRecords>
    When I set totalRecords to "<totalRecords>"
      And I check paginate checkbox
    Then totalRecords is set to "" records
    Examples:
      | totalRecords            |
      | Sample text             |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      | <>                      |

  @positive
  Scenario Outline: Change action was called after clicking <arrow> button
    Given I check paginate checkbox
    When clear all actions in Actions Tab
      And I click "<arrow>" pagination arrow
    Then change action was called in Actions Tab
    Examples:
      | arrow         |
      | nextArrow     |
      | previousArrow |

  @positive
  Scenario: Verify action toolbar elements
    Given I check selectable checkbox
    When I check checkbox on header
    Then Action Toolbar elemens are visible and has "rgb(37, 91, 199)" color