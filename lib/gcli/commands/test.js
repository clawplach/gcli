/*
 * Copyright 2012, Mozilla Foundation and contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define(function(require, exports, module) {

'use strict';

var examiner = require('test/examiner');

var testCss = require('text!gcli/commands/test.css');
var testHtml = require('text!gcli/commands/test.html');

exports.options = {};

exports.items = [
  {
    item: 'command',
    name: 'test',
    description: 'Run GCLI unit tests',
    params: [
      {
        name: 'suite',
        type: {
          name: 'selection',
          lookup: function() {
            return Object.keys(examiner.suites).map(function(name) {
              return { name: name, value: examiner.suites[name] };
            });
          }
        },
        description: 'Test suite to run.',
        defaultValue: examiner
      }
    ],
    returnType: 'examiner-output',
    noRemote: true,
    exec: function(args, context) {
      examiner.reset();

      return args.suite.run(exports.options).then(function() {
        return examiner.toRemote();
      });
    }
  },
  {
    item: 'converter',
    from: 'examiner-output',
    to: 'view',
    exec: function(output, conversionContext) {
      return conversionContext.createView({
        html: testHtml,
        css: testCss,
        cssId: 'gcli-test',
        data: output,
        options: { allowEval: true, stack: 'test.html' }
      });
    }
  }
];


});
