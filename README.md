# parse-top

Parses the output of `top`. `require` in Node or, if installed globally, pipe output from `top -l 1` into `parse-top` and JSON shall be returned.

The returned object has the following structure:
``` javascript
{
  globalState: {
    Processes: "",
    // ...
  },
  processes: [
    {
      PID: "12345",
      // ...
    },
    // ...
  ]
}
```
