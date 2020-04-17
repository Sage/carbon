Feature: Duelling Picklist Component
  I want to test Duelling Picklist component

  Background: Duelling Picklist Component in noIframe
    Given I open basic Test "duellingpicklist" component page in noIframe

  @positive
  Scenario: All items are unassigned
    # commented because of BDD default scenario Given - When - Then
    # Given I open basic Test "Duelling Picklist" component page in noIframe
    Then unassigned picklist has 20 items
      And assigned picklist is empty

  @positive
  Scenario: Divider between picklists is visible
    # commented because of BDD default scenario Given - When - Then
    # Given I open basic Test "Duelling Picklist" component page in noIframe
    Then divider is visible

  @positive
  Scenario: Disable Duelling Picklist
    When I check Access to all current and new clients checkbox
    Then Duelling Picklist is disabled

  @positive
  Scenario: Disable and enable Picklist
    Given I check Access to all current and new clients checkbox
    When I uncheck Access to all current and new clients checkbox
    Then Duelling Picklist is enabled

  @positive
  Scenario Outline: Add <item> item(s) to Assigned picklist
    When I add <item> item from unassigned picklist to assigned picklist
    Then assigned picklist has <item> items
      And unassigned picklist has <leftItems> items
    Examples:
      | item | leftItems |
      | 1    | 19        |
      | 20   | 0         |

  @positive
  Scenario: Add all items to Assigned picklist
    When I add 20 item from unassigned picklist to assigned picklist
    Then assigned picklist has 20 items
      And unassigned picklist is empty

  @positive
  Scenario Outline: Remove <item> item(s) from Assigned picklist
    Given I add <item> item from unassigned picklist to assigned picklist
    When I remove <item> item from assigned picklist
    Then assigned picklist has 0 items
      And unassigned picklist has 20 items
    Examples:
      | item |
      | 1    |
      | 10   |

  @positive
  Scenario Outline: Remove element from assigned picklist after pressing <key> key
    Given I add 1 item from unassigned picklist to assigned picklist
      And I focus first element in assigned picklist
    When I press "<key>" onto focused element
    Then unassigned picklist has 20 items
      And assigned picklist has 0 items
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Add element to assigned picklist after pressing <key> key
    Given I focus first element in unassigned picklist
    When I press "<key>" onto focused element
    Then assigned picklist has 1 items
      And unassigned picklist has 19 items
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Verify that the <position> element in unassigned Duelling Picklist is focused using <key> key
    Given I check "<position>" element in unassigned picklist
    When I press "<key>" onto focused element
    Then focused element inner content is set to "<innerText>"
      And focused element has golden border outline "rgb(255, 181, 0) solid 2px"
    Examples:
      | position   | key       | innerText                |
      | first      | uparrow   | Content 20Description 20 |
      | nineteenth | downarrow | Content 1Description 1   |

  @positive
  Scenario Outline: Verify results of searching in duelling picklist
    When Type "<search>" text into search input in no iFrame
    Then unassigned picklist contains <result> items
    Examples:
      | search     | result |
      | Content    | 20     |
      | Content 2  | 2      |
      | Content 20 | 1      |