## Serialize

Serializes a JS object into a string. For example, given the object:

```javascript
{
  foo: "abc",
  bar: {
    qux: "xyz"
  }
}
```

it would return:

```javascript
"foo=abc&bar%5Bqux%5D=xyz"; // decoded: "foo=abc&bar[qux]=xyz"

```
