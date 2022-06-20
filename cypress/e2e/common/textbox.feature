Feature: Textbox component
  I want to check Textbox component properties

  @positive
  Scenario Outline: Set placeholder to <placeholder>
    When I open default "Textbox Test" component with "textbox" json from "commonComponents" using "<nameOfObject>" object name
    Then Textbox placeholder is set to <placeholder>
    Examples:
      | placeholder                  | nameOfObject                |
      | mp150ú¿¡üßä                  | placeholderOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | placeholderSpecialCharacter |

  @positive
  Scenario Outline: Set prefix to <prefix>
    When I open default "Textbox Test" component with "textbox" json from "commonComponents" using "<nameOfObject>" object name
    Then Prefix is set to <prefix>
    Examples:
      | prefix                       | nameOfObject           |
      | mp150ú¿¡üßä                  | prefixOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | prefixSpecialCharacter |

  @positive
  Scenario Outline: Set fieldHelp to <fieldHelp>
    When I open default "Textbox Test" component with "textbox" json from "commonComponents" using "<nameOfObject>" object name
    Then fieldHelp on preview is set to <fieldHelp>
    Examples:
      | fieldHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | fieldHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | fieldHelpSpecialCharacter |

  @positive
  Scenario Outline: Set label to <label>
    When I open default "Textbox Test" component with "textbox" json from "commonComponents" using "<nameOfObject>" object name
    Then label on preview is <label>
    Examples:
      | label                        | nameOfObject          |
      | mp150ú¿¡üßä                  | labelOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelSpecialCharacter |

  @positive
  Scenario Outline: Set labelHelp to <labelHelp>
    When I open default "Textbox Test" component with "textbox" json from "commonComponents" using "<nameOfObject>" object name
      And I hover mouse onto "question" icon
    Then tooltipPreview on preview is set to <labelHelp>
    Examples:
      | labelHelp                    | nameOfObject              |
      | mp150ú¿¡üßä                  | labelHelpOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | labelHelpSpecialCharacter |

  @positive
  Scenario Outline: Verify input of Textbox component
    Given I open "Textbox Test" component page "default"
    When I type <input> into Textbox
    Then Textbox input on preview is set to <input>
    Examples:
      | input                        |
      | mp150ú¿¡üßä                  |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> |

  @positive
  Scenario: Check icon inside of Textbox is visible
    When I open default "Textbox Test" component with "textbox" json from "commonComponents" using "inputIconAdd" object name
    Then icon name on preview is "add"

  @positive
  Scenario: Check iconOnClick event
    Given I open default "Textbox Test" component with "textbox" json from "commonComponents" using "inputIconAdd" object name
    When I click on icon inside of Textbox
    Then iconOnClick action was called in Actions Tab

  @positive
  Scenario: Check onClick event
    Given I open default "Textbox Test" component with "textbox" json from "commonComponents" using "default" object name
    When I click on Textbox
    Then onClick action was called in Actions Tab
      And Textbox input has golden border on focus