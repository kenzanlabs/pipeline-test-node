## pipeline-test-node

## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-test-node| Pipeline to run tests locally using mocha | 1.1.1 |

# Overview

Gulp Pipeline for running unit tests for NodeJS modules using [mocha[].

[mocha]: https://mochajs.org/

## Install

`npm install pipeline-test-node --save-dev`

**Note:** Please be aware that it's suggested that you install the latest version of npm (>= 3.0) to ensure the best possible experience with this pipeline. Lower versions of npm may require additional libraries to be installed along side this pipeline. Please refer to the [npm documentation on dependency resolution](https://docs.npmjs.com/how-npm-works/npm3) for more information.

## Usage
```javascript
var gulp = require('gulp');
var config = {
  files: {
    src: [
      'path/to/files/*.js',
      'path/to/tests/*.js'
    ]  
  },
  plugins: {
    istanbul: {
      writeReports: {
        reporters: ['html'],
      }
      thresholds: {
        global: 70
      }
    }
  }
};

var testPipeline = require('pipeline-test-node');
var test = testPipeline.test(config);
var coverage = testPipeline.coverage();

gulp.task('coverage', function() {
  return gulp.src(config.files.src)
    .pipe(coverage());
});

gulp.task('default', ['coverage'], function() {
  return gulp
    .src(['src/**/*.spec.js'], {read: false})
    .pipe(test());
});
```

> Coverage task must be run first to initialize `istanbul` for coverage reports.

## Methods

### `coverage()`
Partial pipeline for initializing `istanbul` for reporting.

### `mochaPipeline()`
Returns a partial pipeline for running mocha.

### `test(config)`
Returns a partial pipeline for running mocha tests and writing reports.

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    + __plugins.istanbul:__ Object to define instanbul configurations. You can find the properties in the [Istanbul API](https://github.com/SBoudrias/gulp-istanbul#api)

    + __plugins.mocha:__ Object to define mocha configurations. You can find the properties in [Mocha options](http://mochajs.org/#usage)


Default:
```javascript
config = {
  plugins: {
    istanbul: {
      writeReports: {
        dir: './reports/',
        reporters: ['json', 'text-summary', 'cobertura'],
        reportOpts: {
          dir: './reports'
        }
      },
      thresholds: {
        global: 90
      }
    },
    mocha: {
      reporter: 'spec'
    }
  }
}
```

## Results

   This pipeline returns an object. This object receives a stream with the files to test, and you can call the _test_ method to run the unit tests. It uses mocha, and validates based on the configuration provided in _config.mochaConfig_. If no configuration is provided it will use mocha's default.  


## LICENSE
Copyright 2015 Kenzan, LLC <http://kenzan.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.