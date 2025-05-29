const chalk = require('chalk');

function log(message) {
  const timestamp = new Date().toLocaleTimeString('en', { hour12: false })
  console.log(`[${chalk.magentaBright(timestamp)}]`, message)
}

module.exports = log;