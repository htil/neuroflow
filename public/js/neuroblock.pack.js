/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"neuroblock": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/main.ts","vendors~neuroblock"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/Blocks/BCIBlocks.ts":
/*!*********************************!*\
  !*** ./src/Blocks/BCIBlocks.ts ***!
  \*********************************/
/*! exports provided: Device, Alpha, Beta, Theta, Delta, Gamma, Engagement, BCICategory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Device", function() { return Device; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Alpha", function() { return Alpha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Beta", function() { return Beta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Theta", function() { return Theta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Delta", function() { return Delta; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Gamma", function() { return Gamma; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Engagement", function() { return Engagement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BCICategory", function() { return BCICategory; });
/* harmony import */ var bci_device__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! bci-device */ "./node_modules/bci-device/dest/BCIDevice.js");
/* harmony import */ var bci_device__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(bci_device__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/CustomBlock */ "./src/Utility/CustomBlock.ts");
/* harmony import */ var bcijs_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcijs/browser */ "./node_modules/bcijs/browser.js");
/* harmony import */ var bcijs_browser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcijs_browser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/WindowManager */ "./src/Utility/WindowManager.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./src/config.ts");






var locale = _i18n_i18n__WEBPACK_IMPORTED_MODULE_4__["set_locale"](_config__WEBPACK_IMPORTED_MODULE_5__["default"].LOCALE);
var BUFFER_SIZE = 1024;
var WEIGHT = 0.90;
var buffer = [];
var weight = Array(6).fill(0);
Blockly.Msg.BCI_HUE = 180;
_Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].clear();
var buffer_handle = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("eeg_data", [0, 0]);
var alpha = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("alpha", 0);
var beta = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("beta", 0);
var theta = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("theta", 0);
var delta = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("delta", 0);
var gamma = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("gamma", 0);
var engagement = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("engagement", 0);
var battery = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("battery", -1);
var temperature = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].declare("temperature", -1);
var Device = new bci_device__WEBPACK_IMPORTED_MODULE_0__["BCIDevice"]({
    dataHandler: function (sample) {
        if (sample.electrode !== bci_device__WEBPACK_IMPORTED_MODULE_0__["ScalpElectrodes"].AF7)
            return;
        sample.data.forEach(function (el) {
            if (buffer.length > BUFFER_SIZE)
                buffer.shift();
            buffer.push(el);
        });
        if (buffer.length < BUFFER_SIZE)
            return;
        buffer_handle.set(buffer);
        var psd = bcijs_browser__WEBPACK_IMPORTED_MODULE_2__["psd"](buffer);
        var al = bcijs_browser__WEBPACK_IMPORTED_MODULE_2__["psdBandPower"](psd, sample.sampleRate, "alpha");
        var be = bcijs_browser__WEBPACK_IMPORTED_MODULE_2__["psdBandPower"](psd, sample.sampleRate, "beta");
        var th = bcijs_browser__WEBPACK_IMPORTED_MODULE_2__["psdBandPower"](psd, sample.sampleRate, "theta");
        var de = bcijs_browser__WEBPACK_IMPORTED_MODULE_2__["psdBandPower"](psd, sample.sampleRate, "delta");
        var ga = bcijs_browser__WEBPACK_IMPORTED_MODULE_2__["psdBandPower"](psd, sample.sampleRate, "gamma");
        var sum = al + be + th + de + ga;
        var w_alpha = al / sum;
        var w_beta = be / sum;
        var w_theta = th / sum;
        var w_delta = de / sum;
        var w_gamma = ga / sum;
        var w_engagement = be / (al + th);
        var weighted_avg = function (original, next) {
            return original * WEIGHT + (next || 0) * (1 - WEIGHT);
        };
        weight[0] = weighted_avg(weight[0], w_alpha);
        weight[1] = weighted_avg(weight[1], w_beta);
        weight[2] = weighted_avg(weight[2], w_theta);
        weight[3] = weighted_avg(weight[3], w_delta);
        weight[4] = weighted_avg(weight[4], w_gamma);
        weight[5] = weighted_avg(weight[5], w_engagement);
        alpha.set(Math.max(weight[0], 0));
        beta.set(Math.max(weight[1], 0));
        theta.set(Math.max(weight[2], 0));
        delta.set(Math.max(weight[3], 0));
        gamma.set(Math.max(weight[4], 0));
        engagement.set(Math.max(weight[5], 0));
    },
    statusHandler: function (status) {
        battery.set(status.batteryLevel);
        temperature.set(status.temperature);
    }
});
var Alpha = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__["CustomBlock"]("Alpha", {
    message0: locale.bci.alpha,
    args0: [],
    output: "Number",
    colour: "%{BKY_BCI_HUE}",
    tooltip: locale.bci.tooltip,
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, function (block) {
    return [alpha.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});
var Beta = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__["CustomBlock"]("Beta", {
    message0: locale.bci.beta,
    args0: [],
    output: "Number",
    colour: "%{BKY_BCI_HUE}",
    tooltip: locale.bci.tooltip,
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, function (block) {
    return [beta.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});
var Theta = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__["CustomBlock"]("Theta", {
    message0: locale.bci.theta,
    args0: [],
    output: "Number",
    colour: "%{BKY_BCI_HUE}",
    tooltip: locale.bci.tooltip,
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, function (block) {
    return [theta.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});
var Delta = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__["CustomBlock"]("Delta", {
    message0: locale.bci.delta,
    args0: [],
    output: "Number",
    colour: "%{BKY_BCI_HUE}",
    tooltip: locale.bci.tooltip,
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, function (block) {
    return [delta.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});
var Gamma = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__["CustomBlock"]("Gamma", {
    message0: locale.bci.gamma,
    args0: [],
    output: "Number",
    colour: "%{BKY_BCI_HUE}",
    tooltip: locale.bci.tooltip,
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, function (block) {
    return [gamma.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});
var Engagement = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_1__["CustomBlock"]("Engagement", {
    message0: locale.bci.engagement,
    args0: [],
    output: "Number",
    colour: "%{BKY_BCI_HUE}",
    tooltip: locale.bci.tooltip,
    helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
}, function (block) {
    return [engagement.toGetterBinding(), Blockly.JavaScript.ORDER_MEMBER];
});
var BCICategory = function (title) {
    return {
        name: title,
        colour: Blockly.Msg.BCI_HUE,
        modules: [Alpha.name, Beta.name, Theta.name, Delta.name, Gamma.name, Engagement.name]
    };
};


/***/ }),

/***/ "./src/Blocks/EventBlocks.ts":
/*!***********************************!*\
  !*** ./src/Blocks/EventBlocks.ts ***!
  \***********************************/
/*! exports provided: Keypress, EventCategory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Keypress", function() { return Keypress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventCategory", function() { return EventCategory; });
/* harmony import */ var _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/CustomBlock */ "./src/Utility/CustomBlock.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../i18n/i18n */ "./src/i18n/i18n.ts");



var locale = _i18n_i18n__WEBPACK_IMPORTED_MODULE_2__["set_locale"](_config__WEBPACK_IMPORTED_MODULE_1__["default"].LOCALE);
Blockly.Msg.EVENT_HUE = 70;
var generateEventDropDown = function () {
    var events = locale.events.keys;
    var out = [];
    for (var event_1 in events) {
        var val = event_1;
        var key = events[event_1];
        out.push([key, val]);
    }
    return out;
};
var Keypress = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("event_keypress", function (b) {
    b.appendStatementInput("keypress_input")
        .appendField("On Keypress")
        .appendField(new Blockly.FieldDropdown(generateEventDropDown()), "KEY_FILTER");
    b.setStyle("hat_blocks");
    b.setColour(Blockly.Msg.EVENT_HUE);
    b.setNextStatement(false, null);
    b.setPreviousStatement(false);
}, function (b) {
    var key_filter = b.getFieldValue("KEY_FILTER");
    var code = "__handle_event(\"" + key_filter + "\", \"" + b.id + "\")";
    return code;
});
var EventCategory = function (title) {
    return {
        name: title,
        colour: Blockly.Msg.EVENT_HUE,
        modules: [Keypress.name]
    };
};


/***/ }),

/***/ "./src/Blocks/FlowBlocks.ts":
/*!**********************************!*\
  !*** ./src/Blocks/FlowBlocks.ts ***!
  \**********************************/
/*! exports provided: flow_window_list, flow_final_result, flow_data, get_flow_api, AddFlowBlock, FlowCategory, FlowCategoryCallback, FlowMutator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow_window_list", function() { return flow_window_list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow_final_result", function() { return flow_final_result; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow_data", function() { return flow_data; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get_flow_api", function() { return get_flow_api; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddFlowBlock", function() { return AddFlowBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlowCategory", function() { return FlowCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlowCategoryCallback", function() { return FlowCategoryCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FlowMutator", function() { return FlowMutator; });
/* harmony import */ var _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/CustomBlock */ "./src/Utility/CustomBlock.ts");
/* harmony import */ var _Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/Toolbox */ "./src/Utility/Toolbox.ts");
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/WindowManager */ "./src/Utility/WindowManager.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./src/config.ts");
/* harmony import */ var _ReteEditor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ReteEditor */ "./src/ReteEditor.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components */ "./src/components.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;







var locale = _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["set_locale"](_config__WEBPACK_IMPORTED_MODULE_4__["default"].LOCALE);
Blockly.Msg.FLOW_HUE = 140;
var flow_window_list = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].declare("flow_list", {});
var flow_final_result = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].declare("blockly_final", {});
var flow_data = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].declare("flow_data", []);
;
var get_flow_api = function (workspace) {
    return function (block_id, editor_name) {
        var block = workspace.getBlockById(block_id);
        block.editor_.process();
        return flow_final_result.get()[editor_name];
    };
};
var AddFlowBlock = function (name) {
    var editor_name = name + "_editor@0.0.1";
    var block = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("flow_block_" + name, {
        message0: name + " (Flow)",
        args0: [],
        output: "Number",
        colour: "%{BKY_FLOW_HUE}",
        tooltip: locale.flow.tooltip,
        mutator: "flow_mutator",
        helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp"
    }, function (b) {
        var result = flow_final_result.get();
        if (result[editor_name] == undefined) {
            return ["''", Blockly.JavaScript.ORDER_MEMBER];
        }
        return ["__get_flow(\"" + b.id + "\", \"" + editor_name + "\")", Blockly.JavaScript.ORDER_NONE];
    });
    var container = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    fo.setAttribute("x", "0");
    fo.setAttribute("y", "0");
    fo.setAttribute("width", "100%");
    fo.setAttribute("height", "100%");
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.classList.add("blocklyMutatorBackground");
    var wrapper = document.createElement("div");
    wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    var flow_container = document.createElement("div");
    var button_template = document.querySelector("#rete_buttons");
    var buttons = document.importNode((button_template).content, true);
    wrapper.appendChild(buttons);
    wrapper.appendChild(flow_container);
    fo.appendChild(wrapper);
    container.appendChild(rect);
    container.appendChild(fo);
    var editor = new _ReteEditor__WEBPACK_IMPORTED_MODULE_5__["default"](editor_name, flow_container);
    var inner_block = block.block();
    inner_block.container_ = container;
    inner_block.editor_ = editor;
    inner_block.data = JSON.stringify({ name: name, editor: {} });
    var ls = flow_window_list.get();
    ls[name] = {
        name: name,
        data: "{}"
    };
    flow_window_list.set(ls);
    var keys = Object.keys(_components__WEBPACK_IMPORTED_MODULE_6__["default"]);
    var _loop_1 = function (i) {
        var component = (_components__WEBPACK_IMPORTED_MODULE_6__["default"])[keys[i]];
        var instance = new component();
        editor.register(instance);
        var button_class = component.name;
        var button_group = component.get_group();
        var btn = wrapper.querySelector("." + button_class);
        btn.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
            var node;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, instance.createNode()];
                    case 1:
                        node = _a.sent();
                        editor.addNode(node);
                        return [2];
                }
            });
        }); };
    };
    for (var i = 0; i != keys.length; ++i) {
        _loop_1(i);
    }
    editor.start();
    return block;
};
var FlowCategory = function (title) {
    return {
        name: title,
        custom: "FLOWS",
        colour: Blockly.Msg.FLOW_HUE,
        modules: []
    };
};
var FlowCategoryCallback = function (ws) {
    var res = [];
    var fl = flow_window_list.get();
    var button_text = Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([{ text: locale.flow.add, callbackKey: "add_flow" }], true);
    var button = Blockly.Xml.textToDom(button_text).firstChild;
    res.push(button);
    var keys = Object.keys(fl);
    for (var i = 0; i != keys.length; ++i) {
        var flow_text = Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])(["flow_block_" + fl[keys[i]].name], true);
        var flow = Blockly.Xml.textToDom(flow_text).firstChild;
        res.push(flow);
    }
    return res;
};
var FlowMutator = (function (_super) {
    __extends(FlowMutator, _super);
    function FlowMutator() {
        return _super.call(this, []) || this;
    }
    FlowMutator.get_serialize = function () {
        return {
            mutationToDom: function () {
                var container = document.createElement("flow_mutation");
                return container;
            },
            domToMutation: function (e) {
            }
        };
    };
    FlowMutator.prototype.drawIcon_ = function (group) {
        Blockly.utils.createSvgElement('rect', {
            'class': 'blocklyIconShape',
            'rx': '4',
            'ry': '4',
            'height': '16',
            'width': '16'
        }, group);
        Blockly.utils.createSvgElement('path', {
            'class': 'blocklyIconSymbol',
            'd': 'm4.203,7.296 0,1.368 -0.92,0.677 -0.11,0.41 0.9,1.559 0.41,' +
                '0.11 1.043,-0.457 1.187,0.683 0.127,1.134 0.3,0.3 1.8,0 0.3,' +
                '-0.299 0.127,-1.138 1.185,-0.682 1.046,0.458 0.409,-0.11 0.9,' +
                '-1.559 -0.11,-0.41 -0.92,-0.677 0,-1.366 0.92,-0.677 0.11,' +
                '-0.41 -0.9,-1.559 -0.409,-0.109 -1.046,0.458 -1.185,-0.682 ' +
                '-0.127,-1.138 -0.3,-0.299 -1.8,0 -0.3,0.3 -0.126,1.135 -1.187,' +
                '0.682 -1.043,-0.457 -0.41,0.11 -0.899,1.559 0.108,0.409z'
        }, group);
        Blockly.utils.createSvgElement('circle', {
            'class': 'blocklyIconShape',
            'r': '2.7',
            'cx': '8',
            'cy': '8'
        }, group);
    };
    ;
    FlowMutator.prototype.createEditor_ = function () {
        this.svgDialog_ = Blockly.utils.createSvgElement('svg', {
            'x': Blockly.Bubble.BORDER_WIDTH,
            'y': Blockly.Bubble.BORDER_WIDTH,
            "xmlns": "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:xhtml": "http://www.w3.org/1999/xhtml"
        }, null);
        var block = this.block_;
        var block_info = JSON.parse(block.data);
        var name = block_info.name;
        var ls = flow_window_list.get();
        var info = ls[name];
        if (info == undefined)
            throw "INVALID FLOW BLOCK";
        var editor = block.editor_;
        var container = block.container_;
        if (block_info.editor.id != undefined)
            editor.get_editor().fromJSON(block_info.editor);
        this.svgDialog_.appendChild(container);
        return this.svgDialog_;
    };
    ;
    FlowMutator.prototype.resizeBubble_ = function () {
        var doubleBorderWidth = 2 * Blockly.Bubble.BORDER_WIDTH;
        var workspaceSize = {
            width: 1200,
            height: 400,
            x: 2,
            y: 2
        };
        var width;
        if (this.block_.RTL)
            width = -workspaceSize.x;
        else
            width = workspaceSize.width + workspaceSize.x;
        var height = workspaceSize.height + doubleBorderWidth * 3;
        width += doubleBorderWidth * 3;
        if (Math.abs(this.workspaceWidth_ - width) > doubleBorderWidth ||
            Math.abs(this.workspaceHeight_ - height) > doubleBorderWidth) {
            this.workspaceWidth_ = width;
            this.workspaceHeight_ = height;
            this.bubble_.setBubbleSize(width + doubleBorderWidth, height + doubleBorderWidth);
            this.svgDialog_.setAttribute('width', String(this.workspaceWidth_));
            this.svgDialog_.setAttribute('height', String(this.workspaceHeight_));
            var container = this.svgDialog_.querySelector("div");
            container.setAttribute("x", String(0));
            container.setAttribute("y", String(0));
            container.style.width = String(this.workspaceWidth_);
            container.style.height = String(this.workspaceHeight_);
        }
        if (this.block_.RTL) {
            var translation = 'translate(' + this.workspaceWidth_ + ',0)';
        }
    };
    FlowMutator.prototype.setVisible = function (visible) {
        if (visible == this.isVisible())
            return;
        Blockly.Events.fire(new Blockly.Events.Ui(this.block_, 'mutatorOpen', !visible, visible));
        if (this.svgDialog_ == undefined) {
            var container = this.createEditor_();
        }
        if (visible) {
            this.svgDialog_.style.display = "block";
            this.bubble_ = new Blockly.Bubble((this.block_.workspace), this.svgDialog_, this.block_.svgPath_, this.iconXY_, null, null);
            this.bubble_.setSvgId(this.block_.id);
            this.resizeBubble_();
            this.updateColour();
            var block = this.block_;
            block.editor_.get_editor().view.resize();
        }
        else {
            var block = this.block_;
            var data = JSON.parse(block.data);
            var ls = flow_window_list.get();
            var info = ls[data.name];
            var editor = block.editor_;
            if (info == undefined || editor == undefined)
                throw "INVALID SERIALIZATION OF FLOW COMPONENT";
            data.editor = editor.get_editor().toJSON();
            this.block_.data = JSON.stringify(data);
            info.data = this.block_.data;
            flow_window_list.set(ls);
            this.svgDialog_.style.display = "block";
            this.bubble_.dispose();
            this.bubble_ = null;
            this.workspaceWidth_ = 0;
            this.workspaceHeight_ = 0;
        }
    };
    FlowMutator.prototype.iconClick_ = function (e) {
        if (!this.block_.isInFlyout && !Blockly.utils.isRightButton(e)) {
            this.setVisible(!this.isVisible());
        }
    };
    ;
    return FlowMutator;
}(Blockly.Mutator));

