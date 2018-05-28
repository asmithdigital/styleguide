"use strict";

module.exports = (GV) => {
  return function() {
    let stream = GV.gulp
      .src([
        GV.PATHS.src + '/assets/img/**/*',
        GV.PATHS.src + '/docs/img/**/*'
      ])
      .pipe(GV.$.if(GV.PRODUCTION, GV.$.imagemin({
        progressive: true
      })))
      .pipe(GV.gulp.dest(GV.PATHS.dist + '/assets/img'));

    return stream;
  };
};
