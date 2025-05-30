const through = require("through2");

function gulpPreFixer(prefixText) {
  prefixText = Buffer.from(prefixText);
  const stream = through.obj(function (file, enc, next) {
    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents]);
    }
    this.push(file);
    next();
  });
  return stream;
}
module.exports = gulpPreFixer;