;


/***/ }),

/***/ "./src/Blocks/PlayerBlocks.ts":
/*!************************************!*\
  !*** ./src/Blocks/PlayerBlocks.ts ***!
  \************************************/
/*! exports provided: player_window_list, PlayerPoint, PlayerGet, PlayerSet, PlayerUpdateX, PlayerUpdateY, PlayerCollidesWith, PlayerCategory, PlayerCategoryCallback */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "player_window_list", function() { return player_window_list; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerPoint", function() { return PlayerPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerGet", function() { return PlayerGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerSet", function() { return PlayerSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerUpdateX", function() { return PlayerUpdateX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerUpdateY", function() { return PlayerUpdateY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerCollidesWith", function() { return PlayerCollidesWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerCategory", function() { return PlayerCategory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerCategoryCallback", function() { return PlayerCategoryCallback; });
/* harmony import */ var _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utility/CustomBlock */ "./src/Utility/CustomBlock.ts");
/* harmony import */ var _Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utility/Toolbox */ "./src/Utility/Toolbox.ts");
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utility/WindowManager */ "./src/Utility/WindowManager.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../config */ "./src/config.ts");





var locale = _i18n_i18n__WEBPACK_IMPORTED_MODULE_3__["set_locale"](_config__WEBPACK_IMPORTED_MODULE_4__["default"].LOCALE);
Blockly.Msg.PLAYER_HUE = 10;
var player_window_list = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].declare("player_list", []);
var PlayerPoint = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("player_point", {
    message0: "X %1 Y %2",
    args0: [
        {
            type: "input_value",
            name: "X",
            check: "Number"
        },
        {
            type: "input_value",
            name: "Y",
            check: "Number"
        }
    ],
    output: null,
    colour: "%{BKY_PLAYER_HUE}"
}, function (b) {
    var x = Blockly.JavaScript.valueToCode(b, "X", Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
    var y = Blockly.JavaScript.valueToCode(b, "Y", Blockly.JavaScript.ORDER_ASSIGNMENT) || 0;
    return ["{x: " + x + ", y: " + y + "}", Blockly.JavaScript.ORDER_MEMBER];
});
var PlayerGet = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("player_get", function (b) {
    b.appendDummyInput("player_select")
        .appendField(new Blockly.FieldDropdown(function () {
        var res = player_window_list.get();
        return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
    }), "PLAYER_OPTIONS")
        .appendField(new Blockly.FieldDropdown(function () {
        return [["X", "x"], ["Y", "y"]];
    }), "PLAYER_POSITION_TYPE");
    b.setOutput(true);
    b.setColour(Blockly.Msg.PLAYER_HUE);
}, function (b) {
    var player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";
    var position_type = b.getFieldValue("PLAYER_POSITION_TYPE");
    var code = "JSON.parse(" + _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowDeclaration"].asGetterBinding(player_handle) + ")." + position_type;
    return [code, Blockly.JavaScript.ORDER_MEMBER];
});
var PlayerSet = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("player_set", function (b) {
    b.appendDummyInput("player_select")
        .appendField("set")
        .appendField(new Blockly.FieldDropdown(function () {
        var res = player_window_list.get();
        return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
    }), "PLAYER_OPTIONS");
    b.appendValueInput("player_new_value").appendField("to").setCheck(PlayerPoint.name);
    b.setNextStatement(true);
    b.setPreviousStatement(true);
    b.setColour(Blockly.Msg.PLAYER_HUE);
}, function (b) {
    var player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";
    var new_value = Blockly.JavaScript.valueToCode(b, "player_new_value", Blockly.JavaScript.ORDER_NONE) ||
        "JSON.parse(" + _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowDeclaration"].asGetterBinding(player_handle) + ")";
    return _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowDeclaration"].asSetterBinding(player_handle) + "JSON.stringify(" + new_value + "));\n";
});
var PlayerUpdateX = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("player_update_x", function (b) {
    b.appendValueInput("player_select")
        .appendField("change")
        .appendField(new Blockly.FieldDropdown(function () {
        var res = player_window_list.get();
        return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
    }), "PLAYER_OPTIONS")
        .appendField("X by");
    b.setNextStatement(true);
    b.setPreviousStatement(true);
    b.setColour(Blockly.Msg.PLAYER_HUE);
}, function (b) {
    var player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";
    var player_win = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].fetch(player_handle);
    var current_value = "JSON.parse(" + player_win.toGetterBinding() + ")";
    var delta = Blockly.JavaScript.valueToCode(b, "player_select", Blockly.JavaScript.ORDER_NONE) || 0;
    var new_value = "{ x: (" + current_value + ".x + " + delta + "), y: " + current_value + ".y }";
    return _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowDeclaration"].asSetterBinding(player_handle) + "JSON.stringify(" + new_value + "));\n";
});
var PlayerUpdateY = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("player_update_y", function (b) {
    b.appendValueInput("player_select")
        .appendField("change")
        .appendField(new Blockly.FieldDropdown(function () {
        var res = player_window_list.get();
        return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
    }), "PLAYER_OPTIONS")
        .appendField("Y by");
    b.setNextStatement(true);
    b.setPreviousStatement(true);
    b.setColour(Blockly.Msg.PLAYER_HUE);
}, function (b) {
    var player_handle = b.getFieldValue("PLAYER_OPTIONS") || "''";
    var player_win = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].fetch(player_handle);
    var current_value = "JSON.parse(" + player_win.toGetterBinding() + ")";
    var delta = Blockly.JavaScript.valueToCode(b, "player_select", Blockly.JavaScript.ORDER_NONE) || 0;
    var new_value = "{ x: " + current_value + ".x, y: (" + current_value + ".y + " + delta + ") }";
    return _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowDeclaration"].asSetterBinding(player_handle) + "JSON.stringify(" + new_value + "));\n";
});
var PlayerCollidesWith = new _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_0__["CustomBlock"]("player_collides", function (b) {
    b.appendDummyInput("player_lhs")
        .appendField(new Blockly.FieldDropdown(function () {
        var res = player_window_list.get();
        return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
    }), "PLAYER_LHS")
        .appendField(" collides with ")
        .appendField(new Blockly.FieldDropdown(function () {
        var res = player_window_list.get();
        return (res && res.length > 0 ? res : [[locale.player.none, "PLAYER_NONE"]]);
    }), "PLAYER_RHS");
    b.setOutput(true);
    b.setColour(Blockly.Msg.PLAYER_HUE);
}, function (b) {
    var player_lhs = b.getFieldValue("PLAYER_LHS") || "''";
    var player_rhs = b.getFieldValue("PLAYER_RHS") || "''";
    if (player_lhs.length == 0 || player_rhs.length == 0 || player_lhs == "PLAYER_NONE" || player_rhs == "PLAYER_NONE")
        return '';
    if (player_lhs == player_rhs)
        return ["true", Blockly.JavaScript.ORDER_MEMBER];
    var lhs = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].fetch(player_lhs);
    var rhs = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_2__["WindowManager"].fetch(player_rhs);
    var length = 0.15;
    return [
        "__distance(" + lhs.toGetterBinding() + ", " + rhs.toGetterBinding() + ") < " + length,
        Blockly.JavaScript.ORDER_NONE
    ];
});
var PlayerCategory = function (title) {
    return {
        name: title,
        custom: "PLAYERS",
        colour: Blockly.Msg.PLAYER_HUE,
        modules: []
    };
};
var PlayerCategoryCallback = function (ws) {
    var res = [];
    var pl = player_window_list.get();
    if (pl.length > 0) {
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([PlayerGet.name], true)).firstChild);
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([PlayerSet.name], true)).firstChild);
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([PlayerCollidesWith.name], true)).firstChild);
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([PlayerPoint.name], true)).firstChild);
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([PlayerUpdateX.name], true)).firstChild);
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([PlayerUpdateY.name], true)).firstChild);
    }
    else {
        res.push(Blockly.Xml.textToDom(Object(_Utility_Toolbox__WEBPACK_IMPORTED_MODULE_1__["unwind"])([{ text: locale.help.no_players }], true)).firstChild);
    }
    return res;
};


