Feature: Content component
  I want to change Content component properties

  Background: Open Content component page
    Given I open "Content" component page

  @positive
  Scenario Outline: Change children in Content dialog
    When I set children to "<children>"
    Then content children on preview is "<children>"
    Examples:
      | children                 |
      | <>                       |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | áéíóú¿¡üñ                |
      | ÄÖÜßäöü                  |

  @positive
  Scenario Outline: Change title in Content dialog
    When I set title to "<title>"
    Then content title context children on preview is "<title>"
    Examples:
      | title                    |
      | <>                       |
      | !@#$%^*()_+-=~[];:.,?{}  |
      | áéíóú¿¡üñ                |
      | ÄÖÜßäöü                  |

  @positive
  Scenario Outline: Change property in Content dialog
    When I set as property to "<property>"
    Then content as property is set to "<property>"
    Examples:
      | property   |
      | primary    |
      | secondary  |

  @positive
  Scenario Outline: Change alignProperty in Content dialog
    When I set align property to "<alignProperty>"
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
    When I uncheck bodyFullWidth checkbox
    Then content preview has no bodyFullWidth parameter

  @positive
  Scenario Outline: Inline enabled and change title width
    When I check inline checkbox
      And I set titleWidth parameter to "<width>"
    Then content preview has inline parameter enabled
      And content preview width is "<width>"
    Examples:
      | width  |
      | 0      |
      | 100    |
      | 15     |

  @positive
  Scenario: Inline disabled
    When I uncheck inline checkbox
    Then content preview has no inline parameter