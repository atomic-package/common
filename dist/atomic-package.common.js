(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ap-common"] = factory();
	else
		root["ap-common"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Model = (function () {
    function Model() {
    }
    Model.isArray = function (data) {
        return Array.isArray(data) || typeof data !== 'object' && /^\[(\d|[^[|,])/.test(data);
    };
    Model.isObject = function (data) {
        var type = typeof data;
        return type === 'function' || type === 'object' && !!data;
    };
    Model.getSearchItems = function (dataList, type) {
        if (!type)
            return;
        var key = Object.keys(type)[0];
        if (type === 'all') {
            return dataList;
        }
        else {
            return dataList.filter(function (data) {
                return (data[key] == type[key]);
            });
        }
    };
    Model.stringToNumber = function (data) {
        if (parseInt(data, 10) && /^\d|(^\-)/.test(data)) {
            return parseInt(data, 10);
        }
        else {
            return data;
        }
    };
    Model.stringToObjectCheck = function (data) {
        return /{.*:.*}/.test(data);
    };
    Model.stringToJson = function (data) {
        return JSON.parse(data
            .replace(/([\$\w]+)\s*:/g, function (_, $1) { return '"' + $1 + '":'; })
            .replace(/'([^']+)'/g, function (_, $1) { return '"' + $1 + '"'; }));
    };
    Model.stringToArray = function (data) {
        var _this = this;
        if (typeof data === 'string') {
            var splitList = data.replace(/^\[/g, '').replace(/\s+/g, '').replace(/\]$/g, '').split(","), newSplitList_1 = [];
            if (this.stringToObjectCheck(splitList)) {
                splitList.forEach(function (item) {
                    if (_this.stringToObjectCheck(item)) {
                        newSplitList_1.push(_this.stringToJson(item.trim()));
                    }
                    else {
                        newSplitList_1.push(_this.stringToNumber(item));
                    }
                });
                return newSplitList_1;
            }
            else {
                splitList.forEach(function (item) {
                    newSplitList_1.push(_this.stringToNumber(item));
                });
                return newSplitList_1;
            }
        }
        else {
            return data;
        }
    };
    Model.checkType = function (data) {
        switch (typeof data) {
            case 'object':
                return data;
            case 'number':
                return { id: data };
            case 'string':
                if (/^#/.test(data)) {
                    return { idName: data.substr(1) };
                }
                else if (/^\./.test(data)) {
                    return { className: data.substr(1) };
                }
                else if (/all/gi.test(data)) {
                    return 'all';
                }
                else if (this.stringToNumber(data)) {
                    return { id: data };
                }
                break;
        }
    };
    Model.search = function (dataList, type) {
        var _this = this;
        if (this.isArray(type)) {
            var keys_1 = [], searchItems_1 = [], resultItem_1 = [];
            this.stringToArray(type).forEach(function (item) {
                keys_1.push(_this.checkType(item));
            });
            keys_1.forEach(function (key) {
                searchItems_1 = _this.getSearchItems(dataList, key);
                searchItems_1.forEach(function (item) {
                    resultItem_1.push(item);
                });
            });
            return resultItem_1;
        }
        else {
            return this.getSearchItems(dataList, this.checkType(type));
        }
    };
    Model.uniq = function (stringArr) {
        var newArr = stringArr.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
        return newArr;
    };
    Model.flattenArray = function (array) {
        return [].concat.apply(array);
    };
    Model.createTriggerModel = function (triggerView, triggerClass) {
        var triggerList = [];
        triggerView.forEach(function (trigger) {
            triggerList.push(triggerClass.fromData(trigger));
        });
        return triggerList;
    };
    Model.createTargetModel = function (targetView, targetClass) {
        var targetList = [];
        targetView.forEach(function (target) {
            targetList.push(targetClass.fromData(target));
        });
        return targetList;
    };
    Model.setTriggerTargetId = function (triggerList, targetList) {
        for (var i = 0; i < triggerList.length; i++) {
            triggerList[i].setTargetId(targetList);
        }
    };
    return Model;
}());
exports.Model = Model;
exports.default = Model;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __webpack_require__(0);
var View = (function () {
    function View() {
    }
    View.getFirstChildLastNode = function (child) {
        if (child.children.length > 0) {
            return this.getFirstChildLastNode(child.children[0]);
        }
        else {
            return child;
        }
    };
    View.createFromTriggerElement = function (selectors, trigger) {
        var triggerList = [], triggerViewList = [];
        selectors.forEach(function (selector) {
            triggerList.push(document.querySelectorAll(selector));
        });
        triggerList.forEach(function (nodeList) {
            for (var i = 0; i < nodeList.length; i++) {
                triggerViewList.push(trigger.fromData(nodeList[i]));
            }
        });
        return triggerViewList;
    };
    View.createTargetView = function (triggerList, target) {
        var selectors = this.getTargetSelectors(triggerList), targetNodeList = this.getTargetNodeList(selectors), createTargetList = this.createFromTargetsElement(targetNodeList, target);
        return this.getTargetViewList(createTargetList);
    };
    View.getTargetSelectors = function (triggerList) {
        var selectors = [];
        triggerList.forEach(function (trigger) {
            if (trigger.target) {
                selectors.push(trigger.target);
            }
        });
        return _1.default.uniq(selectors);
    };
    View.getTargetNodeList = function (selectors) {
        var targetNodeList = [];
        for (var i = 0; i < selectors.length; i++) {
            if (selectors[i] !== "all") {
                targetNodeList.push(document.querySelectorAll(selectors[i]));
            }
        }
        return targetNodeList;
    };
    View.createFromTargetsElement = function (targetList, target) {
        var targetViewList = [];
        targetList.forEach(function (nodeList) {
            for (var i = 0; i < nodeList.length; i++) {
                targetViewList.push(target.fromData({ node: nodeList[i] }));
            }
        });
        return targetViewList;
    };
    View.getTargetViewList = function (createTargetList) {
        var targetViewList = [];
        createTargetList.forEach(function (createTarget) {
            targetViewList.push(createTarget);
        });
        return targetViewList;
    };
    return View;
}());
exports.View = View;
exports.default = View;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(4));
__export(__webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var e = eval, global = e('this');
var _1 = __webpack_require__(0);
var _2 = __webpack_require__(1);
var index_1 = __webpack_require__(2);
if (true) {
    module.exports.Model = _1.default;
    module.exports.View = _2.default;
    module.exports.Target = index_1.Target;
    module.exports.Trigger = index_1.Trigger;
}
if (typeof (global) !== 'undefined') {
    if (typeof global.AP === 'undefined') {
        Object.assign(global, { AP: {} });
    }
    if (typeof global.AP.common === 'undefined') {
        Object.assign(global.AP, { common: {} });
    }
    if (typeof global.AP.common.model === 'undefined') {
        Object.assign(global.AP.common, { model: _1.default });
    }
    if (typeof global.AP.common.view === 'undefined') {
        Object.assign(global.AP.common, { view: _2.default });
    }
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _created_target_num = 0;
var Target = (function () {
    function Target(id, idName, className, node) {
        this.id = id;
        this.idName = idName;
        this.className = className;
        this.node = node;
        this.id = this.createContentsId();
    }
    Target.fromData = function (data) {
        return new Target(0, data.node && data.node.id ? data.node.id : null, data.node && data.node.className ? data.node.className : null, data.node ? data.node : null);
    };
    Target.prototype.createContentsId = function () {
        return ++_created_target_num;
    };
    return Target;
}());
exports.Target = Target;
exports.default = Target;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _created_trigger_num = 0;
var Trigger = (function () {
    function Trigger(id, className, idName, target, node) {
        this.id = id;
        this.className = className;
        this.idName = idName;
        this.target = target;
        this.node = node;
        this.callBackFunction = function () { };
        this.id = this.createTriggerId();
    }
    Trigger.fromData = function (data) {
        return new Trigger(0, data.className ? data.className : null, data.id ? data.id : null, data.dataset.apToggle ? data.dataset.apToggle : null, data ? data : null);
    };
    Trigger.prototype.createTriggerId = function () {
        return ++_created_trigger_num;
    };
    Trigger.prototype.getItemNode = function () {
        return this.node;
    };
    return Trigger;
}());
exports.Trigger = Trigger;
exports.default = Trigger;


/***/ })
/******/ ]);
});