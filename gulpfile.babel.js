'use strict';
import gulp from 'gulp';
import del from 'del';
import runSequence from 'run-sequence';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();
const ROOT_DIR = 'dist';

// Clean output directory
gulp.task('clean', () => del(['.tmp', `${ROOT_DIR}/*`, `!${ROOT_DIR}/.git`], {dot: true}));

// Build production files, the default task
gulp.task('default', ['clean'], cb =>
  runSequence(
    'lint',
    'images',
    'html',
    'scripts',
    'copy-manifests',
    'generate-service-worker',
    cb
  )
);

gulp.task('copy-manifests', () =>
  gulp
    .src([
      'app/humans.txt',
      'app/robots.txt',
      'app/manifest.json',
      'app/manifest.webapp',
      'app/opensearch.xml',
      'app/sitemap.xml',
    ], {
      dot: true
    })
    .pipe(gulp.dest(`${ROOT_DIR}/`))
    .pipe($.size({title: 'copy'}))
);

try {
  // Load custom tasks from the `tasks` directory
  // eslint-disable-next-line
  require('require-dir')('tasks');
} catch (err) {
  console.error(err);
}
