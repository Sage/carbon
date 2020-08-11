Feature: Table component
  I want to check Table component properties

  Background: Open Table component default page
    Given I open "Table" component page

  @positive
  Scenario Outline: Change event was called for sortColumn
    Given I select sortColumn to "<sortColumn>"
    When clear all actions in Actions Tab
      And I click "<headerName>" header in IFrame
    Then change action was called in Actions Tab
    Examples:
      | sortColumn | headerName |
      | name       | Country    |
      | code       | Code       |

  @positive
  Scenario Outline: Change event was called after clicking <button> button
    Given I check paginate checkbox
    When clear all actions in Actions Tab
      And I click "<button>" pagination button in IFrame
    Then change action was called in Actions Tab
    Examples:
      | button |
      | next   |
      | last   |

  @positive
  Scenario Outline: Change event was called after clicking <button> button
    Given I check paginate checkbox
      And I click "last" pagination button in IFrame
    When clear all actions in Actions Tab
      And I click "<button>" pagination button in IFrame
    Then change action was called in Actions Tab
    Examples:
      | button   |
      | previous |
      | first    |