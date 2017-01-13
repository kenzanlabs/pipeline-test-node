'use strict';

var del = require('del');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var testPipeline = require('../src/index.js');
var exec = require('child_process').exec;
var fixturePath = path.resolve(__dirname, './fixtures');
var reportsPath = path.join(fixturePath, './reports');

describe('pipeline-test-node', function() {

  beforeEach(function() {
    del.sync([reportsPath]);
  });

  describe('API', function() {
    it('should export a test method', function() {
      expect(testPipeline.test).to.exist;
    });

    it('should export a coverage method', function() {
      expect(testPipeline.coverage).to.exist;
    });

    describe('mochaPipeline()', function () {
      it('should return a partial pipeline', function() {
        expect(testPipeline.mochaPipeline(testPipeline.test().config)).to.exist;
      });
    });

    describe('test()', function () {
      it('should return an object with config', function() {
        expect(testPipeline.test().config).to.exist;
        expect(testPipeline.test()).to.exist;
      });
    });

    describe('coverage()', function () {
      it('should return a lazypipe', function() {
        expect(testPipeline.coverage()).to.exist;
      });
    });

  });

  describe('Exit on error', function() {

    it('should exit process when test error', function(done) {
      var child = exec('gulp test:fail', {
        cwd: fixturePath
      }, function() {
        done();
      });
      child.on('exit', function(exitCode) {
        expect(exitCode).to.equal(1);
      });
    });

    it('should exit process with 0 when test passes', function(done) {
      var child = exec('gulp test:pass', {
        cwd: fixturePath
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
      var child = exec('gulp test:result', {
        cwd: fixturePath
      }, function() {
        done();
      });
      child.on('exit', function(exitCode) {
        expect(fs.statSync(path.join(reportsPath, './test-results/test-results.xml')).isFile()).to.be.true;
        expect(fs.statSync(path.join(reportsPath, './cobertura-coverage.xml')).isFile()).to.be.true;
        expect(fs.statSync(path.join(reportsPath, './coverage-final.json')).isFile()).to.be.true;
      });
    });

  });
});