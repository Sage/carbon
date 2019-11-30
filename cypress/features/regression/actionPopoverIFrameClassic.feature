Feature: Action Popover component classic
  I want to change Alert component properties for classic page

  Background: Open Action Popover component classic page
    Given I open "Action Popover" component for classic story in iframe

  @positive
  Scenario Outline: Open Action Popover element and check <innerText> as inner context
    When I click the menu button element
      And I press keyboard "downarrow" key times <times>
    Then focused element inner content is set to "<innerText>"
      And Action Popover element has blue border on focus
    Examples:
      | times | innerText     |
      | 0     | Email Invoice |
      | 1     | Download PDF  |
      | 2     | Download CSV  |
      | 3     | Delete        |