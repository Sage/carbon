Feature: Experimental Textbox multiple component
  I want to check Experimental Textbox multiple component properties

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open multiple "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario Outline: Set <prefix> for multiple component
    When I open multiple "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple textbox prefix is set to <prefix>
    Examples:
      | prefix                       | nameOfObject           |
      | mp150ú¿¡üßä                  | prefixOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | prefixSpecialCharacter |

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I open multiple "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open multiple "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    Then Multiple label is set to <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    Given I open multiple "Experimental Textbox Test" component in noIFrame with "textbox" json from "experimental" using "<nameOfObject>" object name
    When I hover mouse onto "first" help icon in NoIFrame
      And I hover mouse onto "second" help icon in NoIFrame
    Then Multiple tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario Outline: Verify input of Textbox multiple component
    Given I open "Experimental Textbox Test" component page "multiple" in no iframe
    When I type <input> into "first" Textbox
      And I type <input> into "second" Textbox
    Then Multiple textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |