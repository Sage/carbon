## Multi Step Wizard

### How to use a Multi Step Wizard in a component:

* In your file

```javascript
import MultiStepWizard from 'carbon-react/lib/components/multi-step-wizard';
```

*  To render a Multi Step Wizard:

```javascript
<MultiStepWizard
  steps={ [<div>Step 1</div>, <div>Step 2</div>, <div>Step 3</div>] }
  currentStep={ 2 }
  enableInactiveSteps={ false }
  completed={ false }
  onSubmit={ alert('success!') }
/>
```

| Name                | Required    | Type             | Default       | Description   |
| ------------------- | ----------- | ---------------- | ------------- | ------------- |
| steps               | true        | Array of Objects | null          | An array of custom step components (e.g. `<Row />, <Form />, <Textbox />`). |
| onSubmit            | true        | Function         | null          | Handle submit event when clicking on the Submit button of the wizard. |
| currentStep         | false       | Number           | 1             | Specify a step to start with. |
| enableInactiveSteps | false       | Boolean          | false         | Enable inactive steps. |
| completed           | false       | Boolean          | false         | Complete the wizard without going through steps. |
