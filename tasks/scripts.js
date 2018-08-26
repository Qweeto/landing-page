// Concatenate and minify JavaScript. Optionally transpiles ES2017 code to ES5.
import gulp from 'gulp';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import {ROOT_DIR} from './env';

const $ = gulpLoadPlugins();

gulp.task('scripts', () =>
  gulp
    .src([])
    .pipe(webpackStream({
      config: require('../webpack.config.js'),
      context: path.resolve(__dirname, './'),
      output: {
        path: path.resolve(__dirname, ROOT_DIR),
        filename: 'scripts/main.min.js',
      }
    }, webpack))
    .pipe($.size({title: 'scripts'}))
    .pipe(gulp.dest(`${ROOT_DIR}/scripts/`))
);
