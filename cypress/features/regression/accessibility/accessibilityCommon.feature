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
      | Heading             |
      | Help                |
      | Icon                |
      | I18nComponent       |
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

  @accessibility
  Scenario Outline: Component <component> default story with open preview
    Given I open "<component>" component page "default story" in no iframe
    When I open component preview in noIFrame
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