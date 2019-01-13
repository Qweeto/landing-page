import gulp from 'gulp'
import firebase from 'firebase-tools'
import { output as pagespeed } from 'psi'

// Run PageSpeed Insights
gulp.task('pagespeed', cb =>
  // Update the below URL to the public URL of your site
  pagespeed(
    'https://tewst-landing-page.firebaseapp.com',
    {
      strategy: 'mobile'
      // By default we use the PageSpeed Insights free (no API key) tier.
      // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
      // key: 'YOUR_API_KEY'
    },
    cb
  )
)

gulp.task('deploy', () =>
  firebase
    .deploy({
      project: process.env.PROJECT_NAME,
      token: process.env.FIREBASE_TOKEN,
      cwd: `../${ROOT_DIR}`
    })
    .then(() => {
      console.log('Firebase deploy success!')
      process.exit(0)
    })
    .catch(err => {
      console.error(err)
      process.exit(1)
    })
)