/***/ }),

/***/ "./src/Components/averageBandPowerRange.component.ts":
/*!***********************************************************!*\
  !*** ./src/Components/averageBandPowerRange.component.ts ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bcijs_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcijs/browser */ "./node_modules/bcijs/browser.js");
/* harmony import */ var bcijs_browser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcijs_browser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controls_Number_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Controls/Number.control */ "./src/Controls/Number.control.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var template = document.querySelector("#CustomNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var averageBandPowerRangeComponent = (function (_super) {
    __extends(averageBandPowerRangeComponent, _super);
    function averageBandPowerRangeComponent() {
        var _this = _super.call(this, "Average Range Band Power") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    averageBandPowerRangeComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("in1", "Data", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Array, true);
        var out0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("out1", "Average Band Power", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Number, true);
        var Controlrange_low = new _Controls_Number_control__WEBPACK_IMPORTED_MODULE_4__["default"](this.editor, "range_low");
        var Controlrange_high = new _Controls_Number_control__WEBPACK_IMPORTED_MODULE_4__["default"](this.editor, "range_high");
        this.data.controls = {
            range_low: Controlrange_low,
            range_high: Controlrange_high
        };
        return node
            .addInput(in0)
            .addOutput(out0)
            .addControl(Controlrange_low)
            .addControl(Controlrange_high);
    };
    averageBandPowerRangeComponent.prototype.worker = function (node, inputs, outputs) {
        if (!(inputs["in1"].length))
            return;
        console.log("PSD:", inputs["in1"][0], [node.data.range_low, node.data.range_high]);
        var psd = bcijs_browser__WEBPACK_IMPORTED_MODULE_3__["averageBandPowers"](inputs['in1'][0], 220, [node.data.range_low, node.data.range_high]);
        outputs['out1'] = psd[0];
    };
    averageBandPowerRangeComponent.get_group = function () {
        return "BCI.JS";
    };
    return averageBandPowerRangeComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (averageBandPowerRangeComponent);


/***/ }),

/***/ "./src/Components/bciDevice.component.ts":
/*!***********************************************!*\
  !*** ./src/Components/bciDevice.component.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/WindowManager */ "./src/Utility/WindowManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template = document.querySelector("#CustomNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var bciDeviceComponent = (function (_super) {
    __extends(bciDeviceComponent, _super);
    function bciDeviceComponent() {
        var _this = _super.call(this, "BCI Device") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    bciDeviceComponent.prototype.builder = function (node) {
        var out0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("data", "EEG Data", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Array, true);
        this.data.controls = {};
        return node
            .addOutput(out0);
    };
    bciDeviceComponent.prototype.worker = function (node, inputs, outputs) {
        if (false)
            {}
        var device_data = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].fetch("eeg_data");
        outputs["data"] = device_data.get();
    };
    bciDeviceComponent.get_group = function () {
        return "BCI.JS";
    };
    return bciDeviceComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (bciDeviceComponent);


/***/ }),

/***/ "./src/Components/blocklyEnd.component.ts":
/*!************************************************!*\
  !*** ./src/Components/blocklyEnd.component.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/WindowManager */ "./src/Utility/WindowManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template = document.querySelector("#CustomNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var blocklyEndComponent = (function (_super) {
    __extends(blocklyEndComponent, _super);
    function blocklyEndComponent() {
        var _this = _super.call(this, "Output") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    blocklyEndComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("blockly_end", "End!", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Any, false);
        this.data.controls = {};
        return node
            .addInput(in0);
    };
    blocklyEndComponent.prototype.worker = function (node, inputs, outputs) {
        if (false)
            {}
        var name = this.editor.id;
        var final = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].fetch("blockly_final");
        var as_any = final.get();
        as_any[name] = inputs["blockly_end"][0];
        final.set(as_any);
    };
    blocklyEndComponent.get_group = function () {
        return "BLOCKLY";
    };
    return blocklyEndComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (blocklyEndComponent);


/***/ }),

/***/ "./src/Components/buffer.component.ts":
/*!********************************************!*\
  !*** ./src/Components/buffer.component.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controls_Number_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controls/Number.control */ "./src/Controls/Number.control.ts");
/* harmony import */ var _Controls_Array_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Controls/Array.control */ "./src/Controls/Array.control.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var template = document.querySelector("#CustomNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var bufferComponent = (function (_super) {
    __extends(bufferComponent, _super);
    function bufferComponent() {
        var _this = _super.call(this, "Buffer") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    bufferComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("num_in", "Number In", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Number, true);
        var out0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("arr_out", "Buffer Out", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Array, true);
        var Controlb_size = new _Controls_Number_control__WEBPACK_IMPORTED_MODULE_3__["default"](this.editor, "b_size");
        var Controlarr = new _Controls_Array_control__WEBPACK_IMPORTED_MODULE_4__["default"](this.editor, "arr");
        this.data.controls = {
            b_size: Controlb_size,
            arr: Controlarr
        };
        return node
            .addInput(in0)
            .addOutput(out0)
            .addControl(Controlb_size)
            .addControl(Controlarr);
    };
    bufferComponent.prototype.worker = function (node, inputs, outputs) {
        if (!(inputs["num_in"].length))
            return;
        var control = this.data.controls["arr"];
        var array_control = control;
        array_control.push_sample(inputs["num_in"]);
        outputs['arr_out'] = node.data.arr.buffer;
    };
    bufferComponent.get_group = function () {
        return "VARIABLE";
    };
    return bufferComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (bufferComponent);


/***/ }),

/***/ "./src/Components/display.component.ts":
/*!*********************************************!*\
  !*** ./src/Components/display.component.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controls_String_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controls/String.control */ "./src/Controls/String.control.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template = document.querySelector("#OperatorNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var displayComponent = (function (_super) {
    __extends(displayComponent, _super);
    function displayComponent() {
        var _this = _super.call(this, "Print String") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    displayComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("any_in", "Any", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Any, true);
        var Controlstr = new _Controls_String_control__WEBPACK_IMPORTED_MODULE_3__["default"](this.editor, "str");
        this.data.controls = {
            str: Controlstr
        };
        return node
            .addInput(in0)
            .addControl(Controlstr);
    };
    displayComponent.prototype.worker = function (node, inputs, outputs) {
        if (!(inputs["any_in"].length))
            return;
        var as_string = JSON.stringify(inputs["any_in"].length == 1 ? inputs["any_in"][0] : inputs["any_in"]) || "undefined";
        var control = this.data.controls["str"];
        var str_control = control;
        str_control.setValue(as_string);
    };
    displayComponent.get_group = function () {
        return "PRINT";
    };
    return displayComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (displayComponent);


/***/ }),

/***/ "./src/Components/graph.component.ts":
/*!*******************************************!*\
  !*** ./src/Components/graph.component.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utility/WindowManager */ "./src/Utility/WindowManager.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template = document.querySelector("#CustomNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var graphComponent = (function (_super) {
    __extends(graphComponent, _super);
    function graphComponent() {
        var _this = _super.call(this, "Plot Graph") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    graphComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("data_in", "Array<Number>", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Array, true);
        this.data.controls = {};
        return node
            .addInput(in0);
    };
    graphComponent.prototype.worker = function (node, inputs, outputs) {
        if (!(inputs["data_in"].length))
            return;
        var save_to = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_3__["WindowManager"].fetch("flow_data");
        console.log(inputs["data_in"]);
        save_to.set(inputs["data_in"][0]);
    };
    graphComponent.get_group = function () {
        return "GRAPH";
    };
    return graphComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (graphComponent);


