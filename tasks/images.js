// Optimize images
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import {ROOT_DIR} from './env';

const $ = gulpLoadPlugins();

gulp.task('images', () =>
  gulp
    .src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
    })))
    .pipe(gulp.dest(`${ROOT_DIR}/images`))
    .pipe($.size({title: 'images'}))
);
