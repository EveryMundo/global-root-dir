const fs = require('fs');
const { globalScope } = require('./lib/global-scope');

const setGlobalRootDir = (value = '', configurable = false, overwrite = false) => {
  if (globalScope.__rootdir && !overwrite) return globalScope.__rootdir;

  if (!value) value = process.cwd();

  fs.readdirSync(value);

  Object.defineProperty(globalScope, '__rootdir', { value, configurable });

  return globalScope.__rootdir;
};

module.exports = { setGlobalRootDir };