/***/ }),

/***/ "./src/Components/number.component.ts":
/*!********************************************!*\
  !*** ./src/Components/number.component.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controls_Number_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controls/Number.control */ "./src/Controls/Number.control.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template = document.querySelector("#OperatorNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var numberComponent = (function (_super) {
    __extends(numberComponent, _super);
    function numberComponent() {
        var _this = _super.call(this, "Number") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    numberComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("num_in", "Number", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Number, true);
        var out0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("num_out", "Number", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Number, true);
        var Controlnum = new _Controls_Number_control__WEBPACK_IMPORTED_MODULE_3__["default"](this.editor, "num");
        this.data.controls = {
            num: Controlnum
        };
        return node
            .addInput(in0)
            .addOutput(out0)
            .addControl(Controlnum);
    };
    numberComponent.prototype.worker = function (node, inputs, outputs) {
        if (false)
            {}
        var control = this.data.controls["num"];
        var num_control = control;
        if (inputs.num_in.length && inputs.num_in[0] != undefined) {
            node.data.num = inputs['num_in'][0];
            num_control.setValue(node.data.num);
        }
        outputs['num_out'] = node.data.num;
    };
    numberComponent.get_group = function () {
        return "VARIABLE";
    };
    return numberComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (numberComponent);


/***/ }),

/***/ "./src/Components/signalBandPowerRange.component.ts":
/*!**********************************************************!*\
  !*** ./src/Components/signalBandPowerRange.component.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var bcijs_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! bcijs/browser */ "./node_modules/bcijs/browser.js");
/* harmony import */ var bcijs_browser__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(bcijs_browser__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Controls_Number_control__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Controls/Number.control */ "./src/Controls/Number.control.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var template = document.querySelector("#CustomNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var signalBandPowerRangeComponent = (function (_super) {
    __extends(signalBandPowerRangeComponent, _super);
    function signalBandPowerRangeComponent() {
        var _this = _super.call(this, "Signal Bands Power Range") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    signalBandPowerRangeComponent.prototype.builder = function (node) {
        var in0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Input("in1", "Data", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Array, true);
        var out0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("out1", "Signal Band Power", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].Number, true);
        var Controlrange_low = new _Controls_Number_control__WEBPACK_IMPORTED_MODULE_4__["default"](this.editor, "range_low");
        var Controlrange_high = new _Controls_Number_control__WEBPACK_IMPORTED_MODULE_4__["default"](this.editor, "range_high");
        this.data.controls = {
            range_low: Controlrange_low,
            range_high: Controlrange_high
        };
        return node
            .addInput(in0)
            .addOutput(out0)
            .addControl(Controlrange_low)
            .addControl(Controlrange_high);
    };
    signalBandPowerRangeComponent.prototype.worker = function (node, inputs, outputs) {
        if (!(inputs["in1"].length))
            return;
        var bands = [node.data.range_low, node.data.range_high];
        var psd = bcijs_browser__WEBPACK_IMPORTED_MODULE_3__["signalBandPower"](inputs['in1'][0], 220, bands);
        outputs['out1'] = psd;
    };
    signalBandPowerRangeComponent.get_group = function () {
        return "BCI.JS";
    };
    return signalBandPowerRangeComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (signalBandPowerRangeComponent);


/***/ }),

/***/ "./src/Components/socket.types.ts":
/*!****************************************!*\
  !*** ./src/Components/socket.types.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");

;
var SocketTypes = {
    Array: new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Socket("Array"),
    Number: new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Socket("Number"),
    String: new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Socket("String")
};
var any_t = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Socket("Any");
var keys = Object.keys(SocketTypes);
for (var i = 0; i != keys.length; ++i)
    SocketTypes[keys[i]].combineWith(any_t);
SocketTypes["Any"] = any_t;
/* harmony default export */ __webpack_exports__["default"] = (SocketTypes);


/***/ }),

/***/ "./src/Components/string.component.ts":
/*!********************************************!*\
  !*** ./src/Components/string.component.ts ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var _socket_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./socket.types */ "./src/Components/socket.types.ts");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Controls_String_control__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controls/String.control */ "./src/Controls/String.control.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template = document.querySelector("#OperatorNode").innerHTML;
var CustomSocket = {
    template: "<div class=\"socket\" :class=\"[type, socket.name, used()?'used':''] | kebab\" :title=\"socket.name\"></div>",
    props: ['type', 'socket', 'used']
};
var as_any = rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_2___default.a;
var CustomNode = {
    template: template,
    mixins: [as_any.mixin],
    methods: {
        used: function (io) {
            return io.connections.length;
        }
    },
    components: {
        Socket: CustomSocket
    }
};
;
;
var stringComponent = (function (_super) {
    __extends(stringComponent, _super);
    function stringComponent() {
        var _this = _super.call(this, "String") || this;
        _this.data = {
            component: CustomNode,
            controls: {}
        };
        return _this;
    }
    stringComponent.prototype.builder = function (node) {
        var out0 = new rete__WEBPACK_IMPORTED_MODULE_0__["default"].Output("str_out", "String", _socket_types__WEBPACK_IMPORTED_MODULE_1__["default"].String, true);
        var Controlstr = new _Controls_String_control__WEBPACK_IMPORTED_MODULE_3__["default"](this.editor, "str");
        this.data.controls = {
            str: Controlstr
        };
        return node
            .addOutput(out0)
            .addControl(Controlstr);
    };
    stringComponent.prototype.worker = function (node, inputs, outputs) {
        if (false)
            {}
        outputs['str_out'] = node.data.str;
    };
    stringComponent.get_group = function () {
        return "VARIABLE";
    };
    return stringComponent;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = (stringComponent);


/***/ }),

/***/ "./src/Controls/Array.control.ts":
/*!***************************************!*\
  !*** ./src/Controls/Array.control.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BUFFER_SIZE = 200;

var VueArrayControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    data: function () {
        return {
            buffer: [0]
        };
    },
    methods: {
        push_sample: function (item) {
            if (this.buffer.length > BUFFER_SIZE)
                this.buffer.shift();
            this.buffer.push(item);
            if (this.buffer.length > BUFFER_SIZE)
                this.update();
        },
        update: function () {
            this.emitter.trigger('process');
        }
    },
    mounted: function () {
        this.buffer = this.getData(this.ikey);
    }
};
var ArrayControl = (function (_super) {
    __extends(ArrayControl, _super);
    function ArrayControl(emitter, ikey, readonly) {
        if (readonly === void 0) { readonly = false; }
        var _this = _super.call(this, ikey) || this;
        _this.component = VueArrayControl;
        _this.props = { emitter: emitter, ikey: ikey, readonly: readonly };
        return _this;
    }
    ArrayControl.prototype.push_sample = function (val) {
        this.vueContext.push_sample(val);
    };
    return ArrayControl;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Control"]));
/* harmony default export */ __webpack_exports__["default"] = (ArrayControl);


/***/ }),

/***/ "./src/Controls/Number.control.ts":
/*!****************************************!*\
  !*** ./src/Controls/Number.control.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var VueNumControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: '<div><input type="number" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop=""/> <font color="white"> {{this.ikey}} </font></div>',
    data: function () {
        return {
            value: 0,
        };
    },
    methods: {
        change: function (e) {
            this.value = +e.target.value;
            this.update();
        },
        update: function () {
            if (this.ikey)
                this.putData(this.ikey, this.value);
            this.emitter.trigger('process');
        }
    },
    mounted: function () {
        this.value = this.getData(this.ikey);
    }
};
var NumberControl = (function (_super) {
    __extends(NumberControl, _super);
    function NumberControl(emitter, ikey, readonly) {
        if (readonly === void 0) { readonly = false; }
        var _this = _super.call(this, ikey) || this;
        _this.component = VueNumControl;
        _this.props = { emitter: emitter, ikey: ikey, readonly: readonly };
        return _this;
    }
    NumberControl.prototype.setValue = function (val) {
        this.vueContext.value = val;
    };
    return NumberControl;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Control"]));
/* harmony default export */ __webpack_exports__["default"] = (NumberControl);


/***/ }),

/***/ "./src/Controls/String.control.ts":
/*!****************************************!*\
  !*** ./src/Controls/String.control.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var VueNumControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: '<input type="text" :readonly="readonly" :value="value" @input="change($event)" @dblclick.stop=""/>',
    data: function () {
        return {
            value: "",
        };
    },
    methods: {
        change: function (e) {
            this.value = e.target.value;
            this.update();
        },
        update: function () {
            if (this.ikey)
                this.putData(this.ikey, this.value);
            this.emitter.trigger('process');
        }
    },
    mounted: function () {
        this.value = this.getData(this.ikey);
    }
};
var StringControl = (function (_super) {
    __extends(StringControl, _super);
    function StringControl(emitter, ikey, readonly) {
        if (readonly === void 0) { readonly = false; }
        var _this = _super.call(this, ikey) || this;
        _this.component = VueNumControl;
        _this.props = { emitter: emitter, ikey: ikey, readonly: readonly };
        return _this;
    }
    StringControl.prototype.setValue = function (val) {
        this.vueContext.value = val;
    };
    return StringControl;
}(rete__WEBPACK_IMPORTED_MODULE_0__["Control"]));
/* harmony default export */ __webpack_exports__["default"] = (StringControl);


/***/ }),

/***/ "./src/Playground.ts":
/*!***************************!*\
  !*** ./src/Playground.ts ***!
  \***************************/
/*! exports provided: Playground, Shader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Playground", function() { return Playground; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Shader", function() { return Shader; });
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/WindowManager */ "./src/Utility/WindowManager.ts");
/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sprite */ "./src/Sprite.ts");


