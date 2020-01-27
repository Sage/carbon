Feature: Show Edit Pod classic component
  I want to test Show Edit Pod classic component

  Background: Open ShowEditPod component page classic
    Given I open "ShowEditPod" component page classic

  @positive
  Scenario: Verify color of the edit icon
    # When I open "ShowEditPod" component page classic
    Then Edit icon has color "rgb(37, 91, 199)"

  @positive
  Scenario Outline: Enable cancel checkbox for a Show Edit Pod classic component
    When I check cancel checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component cancel button has color "<color>" and borderColor "<color>"
    Examples:
      | color            |
      | rgb(37, 91, 199) |

  @positive
  Scenario: Enable saving checkbox for a Show Edit Pod classic component
    When I check saving checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod classic component has saving property