'use strict';

var gulp = require('gulp');
var testPipeline = require('../../src/index.js');

gulp.task('test:fail', function(){
  return gulp
    .src('fail.spec.js')
    .pipe(testPipeline.test());
});

gulp.task('test:pass', function(){
  return gulp
    .src('pass.spec.js')
    .pipe(testPipeline.test());
});