var Playground = (function () {
    function Playground(element, bundle) {
        this.attributes = {};
        this.uniforms = {};
        this.gl = element.getContext("webgl");
        if (!this.gl) {
            throw new Error("Could not create a WebGL instance!");
        }
        this.gl.canvas.width = this.gl.canvas.clientWidth;
        this.gl.canvas.height = this.gl.canvas.clientHeight;
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.program = this.gl.createProgram();
        if (bundle) {
            for (var i = 0; i < bundle.vertex.length; ++i) {
                var v = Shader.compile(this.gl, bundle.vertex[i], this.gl.VERTEX_SHADER);
                this.gl.attachShader(this.program, v);
            }
            for (var i = 0; i < bundle.vertex.length; ++i) {
                var v = Shader.compile(this.gl, bundle.vertex[i], this.gl.FRAGMENT_SHADER);
                this.gl.attachShader(this.program, v);
            }
        }
        else {
            this.gl.attachShader(this.program, Shader.compile(this.gl, Shader.default_vertex, this.gl.VERTEX_SHADER));
            this.gl.attachShader(this.program, Shader.compile(this.gl, Shader.default_fragment, this.gl.FRAGMENT_SHADER));
        }
        this.gl.linkProgram(this.program);
        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            throw new Error('Unable to initialize the shader program: ' + this.gl.getProgramInfoLog(this.program));
        }
        var attribs, uniforms;
        if (bundle) {
            attribs = bundle.attributes;
            uniforms = bundle.uniforms;
        }
        else {
            attribs = Shader.default_attributes;
            uniforms = Shader.default_uniforms;
        }
        for (var _i = 0, attribs_1 = attribs; _i < attribs_1.length; _i++) {
            var attr = attribs_1[_i];
            this.attributes[attr] = this.gl.getAttribLocation(this.program, attr);
        }
        for (var _a = 0, uniforms_1 = uniforms; _a < uniforms_1.length; _a++) {
            var uni = uniforms_1[_a];
            this.uniforms[uni] = this.gl.getUniformLocation(this.program, uni);
        }
        this.sprite_quad_buffer = this.gl.createBuffer();
        this.sprite_quad_tex = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            -1.0, 1.0,
            -1.0, -1.0,
            1.0, -1.0,
            1.0, -1.0,
            1.0, 1.0,
            -1.0, 1.0
        ]), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_tex);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([
            0.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
            1.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ]), this.gl.STATIC_DRAW);
    }
    Playground.prototype.create_sprite = function (id, name, type, path, cb) {
        var _this = this;
        var s = new _Sprite__WEBPACK_IMPORTED_MODULE_1__["Sprite"](id, name, type);
        var i = document.createElement("img");
        i.crossOrigin = "anonymous";
        i.onload = function () {
            var t = _this.gl.createTexture();
            _this.gl.bindTexture(_this.gl.TEXTURE_2D, t);
            _this.gl.texImage2D(_this.gl.TEXTURE_2D, 0, _this.gl.RGBA, _this.gl.RGBA, _this.gl.UNSIGNED_BYTE, i);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_S, _this.gl.CLAMP_TO_EDGE);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_WRAP_T, _this.gl.CLAMP_TO_EDGE);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MIN_FILTER, _this.gl.LINEAR);
            _this.gl.texParameteri(_this.gl.TEXTURE_2D, _this.gl.TEXTURE_MAG_FILTER, _this.gl.LINEAR);
            _this.gl.generateMipmap(_this.gl.TEXTURE_2D);
            s.set_texture(t);
            cb(s);
        };
        i.src = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].origin() + "/" + path;
        return s;
    };
    Playground.prototype.draw = function (sprites) {
        this.gl.viewport(0, 0, this.gl.canvas.clientWidth, this.gl.canvas.clientHeight);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.useProgram(this.program);
        for (var index in sprites) {
            var sprite = sprites[index];
            this.gl.bindTexture(this.gl.TEXTURE_2D, sprite.get_texture());
            var scale = sprite.get_scale();
            this.gl.uniform2f(this.uniforms["uScale"], scale.x, scale.y);
            var pos = sprite.get_position();
            this.gl.uniform2f(this.uniforms["uOffset"], pos.x, pos.y);
            this.gl.enableVertexAttribArray(this.attributes["aVertexPosition"]);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_buffer);
            this.gl.vertexAttribPointer(this.attributes["aVertexPosition"], 2, this.gl.FLOAT, false, 0, 0);
            this.gl.enableVertexAttribArray(this.attributes["aTextureCoordinate"]);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.sprite_quad_tex);
            this.gl.vertexAttribPointer(this.attributes["aTextureCoordinate"], 2, this.gl.FLOAT, false, 0, 0);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        }
    };
    return Playground;
}());

var Shader;
(function (Shader) {
    Shader.default_attributes = [
        "aVertexPosition",
        "aTextureCoordinate"
    ];
    Shader.default_uniforms = [
        "uOffset",
        "uScale",
        "uTexture"
    ];
    Shader.default_vertex = "\n\t\tattribute vec2 aVertexPosition;\n\t\tattribute vec2 aTextureCoordinate;\n\n\t\tuniform vec2 uScale;\n\t\tuniform vec2 uOffset;\n\n\t\tvarying vec2 TexCoord0;\n\n\t\tvoid main() {\n\t\t\tgl_Position = vec4(aVertexPosition[0] * uScale[0] + uOffset[0], aVertexPosition[1] * uScale[1] + uOffset[1], 0.0, 1.0);\n\t\t\tTexCoord0 = aTextureCoordinate;\n\t\t}\n\t";
    Shader.default_fragment = "\n\t\tprecision mediump float;\n\n\t\tuniform sampler2D uTexture;\n\t\tvarying vec2 TexCoord0;\n\n\t\tvoid main() {\n\t\t\t//gl_FragColor = vec4(TexCoord0, 0.0, 1.0);\n\t\t\tgl_FragColor = texture2D(uTexture, TexCoord0);\n\t\t}\n\t";
    function compile(gl, code, type) {
        var sha = gl.createShader(type);
        gl.shaderSource(sha, code);
        gl.compileShader(sha);
        if (!gl.getShaderParameter(sha, gl.COMPILE_STATUS)) {
            var msg = "Could not compile shader: " + gl.getShaderInfoLog(sha);
            gl.deleteShader(sha);
            throw new Error(msg);
        }
        return sha;
    }
    Shader.compile = compile;
})(Shader || (Shader = {}));


/***/ }),

/***/ "./src/ReteEditor.ts":
/*!***************************!*\
  !*** ./src/ReteEditor.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var rete__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rete */ "./node_modules/rete/build/rete.esm.js");
/* harmony import */ var rete_area_plugin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rete-area-plugin */ "./node_modules/rete-area-plugin/build/area-plugin.esm.js");
/* harmony import */ var rete_comment_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rete-comment-plugin */ "./node_modules/rete-comment-plugin/build/comment-plugin.min.js");
/* harmony import */ var rete_comment_plugin__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(rete_comment_plugin__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var rete_connection_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rete-connection-plugin */ "./node_modules/rete-connection-plugin/build/connection-plugin.esm.js");
/* harmony import */ var rete_context_menu_plugin__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rete-context-menu-plugin */ "./node_modules/rete-context-menu-plugin/build/context-menu-plugin.esm.js");
/* harmony import */ var rete_history_plugin__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rete-history-plugin */ "./node_modules/rete-history-plugin/build/history-plugin.esm.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rete-vue-render-plugin */ "./node_modules/rete-vue-render-plugin/build/vue-render-plugin.min.js");
/* harmony import */ var rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_7__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








var ReteEditor = (function () {
    function ReteEditor(name, container) {
        if (name === void 0) { name = "rete-editor@0.0.1"; }
        var cont;
        if (typeof container == "string")
            cont = document.querySelector(container);
        else
            cont = container;
        this.raw_editor = new rete__WEBPACK_IMPORTED_MODULE_1__["default"].NodeEditor(name, cont);
        this.raw_editor.use(rete_area_plugin__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.raw_editor.use(rete_comment_plugin__WEBPACK_IMPORTED_MODULE_3___default.a);
        this.raw_editor.use(rete_connection_plugin__WEBPACK_IMPORTED_MODULE_4__["default"]);
        this.raw_editor.use(rete_context_menu_plugin__WEBPACK_IMPORTED_MODULE_5__["default"]);
        this.raw_editor.use(rete_history_plugin__WEBPACK_IMPORTED_MODULE_6__["default"]);
        this.raw_editor.use(rete_vue_render_plugin__WEBPACK_IMPORTED_MODULE_7___default.a);
        this.raw_engine = new rete__WEBPACK_IMPORTED_MODULE_1__["default"].Engine(name);
    }
    ReteEditor.prototype.addNode = function (node) {
        this.raw_editor.addNode(node);
    };
    ReteEditor.prototype.clear = function () {
        this.raw_editor.clear();
    };
    ReteEditor.prototype.register = function (component) {
        this.raw_editor.register(component);
        this.raw_engine.register(component);
    };
    ReteEditor.prototype.start = function (events) {
        var _this = this;
        if (events === void 0) { events = "process nodecreated noderemoved connectioncreated connectionremoved"; }
        this.raw_editor.on(events, function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.raw_engine.abort()];
                    case 1:
                        _a.sent();
                        return [4, this.raw_engine.process(this.raw_editor.toJSON())];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        }); });
        this.raw_editor.view.resize();
        rete_area_plugin__WEBPACK_IMPORTED_MODULE_2__["default"].zoomAt(this.raw_editor);
        this.raw_editor.trigger("process");
    };
    ReteEditor.prototype.destroy = function () {
        this.raw_editor.destroy();
        this.raw_engine.destroy();
        this.raw_editor = undefined;
        this.raw_engine = undefined;
    };
    ReteEditor.prototype.process = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.raw_engine.abort()];
                    case 1:
                        _a.sent();
                        return [4, this.raw_engine.process(this.raw_editor.toJSON())];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ReteEditor.prototype.get_editor = function () {
        return this.raw_editor;
    };
    ReteEditor.prototype.get_engine = function () {
        return this.raw_engine;
    };
    return ReteEditor;
}());
/* harmony default export */ __webpack_exports__["default"] = (ReteEditor);


/***/ }),

/***/ "./src/Sprite.ts":
/*!***********************!*\
  !*** ./src/Sprite.ts ***!
  \***********************/
/*! exports provided: Sprite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return Sprite; });
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/WindowManager */ "./src/Utility/WindowManager.ts");

var Sprite = (function () {
    function Sprite(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.scale = { x: 1, y: 1 };
        this.binding = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].declare(id, { x: 0, y: 0 });
    }
    Sprite.prototype.delete = function () {
        this.id = undefined;
        this.delete_texture();
        this.binding.delete();
    };
    Sprite.prototype.get_position = function () {
        return this.binding.get();
    };
    Sprite.prototype.get_scale = function () {
        return this.scale;
    };
    Sprite.prototype.get_texture = function () {
        return this.texture;
    };
    Sprite.prototype.set_position = function (p) {
        this.binding.set(p);
    };
    Sprite.prototype.set_texture = function (texture) {
        this.texture = texture;
    };
    Sprite.prototype.delete_texture = function () {
        delete this.texture;
    };
    Sprite.prototype.set_scale = function (p) {
        this.scale = p;
    };
    return Sprite;
}());



/***/ }),

/***/ "./src/Utility/CustomBlock.ts":
/*!************************************!*\
  !*** ./src/Utility/CustomBlock.ts ***!
  \************************************/
/*! exports provided: CustomBlock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomBlock", function() { return CustomBlock; });
var CustomBlock = (function () {
    function CustomBlock(name, def, generator, suffix) {
        var _this = this;
        if (name in Blockly.Blocks)
            throw new Error("Requested Block name is already in use: " + name);
        this.name = name;
        this.suffix = suffix;
        Blockly.Blocks[name] = {
            init: function () {
                if (def.message0) {
                    this.jsonInit(def);
                }
                else {
                    def(this);
                }
            }
        };
        var unsafe = Blockly.JavaScript;
        if (name in unsafe)
            throw new Error("Specified generator already defined: " + name);
        unsafe[name] = (function (b) {
            var r = generator(b);
            if (_this.suffix) {
                if (r instanceof Array)
                    r[0] += _this.suffix;
                else
                    r += _this.suffix;
            }
            return r;
        });
    }
    CustomBlock.dispose = function (name, healStack) {
        if (Blockly.Blocks[name].dispose)
            Blockly.Blocks[name].dispose(healStack);
        delete Blockly.Blocks[name];
        var unsafe = Blockly.JavaScript;
        delete unsafe[name];
    };
    CustomBlock.prototype.block = function () {
        return Blockly.Blocks[this.name];
    };
    CustomBlock.prototype.set_suffix = function (suffix) {
        this.suffix = suffix;
    };
    CustomBlock.prototype.dispose = function (healStack) {
        this.block().dispose(healStack);
    };
    return CustomBlock;
}());



/***/ }),

