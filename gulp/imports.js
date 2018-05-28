'use strict';

import yargs         from 'yargs';
import browser       from 'browser-sync';
import panini        from 'panini';
import rimraf        from 'rimraf';
import yaml          from 'js-yaml';
import fs            from 'fs';
import webpackStream from 'webpack-stream';
import webpack2      from 'webpack';
import named         from 'vinyl-named';
import foundationDocs from 'foundation-docs';
import supercollider from 'supercollider';
import concat        from 'gulp-concat';
import replace       from 'gulp-replace';
import inquirer      from 'inquirer';
import async         from 'async';
import del           from 'del';

module.exports = {
  yargs: yargs,
  browser: browser,
  panini: panini,
  rimraf: rimraf,
  yaml: yaml,
  fs: fs,
  webpackStream: webpackStream,
  webpack2: webpack2,
  named: named,
  foundationDocs: foundationDocs,
  supercollider: supercollider,
  concat: concat,
  replace: replace,
  inquirer: inquirer,
  async: async,
  del: del
};
