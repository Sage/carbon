Feature: Portrait component
  I want to test Portrait component

  Background: Open Portrait component page
    Given I open "Portrait" component page

  @positive
  Scenario Outline: Change Portrait alt to <alt>
    When I set alt to "<alt>"
    Then Portrait alt on preview is set to "<alt>"
    Examples:
      | alt                     |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       |

  @positive
  Scenario: Enable darkBackground checkbox for a Portrait component
    When I check darkBackground checkbox
    Then Portrait component has darkBackground property

  @positive
  Scenario: Enable and disable darkBackground checkbox for a Portrait component
    When I check darkBackground checkbox
      And I uncheck darkBackground checkbox
    Then Portrait component has no darkBackground property

  @positive
  Scenario: Set Portrait source to src
    When I select source to "src"
    Then Portrait source is set to "src"

  @positive
  Scenario: Set Portrait source to gravatar
    When I select source to "gravatar"
      And I set gravatar to "ABC"
    Then Portrait source is set to "https://www.gravatar.com/avatar/900150983cd24fb0d6963f7d28e17f72?s=60&d=blank"  

  @positive
  Scenario Outline: Set Portrait src to <source>
    When I select source to "src"
      And I set src to "<source>"
    Then Portrait src value is set to "<source>"
    Examples:
      | source                  |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
      # @ignore because of FE-1447
      # | <>                       | 

  @positive
  Scenario Outline: Change Portrait initials to <initials>
    When I set initials to "<initials>"
    Then Portrait initials value is set to "<initials>"
    Examples:
      | initials |
      | A        |
      | BC       |
      | DEF      |


  @positive
  Scenario Outline: Set Portrait gravatar to <gravatar>
    When I select source to "gravatar"
      And I set gravatar to "<gravatar>"
    Then Portrait gravatar value is set to "<result>"
    Examples:
      | gravatar | result                                                                        |
      | A        | https://www.gravatar.com/avatar/0cc175b9c0f1b6a831c399e269772661?s=60&d=blank |
      | BC       | https://www.gravatar.com/avatar/5360af35bde9ebd8f01f492dc059593c?s=60&d=blank |
      | DEF      | https://www.gravatar.com/avatar/4ed9407630eb1000c0f6b63842defa7d?s=60&d=blank |

  @positive
  Scenario Outline: Set Portrait shape to <shape>
    When I select shape to "<shape>"
    Then Portrait shape value is set to "<shape>"
    Examples:
      | shape    |
      | standard |
      | circle   |
      | leaf     |

  @positive
  Scenario Outline: Set Portrait size to <size>
    When I select size to "<size>"
    Then Portrait size value is set to "<size>"
    Examples:
      | size        |
      | extra-small |
      | small       |
      | medium-small|
      | medium      |
      | medium-large|
      | large       |
      | extra-large |  