'use strict';

var gulp = require('gulp');
var handyman = require('pipeline-handyman');
var istanbul = require('gulp-istanbul');
var lazypipe = require('lazypipe');
var mocha = require('gulp-mocha');

var config = {
  files: {
    src: ['./src/*.js']
  },
  plugins: {
    mocha: {
      reporter: 'mocha-junit-reporter',
      reporterOptions: {
        mochaFile: './reports/test-results/test-results.xml'
      }
    },
    istanbul: {
      writeReports: {
        dir: './reports/',
        reporters: ['json', 'text-summary', 'cobertura'],
        reportOpts: {
          dir: './reports'
        }
      },
      thresholds: {
        global: 80
      }
    }
  }
};

module.exports = {
  test: function(options) {
    options = options || {};
    config = handyman.mergeConf(config, options);

    return pipelineFactory();
  }
};

function pipelineFactory() {
  var stream;
  handyman.log('Running mocha tests');

  generateNodeCoverageReport();

  stream = lazypipe()
    .pipe(mocha, config.plugins.mocha)
    .pipe(istanbul.writeReports, config.plugins.istanbul.writeReports)
    .pipe(istanbul.enforceThresholds, config.plugins.istanbul);

  return stream();
}

function generateNodeCoverageReport() {

  return gulp.src(config.files.src)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .pipe(gulp.dest('./reports/'));
}