"use strict";

let exec = require('child_process').exec;

module.exports = (GV) => {

  return function(done) {
    let stream = exec('node_modules/.bin/customizr -c customizr-config.json', function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      done(err);
    });

    return stream;
  };
};
