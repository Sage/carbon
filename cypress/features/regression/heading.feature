Feature: Heading component
  I want to test Heading component properties

  @positive
  Scenario Outline: Change heading title to <title>
    When I open Basic "Heading Test" component in noIFrame with "heading" json from "commonComponents" using "<nameOfObject>" object name
    Then heading title is set to <title>
    Examples:
      | title                        | nameOfObject          |
      | mp150ú¿¡üßä                  | titleOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | titleSpecialCharacter |

  @positive
  Scenario Outline: Change children to <children>
    When I open Basic "Heading Test" component in noIFrame with "heading" json from "commonComponents" using "<nameOfObject>" object name
    Then heading children on preview is <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Change subheader to <subheader>
    When I open Basic "Heading Test" component in noIFrame with "heading" json from "commonComponents" using "<nameOfObject>" object name
    Then subheader on preview is <subheader>
    Examples:
      | subheader                    | nameOfObject              |
      | mp150ú¿¡üßä                  | subheaderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | subheaderSpecialCharacter |

  @positive
  Scenario Outline: Change help to <help>
    Given I open Basic "Heading Test" component in noIFrame with "heading" json from "commonComponents" using "<nameOfObject>" object name
    When I hover mouse onto help icon
    Then tooltipPreview on preview is set to <help>
    Examples:
      | help                         | nameOfObject         |
      | mp150ú¿¡üßä                  | helpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | helpSpecialCharacter |

  @positive
  Scenario Outline: Change helpLink to <helpLink>
    Given I open Basic "Heading Test" component in noIFrame with "heading" json from "commonComponents" using "<nameOfObject>" object name
    Then link on preview is <helpLink>
    Examples:
      | helpLink                     | nameOfObject             |
      | mp150ú¿¡üßä                  | helpLinkOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | helpLinkSpecialCharacter |

  @positive
  Scenario Outline: Change backLink to <backLink>
    Given I open Basic "Heading Test" component in noIFrame with "heading" json from "commonComponents" using "<nameOfObject>" object name
    Then backLink on preview is <backLink>
    Examples:
      | backLink                     | nameOfObject             |
      | mp150ú¿¡üßä                  | backLinkOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | backLinkSpecialCharacter |
