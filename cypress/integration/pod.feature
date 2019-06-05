Feature: Pod component
  I want to test Pod component

  Background: Open Pod component page
    Given I open "Pod" component page

  @positive
  Scenario: Enable border checkbox for a Pod component
    When I check border checkbox
    Then Pod component has border

  @positive
  Scenario: Enable and disable border checkbox for a Pod component
    When I check border checkbox
      And I uncheck border checkbox
    Then Pod component has no border

  @positive
  Scenario Outline: Change Pod children to <children>
    When I set children to "<children>"
    Then Pod children on preview is set to "<children>"
    Examples:
      | children                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Set Pod padding to <padding>
    When I select padding to "<padding>"
    Then Pod padding on preview is "<padding>"
    Examples:
      | padding     |
      | extra-small |
      | small       |
      | medium      |
      | large       |
      | extra-large |

  @positive
  Scenario Outline: Set Pod as align to <as>
    When I select as to "<as>"
    Then Pod as on preview is "<as>"
    Examples:
      | as          |
      | primary     |
      | secondary   |
      | tertiary    |
      | tile        |
      | transparent |

  @positive
  Scenario Outline: Change Pod title to <title>
    When I set title to "<title>"
    Then Pod title on preview is set to "<title>"
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
  Scenario Outline: Change Pod subtitle to <subtitle>
    When I set title to "title"
      And I set subtitle to "<subtitle>"
    Then Pod subtitle on preview is set to "<subtitle>"
    Examples:
      | subtitle                |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Pod alignTitle to <alignTitle>
    When I set title to "title"
      And I set subtitle to "subtitle"
      And I set footer to "footer"
      And I select alignTitle to "<alignTitle>"
    Then Pod alignTitle on preview is "<alignTitle>"
    Examples:
      | alignTitle |
      | center     |
      | right      |
      | left       |

  @positive
  Scenario Outline: Change Pod description to <description>
    When I set description to "<description>"
    Then Pod description on preview is set to "<description>"
    Examples:
      | description             |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change Pod footer to <footer>
    When I set footer to "<footer>"
    Then Pod footer on preview is set to "<footer>"
    Examples:
      | footer                  |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario: Enable and disable onEdit checkbox for a Pod component
    When I check onEdit checkbox
      And I uncheck onEdit checkbox
    Then Pod component has no onEdit property

  @positive
  Scenario: Enable onEdit checkbox for a Pod component
    When I check onEdit checkbox
    Then Pod component has onEdit property

  @positive
  Scenario: Enable onEdit checkbox and check the edit event
    When I check onEdit checkbox
      And clear all actions in Actions Tab
      And I click onEdit icon
    Then edit action was called in Actions Tab

  @positive
  Scenario: Enable onEdit checkbox and check the editContentFullWidth checkbox
    When I check onEdit checkbox
      And I check editContentFullWidth checkbox
    Then Pod component has editContentFullWidth property

  @positive
  Scenario: Enable onEdit checkbox and check the displayEditButtonOnHover checkbox
    When I check onEdit checkbox
      And I set title to "title"
      And I check displayEditButtonOnHover checkbox
      And I hover mouse onto Pod content
    Then Pod component has displayEditButtonOnHover property

  @positive
  Scenario: Enable onEdit checkbox and check the triggerEditOnContent checkbox
    When I check onEdit checkbox
      And I check triggerEditOnContent checkbox
    Then Pod component has triggerEditOnContent property

  @positive
  Scenario: Enable onEdit checkbox and check the internalEditButton checkbox
    When I check onEdit checkbox
      And I check internalEditButton checkbox
    Then Pod component has internalEditButton property