Feature: Design System Multi Select component
  I want to change Design System Multi Select component properties

  @positive
  Scenario: Multi Select list is not open when has a focus
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
    When I focus select input
    Then multi Select list is closed

  @positive
  Scenario Outline: Multi Select list is not open using keyboard <key>
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
      And I focus select input
    When I click onto controlled select using "<key>" key
    Then multi Select list is closed
    Examples:
      | key   |
      | Enter |
      | Space |

  @positive
  Scenario: Multi Select list is not opened by clicking mouse in the text input
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
    When I click on Select input
    Then multi Select list is closed

  @positive
  Scenario: Open Multi Select list by clicking mouse on the dropdown button
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
    When I click on dropdown button
    Then multi Select list is opened

  @positive
  Scenario: Close Multi Select list by double clicking mouse on the dropdown button
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
      And I click on dropdown button
    When I click on dropdown button
    Then multi Select list is closed

  @positive
  Scenario: Close Multi Select list by clicking out of component
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
      And I click on dropdown button
    When I click onto root in Test directory in no iFrame
    Then multi Select list is closed

  @positive
  Scenario: Open on focus multi Select component is opened when has a focus
    Given I open "Design System Select multiselect" component page "open on focus" in no iframe
    When I focus openOnFocus Select input
    Then multi Select list is opened

  @positive
  Scenario: Open on focus Multi Select list by clicking mouse on the dropdown button
    Given I open "Design System Select multiselect" component page "open on focus" in no iframe
    When I click on dropdown button
    Then multi Select list is opened

  @positive
  Scenario: Choose option from the Select list via clicking an option
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
      And I click on dropdown button
    When I click on "first" option on Select list
    Then Multi select input has "Amber" pill
      And multi Select list is opened

  @positive
  Scenario: Filter by typed character
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
    When I type "A" into input
    Then multi Select list is opened
      And "first" option on Select list is "Amber"
      And "first" option on the list is highlighted
      And "second" option on Select list is "Black"
      And "third" option on Select list is "Orange"

  @positive
  Scenario Outline: Open multi select list using arrow key
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
      And I focus select input
      And I click onto controlled select using "<key>" key
    When I click onto controlled select using "<key>" key
    Then multi Select list is opened
      And Multi select input has not any value
    Examples:
      | key       | position |
      | downarrow | first    |
      | uparrow   | eleventh |

  @positive
  Scenario: Verify the inner context of Select Multiple component
    Given I open "Design System Select multiselect" component page "controlled" in no iframe
    When Type "Amber" text into multi select input and select the value
      And Type "Black" text into multi select input and select the value
      And Type "Green" text into multi select input and select the value
    Then Multi select "first" pill has "Amber" value
      And Multi select "second" pill has "Black" value
      And Multi select "third" pill has "Green" value

  @positive
  Scenario: Lazy loading is visible after open the Multi Select
    Given I open "Design System Select multiselect" component page "with is loading prop" in no iframe
    When I click on dropdown button
    Then Lazy loading is visible