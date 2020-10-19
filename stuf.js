const cp = require('child_process');
const path = require('path');
let cs;
module.exports.start = function () {
  cs = cp.execFile(path.join(__dirname, './node_modules/code-server/out/node/entry.js'), [
    '--auth', 'none', '--port', '3512'
  ]);
  cs.stdout.on('data', (data) => {
    console.log(data.toString());
  });
};
module.exports.open = function (file) {
  cp.execFile(path.join(__dirname, './node_modules/code-server/out/node/entry.js'), [
    file, '-r'
  ], (_, stdout) => {
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
