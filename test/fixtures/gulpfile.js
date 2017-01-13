'use strict';

var gulp = require('gulp');
var testPipeline = require('../../src/index.js');
var test = testPipeline.test();
var coverage = testPipeline.coverage();

gulp.task('test:coverage', function(){
  return gulp.src(test.config.files.src)
    .pipe(coverage())
    .pipe(gulp.dest('./reports/'));
});

gulp.task('test:fail', ['test:coverage'], function(){
  return gulp
    .src('fail.spec.js')
    .pipe(test());
});

gulp.task('test:pass', ['test:coverage'], function(){
  return gulp
    .src('pass.spec.js')
    .pipe(test());
});

gulp.task('test:source', ['test:coverage'], function(){
  return gulp
    .src('source.spec.js')
    .pipe(test());
});

gulp.task('test:result', ['test:coverage'], function(){
    return gulp
      .src('pass.spec.js')
      .pipe(test());
});