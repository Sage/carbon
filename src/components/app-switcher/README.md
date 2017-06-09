# App Wrapper

## How to use a AppSwitcher in a component:

* In your file

```javascript
import AppWrapper from 'carbon/lib/components/app-switcher';
```

*  To render a AppWrapper:

```javascript
  <AppSwitcher manuTitle="Applications" applicationJson='{"items":[{"title":"CLIENT APPS","items":[{"name":"Accounting","href":"#accounting"},{"name":"Payroll","href":"#payroll"}]},{"title":"ACCOUNTANT APPS","items":[{"name":"Accountants Cloud","href":"#accountantCloud"},{"name":"Corporation Tax","href":"#corporateTax"},{"name":"Final Accounts","href":"#finalAccounts"}]}]}'>

  </AppSwitcher>
```
