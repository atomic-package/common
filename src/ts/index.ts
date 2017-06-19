/*
 * Author: Daisuke Takayama
 */

'use strict';
var e = eval, global: NodeJS.Global = e('this');

import Model from './model/';
import View from './component/';
import {
  Target,
  Trigger
} from './store/index';

declare namespace NodeJS {
  interface Global {
    document: Document;
    window: Window;
    navigator: Navigator;
    AP: {
      common: {
        model: Model,
        view: View,
      }
    };
  }
}

// npm & node
if (typeof module !== 'undefined') {
  module.exports.Model   = Model;
  module.exports.View    = View;
  module.exports.Target  = Target;
  module.exports.Trigger = Trigger;
}

// browser
if (typeof (global) !== 'undefined') {
  if (typeof global.AP === 'undefined') {
    Object.assign(global, { AP: {} });
  }
  if (typeof global.AP.common === 'undefined') {
    Object.assign(global.AP, { common: {} });
  }

  if (typeof global.AP.common.model === 'undefined') {
    Object.assign(global.AP.common, { model: Model });
  }
  if (typeof global.AP.common.view === 'undefined') {
    Object.assign(global.AP.common, { view: View });
  }
}
