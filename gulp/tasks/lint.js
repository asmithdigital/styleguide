"use strict";

function lintSCSS(GV) {
  // SCSS lint
  return function() {
    GV.gulp
      .src(GV.CONFIG.SASS_LINT_FILES)
      .pipe(GV.$.sassLint({
        config: './.sass-lint.yml'
      }))
      .pipe(GV.$.sassLint.format())
      .pipe(GV.$.sassLint.failOnError());
  }
}

module.exports = (GV) => {

  return function() {
    // jsLint
    let stream = GV.gulp
    .src(GV.CONFIG.JS_FILES)
    .pipe(GV.$.eslint())
    .pipe(GV.$.eslint.format())
    .on('finish', lintSCSS(GV));

    return stream;
  };
};
