#!/usr/bin/env node

const path = require('path');
const chalk = require('chalk');
const gulpInst = require('../lib');
const registerExports = require('../lib/register-exports');
const tildify = require('../lib/shared/tildify');
const log = require('../lib/log/console');

// 获取 taskName
const taskName = process.argv[2];
// 获取要运行的任务
const toRun = taskName ? [taskName] : ['default']

// 获取 gulpfile.js
const configPath = path.join(process.cwd(), 'gulpfile.js');
log(`Using gulpfile ${chalk.magentaBright(tildify(configPath))}`);

// 获取 gulpfile.js 中的任务
const exported = require(configPath)
// 注册任务
registerExports(gulpInst, exported);

// 运行任务
gulpInst.parallel(toRun)(() => {
  console.log('done')
})