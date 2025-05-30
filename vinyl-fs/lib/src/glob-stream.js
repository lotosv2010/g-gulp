const { Readable } = require("readable-stream");
const { inherits } = require("util");
const glob = require("glob");
const globParent = require("glob-parent");
const toAbsoluteGlob = require("to-absolute-glob");

function globStream(globPattern, opt = {}) {
  opt.cwd = opt.cwd || process.cwd();
  return new GlobStream(globPattern, opt);
}

function GlobStream(globPattern, opt) {
  Readable.call(this, { objectMode: true });
  // 获取绝对路径
  const absoluteGlob = toAbsoluteGlob(globPattern, opt);
  // 获取 glob 的父路径
  const basePath = globParent(absoluteGlob);
  // 创建 globber
  this._globber = glob.stream(absoluteGlob, opt);
  // 监听 data 事件
  this._globber.on("data", (filepath) => {
    const obj = {
      cwd: opt.cwd,
      base: basePath,
      path: filepath,
    };
    this.push(obj);
  });
  // 监听 end 事件
  this._globber.once("end", () => {
    this.push(null);
  });
}

inherits(GlobStream, Readable);

GlobStream.prototype._read = function () {
  // 恢复 globber
  this._globber.resume();
};

module.exports = globStream;
