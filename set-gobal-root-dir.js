const fs = require('fs');
const { globalScope } = require('./lib/global-scope');

const setGlobalRootDir = (value = '') => {
  if (globalScope.__rootdir) return;

  if (!value) value = process.cwd();

  fs.readdirSync(value);

  Object.defineProperty(globalScope, '__rootdir', { value });
};

module.exports = { setGlobalRootDir };
