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
      | Carousel            |
      | Confirm             |
      | Content             |
      | Detail              |
      | Dialog              |
      | Dialog-full-screen  |
      | Heading             |
      | Help                |
      | I18nComponent       |
      | Link                |
      | Message             |
      | MenuList            |
      | Mount In App        |
      # | Pages             |
      | Portrait            |
      | Preview             |
      | Profile             |
      | Row                 |
      | Sidebar             |
      | Split-button        |
      | Multi-action-button |

  @accessibility
  Scenario: Component button toggle
    When I open "Button-Toggle-Group" component page "basic" in no iframe
    Then "Button Toggle Group" component has no accessibility violations

  @ignore
  # ignored because of accessibility issues after
  # changing state of components -> FE-2894
  Scenario Outline: Component <component> page with preview button
    Given I open "<component>" component page "default" in no iframe
    When I open component preview no iframe
    Then "<data-component>" component has no accessibility violations
    Examples:
      | component |
      | Flash     |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component>" component page "default" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component           |
      | Configurable-items  |

  @accessibility
  Scenario Outline: Component <component> basic story
    When I open "<component>" component page "basic" in no iframe
    Then "<component>" component has no accessibility violations
    Examples:
      | component     |
      | Showeditpod   |
      | Step-sequence |
      | Icon          |
      | Button toggle |

  @accessibility
  Scenario Outline: Component <component> default story
    When I open "<component> Test" component page "default" in no iframe
    Then "<component> Test default story" component has no accessibility violations
    Examples:
      | component        |
      | Tooltip          |
      | DraggableContext |
      | Settingsrow      |
      | Table-ajax       |
      | Table            |