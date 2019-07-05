Feature: Content component
  I want to change Content component properties

  Background: Open Content component page
    Given I open "Content" component page

  @positive
  Scenario Outline: Change children in Content dialog to <children>
    When I set children to "<children>"
    Then content children on preview is "<children>"
    Examples:
      | children                 |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change title in Content dialog to <title>
    When I set title to "<title>"
    Then content title context children on preview is "<title>"
    Examples:
      | title                    |
      | Sample text              |
      | 1234567890               |
      | áéíóú¿¡üñ                |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | ÄÖÜßäöüß                 |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario Outline: Change property in Content dialog to <property>
    When I select as to "<property>"
    Then content as property is set to "<property>"
    Examples:
      | property   |
      | primary    |
      | secondary  |

  @positive
  Scenario Outline: Change alignProperty in Content dialog to <alignProperty>
    When I select align to "<alignProperty>"
    Then content align property is set to "<alignProperty>"
    Examples:
      | alignProperty |
      | right         |
      | center        |
      | left          |


  @positive
  Scenario: BodyFullWidth enabled
    When I check bodyFullWidth checkbox
    Then content preview has bodyFullWidth parameter enabled

  @positive
  Scenario: BodyFullWidth disabled
    When I check bodyFullWidth checkbox
      And I uncheck bodyFullWidth checkbox
    Then content preview has no bodyFullWidth parameter

  @positive
  Scenario Outline: Inline enabled and change title width to <width>
    When I check inline checkbox
      And I set titleWidth to "<width>"
    Then content preview has inline parameter enabled
      And content preview width is "<width>"
    Examples:
      | width  |
      | 0      |
      | 100    |
      | 15     |

  @positive
  Scenario: Inline disabled
    When I check inline checkbox
      And I uncheck inline checkbox
    Then content preview has no inline parameter