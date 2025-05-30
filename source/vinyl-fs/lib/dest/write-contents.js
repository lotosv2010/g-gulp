const fs = require("fs-extra");
const path = require("path");
const through = require("through2");

function writeContents(outFolder) {
  function writeFile(file, encoding, callback) {
    const basePath = path.resolve(file.cwd, outFolder);
    const writePath = path.resolve(basePath, file.relative);
    file.path = writePath;
    fs.ensureDir(path.dirname(writePath), (err) => {
      fs.writeFile(file.path, file.contents, encoding, callback);
    });
  }
  return through.obj(writeFile);
}

module.exports = writeContents;
