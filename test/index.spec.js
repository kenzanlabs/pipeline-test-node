'use strict';

var del = require('del');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var testPipeline = require('../src/index.js');
var exec = require('child_process').exec;

describe('pipeline-test-node', function() {

  describe('Exit on error', function() {

    it('should exit process when test error', function(done) {
      var child = exec('gulp test:fail', {
        cwd: path.resolve(__dirname, './fixtures')
      }, function() {
        done();
      });
      child.on('exit', function(exitCode) {
        expect(exitCode).to.equal(1);
      });
    });

    it('should exit process with 0 when test passes', function(done) {
      var child = exec('gulp test:pass', {
        cwd: path.resolve(__dirname, './fixtures')
      }, function() {
        done();
      });
      child.on('exit', function(exitCode) {
        expect(exitCode).to.equal(0);
      });
    });

  });

  describe('Test Results Generations', function() {

    it('should test that reports were generated correctly with default config', function(done) {
      //  remove existing reports to avoid false positives
      del.sync(['./reports']);

      gulp.src(['test/*.js', '!test/fixtures'])
        .pipe(testPipeline.test())
        .on('end', function() {

          fs.stat('reports/test-results/test-results.xml', function(err) {
            expect(err).to.be.a('null');
          });

          fs.statSync('reports/cobertura-coverage.xml', function(err) {
            expect(err).to.be.a('null');
          });

          fs.statSync('reports/coverage-final.json', function(err) {
            expect(err).to.be.a('null');
          });

          done();
        });
    });

  });
});