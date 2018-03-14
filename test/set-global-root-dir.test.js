/* eslint-env mocha */

const { expect }   = require('chai');
const sinon        = require('sinon');
const cleanrequire = require('@everymundo/cleanrequire');

describe('setGlobalRootDir', () => {
  const globalScopeLib = require('../lib/global-scope');

  let box;

  beforeEach(() => {
    box = sinon.sandbox.create();
    box.stub(globalScopeLib, 'globalScope').value({});
  });

  afterEach(() => {  box.restore();  });

  context('When no arguments are passed', () => {

    beforeEach(() => {
      box.stub(process, 'cwd').callsFake(() => __dirname);
    });

    it('should use process.pwd as value', () => {
      const { setGlobalRootDir } = cleanrequire('../set-gobal-root-dir');

      const { globalScope }      = require('../lib/global-scope');
      expect(globalScope).to.not.have.property('__rootdir');

      setGlobalRootDir();
      expect(globalScope).to.have.property('__rootdir', __dirname);
      expect(process.cwd).to.have.property('calledOnce', true);
    });

    it('should not call process.pwd more than once with multiple calls to it', () => {
      const { setGlobalRootDir } = cleanrequire('../set-gobal-root-dir');

      const { globalScope }      = require('../lib/global-scope');
      expect(globalScope).to.not.have.property('__rootdir');

      setGlobalRootDir();
      setGlobalRootDir();
      setGlobalRootDir();

      expect(globalScope).to.have.property('__rootdir', __dirname);
      expect(process.cwd).to.have.property('calledOnce', true);
    });
  });

  context('When arguments are passed', () => {
    beforeEach(() => {
      box.stub(process, 'cwd').callsFake(() => __dirname);
    });

    context('a valid directory', () => {
      it('should use the argument passed as value', () => {
        const { setGlobalRootDir } = cleanrequire('../set-gobal-root-dir');
        const input = require('path').dirname(__filename);
  
        const { globalScope } = require('../lib/global-scope');
        expect(globalScope).to.not.have.property('__rootdir');
  
        setGlobalRootDir(input);
        expect(globalScope).to.have.property('__rootdir', input);
        expect(process.cwd).to.have.property('calledOnce', false);
      });
    });

    context('a non existing directory', () => {
      it('should throw error', () => {
        const { setGlobalRootDir } = cleanrequire('../set-gobal-root-dir');

        const input = require('path').join(__dirname, String(Math.random()));
    
        const caller = () => setGlobalRootDir(input);

        expect(caller).to.throw(Error, 'ENOENT');
      });
    });

    context('a an existing file instead of a directory', () => {
      it('should throw error', () => {
        const { setGlobalRootDir } = cleanrequire('../set-gobal-root-dir');

        const input = __filename;
    
        const caller = () => setGlobalRootDir(input);

        expect(caller).to.throw(Error, 'ENOTDIR');
      });
    });
  });
});