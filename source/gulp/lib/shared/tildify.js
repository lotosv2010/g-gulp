const replaceHomedir = require('replace-homedir');

function tildify(filepath) {
  return replaceHomedir(filepath, '~');
}

module.exports = tildify;