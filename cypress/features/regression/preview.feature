Feature: Preview default component
  I want to test Preview component

  @positive
  Scenario: Enable loading checkbox for a Preview component
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "loading" object name
    Then Preview component is loading

  @positive
  Scenario: Disable loading checkbox for a Preview component
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "loadingFalse" object name
    Then Preview component is not loading

  @positive
  Scenario Outline: Change Preview children to <children>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview children is set to <children>
    Examples:
      | children                     | nameOfObject             |
      | mp150ú¿¡üßä                  | childrenOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | childrenSpecialCharacter |

  @positive
  Scenario Outline: Set width to <width>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview width is set to "<width>"
    Examples:
      | width | nameOfObject |
      | 0px   | width0       |
      | 1px   | width1       |
      | 100px | width100     |

  @positive
  Scenario Outline: Set height to <height>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview height is set to "<height>"
    Examples:
      | height | nameOfObject |
      | 0px    | height0      |
      | 1px    | height1      |
      | 100px  | height100    |

  @positive
  Scenario Outline: Set lines to <lines>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview has <lines> lines
    Examples:
      | lines | nameOfObject |
      | 0     | lines0       |
      | 1     | lines1       |
      | 100   | lines100     |

  @positive
  Scenario Outline: Set width to out of scope to <width>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview width is not set to <width>
    Examples:
      | width                        | nameOfObject          |
      | mp150ú¿¡üßä                  | widthOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | widthSpecialCharacter |

  @positive
  Scenario Outline: Set height to out of scope to <height>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview height is not set to <height>
    Examples:
      | height                       | nameOfObject           |
      | mp150ú¿¡üßä                  | heightOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | heightSpecialCharacter |

  @positive
  Scenario Outline: Set lines to out of scope to <lines>
    When I open default "Preview" component in noIFrame with "preview" json from "commonComponents" using "<nameOfObject>" object name
    Then Preview lines is not set to <lines>
    Examples:
      | lines                        | nameOfObject          |
      | mp150ú¿¡üßä                  | linesOtherLanguage    |
      | !@#$%^*()_+-=~[];:.,?{}&"'<> | linesSpecialCharacter |