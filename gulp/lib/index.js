const Undertaker = require('undertaker');
const { inherits } = require('util');

function Gulp() {
  Undertaker.call(this);
  this.task = this.task.bind(this);
  this.series = this.series.bind(this);
  this.parallel = this.parallel.bind(this);
}

inherits(Gulp, Undertaker);

const inst = new Gulp();

module.exports = inst;

