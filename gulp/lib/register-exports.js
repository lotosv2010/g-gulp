const logEvents = require('./log/events');

/**
 * 注册任务
 * @param {*} gulpInst gulp实例
 * @param {*} tasks 任务对象
 */
function registerExports (gulpInst, tasks) {
  logEvents(gulpInst) 
  Object.entries(tasks).forEach(([name, task]) => {
    gulpInst.task(name, task)
  })
}

module.exports = registerExports