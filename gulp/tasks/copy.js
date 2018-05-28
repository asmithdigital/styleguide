"use strict";

function copyFdIcons(GV) {
  return function () {
    GV.gulp
      .src([
        './node_modules/foundation-icons/foundation-icons.eot',
        './node_modules/foundation-icons/foundation-icons.svg',
        './node_modules/foundation-icons/foundation-icons.ttf',
        './node_modules/foundation-icons/foundation-icons.woff'
      ])
      .pipe(GV.gulp.dest(GV.PATHS.dist + '/assets/css'));
  }
}

function copyDemoJS(GV) {

  return function () {
    GV.gulp
      .src('src/docs/demo/*.js')
      .pipe(GV.gulp.dest(GV.PATHS.dist + '/assets/js/vendor'))
      .on('finish', copyFdIcons(GV));
  }
}

function copyJsDeps(GV) {

  let depsArray = GV.CONFIG.JS_DEPS;
  depsArray = depsArray.concat(GV.CONFIG.JS_POLLYFILLS);

  return function () {
    GV.gulp
      .src(depsArray)
      .pipe(GV.gulp.dest(GV.PATHS.src + '/assets/js/vendor'))
      .on('finish', copyDemoJS(GV));
  }
}

function copyGlobalPartials(GV) {
  return function () {
    GV.gulp
      .src(GV.PATHS.src + '/docs/partials/*.html')
      .pipe(GV.gulp.dest(GV.PATHS.dist + '/partials'))
      .on('finish', copyJsDeps(GV));
  }
}

function copyData(GV) {
  return function () {
    GV.gulp
      .src('src/data/*.json')
      .pipe(GV.gulp.dest(GV.PATHS.dist + '/data'))
      .on('finish', copyGlobalPartials(GV));
  }
}

module.exports = (GV) => {

  // @TODO: this needs to run after the vendor copy deps tasks
  // because it is copying the assets folder before the latest vendor js is copied into assets
  return function() {
    let stream = GV.gulp
      .src(GV.PATHS.assets)
      .pipe(GV.gulp.dest(GV.PATHS.dist + '/assets'))
      .on('end', copyData(GV));

    return stream;
  };
};
