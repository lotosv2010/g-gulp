// const { series, parallel, src, dest } = require('gulp');
const { series, parallel, src, dest } = require('./gulp/lib');
const fs = require('fs');
const through = require('through2');

console.log('gulpfile', process.env.NODE_ENV);
const defaultTask = (done) => {
  console.log('default task');
  done();
};

const oneTask = (done) => {
  setTimeout(() => {
    console.log('one task');
    done();
  }, 1000);
};

const twoTask = (done) => {
  setTimeout(() => {
    console.log('two task');
    done();
  }, 1000);
};

const threeTask = (done) => {
  setTimeout(() => {
    console.log('three task');
    done();
  }, 1000);
};


function promiseTask() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promiseTask');
      resolve();
    }, 1000);
  });
}
async function asyncTask() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
  console.log('asyncTask');
}
function streamTask(done) {
  // return fs.createReadStream('README.md')
  //   .pipe(through((chunk, encoding, next) => {
  //     setTimeout(() => {
  //       next(null, chunk);
  //     }, 1000);
  //   }))
  //   .pipe(fs.createWriteStream('output.txt'));
  return src('*.md')
    .pipe(dest('dist')).on('finish', (done1) => {
      done()
    });
}

exports.series = series(oneTask, twoTask, threeTask);
exports.parallel = parallel(oneTask, twoTask, threeTask);
exports.async = asyncTask;
exports.stream = streamTask;
exports.promise = promiseTask;
exports.default = defaultTask;