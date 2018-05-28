"use strict";

function buildDocsCSS(GV) {
  return function() {
    GV.gulp.src(GV.PATHS.src + '/docs/scss/docs.scss')
      .pipe(GV.$.sourcemaps.init())
      .pipe(GV.$.sass({
        includePaths: GV.PATHS.sass
      })
        .on('error', GV.$.sass.logError))
      .pipe(GV.$.autoprefixer({
        browsers: GV.COMPATIBILITY
      }))
      // Comment in the pipe below to run UnCSS in production
      //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.cleanCss({compatibility: 'ie9'})))
      .pipe(GV.$.if(!GV.PRODUCTION, GV.$.sourcemaps.write()))
      .pipe(GV.gulp.dest(GV.PATHS.src + '/docs/dist/css'))
      .pipe(GV.TASKS.browser.reload({stream: true}));
  }
}

module.exports = (GV) => {
  return function(done) {
    GV.TASKS.rimraf(GV.PATHS.src  + '/assets/css/*.css', done);
    let stream = GV.gulp
      .src(GV.PATHS.src + '/scss/app.scss')
      .pipe(GV.$.sourcemaps.init())
      .pipe(GV.$.sass({
        includePaths: GV.PATHS.sass
      })
        .on('error', GV.$.sass.logError))
      .pipe(GV.$.autoprefixer({
        browsers: GV.COMPATIBILITY
      }))
      // Comment in the pipe below to run UnCSS in production
      //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.cleanCss({ compatibility: 'ie9' })))
      .pipe(GV.$.if(!GV.PRODUCTION, GV.$.sourcemaps.write()))
      .pipe(GV.gulp.dest(GV.PATHS.src + '/assets/css'))
      .pipe(GV.TASKS.browser.reload({ stream: true }))
      .on('end', buildDocsCSS(GV));

    return stream;
  };
};
