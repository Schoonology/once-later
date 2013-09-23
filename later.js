// Slower, uncommon version
function long(callback) {
  var called = false

  return function cbOnceLater() {
    var args

    if (called) {
      return
    }

    called = true
    args = Array.prototype.slice.call(arguments)

    process.nextTick(function () {
      callback.apply(null, args)
    })
  }
}

// Faster, common version
function short(callback) {
  var called = false

  return function cbOnceLater(err, data) {
    if (called) {
      return
    }

    called = true

    process.nextTick(function () {
      callback(err, data)
    })
  }
}

function once(callback) {
  if (callback.length < 3) {
    return short(callback)
  }

  return long(callback)
}

module.exports = once
