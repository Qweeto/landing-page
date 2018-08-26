import gulp from 'gulp';
import firebase from 'firebase-tools';
import {ROOT_DIR} from './env';

gulp.task('deploy', () =>
  firebase
    .deploy({
      project: process.env.PROJECT_NAME,
      token: process.env.FIREBASE_TOKEN,
      cwd: `../${ROOT_DIR}`
    })
    .then(() => {
      console.log('Firebase deploy success!');
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    })
);
