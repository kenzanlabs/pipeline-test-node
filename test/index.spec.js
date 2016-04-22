'use strict';

var del = require('del');
var expect = require('chai').expect;
var fs = require('fs');
var gulp = require('gulp');
var testPipeline = require('../src/index.js');

describe('pipeline-test-node', function() {

  describe('Test Results Generations', function() {

    it('should test that reports were generated correctly with default config', function (done) {
      //remove existing reports to avoid false positives
      del.sync(['./reports']);

      gulp.src('test/**/*.js')
        .pipe(testPipeline.test())
        .on('end', function () {

          fs.stat('reports/test-results/test-results.xml', function(err) {
            expect(err).to.be.a('null');
          });

          fs.statSync('coverage/lcov-report/index.html', function(err) {
            expect(err).to.be.a('null');
          });

          fs.statSync('coverage/coverage-final.json', function(err) {
            expect(err).to.be.a('null');
          });

          done();
        });
    });

  });
});