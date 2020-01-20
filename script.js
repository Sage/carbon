const fs = require('fs');
const path = require('path');

const START = './cypress/features';
const getAllFiles = (dir = START) => fs.readdirSync(dir).reduce((files, file) => {
  const name = path.join(dir, file);
  const isDirectory = fs.statSync(name).isDirectory();
  if (isDirectory) {
    return [...files, ...getAllFiles(name)];
  }
  if (name.endsWith('.feature')) {
    return [...files, path.relative(START, name)];
  }
  return files;
}, []);
const files = getAllFiles();
files.forEach((file) => {
  console.log('- <<: *cypress-travis-regression');
  console.log(`env: SUITE=${file}`);
});
