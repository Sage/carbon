Feature: Accessibility tests - Common list
  I want to check that all components have no violations

  @accessibility
  Scenario Outline: Component <component> default story
    Given I open "<component>" component page "default story" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | AppWrapper          |
      | Alert               |
      | Button toggle       |
      | Button Toggle Group |
      | Carousel            |
      | Confirm             |
      | Configurable-items  |
      | Detail              |
      | Dialog              |
      | Decimal-Input       |
      | GroupedCharacter    |
      | Heading             |
      | Help                |
      | Icon                |
      | Link                |
      | Message             |
      | Mount In App        |
      | Portrait            |
      | Preview             |
      | Profile             |
      | Row                 |
      | Showeditpod         |
      | Sidebar             |
      | Split-button        |
      | Step-sequence       |
      | Multi-action-button |
      | Number-Input        |

  @accessibility
  Scenario Outline: Component <component> default story with open preview
    Given I open "<component>" component page "default story" in no iframe
    When I open component preview
    Then "<component>" component has no accessibility violations
    Examples:
      | component          |
      | Dialog Full Screen |
      | Pages              |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component> Test" component page "default" in no iframe
    Then "<component> Test default story" component has no accessibility violations
    Examples:
      | component        |
      | DraggableContext |
      | Setting row      |
      | Table-ajax       |
      | Table            |

  @accessibility
  Scenario Outline: Component <component> validations boolean story page
    When I open "<component>" component page "validations boolean" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Decimal-Input    |
      | GroupedCharacter |
      | Number-Input     |

  @accessibility
  Scenario Outline: Component <component> validations string story page
    When I open "<component>" component page "validations string component" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Decimal-Input    |
      | GroupedCharacter |
      | Number-Input     |

  @accessibility
  Scenario Outline: Component <component> validations string label story page
    When I open "<component>" component page "validations string label" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component        |
      | Decimal-Input    |
      | GroupedCharacter |
      | Number-Input     |
