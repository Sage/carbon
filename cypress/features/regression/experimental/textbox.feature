Feature: Experimental Textbox component
  I want to check Experimental Textbox component properties

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open default "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario Outline: Set prefix to <prefix>
    When I open default "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Prefix is set to <prefix>
    Examples:
      | prefix                       | nameOfObject           |
      | mp150ú¿¡üßä                  | prefixOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | prefixSpecialCharacter |

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I open default "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp> in NoIFrame
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then label on preview is <label> in NoIFrame
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I open default "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
      And I hover mouse onto "question" icon in no iFrame
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario Outline: Verify input of Textbox component
    Given I open "Experimental Textbox Test" component page "default" in no iframe
    When I type <input> into Textbox
    Then Textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Check icon inside of Textbox is visible
    When I open default "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "inputIconAdd" object name
    Then icon name in noIframe on preview is "add"
