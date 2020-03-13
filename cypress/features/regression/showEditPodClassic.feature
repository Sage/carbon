Feature: Show Edit Pod classic component
  I want to test Show Edit Pod classic component

  Background: Open ShowEditPod component page classic
    Given I open "ShowEditPod" component page classic

  @positive
  Scenario: Verify color of the edit icon
    # commented because of BDD default scenario Given - When - Then
    # When I open "ShowEditPod" component page classic
    Then Edit icon has color "rgb(37, 91, 199)"

   @positive
  Scenario: Enable border checkbox for a Show Edit Pod classic component
    When I check border checkbox
    Then Show Edit Pod component has border "rgb(204, 214, 219)" color

  @positive
  Scenario Outline: Enable cancel checkbox for a Show Edit Pod classic component
    When I click edit Show Edit Pod component
    Then Show Edit Pod component cancel button has color "<color>" and borderColor "<color>"
    Examples:
      | color            |
      | rgb(37, 91, 199) |

  @positive
  Scenario Outline: Set Show Edit Pod as property to <as>
    When I select as to "<as>"
    Then Show Edit Pod background-color is set to "<background-color>"
    Examples:
      | as          | background-color   |
      | primary     | rgb(255, 255, 255) |
      | secondary   | rgb(242, 245, 246) |
      | tertiary    | rgb(230, 235, 237) |
      | tile        | rgb(255, 255, 255) |
      | transparent | rgba(0, 0, 0, 0)   |

  @positive
  Scenario: Enable saving checkbox for a Show Edit Pod classic component
    When I check saving checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod classic component has saving property