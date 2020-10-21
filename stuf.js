const cp = require('child_process');
const path = require('path');
let cs;
module.exports.start = function () {
  return new Promise((resolve, reject) => {
    cs = cp.exec(`yarn code-server --auth none --port 3512  --user-data-dir ${path.join(__dirname, '..', '..', '..', '..')}`, {
      cwd: __dirname
    });
    cs.stdout.on('data', (data) => {
      console.log(data.toString());
      if (data.toString().includes('server listening on')) {
        resolve();
      }
    });
  });
};
module.exports.open = function (file) {
  cp.exec(`yarn code-server ${file} -r`, { cwd: __dirname }, (_, stdout) => {
    console.log(stdout);
    if (stdout.includes('error')) {
      setTimeout(() => {
        module.exports.open(file);
      }, 1000);
    }
  });
};

module.exports.stop = function () {
  cs.kill();
};
