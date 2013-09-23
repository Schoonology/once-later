/*global describe:true, it:true, before:true, after:true, beforeEach:true, afterEach:true */
var later = require('../')
  , expect = require('chai').expect

describe('once-later', function () {
  it('should only be called once', function (done) {
    var called = false
      , wrapped = later(test)

    wrapped()
    wrapped()

    return

    function test() {
      expect(called).to.be.false
      done()
    }
  })

  it('should carry over 1 argument', function (done) {
    var wrapped = later(one)

    wrapped(new Error('Oops!'))

    return

    function one(err) {
      expect(err).to.exist
      expect(err).to.be.an.instanceof(Error)
      expect(err.message).to.equal('Oops!')

      done()
    }
  })

  it('should carry over 2 arguments', function (done) {
    var wrapped = later(two)

    wrapped(null, 42)

    return

    function two(err, data) {
      expect(err).to.not.exist
      expect(data).to.equal(42)

      done()
    }
  })

  it('should carry over n arguments', function (done) {
    var wrapped = later(many)

    wrapped(null, 'a', null, true, 42)

    return

    function many(err, a, b, c, d) {
      expect(err).to.not.exist
      expect(a).to.equal('a')
      expect(b).to.equal(null)
      expect(c).to.equal(true)
      expect(d).to.equal(42)

      done()
    }
  })

  it('should be called in the future', function (done) {
    var sync = true
      , wrapped = later(test)

    wrapped()
    sync = false

    return

    function test() {
      expect(sync).to.be.false

      done()
    }
  })

  it('should not have a return value', function () {
    var wrapped = later(test)

    expect(wrapped()).to.not.exist

    return

    function test() {
      return 'Oops!'
    }
  })
})
