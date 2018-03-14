/* eslint-env mocha */

const { expect } = require('chai');

describe('index.js', () => {
  const lib = require('../index');

  it('should have 1 key', () => {
    expect(Object.keys(lib)).to.have.property('length', 1);
  });

  it('should have the proper setGlobalRootDir key', () => {
    const { setGlobalRootDir } = require('../set-gobal-root-dir');
    expect(lib).to.have.property('setGlobalRootDir', setGlobalRootDir);
  });
});