# App Switcher

## How to use a AppSwitcher in a component:

* In your file

```javascript
import AppSwitcher from 'carbon/lib/components/app-switcher';
```

*  To render a AppSwitcher with no items, and explicitly setting the menu title:

```javascript
  <AppSwitcher menuItem="Applications">

  </AppSwitcher>
```


*  To render a AppSwitcher with a single section and single application (Feel free to compact the json):

```javascript
  <AppSwitcher menuItem="Applications" applicationJson='{
  "items": [
    {
      "title": "FIRST SECTION",
      "items": [
        {
          "name": "Some Application",
          "href": "#someapp"
        }
      ]
    }
  ]
}'>

  </AppSwitcher>
```


*  To render a AppSwitcher with a multiple sections and multiple applications with a menu title (Feel free to compact the json):

```javascript
  <AppSwitcher menuTitle="Applications" applicationJson='{
  "items": [
    {
      "title": "FIRST SECTION",
      "items": [
        {
          "name": "Some Application",
          "href": "#someapp"
        },
        {
          "name": "Another Application",
          "href": "#anotherapp"
        }   
      ]
    },
      {
      "title": "SECOND SECTION",
      "items": [
        {
          "name": "Other Application",
          "href": "#otherapp"
        }
      ]
    }
  ]
}'>

  </AppSwitcher>
```