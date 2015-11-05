### Best Practices for Writing Views with Carbon Components.

This guide will suggest some best practices for writing code using carbon components. The Carbon library is written using various features of ES6 (updated javascript syntax) as well as some experimental ES7 features.

## Next Generation Javascript Syntax

We use various new features of javascript which are not specific to React or Flux. However, they are encouraged as best practice since in some cases the new features provide improved functionality (such as *let*)

### `let`

* ["The let statement declares a block scope local variable, optionally initializing it to a value."](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/let)
* In most cases you can replace any use of `var` with `let`. This will prevent namespace conflicts, and will keep global variables to a minimum. One thing to note is that variables declared with `let` are not hoisted, they therefore must be declared before they are called in your code.

* BAD
  ```javascript
  for (var key in this.props.fields) {
    var field = this.props.fields[key];
      ...
    }
  }
```
Since `key` and `field` are generic names, they may be re-used in this file potentially causing unexpected behaviour.

* GOOD
```javascript
  for (let key in this.props.fields) {
    let field = this.props.fields[key];
      ...
    }
}
```
Here, `key` and `field` are scoped to the `for` block in which they are used.

### `const`

* For unique variables in your app, you be using the [new `const` declaration](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const).

### `=>` & ES7 property initializers
* The fat function arrow in ES6 shares the same lexical `this` as the surrounding code.

```javascript
class PostInfo extends React.Component {
  handleOptionsButtonClick = (e) => {
    this.setState({showOptionsModal: true});
  }
}
```

### `get`
[The get syntax binds an object property to a function that will be called when that property is looked up.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).  If it's used, it will be accessed several times, and there is no need to re-calculate that value will never be changed, or shouldn't be re-calculated.
 * :warning: Don't use getters for a property whose value you expect to change.

```javascript
get htmlClass() {
  let classes = "ui-journal";

  let debitSum = this.props.journal_store.get("debit_sum");
  let creditSum = this.props.journal_store.get("credit_sum");

  if (debitSum === creditSum) {
    classes += " totals-valid";
  }
  else {
    classes += " totals-invalid";
  }

  return classes;
}
```

then in the render function:

```javascript
render() {
  return (
    <div className={ this.htmlClass }>
      ...
    </div>
```
