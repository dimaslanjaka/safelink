const gulp = require('gulp');
const { copyDistToDemo } = require('./docs');
const pkg = require('./package.json');

/**
 *  BELOW SCRIPT TO DEPLOY OUR GITHUB PAGES
 */

gulp.task('copy', copyDistToDemo);

gulp.task('default', gulp.series('copy'));
