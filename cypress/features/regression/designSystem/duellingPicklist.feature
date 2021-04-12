Feature: Design System Duelling Picklist Component
  I want to test Design System Duelling Picklist component

  Background: Design System Duelling Picklist Component in noIframe
    Given I open "Design System DuellingPicklist" component page "default" in no iframe

  @positive
  Scenario: All items are unassigned
    # commented because of BDD default scenario Given - When - Then
    # Given I open "Test DuellingPicklist" component page "default" in no iframe
    Then unassigned picklist has 20 items
      And assigned picklist is empty

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
    When I press "<key>" onto element in assigned pick list
    Then unassigned picklist has 20 items
      And assigned picklist has 0 items
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Add element to assigned picklist after pressing <key> key
    Given I focus first element in unassigned picklist
    When I press "<key>" onto element in unassigned pick list
    Then assigned picklist has 1 items
      And unassigned picklist has 19 items
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario Outline: Verify results of searching in duelling picklist
    When Type "<search>" text into duelling picklist search input
    Then unassigned picklist contains <result> items
    Examples:
      | search     | result |
      | Content    | 20     |
      | Content 2  | 2      |
      | Content 20 | 1      |