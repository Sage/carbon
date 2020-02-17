Feature: Button Toggle Group classic component
  I want to change Button Toggle Group input width properties

  Background: Open Button Toggle Group component page classic
    Given I open "Button Toggle Group" component page classic

  @positive
  Scenario Outline: Change Button Toggle Group input width to <width>
    When I check labelInline checkbox
      And I set inputWidth to "<width>"
    Then input width is set to "<px>"
    Examples:
      | width | px         |
      | 1     | 10.75      |
      | 10    | 107.59375  |
      | 100   | 826.265625 |

  @positive
  Scenario Outline: Change Button Toggle Group label width to <width>
    When I check labelInline checkbox
      And I set labelWidth to "<width>"
    Then label width is set to "<width>"
    Examples:
      | width |
      | 1     |
      | 10    |
      | 100   |