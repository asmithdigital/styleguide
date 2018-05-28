"use strict";

module.exports = (GV) => {

  // Search config
  let SEARCH_SORT_ORDER = ['page', 'component', 'sass variable', 'sass mixin', 'sass function', 'js class', 'js function', 'js plugin option', 'js event'];

  let SEARCH_PAGE_TYPES = {
    'library': function(item) {
      return !!(item.library);
    }
  };

  let paniniConfig = {
    root: GV.PATHS.src + '/pages/',
    layouts: GV.PATHS.src + '/layouts/',
    partials: [GV.PATHS.src + '/partials/', 'node_modules/foundation-docs/templates/partials/', GV.PATHS.src + '/templates/'],
    data: GV.PATHS.src + '/data/',
    helpers: [GV.PATHS.src + '/helpers/', GV.TASKS.foundationDocs.handlebarsHelpers]
  };

  let cacheBustConfig = {
    type: 'timestamp'
  };

  // Docs config
  GV.TASKS.supercollider
    .config({
      template: GV.PATHS.src + '/templates/component.html',
      marked: GV.TASKS.foundationDocs.marked,
      handlebars: GV.TASKS.foundationDocs.handlebars,
      keepFm: true,
      quiet: false,
      pageRoot: GV.PATHS.src + '/pages',
      data: {
        repoName: 'styleguide',
        editBranch: 'develop'
      }
    })
    .searchConfig({
      extra: GV.PATHS.src + '/data/search.yml',
      sort: SEARCH_SORT_ORDER,
      pageTypes: SEARCH_PAGE_TYPES
    })
    .adapter('sass')
    .adapter('js');

  function buildSearch() {
    GV.TASKS.supercollider.buildSearch(GV.PATHS.dist + '/data/search.json', function() {});
  }

  return function() {

    let stream = GV.gulp
      .src(GV.PATHS.src + '/pages/**/*')
      .pipe(GV.TASKS.supercollider.init())
      .pipe(GV.TASKS.panini(paniniConfig))
      .pipe(GV.$.cacheBust(cacheBustConfig))
      .pipe(GV.gulp.dest(GV.PATHS.dist))
      .on('finish', buildSearch);

    return stream;
  };
};
