'use strict';

var gulp = require('gulp');
var testPipeline = require('./src/index.js');
var validatePipeline = require('pipeline-validate-js');

var config = {
  files: [
   'src/**/*.js',
   'test/**/*.js'
  ]
};

gulp.task('test', function(){
  return gulp
    .src(config.files)
    .pipe(testPipeline.test());
});

gulp.task('build', ['test'], function() {
  return gulp
    .src(config.files)
    .pipe(validatePipeline.validateJS());
});