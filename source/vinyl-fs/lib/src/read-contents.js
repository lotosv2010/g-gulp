const fs = require("fs");
const through = require("through2");

function readContents() {
  function readFile(file, encoding, callback) {
    fs.readFile(file.path, encoding, (err, data) => {
      file.contents = Buffer.from(data);
      callback(null, file);
    });
  }
  return through.obj(readFile);
}
module.exports = readContents;
