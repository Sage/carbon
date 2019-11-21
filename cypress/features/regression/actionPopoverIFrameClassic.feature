Feature: Action Popover component classic
  I want to change Alert component properties for classic page

  Background: Open Action Popover component classic page
    Given I open "Action Popover" component for classic story in iframe

  @positive
  Scenario: Open Action Popover element
    When I open Action Popover element
    Then Action Popover element is visible

  @positive
  Scenario Outline: Open Action Popover element and check <innerText> as inner context
    When I open Action Popover element
      And I press keyboard "downarrow" key times <times>
    Then Action Popover element "<index>" inner context is set to "<innerText>" for classic story
    Examples:
      | times | index | innerText     |
      | 0     | 1     | Email Invoice |
      | 1     | 3     | Download PDF  |
      | 2     | 4     | Download CSV  |
      | 3     | 6     | Delete        |

  @positive
  Scenario Outline: Open Action Popover using different keyboard key <key>
    When I press keyboard "<key>" key times 1 on actionPopover open icon
    Then Action Popover element "<index>" inner context is set to "<innerText>" for classic story
    Examples:
      | key       | index | innerText     |
      | enter     | 1     | Email Invoice |
      | downarrow | 1     | Email Invoice |
      | space     | 1     | Email Invoice |

  @positive
  Scenario: Open Action Popover and close it using Home key
    When I open Action Popover element
      And I hit Home on Action Popover element in iFrame
    Then  Action Popover element "1" inner context is set to "Email Invoice" for classic story

  @positive
  Scenario: Open Action Popover and close it using uparrow key
    When I open Action Popover element
      And I hit uparrow on Action Popover element in iFrame
    Then  Action Popover element "6" inner context is set to "Delete" for classic story

  @positive
  Scenario: Open Action Popover and close it using End key
    When I open Action Popover element
      And I hit End on Action Popover element in iFrame
    Then  Action Popover element "6" inner context is set to "Delete" for classic story

  @positive
  Scenario: Open Action Popover and close it using Tab key
    When I open Action Popover element
      And I hit Tab on Action Popover element in iFrame
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and close it using Shift Tab key
    When I open Action Popover element
      And I hit ShiftTab on Action Popover element in iFrame
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover should closed after using ESC key
    Given I open Action Popover element
    When I hit ESC on Action Popover element in iFrame
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover and click outside of the component
    Given I open Action Popover element
    When I click on outside dialog in iFrame
    Then Action Popover element is not visible

  @positive
  Scenario: Open Action Popover should closed after clicking onto Open icon
    Given I open Action Popover element
    When I open Action Popover element
    Then Action Popover element is not visible

  @positive
  Scenario Outline: Open Action Popover using different keyboard key <key>
    Given I open Action Popover element
    When I press keyboard "<key>" key times <times>
    Then Action Popover element is visible
      And Action Popover element "<index>" inner context is set to "<innerText>" for classic story
    Examples:
      | key | index | innerText     | times |
      | d   | 3     | Download PDF  | 1     |
      | d   | 4     | Download CSV  | 2     |
      | d   | 6     | Delete        | 3     |
      | e   | 1     | Email Invoice | 1     |
      | p   | 2     | Print Invoice | 1     |