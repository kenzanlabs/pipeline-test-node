var expect = require('chai').expect;
var src = require('./src/source-file.js');

describe('Source File', function() {
  it('should accept 3 arguments', function () {
    expect(src.length).to.equal(3);
  });
  it('should return a string', function () {
    expect(src()).to.equal('and returns a string');
  });
});