const { inherits } = require("util");
const EventEmitter = require("events");
function Undertaker() {
  EventEmitter.call(this);
  this._tasks = {};
}
inherits(Undertaker, EventEmitter);
function task(name, fn) {
  this._tasks[name] = fn;
}
function defineName(fn, name) {
  Object.defineProperty(fn, 'name', {
    value: name,      // 强制设置名称
    configurable: true,     // 允许未来修改
    writable: false         // 锁定名称
  });
}
function series() {
  const args = Array.from(arguments);
  const fn = buildSeries(args).bind(this);
  // 设置名称
  defineName(fn, series.name)
  return fn;
}
function parallel() {
  const args = Array.from(arguments);
  const fn = buildParallel(args).bind(this);
  // 设置名称
  defineName(fn, parallel.name)
  return fn;
}
function run(taskName, done) {
  const fn = this._tasks[taskName];
  fn(done);
}

Undertaker.prototype.task = task;
Undertaker.prototype.series = series;
Undertaker.prototype.parallel = parallel;
Undertaker.prototype.run = run;

function buildSeries(values) {
  function series(done) {
    const length = values.length;
    let idx = 0;
    const results = [];
    const next = (idx) => {
      let value = values[idx];
      if (typeof value !== "function") {
        value = this._tasks[value];
      }
      const startHr = process.hrtime();
      this.emit("start", { name: value.name });
      value((err, result) => {
        this.emit("stop", {
          name: value.name,
          duration: process.hrtime(startHr),
        });
        results[idx] = result;
        if (++idx >= length) {
          done(err, results);
        } else {
          next(idx);
        }
      });
    };
    next(idx);
  }
  return series;
}
function buildParallel(values) {
  function parallel(done) {
    const length = values.length;
    let count = length;
    const results = [];
    const next = (idx) => {
      let value = values[idx];
      if (typeof value !== "function") {
        value = this._tasks[value];
      }
      let startHr = process.hrtime();
      this.emit("start", { name: value.name });
      value((err, result) => {
        this.emit("stop", {
          name: value.name,
          duration: process.hrtime(startHr),
        });
        results[idx] = result;
        if (--count === 0) {
          done(err, results);
        }
      });
    };
    for (idx = 0; idx < length; idx++) {
      next(idx);
    }
  }
  return parallel;
}
module.exports = Undertaker;
