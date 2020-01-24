Feature: Show Edit Pod component
  I want to test Show Edit Pod component properties

  Background: Open ShowEditPod component page
    Given I open "ShowEditPod" component page

  @positive
  Scenario: Verify the inner content of the component
    # When I open "ShowEditPod" component page
    Then Show Edit Pod component has proper content inside itself

  @positive
  Scenario: Verify color of the edit icon
    # When I open "ShowEditPod" component page
    Then Edit icon has color "rgb(0, 128, 93)"

  @positive
  Scenario Outline: Set Show Edit Pod as to <as>
    When I select as to "<as>"
    Then Show Edit Pod as value is set to "<as>"
    Examples:
      | as          |
      | primary     |
      | secondary   |
      | tertiary    |
      | tile        |
      | transparent |

  @positive
  Scenario: Enable border checkbox for a Show Edit Pod component
    When I check border checkbox
    Then Show Edit Pod component has border property

  @positive
  Scenario: Enable and disable border checkbox for a Show Edit Pod component
    Given I check border checkbox
    When I uncheck border checkbox
    Then Show Edit Pod component has no border property

  @positive
  Scenario: Enable border on a edit dialog view for a Show Edit Pod component
    When I check border checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has border property

  @positive
  Scenario: Enable and disable border on a edit dialog view for a Show Edit Pod component
    Given I check border checkbox
    When I uncheck border checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has no border property

  @positive
  Scenario Outline: Set Show Edit Pod buttonAlign to <position>
    When I select buttonAlign to "<position>"
      And I click edit Show Edit Pod component
    Then Show Edit Pod buttons are aligned to "<position>"
    Examples:
      | position |
      | left     |
      | right    |

  @positive
  Scenario Outline: Change Show Edit Pod cancelText to <cancelText>
    When I set cancelText to "<cancelText>"
      And I click edit Show Edit Pod component
    Then Show Edit Pod cancelText on preview is set to "<cancelText>"
    Examples:
      | cancelText              |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario: Enable cancel checkbox for a Show Edit Pod component
    When I check cancel checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component cancel button has color "rgb(0, 128, 93)" and borderColor "rgb(0, 128, 93)"

  @positive
  Scenario: Enable and disable cancel checkbox for a Show Edit Pod component
    Given I check cancel checkbox
    When I uncheck cancel checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component hasn't a cancel button

  @positive
  Scenario Outline: Change Show Edit Pod deleteText to <deleteText>
    When I set deleteText to "<deleteText>"
      And I click edit Show Edit Pod component
    Then Show Edit Pod deleteText on preview is set to "<deleteText>"
    Examples:
      | deleteText              |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario Outline: Change Show Edit Pod saveText to <saveText>
    When I set saveText to "<saveText>"
      And I click edit Show Edit Pod component
    Then Show Edit Pod saveText on preview is set to "<saveText>"
    Examples:
      | saveText                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario: Enable saving checkbox for a Show Edit Pod component
    When I check saving checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has saving property

  @positive
  Scenario: Enable and disable saving checkbox for a Show Edit Pod component
    Given I check saving checkbox
    When I uncheck saving checkbox
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has no saving property

  @positive
  Scenario Outline: Change Show Edit Pod title to <title>
    When I set title to "<title>"
    Then Show Edit Pod title on preview is set to "<title>"
    Examples:
      | title                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <>                       |

  @positive
  Scenario: Edit action was called
    Given clear all actions in Actions Tab
    When I click edit Show Edit Pod component
    Then edit action was called in Actions Tab

  @ignore
  Scenario: Delete action was called
    Given I click edit Show Edit Pod component
    When clear all actions in Actions Tab
      And I click delete button
    Then delete action was called in Actions Tab

  @positive
  Scenario: Cancel action was called
    Given I click edit Show Edit Pod component
    When clear all actions in Actions Tab
      And I click cancel button
    Then cancel action was called in Actions Tab