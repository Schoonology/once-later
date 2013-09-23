# Once-Later

A simple wrapper around callbacks to make them fire both once and later.

## Installation

```
npm install once-later --save
```

## Usage

```
var later = require('once-later')

function doSomethingAsync(callback) {
  callback = later(callback)
  
  ... later ...
  
  if (err) {
    return callback(err) // Once-Later guarantees no funky return value.
  }
  
  callback(null, ...)
}
```

## Doesn't this already exist?

There's a far more popular version, [once](https://npmjs.org/package/once), that only guarantees that the function will be called once. This combines that with the [recommended practice for callback functions](https://groups.google.com/forum/#!topic/nodejs/0TmVfX9z1R0) that all callbacks are fired _later_.
