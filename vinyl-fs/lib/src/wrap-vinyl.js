const File = require("vinyl");
const through = require("through2");

function wrapVinyl() {
  function wrapFile(globFile, encoding, callback) {
    var file = new File(globFile);
    callback(null, file);
  }
  return through.obj(wrapFile);
}

module.exports = wrapVinyl;
