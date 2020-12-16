Feature: Profile default component
  I want to test default Profile component properties

  @positive
  Scenario Outline: Set email to <email>
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then email is set to <email>
    Examples:
      | email              | nameOfObject |
      | example@email.com  | email1       |
      | johnsmith@sage.com | email2       |

  @positive
  Scenario Outline: Get avatar via email
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "emailGravatar" object name
    Then email is set to <email>
      And avatar is taken from "<avatar>"
    Examples:
      | email                | avatar                                                                      |
      | andrew.tait@sage.com | https://www.gravatar.com/avatar/ec55ecf2e1c7e7e56a904b50245c24a4?s=24&d=404 |

  @negative
  Scenario Outline: Set email out of scope to <email>
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then email is set to <email>
    Examples:
      | email                        | nameOfObject          |
      | mp150ú¿¡üßä                  | emailOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | emailSpecialCharacter |

  # value which is rendering as src doesn't work properly for CI
  # ignored regression
  @ignore
  Scenario Outline: Set initials to <initials>
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then initials is set to "<initials>"
    Examples:
      | initials | nameOfObject |
      | OW       | initialsOW   |
      | TJH      | initialsTJH  |

  # value which is rendering as src doesn't work properly for CI
  # ignored regression
  @ignore
  Scenario Outline: Get initials from name <name>
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then initials is set to <result>
    Examples:
      | name                 | result | nameOfObject           |
      | Oscar Wilde          | OW     | nameOscarWilde         |
      | Thomas Jeffrey Hanks | TJH    | nameThomasJeffreyHanks |

  @positive
  Scenario Outline: Set Profile size to <size>
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then Profile size has <sizeInPx>
    Examples:
      | size | sizeInPx | nameOfObject |
      | XS   | 24       | sizeXS       |
      | S    | 32       | sizeS        |
      | M    | 40       | sizeM        |
      | ML   | 56       | sizeML       |
      | L    | 72       | sizeL        |
      | XL   | 104      | sizeXL       |
      | XXL  | 128      | sizeXXL      |

  @positive
  Scenario Outline: Set name to <name>
    When I open default "Profile Test" component in noIFrame with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then name is set to <name>
    Examples:
      | name                         | nameOfObject         |
      | mp150ú¿¡üßä                  | nameOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | nameSpecialCharacter |