/***/ "./src/Utility/InterpManager.ts":
/*!**************************************!*\
  !*** ./src/Utility/InterpManager.ts ***!
  \**************************************/
/*! exports provided: InterpManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InterpManager", function() { return InterpManager; });
/* harmony import */ var JS_Interpreter_acorn_interpreter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! JS-Interpreter/acorn_interpreter */ "./node_modules/JS-Interpreter/acorn_interpreter.js");
/* harmony import */ var JS_Interpreter_acorn_interpreter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(JS_Interpreter_acorn_interpreter__WEBPACK_IMPORTED_MODULE_0__);

var NON_EVENT_INTERP = "NON_EVENT_INTERP";
var EVENT_INTERP = "EVENT_INTERP";
var InterpManager = (function () {
    function InterpManager(workspace, api, handlerDelay) {
        if (handlerDelay === void 0) { handlerDelay = 5; }
        this.interpreters = {};
        this.sources = {};
        this.handler = null;
        this.MAIN = "__MAIN__";
        this.workspace = workspace;
        this.handlerDelay = handlerDelay;
        this.api = api;
    }
    InterpManager.prototype.hasNextStep = function () {
        return Object.keys(this.interpreters).length > 0;
    };
    InterpManager.prototype.step = function () {
        var keys = Object.keys(this.interpreters);
        for (var i = 0; i != keys.length; ++i) {
            var interp = this.interpreters[keys[i]];
            if (!interp.step()) {
                delete this.interpreters[keys[i]];
            }
        }
    };
    InterpManager.prototype.run = function (code, cb, should_block) {
        var _this = this;
        if (should_block === void 0) { should_block = false; }
        var do_run = function () {
            if (_this.hasNextStep()) {
                _this.step();
                _this.handler = setTimeout(do_run, _this.handlerDelay);
            }
            else {
                _this.handler = setTimeout(do_run, _this.handlerDelay);
            }
        };
        var blocks = this.workspace.getBlocksByType("event_keypress", false);
        var blocks_as_code = blocks.map(function (block) {
            return Blockly.JavaScript.blockToCode(block);
        });
        code = blocks_as_code.join(";\n") + ";\n" + code;
        console.log("CODE:", code);
        this.interpreters[this.MAIN] = this.createInterpreter(code, true);
        this.main_scope = this.interpreters[this.MAIN].global;
        if (should_block) {
            this.interpreters[this.MAIN].appendCode("while (true);");
        }
        window.onkeydown = function (ev) {
            var key = ev.keyCode;
            if (key in _this.sources) {
                console.log("RUNNING SOURCE:", _this.sources[key]);
                _this.interpreters[key] = _this.createInterpreter(_this.sources[key]);
            }
        };
        do_run();
    };
    InterpManager.prototype.stop = function () {
        clearTimeout(this.handler);
        this.interpreters = {};
        this.sources = {};
    };
    InterpManager.prototype.createInterpreter = function (code, is_main_thread) {
        var _this = this;
        if (is_main_thread === void 0) { is_main_thread = false; }
        var initAPI = function (interpreter, scope) {
            interpreter.setProperty(scope, "alert", interpreter.createNativeFunction(function (text) {
                return alert(text);
            }));
            interpreter.setProperty(scope, "prompt", interpreter.createNativeFunction(function (text) {
                return prompt(text);
            }));
            interpreter.setProperty(scope, "__handle_event", interpreter.createNativeFunction(function (key_filter, root_id) {
                Blockly.JavaScript.variableDB_.setVariableMap(_this.workspace.getVariableMap());
                _this.sources[key_filter] = Blockly.JavaScript.statementToCode(_this.workspace.getBlockById(root_id), "keypress_input", Blockly.JavaScript.ORDER_NONE);
            }));
            interpreter.setProperty(scope, "__distance", interpreter.createNativeFunction(function (lhs, rhs) {
                var l = JSON.parse(lhs);
                var r = JSON.parse(rhs);
                return Math.hypot(l.x - r.x, l.y - r.y);
            }));
            var api_keys = Object.keys(_this.api);
            var _loop_1 = function (i) {
                var ap = _this.api[api_keys[i]];
                interpreter.setProperty(scope, api_keys[i], interpreter.createNativeFunction(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return ap.apply(void 0, args);
                }));
            };
            for (var i = 0; i != api_keys.length; ++i) {
                _loop_1(i);
            }
            interpreter.setProperty(scope, "__windowssSetItem", interpreter.createNativeFunction(function (id, val) {
                return window.sessionStorage.setItem(id, val);
            }));
            interpreter.setProperty(scope, "__windowssGetItem", interpreter.createNativeFunction(function (id) {
                return window.sessionStorage.getItem(id);
            }));
        };
        var interp = new JS_Interpreter_acorn_interpreter__WEBPACK_IMPORTED_MODULE_0__["Interpreter"](code, initAPI);
        if (!is_main_thread) {
            interp.stateStack[0].scope = this.main_scope;
        }
        return interp;
    };
    return InterpManager;
}());



/***/ }),

/***/ "./src/Utility/Toolbox.ts":
/*!********************************!*\
  !*** ./src/Utility/Toolbox.ts ***!
  \********************************/
/*! exports provided: Toolbox, unwind */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Toolbox", function() { return Toolbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unwind", function() { return unwind; });
var Toolbox = (function () {
    function Toolbox(modules) {
        this.modules = modules;
    }
    Toolbox.prototype.toString = function () {
        var res = "<xml style=\"display: none;\">";
        res += unwind(this.modules);
        res += "</xml>";
        return res;
    };
    return Toolbox;
}());

function unwind(arg, prepend_xml) {
    if (prepend_xml === void 0) { prepend_xml = false; }
    var res = (prepend_xml) ? "<xml>" : "";
    var cur;
    for (var _i = 0, arg_1 = arg; _i < arg_1.length; _i++) {
        var what = arg_1[_i];
        if (what.modules) {
            cur = what;
            res += "<category name=\"" + cur.name + "\" colour=\"" + cur.colour + "\"";
            if (cur.custom) {
                res += " custom=\"" + cur.custom + "\"";
            }
            res += ">";
            res += unwind(cur.modules);
            res += "</category>";
        }
        else if (what.callbackKey) {
            cur = what;
            res += "<button text=\"" + cur.text + "\" callbackKey=\"" + cur.callbackKey + "\"></button>";
        }
        else if (what.text) {
            cur = what;
            res += "<label text=\"" + cur.text + "\"></label>";
        }
        else if (what.gap !== undefined) {
            cur = what;
            res += "<sep gap=\"" + cur.gap + "\"></sep>";
        }
        else {
            res += "<block type=\"" + what + "\"></block>";
        }
    }
    if (prepend_xml)
        res += "</xml>";
    return res;
}


/***/ }),

/***/ "./src/Utility/WindowManager.ts":
/*!**************************************!*\
  !*** ./src/Utility/WindowManager.ts ***!
  \**************************************/
/*! exports provided: WindowDeclaration, WindowManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowDeclaration", function() { return WindowDeclaration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowManager", function() { return WindowManager; });
var WindowDeclaration = (function () {
    function WindowDeclaration(name, val) {
        this.name = name;
        if (val || window.sessionStorage.getItem(name) == undefined)
            window.sessionStorage.setItem(this.name, val !== null ? JSON.stringify(val) : null);
    }
    WindowDeclaration.prototype.delete = function () {
        window.sessionStorage.removeItem(this.name);
    };
    WindowDeclaration.prototype.get = function () {
        return JSON.parse(window.sessionStorage.getItem(this.name));
    };
    WindowDeclaration.prototype.set = function (val) {
        window.sessionStorage.setItem(this.name, JSON.stringify(val));
    };
    WindowDeclaration.prototype.toGetterBinding = function () {
        return "__windowssGetItem(\"" + this.name + "\")";
    };
    WindowDeclaration.asGetterBinding = function (name) {
        return "__windowssGetItem(\"" + name + "\")";
    };
    WindowDeclaration.asSetterBinding = function (name) {
        return "__windowssSetItem(\"" + name + "\", ";
    };
    return WindowDeclaration;
}());

var WindowManager = (function () {
    function WindowManager() {
    }
    WindowManager.eById = function (id) {
        var res = document.getElementById(id);
        if (res == null)
            throw new Error("Could not find element with ID: " + id);
        return res;
    };
    WindowManager.declare = function (name, val) {
        if (window.sessionStorage.getItem(name) !== null) {
            throw new Error("Window attribute already declared: " + name);
        }
        return new WindowDeclaration(name, val);
    };
    WindowManager.fetch = function (name) {
        if (window.sessionStorage.getItem(name) == undefined) {
            throw new Error("Window attribute not defined: " + name);
        }
        return new WindowDeclaration(name);
    };
    ;
    WindowManager.origin = function () {
        var p = location.href.split('/');
        delete p[p.length - 1];
        return p.join('/');
    };
    WindowManager.clear = function () {
        window.sessionStorage.clear();
    };
    return WindowManager;
}());



/***/ }),

/***/ "./src/components.ts":
/*!***************************!*\
  !*** ./src/components.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Components_bciDevice_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Components/bciDevice.component */ "./src/Components/bciDevice.component.ts");
/* harmony import */ var _Components_averageBandPowerRange_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Components/averageBandPowerRange.component */ "./src/Components/averageBandPowerRange.component.ts");
/* harmony import */ var _Components_signalBandPowerRange_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Components/signalBandPowerRange.component */ "./src/Components/signalBandPowerRange.component.ts");
/* harmony import */ var _Components_blocklyEnd_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/blocklyEnd.component */ "./src/Components/blocklyEnd.component.ts");
/* harmony import */ var _Components_display_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/display.component */ "./src/Components/display.component.ts");
/* harmony import */ var _Components_graph_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Components/graph.component */ "./src/Components/graph.component.ts");
/* harmony import */ var _Components_buffer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Components/buffer.component */ "./src/Components/buffer.component.ts");
/* harmony import */ var _Components_number_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Components/number.component */ "./src/Components/number.component.ts");
/* harmony import */ var _Components_string_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Components/string.component */ "./src/Components/string.component.ts");









