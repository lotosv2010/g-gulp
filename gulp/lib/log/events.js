const log = require('./console');
const chalk = require('chalk');

function logEvents(gulpInst) {
  gulpInst.on('start', (e) => {
    log(`Starting '${chalk.cyanBright(e.name)}'...`)
  })

  gulpInst.on('stop', (e) => {
    log(`Finished '${chalk.cyanBright(e.name)}' after ${chalk.magentaBright(e.duration[0])} s`)
  })
}

module.exports = logEvents;