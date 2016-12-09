'use strict';

var gulp = require('gulp');
var testPipeline = require('./src/index.js');
var validatePipeline = require('pipeline-validate-js');

gulp.task('test', function(){
  return gulp
    .src(['test/*.js', '!test/fixtures'])
    .pipe(testPipeline.test());
});

gulp.task('build', ['test'], function() {
  return gulp
    .src(['src/**/*.js'])
    .pipe(validatePipeline.validateJS());
});