var components = {
    bciDeviceComponent: _Components_bciDevice_component__WEBPACK_IMPORTED_MODULE_0__["default"],
    averageBandPowerRangeComponent: _Components_averageBandPowerRange_component__WEBPACK_IMPORTED_MODULE_1__["default"],
    signalBandPowerRangeComponent: _Components_signalBandPowerRange_component__WEBPACK_IMPORTED_MODULE_2__["default"],
    blocklyEndComponent: _Components_blocklyEnd_component__WEBPACK_IMPORTED_MODULE_3__["default"],
    displayComponent: _Components_display_component__WEBPACK_IMPORTED_MODULE_4__["default"],
    graphComponent: _Components_graph_component__WEBPACK_IMPORTED_MODULE_5__["default"],
    bufferComponent: _Components_buffer_component__WEBPACK_IMPORTED_MODULE_6__["default"],
    numberComponent: _Components_number_component__WEBPACK_IMPORTED_MODULE_7__["default"],
    stringComponent: _Components_string_component__WEBPACK_IMPORTED_MODULE_8__["default"],
};
/* harmony default export */ __webpack_exports__["default"] = (components);


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
    LOCALE: "EN",
    paths: {
        background: "media/background3.png",
        amoeba: "media/players/amoeba.png",
        bacteria: "media/players/green-bacteria.png",
        shrimp: "media/players/shrimp.png"
    }
});


/***/ }),

/***/ "./src/graph.ts":
/*!**********************!*\
  !*** ./src/graph.ts ***!
  \**********************/
/*! exports provided: Graph, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph; });
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ "./node_modules/chart.js/dist/Chart.js");
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chart_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility/WindowManager */ "./src/Utility/WindowManager.ts");


var alpha_component = "88";
var WINDOW_SIZE = 64;
var Graph = (function () {
    function Graph(id, datasets, colors) {
        this.ctx = document.getElementById(id).getContext('2d');
        this.declarations = datasets.map(function (name) { return _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_1__["WindowManager"].fetch(name); });
        var ds = datasets.map(function (name, index) {
            var cap = name[0].toLocaleUpperCase() + name.substr(1);
            return {
                label: cap,
                xLabels: Array.apply(null, { length: WINDOW_SIZE }).map(Number.call, Number),
                data: [],
                backgroundColor: colors[index] + alpha_component
            };
        });
        this.chart = new chart_js__WEBPACK_IMPORTED_MODULE_0__["Chart"](this.ctx, {
            type: 'line',
            data: {
                datasets: ds
            },
            options: {
                scales: {
                    xAxes: [{
                            type: "category",
                        }],
                    yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 1
                            }
                        }]
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
    Graph.prototype.update = function () {
        var dec = this.declarations;
        this.chart.data.datasets.forEach(function (ds, index) {
            var _a;
            var data = dec[index].get();
            if (data.length == 0)
                return;
            (_a = ds.data).push.apply(_a, dec[index].get());
            if (ds.data.length > WINDOW_SIZE)
                ds.data.splice(0, ds.data.length - WINDOW_SIZE - 1);
        });
        this.chart.update(0);
    };
    return Graph;
}());

;
/* harmony default export */ __webpack_exports__["default"] = (Graph);


/***/ }),

/***/ "./src/i18n/en.i18n.ts":
/*!*****************************!*\
  !*** ./src/i18n/en.i18n.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var messages = {
    bci: {
        block: "BCI",
        tooltip: "The corresponding brain frequency.",
        alpha: "Alpha",
        beta: "Beta",
        theta: "Theta",
        delta: "Delta",
        gamma: "Gamma",
        engagement: "Engagement"
    },
    bluetooth: {
        error: {
            connection: "Could not connect..."
        }
    },
    category: {
        bci: "BCI",
        events: "Events",
        flow: "Flow",
        loops: "Loops",
        logic: "Logic",
        math: "Math",
        players: "Players",
        text: "Text",
        variables: "Variables"
    },
    flow: {
        add: "Add Flow Block",
        already_exists: function (name) {
            return "A flow block named '" + name + "' already exists.";
        },
        prompt: "New flow block name",
        tooltip: "A flow component. Click the gear to edit me."
    },
    player: {
        create: "Create a player",
        new: "New Player Name",
        none: "No available players",
        amoeba: "Amoeba",
        bacteria: "Bacteria"
    },
    help: {
        no_players: "There aren't any players. Press the + to add one!"
    },
    events: {
        keypress: "On Keypress",
        keys: {
            "32": "Space",
            "38": "Up Arrow",
            "40": "Down Arrow",
            "39": "Right Arrow",
            "37": "Left Arrow",
            "48": "0",
            "49": "1",
            "50": "2",
            "51": "3",
            "52": "4",
            "53": "5",
            "54": "6",
            "55": "7",
            "56": "8",
            "57": "9",
            "65": "A",
            "66": "B",
            "67": "C",
            "68": "D",
            "69": "E",
            "70": "F",
            "71": "G",
            "72": "H",
            "73": "I",
            "74": "J",
            "75": "K",
            "76": "L",
            "77": "M",
            "78": "N",
            "79": "O",
            "80": "P",
            "81": "Q",
            "82": "R",
            "83": "S",
            "84": "T",
            "85": "U",
            "86": "V",
            "87": "W",
            "88": "X",
            "89": "Y",
            "90": "Z"
        }
    }
};
/* harmony default export */ __webpack_exports__["default"] = (messages);


/***/ }),

/***/ "./src/i18n/i18n.ts":
/*!**************************!*\
  !*** ./src/i18n/i18n.ts ***!
  \**************************/
/*! exports provided: set_locale */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set_locale", function() { return set_locale; });
/* harmony import */ var _en_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./en.i18n */ "./src/i18n/en.i18n.ts");

function set_locale(locale_code) {
    switch (locale_code.toLocaleLowerCase()) {
        case "en":
            return _en_i18n__WEBPACK_IMPORTED_MODULE_0__["default"];
        default:
            throw new Error("Locale not found: " + locale_code);
    }
}


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utility/WindowManager */ "./src/Utility/WindowManager.ts");
/* harmony import */ var _Utility_InterpManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utility/InterpManager */ "./src/Utility/InterpManager.ts");
/* harmony import */ var _Utility_Toolbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utility/Toolbox */ "./src/Utility/Toolbox.ts");
/* harmony import */ var _Playground__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Playground */ "./src/Playground.ts");
/* harmony import */ var _Blocks_BCIBlocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Blocks/BCIBlocks */ "./src/Blocks/BCIBlocks.ts");
/* harmony import */ var _Blocks_EventBlocks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Blocks/EventBlocks */ "./src/Blocks/EventBlocks.ts");
/* harmony import */ var _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Blocks/FlowBlocks */ "./src/Blocks/FlowBlocks.ts");
/* harmony import */ var _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Blocks/PlayerBlocks */ "./src/Blocks/PlayerBlocks.ts");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./config */ "./src/config.ts");
/* harmony import */ var _i18n_i18n__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./i18n/i18n */ "./src/i18n/i18n.ts");
/* harmony import */ var bci_device__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! bci-device */ "./node_modules/bci-device/dest/BCIDevice.js");
/* harmony import */ var bci_device__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(bci_device__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _graph__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./graph */ "./src/graph.ts");
/* harmony import */ var _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Utility/CustomBlock */ "./src/Utility/CustomBlock.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = undefined;











var locale = _i18n_i18n__WEBPACK_IMPORTED_MODULE_9__["set_locale"](_config__WEBPACK_IMPORTED_MODULE_8__["default"].LOCALE);


