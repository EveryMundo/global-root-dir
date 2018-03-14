# @everymundo/global-root-dir
Sets a global variable variable __rootdir

## Install
```sh
npm install @everymundo/global-root-dir
```

## Usage
```js
// this will use process.pwd() as value
require('@everymundo/global-root-dir').setGlobalRootDir()
console.log(global.__rootdir);
console.log({__rootdir});

// if you prefer you can pass a directory
require('@everymundo/global-root-dir').setGlobalRootDir(__dirname)
console.log(global.__rootdir);
console.log({__rootdir});
```