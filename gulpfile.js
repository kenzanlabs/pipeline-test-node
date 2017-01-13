'use strict';

var gulp = require('gulp');
var validatePipeline = require('pipeline-validate-js');
var testPipeline = require('./src/index.js');
var test = testPipeline.test({
  plugins: {
    mocha: {
      timeout: 5000
    }
  }
});
var coverage = testPipeline.coverage();

gulp.task('test:coverage', function(){
  return gulp.src(test.config.files.src)
    .pipe(coverage())
    .pipe(gulp.dest('./reports/'));
});

gulp.task('test', ['test:coverage'], function(){
  return gulp
    .src('./test/index.spec.js')
    .pipe(test());
});

gulp.task('build', ['test'], function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(validatePipeline.validateJS());
});