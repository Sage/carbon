Feature: Profile component
  I want to change Profile component properties

  Background: Open Profile component page
    Given I open "Profile" component page

  @positive
  Scenario Outline: Set email to <email>
    When I set email to "<email>"
    Then email is set to "<email>"
    Examples:
      | email              |
      | example@email.com  |
      | johnsmith@sage.com |

  @positive
  Scenario Outline: Get avatar via email
    When I set email to "<email>"
    Then email is set to "<email>"
      And avatar is taken from "<avatar>"
    Examples:
      | email                | avatar                                                                        |
      | andrew.tait@sage.com | https://www.gravatar.com/avatar/ec55ecf2e1c7e7e56a904b50245c24a4?s=40&d=blank |

  @negative
  Scenario Outline: Set email out of scope to <email>
    When I set email to "<email>"
    Then email is set to "<email>"
    Examples:
      | email                   |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
  # @ignore because of FE-1447
  # | <> |

  @positive
  Scenario Outline: Set initials to <initials>
    When I set initials to "<initials>"
    Then initials is set to "<initials>"
    Examples:
      | initials |
      | A        |
      | BC       |
      | DEF      |

  @negative
  Scenario Outline: Set out of scope initials to <initials>
    When I set initials to "<initials>"
    Then initials is set to "<initials>"
    Examples:
      | initials |
      | 1234     |
      | 12345    |
      | DEFGHIJ  |

  @positive
  Scenario Outline: Get initials from name <name>
    When I set name to "<name>"
      And I set initials to empty
    Then initials is set to "<result>"
    Examples:
      | name                 | result |
      | Adam                 | A      |
      | Oscar Wilde          | OW     |
      | Thomas Jeffrey Hanks | TJH    |

  @positive
  Scenario Outline: Check large checkbox
    When I check large checkbox
    Then Profile is set to large

  @positive
  Scenario Outline: Set name to <name>
    When I set name to "<name>"
    Then name is set to "<name>"
    Examples:
      | name                    |
      | Sample text             |
      | 1234567890              |
      | áéíóú¿¡üñ               |
      | !@#$%^*()_+-=~[];:.,?{} |
      | ÄÖÜßäöüß                |
# @ignore because of FE-1447
# | <> |