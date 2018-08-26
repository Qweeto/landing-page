// Scan your HTML for assets & optimize them
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {ROOT_DIR} from './env';

const $ = gulpLoadPlugins();

gulp.task('html', () =>
  gulp
    .src([
      'app/**/*.html'
    ])
    .pipe($.useref({
      searchPath: '{.tmp,app}',
      noAssets: true
    }))
    // Minify any HTML
    .pipe($.if(['*.html', '!amp.html'], $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest(ROOT_DIR))
);
