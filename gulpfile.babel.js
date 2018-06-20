'use strict';

import gulp          from 'gulp';
import plugins       from 'gulp-load-plugins';

const CONFIG = require('./gulp/config');
const TASKS = require('./gulp/imports');
const $ = plugins();

// Check for --production flag
const PRODUCTION = !!(TASKS.yargs.argv.production);

// Load settings from config.yml
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  let ymlFile = TASKS.fs.readFileSync('config.yml', 'utf8');
  return TASKS.yaml.load(ymlFile);
}

// Store all variables in an object to be passed to the gulp tasks.
let GV = {
  gulp: gulp,
  CONFIG: CONFIG,
  TASKS: TASKS,
  $: $,
  PRODUCTION: PRODUCTION,
  COMPATIBILITY: COMPATIBILITY,
  PORT: PORT,
  UNCSS_OPTIONS: UNCSS_OPTIONS,
  PATHS: PATHS
};

// List of all gulp tasks
gulp.task('copy', requireTask('copy'));
gulp.task('pages', requireTask('pages'));
gulp.task('images', requireTask('images'));
gulp.task('sass', requireTask('sass'));
gulp.task('javascript', requireTask('javascript'));
gulp.task('modernizr', requireTask('modernizr'));
gulp.task('lint', requireTask('lint'));
// gulp.task('deploy', requireTask('deploy'));
import './gulp/tasks/deploy.js';

// The build task used when inside of Docker only.
gulp.task('build',
  gulp.series(clean, gulp.parallel('pages', 'sass', 'javascript', 'images'), 'copy', 'lint'));

// This task is used outside of Docker and sets up a local server.
// We don't need to run any build of CSS of JS, just copy the already built assets and html.
gulp.task('start',
  gulp.series('pages', gulp.parallel('images'), 'copy', server, watch));

// Default gulp task.
gulp.task('default',
  gulp.series('modernizr', 'build'));


// Require the relevant task
function requireTask(task) {
  return require('./gulp/tasks/' + task + '.js')(GV);
}

// Clean out the app directory before build
function clean(done) {
  TASKS.rimraf(PATHS.dist + '/*', done);
}

// Load updated HTML templates and partials into Panini
// Used within the watch function when watching layouts/partials
function resetPages(done) {
  TASKS.panini.refresh();
  done();
}

// Run the server
// ========================================================
// Start a server with BrowserSync to preview the site in
function server(done) {
  TASKS.browser.init({
    server: PATHS.dist, port: PORT
  });
  done();
}

// Reload the browser with BrowserSync
function reload(done) {
  TASKS.browser.reload();
  done();
}

// Watch for changes to static assets, pages, Sass, and JavaScript
function watch() {
  gulp.watch(PATHS.assets, {usePolling: true}).on('all', gulp.series('copy'));
  gulp.watch('src/pages/**/*', {usePolling: true}).on('all', gulp.series('pages', TASKS.browser.reload));
  gulp.watch('src/{layouts,partials}/**/*', {usePolling: true}).on('all', gulp.series(resetPages, 'pages', TASKS.browser.reload));
  gulp.watch(['src/assets/scss/**/*.scss', 'src/docs/scss/**/*.scss'], {usePolling: true}).on('all',  gulp.series('sass', TASKS.browser.reload));
  gulp.watch('src/js/**/*.js', {usePolling: true}).on('all', gulp.series('javascript', TASKS.browser.reload));
  gulp.watch('src/docs/js/*.js', {usePolling: true}).on('all', gulp.series('javascript', TASKS.browser.reload));
  gulp.watch('src/img/**/*', {usePolling: true}).on('all', gulp.series('images', TASKS.browser.reload));
}
