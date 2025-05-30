const gs = require("./glob-stream");
const readContents = require("./read-contents");
const wrapVinyl = require("./wrap-vinyl");

function src(glob) {
  const gsStream = gs(glob);
  const vinylStream = gsStream.pipe(wrapVinyl());
  const contentsStream = vinylStream.pipe(readContents());
  return contentsStream;
}

module.exports = src;
