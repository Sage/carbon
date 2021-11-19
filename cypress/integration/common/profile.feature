Feature: Profile default component
  I want to test default Profile component properties

  @positive
  Scenario Outline: Get avatar via email
    When I open default "Profile Test" component with "profile" json from "commonComponents" using "emailGravatar" object name
    Then email is set to <email>
      And avatar is taken from "<avatar>"
    Examples:
      | email                         | avatar                                                                      |
      | test.frontend.squad@gmail.com | https://www.gravatar.com/avatar/05c1c705ee45d7ae88b80b3a8866ddaa?s=24&d=404 |

  @negative
  Scenario Outline: Set email out of scope to <email>
    When I open default "Profile Test" component with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then email is set to <email>
    Examples:
      | email                        | nameOfObject          |
      | mp150ú¿¡üßä                  | emailOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | emailSpecialCharacter |

  @positive
  Scenario Outline: Set name to <name>
    When I open default "Profile Test" component with "profile" json from "commonComponents" using "<nameOfObject>" object name
    Then name is set to <name>
    Examples:
      | name                         | nameOfObject         |
      | mp150ú¿¡üßä                  | nameOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | nameSpecialCharacter |