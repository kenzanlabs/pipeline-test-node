var expect = require('chai').expect;

describe('Test Pass', function() {
  it('should pass', function () {
    expect('foo').to.not.equal('bar');
  });
});