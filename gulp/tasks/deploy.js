'use strict';

import gulp          from 'gulp';
const CONFIG = require('./../config');
const TASKS = require('./../imports');

let exec = require('child_process').execSync;
let CURRENT_VERSION = require('./../../package.json').version;
let NEXT_VERSION;

// prompt for new version
gulp.task('release:prompt', function(cb) {
  TASKS.inquirer.prompt([{
    type: 'input',
    name: 'version',
    message: 'What version are we moving to? (Current version is ' + CURRENT_VERSION + ')'
  }])
    .then(function(res) {
      NEXT_VERSION = res.version;
      cb();
    });
});

// git flow release start
gulp.task('release:start', function(cb) {
  exec('git flow release start ' + NEXT_VERSION);
  cb();
});

// replace version
gulp.task('release:version', function() {
  return gulp.src(CONFIG.VERSIONED_FILES, { base: process.cwd() })
    .pipe(TASKS.replace(CURRENT_VERSION, NEXT_VERSION))
    .pipe(gulp.dest('.'));
});

// production asset build
gulp.task('release:build', function(cb) {
  exec('yarn build:prd');
  cb();
});

// commit, tag, push
gulp.task('release:commit', function(cb) {
  exec('git add .');
  exec('git commit -am "Bump to version ' + NEXT_VERSION + '"');
  // exec('git tag ' + NEXT_VERSION);
  // exec('git push origin develop --follow-tags');
  cb();
});

// git flow release finish
// -> prompt to proceed -> or return
// -> prompt to proceed to deploy assets -> or return
gulp.task('release:finish:prompt', function(cb) {
  TASKS.inquirer.prompt([{
    type: 'confirm',
    name: 'finish',
    message: 'Continue to release finish? (Current version is ' + NEXT_VERSION + ')'
  }])
    .then(function(res) {
      console.log('Continue to finish', res.finish);
      if (res.finish) {
        exec('git flow release finish ' + NEXT_VERSION);
      }
      else {
        console.log('no release finish')
      }
      cb();
    });
});
// Stand alone release finish task
gulp.task('release:finish', function(cb) {
  exec('git flow release finish ' + CURRENT_VERSION);
  cb();
});

gulp.task('release',
  gulp.series('release:prompt', 'release:start', 'release:version', 'release:build', 'release:commit', 'release:finish:prompt'));




// TODO: using Robo for now for deploy assets
// =============================================
// Deploy assets
// - check for version
// - delete temp folder
// - clone repo
// - checkout master
// - delete all files
// - checkout README.md
// - copy new files
// - add, commit, tag, push
// - delete temp folders

gulp.task('deploy:assets', function(cb) {
  exec('robo artefacts:release ' + CURRENT_VERSION);
  cb();
});

