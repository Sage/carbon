Feature: Show Edit Pod classic component
  I want to test Show Edit Pod classic component

  Background: Open ShowEditPod component page classic
    Given I open "ShowEditPod" component page classic

  @positive
  Scenario: Enable cancel checkbox for a Show Edit Pod classic component
    When I check cancel checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod classic component has a cancel button

  @positive
  Scenario: Enable saving checkbox for a Show Edit Pod classic component
    When I check saving checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod classic component has saving property