var g = new _graph__WEBPACK_IMPORTED_MODULE_11__["default"]("graph", ["flow_data"], ["#ffe119"]);
setInterval(function () { return g.update(); }, 100);
var blockly_div = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("workspace");
var code_div = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("codeText");
var webgl_div = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("webgl");
Blockly.JavaScript.STATEMENT_PREFIX = "__highlightBlock(%1);\n";
Blockly.JavaScript.addReservedWords("__highlightBlock");
var playground = new _Playground__WEBPACK_IMPORTED_MODULE_3__["Playground"](webgl_div);
var players = {};
var background = playground.create_sprite("__background", "__background", "background", _config__WEBPACK_IMPORTED_MODULE_8__["default"].paths.background, function () { return __drawFrame(); });
players["__background"] = background;
Blockly.JavaScript.addReservedWords("__drawFrame");
function __drawFrame() {
    return new Promise(function (resolve) {
        playground.draw(Object.values(players));
        resolve("Drawn");
    });
}
_Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["PlayerSet"].set_suffix("__drawFrame();\n");
_Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["PlayerUpdateX"].set_suffix("__drawFrame();\n");
_Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["PlayerUpdateY"].set_suffix("__drawFrame();\n");
var trash = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("canvas-trash");
var mouse = { point: { x: 0, y: 0 }, down: false, shouldDelete: false };
var selected = "";
webgl_div.onmousedown = function (event) {
    mouse.down = true;
};
webgl_div.onmouseup = function (event) {
    mouse.down = false;
    var delete_modal = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("delete-modal");
    if (mouse.shouldDelete) {
        delete_modal.click();
        trash.style.color = "white";
        trash.style.transform = "scale(1, 1)";
        trash.style.right = "-1em";
        mouse.shouldDelete = false;
    }
};
webgl_div.onmousemove = function (event) {
    var bounds = webgl_div.getBoundingClientRect();
    var in_range = function (val, ref, range) {
        return val > ref - range && val < ref + range;
    };
    mouse.point = {
        x: (event.clientX / bounds.width) * 2 - 1.0,
        y: ((event.clientY - 64) / bounds.height) * -2 + 1.0
    };
    if (mouse.down) {
        if (selected === "")
            return;
        players[selected].set_position(mouse.point);
        var windows_1 = _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["player_window_list"].get();
        var find_player = function (id) {
            for (var i = 0; i != windows_1.length; ++i) {
                if (windows_1[i][1] == id)
                    return windows_1[i];
            }
            throw "PLAYER NOT FOUND: " + name;
        };
        var found = find_player(selected);
        found[2] = mouse.point;
        _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["player_window_list"].set(windows_1);
        __drawFrame();
        if (in_range(mouse.point.x, 0.9, 0.05) &&
            in_range(mouse.point.y, -0.9, 0.06)) {
            trash.style.transform = "scale(1.1, 1.1)";
            trash.style.color = "red";
            mouse.shouldDelete = true;
        }
        else {
            trash.style.color = "white";
            trash.style.transform = "scale(1, 1)";
            mouse.shouldDelete = false;
        }
    }
    else {
        var show_cursor = false;
        for (var player in players) {
            if (player == "__background")
                continue;
            var pos = players[player].get_position();
            if (in_range(mouse.point.x, pos.x, 0.1) &&
                in_range(mouse.point.y, pos.y, 0.1)) {
                show_cursor = true;
                selected = player;
            }
        }
        if (!show_cursor) {
            trash.style.right = "-1em";
            selected = "";
        }
        else {
            trash.style.right = "0";
            _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("selected-player").innerHTML = players[selected].name;
        }
        webgl_div.style.cursor = show_cursor ? "pointer" : "default";
    }
};
var cat_loops = {
    name: locale.category.loops,
    colour: "%{BKY_LOOPS_HUE}",
    modules: ["controls_whileUntil", "controls_repeat_ext", "controls_repeat"]
};
var cat_text = {
    name: locale.category.text,
    colour: "%{BKY_TEXTS_HUE}",
    modules: ["text", "text_print"]
};
var cat_logic = {
    name: locale.category.logic,
    colour: "%{BKY_LOGIC_HUE}",
    modules: [
        "controls_if",
        "logic_compare",
        "logic_operation",
        "logic_negate",
        "logic_boolean",
        "logic_ternary"
    ]
};
var cat_math = {
    name: locale.category.math,
    colour: "%{BKY_MATH_HUE}",
    modules: [
        "math_number",
        "math_single",
        "math_round",
        "math_trig",
        "math_constrain",
        "math_arithmetic",
        "math_modulo",
        "math_random_int"
    ]
};
var cat_vars = {
    name: locale.category.variables,
    colour: 330,
    custom: "VARIABLE",
    modules: []
};
var toolbox = new _Utility_Toolbox__WEBPACK_IMPORTED_MODULE_2__["Toolbox"]([
    cat_loops,
    cat_logic,
    cat_text,
    cat_math,
    cat_vars,
    Object(_Blocks_EventBlocks__WEBPACK_IMPORTED_MODULE_5__["EventCategory"])(locale.category.events),
    { gap: 0 },
    Object(_Blocks_BCIBlocks__WEBPACK_IMPORTED_MODULE_4__["BCICategory"])(locale.category.bci),
    Object(_Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["FlowCategory"])(locale.category.flow),
    Object(_Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["PlayerCategory"])(locale.category.players)
]);
var workspace = Blockly.inject(blockly_div, {
    toolbox: toolbox.toString()
});
var onresize = function (e) {
    var area = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("workspace-area");
    blockly_div.style.left = 0 + "px";
    blockly_div.style.top = 0 + "px";
    blockly_div.style.width = area.offsetWidth + "px";
    blockly_div.style.height = area.offsetHeight + "px";
    Blockly.svgResize(workspace);
};
window.addEventListener("resize", onresize, false);
onresize();
function __highlightBlock(id) {
    workspace.highlightBlock(id);
}
workspace.registerToolboxCategoryCallback("PLAYERS", _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["PlayerCategoryCallback"]);
workspace.registerToolboxCategoryCallback("FLOWS", _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["FlowCategoryCallback"]);
workspace.addChangeListener(function (event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    code_div.innerHTML = code;
});
Blockly.Extensions.registerMutator("flow_mutator", _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["FlowMutator"].get_serialize(), function () {
    this.setMutator(new _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["FlowMutator"]());
}, null);
workspace.registerButtonCallback("add_flow", function (e) {
    var name = prompt(locale.flow.prompt);
    if (name == undefined || name.length == 0)
        return;
    var fl = _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["flow_window_list"].get();
    while (name != undefined && fl[name] != undefined) {
        alert(locale.flow.already_exists(name));
        name = prompt(locale.flow.prompt);
    }
    if (name == undefined || name.length == 0)
        return;
    Object(_Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["AddFlowBlock"])(name);
    workspace.refreshToolboxSelection();
});
var player_count = {};
var addPlayer = function (type, init) {
    if (init === void 0) { init = undefined; }
    var modal_close = document.getElementsByClassName("close")[0];
    modal_close.click();
    if (!player_count[type])
        player_count[type] = 1;
    var name, id, position;
    if (init) {
        name = init.name;
        id = init.id;
        position = init.position;
        var count = Number(name.match(/-([0-9]+)$/)[1]);
        if (player_count[type] < count)
            player_count[type] = count;
    }
    else {
        name = type + "-" + player_count[type];
        id = "PLAYER_" + name;
        position = { x: 0, y: 0 };
    }
    var path = _config__WEBPACK_IMPORTED_MODULE_8__["default"].paths[type];
    ++player_count[type];
    players[id] = playground.create_sprite(id, name, type, path, function () {
        return __drawFrame();
    });
    players[id].set_scale({ x: 0.1, y: 0.1 });
    players[id].set_position(position);
    _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["player_window_list"].set(_Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["player_window_list"].get().concat([[name, id, position]]));
    workspace.refreshToolboxSelection();
    __drawFrame();
};
var removePlayer = function (id) {
    var player = players[id];
    if (!player) {
        console.warn("Invalid player specified.", id);
        return;
    }
    player.delete();
    delete players[id];
    var pl = _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["player_window_list"].get();
    _Blocks_PlayerBlocks__WEBPACK_IMPORTED_MODULE_7__["player_window_list"].set(pl.filter(function (pair) {
        if (pair[1] === id) {
            return false;
        }
    }));
    workspace.refreshToolboxSelection();
    selected = "";
    mouse.shouldDelete = false;
    __drawFrame();
};
var clear_players = function () {
    var keys = Object.keys(players);
    for (var i = 0; i != keys.length; ++i) {
        if (players[keys[i]].type == "background")
            continue;
        removePlayer(players[keys[i]].id);
    }
    player_count = {};
};
var exec = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("play_arrow_handler");
var run_icon = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("play_arrow_icon");
var interpManger = new _Utility_InterpManager__WEBPACK_IMPORTED_MODULE_1__["InterpManager"](workspace, {
    __drawFrame: __drawFrame,
    __highlightBlock: __highlightBlock,
    __get_flow: Object(_Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["get_flow_api"])(workspace)
});
exec.onclick = function () {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var should_block = workspace.getBlocksByType("event_keypress", false).length != 0;
    if (run_icon.innerHTML === "play_arrow") {
        run_icon.innerHTML = "stop";
        interpManger.run(code, function () { return run_icon.innerHTML = "play_arrow"; }, should_block);
    }
    else {
        interpManger.stop();
        run_icon.innerHTML = "play_arrow";
    }
};
var save_handler = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("save_handler");
save_handler.onclick = function () {
    var as_dom = Blockly.Xml.workspaceToDom(workspace);
    var players_as_dom = document.createElement("players");
    var player_keys = Object.keys(players);
    for (var i = 0; i != player_keys.length; ++i) {
        var pla = players[player_keys[i]];
        if (pla.type == "background")
            continue;
        var player_as_dom = document.createElement("player");
        player_as_dom.setAttribute("position", JSON.stringify(pla.get_position()));
        player_as_dom.setAttribute("type", pla.type);
        player_as_dom.setAttribute("name", pla.name);
        player_as_dom.setAttribute("id", pla.id);
        players_as_dom.appendChild(player_as_dom);
    }
    as_dom.appendChild(players_as_dom);
    var flows_as_dom = document.createElement("flows");
    var flows = _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["flow_window_list"].get();
    var flow_keys = Object.keys(flows);
    for (var i = 0; i != flow_keys.length; ++i) {
        var flo = flows[flow_keys[i]];
        var flow_as_dom = document.createElement("flow");
        flow_as_dom.setAttribute("data", flo.data);
        flow_as_dom.setAttribute("name", flo.name);
        flows_as_dom.appendChild(flow_as_dom);
    }
    as_dom.appendChild(flows_as_dom);
    var as_text = Blockly.Xml.domToText(as_dom);
    function download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
    download("workspace.txt", as_text);
};
var load_handler = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("open_in_browser_handler");
var load_input = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("load_file_input");
load_handler.onclick = function () { return load_input.click(); };
load_input.onchange = function (e) {
    var file = e.target.files[0];
    if (!file) {
        return;
    }
    clear_players();
    workspace.clear();
    workspace.clearUndo();
    var flows = _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["flow_window_list"].get();
    var keys = Object.keys(flows);
    for (var i = 0; i != keys.length; ++i) {
        var flo = flows[keys[i]];
        var name_1 = "flow_block_" + flo.name;
        var block = Blockly.Blocks[name_1];
        block.editor_.destroy();
        block.editor_ = undefined;
        _Utility_CustomBlock__WEBPACK_IMPORTED_MODULE_12__["CustomBlock"].dispose("flow_block_" + flo.name, true);
    }
    _Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["flow_window_list"].set({});
    var reader = new FileReader();
    reader.onload = function (e) {
        var contents = e.target.result.toString();
        var as_xml = Blockly.Xml.textToDom(contents);
        var flow_blocks = as_xml.querySelector("flows");
        flow_blocks.querySelectorAll("flow").forEach(function (flow) {
            var block = Object(_Blocks_FlowBlocks__WEBPACK_IMPORTED_MODULE_6__["AddFlowBlock"])(flow.getAttribute("name"));
            var as_flow = block.block();
            var data = JSON.parse(flow.getAttribute("data"));
            as_flow.data = flow.getAttribute("data");
            as_flow.editor_.get_editor().fromJSON(data.editor);
        });
        var player_blocks = as_xml.querySelector("players");
        player_blocks.querySelectorAll("player").forEach(function (player) {
            var type = player.getAttribute("type");
            var init = {
                id: player.getAttribute("id"),
                name: player.getAttribute("name"),
                position: JSON.parse(player.getAttribute("position"))
            };
            addPlayer(type, init);
        });
        Blockly.Xml.domToWorkspace(as_xml, workspace);
    };
    reader.readAsText(file);
};
var battery_icon = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("battery_icon");
var present_battery = function () {
    return;
    var battery_level = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].fetch("battery").get();
    if (battery_level < 0)
        return;
    var interval = Math.round(battery_level / 10) * 10;
    if (interval < 20)
        battery_icon.innerHTML = "battery_alert";
    else if (interval > 90)
        battery_icon.innerHTML = "battery_full";
    else
        battery_icon.innerHTML = "battery_" + interval;
};
setInterval(present_battery, 30 * 1000);
var connector = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("bluetooth_handler");
var connector_icon = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("bluetooth_icon");
connector.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connector.setAttribute("disabled", "true");
                if (!(_Blocks_BCIBlocks__WEBPACK_IMPORTED_MODULE_4__["Device"].state == bci_device__WEBPACK_IMPORTED_MODULE_10__["DeviceState"].CONNECTED)) return [3, 2];
                return [4, _Blocks_BCIBlocks__WEBPACK_IMPORTED_MODULE_4__["Device"].disconnect()];
            case 1:
                _a.sent();
                connector_icon.innerText = "bluetooth";
                return [3, 5];
            case 2:
                _a.trys.push([2, 4, , 5]);
                connector_icon.classList.add("blink");
                connector_icon.innerText = "bluetooth_searching";
                return [4, _Blocks_BCIBlocks__WEBPACK_IMPORTED_MODULE_4__["Device"].connect()];
            case 3:
                _a.sent();
                console.log("Connected device.");
                connector_icon.classList.remove("blink");
                connector_icon.innerText = "bluetooth_connected";
                setTimeout(present_battery, 10 * 1000);
                return [3, 5];
            case 4:
                e_1 = _a.sent();
                connector_icon.classList.remove("blink");
                console.log(locale.bluetooth.error.connection, e_1);
                connector_icon.innerText = "bluetooth";
                return [3, 5];
            case 5:
                connector.removeAttribute("disabled");
                return [2];
        }
    });
}); };
var _loop_1 = function (type) {
    if (type === "background")
        return "continue";
    var ele = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("add_" + type);
    ele.onclick = function () { return addPlayer(type); };
    ele.src = _config__WEBPACK_IMPORTED_MODULE_8__["default"].paths[type];
    var del = _Utility_WindowManager__WEBPACK_IMPORTED_MODULE_0__["WindowManager"].eById("delete-character");
    del.onclick = function () { return removePlayer(selected); };
};
for (var type in _config__WEBPACK_IMPORTED_MODULE_8__["default"].paths) {
    _loop_1(type);
}


/***/ })

/******/ });
//# sourceMappingURL=neuroblock.pack.js.map