const gulp = require('gulp');
const { copyDistToDocs } = require('./docs');
const pkg = require('./package.json');

/**
 *  BELOW SCRIPT TO DEPLOY OUR GITHUB PAGES
 */

gulp.task('copy', copyDistToDocs);

gulp.task('default', gulp.series('copy'));
