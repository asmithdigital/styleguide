"use strict";

const pluginsAsExternals = {
  'jquery': 'jQuery',
  './foundation.core': '{Foundation: window.Foundation}',
  './foundation.util.core' : '{rtl: window.Foundation.rtl, GetYoDigits: window.Foundation.GetYoDigits, transitionend: window.Foundation.transitionend}',
  './foundation.util.imageLoader' : '{onImagesLoaded: window.Foundation.onImagesLoaded}',
  './foundation.util.keyboard' : '{Keyboard: window.Foundation.Keyboard}',
  './foundation.util.mediaQuery' : '{MediaQuery: window.Foundation.MediaQuery}',
  './foundation.util.motion' : '{Motion: window.Foundation.Motion, Move: window.Foundation.Move}',
  './foundation.util.nest' : '{Nest: window.Foundation.Nest}',
  './foundation.util.timer' : '{Timer: window.Foundation.Timer}',
  './foundation.util.touch' : '{Touch: window.Foundation.Touch}',
  './foundation.util.box' : '{Box: window.Foundation.Box}',
  './foundation.plugin' : '{Plugin: window.Foundation.Plugin}',
  './foundation.dropdownMenu' : '{DropdownMenu: window.Foundation.DropdownMenu}',
  './foundation.drilldown' : '{Drilldown: window.Foundation.Drilldown}',
  './foundation.accordionMenu' : '{AccordionMenu: window.Foundation.AccordionMenu}',
  './foundation.accordion' : '{Accordion: window.Foundation.Accordion}',
  './foundation.tabs' : '{Tabs: window.Foundation.Tabs}',
  './foundation.smoothScroll' : '{SmoothScroll: window.Foundation.SmoothScroll}',
};

let webpackConfig = {
  rules: [
    {
      test: /.js$/,
      use: [
        {
          loader: 'babel-loader'
        }
      ]
    }
  ]
};

// Reusable gulp build function for DRY webpack and pipes.
function gulpBuildPipes(GV, source, dist, externals, finish) {

  return GV.gulp
      .src(source)
      .pipe(GV.TASKS.named())
      .pipe(GV.$.sourcemaps.init())
      .pipe(GV.TASKS.webpackStream({
        module: webpackConfig,
        externals: externals
      }, GV.TASKS.webpack2))
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.uglify()
        .on('error', e => {
          console.log(e);
        })
      ))
      .pipe(GV.$.if(!GV.PRODUCTION, GV.$.sourcemaps.write()))
      .pipe(GV.gulp.dest(GV.PATHS.src + dist))
      .on('finish', finish);
}

// Build a bundle of deps, docs and transpiled docs (containing UA plugins)
function buildDocsBundle(GV) {

  let docsArray = GV.CONFIG.JS_DEPS;
  docsArray = docsArray.concat(GV.CONFIG.JS_DOCS);
  docsArray = docsArray.concat(GV.PATHS.src + '/docs/dist/js/docs.js'); // This one contains the UA plugins in ES6 only.

  return function() {
    GV.gulp
      .src(docsArray)
      .pipe(GV.TASKS.concat('docs.bundle.js'))
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.uglify()
        .on('error', e => { console.log(e); })
      ))
      .pipe(GV.$.if(!GV.PRODUCTION, GV.$.sourcemaps.write()))
      .pipe(GV.gulp.dest(GV.PATHS.src + '/docs/dist/js/'));
  }
}

// Build app js bundled with jQuery
function buildAppBundle(GV) {
  return function() {
    GV.gulp
      .src([
          'node_modules/jquery/dist/jquery.min.js',
          GV.PATHS.src + '/assets/js/app.js'
        ])
      .pipe(GV.TASKS.concat('app.jquery.js'))
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.uglify()
          .on('error', e => {
            console.log(e);
          })
      ))
      .pipe(GV.$.if(!GV.PRODUCTION, GV.$.sourcemaps.write()))
      .pipe(GV.gulp.dest(GV.PATHS.src + '/assets/js'))
      .on('finish', buildDocsBundle(GV));
  }
}

// Bundle app.js with any deps that are not ES6 importable
function buildAppWithDeps(GV) {
  return function() {
    GV.gulp
      .src([
        'node_modules/corejs-typeahead/dist/typeahead.bundle.min.js',
        GV.PATHS.src + '/assets/js/app.js'
      ])
      .pipe(GV.TASKS.concat('app.js'))
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.uglify()
        .on('error', e => {
          console.log(e);
        })
      ))
      .pipe(GV.$.if(!GV.PRODUCTION, GV.$.sourcemaps.write()))
      .pipe(GV.gulp.dest(GV.PATHS.src + '/assets/js'))
      .on('finish', buildAppBundle(GV));
  }
}

// Build docs file into ES5 to then be built into docs bundle
function buildDocs(GV) {
  return function () {
    let stream = gulpBuildPipes(GV, GV.PATHS.src + '/js/docs.js', '/docs/dist/js', {jquery: 'jQuery'}, buildAppWithDeps(GV));
    return stream;
  };
}

// Build js plugins individually
function plugins(GV) {
  return function() {
    let stream = gulpBuildPipes(GV, ['src/js/lib/*.js', '!src/js/lib/foundation-explicit-pieces.js'], '/assets/js/plugins', pluginsAsExternals, buildDocs(GV));
    return stream;
  };
}

// Transpile ES6 entries
module.exports = (GV) => {

  return function(done) {
    GV.TASKS.rimraf(GV.PATHS.src  + '/assets/js/*.js', done);
    GV.TASKS.rimraf(GV.PATHS.src  + '/assets/js/plugins', done);
    let stream = gulpBuildPipes(GV, GV.PATHS.entries, '/assets/js', {jquery: 'jQuery'}, plugins(GV));
    return stream;
  };
};
