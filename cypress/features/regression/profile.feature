Feature: Profile default component
  I want to change default Profile component properties

  Background: Open Profile default component page
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
      | email                | avatar                                                                      |
      | andrew.tait@sage.com | https://www.gravatar.com/avatar/ec55ecf2e1c7e7e56a904b50245c24a4?s=24&d=404 |

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

  # value which is rendering as src doesn't work properly for CI
  # ignored regression
  @ignore
  Scenario Outline: Set initials to <initials>
    When I set initials to "<initials>"
    Then initials is set to "<initials>"
    Examples:
      | initials |
      | OW       |
      | TJH      |

  # value which is rendering as src doesn't work properly for CI
  # ignored regression
  @ignore
  Scenario Outline: Get initials from name <name>
    When I set name to "<name>"
      And I set initials to empty
    Then initials is set to "<result>"
    Examples:
      | name                 | result |
      | Oscar Wilde          | OW     |
      | Thomas Jeffrey Hanks | TJH    |

  @positive
  Scenario Outline: Set Profile size to <size>
    When I select size to "<size>"
    Then Profile size has "<sizeInPx>"
    Examples:
      | size | sizeInPx |
      | XS   | 24       |
      | S    | 32       |
      | M    | 40       |
      | ML   | 56       |
      | L    | 72       |
      | XL   | 104      |
      | XXL  | 128      |

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
