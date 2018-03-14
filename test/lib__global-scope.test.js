/* eslint-env mocha */

const { expect }   = require('chai');

describe('lib/global-scope', () => {
  const { globalScope } = require('../lib/global-scope');

  it('should equal the global variable from node', () => {
    expect(globalScope).to.equal(global);
  });
});