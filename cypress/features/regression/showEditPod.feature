Feature: Show Edit Pod component
  I want to test Show Edit Pod component properties

  @positive
  Scenario: Verify edit dialog has a border for a Show Edit Pod component
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "border" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has border "rgb(204, 214, 219)" color

  @positive
  Scenario: Verify edit dialog has not a border for a Show Edit Pod component
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "borderFalse" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has border "rgba(0, 0, 0, 0.85)" color

  @positive
  Scenario Outline: Set Show Edit Pod buttonAlign to <buttonAlign>
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "<nameOfObject>" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod buttons are aligned to "<position>"
    Examples:
      | buttonAlign | nameOfObject     |
      | left        | buttonAlignLeft  |
      | right       | buttonAlignRight |

  @positive
  Scenario Outline: Change Show Edit Pod cancelText to <cancelText>
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "<nameOfObject>" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod cancelText on preview is set to <cancelText>
    Examples:
      | cancelText                   | nameOfObject               |
      | mp150ú¿¡üßä                  | cancelTextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | cancelTextSpecialCharacter |

  @positive
  Scenario Outline: Enable cancel checkbox for a Show Edit Pod component
    Given I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "cancel" object name
    When I click edit Show Edit Pod component
    Then Show Edit Pod component cancel button has color "<color>" and borderColor "<color>"
    Examples:
      | color           |
      | rgb(0, 129, 93) |

  @positive
  Scenario: Disable cancel checkbox for a Show Edit Pod component
    Given I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "cancelFalse" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod component hasn't a cancel button

  @positive
  Scenario Outline: Change Show Edit Pod deleteText to <deleteText>
    Given I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "<nameOfObject>" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod deleteText on preview is set to <deleteText>
    Examples:
      | deleteText                   | nameOfObject               |
      | mp150ú¿¡üßä                  | deleteTextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | deleteTextSpecialCharacter |

  @positive
  Scenario Outline: Change Show Edit Pod saveText to <saveText>
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "<nameOfObject>" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod saveText on preview is set to <saveText>
    Examples:
      | saveText                     | nameOfObject             |
      | mp150ú¿¡üßä                  | saveTextOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | saveTextSpecialCharacter |

  @positive
  Scenario: Enable saving checkbox for a Show Edit Pod component
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "saving" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has saving property

  @positive
  Scenario: Disable saving checkbox for a Show Edit Pod component
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "savingFalse" object name
      And I click edit Show Edit Pod component
    Then Show Edit Pod component has no saving property

  @positive
  Scenario Outline: Change Show Edit Pod title to <title>
    When I open Default "ShowEditPod Test" component in noIFrame with "showEditPod" json from "commonComponents" using "<nameOfObject>" object name
    Then Show Edit Pod title on preview is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario: Edit action was called
    Given I open "ShowEditPod Test" component page
      And clear all actions in Actions Tab
    When I click edit Show Edit Pod component in Iframe
    Then edit action was called in Actions Tab

  @positive
  Scenario: Delete action was called
    Given I open "ShowEditPod Test" component page
      And I click edit Show Edit Pod component in Iframe
      And clear all actions in Actions Tab
    When I click delete button
    Then delete action was called in Actions Tab

  @positive
  Scenario: Cancel action was called
    Given I open "ShowEditPod Test" component page
      And I click edit Show Edit Pod component in Iframe
      And clear all actions in Actions Tab
    When I click cancel button
    Then cancel action was called in Actions Tab