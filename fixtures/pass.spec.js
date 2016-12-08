var expect = require('chai').expect;

describe('Test Failure', function() {
  it('should fail', function () {
    expect('foo').to.not.equal('bar');
  });
});