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

var l10n = require('util/l10n');

/**
 * 'context' command
 */
var context = {
  item: 'command',
  name: 'context',
  description: l10n.lookup('contextDesc'),
  manual: l10n.lookup('contextManual'),
  params: [
   {
     name: 'prefix',
     type: 'command',
     description: l10n.lookup('contextPrefixDesc'),
     defaultValue: null
   }
  ],
  returnType: 'string',
  noRemote: true,
  exec: function echo(args, context) {
    // Do not copy this code
    var requisition = context.__dlhjshfw;

    if (args.prefix == null) {
      requisition.prefix = null;
      return l10n.lookup('contextEmptyReply');
    }

    if (args.prefix.exec != null) {
      throw new Error(l10n.lookupFormat('contextNotParentError',
                                        [ args.prefix.name ]));
    }

    requisition.prefix = args.prefix.name;
    return l10n.lookupFormat('contextReply', [ args.prefix.name ]);
  }
};

exports.items = [ context ];

});
