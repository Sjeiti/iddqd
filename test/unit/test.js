(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* global DocumentTouch */
// todo document

module.exports = (function () {
	var oInfo = window.navigator,
	    sTypeTouch = typeof window.Touch;
	return {
		standalone: !!oInfo.standalone,
		touch: !!(sTypeTouch == "object" || sTypeTouch == "function" || window.DocumentTouch && document instanceof DocumentTouch)
	};
})();

},{}],2:[function(require,module,exports){
"use strict";

// todo document

module.exports = (function () {
	var oNavigator = window.navigator,
	    sUserAgent = oNavigator.userAgent,
	    isIPad = !!sUserAgent.match(/iPad/i),
	    isIPhone = !!sUserAgent.match(/iPhone/i),
	    isIPod = !!sUserAgent.match(/iPod/i),
	    isAndroid = !!sUserAgent.match(/Android/i),
	    isBlackBerry = !!sUserAgent.match(/BlackBerry/i),
	    isIEMobile = !!sUserAgent.match(/IEMobile/i),
	    isPhoneGap = window.PhoneGap !== undefined,
	    isCordova = window.cordova !== undefined
	// cumulative
	,
	    isIOS = isIPad || isIPhone || isIPod,
	    isMobile = isIOS || isAndroid || isBlackBerry || isIEMobile,
	    isStandalone = !!oNavigator.standalone;
	function addClassNames() {
		var mHTML = document.body,
		    sPrefix = "env_",
		    addBodyClass = mHTML.classList.add.bind(mHTML.classList);
		isIPad && addBodyClass(sPrefix + "ipad");
		isIPhone && addBodyClass(sPrefix + "iphone");
		isIPod && addBodyClass(sPrefix + "ipod");
		isAndroid && addBodyClass(sPrefix + "android");
		isBlackBerry && addBodyClass(sPrefix + "blackberry");
		isIEMobile && addBodyClass(sPrefix + "iemobile");
		isIOS && addBodyClass(sPrefix + "ios");
		isMobile && addBodyClass(sPrefix + "mobile");
		isPhoneGap && addBodyClass(sPrefix + "phonegap");
		isCordova && addBodyClass(sPrefix + "cordova");
	}
	return {
		isIPad: isIPad,
		isIPhone: isIPhone,
		isIPod: isIPod,
		isAndroid: isAndroid,
		isBlackBerry: isBlackBerry,
		isIEMobile: isIEMobile,
		isIOS: isIOS,
		isMobile: isMobile,
		standalone: isStandalone,
		addClassNames: addClassNames
	};
})();

},{}],3:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/**
 * Create namespaces. If only the first 'namespace' parameter is set it will return the namespace if it exists or null if it doesn't.
 * @name namespace
 * @method
 * @param {String} namespace The namespace we're creating or expanding
 * @param {Object} object The object with which to extend the namespace
 */

var _ = _interopRequireWildcard(require("./../vendor/lodash/dist/lodash.min.js"));

module.exports = function (namespace, object) {
	var extend = _.extend,
	    oBase = window,
	    aNS = namespace.split("."),
	    s;
	while (s = aNS.shift()) {
		if (object) {
			if (aNS.length === 0) {
				var oExists = oBase.hasOwnProperty(s) ? oBase[s] : null;
				oBase[s] = object;
				if (!object.hasOwnProperty("toString")) {
					object.toString = (function (s) {
						return function () {
							return "[object " + s + "]";
						};
					})(s);
				}
				if (oExists) {
					console.warn("Overwriting " + s + " in " + namespace);
					extend(oBase[s], oExists);
				}
			} else if (!oBase.hasOwnProperty(s)) {
				//} else if (!Object.prototype.hasOwnProperty.call(oBase,s)) { // ie8 fix
				oBase[s] = {};
			}
			oBase = oBase[s];
		} else if (oBase.hasOwnProperty(s)) {
			//} else if (!Object.prototype.hasOwnProperty.call(oBase,s)) { // ie8 fix
			oBase = oBase[s];
		} else {
			return;
		}
	}
	return oBase;
};

},{"./../vendor/lodash/dist/lodash.min.js":14}],4:[function(require,module,exports){
"use strict";

/**
 * Node methods
 * @module native/node
 */

/**
 * Converts a node to an object (attribute and childnode collisions may occur)
 * @param {Node} node A node
 * @param {object} extendTo An optional pre-existing object to fill.
 * @returns {object}
 */
exports.toObject = toObject;
function toObject(node, extendTo) {
	if (extendTo === undefined) extendTo = {};
	var i,
	    l,
	    aAttributes = node.attributes,
	    aChildNodes = node.childNodes;
	// attributes
	if (aAttributes && aAttributes.length) {
		for (i = 0, l = aAttributes.length; i < l; i++) {
			var oAttr = aAttributes[i];
			extendTo[oAttr.nodeName] = oAttr.nodeValue;
		}
	}
	// nodes
	for (i = 0, l = aChildNodes.length; i < l; i++) {
		var el = aChildNodes[i],
		    sElNodeName = el.nodeName,
		    iNodeType = el.nodeType,
		    oNode = iddqd.internal.host.node.toObject(el);
		switch (iNodeType) {
			case 1:
				// node
				if (extendTo.hasOwnProperty(sElNodeName)) {
					if (Array.isArray(extendTo[sElNodeName])) extendTo[sElNodeName].push(oNode);else extendTo[sElNodeName] = [extendTo[el.nodeName], oNode];
				} else {
					extendTo[sElNodeName] = oNode;
				}
				break;
			case 3:
				// text
				extendTo._text = el.innerText || el.textContent;
		}
	}
	return extendTo;
}
Object.defineProperty(exports, "__esModule", {
	value: true
});

},{}],5:[function(require,module,exports){
"use strict";

/**
 * Tries to determine the type of the string and returns it.
 * @name string.toType
 * @method
 * @returns {Object} Returns a string, number or boolean.
 */
exports.toType = toType;

/**
 * Pads a string left or right
 * @name string.pad
 * @method
 * @param {Number} length Final length of the total string.
 * @param {String} chr Character to pad the string with.
 * @param {Boolean} [left=false] Pad to the left of the string.
 * @returns {string} The padded string
 */
exports.pad = pad;

/**
 * Converts string to XML
 * @name string.toXML
 * @method
 * @returns {Document} Returns an XML Document
 */
exports.toXML = toXML;

///**
// * Converts an XML string to an object
// * @name string.toXMLObj
// * @method
// * @returns {Object}
// */
//export function toXMLObj(s){
//	import toObject from './native/node'; // todo
//	return toObject(toXML(s).childNodes[0]);
//}
//		/**
//		 * Generates a random, but pronounceable string
//		 * @name string.generate
//		 * @method
//		 * @param length {Number} Length of the string
//		 * @param cut {Boolean} Cut string to length
//		 * @returns {string}
//		 */
//		,generate: function(length,cut) {
//			var isInt = function(n) {
//				return (n%1)===0;
//			};
//			var rand = function(fStr,fEnd) {
//				var fNum = fStr + Math.random()*(fEnd-fStr);
//				return (isInt(fStr)&&isInt(fEnd))?Math.round(fNum):fNum;
//			};
//			if (length===undefined) length = 6;
//			if (cut===undefined) cut = false;
//			var aLtr = [
//				['a','e','i','o','u','y']
//				,['aa','ai','au','ea','ee','ei','eu','ia','ie','io','iu','oa','oe','oi','ua','ui']
//				,['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z']
//				,['bb','br','bs','cc','ch','cl','cr','db','dd','df','dg','dh','dj','dk','dl','dm','dn','dp','dq','dr','ds','dt','dv','dw','dz','fb','fd','ff','fg','fh','fj','fk','fl','fm','fn','fp','fq','fr','fs','ft','fv','fw','fz','gb','gd','gf','gg','gh','gj','gk','gl','gm','gn','gp','gq','gr','gs','gt','gv','gw','gz','kb','kd','kf','kg','kh','kj','kk','kl','km','kn','kp','kq','kr','ks','kt','kv','kw','kz','lb','ld','lf','lg','lh','lj','lk','ll','lm','ln','lp','lq','lr','ls','lt','lv','lw','lz','mb','md','mf','mg','mh','mj','mk','ml','mm','mn','mp','mq','mr','ms','mt','mv','mw','mz','nb','nd','nf','ng','nh','nj','nk','nl','nm','nn','np','nq','nr','ns','nt','nv','nw','nz','pb','pd','pf','pg','ph','pj','pk','pl','pm','pn','pp','pq','pr','ps','pt','pv','pw','pz','qb','qd','qf','qg','qh','qj','qk','ql','qm','qn','qp','qq','qr','qs','qt','qv','qw','qz','rb','rd','rf','rg','rh','rj','rk','rl','rm','rn','rp','rq','rr','rs','rt','rv','rw','rz','sb','sc','sd','sf','sg','sh','sj','sk','sl','sm','sn','sp','sq','sr','ss','st','sv','sw','sz','tb','td','tf','tg','th','tj','tk','tl','tm','tn','tp','tq','tr','ts','tt','tv','tw','tz','vb','vd','vf','vg','vh','vj','vk','vl','vm','vn','vp','vq','vr','vs','vt','vv','vw','vz','xb','xd','xf','xg','xh','xj','xk','xl','xm','xn','xp','xq','xr','xs','xt','xv','xw','xx','xz']
//			];
//			var iSnm = 6;
//			var sPsw = "";
//			var iNum = 0;
//			for (var i=0;i<iSnm;i++) {
//				if (i===0)			iNum = rand(0,2);
//				else if (i==iSnm-1)	iNum = (iNum<2)?2:rand(0,1);
//				else				iNum = (iNum<2)?rand(0,1)+2:rand(0,1);
//				var aLst = aLtr[iNum];
//				sPsw += aLst[ rand(0,aLst.length-1) ];
//			}
//			return cut?sPsw.substr(0,length):sPsw;
//		}
/**
 * Capitalizes the first character of the string
 * @name string.nameCase
 * @method
 * @returns {string}
 */
exports.nameCase = nameCase;

/**
 * Converts the string to camelCase notation
 * @name string.camelCase
 * @method
 * @returns {string}
 */
exports.camelCase = camelCase;

/**
 * Converts the string to dashed notation
 * @name string.dash
 * @method
 * @returns {string}
 */
exports.dash = dash;

/**
 * Converts the string to underscored notation
 * @name string.underscore
 * @method
 * @returns {string}
 */
exports.underscore = underscore;

/**
 * A minimal version of sprintf. Replaces variables in a string with the arguments. Variables are like %1$s and start at 1.
 * @param {(string|string[])} [replacements] We're the replacements
 * @returns {string}
 */
exports.sprintf = sprintf;

/**
 * Test if a string is an url
 * @param {boolean} [strict=true] Non-strict for urls without protocol, ie: www.google.com
 * @returns {boolean}
 */
exports.isUrl = isUrl;

// todo: doc, http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
exports.hashCode = hashCode;

/**
 * Turn a title into a slug
 * @returns {string}
 */
exports.toSlug = toSlug;
function toType(s) {
	// integer
	var i = parseInt(s, 10);
	if (i.toString() == s) {
		return i;
	} // floating point
	var f = parseFloat(s);
	if (f.toString() == s) {
		return f;
	} // boolean
	var b = s == "true" || (s == "false" ? false : null);
	if (b !== null) {
		return b;
	} //
	return s;
}function pad(s, length, chr, left) {
	if (left === undefined) left = false;
	var iLenStr = s.length,
	    iLenPad = length - iLenStr,
	    iLenChr = chr.length,
	    bCut = iLenChr > 1,
	    iFill = Math.max(0, bCut ? Math.ceil(iLenPad / iLenChr) : iLenPad),
	    aFill = [],
	    sFill;
	for (var i = 0; i < iFill; i++) aFill.push(chr);
	sFill = aFill.join("");
	if (bCut) sFill = sFill.substr(0, iLenPad);
	return left ? sFill + s : s + sFill;
}function toXML(s) {
	/* global ActiveXObject */
	var xDoc;
	if (window.ActiveXObject) {
		xDoc = new ActiveXObject("Microsoft.XMLDOM");
		xDoc.async = "false";
		xDoc.loadXML(s);
	} else {
		xDoc = new DOMParser().parseFromString(s, "text/xml");
	}
	return xDoc;
}function nameCase(s) {
	return ("-" + s).replace(/[_\s\-][a-z]/g, function ($1) {
		return $1.toUpperCase().replace("-", " ").replace("_", " ");
	}).substr(1);
}function camelCase(s) {
	return s.replace(/[_\s\-][a-z]/g, function ($1) {
		return $1.toUpperCase().replace("-", "").replace(" ", "").replace("_", "");
	});
}function dash(s) {
	var sCamel = s.replace(/[A-Z]/g, function ($1) {
		return "-" + $1.toLowerCase();
	});
	var sUnSpc = s.replace(/[\s_]/g, "-");
	return s == sCamel ? sUnSpc : sCamel;
}function underscore(s) {
	var sCamel = s.replace(/[A-Z]/g, function ($1) {
		return "_" + $1.toLowerCase();
	});
	var sUnSpc = s.replace(/[\s\-]/g, "_");
	return s == sCamel ? sUnSpc : sCamel;
}function sprintf(s) {
	var aMatch = s.match(/(%\d+\$s)/gi);
	if (aMatch) for (var i = 0, l = aMatch.length; i < l; i++) s = s.replace(new RegExp("(\\%" + (i + 1) + "\\$s)", "g"), arguments[i]);
	return s;
}function isUrl(s, strict) {
	var rxUrl = new RegExp(strict === undefined || strict ? "^((http|https|ftp):)?//([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$" : "^(((http|https|ftp):)?//)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$");
	return rxUrl.test(s);
}function hashCode(s) {
	var sHash = 0;
	if (s.length === 0) {
		return sHash;
	}for (var i = 0, l = s.length; i < l; i++) {
		var sChar = s.charCodeAt(i);
		sHash = (sHash << 5) - sHash + sChar;
		sHash = sHash & sHash;
	}
	return sHash;
}function toSlug(s) {
	var str = s.replace(/^\s+|\s+$/g, "").toLowerCase()
	// remove accents, swap ñ for n, etc
	,
	    from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;",
	    to = "aaaaeeeeiiiioooouuuunc------";
	for (var i = 0, l = from.length; i < l; i++) {
		str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
	}
	str = str.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
	.replace(/\s+/g, "-") // collapse whitespace and replace by -
	.replace(/-+/g, "-"); // collapse dashes

	return str;
}
Object.defineProperty(exports, "__esModule", {
	value: true
});

},{}],6:[function(require,module,exports){
"use strict";

/**
 * Type checking, also checks untyped types like integer and float.
 * @module type
 * @function
 * @param {*} obj
 * @returns {Function} A constant, ie: iddqd.type.BOOLEAN
 * @property {object} type.UNDEFINED
 * @property {object} type.NULL
 * @property {object} type.OBJECT
 * @property {object} type.ARRAY
 * @property {object} type.NODE
 * @property {object} type.EVENT
 * @property {object} type.FUNCTION
 * @property {object} type.STRING
 * @property {object} type.BOOLEAN
 * @property {object} type.INT
 * @property {object} type.FLOAT
 * @property {object} type.NAN
 * @property {object} type.INFINITE
 * @property {object} type.REGEXP
 * @property {object} type.DATE
 * @example
 type(0)===type.INT;
 type('')===type.STRING;
 type(null)===type.NULL;
 type({})===type.OBJECT;
 */
// using objects for constants for speed (see http://jsperf.com/equality-checking-different-types)
var UNDEFINED = getConstant("undefined"),
    NULL = getConstant("null"),
    OBJECT = getConstant("object"),
    ARRAY = getConstant("array"),
    NODE = getConstant("node"),
    EVENT = getConstant("event"),
    FUNCTION = getConstant("function"),
    STRING = getConstant("string"),
    BOOLEAN = getConstant("boolean"),
    INT = getConstant("int"),
    FLOAT = getConstant("float"),
    NAN = getConstant("NaN"),
    INFINITE = getConstant("Infinite"),
    REGEXP = getConstant("regexp"),
    DATE = getConstant("date")
// Error
,
    aEventProperties = ["eventPhase", "currentTarget", "cancelable", "target", "bubbles", "type", "cancelBubble", "srcElement", "defaultPrevented", "timeStamp"];
function getConstant(name) {
	var oConstant = { toString: function toString() {
			return name;
		} },
	    sConstant = name.toUpperCase();
	type[sConstant] = oConstant;
	return oConstant;
}
function type(obj) {
	var iType = -1;
	if (obj === null) {
		iType = NULL;
	} else if (obj === undefined) {
		iType = UNDEFINED;
	} else {
		// todo: http://jsperf.com/testing-types
		switch (typeof obj) {
			case "object":
				var c = obj.constructor;
				if (c === Array) iType = ARRAY;else if (c === RegExp) iType = REGEXP;else if (c === Date) iType = DATE;else if (obj.ownerDocument !== undefined) iType = NODE;else if ((function () {
					var isEvent = true;
					for (var s in aEventProperties) {
						if (aEventProperties.hasOwnProperty(s)) {
							if (obj[aEventProperties[s]] === undefined) {
								isEvent = false;
								break;
							}
						}
					}
					return isEvent;
				})()) iType = EVENT;else iType = OBJECT;
				break;
			case "function":
				iType = FUNCTION;break;
			case "string":
				iType = STRING;break;
			case "boolean":
				iType = BOOLEAN;break;
			case "number":
				if (isNaN(obj)) {
					iType = NAN;
				} else if (!isFinite(obj)) {
					iType = INFINITE;
				} else {
					iType = obj == Math.floor(obj) ? INT : FLOAT;
				}
				break;
		}
	}
	return iType;
}
module.exports = type;

},{}],7:[function(require,module,exports){
"use strict";

require("./testType");

require("./testNamespace");

// todo: other iddqd

require("./testCapabilities");

require("./testEnvironment");

require("./testNode");

require("./testString");

/*
(function(){
	'use strict';
	QUnit.config.hidepassed = true;
	var sSourcePath = '../../src/'
		,sTestPrefix = 'test-'
		,aTests = [
			'iddqd.js'
			,'iddqd.type.js'
			,'iddqd.capabilities.js'
			,'iddqd.environment.js'
			,'iddqd.internal.js'
			,'iddqd.internal.host.node.js'
			,'iddqd.internal.native.string.js'
			,'iddqd.internal.native.array.js'
			,'iddqd.internal.native.number.js'
			,'iddqd.internal.native.object.js'
			,'iddqd.internal.native.date.js'
			,'iddqd.math.color.js'
			,'iddqd.math.prng.js'
			,'iddqd.math.vector.js'
			,'iddqd.network.jsonp.js'
			,'iddqd.pattern.js'
			,'iddqd.storage.js'
			,'iddqd.storage.cookie.js'
			,'iddqd.signal.js'
			,'iddqd.image.js'
		];
	aTests.forEach(function(name){
		/!*jslint evil: true *!/
		document.write('<script src="'+sSourcePath+name+'"></script>');
		document.write('<script src="'+sTestPrefix+name+'"></script>');
	});
})();*/

},{"./testCapabilities":8,"./testEnvironment":9,"./testNamespace":10,"./testNode":11,"./testString":12,"./testType":13}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*global QUnit,test,ok*/

var capabilities = _interopRequire(require("./../../../src/capabilities"));

var type = _interopRequire(require("./../../../src/type"));

QUnit.module("capabilities");
test("standalone", function () {
	ok(type(capabilities.standalone) === type.BOOLEAN, "standalone");
});

},{"./../../../src/capabilities":1,"./../../../src/type":6}],9:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*global QUnit,test,ok*/

var environment = _interopRequire(require("./../../../src/environment"));

var type = _interopRequire(require("./../../../src/type"));

QUnit.module("environment");
test("environment", function () {
	var BOOLEAN = type.BOOLEAN;
	ok(type(environment.isIPad) === BOOLEAN, "isIPad");
	ok(type(environment.isIPhone) === BOOLEAN, "isIPhone");
	ok(type(environment.isIPod) === BOOLEAN, "isIPod");
	ok(type(environment.isAndroid) === BOOLEAN, "isAndroid");
	ok(type(environment.isBlackBerry) === BOOLEAN, "isBlackBerry");
	ok(type(environment.isIEMobile) === BOOLEAN, "isIEMobile");
	ok(type(environment.isIOS) === BOOLEAN, "isIOS");
	ok(type(environment.isMobile) === BOOLEAN, "isMobile");
	ok(type(environment.standalone) === BOOLEAN, "standalone");
	ok(type(environment.addClassNames) !== BOOLEAN, "addClassNames");
});

},{"./../../../src/environment":2,"./../../../src/type":6}],10:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*global QUnit,test,ok*/

var namespace = _interopRequire(require("./../../../src/namespace"));

QUnit.module("namespace");
test("iddqd.ns", function () {
	/*global  	a*/
	ok((namespace("a", { b: {}, c: true }), a.c), "namespace create");
	ok((namespace("a.b.c", { d: true }), a.b.c.d), "namespace append");
	//ok((namespace('a.b',{d:true}),a.b.d),'namespace overwrite');
});

},{"./../../../src/namespace":3}],11:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/*global QUnit,test,ok*/

var node = _interopRequireWildcard(require("./../../../src/native/node"));

QUnit.module("node");
test("node", function () {
	ok(!!node, "todo"); //todo:test
});

},{"./../../../src/native/node":4}],12:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/*global QUnit,test,ok*/

var string = _interopRequireWildcard(require("./../../../src/native/string"));

//import type from './../../../src/type';

QUnit.module("string");
test("pad", function () {
	var pad = string.pad;
	ok(pad("a", 3, "b") === "abb", "pad");
	ok(pad("a", 3, "bc") === "abc", "pad");
	ok(pad("a", 3, "b", true) === "bba", "pad left");
	ok(pad("aac", 3, "b") === "aac", "pad");
	ok(pad("aaac", 3, "b") === "aaac", "pad");
});
test("toType", function () {
	var toType = string.toType;
	ok(toType("a") === "a", "toType string");
	ok(toType("1") === 1, "toType number");
	ok(toType("0.1") === 0.1, "toType number");
	ok(toType("true") === true, "toType boolean");
});
test("toXML", function () {
	ok(!!string.toXML("<foo bar=\"baz\">qux</foo>"), "toXML");
});
//test('toXMLObj', function() {
//	//console.log('toXML',string.toXML('<foo bar="baz">qux</foo>')); // log)
//	//console.log('toXMLObj',string.toXMLObj('<foo bar="baz">qux</foo>')); // log)
//	ok(string.toXMLObj('<foo bar="baz">qux</foo>').bar==='baz','toXMLObj');
//});
//test('generate', function() {
//	ok(!!string.generate(),'generate');
//});
test("nameCase", function () {
	ok(string.nameCase("foo bar") === "Foo Bar", "nameCase");
});
test("camelCase", function () {
	var camelCase = string.camelCase;
	ok(camelCase("foo bar baz") === "fooBarBaz", "camelCase");
	ok(camelCase("foo-bar-baz") === "fooBarBaz", "camelCase");
	ok(camelCase("foo_bar_baz") === "fooBarBaz", "camelCase");
});
test("dash", function () {
	var dash = string.dash;
	ok(dash("foo bar baz") === "foo-bar-baz", "dash");
	ok(dash("fooBarBaz") === "foo-bar-baz", "dash");
	ok(dash("foo_bar_baz") === "foo-bar-baz", "dash");
});
test("underscore", function () {
	var underscore = string.underscore;
	ok(underscore("foo bar baz") === "foo_bar_baz", "underscore");
	ok(underscore("fooBarBaz") === "foo_bar_baz", "underscore");
	ok(underscore("foo-bar-baz") === "foo_bar_baz", "underscore");
});
test("augment", function () {
	var pad = string.pad;
	ok(pad("a", 3, "b") === "abb", "pad");
	ok(pad("a", 3, "bc") === "abc", "pad");
	ok(pad("a", 3, "b", true) === "bba", "pad left");
	ok(pad("aac", 3, "b") === "aac", "pad");
	ok(pad("aaac", 3, "b") === "aaac", "pad");
});
test("isUrl", function () {
	var isUrl = string.isUrl;
	ok(isUrl("foo bar baz") === false, "not url");
	ok(isUrl("//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css") === true, "CDN url");
	ok(isUrl("https://gmail.com/") === true, "https url");
	ok(isUrl("http://google.com/") === true, "http url");
	ok(isUrl("www.filmacademie.nl") === false, "invalid strict");
	ok(isUrl("www.filmacademie.nl", false) === true, "valid non-strict");
});
test("toSlug", function () {
	var toSlug = string.toSlug;
	ok(toSlug("Foo b�r bAz?") === "foo-bar-baz", "Foo b�r bAz");
});
test("normalize", function () {
	ok(string.camelCase("foo bar baz") === "fooBarBaz", "normalize");
});

},{"./../../../src/native/string":5}],13:[function(require,module,exports){
"use strict";

var _arguments = arguments;

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*global QUnit,test,ok*/

var type = _interopRequire(require("./../../../src/type"));

QUnit.module("type");
test("undefined", ok.bind(null, type(undefined) === type.UNDEFINED, "undefined"));
test("null", ok.bind(null, type(null) === type.NULL, "null"));
test("object", function () {
	ok(type({}) === type.OBJECT, "object");
	ok(type(_arguments) === type.OBJECT, "arguments");
});
test("array", function () {
	ok(type([]) === type.ARRAY, "[]");
	ok(type(new Array()) === type.ARRAY, "new Array");
});
test("node", function () {
	ok(type(document.createElement("a")) === type.NODE, "node");
});
/*test('event',()=>{
	ok(type(new Event('foo'))===type.EVENT,'Event');
	ok(type(new CustomEvent('bar',{}))===type.EVENT,'CustomEvent');
	ok(type(document.createEvent('Event'))===type.EVENT,'document.createEvent');
});*/
test("function", function () {
	ok(type(function () {}) === type.FUNCTION, "function");
});
test("string", function () {
	ok(type("a") === type.STRING, "a");
	ok(type(String()) === type.STRING, "String()");
});
test("boolean", function () {
	ok(type(true) === type.BOOLEAN, "true");
	ok(type(false) === type.BOOLEAN, "false");
});
test("int", function () {
	ok(type(0) === type.INT, "0");
	ok(type(1) === type.INT, "1");
	ok(type(255) === type.INT, "0xFF");
	ok(type(10000) === type.INT, "1E4");
	ok(type(Number.MIN_VALUE) === type.FLOAT, "Number.MIN_VALUE");
	ok(type(Number.MAX_VALUE) === type.INT, "Number.MAX_VALUE");
});
test("float", function () {
	ok(type(1.1) === type.FLOAT, "1.1");
	ok(type(Math.PI) === type.FLOAT, "Math.PI");
	ok(type(0.0001) === type.FLOAT, "1E-4");
});
test("nan", function () {
	ok(type(NaN) === type.NAN, "NaN");
	ok(type(0 / 0) === type.NAN, "0/0");
});
test("infinite", function () {
	ok(type(Infinity) === type.INFINITE, "Infinity");
	ok(type(2 / 0) === type.INFINITE, "2/0");
	ok(type(Number.POSITIVE_INFINITY) === type.INFINITE, "Number.POSITIVE_INFINITY");
	ok(type(Number.NEGATIVE_INFINITY) === type.INFINITE, "Number.NEGATIVE_INFINITY");
});
test("regexp", function () {
	ok(type(/\s/gi) === type.REGEXP, "/\\s/gi");
	ok(type(new RegExp("")) === type.REGEXP, "new RegExp");
});
test("date", function () {
	ok(type(new Date()) === type.DATE, "new Date");
});

},{"./../../../src/type":6}],14:[function(require,module,exports){
(function (global){
"use strict";

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./dist/lodash.js`
 */
;(function () {
  function n(n, t, e) {
    e = (e || 0) - 1;for (var r = n ? n.length : 0; ++e < r;) if (n[e] === t) {
      return e;
    }return -1;
  }function t(t, e) {
    var r = typeof e;if ((t = t.l, "boolean" == r || null == e)) {
      return t[e] ? 0 : -1;
    }"number" != r && "string" != r && (r = "object");var u = "number" == r ? e : m + e;return (t = (t = t[r]) && t[u], "object" == r ? t && -1 < n(t, e) ? 0 : -1 : t ? 0 : -1);
  }function e(n) {
    var t = this.l,
        e = typeof n;if ("boolean" == e || null == n) t[n] = true;else {
      "number" != e && "string" != e && (e = "object");var r = "number" == e ? n : m + n,
          t = t[e] || (t[e] = {});"object" == e ? (t[r] || (t[r] = [])).push(n) : t[r] = true;
    }
  }function r(n) {
    return n.charCodeAt(0);
  }function u(n, t) {
    for (var e = n.m, r = t.m, u = -1, o = e.length; ++u < o;) {
      var i = e[u],
          a = r[u];if (i !== a) {
        if (i > a || typeof i == "undefined") {
          return 1;
        }if (i < a || typeof a == "undefined") {
          return -1;
        }
      }
    }return n.n - t.n;
  }function o(n) {
    var t = -1,
        r = n.length,
        u = n[0],
        o = n[r / 2 | 0],
        i = n[r - 1];if (u && typeof u == "object" && o && typeof o == "object" && i && typeof i == "object") {
      return false;
    }for (u = f(), u["false"] = u["null"] = u["true"] = u.undefined = false, o = f(), o.k = n, o.l = u, o.push = e; ++t < r;) o.push(n[t]);return o;
  }function i(n) {
    return "\\" + U[n];
  }function a() {
    return h.pop() || [];
  }function f() {
    return g.pop() || { k: null, l: null, m: null, "false": false, n: 0, "null": false, number: null, object: null, push: null, string: null, "true": false, undefined: false, o: null };
  }function l(n) {
    n.length = 0, h.length < _ && h.push(n);
  }function c(n) {
    var t = n.l;t && c(t), n.k = n.l = n.m = n.object = n.number = n.string = n.o = null, g.length < _ && g.push(n);
  }function p(n, t, e) {
    t || (t = 0), typeof e == "undefined" && (e = n ? n.length : 0);var r = -1;e = e - t || 0;for (var u = Array(0 > e ? 0 : e); ++r < e;) u[r] = n[t + r];return u;
  }function s(e) {
    function h(n, t, e) {
      if (!n || !V[typeof n]) {
        return n;
      }t = t && typeof e == "undefined" ? t : tt(t, e, 3);for (var r = -1, u = V[typeof n] && Fe(n), o = u ? u.length : 0; ++r < o && (e = u[r], false !== t(n[e], e, n)););return n;
    }function g(n, t, e) {
      var r;if (!n || !V[typeof n]) {
        return n;
      }t = t && typeof e == "undefined" ? t : tt(t, e, 3);for (r in n) if (false === t(n[r], r, n)) break;return n;
    }function _(n, t, e) {
      var r,
          u = n,
          o = u;if (!u) {
        return o;
      }for (var i = arguments, a = 0, f = typeof e == "number" ? 2 : i.length; ++a < f;) if ((u = i[a]) && V[typeof u]) for (var l = -1, c = V[typeof u] && Fe(u), p = c ? c.length : 0; ++l < p;) r = c[l], "undefined" == typeof o[r] && (o[r] = u[r]);
      return o;
    }function U(n, t, e) {
      var r,
          u = n,
          o = u;if (!u) {
        return o;
      }var i = arguments,
          a = 0,
          f = typeof e == "number" ? 2 : i.length;if (3 < f && "function" == typeof i[f - 2]) var l = tt(i[--f - 1], i[f--], 2);else 2 < f && "function" == typeof i[f - 1] && (l = i[--f]);for (; ++a < f;) if ((u = i[a]) && V[typeof u]) for (var c = -1, p = V[typeof u] && Fe(u), s = p ? p.length : 0; ++c < s;) r = p[c], o[r] = l ? l(o[r], u[r]) : u[r];return o;
    }function H(n) {
      var t,
          e = [];if (!n || !V[typeof n]) {
        return e;
      }for (t in n) me.call(n, t) && e.push(t);return e;
    }function J(n) {
      return n && typeof n == "object" && !Te(n) && me.call(n, "__wrapped__") ? n : new Q(n);
    }function Q(n, t) {
      this.__chain__ = !!t, this.__wrapped__ = n;
    }function X(n) {
      function t() {
        if (r) {
          var n = p(r);be.apply(n, arguments);
        }if (this instanceof t) {
          var o = nt(e.prototype),
              n = e.apply(o, n || arguments);return wt(n) ? n : o;
        }return e.apply(u, n || arguments);
      }var e = n[0],
          r = n[2],
          u = n[4];return ($e(t, n), t);
    }function Z(n, t, e, r, u) {
      if (e) {
        var o = e(n);if (typeof o != "undefined") {
          return o;
        }
      }if (!wt(n)) {
        return n;
      }var i = ce.call(n);if (!K[i]) {
        return n;
      }var f = Ae[i];switch (i) {case T:case F:
          return new f(+n);case W:case P:
          return new f(n);case z:
          return (o = f(n.source, C.exec(n)), o.lastIndex = n.lastIndex, o);
      }if ((i = Te(n), t)) {
        var c = !r;r || (r = a()), u || (u = a());for (var s = r.length; s--;) if (r[s] == n) {
          return u[s];
        }o = i ? f(n.length) : {};
      } else o = i ? p(n) : U({}, n);return (i && (me.call(n, "index") && (o.index = n.index), me.call(n, "input") && (o.input = n.input)), t ? (r.push(n), u.push(o), (i ? St : h)(n, function (n, i) {
        o[i] = Z(n, t, e, r, u);
      }), c && (l(r), l(u)), o) : o);
    }function nt(n) {
      return wt(n) ? ke(n) : {};
    }function tt(n, t, e) {
      if (typeof n != "function") {
        return Ut;
      }if (typeof t == "undefined" || !("prototype" in n)) {
        return n;
      }var r = n.__bindData__;if (typeof r == "undefined" && (De.funcNames && (r = !n.name), r = r || !De.funcDecomp, !r)) {
        var u = ge.call(n);
        De.funcNames || (r = !O.test(u)), r || (r = E.test(u), $e(n, r));
      }if (false === r || true !== r && 1 & r[1]) {
        return n;
      }switch (e) {case 1:
          return function (e) {
            return n.call(t, e);
          };case 2:
          return function (e, r) {
            return n.call(t, e, r);
          };case 3:
          return function (e, r, u) {
            return n.call(t, e, r, u);
          };case 4:
          return function (e, r, u, o) {
            return n.call(t, e, r, u, o);
          };}return Mt(n, t);
    }function et(n) {
      function t() {
        var n = f ? i : this;if (u) {
          var h = p(u);be.apply(h, arguments);
        }return (o || c) && (h || (h = p(arguments)), o && be.apply(h, o), c && h.length < a) ? (r |= 16, et([e, s ? r : -4 & r, h, null, i, a])) : (h || (h = arguments), l && (e = n[v]), this instanceof t ? (n = nt(e.prototype), h = e.apply(n, h), wt(h) ? h : n) : e.apply(n, h));
      }var e = n[0],
          r = n[1],
          u = n[2],
          o = n[3],
          i = n[4],
          a = n[5],
          f = 1 & r,
          l = 2 & r,
          c = 4 & r,
          s = 8 & r,
          v = e;return ($e(t, n), t);
    }function rt(e, r) {
      var u = -1,
          i = st(),
          a = e ? e.length : 0,
          f = a >= b && i === n,
          l = [];if (f) {
        var p = o(r);p ? (i = t, r = p) : f = false;
      }for (; ++u < a;) p = e[u], 0 > i(r, p) && l.push(p);return (f && c(r), l);
    }function ut(n, t, e, r) {
      r = (r || 0) - 1;for (var u = n ? n.length : 0, o = []; ++r < u;) {
        var i = n[r];if (i && typeof i == "object" && typeof i.length == "number" && (Te(i) || yt(i))) {
          t || (i = ut(i, t, e));var a = -1,
              f = i.length,
              l = o.length;for (o.length += f; ++a < f;) o[l++] = i[a];
        } else e || o.push(i);
      }return o;
    }function ot(_x, _x2, _x3, _x4, _x5, _x6) {
      var _again = true;

      _function: while (_again) {
        _again = false;
        var n = _x,
            t = _x2,
            e = _x3,
            r = _x4,
            u = _x5,
            o = _x6;
        i = f = c = p = s = v = i = undefined;
        if (e) {
          var i = e(n, t);if (typeof i != "undefined") {
            return !!i;
          }
        }if (n === t) {
          return 0 !== n || 1 / n == 1 / t;
        }if (n === n && !(n && V[typeof n] || t && V[typeof t])) {
          return false;
        }if (null == n || null == t) {
          return n === t;
        }var f = ce.call(n),
            c = ce.call(t);if ((f == D && (f = q), c == D && (c = q), f != c)) {
          return false;
        }switch (f) {case T:case F:
            return +n == +t;case W:
            return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;case z:case P:
            return n == oe(t);}if ((c = f == $, !c)) {
          var p = me.call(n, "__wrapped__"),
              s = me.call(t, "__wrapped__");if (p || s) {
            _x = p ? n.__wrapped__ : n;
            _x2 = s ? t.__wrapped__ : t;
            _x3 = e;
            _x4 = r;
            _x5 = u;
            _x6 = o;
            _again = true;
            continue _function;
          }
          if (f != q) {
            return false;
          }if ((f = n.constructor, p = t.constructor, f != p && !(dt(f) && f instanceof f && dt(p) && p instanceof p) && "constructor" in n && "constructor" in t)) {
            return false;
          }
        }for (f = !u, u || (u = a()), o || (o = a()), p = u.length; p--;) if (u[p] == n) {
          return o[p] == t;
        }var v = 0,
            i = true;if ((u.push(n), o.push(t), c)) {
          if ((p = n.length, v = t.length, (i = v == p) || r)) for (; v--;) if ((c = p, s = t[v], r)) for (; c-- && !(i = ot(n[c], s, e, r, u, o)););else if (!(i = ot(n[v], s, e, r, u, o))) break;
        } else g(t, function (t, a, f) {
          return me.call(f, a) ? (v++, i = me.call(n, a) && ot(n[a], t, e, r, u, o)) : void 0;
        }), i && !r && g(n, function (n, t, e) {
          return me.call(e, t) ? i = -1 < --v : void 0;
        });return (u.pop(), o.pop(), f && (l(u), l(o)), i);
      }
    }function it(n, t, e, r, u) {
      (Te(t) ? St : h)(t, function (t, o) {
        var i,
            a,
            f = t,
            l = n[o];if (t && ((a = Te(t)) || Pe(t))) {
          for (f = r.length; f--;) if (i = r[f] == t) {
            l = u[f];break;
          }if (!i) {
            var c;e && (f = e(l, t), c = typeof f != "undefined") && (l = f), c || (l = a ? Te(l) ? l : [] : Pe(l) ? l : {}), r.push(t), u.push(l), c || it(l, t, e, r, u);
          }
        } else e && (f = e(l, t), typeof f == "undefined" && (f = t)), typeof f != "undefined" && (l = f);n[o] = l;
      });
    }function at(n, t) {
      return n + he(Re() * (t - n + 1));
    }function ft(e, r, u) {
      var i = -1,
          f = st(),
          p = e ? e.length : 0,
          s = [],
          v = !r && p >= b && f === n,
          h = u || v ? a() : s;
      for (v && (h = o(h), f = t); ++i < p;) {
        var g = e[i],
            y = u ? u(g, i, e) : g;(r ? !i || h[h.length - 1] !== y : 0 > f(h, y)) && ((u || v) && h.push(y), s.push(g));
      }return (v ? (l(h.k), c(h)) : u && l(h), s);
    }function lt(n) {
      return function (t, e, r) {
        var u = {};e = J.createCallback(e, r, 3), r = -1;var o = t ? t.length : 0;if (typeof o == "number") for (; ++r < o;) {
          var i = t[r];n(u, i, e(i, r, t), t);
        } else h(t, function (t, r, o) {
          n(u, t, e(t, r, o), o);
        });return u;
      };
    }function ct(_x, _x2, _x3, _x4, _x5, _x6) {
      var _arguments;

      var _again = true;

      _function: while (_again) {
        _again = false;
        var n = _x,
            t = _x2,
            e = _x3,
            r = _x4,
            u = _x5,
            o = _x6;
        i = a = f = l = c = undefined;
        var i = 1 & t,
            a = 4 & t,
            f = 16 & t,
            l = 32 & t;if (!(2 & t || dt(n))) throw new ie();f && !e.length && (t &= -17, f = e = false), l && !r.length && (t &= -33, l = r = false);
        var c = n && n.__bindData__;if (c && true !== c) {
          c = p(c), c[2] && (c[2] = p(c[2])), c[3] && (c[3] = p(c[3])), !i || 1 & c[1] || (c[4] = u), !i && 1 & c[1] && (t |= 8), !a || 4 & c[1] || (c[5] = o), f && be.apply(c[2] || (c[2] = []), e), l && we.apply(c[3] || (c[3] = []), r), c[1] |= t;
          _arguments = c;
          _x = _arguments[0];
          _x2 = _arguments[1];
          _x3 = _arguments[2];
          _x4 = _arguments[3];
          _x5 = _arguments[4];
          _x6 = _arguments[5];
          _again = true;
          continue _function;
        } else {
          return (1 == t || 17 === t ? X : et)([n, t, e, r, u, o]);
        }
      }
    }function pt(n) {
      return Be[n];
    }function st() {
      var t = (t = J.indexOf) === Wt ? n : t;return t;
    }function vt(n) {
      return typeof n == "function" && pe.test(n);
    }function ht(n) {
      var t, e;return n && ce.call(n) == q && (t = n.constructor, !dt(t) || t instanceof t) ? (g(n, function (n, t) {
        e = t;
      }), typeof e == "undefined" || me.call(n, e)) : false;
    }function gt(n) {
      return We[n];
    }function yt(n) {
      return n && typeof n == "object" && typeof n.length == "number" && ce.call(n) == D || false;
    }function mt(n, t, e) {
      var r = Fe(n),
          u = r.length;for (t = tt(t, e, 3); u-- && (e = r[u], false !== t(n[e], e, n)););return n;
    }function bt(n) {
      var t = [];return (g(n, function (n, e) {
        dt(n) && t.push(e);
      }), t.sort());
    }function _t(n) {
      for (var t = -1, e = Fe(n), r = e.length, u = {}; ++t < r;) {
        var o = e[t];u[n[o]] = o;
      }return u;
    }function dt(n) {
      return typeof n == "function";
    }function wt(n) {
      return !(!n || !V[typeof n]);
    }function jt(n) {
      return typeof n == "number" || n && typeof n == "object" && ce.call(n) == W || false;
    }function kt(n) {
      return typeof n == "string" || n && typeof n == "object" && ce.call(n) == P || false;
    }function xt(n) {
      for (var t = -1, e = Fe(n), r = e.length, u = Xt(r); ++t < r;) u[t] = n[e[t]];return u;
    }function Ct(n, t, e) {
      var r = -1,
          u = st(),
          o = n ? n.length : 0,
          i = false;return (e = (0 > e ? Ie(0, o + e) : e) || 0, Te(n) ? i = -1 < u(n, t, e) : typeof o == "number" ? i = -1 < (kt(n) ? n.indexOf(t, e) : u(n, t, e)) : h(n, function (n) {
        return ++r < e ? void 0 : !(i = n === t);
      }), i);
    }function Ot(n, t, e) {
      var r = true;t = J.createCallback(t, e, 3), e = -1;
      var u = n ? n.length : 0;if (typeof u == "number") for (; ++e < u && (r = !!t(n[e], e, n)););else h(n, function (n, e, u) {
        return r = !!t(n, e, u);
      });return r;
    }function Nt(n, t, e) {
      var r = [];t = J.createCallback(t, e, 3), e = -1;var u = n ? n.length : 0;if (typeof u == "number") for (; ++e < u;) {
        var o = n[e];t(o, e, n) && r.push(o);
      } else h(n, function (n, e, u) {
        t(n, e, u) && r.push(n);
      });return r;
    }function It(n, t, e) {
      t = J.createCallback(t, e, 3), e = -1;var r = n ? n.length : 0;if (typeof r != "number") {
        var u;return (h(n, function (n, e, r) {
          return t(n, e, r) ? (u = n, false) : void 0;
        }), u);
      }for (; ++e < r;) {
        var o = n[e];
        if (t(o, e, n)) {
          return o;
        }
      }
    }function St(n, t, e) {
      var r = -1,
          u = n ? n.length : 0;if ((t = t && typeof e == "undefined" ? t : tt(t, e, 3), typeof u == "number")) for (; ++r < u && false !== t(n[r], r, n););else h(n, t);return n;
    }function Et(n, t, e) {
      var r = n ? n.length : 0;if ((t = t && typeof e == "undefined" ? t : tt(t, e, 3), typeof r == "number")) for (; r-- && false !== t(n[r], r, n););else {
        var u = Fe(n),
            r = u.length;h(n, function (n, e, o) {
          return (e = u ? u[--r] : --r, t(o[e], e, o));
        });
      }return n;
    }function Rt(n, t, e) {
      var r = -1,
          u = n ? n.length : 0;if ((t = J.createCallback(t, e, 3), typeof u == "number")) for (var o = Xt(u); ++r < u;) o[r] = t(n[r], r, n);else o = [], h(n, function (n, e, u) {
        o[++r] = t(n, e, u);
      });return o;
    }function At(n, t, e) {
      var u = -1 / 0,
          o = u;if ((typeof t != "function" && e && e[t] === n && (t = null), null == t && Te(n))) {
        e = -1;for (var i = n.length; ++e < i;) {
          var a = n[e];a > o && (o = a);
        }
      } else t = null == t && kt(n) ? r : J.createCallback(t, e, 3), St(n, function (n, e, r) {
        e = t(n, e, r), e > u && (u = e, o = n);
      });return o;
    }function Dt(n, t, e, r) {
      if (!n) {
        return e;
      }var u = 3 > arguments.length;t = J.createCallback(t, r, 4);var o = -1,
          i = n.length;if (typeof i == "number") for (u && (e = n[++o]); ++o < i;) e = t(e, n[o], o, n);else h(n, function (n, r, o) {
        e = u ? (u = false, n) : t(e, n, r, o);
      });return e;
    }function $t(n, t, e, r) {
      var u = 3 > arguments.length;return (t = J.createCallback(t, r, 4), Et(n, function (n, r, o) {
        e = u ? (u = false, n) : t(e, n, r, o);
      }), e);
    }function Tt(n) {
      var t = -1,
          e = n ? n.length : 0,
          r = Xt(typeof e == "number" ? e : 0);return (St(n, function (n) {
        var e = at(0, ++t);r[t] = r[e], r[e] = n;
      }), r);
    }function Ft(n, t, e) {
      var r;t = J.createCallback(t, e, 3), e = -1;var u = n ? n.length : 0;if (typeof u == "number") for (; ++e < u && !(r = t(n[e], e, n)););else h(n, function (n, e, u) {
        return !(r = t(n, e, u));
      });return !!r;
    }function Bt(n, t, e) {
      var r = 0,
          u = n ? n.length : 0;if (typeof t != "number" && null != t) {
        var o = -1;
        for (t = J.createCallback(t, e, 3); ++o < u && t(n[o], o, n);) r++;
      } else if ((r = t, null == r || e)) {
        return n ? n[0] : v;
      }return p(n, 0, Se(Ie(0, r), u));
    }function Wt(t, e, r) {
      if (typeof r == "number") {
        var u = t ? t.length : 0;r = 0 > r ? Ie(0, u + r) : r || 0;
      } else if (r) {
        return (r = zt(t, e), t[r] === e ? r : -1);
      }return n(t, e, r);
    }function qt(n, t, e) {
      if (typeof t != "number" && null != t) {
        var r = 0,
            u = -1,
            o = n ? n.length : 0;for (t = J.createCallback(t, e, 3); ++u < o && t(n[u], u, n);) r++;
      } else r = null == t || e ? 1 : Ie(0, t);return p(n, r);
    }function zt(n, t, e, r) {
      var u = 0,
          o = n ? n.length : u;for (e = e ? J.createCallback(e, r, 1) : Ut, t = e(t); u < o;) r = u + o >>> 1, e(n[r]) < t ? u = r + 1 : o = r;
      return u;
    }function Pt(n, t, e, r) {
      return (typeof t != "boolean" && null != t && (r = e, e = typeof t != "function" && r && r[t] === n ? null : t, t = false), null != e && (e = J.createCallback(e, r, 3)), ft(n, t, e));
    }function Kt() {
      for (var n = 1 < arguments.length ? arguments : arguments[0], t = -1, e = n ? At(Ve(n, "length")) : 0, r = Xt(0 > e ? 0 : e); ++t < e;) r[t] = Ve(n, t);return r;
    }function Lt(n, t) {
      var e = -1,
          r = n ? n.length : 0,
          u = {};for (t || !r || Te(n[0]) || (t = []); ++e < r;) {
        var o = n[e];t ? u[o] = t[e] : o && (u[o[0]] = o[1]);
      }return u;
    }function Mt(n, t) {
      return 2 < arguments.length ? ct(n, 17, p(arguments, 2), null, t) : ct(n, 1, null, null, t);
    }function Vt(n, t, e) {
      function r() {
        c && ve(c), i = c = p = v, (g || h !== t) && (s = Ue(), a = n.apply(l, o), c || i || (o = l = null));
      }function u() {
        var e = t - (Ue() - f);0 < e ? c = _e(u, e) : (i && ve(i), e = p, i = c = p = v, e && (s = Ue(), a = n.apply(l, o), c || i || (o = l = null)));
      }var o,
          i,
          a,
          f,
          l,
          c,
          p,
          s = 0,
          h = false,
          g = true;if (!dt(n)) throw new ie();if ((t = Ie(0, t) || 0, true === e)) var y = true,
          g = false;else wt(e) && (y = e.leading, h = "maxWait" in e && (Ie(t, e.maxWait) || 0), g = "trailing" in e ? e.trailing : g);return function () {
        if ((o = arguments, f = Ue(), l = this, p = g && (c || !y), false === h)) var e = y && !c;else {
          i || y || (s = f);var v = h - (f - s),
              m = 0 >= v;
          m ? (i && (i = ve(i)), s = f, a = n.apply(l, o)) : i || (i = _e(r, v));
        }return (m && c ? c = ve(c) : c || t === h || (c = _e(u, t)), e && (m = true, a = n.apply(l, o)), !m || c || i || (o = l = null), a);
      };
    }function Ut(n) {
      return n;
    }function Gt(n, t, e) {
      var r = true,
          u = t && bt(t);t && (e || u.length) || (null == e && (e = t), o = Q, t = n, n = J, u = bt(t)), false === e ? r = false : wt(e) && "chain" in e && (r = e.chain);var o = n,
          i = dt(o);St(u, function (e) {
        var u = n[e] = t[e];i && (o.prototype[e] = function () {
          var t = this.__chain__,
              e = this.__wrapped__,
              i = [e];if ((be.apply(i, arguments), i = u.apply(n, i), r || t)) {
            if (e === i && wt(i)) return this;
            i = new o(i), i.__chain__ = t;
          }return i;
        });
      });
    }function Ht() {}function Jt(n) {
      return function (t) {
        return t[n];
      };
    }function Qt() {
      return this.__wrapped__;
    }e = e ? Y.defaults(G.Object(), e, Y.pick(G, A)) : G;var Xt = e.Array,
        Yt = e.Boolean,
        Zt = e.Date,
        ne = e.Function,
        te = e.Math,
        ee = e.Number,
        re = e.Object,
        ue = e.RegExp,
        oe = e.String,
        ie = e.TypeError,
        ae = [],
        fe = re.prototype,
        le = e._,
        ce = fe.toString,
        pe = ue("^" + oe(ce).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
        se = te.ceil,
        ve = e.clearTimeout,
        he = te.floor,
        ge = ne.prototype.toString,
        ye = vt(ye = re.getPrototypeOf) && ye,
        me = fe.hasOwnProperty,
        be = ae.push,
        _e = e.setTimeout,
        de = ae.splice,
        we = ae.unshift,
        je = (function () {
      try {
        var n = {},
            t = vt(t = re.defineProperty) && t,
            e = t(n, n, n) && t;
      } catch (r) {}return e;
    })(),
        ke = vt(ke = re.create) && ke,
        xe = vt(xe = Xt.isArray) && xe,
        Ce = e.isFinite,
        Oe = e.isNaN,
        Ne = vt(Ne = re.keys) && Ne,
        Ie = te.max,
        Se = te.min,
        Ee = e.parseInt,
        Re = te.random,
        Ae = {};Ae[$] = Xt, Ae[T] = Yt, Ae[F] = Zt, Ae[B] = ne, Ae[q] = re, Ae[W] = ee, Ae[z] = ue, Ae[P] = oe, Q.prototype = J.prototype;var De = J.support = {};De.funcDecomp = !vt(e.a) && E.test(s), De.funcNames = typeof ne.name == "string", J.templateSettings = { escape: /<%-([\s\S]+?)%>/g, evaluate: /<%([\s\S]+?)%>/g, interpolate: N, variable: "", imports: { _: J } }, ke || (nt = (function () {
      function n() {}return function (t) {
        if (wt(t)) {
          n.prototype = t;
          var r = new n();n.prototype = null;
        }return r || e.Object();
      };
    })());var $e = je ? function (n, t) {
      M.value = t, je(n, "__bindData__", M);
    } : Ht,
        Te = xe || function (n) {
      return n && typeof n == "object" && typeof n.length == "number" && ce.call(n) == $ || false;
    },
        Fe = Ne ? function (n) {
      return wt(n) ? Ne(n) : [];
    } : H,
        Be = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" },
        We = _t(Be),
        qe = ue("(" + Fe(We).join("|") + ")", "g"),
        ze = ue("[" + Fe(Be).join("") + "]", "g"),
        Pe = ye ? function (n) {
      if (!n || ce.call(n) != q) return false;var t = n.valueOf,
          e = vt(t) && (e = ye(t)) && ye(e);return e ? n == e || ye(n) == e : ht(n);
    } : ht,
        Ke = lt(function (n, t, e) {
      me.call(n, e) ? n[e]++ : n[e] = 1;
    }),
        Le = lt(function (n, t, e) {
      (me.call(n, e) ? n[e] : n[e] = []).push(t);
    }),
        Me = lt(function (n, t, e) {
      n[e] = t;
    }),
        Ve = Rt,
        Ue = vt(Ue = Zt.now) && Ue || function () {
      return new Zt().getTime();
    },
        Ge = 8 == Ee(d + "08") ? Ee : function (n, t) {
      return Ee(kt(n) ? n.replace(I, "") : n, t || 0);
    };return (J.after = function (n, t) {
      if (!dt(t)) throw new ie();return function () {
        return 1 > --n ? t.apply(this, arguments) : void 0;
      };
    }, J.assign = U, J.at = function (n) {
      for (var t = arguments, e = -1, r = ut(t, true, false, 1), t = t[2] && t[2][t[1]] === n ? 1 : r.length, u = Xt(t); ++e < t;) u[e] = n[r[e]];
      return u;
    }, J.bind = Mt, J.bindAll = function (n) {
      for (var t = 1 < arguments.length ? ut(arguments, true, false, 1) : bt(n), e = -1, r = t.length; ++e < r;) {
        var u = t[e];n[u] = ct(n[u], 1, null, null, n);
      }return n;
    }, J.bindKey = function (n, t) {
      return 2 < arguments.length ? ct(t, 19, p(arguments, 2), null, n) : ct(t, 3, null, null, n);
    }, J.chain = function (n) {
      return (n = new Q(n), n.__chain__ = true, n);
    }, J.compact = function (n) {
      for (var t = -1, e = n ? n.length : 0, r = []; ++t < e;) {
        var u = n[t];u && r.push(u);
      }return r;
    }, J.compose = function () {
      for (var n = arguments, t = n.length; t--;) if (!dt(n[t])) throw new ie();
      return function () {
        for (var t = arguments, e = n.length; e--;) t = [n[e].apply(this, t)];return t[0];
      };
    }, J.constant = function (n) {
      return function () {
        return n;
      };
    }, J.countBy = Ke, J.create = function (n, t) {
      var e = nt(n);return t ? U(e, t) : e;
    }, J.createCallback = function (n, t, e) {
      var r = typeof n;if (null == n || "function" == r) return tt(n, t, e);if ("object" != r) return Jt(n);var u = Fe(n),
          o = u[0],
          i = n[o];return 1 != u.length || i !== i || wt(i) ? function (t) {
        for (var e = u.length, r = false; e-- && (r = ot(t[u[e]], n[u[e]], null, true)););return r;
      } : function (n) {
        return (n = n[o], i === n && (0 !== i || 1 / i == 1 / n));
      };
    }, J.curry = function (n, t) {
      return (t = typeof t == "number" ? t : +t || n.length, ct(n, 4, null, null, null, t));
    }, J.debounce = Vt, J.defaults = _, J.defer = function (n) {
      if (!dt(n)) throw new ie();var t = p(arguments, 1);return _e(function () {
        n.apply(v, t);
      }, 1);
    }, J.delay = function (n, t) {
      if (!dt(n)) throw new ie();var e = p(arguments, 2);return _e(function () {
        n.apply(v, e);
      }, t);
    }, J.difference = function (n) {
      return rt(n, ut(arguments, true, true, 1));
    }, J.filter = Nt, J.flatten = function (n, t, e, r) {
      return (typeof t != "boolean" && null != t && (r = e, e = typeof t != "function" && r && r[t] === n ? null : t, t = false), null != e && (n = Rt(n, e, r)), ut(n, t));
    }, J.forEach = St, J.forEachRight = Et, J.forIn = g, J.forInRight = function (n, t, e) {
      var r = [];g(n, function (n, t) {
        r.push(t, n);
      });var u = r.length;for (t = tt(t, e, 3); u-- && false !== t(r[u--], r[u], n););return n;
    }, J.forOwn = h, J.forOwnRight = mt, J.functions = bt, J.groupBy = Le, J.indexBy = Me, J.initial = function (n, t, e) {
      var r = 0,
          u = n ? n.length : 0;if (typeof t != "number" && null != t) {
        var o = u;for (t = J.createCallback(t, e, 3); o-- && t(n[o], o, n);) r++;
      } else r = null == t || e ? 1 : t || r;return p(n, 0, Se(Ie(0, u - r), u));
    }, J.intersection = function () {
      for (var e = [], r = -1, u = arguments.length, i = a(), f = st(), p = f === n, s = a(); ++r < u;) {
        var v = arguments[r];
        (Te(v) || yt(v)) && (e.push(v), i.push(p && v.length >= b && o(r ? e[r] : s)));
      }var p = e[0],
          h = -1,
          g = p ? p.length : 0,
          y = [];n: for (; ++h < g;) {
        var m = i[0],
            v = p[h];if (0 > (m ? t(m, v) : f(s, v))) {
          for (r = u, (m || s).push(v); --r;) if ((m = i[r], 0 > (m ? t(m, v) : f(e[r], v)))) continue n;y.push(v);
        }
      }for (; u--;) (m = i[u]) && c(m);return (l(i), l(s), y);
    }, J.invert = _t, J.invoke = function (n, t) {
      var e = p(arguments, 2),
          r = -1,
          u = typeof t == "function",
          o = n ? n.length : 0,
          i = Xt(typeof o == "number" ? o : 0);return (St(n, function (n) {
        i[++r] = (u ? t : n[t]).apply(n, e);
      }), i);
    }, J.keys = Fe, J.map = Rt, J.mapValues = function (n, t, e) {
      var r = {};
      return (t = J.createCallback(t, e, 3), h(n, function (n, e, u) {
        r[e] = t(n, e, u);
      }), r);
    }, J.max = At, J.memoize = function (n, t) {
      function e() {
        var r = e.cache,
            u = t ? t.apply(this, arguments) : m + arguments[0];return me.call(r, u) ? r[u] : r[u] = n.apply(this, arguments);
      }if (!dt(n)) throw new ie();return (e.cache = {}, e);
    }, J.merge = function (n) {
      var t = arguments,
          e = 2;if (!wt(n)) return n;if (("number" != typeof t[2] && (e = t.length), 3 < e && "function" == typeof t[e - 2])) var r = tt(t[--e - 1], t[e--], 2);else 2 < e && "function" == typeof t[e - 1] && (r = t[--e]);for (var t = p(arguments, 1, e), u = -1, o = a(), i = a(); ++u < e;) it(n, t[u], r, o, i);
      return (l(o), l(i), n);
    }, J.min = function (n, t, e) {
      var u = 1 / 0,
          o = u;if ((typeof t != "function" && e && e[t] === n && (t = null), null == t && Te(n))) {
        e = -1;for (var i = n.length; ++e < i;) {
          var a = n[e];a < o && (o = a);
        }
      } else t = null == t && kt(n) ? r : J.createCallback(t, e, 3), St(n, function (n, e, r) {
        e = t(n, e, r), e < u && (u = e, o = n);
      });return o;
    }, J.omit = function (n, t, e) {
      var r = {};if (typeof t != "function") {
        var u = [];g(n, function (n, t) {
          u.push(t);
        });for (var u = rt(u, ut(arguments, true, false, 1)), o = -1, i = u.length; ++o < i;) {
          var a = u[o];r[a] = n[a];
        }
      } else t = J.createCallback(t, e, 3), g(n, function (n, e, u) {
        t(n, e, u) || (r[e] = n);
      });return r;
    }, J.once = function (n) {
      var t, e;if (!dt(n)) throw new ie();return function () {
        return t ? e : (t = true, e = n.apply(this, arguments), n = null, e);
      };
    }, J.pairs = function (n) {
      for (var t = -1, e = Fe(n), r = e.length, u = Xt(r); ++t < r;) {
        var o = e[t];u[t] = [o, n[o]];
      }return u;
    }, J.partial = function (n) {
      return ct(n, 16, p(arguments, 1));
    }, J.partialRight = function (n) {
      return ct(n, 32, null, p(arguments, 1));
    }, J.pick = function (n, t, e) {
      var r = {};if (typeof t != "function") for (var u = -1, o = ut(arguments, true, false, 1), i = wt(n) ? o.length : 0; ++u < i;) {
        var a = o[u];a in n && (r[a] = n[a]);
      } else t = J.createCallback(t, e, 3), g(n, function (n, e, u) {
        t(n, e, u) && (r[e] = n);
      });return r;
    }, J.pluck = Ve, J.property = Jt, J.pull = function (n) {
      for (var t = arguments, e = 0, r = t.length, u = n ? n.length : 0; ++e < r;) for (var o = -1, i = t[e]; ++o < u;) n[o] === i && (de.call(n, o--, 1), u--);return n;
    }, J.range = function (n, t, e) {
      n = +n || 0, e = typeof e == "number" ? e : +e || 1, null == t && (t = n, n = 0);var r = -1;t = Ie(0, se((t - n) / (e || 1)));for (var u = Xt(t); ++r < t;) u[r] = n, n += e;return u;
    }, J.reject = function (n, t, e) {
      return (t = J.createCallback(t, e, 3), Nt(n, function (n, e, r) {
        return !t(n, e, r);
      }));
    }, J.remove = function (n, t, e) {
      var r = -1,
          u = n ? n.length : 0,
          o = [];for (t = J.createCallback(t, e, 3); ++r < u;) e = n[r], t(e, r, n) && (o.push(e), de.call(n, r--, 1), u--);return o;
    }, J.rest = qt, J.shuffle = Tt, J.sortBy = function (n, t, e) {
      var r = -1,
          o = Te(t),
          i = n ? n.length : 0,
          p = Xt(typeof i == "number" ? i : 0);for (o || (t = J.createCallback(t, e, 3)), St(n, function (n, e, u) {
        var i = p[++r] = f();o ? i.m = Rt(t, function (t) {
          return n[t];
        }) : (i.m = a())[0] = t(n, e, u), i.n = r, i.o = n;
      }), i = p.length, p.sort(u); i--;) n = p[i], p[i] = n.o, o || l(n.m), c(n);return p;
    }, J.tap = function (n, t) {
      return (t(n), n);
    }, J.throttle = function (n, t, e) {
      var r = true,
          u = true;if (!dt(n)) throw new ie();return (false === e ? r = false : wt(e) && (r = "leading" in e ? e.leading : r, u = "trailing" in e ? e.trailing : u), L.leading = r, L.maxWait = t, L.trailing = u, Vt(n, t, L));
    }, J.times = function (n, t, e) {
      n = -1 < (n = +n) ? n : 0;var r = -1,
          u = Xt(n);for (t = tt(t, e, 1); ++r < n;) u[r] = t(r);return u;
    }, J.toArray = function (n) {
      return n && typeof n.length == "number" ? p(n) : xt(n);
    }, J.transform = function (n, t, e, r) {
      var u = Te(n);if (null == e) if (u) e = [];else {
        var o = n && n.constructor;e = nt(o && o.prototype);
      }return (t && (t = J.createCallback(t, r, 4), (u ? St : h)(n, function (n, r, u) {
        return t(e, n, r, u);
      })), e);
    }, J.union = function () {
      return ft(ut(arguments, true, true));
    }, J.uniq = Pt, J.values = xt, J.where = Nt, J.without = function (n) {
      return rt(n, p(arguments, 1));
    }, J.wrap = function (n, t) {
      return ct(t, 16, [n]);
    }, J.xor = function () {
      for (var n = -1, t = arguments.length; ++n < t;) {
        var e = arguments[n];if (Te(e) || yt(e)) var r = r ? ft(rt(r, e).concat(rt(e, r))) : e;
      }return r || [];
    }, J.zip = Kt, J.zipObject = Lt, J.collect = Rt, J.drop = qt, J.each = St, J.eachRight = Et, J.extend = U, J.methods = bt, J.object = Lt, J.select = Nt, J.tail = qt, J.unique = Pt, J.unzip = Kt, Gt(J), J.clone = function (n, t, e, r) {
      return (typeof t != "boolean" && null != t && (r = e, e = t, t = false), Z(n, t, typeof e == "function" && tt(e, r, 1)));
    }, J.cloneDeep = function (n, t, e) {
      return Z(n, true, typeof t == "function" && tt(t, e, 1));
    }, J.contains = Ct, J.escape = function (n) {
      return null == n ? "" : oe(n).replace(ze, pt);
    }, J.every = Ot, J.find = It, J.findIndex = function (n, t, e) {
      var r = -1,
          u = n ? n.length : 0;for (t = J.createCallback(t, e, 3); ++r < u;) if (t(n[r], r, n)) return r;return -1;
    }, J.findKey = function (n, t, e) {
      var r;return (t = J.createCallback(t, e, 3), h(n, function (n, e, u) {
        return t(n, e, u) ? (r = e, false) : void 0;
      }), r);
    }, J.findLast = function (n, t, e) {
      var r;return (t = J.createCallback(t, e, 3), Et(n, function (n, e, u) {
        return t(n, e, u) ? (r = n, false) : void 0;
      }), r);
    }, J.findLastIndex = function (n, t, e) {
      var r = n ? n.length : 0;for (t = J.createCallback(t, e, 3); r--;) if (t(n[r], r, n)) return r;return -1;
    }, J.findLastKey = function (n, t, e) {
      var r;return (t = J.createCallback(t, e, 3), mt(n, function (n, e, u) {
        return t(n, e, u) ? (r = e, false) : void 0;
      }), r);
    }, J.has = function (n, t) {
      return n ? me.call(n, t) : false;
    }, J.identity = Ut, J.indexOf = Wt, J.isArguments = yt, J.isArray = Te, J.isBoolean = function (n) {
      return true === n || false === n || n && typeof n == "object" && ce.call(n) == T || false;
    }, J.isDate = function (n) {
      return n && typeof n == "object" && ce.call(n) == F || false;
    }, J.isElement = function (n) {
      return n && 1 === n.nodeType || false;
    }, J.isEmpty = function (n) {
      var t = true;if (!n) return t;var e = ce.call(n),
          r = n.length;return e == $ || e == P || e == D || e == q && typeof r == "number" && dt(n.splice) ? !r : (h(n, function () {
        return t = false;
      }), t);
    }, J.isEqual = function (n, t, e, r) {
      return ot(n, t, typeof e == "function" && tt(e, r, 2));
    }, J.isFinite = function (n) {
      return Ce(n) && !Oe(parseFloat(n));
    }, J.isFunction = dt, J.isNaN = function (n) {
      return jt(n) && n != +n;
    }, J.isNull = function (n) {
      return null === n;
    }, J.isNumber = jt, J.isObject = wt, J.isPlainObject = Pe, J.isRegExp = function (n) {
      return n && typeof n == "object" && ce.call(n) == z || false;
    }, J.isString = kt, J.isUndefined = function (n) {
      return typeof n == "undefined";
    }, J.lastIndexOf = function (n, t, e) {
      var r = n ? n.length : 0;for (typeof e == "number" && (r = (0 > e ? Ie(0, r + e) : Se(e, r - 1)) + 1); r--;) if (n[r] === t) return r;return -1;
    }, J.mixin = Gt, J.noConflict = function () {
      return (e._ = le, this);
    }, J.noop = Ht, J.now = Ue, J.parseInt = Ge, J.random = function (n, t, e) {
      var r = null == n,
          u = null == t;return (null == e && (typeof n == "boolean" && u ? (e = n, n = 1) : u || typeof t != "boolean" || (e = t, u = true)), r && u && (t = 1), n = +n || 0, u ? (t = n, n = 0) : t = +t || 0, e || n % 1 || t % 1 ? (e = Re(), Se(n + e * (t - n + parseFloat("1e-" + ((e + "").length - 1))), t)) : at(n, t));
    }, J.reduce = Dt, J.reduceRight = $t, J.result = function (n, t) {
      if (n) {
        var e = n[t];return dt(e) ? n[t]() : e;
      }
    }, J.runInContext = s, J.size = function (n) {
      var t = n ? n.length : 0;return typeof t == "number" ? t : Fe(n).length;
    }, J.some = Ft, J.sortedIndex = zt, J.template = function (n, t, e) {
      var r = J.templateSettings;n = oe(n || ""), e = _({}, e, r);var u,
          o = _({}, e.imports, r.imports),
          r = Fe(o),
          o = xt(o),
          a = 0,
          f = e.interpolate || S,
          l = "__p+='",
          f = ue((e.escape || S).source + "|" + f.source + "|" + (f === N ? x : S).source + "|" + (e.evaluate || S).source + "|$", "g");n.replace(f, function (t, e, r, o, f, c) {
        return (r || (r = o), l += n.slice(a, c).replace(R, i), e && (l += "'+__e(" + e + ")+'"), f && (u = true, l += "';" + f + ";\n__p+='"), r && (l += "'+((__t=(" + r + "))==null?'':__t)+'"), a = c + t.length, t);
      }), l += "';", f = e = e.variable, f || (e = "obj", l = "with(" + e + "){" + l + "}"), l = (u ? l.replace(w, "") : l).replace(j, "$1").replace(k, "$1;"), l = "function(" + e + "){" + (f ? "" : e + "||(" + e + "={});") + "var __t,__p='',__e=_.escape" + (u ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + l + "return __p}";try {
        var c = ne(r, "return " + l).apply(v, o);
      } catch (p) {
        throw (p.source = l, p);
      }return t ? c(t) : (c.source = l, c);
    }, J.unescape = function (n) {
      return null == n ? "" : oe(n).replace(qe, gt);
    }, J.uniqueId = function (n) {
      var t = ++y;return oe(null == n ? "" : n) + t;
    }, J.all = Ot, J.any = Ft, J.detect = It, J.findWhere = It, J.foldl = Dt, J.foldr = $t, J.include = Ct, J.inject = Dt, Gt((function () {
      var n = {};return (h(J, function (t, e) {
        J.prototype[e] || (n[e] = t);
      }), n);
    })(), false), J.first = Bt, J.last = function (n, t, e) {
      var r = 0,
          u = n ? n.length : 0;if (typeof t != "number" && null != t) {
        var o = u;for (t = J.createCallback(t, e, 3); o-- && t(n[o], o, n);) r++;
      } else if ((r = t, null == r || e)) return n ? n[u - 1] : v;return p(n, Ie(0, u - r));
    }, J.sample = function (n, t, e) {
      return (n && typeof n.length != "number" && (n = xt(n)), null == t || e ? n ? n[at(0, n.length - 1)] : v : (n = Tt(n), n.length = Se(Ie(0, t), n.length), n));
    }, J.take = Bt, J.head = Bt, h(J, function (n, t) {
      var e = "sample" !== t;J.prototype[t] || (J.prototype[t] = function (t, r) {
        var u = this.__chain__,
            o = n(this.__wrapped__, t, r);return u || null != t && (!r || e && typeof t == "function") ? new Q(o, u) : o;
      });
    }), J.VERSION = "2.4.1", J.prototype.chain = function () {
      return (this.__chain__ = true, this);
    }, J.prototype.toString = function () {
      return oe(this.__wrapped__);
    }, J.prototype.value = Qt, J.prototype.valueOf = Qt, St(["join", "pop", "shift"], function (n) {
      var t = ae[n];J.prototype[n] = function () {
        var n = this.__chain__,
            e = t.apply(this.__wrapped__, arguments);
        return n ? new Q(e, n) : e;
      };
    }), St(["push", "reverse", "sort", "unshift"], function (n) {
      var t = ae[n];J.prototype[n] = function () {
        return (t.apply(this.__wrapped__, arguments), this);
      };
    }), St(["concat", "slice", "splice"], function (n) {
      var t = ae[n];J.prototype[n] = function () {
        return new Q(t.apply(this.__wrapped__, arguments), this.__chain__);
      };
    }), J);
  }var v,
      h = [],
      g = [],
      y = 0,
      m = +new Date() + "",
      b = 75,
      _ = 40,
      d = " \t\u000b\f ﻿\n\r\u2028\u2029 ᠎             　",
      w = /\b__p\+='';/g,
      j = /\b(__p\+=)''\+/g,
      k = /(__e\(.*?\)|\b__t\))\+'';/g,
      x = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
      C = /\w*$/,
      O = /^\s*function[ \n\r\t]+\w/,
      N = /<%=([\s\S]+?)%>/g,
      I = RegExp("^[" + d + "]*0+(?=.$)"),
      S = /($^)/,
      E = /\bthis\b/,
      R = /['\n\r\t\u2028\u2029\\]/g,
      A = "Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),
      D = "[object Arguments]",
      $ = "[object Array]",
      T = "[object Boolean]",
      F = "[object Date]",
      B = "[object Function]",
      W = "[object Number]",
      q = "[object Object]",
      z = "[object RegExp]",
      P = "[object String]",
      K = {};
  K[B] = false, K[D] = K[$] = K[T] = K[F] = K[W] = K[q] = K[z] = K[P] = true;var L = { leading: false, maxWait: 0, trailing: false },
      M = { configurable: false, enumerable: false, value: null, writable: false },
      V = { boolean: false, "function": true, object: true, number: false, string: false, undefined: false },
      U = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\t": "t", "\u2028": "u2028", "\u2029": "u2029" },
      G = V[typeof window] && window || this,
      H = V[typeof exports] && exports && !exports.nodeType && exports,
      J = V[typeof module] && module && !module.nodeType && module,
      Q = J && J.exports === H && H,
      X = V[typeof global] && global;!X || X.global !== X && X.window !== X || (G = X);
  var Y = s();typeof define == "function" && typeof define.amd == "object" && define.amd ? (G._ = Y, define(function () {
    return Y;
  })) : H && J ? Q ? (J.exports = Y)._ = Y : H._ = Y : G._ = Y;
}).call(undefined);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[7])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcVXNlcnNcXFJvblxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvY2FwYWJpbGl0aWVzLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3NyYy9lbnZpcm9ubWVudC5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvbmFtZXNwYWNlLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3NyYy9uYXRpdmUvbm9kZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvbmF0aXZlL3N0cmluZy5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvdHlwZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC90ZXN0L3VuaXQvc3JjL3Rlc3QuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvdGVzdC91bml0L3NyYy90ZXN0Q2FwYWJpbGl0aWVzLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3Rlc3QvdW5pdC9zcmMvdGVzdEVudmlyb25tZW50LmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3Rlc3QvdW5pdC9zcmMvdGVzdE5hbWVzcGFjZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC90ZXN0L3VuaXQvc3JjL3Rlc3ROb2RlLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3Rlc3QvdW5pdC9zcmMvdGVzdFN0cmluZy5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC90ZXN0L3VuaXQvc3JjL3Rlc3RUeXBlLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3ZlbmRvci9sb2Rhc2gvZGlzdC9sb2Rhc2gubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7aUJDRWUsQ0FBQyxZQUFJO0FBQ25CLEtBQU0sS0FBSyxHQUFHLE1BQU0s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LENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQUMsQ0FBQyxDQUFDO0NBQzFILEFBUU0sU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFDO0FBQ3RCLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFDO0FBQUMsU0FBTyxHQUFHLEdBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0VBQUMsQ0FBQyxDQUFDO0FBQzdFLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLFFBQU8sQ0FBQyxJQUFFLE1BQU0sR0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO0NBQy9CLEFBUU0sU0FBUyxVQUFVLENBQUMsQ0FBQyxFQUFDO0FBQzVCLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLFVBQVMsRUFBRSxFQUFDO0FBQUMsU0FBTyxHQUFHLEdBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0VBQUMsQ0FBQyxDQUFDO0FBQzdFLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLFFBQU8sQ0FBQyxJQUFFLE1BQU0sR0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDO0NBQy9CLEFBT00sU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFDO0FBQ3pCLEtBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDcEMsS0FBSSxNQUFNLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25ILFFBQU8sQ0FBQyxDQUFDO0NBQ1QsQUFPTSxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUMsTUFBTSxFQUFFO0FBQy9CLEtBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBRyxTQUFTLElBQUUsTUFBTSxHQUMvQyxvZUFBcWUsR0FDcGUsdWVBQXdlLENBQ3plLENBQUM7QUFDSCxRQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDckIsQUFHTSxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUM7QUFDMUIsS0FBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQ2QsS0FBSSxDQUFDLENBQUMsTUFBTSxLQUFHLENBQUM7QUFBRSxTQUFPLEtBQUssQ0FBQztFQUFBLEFBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsTUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixPQUFLLEdBQUcsQUFBQyxDQUFDLEtBQUssSUFBRSxDQUFDLENBQUEsR0FBRSxLQUFLLEdBQUUsS0FBSyxDQUFDO0FBQ2pDLE9BQUssR0FBRyxLQUFLLEdBQUMsS0FBSyxDQUFDO0VBQ3BCO0FBQ0QsUUFBTyxLQUFLLENBQUM7Q0FDYixBQU1NLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUN6QixLQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUU7O0FBQUE7S0FFaEQsSUFBSSxHQUFHLDhCQUE4QjtLQUNyQyxFQUFFLEdBQUcsOEJBQThCLENBQ3BDO0FBQ0QsTUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUMxQyxLQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMvRDtBQUNELElBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBQyxFQUFFLENBQUM7RUFDbEMsT0FBTyxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUM7RUFDbkIsT0FBTyxDQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsQ0FBQzs7QUFFckIsUUFBTyxHQUFHLENBQUM7Q0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcExELElBQUssU0FBUyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7SUFDdkMsSUFBSSxHQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDNUIsTUFBTSxHQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDL0IsS0FBSyxHQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDN0IsSUFBSSxHQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDNUIsS0FBSyxHQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDN0IsUUFBUSxHQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDbkMsTUFBTSxHQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUM7SUFDL0IsT0FBTyxHQUFJLFdBQVcsQ0FBQyxTQUFTLENBQUM7SUFDakMsR0FBRyxHQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDMUIsS0FBSyxHQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDN0IsR0FBRyxHQUFLLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFDMUIsUUFBUSxHQUFJLFdBQVcsQ0FBQyxVQUFV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QUFJLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsWUFBWSxDQUFDLENBQUM7Q0FDcEQsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBQyxZQUFJO0FBQ2YsR0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLEtBQUcsSUFBSSxDQUFDLElBQUksRUFBQyxVQUFVLENBQUMsQ0FBQztDQUM1QyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0FDekRILENBQUMsQ0FBQyxZQUFVO0FBQUMsV0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxLQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDO0FBQUMsYUFBTyxDQUFDLENBQUM7S0FBQSxPQUFNLENBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsU0FBUyxJQUFFLENBQUMsSUFBRSxJQUFJLElBQUUsQ0FBQyxDQUFBO0FBQUMsYUFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0tBQUEsUUFBUSxJQUFFLENBQUMsSUFBRSxRQUFRLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxRQUFRLENBQUEsQUFBQyxDQUFDLElBQUksQ0FBQyxHQUFDLFFBQVEsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFFBQVEsSUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUcsU0FBUyxJQUFFLENBQUMsSUFBRSxJQUFJLElBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSTtBQUFDLGNBQVEsSUFBRSxDQUFDLElBQUUsUUFBUSxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsUUFBUSxDQUFBLEFBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxRQUFRLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxBQUFDLENBQUMsUUFBUSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBLENBQUMsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQTtLQUM5ZjtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFdBQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFHLENBQUMsRUFBQztBQUFDLFlBQUcsQ0FBQyxHQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxXQUFXO0FBQUMsaUJBQU8sQ0FBQyxDQUFDO1NBQUEsSUFBRyxDQUFDLEdBQUMsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFdBQVc7QUFBQyxpQkFBTSxDQUFDLENBQUMsQ0FBQTtTQUFBO09BQUM7S0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTTtRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRO0FBQUMsYUFBTyxLQUFLLENBQUM7S0FBQSxLQUFJLENBQUMsR0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEtBQUssRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxXQUFNLElBQUksR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FDN2YsU0FBUyxDQUFDLEdBQUU7QUFBQyxXQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBRSxFQUFFLENBQUE7R0FBQyxTQUFTLENBQUMsR0FBRTtBQUFDLFdBQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFFLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFBO0dBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsS0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFFBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxLQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsT0FBTyxDQUFDLElBQUUsV0FBVyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLEFBQ2xpQixDQUFDLEdBQUMsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFdBQVcsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUFDLGVBQU8sQ0FBQyxDQUFDO09BQUEsQ0FBQyxHQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxXQUFXLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFHLEtBQUssS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxNQUFNLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLEtBQUksSUFBSSxDQUFDLEdBQUMsU0FBUyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxXQUFXLElBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUM7QUFDaGdCLGFBQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLElBQUksQ0FBQyxHQUFDLFNBQVM7VUFBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBRyxDQUFDLEdBQUMsQ0FBQyxJQUFFLFVBQVUsSUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLElBQUUsVUFBVSxJQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLE9BQUssRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBRyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUFDLGVBQU8sQ0FBQyxDQUFDO09BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsYUFBYSxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3hoQixTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxXQUFXLEdBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsZUFBUyxDQUFDLEdBQUU7QUFBQyxZQUFHLENBQUMsRUFBQztBQUFDLGNBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQTtTQUFDLElBQUcsSUFBSSxZQUFZLENBQUMsRUFBQztBQUFDLGNBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO1NBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsU0FBUyxDQUFDLENBQUE7T0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFHLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFdBQVc7QUFBQyxpQkFBTyxDQUFDLENBQUE7U0FBQTtPQUFDLElBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTyxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsaUJBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFBQyxpQkFBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFBQyxrQkFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUEsQ0FBQTtBQUFBLE9BQ3ppQixLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFBLEFBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFBLEFBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEdBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQztBQUFDLGlCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUFBLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBQyxFQUFFLENBQUE7T0FBQyxNQUFLLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTyxDQUFDLEtBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUcsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLEFBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBRyxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUEsQUFBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsQ0FBRSxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxPQUFPLENBQUMsSUFBRSxVQUFVO0FBQUMsZUFBTyxFQUFFLENBQUM7T0FBQSxJQUFHLE9BQU8sQ0FBQyxJQUFFLFdBQVcsSUFBRSxFQUFFLFdBQVcsSUFBRyxDQUFDLENBQUEsQUFBQztBQUFDLGVBQU8sQ0FBQyxDQUFDO09BQUEsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFdBQVcsS0FBRyxFQUFFLENBQUMsU0FBUyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMWpCLFVBQUUsQ0FBQyxTQUFTLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsSUFBRyxLQUFLLEtBQUcsQ0FBQyxJQUFFLElBQUksS0FBRyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLFFBQU8sQ0FBQyxHQUFFLEtBQUssQ0FBQztBQUFDLGlCQUFPLFVBQVMsQ0FBQyxFQUFDO0FBQUMsbUJBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7V0FBQyxDQUFDLEtBQUssQ0FBQztBQUFDLGlCQUFPLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLG1CQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtXQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsaUJBQU8sVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLG1CQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7V0FBQyxDQUFDLEtBQUssQ0FBQztBQUFDLGlCQUFPLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsbUJBQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7V0FBQyxDQUFBLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsZUFBUyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFHLENBQUMsRUFBQztBQUFDLGNBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsQ0FBQTtTQUFDLE9BQU0sQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLEtBQUksQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUEsQUFBQyxJQUFFLENBQUMsSUFBRSxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsSUFBRyxDQUFDLEtBQUcsQ0FBQyxHQUFDLFNBQVMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLElBQUksWUFBWSxDQUFDLElBQUUsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQ3ptQixJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLEVBQUU7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFHLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxHQUFDLEtBQUssQ0FBQTtPQUFDLE9BQUssRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFPLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxLQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDO0FBQUMsV0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQUMsTUFBSyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQzVmLFNBQVMsRUFBRTs7O2dDQUFhOztZQUFaLENBQUM7WUFBQyxDQUFDO1lBQUMsQ0FBQztZQUFDLENBQUM7WUFBQyxDQUFDO1lBQUMsQ0FBQztBQUFZLFNBQUMsR0FBeUssQ0FBQyxHQUFZLENBQUMsR0FBNEwsQ0FBQyxHQUEwQixDQUFDLEdBQ3RNLENBQUMsR0FBRyxDQUFDO0FBRHpOLFlBQUcsQ0FBQyxFQUFDO0FBQUMsY0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFdBQVc7QUFBQyxtQkFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1dBQUE7U0FBQyxJQUFHLENBQUMsS0FBRyxDQUFDO0FBQUMsaUJBQU8sQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUM7U0FBQSxJQUFHLENBQUMsS0FBRyxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLEFBQUM7QUFBQyxpQkFBTyxLQUFLLENBQUM7U0FBQSxJQUFHLElBQUksSUFBRSxDQUFDLElBQUUsSUFBSSxJQUFFLENBQUM7QUFBQyxpQkFBTyxDQUFDLEtBQUcsQ0FBQyxDQUFDO1NBQUEsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQUMsaUJBQU8sS0FBSyxDQUFDO1NBQUEsUUFBTyxDQUFDLEdBQUUsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsbUJBQU0sQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsbUJBQU8sQ0FBQyxJQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsbUJBQU8sQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQztBQUFDLGNBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLGFBQWEsQ0FBQztjQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxhQUFhLENBQUMsQ0FBQyxJQUFHLENBQUMsSUFBRSxDQUFDO2lCQUFXLENBQUMsR0FBQyxDQUFDLENBQUMsV0FBVyxHQUFDLENBQUM7a0JBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsQ0FBQztrQkFBQyxDQUFDO2tCQUFDLENBQUM7a0JBQUMsQ0FBQztrQkFBQyxDQUFDOzs7V0FBRTtBQUM3Z0IsY0FBRyxDQUFDLElBQUUsQ0FBQztBQUFDLG1CQUFPLEtBQUssQ0FBQztXQUFBLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFBLEFBQUMsSUFBRSxhQUFhLElBQUcsQ0FBQyxJQUFFLGFBQWEsSUFBRyxDQUFDLENBQUE7QUFBQyxtQkFBTyxLQUFLLENBQUE7V0FBQTtTQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxHQUFFLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUM7QUFBQyxpQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDO1NBQUEsSUFBSSxDQUFDLEdBQUMsQ0FBQztZQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLEVBQUM7QUFBQyxlQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUEsSUFBRyxDQUFDLENBQUEsRUFBQyxPQUFLLENBQUMsRUFBRSxHQUFFLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxFQUFDLE9BQUssQ0FBQyxFQUFFLElBQUUsRUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssSUFBRyxFQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsTUFBSztTQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsaUJBQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUUsS0FBSyxDQUFDLENBQUE7U0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGlCQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsR0FBQyxLQUFLLENBQUMsQ0FBQTtTQUN4akIsQ0FBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7T0FBQztLQUFBLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLENBQUUsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQztZQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLEtBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQztBQUFDLGVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEdBQUUsSUFBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQztBQUFDLGFBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBSztXQUFDLElBQUcsQ0FBQyxDQUFDLEVBQUM7QUFBQyxnQkFBSSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxXQUFXLENBQUEsQUFBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBLEFBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7V0FBQztTQUFDLE1BQUssQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxJQUFFLFdBQVcsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEVBQUMsT0FBTyxDQUFDLElBQUUsV0FBVyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLEdBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFFO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRTtVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDO0FBQ2poQixXQUFJLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsS0FBSSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUEsSUFBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsUUFBTyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsR0FBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsRUFBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLGNBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtTQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7T0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFOzs7OztnQ0FBYTs7WUFBWixDQUFDO1lBQUMsQ0FBQztZQUFDLENBQUM7WUFBQyxDQUFDO1lBQUMsQ0FBQztZQUFDLENBQUM7QUFBTSxTQUFDLEdBQUssQ0FBQyxHQUFLLENBQUMsR0FBTSxDQUFDLEdBQzlaLENBQUM7QUFEcVksWUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxJQUFHLEVBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUEsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFHLENBQUMsSUFBRSxDQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQSxBQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBRyxDQUFDLElBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUEsQUFBQyxDQUFDO0FBQ3hnQixZQUFJLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxBQUFPLElBQUEsQ0FBQyxJQUFFLElBQUksS0FBRyxDQUFDO0FBQUUsV0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBLEFBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQUFBaUI7dUJBQUYsQ0FBQzs7Ozs7Ozs7OztpQkFBRyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBLENBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1NBQUE7T0FBQztLQUFBLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLEdBQUU7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFBLEtBQUksRUFBRSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLE9BQU8sQ0FBQyxJQUFFLFVBQVUsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsV0FBVyxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsWUFBWSxDQUFDLENBQUEsQUFBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsQ0FBQTtPQUMxZ0IsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxJQUFFLFdBQVcsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxHQUFFLEtBQUssQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBRSxRQUFRLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsS0FBSyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLFFBQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO09BQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLE9BQU8sQ0FBQyxJQUFFLFVBQVUsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU0sRUFBRSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtLQUN2Z0IsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxLQUFLLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEtBQUssQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFFO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLFFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsSUFBRyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLGVBQU0sRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcGhCLFVBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsRUFBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsRUFBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsTUFBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLEVBQUM7QUFBQyxZQUFJLENBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGlCQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFBLEdBQUUsS0FBSyxDQUFDLENBQUE7U0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7T0FBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyZ0IsWUFBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFBQyxpQkFBTyxDQUFDLENBQUE7U0FBQTtPQUFDO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxXQUFXLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxJQUFFLFFBQVEsQ0FBQSxFQUFDLE9BQUssRUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLEtBQUssS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsV0FBVyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBRSxRQUFRLENBQUEsRUFBQyxPQUFLLENBQUMsRUFBRSxJQUFFLEtBQUssS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxLQUFJO0FBQUMsWUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGtCQUFPLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQTtTQUFDLENBQUMsQ0FBQTtPQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBRSxRQUFRLENBQUEsRUFBQyxLQUFJLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQ25oQixDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFHLE9BQU8sQ0FBQyxJQUFFLFVBQVUsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFBLEFBQUMsRUFBQyxJQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxjQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtTQUFDO09BQUMsTUFBSyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLEVBQUMsS0FBSSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLEtBQUssRUFBQyxDQUFDLENBQUEsR0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FDdmhCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLElBQUcsT0FBTyxDQUFDLElBQUUsUUFBUSxFQUFDLE9BQUssRUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQU0sRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsSUFBSSxJQUFFLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzVoQixhQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFBO09BQUMsTUFBSyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUE7QUFBQyxlQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO09BQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBO09BQUMsTUFBSyxJQUFHLENBQUM7QUFBQyxnQkFBTyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDO09BQUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsSUFBSSxJQUFFLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBRSxDQUFBO09BQUMsTUFBSyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDNWlCLGFBQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsY0FBTyxPQUFPLENBQUMsSUFBRSxTQUFTLElBQUUsSUFBSSxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxVQUFVLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsS0FBSyxDQUFBLEFBQUMsRUFBQyxJQUFJLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxTQUFTLEVBQUUsR0FBRTtBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsU0FBUyxHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUEsQUFBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FDdGhCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsZUFBUyxDQUFDLEdBQUU7QUFBQyxTQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxDQUFBLEtBQUksQ0FBQyxHQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFBLEFBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxTQUFTLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLEVBQUUsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFBLEFBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsSUFBSSxDQUFDO1VBQUMsQ0FBQztVQUFDLENBQUM7VUFBQyxDQUFDO1VBQUMsQ0FBQztVQUFDLENBQUM7VUFBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsS0FBSztVQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUMsS0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsSUFBSSxLQUFHLENBQUMsQ0FBQSxFQUFDLElBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUMsR0FBQyxTQUFTLElBQUcsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLFVBQVUsSUFBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLE9BQU8sWUFBVTtBQUFDLGFBQUcsQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFFLEVBQUMsQ0FBQyxHQUFDLElBQUksRUFBQyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsS0FBSyxLQUFHLENBQUMsQ0FBQSxFQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFJO0FBQUMsV0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDO2NBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUM7QUFDcGhCLFdBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsR0FBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO1NBQUMsUUFBTyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7T0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQyxNQUFNLENBQUEsQUFBQyxLQUFHLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsS0FBSyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxPQUFPLElBQUcsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLEFBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxZQUFVO0FBQUMsY0FBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVM7Y0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLFdBQVc7Y0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLEVBQUM7QUFBQyxnQkFBRyxDQUFDLEtBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLElBQUksQ0FBQztBQUNqZ0IsYUFBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFBO1dBQUMsT0FBTyxDQUFDLENBQUE7U0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxHQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxVQUFTLENBQUMsRUFBQztBQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxHQUFFO0FBQUMsYUFBTyxJQUFJLENBQUMsV0FBVyxDQUFBO0tBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsQ0FBQyxDQUFDLEtBQUs7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLE9BQU87UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUk7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLFFBQVE7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLElBQUk7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLFNBQVM7UUFBQyxFQUFFLEdBQUMsRUFBRTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsU0FBUztRQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsUUFBUTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLHVCQUF1QixFQUFDLEtBQUssQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsSUFBSTtRQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsWUFBWTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsS0FBSztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVE7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUUsRUFBRTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsY0FBYztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsSUFBSTtRQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsVUFBVTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsTUFBTTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsT0FBTztRQUFDLEVBQUUsR0FBQyxDQUFBLFlBQVU7QUFBQyxVQUFHO0FBQUMsWUFBSSxDQUFDLEdBQUMsRUFBRTtZQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBRSxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQTtPQUNsckIsQ0FBQSxPQUFNLENBQUMsRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0tBQUMsQ0FBQSxFQUFFO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFFLEVBQUU7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUUsRUFBRTtRQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsUUFBUTtRQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsS0FBSztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBRSxFQUFFO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxHQUFHO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxRQUFRO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxNQUFNO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLFNBQVMsR0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLElBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBQyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsaUJBQWlCLEVBQUMsV0FBVyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLEVBQUUsS0FBRyxFQUFFLEdBQUMsQ0FBQSxZQUFVO0FBQUMsZUFBUyxDQUFDLEdBQUUsRUFBRSxPQUFPLFVBQVMsQ0FBQyxFQUFDO0FBQUMsWUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxXQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQztBQUN0aUIsY0FBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUEsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFDLElBQUksQ0FBQTtTQUFDLE9BQU8sQ0FBQyxJQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtPQUFDLENBQUE7S0FBQyxDQUFBLEVBQUUsQ0FBQSxBQUFDLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLE9BQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsY0FBYyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsR0FBQyxFQUFFO1FBQUMsRUFBRSxHQUFDLEVBQUUsSUFBRSxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEtBQUssQ0FBQTtLQUFDO1FBQUMsRUFBRSxHQUFDLEVBQUUsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUE7S0FBQyxHQUFDLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxJQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFHLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUM1Z0IsR0FBQyxFQUFFO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsUUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLE9BQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7S0FBQyxDQUFDO1FBQUMsRUFBRSxHQUFDLEVBQUU7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUUsRUFBRSxJQUFFLFlBQVU7QUFBQyxhQUFNLEFBQUMsSUFBSSxFQUFFLEVBQUEsQ0FBRSxPQUFPLEVBQUUsQ0FBQTtLQUFDO1FBQUMsRUFBRSxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQTtLQUFDLENBQUMsUUFBTyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDLE9BQU8sWUFBVTtBQUFDLGVBQU8sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsU0FBUyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNoQixhQUFPLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsY0FBTyxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxZQUFVO0FBQUMsV0FBSSxJQUFJLENBQUMsR0FBQyxTQUFTLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEdBQUUsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUM7QUFDcmdCLGFBQU8sWUFBVTtBQUFDLGFBQUksSUFBSSxDQUFDLEdBQUMsU0FBUyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxZQUFVO0FBQUMsZUFBTyxDQUFDLENBQUE7T0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLGNBQWMsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsT0FBTyxDQUFDLENBQUMsSUFBRyxJQUFJLElBQUUsQ0FBQyxJQUFFLFVBQVUsSUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLFFBQVEsSUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxJQUFFLENBQUMsS0FBRyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFFLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQSxBQUFDLEdBQUcsT0FBTyxDQUFDLENBQUE7T0FBQyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsZ0JBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxLQUFHLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxDQUFBO09BQy9nQixDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sQ0FBQyxHQUFDLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxZQUFVO0FBQUMsU0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBVTtBQUFDLFNBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sT0FBTyxDQUFDLElBQUUsU0FBUyxJQUFFLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQSxBQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQTtLQUM3aUIsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsWUFBWSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFFLEtBQUssS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxJQUFJLElBQUUsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQTtPQUFDLE1BQUssQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsWUFBVTtBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDempCLFNBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxLQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsT0FBSyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQztBQUFDLGVBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUEsQ0FBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUUsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxFQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQztPQUFDLE9BQUssQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLElBQUUsVUFBVTtVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLFFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBRSxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUM7QUFDL2dCLGNBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsZUFBUyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSztZQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLEdBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsU0FBUyxDQUFDLENBQUE7T0FBQyxJQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUEsQ0FBQyxRQUFPLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsU0FBUztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQyxLQUFHLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxVQUFVLElBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUMsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBQyxDQUFDLElBQUUsVUFBVSxJQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbGlCLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUcsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxLQUFHLENBQUMsR0FBQyxJQUFJLENBQUEsQUFBQyxFQUFDLElBQUksSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUM7QUFBQyxTQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLGNBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO1NBQUM7T0FBQyxNQUFLLENBQUMsR0FBQyxJQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFVBQVUsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFdBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxjQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFDO09BQUMsTUFBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQ3RoQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUMsT0FBTyxZQUFVO0FBQUMsZUFBTyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFlBQVksR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUcsT0FBTyxDQUFDLElBQUUsVUFBVSxFQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQ2pnQixNQUFLLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsS0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQSxBQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLE9BQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQSxBQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxlQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FDMWYsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsQ0FBQSxBQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLGlCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUEsQ0FBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQzdmLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsSUFBSTtVQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUMsUUFBTyxLQUFLLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxTQUFTLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxVQUFVLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsSUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxJQUFJLElBQUUsQ0FBQyxFQUFDLElBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtPQUFDLFFBQU8sQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxDQUFFLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsZUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FDNWpCLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsWUFBVTtBQUFDLGFBQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLFlBQVU7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7T0FBQyxPQUFPLENBQUMsSUFBRSxFQUFFLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsY0FBTyxPQUFPLENBQUMsSUFBRSxTQUFTLElBQUUsSUFBSSxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQTtLQUNqbUIsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLE9BQU8sQ0FBQyxJQUFFLFVBQVUsSUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxJQUFJLElBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLENBQUMsUUFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxLQUFLLENBQUEsR0FBRSxLQUFLLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLENBQUMsUUFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxLQUFLLENBQUEsR0FBRSxLQUFLLENBQUMsQ0FBQTtPQUNoaUIsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsYUFBYSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxHQUFFLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLENBQUMsUUFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxLQUFLLENBQUEsR0FBRSxLQUFLLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxLQUFLLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLElBQUksS0FBRyxDQUFDLElBQUUsS0FBSyxLQUFHLENBQUMsSUFBRSxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEtBQUssQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxLQUFLLENBQUE7S0FDamhCLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLENBQUMsUUFBUSxJQUFFLEtBQUssQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFHLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsWUFBVTtBQUFDLGVBQU8sQ0FBQyxHQUFDLEtBQUssQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQUFBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBRSxVQUFVLElBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsVUFBVSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxJQUFJLEtBQUcsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsYUFBYSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEtBQUssQ0FBQTtLQUMxa0IsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsV0FBVyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxPQUFPLENBQUMsSUFBRSxXQUFXLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxLQUFJLE9BQU8sQ0FBQyxJQUFFLFFBQVEsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTSxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxZQUFVO0FBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxJQUFJLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUM7VUFBQyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsQ0FBQyxRQUFPLElBQUksSUFBRSxDQUFDLEtBQUcsT0FBTyxDQUFDLElBQUUsU0FBUyxJQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsR0FBRSxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsU0FBUyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQSxBQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxFQUFFLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBLENBQUUsTUFBTSxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsR0FBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUE7S0FDN2lCLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFHLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7T0FBQztLQUFDLEVBQUMsQ0FBQyxDQUFDLFlBQVksR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxPQUFPLE9BQU8sQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBRSxDQUFDO1VBQUMsQ0FBQyxHQUFDLFFBQVE7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLENBQUEsQ0FBRSxNQUFNLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLENBQUUsTUFBTSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUUsQ0FBQyxDQUFBLENBQUUsTUFBTSxHQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsZ0JBQU8sQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsS0FBRyxDQUFDLElBQUUsUUFBUSxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsSUFBRSxJQUFJLEdBQUMsQ0FBQyxHQUFDLFdBQVcsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxXQUFXLEdBQUMsQ0FBQyxHQUFDLG9CQUFvQixDQUFBLEFBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFBLENBQUE7T0FDaHFCLENBQUMsRUFBQyxDQUFDLElBQUUsSUFBSSxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLEtBQUssRUFBQyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsR0FBQyxJQUFJLEdBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLEdBQUMsV0FBVyxHQUFDLENBQUMsR0FBQyxJQUFJLElBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxPQUFPLENBQUEsQUFBQyxHQUFDLDZCQUE2QixJQUFFLENBQUMsR0FBQyx5RUFBeUUsR0FBQyxHQUFHLENBQUEsQUFBQyxHQUFDLENBQUMsR0FBQyxhQUFhLENBQUMsSUFBRztBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFBLE9BQU0sQ0FBQyxFQUFDO0FBQUMsZUFBTSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtPQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQUFBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxJQUFJLElBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksSUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtLQUM5ZixFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFBLFlBQVU7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsUUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxDQUFBLEVBQUUsRUFBQyxLQUFLLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxJQUFJLElBQUUsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQTtPQUFDLE1BQUssS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLElBQUksSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFBLEVBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sQ0FBQyxJQUFFLE9BQU8sQ0FBQyxDQUFDLE1BQU0sSUFBRSxRQUFRLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUEsQUFBQyxDQUFBLENBQUE7S0FDN2hCLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxRQUFRLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUUsSUFBSSxJQUFFLENBQUMsS0FBRyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsVUFBVSxDQUFBLEFBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQSxBQUFDLENBQUE7S0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUMsWUFBVTtBQUFDLGNBQU8sSUFBSSxDQUFDLFNBQVMsR0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFDLFlBQVU7QUFBQyxhQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFDLFlBQVU7QUFBQyxZQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsU0FBUztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsU0FB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QUFRLEVBQUMsS0FBSyxFQUFDO01BQUMsQ0FBQyxHQUFDLEVBQUMsU0FBVSxLQUFLLEVBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDO01BQUMsQ0FBQyxHQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQztNQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBRSxNQUFNLElBQUUsSUFBSTtNQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBRSxPQUFPLElBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFFLE9BQU87TUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUUsTUFBTSxJQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBRSxNQUFNO01BQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxLQUFHLENBQUMsSUFBRSxDQUFDO01BQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxLQUFHLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQztBQUM1akIsTUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxNQUFNLElBQUUsVUFBVSxJQUFFLE9BQU8sTUFBTSxDQUFDLEdBQUcsSUFBRSxRQUFRLElBQUUsTUFBTSxDQUFDLEdBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsWUFBVTtBQUFDLFdBQU8sQ0FBQyxDQUFBO0dBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQSxDQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7Q0FBQyxDQUFBLENBQUUsSUFBSSxXQUFNLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIERvY3VtZW50VG91Y2ggKi9cclxuLy8gdG9kbyBkb2N1bWVudFxyXG5leHBvcnQgZGVmYXVsdCAoKCk9PntcclxuXHRjb25zdCBvSW5mbyA9IHdpbmRvdy5uYXZpZ2F0b3JcclxuXHRcdCxzVHlwZVRvdWNoID0gdHlwZW9mIHdpbmRvdy5Ub3VjaFxyXG5cdDtcclxuXHRyZXR1cm4ge1xyXG5cdFx0c3RhbmRhbG9uZTogISFvSW5mby5zdGFuZGFsb25lXHJcblx0XHQsdG91Y2g6ICEhKChzVHlwZVRvdWNoPT0nb2JqZWN0J3x8c1R5cGVUb3VjaD09J2Z1bmN0aW9uJykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKVxyXG5cdH07XHJcbn0pKCk7XHJcbiIsIi8vIHRvZG8gZG9jdW1lbnRcclxuZXhwb3J0IGRlZmF1bHQgKCgpPT57XHJcblx0Y29uc3RcclxuXHRcdG9OYXZpZ2F0b3IgPVx0d2luZG93Lm5hdmlnYXRvclxyXG5cdFx0LHNVc2VyQWdlbnQgPVx0b05hdmlnYXRvci51c2VyQWdlbnRcclxuXHRcdCxpc0lQYWQgPVx0XHQhIXNVc2VyQWdlbnQubWF0Y2goL2lQYWQvaSlcclxuXHRcdCxpc0lQaG9uZSA9XHRcdCEhc1VzZXJBZ2VudC5tYXRjaCgvaVBob25lL2kpXHJcblx0XHQsaXNJUG9kID1cdFx0ISFzVXNlckFnZW50Lm1hdGNoKC9pUG9kL2kpXHJcblx0XHQsaXNBbmRyb2lkID1cdCEhc1VzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKVxyXG5cdFx0LGlzQmxhY2tCZXJyeSA9XHQhIXNVc2VyQWdlbnQubWF0Y2goL0JsYWNrQmVycnkvaSlcclxuXHRcdCxpc0lFTW9iaWxlID1cdCEhc1VzZXJBZ2VudC5tYXRjaCgvSUVNb2JpbGUvaSlcclxuXHRcdCxpc1Bob25lR2FwID1cdHdpbmRvdy5QaG9uZUdhcCE9PXVuZGVmaW5lZFxyXG5cdFx0LGlzQ29yZG92YSA9XHR3aW5kb3cuY29yZG92YSE9PXVuZGVmaW5lZFxyXG5cdFx0Ly8gY3VtdWxhdGl2ZVxyXG5cdFx0LGlzSU9TID1cdFx0aXNJUGFkfHxpc0lQaG9uZXx8aXNJUG9kXHJcblx0XHQsaXNNb2JpbGUgPVx0XHRpc0lPU3x8aXNBbmRyb2lkfHxpc0JsYWNrQmVycnl8fGlzSUVNb2JpbGVcclxuXHRcdCxpc1N0YW5kYWxvbmUgPVx0ISFvTmF2aWdhdG9yLnN0YW5kYWxvbmVcclxuXHQ7XHJcblx0ZnVuY3Rpb24gYWRkQ2xhc3NOYW1lcygpe1xyXG5cdFx0Y29uc3QgbUhUTUwgPSBkb2N1bWVudC5ib2R5XHJcblx0XHRcdCxzUHJlZml4ID0gJ2Vudl8nXHJcblx0XHRcdCxhZGRCb2R5Q2xhc3MgPSBtSFRNTC5jbGFzc0xpc3QuYWRkLmJpbmQobUhUTUwuY2xhc3NMaXN0KTtcclxuXHRcdGlzSVBhZCYmYWRkQm9keUNsYXNzKHNQcmVmaXgrJ2lwYWQnKTtcclxuXHRcdGlzSVBob25lJiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnaXBob25lJyk7XHJcblx0XHRpc0lQb2QmJmFkZEJvZHlDbGFzcyhzUHJlZml4KydpcG9kJyk7XHJcblx0XHRpc0FuZHJvaWQmJmFkZEJvZHlDbGFzcyhzUHJlZml4KydhbmRyb2lkJyk7XHJcblx0XHRpc0JsYWNrQmVycnkmJmFkZEJvZHlDbGFzcyhzUHJlZml4KydibGFja2JlcnJ5Jyk7XHJcblx0XHRpc0lFTW9iaWxlJiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnaWVtb2JpbGUnKTtcclxuXHRcdGlzSU9TJiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnaW9zJyk7XHJcblx0XHRpc01vYmlsZSYmYWRkQm9keUNsYXNzKHNQcmVmaXgrJ21vYmlsZScpO1xyXG5cdFx0aXNQaG9uZUdhcCYmYWRkQm9keUNsYXNzKHNQcmVmaXgrJ3Bob25lZ2FwJyk7XHJcblx0XHRpc0NvcmRvdmEmJmFkZEJvZHlDbGFzcyhzUHJlZml4Kydjb3Jkb3ZhJyk7XHJcblx0fVxyXG5cdHJldHVybiB7XHJcblx0XHRpc0lQYWQ6aXNJUGFkXHJcblx0XHQsaXNJUGhvbmU6aXNJUGhvbmVcclxuXHRcdCxpc0lQb2Q6aXNJUG9kXHJcblx0XHQsaXNBbmRyb2lkOmlzQW5kcm9pZFxyXG5cdFx0LGlzQmxhY2tCZXJyeTppc0JsYWNrQmVycnlcclxuXHRcdCxpc0lFTW9iaWxlOmlzSUVNb2JpbGVcclxuXHRcdCxpc0lPUzppc0lPU1xyXG5cdFx0LGlzTW9iaWxlOmlzTW9iaWxlXHJcblx0XHQsc3RhbmRhbG9uZTogaXNTdGFuZGFsb25lXHJcblx0XHQsYWRkQ2xhc3NOYW1lczphZGRDbGFzc05hbWVzXHJcblx0fTtcclxufSkoKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZSBuYW1lc3BhY2VzLiBJZiBvbmx5IHRoZSBmaXJzdCAnbmFtZXNwYWNlJyBwYXJhbWV0ZXIgaXMgc2V0IGl0IHdpbGwgcmV0dXJuIHRoZSBuYW1lc3BhY2UgaWYgaXQgZXhpc3RzIG9yIG51bGwgaWYgaXQgZG9lc24ndC5cclxuICogQG5hbWUgbmFtZXNwYWNlXHJcbiAqIEBtZXRob2RcclxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSBUaGUgbmFtZXNwYWNlIHdlJ3JlIGNyZWF0aW5nIG9yIGV4cGFuZGluZ1xyXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3Qgd2l0aCB3aGljaCB0byBleHRlbmQgdGhlIG5hbWVzcGFjZVxyXG4gKi9cclxuaW1wb3J0ICogYXMgXyBmcm9tICcuLy4uL3ZlbmRvci9sb2Rhc2gvZGlzdC9sb2Rhc2gubWluLmpzJztcclxuZXhwb3J0IGRlZmF1bHQgKG5hbWVzcGFjZSxvYmplY3QpPT57XHJcblx0dmFyIGV4dGVuZCA9IF8uZXh0ZW5kXHJcblx0XHQsb0Jhc2UgPSB3aW5kb3dcclxuXHRcdCxhTlMgPSBuYW1lc3BhY2Uuc3BsaXQoJy4nKVxyXG5cdFx0LHNcclxuXHQ7XHJcblx0d2hpbGUocz1hTlMuc2hpZnQoKSl7XHJcblx0XHRpZiAob2JqZWN0KSB7XHJcblx0XHRcdGlmIChhTlMubGVuZ3RoPT09MCkge1xyXG5cdFx0XHRcdHZhciBvRXhpc3RzID0gb0Jhc2UuaGFzT3duUHJvcGVydHkocyk/b0Jhc2Vbc106bnVsbDtcclxuXHRcdFx0XHRvQmFzZVtzXSA9IG9iamVjdDtcclxuXHRcdFx0XHRpZiAoIW9iamVjdC5oYXNPd25Qcm9wZXJ0eSgndG9TdHJpbmcnKSkge1xyXG5cdFx0XHRcdFx0b2JqZWN0LnRvU3RyaW5nID0gKGZ1bmN0aW9uKHMpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiAnW29iamVjdCAnK3MrJ10nO307fSkocyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChvRXhpc3RzKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ092ZXJ3cml0aW5nICcrcysnIGluICcrbmFtZXNwYWNlKTtcclxuXHRcdFx0XHRcdGV4dGVuZChvQmFzZVtzXSxvRXhpc3RzKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSBpZiAoIW9CYXNlLmhhc093blByb3BlcnR5KHMpKSB7XHJcblx0XHRcdC8vfSBlbHNlIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9CYXNlLHMpKSB7IC8vIGllOCBmaXhcclxuXHRcdFx0XHRvQmFzZVtzXSA9IHt9O1xyXG5cdFx0XHR9XHJcblx0XHRcdG9CYXNlID0gb0Jhc2Vbc107XHJcblx0XHR9IGVsc2UgaWYgKG9CYXNlLmhhc093blByb3BlcnR5KHMpKSB7XHJcblx0XHQvL30gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvQmFzZSxzKSkgeyAvLyBpZTggZml4XHJcblx0XHRcdG9CYXNlID0gb0Jhc2Vbc107XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBvQmFzZTtcclxufSIsIi8qKlxyXG4gKiBOb2RlIG1ldGhvZHNcclxuICogQG1vZHVsZSBuYXRpdmUvbm9kZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIG5vZGUgdG8gYW4gb2JqZWN0IChhdHRyaWJ1dGUgYW5kIGNoaWxkbm9kZSBjb2xsaXNpb25zIG1heSBvY2N1cilcclxuICogQHBhcmFtIHtOb2RlfSBub2RlIEEgbm9kZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0ZW5kVG8gQW4gb3B0aW9uYWwgcHJlLWV4aXN0aW5nIG9iamVjdCB0byBmaWxsLlxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KG5vZGUsZXh0ZW5kVG8pe1xyXG5cdGlmIChleHRlbmRUbz09PXVuZGVmaW5lZCkgZXh0ZW5kVG8gPSB7fTtcclxuXHR2YXIgaSxsXHJcblx0XHQsYUF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXNcclxuXHRcdCxhQ2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcclxuXHQvLyBhdHRyaWJ1dGVzXHJcblx0aWYgKGFBdHRyaWJ1dGVzJiZhQXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdGZvciAoaT0wLGw9YUF0dHJpYnV0ZXMubGVuZ3RoO2k8bDtpKyspIHtcclxuXHRcdFx0dmFyIG9BdHRyID0gYUF0dHJpYnV0ZXNbaV07XHJcblx0XHRcdGV4dGVuZFRvW29BdHRyLm5vZGVOYW1lXSA9IG9BdHRyLm5vZGVWYWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8gbm9kZXNcclxuXHRmb3IgKGk9MCxsPWFDaGlsZE5vZGVzLmxlbmd0aDtpPGw7aSsrKSB7XHJcblx0XHR2YXIgZWwgPSBhQ2hpbGROb2Rlc1tpXVxyXG5cdFx0XHQsc0VsTm9kZU5hbWUgPSBlbC5ub2RlTmFtZVxyXG5cdFx0XHQsaU5vZGVUeXBlID0gZWwubm9kZVR5cGVcclxuXHRcdFx0LG9Ob2RlID0gaWRkcWQuaW50ZXJuYWwuaG9zdC5ub2RlLnRvT2JqZWN0KGVsKTtcclxuXHRcdHN3aXRjaCAoaU5vZGVUeXBlKSB7XHJcblx0XHRcdGNhc2UgMTogLy8gbm9kZVxyXG5cdFx0XHRcdGlmIChleHRlbmRUby5oYXNPd25Qcm9wZXJ0eShzRWxOb2RlTmFtZSkpIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGV4dGVuZFRvW3NFbE5vZGVOYW1lXSkpIGV4dGVuZFRvW3NFbE5vZGVOYW1lXS5wdXNoKG9Ob2RlKTtcclxuXHRcdFx0XHRcdGVsc2UgZXh0ZW5kVG9bc0VsTm9kZU5hbWVdID0gW2V4dGVuZFRvW2VsLm5vZGVOYW1lXSxvTm9kZV07XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGV4dGVuZFRvW3NFbE5vZGVOYW1lXSA9IG9Ob2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMzogLy8gdGV4dFxyXG5cdFx0XHRcdGV4dGVuZFRvLl90ZXh0ID0gZWwuaW5uZXJUZXh0fHxlbC50ZXh0Q29udGVudDtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGV4dGVuZFRvO1xyXG59IiwiLyoqXHJcbiAqIFRyaWVzIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiB0aGUgc3RyaW5nIGFuZCByZXR1cm5zIGl0LlxyXG4gKiBAbmFtZSBzdHJpbmcudG9UeXBlXHJcbiAqIEBtZXRob2RcclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBhIHN0cmluZywgbnVtYmVyIG9yIGJvb2xlYW4uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9UeXBlKHMpe1xyXG5cdC8vIGludGVnZXJcclxuXHR2YXIgaSA9IHBhcnNlSW50KHMsMTApO1xyXG5cdGlmIChpLnRvU3RyaW5nKCk9PXMpIHJldHVybiBpO1xyXG5cdC8vIGZsb2F0aW5nIHBvaW50XHJcblx0dmFyIGYgPSBwYXJzZUZsb2F0KHMpO1xyXG5cdGlmIChmLnRvU3RyaW5nKCk9PXMpIHJldHVybiBmO1xyXG5cdC8vIGJvb2xlYW5cclxuXHR2YXIgYiA9IHM9PSd0cnVlJ3x8KHM9PSdmYWxzZSc/ZmFsc2U6bnVsbCk7XHJcblx0aWYgKGIhPT1udWxsKSByZXR1cm4gYjtcclxuXHQvL1xyXG5cdHJldHVybiBzO1xyXG59XHJcblxyXG4vKipcclxuICogUGFkcyBhIHN0cmluZyBsZWZ0IG9yIHJpZ2h0XHJcbiAqIEBuYW1lIHN0cmluZy5wYWRcclxuICogQG1ldGhvZFxyXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoIEZpbmFsIGxlbmd0aCBvZiB0aGUgdG90YWwgc3RyaW5nLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2hyIENoYXJhY3RlciB0byBwYWQgdGhlIHN0cmluZyB3aXRoLlxyXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtsZWZ0PWZhbHNlXSBQYWQgdG8gdGhlIGxlZnQgb2YgdGhlIHN0cmluZy5cclxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhZGRlZCBzdHJpbmdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwYWQocyxsZW5ndGgsY2hyLGxlZnQpe1xyXG5cdGlmIChsZWZ0PT09dW5kZWZpbmVkKSBsZWZ0ID0gZmFsc2U7XHJcblx0dmFyIGlMZW5TdHIgPSBzLmxlbmd0aFxyXG5cdFx0LGlMZW5QYWQgPSBsZW5ndGgtaUxlblN0clxyXG5cdFx0LGlMZW5DaHIgPSBjaHIubGVuZ3RoXHJcblx0XHQsYkN1dCA9IGlMZW5DaHI+MVxyXG5cdFx0LGlGaWxsID0gTWF0aC5tYXgoMCxiQ3V0P01hdGguY2VpbChpTGVuUGFkL2lMZW5DaHIpOmlMZW5QYWQpXHJcblx0XHQsYUZpbGwgPSBbXVxyXG5cdFx0LHNGaWxsXHJcblx0O1xyXG5cdGZvciAodmFyIGk9MDtpPGlGaWxsO2krKykgYUZpbGwucHVzaChjaHIpO1xyXG5cdHNGaWxsID0gYUZpbGwuam9pbignJyk7XHJcblx0aWYgKGJDdXQpIHNGaWxsID0gc0ZpbGwuc3Vic3RyKDAsaUxlblBhZCk7XHJcblx0cmV0dXJuIGxlZnQ/c0ZpbGwrczpzK3NGaWxsO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgc3RyaW5nIHRvIFhNTFxyXG4gKiBAbmFtZSBzdHJpbmcudG9YTUxcclxuICogQG1ldGhvZFxyXG4gKiBAcmV0dXJucyB7RG9jdW1lbnR9IFJldHVybnMgYW4gWE1MIERvY3VtZW50XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9YTUwocykge1xyXG5cdC8qIGdsb2JhbCBBY3RpdmVYT2JqZWN0ICovXHJcblx0dmFyIHhEb2M7XHJcblx0aWYgKHdpbmRvdy5BY3RpdmVYT2JqZWN0KSB7XHJcblx0XHR4RG9jID0gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxET00nKTtcclxuXHRcdHhEb2MuYXN5bmMgPSAnZmFsc2UnO1xyXG5cdFx0eERvYy5sb2FkWE1MKHMpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR4RG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzLCd0ZXh0L3htbCcpO1xyXG5cdH1cclxuXHRyZXR1cm4geERvYztcclxufVxyXG5cclxuLy8vKipcclxuLy8gKiBDb252ZXJ0cyBhbiBYTUwgc3RyaW5nIHRvIGFuIG9iamVjdFxyXG4vLyAqIEBuYW1lIHN0cmluZy50b1hNTE9ialxyXG4vLyAqIEBtZXRob2RcclxuLy8gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4vLyAqL1xyXG4vL2V4cG9ydCBmdW5jdGlvbiB0b1hNTE9iaihzKXtcclxuLy9cdGltcG9ydCB0b09iamVjdCBmcm9tICcuL25hdGl2ZS9ub2RlJzsgLy8gdG9kb1xyXG4vL1x0cmV0dXJuIHRvT2JqZWN0KHRvWE1MKHMpLmNoaWxkTm9kZXNbMF0pO1xyXG4vL31cclxuLy9cdFx0LyoqXHJcbi8vXHRcdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSwgYnV0IHByb25vdW5jZWFibGUgc3RyaW5nXHJcbi8vXHRcdCAqIEBuYW1lIHN0cmluZy5nZW5lcmF0ZVxyXG4vL1x0XHQgKiBAbWV0aG9kXHJcbi8vXHRcdCAqIEBwYXJhbSBsZW5ndGgge051bWJlcn0gTGVuZ3RoIG9mIHRoZSBzdHJpbmdcclxuLy9cdFx0ICogQHBhcmFtIGN1dCB7Qm9vbGVhbn0gQ3V0IHN0cmluZyB0byBsZW5ndGhcclxuLy9cdFx0ICogQHJldHVybnMge3N0cmluZ31cclxuLy9cdFx0ICovXHJcbi8vXHRcdCxnZW5lcmF0ZTogZnVuY3Rpb24obGVuZ3RoLGN1dCkge1xyXG4vL1x0XHRcdHZhciBpc0ludCA9IGZ1bmN0aW9uKG4pIHtcclxuLy9cdFx0XHRcdHJldHVybiAobiUxKT09PTA7XHJcbi8vXHRcdFx0fTtcclxuLy9cdFx0XHR2YXIgcmFuZCA9IGZ1bmN0aW9uKGZTdHIsZkVuZCkge1xyXG4vL1x0XHRcdFx0dmFyIGZOdW0gPSBmU3RyICsgTWF0aC5yYW5kb20oKSooZkVuZC1mU3RyKTtcclxuLy9cdFx0XHRcdHJldHVybiAoaXNJbnQoZlN0cikmJmlzSW50KGZFbmQpKT9NYXRoLnJvdW5kKGZOdW0pOmZOdW07XHJcbi8vXHRcdFx0fTtcclxuLy9cdFx0XHRpZiAobGVuZ3RoPT09dW5kZWZpbmVkKSBsZW5ndGggPSA2O1xyXG4vL1x0XHRcdGlmIChjdXQ9PT11bmRlZmluZWQpIGN1dCA9IGZhbHNlO1xyXG4vL1x0XHRcdHZhciBhTHRyID0gW1xyXG4vL1x0XHRcdFx0WydhJywnZScsJ2knLCdvJywndScsJ3knXVxyXG4vL1x0XHRcdFx0LFsnYWEnLCdhaScsJ2F1JywnZWEnLCdlZScsJ2VpJywnZXUnLCdpYScsJ2llJywnaW8nLCdpdScsJ29hJywnb2UnLCdvaScsJ3VhJywndWknXVxyXG4vL1x0XHRcdFx0LFsnYicsJ2MnLCdkJywnZicsJ2cnLCdoJywnaicsJ2snLCdsJywnbScsJ24nLCdwJywncScsJ3InLCdzJywndCcsJ3YnLCd3JywneCcsJ3onXVxyXG4vL1x0XHRcdFx0LFsnYmInLCdicicsJ2JzJywnY2MnLCdjaCcsJ2NsJywnY3InLCdkYicsJ2RkJywnZGYnLCdkZycsJ2RoJywnZGonLCdkaycsJ2RsJywnZG0nLCdkbicsJ2RwJywnZHEnLCdkcicsJ2RzJywnZHQnLCdkdicsJ2R3JywnZHonLCdmYicsJ2ZkJywnZmYnLCdmZycsJ2ZoJywnZmonLCdmaycsJ2ZsJywnZm0nLCdmbicsJ2ZwJywnZnEnLCdmcicsJ2ZzJywnZnQnLCdmdicsJ2Z3JywnZnonLCdnYicsJ2dkJywnZ2YnLCdnZycsJ2doJywnZ2onLCdnaycsJ2dsJywnZ20nLCdnbicsJ2dwJywnZ3EnLCdncicsJ2dzJywnZ3QnLCdndicsJ2d3JywnZ3onLCdrYicsJ2tkJywna2YnLCdrZycsJ2toJywna2onLCdraycsJ2tsJywna20nLCdrbicsJ2twJywna3EnLCdrcicsJ2tzJywna3QnLCdrdicsJ2t3Jywna3onLCdsYicsJ2xkJywnbGYnLCdsZycsJ2xoJywnbGonLCdsaycsJ2xsJywnbG0nLCdsbicsJ2xwJywnbHEnLCdscicsJ2xzJywnbHQnLCdsdicsJ2x3JywnbHonLCdtYicsJ21kJywnbWYnLCdtZycsJ21oJywnbWonLCdtaycsJ21sJywnbW0nLCdtbicsJ21wJywnbXEnLCdtcicsJ21zJywnbXQnLCdtdicsJ213JywnbXonLCduYicsJ25kJywnbmYnLCduZycsJ25oJywnbmonLCduaycsJ25sJywnbm0nLCdubicsJ25wJywnbnEnLCducicsJ25zJywnbnQnLCdudicsJ253JywnbnonLCdwYicsJ3BkJywncGYnLCdwZycsJ3BoJywncGonLCdwaycsJ3BsJywncG0nLCdwbicsJ3BwJywncHEnLCdwcicsJ3BzJywncHQnLCdwdicsJ3B3JywncHonLCdxYicsJ3FkJywncWYnLCdxZycsJ3FoJywncWonLCdxaycsJ3FsJywncW0nLCdxbicsJ3FwJywncXEnLCdxcicsJ3FzJywncXQnLCdxdicsJ3F3JywncXonLCdyYicsJ3JkJywncmYnLCdyZycsJ3JoJywncmonLCdyaycsJ3JsJywncm0nLCdybicsJ3JwJywncnEnLCdycicsJ3JzJywncnQnLCdydicsJ3J3JywncnonLCdzYicsJ3NjJywnc2QnLCdzZicsJ3NnJywnc2gnLCdzaicsJ3NrJywnc2wnLCdzbScsJ3NuJywnc3AnLCdzcScsJ3NyJywnc3MnLCdzdCcsJ3N2Jywnc3cnLCdzeicsJ3RiJywndGQnLCd0ZicsJ3RnJywndGgnLCd0aicsJ3RrJywndGwnLCd0bScsJ3RuJywndHAnLCd0cScsJ3RyJywndHMnLCd0dCcsJ3R2JywndHcnLCd0eicsJ3ZiJywndmQnLCd2ZicsJ3ZnJywndmgnLCd2aicsJ3ZrJywndmwnLCd2bScsJ3ZuJywndnAnLCd2cScsJ3ZyJywndnMnLCd2dCcsJ3Z2JywndncnLCd2eicsJ3hiJywneGQnLCd4ZicsJ3hnJywneGgnLCd4aicsJ3hrJywneGwnLCd4bScsJ3huJywneHAnLCd4cScsJ3hyJywneHMnLCd4dCcsJ3h2JywneHcnLCd4eCcsJ3h6J11cclxuLy9cdFx0XHRdO1xyXG4vL1x0XHRcdHZhciBpU25tID0gNjtcclxuLy9cdFx0XHR2YXIgc1BzdyA9IFwiXCI7XHJcbi8vXHRcdFx0dmFyIGlOdW0gPSAwO1xyXG4vL1x0XHRcdGZvciAodmFyIGk9MDtpPGlTbm07aSsrKSB7XHJcbi8vXHRcdFx0XHRpZiAoaT09PTApXHRcdFx0aU51bSA9IHJhbmQoMCwyKTtcclxuLy9cdFx0XHRcdGVsc2UgaWYgKGk9PWlTbm0tMSlcdGlOdW0gPSAoaU51bTwyKT8yOnJhbmQoMCwxKTtcclxuLy9cdFx0XHRcdGVsc2VcdFx0XHRcdGlOdW0gPSAoaU51bTwyKT9yYW5kKDAsMSkrMjpyYW5kKDAsMSk7XHJcbi8vXHRcdFx0XHR2YXIgYUxzdCA9IGFMdHJbaU51bV07XHJcbi8vXHRcdFx0XHRzUHN3ICs9IGFMc3RbIHJhbmQoMCxhTHN0Lmxlbmd0aC0xKSBdO1xyXG4vL1x0XHRcdH1cclxuLy9cdFx0XHRyZXR1cm4gY3V0P3NQc3cuc3Vic3RyKDAsbGVuZ3RoKTpzUHN3O1xyXG4vL1x0XHR9XHJcbi8qKlxyXG4gKiBDYXBpdGFsaXplcyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBzdHJpbmdcclxuICogQG5hbWUgc3RyaW5nLm5hbWVDYXNlXHJcbiAqIEBtZXRob2RcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuYW1lQ2FzZShzKXtcclxuXHRyZXR1cm4gKCctJytzKS5yZXBsYWNlKC9bX1xcc1xcLV1bYS16XS9nLCBmdW5jdGlvbigkMSl7cmV0dXJuICQxLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgnLScsJyAnKS5yZXBsYWNlKCdfJywnICcpO30pLnN1YnN0cigxKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBzdHJpbmcgdG8gY2FtZWxDYXNlIG5vdGF0aW9uXHJcbiAqIEBuYW1lIHN0cmluZy5jYW1lbENhc2VcclxuICogQG1ldGhvZFxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzKXtcclxuXHRyZXR1cm4gcy5yZXBsYWNlKC9bX1xcc1xcLV1bYS16XS9nLCBmdW5jdGlvbigkMSl7cmV0dXJuICQxLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgnLScsJycpLnJlcGxhY2UoJyAnLCcnKS5yZXBsYWNlKCdfJywnJyk7fSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgc3RyaW5nIHRvIGRhc2hlZCBub3RhdGlvblxyXG4gKiBAbmFtZSBzdHJpbmcuZGFzaFxyXG4gKiBAbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGFzaChzKXtcclxuXHR2YXIgc0NhbWVsID0gcy5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbigkMSl7cmV0dXJuIFwiLVwiKyQxLnRvTG93ZXJDYXNlKCk7fSk7XHJcblx0dmFyIHNVblNwYyA9IHMucmVwbGFjZSgvW1xcc19dL2csICctJyk7XHJcblx0cmV0dXJuIHM9PXNDYW1lbD9zVW5TcGM6c0NhbWVsO1xyXG59XHJcblxyXG4vKipcclxuICogQ29udmVydHMgdGhlIHN0cmluZyB0byB1bmRlcnNjb3JlZCBub3RhdGlvblxyXG4gKiBAbmFtZSBzdHJpbmcudW5kZXJzY29yZVxyXG4gKiBAbWV0aG9kXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdW5kZXJzY29yZShzKXtcclxuXHR2YXIgc0NhbWVsID0gcy5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbigkMSl7cmV0dXJuIFwiX1wiKyQxLnRvTG93ZXJDYXNlKCk7fSk7XHJcblx0dmFyIHNVblNwYyA9IHMucmVwbGFjZSgvW1xcc1xcLV0vZywgJ18nKTtcclxuXHRyZXR1cm4gcz09c0NhbWVsP3NVblNwYzpzQ2FtZWw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIG1pbmltYWwgdmVyc2lvbiBvZiBzcHJpbnRmLiBSZXBsYWNlcyB2YXJpYWJsZXMgaW4gYSBzdHJpbmcgd2l0aCB0aGUgYXJndW1lbnRzLiBWYXJpYWJsZXMgYXJlIGxpa2UgJTEkcyBhbmQgc3RhcnQgYXQgMS5cclxuICogQHBhcmFtIHsoc3RyaW5nfHN0cmluZ1tdKX0gW3JlcGxhY2VtZW50c10gV2UncmUgdGhlIHJlcGxhY2VtZW50c1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNwcmludGYocyl7XHJcblx0dmFyIGFNYXRjaCA9IHMubWF0Y2goLyglXFxkK1xcJHMpL2dpKTtcclxuXHRpZiAoYU1hdGNoKSBmb3IgKHZhciBpPTAsbD1hTWF0Y2gubGVuZ3RoO2k8bDtpKyspIHMgPSBzLnJlcGxhY2UobmV3IFJlZ0V4cCgnKFxcXFwlJysoaSsxKSsnXFxcXCRzKScsJ2cnKSxhcmd1bWVudHNbaV0pO1xyXG5cdHJldHVybiBzO1xyXG59XHJcblxyXG4vKipcclxuICogVGVzdCBpZiBhIHN0cmluZyBpcyBhbiB1cmxcclxuICogQHBhcmFtIHtib29sZWFufSBbc3RyaWN0PXRydWVdIE5vbi1zdHJpY3QgZm9yIHVybHMgd2l0aG91dCBwcm90b2NvbCwgaWU6IHd3dy5nb29nbGUuY29tXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVXJsKHMsc3RyaWN0KSB7XHJcblx0dmFyIHJ4VXJsID0gbmV3IFJlZ0V4cChzdHJpY3Q9PT11bmRlZmluZWR8fHN0cmljdD9cclxuXHRcdFx0XCJeKChodHRwfGh0dHBzfGZ0cCk6KT8vLyhbYS16QS1aMC05Li1dKyg6W2EtekEtWjAtOS4mYW1wOyUkLV0rKSpAKSooKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFsxLTldKS4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV18MCkuKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFsxLTldfDApLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMC05XSl8KFthLXpBLVowLTktXSsuKSpbYS16QS1aMC05LV0rLihjb218ZWR1fGdvdnxpbnR8bWlsfG5ldHxvcmd8Yml6fGFycGF8aW5mb3xuYW1lfHByb3xhZXJvfGNvb3B8bXVzZXVtfFthLXpBLVpdezJ9KSkoOlswLTldKykqKC8oJHxbYS16QS1aMC05Liw/XFwnXFxcXCsmYW1wOyUkIz1+Xy1dKykpKiRcIlxyXG5cdFx0XHQ6XCJeKCgoaHR0cHxodHRwc3xmdHApOik/Ly8pPyhbYS16QS1aMC05Li1dKyg6W2EtekEtWjAtOS4mYW1wOyUkLV0rKSpAKSooKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFsxLTldKS4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV18MCkuKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFsxLTldfDApLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMC05XSl8KFthLXpBLVowLTktXSsuKSpbYS16QS1aMC05LV0rLihjb218ZWR1fGdvdnxpbnR8bWlsfG5ldHxvcmd8Yml6fGFycGF8aW5mb3xuYW1lfHByb3xhZXJvfGNvb3B8bXVzZXVtfFthLXpBLVpdezJ9KSkoOlswLTldKykqKC8oJHxbYS16QS1aMC05Liw/XFwnXFxcXCsmYW1wOyUkIz1+Xy1dKykpKiRcIlxyXG5cdFx0KTtcclxuXHRyZXR1cm4gcnhVcmwudGVzdChzKTtcclxufVxyXG5cclxuLy8gdG9kbzogZG9jLCBodHRwOi8vd2VyeGx0ZC5jb20vd3AvMjAxMC8wNS8xMy9qYXZhc2NyaXB0LWltcGxlbWVudGF0aW9uLW9mLWphdmFzLXN0cmluZy1oYXNoY29kZS1tZXRob2QvXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNoQ29kZShzKXtcclxuXHR2YXIgc0hhc2ggPSAwO1xyXG5cdGlmIChzLmxlbmd0aD09PTApIHJldHVybiBzSGFzaDtcclxuXHRmb3IgKHZhciBpPTAsIGw9cy5sZW5ndGg7IGk8bDsgaSsrKSB7XHJcblx0XHR2YXIgc0NoYXIgPSBzLmNoYXJDb2RlQXQoaSk7XHJcblx0XHRzSGFzaCA9ICgoc0hhc2g8PDUpLXNIYXNoKStzQ2hhcjtcclxuXHRcdHNIYXNoID0gc0hhc2gmc0hhc2g7XHJcblx0fVxyXG5cdHJldHVybiBzSGFzaDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFR1cm4gYSB0aXRsZSBpbnRvIGEgc2x1Z1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvU2x1ZyhzKSB7XHJcblx0dmFyIHN0ciA9IHMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywnJykudG9Mb3dlckNhc2UoKVxyXG5cdFx0Ly8gcmVtb3ZlIGFjY2VudHMsIHN3YXAgw7EgZm9yIG4sIGV0Y1xyXG5cdFx0LGZyb20gPSBcIsOgw6HDpMOiw6jDqcOrw6rDrMOtw6/DrsOyw7PDtsO0w7nDusO8w7vDscOnwrcvXyw6O1wiXHJcblx0XHQsdG8gPSBcImFhYWFlZWVlaWlpaW9vb291dXV1bmMtLS0tLS1cIlxyXG5cdDtcclxuXHRmb3IgKHZhciBpID0gMCwgbCA9IGZyb20ubGVuZ3RoOyBpPGw7IGkrKykge1xyXG5cdFx0c3RyID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChmcm9tLmNoYXJBdChpKSwnZycpLHRvLmNoYXJBdChpKSk7XHJcblx0fVxyXG5cdHN0ciA9IHN0ci5yZXBsYWNlKC9bXmEtejAtOSAtXS9nLCcnKSAvLyByZW1vdmUgaW52YWxpZCBjaGFyc1xyXG5cdFx0LnJlcGxhY2UoL1xccysvZywnLScpIC8vIGNvbGxhcHNlIHdoaXRlc3BhY2UgYW5kIHJlcGxhY2UgYnkgLVxyXG5cdFx0LnJlcGxhY2UoLy0rL2csJy0nKTsgLy8gY29sbGFwc2UgZGFzaGVzXHJcblxyXG5cdHJldHVybiBzdHI7XHJcbn0iLCIvKipcclxuICogVHlwZSBjaGVja2luZywgYWxzbyBjaGVja3MgdW50eXBlZCB0eXBlcyBsaWtlIGludGVnZXIgYW5kIGZsb2F0LlxyXG4gKiBAbW9kdWxlIHR5cGVcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSB7Kn0gb2JqXHJcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBjb25zdGFudCwgaWU6IGlkZHFkLnR5cGUuQk9PTEVBTlxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5VTkRFRklORURcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuTlVMTFxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5PQkpFQ1RcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuQVJSQVlcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuTk9ERVxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5FVkVOVFxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5GVU5DVElPTlxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5TVFJJTkdcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuQk9PTEVBTlxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5JTlRcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuRkxPQVRcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuTkFOXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLklORklOSVRFXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLlJFR0VYUFxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5EQVRFXHJcbiAqIEBleGFtcGxlXHJcbiB0eXBlKDApPT09dHlwZS5JTlQ7XHJcbiB0eXBlKCcnKT09PXR5cGUuU1RSSU5HO1xyXG4gdHlwZShudWxsKT09PXR5cGUuTlVMTDtcclxuIHR5cGUoe30pPT09dHlwZS5PQkpFQ1Q7XHJcbiAqL1xyXG5cdC8vIHVzaW5nIG9iamVjdHMgZm9yIGNvbnN0YW50cyBmb3Igc3BlZWQgKHNlZSBodHRwOi8vanNwZXJmLmNvbS9lcXVhbGl0eS1jaGVja2luZy1kaWZmZXJlbnQtdHlwZXMpXHJcbnZhciAgVU5ERUZJTkVEID1cdGdldENvbnN0YW50KCd1bmRlZmluZWQnKVxyXG5cdCxOVUxMID1cdFx0XHRnZXRDb25zdGFudCgnbnVsbCcpXHJcblx0LE9CSkVDVCA9XHRcdGdldENvbnN0YW50KCdvYmplY3QnKVxyXG5cdCxBUlJBWSA9XHRcdGdldENvbnN0YW50KCdhcnJheScpXHJcblx0LE5PREUgPVx0XHRcdGdldENvbnN0YW50KCdub2RlJylcclxuXHQsRVZFTlQgPVx0XHRnZXRDb25zdGFudCgnZXZlbnQnKVxyXG5cdCxGVU5DVElPTiA9XHRcdGdldENvbnN0YW50KCdmdW5jdGlvbicpXHJcblx0LFNUUklORyA9XHRcdGdldENvbnN0YW50KCdzdHJpbmcnKVxyXG5cdCxCT09MRUFOID1cdFx0Z2V0Q29uc3RhbnQoJ2Jvb2xlYW4nKVxyXG5cdCxJTlQgPVx0XHRcdGdldENvbnN0YW50KCdpbnQnKVxyXG5cdCxGTE9BVCA9XHRcdGdldENvbnN0YW50KCdmbG9hdCcpXHJcblx0LE5BTiA9XHRcdFx0Z2V0Q29uc3RhbnQoJ05hTicpXHJcblx0LElORklOSVRFID1cdFx0Z2V0Q29uc3RhbnQoJ0luZmluaXRlJylcclxuXHQsUkVHRVhQID1cdFx0Z2V0Q29uc3RhbnQoJ3JlZ2V4cCcpXHJcblx0LERBVEUgPVx0XHRcdGdldENvbnN0YW50KCdkYXRlJylcclxuXHQvLyBFcnJvclxyXG5cdCxhRXZlbnRQcm9wZXJ0aWVzID0gW1xyXG5cdFx0J2V2ZW50UGhhc2UnXHJcblx0XHQsJ2N1cnJlbnRUYXJnZXQnXHJcblx0XHQsJ2NhbmNlbGFibGUnXHJcblx0XHQsJ3RhcmdldCdcclxuXHRcdCwnYnViYmxlcydcclxuXHRcdCwndHlwZSdcclxuXHRcdCwnY2FuY2VsQnViYmxlJ1xyXG5cdFx0LCdzcmNFbGVtZW50J1xyXG5cdFx0LCdkZWZhdWx0UHJldmVudGVkJ1xyXG5cdFx0LCd0aW1lU3RhbXAnXHJcblx0XVxyXG47XHJcbmZ1bmN0aW9uIGdldENvbnN0YW50KG5hbWUpIHtcclxuXHR2YXIgb0NvbnN0YW50ID0ge3RvU3RyaW5nOiBmdW5jdGlvbigpIHtyZXR1cm4gbmFtZTt9fVxyXG5cdFx0LHNDb25zdGFudCA9IG5hbWUudG9VcHBlckNhc2UoKTtcclxuXHR0eXBlW3NDb25zdGFudF0gPSBvQ29uc3RhbnQ7XHJcblx0cmV0dXJuIG9Db25zdGFudDtcclxufVxyXG5mdW5jdGlvbiB0eXBlKG9iaikge1xyXG5cdHZhciBpVHlwZSA9IC0xO1xyXG5cdGlmIChvYmo9PT1udWxsKSB7XHJcblx0XHRpVHlwZSA9IE5VTEw7XHJcblx0fSBlbHNlIGlmIChvYmo9PT11bmRlZmluZWQpIHtcclxuXHRcdGlUeXBlID0gVU5ERUZJTkVEO1xyXG5cdH0gZWxzZSB7IC8vIHRvZG86IGh0dHA6Ly9qc3BlcmYuY29tL3Rlc3RpbmctdHlwZXNcclxuXHRcdHN3aXRjaCAodHlwZW9mKG9iaikpe1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0dmFyIGMgPSBvYmouY29uc3RydWN0b3I7XHJcblx0XHRcdGlmIChjPT09QXJyYXkpIGlUeXBlID0gQVJSQVk7XHJcblx0XHRcdGVsc2UgaWYgKGM9PT1SZWdFeHApIGlUeXBlID0gUkVHRVhQO1xyXG5cdFx0XHRlbHNlIGlmIChjPT09RGF0ZSkgaVR5cGUgPSBEQVRFO1xyXG5cdFx0XHRlbHNlIGlmIChvYmoub3duZXJEb2N1bWVudCE9PXVuZGVmaW5lZCkgaVR5cGUgPSBOT0RFO1xyXG5cdFx0XHRlbHNlIGlmICgoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgaXNFdmVudCA9IHRydWU7XHJcblx0XHRcdFx0Zm9yICh2YXIgcyBpbiBhRXZlbnRQcm9wZXJ0aWVzKSB7XHJcblx0XHRcdFx0XHRpZiAoYUV2ZW50UHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShzKSkge1xyXG5cdFx0XHRcdFx0XHRpZiAob2JqW2FFdmVudFByb3BlcnRpZXNbc11dPT09dW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0XHRcdFx0aXNFdmVudCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBpc0V2ZW50O1xyXG5cdFx0XHR9KSgpKSBpVHlwZSA9IEVWRU5UO1xyXG5cdFx0XHRlbHNlIGlUeXBlID0gT0JKRUNUO1xyXG5cdFx0YnJlYWs7XHJcblx0XHRjYXNlICdmdW5jdGlvbic6IGlUeXBlID0gRlVOQ1RJT047IGJyZWFrO1xyXG5cdFx0Y2FzZSAnc3RyaW5nJzogaVR5cGUgPSBTVFJJTkc7IGJyZWFrO1xyXG5cdFx0Y2FzZSAnYm9vbGVhbic6IGlUeXBlID0gQk9PTEVBTjsgYnJlYWs7XHJcblx0XHRjYXNlICdudW1iZXInOlxyXG5cdFx0XHRpZiAoaXNOYU4ob2JqKSkge1xyXG5cdFx0XHRcdGlUeXBlID0gTkFOO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCFpc0Zpbml0ZShvYmopKSB7XHJcblx0XHRcdFx0aVR5cGUgPSBJTkZJTklURTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRpVHlwZSA9IG9iaj09TWF0aC5mbG9vcihvYmopP0lOVDpGTE9BVDtcclxuXHRcdFx0fVxyXG5cdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBpVHlwZTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCB0eXBlOyIsImltcG9ydCAnLi90ZXN0VHlwZSc7XHJcbmltcG9ydCAnLi90ZXN0TmFtZXNwYWNlJzsvLyB0b2RvOiBvdGhlciBpZGRxZFxyXG5pbXBvcnQgJy4vdGVzdENhcGFiaWxpdGllcyc7XHJcbmltcG9ydCAnLi90ZXN0RW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgJy4vdGVzdE5vZGUnO1xyXG5pbXBvcnQgJy4vdGVzdFN0cmluZyc7XHJcblxyXG4vKlxyXG4oZnVuY3Rpb24oKXtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0UVVuaXQuY29uZmlnLmhpZGVwYXNzZWQgPSB0cnVlO1xyXG5cdHZhciBzU291cmNlUGF0aCA9ICcuLi8uLi9zcmMvJ1xyXG5cdFx0LHNUZXN0UHJlZml4ID0gJ3Rlc3QtJ1xyXG5cdFx0LGFUZXN0cyA9IFtcclxuXHRcdFx0J2lkZHFkLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLnR5cGUuanMnXHJcblx0XHRcdCwnaWRkcWQuY2FwYWJpbGl0aWVzLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmVudmlyb25tZW50LmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLmhvc3Qubm9kZS5qcydcclxuXHRcdFx0LCdpZGRxZC5pbnRlcm5hbC5uYXRpdmUuc3RyaW5nLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLm5hdGl2ZS5hcnJheS5qcydcclxuXHRcdFx0LCdpZGRxZC5pbnRlcm5hbC5uYXRpdmUubnVtYmVyLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLm5hdGl2ZS5vYmplY3QuanMnXHJcblx0XHRcdCwnaWRkcWQuaW50ZXJuYWwubmF0aXZlLmRhdGUuanMnXHJcblx0XHRcdCwnaWRkcWQubWF0aC5jb2xvci5qcydcclxuXHRcdFx0LCdpZGRxZC5tYXRoLnBybmcuanMnXHJcblx0XHRcdCwnaWRkcWQubWF0aC52ZWN0b3IuanMnXHJcblx0XHRcdCwnaWRkcWQubmV0d29yay5qc29ucC5qcydcclxuXHRcdFx0LCdpZGRxZC5wYXR0ZXJuLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLnN0b3JhZ2UuanMnXHJcblx0XHRcdCwnaWRkcWQuc3RvcmFnZS5jb29raWUuanMnXHJcblx0XHRcdCwnaWRkcWQuc2lnbmFsLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmltYWdlLmpzJ1xyXG5cdFx0XTtcclxuXHRhVGVzdHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcclxuXHRcdC8hKmpzbGludCBldmlsOiB0cnVlICohL1xyXG5cdFx0ZG9jdW1lbnQud3JpdGUoJzxzY3JpcHQgc3JjPVwiJytzU291cmNlUGF0aCtuYW1lKydcIj48L3NjcmlwdD4nKTtcclxuXHRcdGRvY3VtZW50LndyaXRlKCc8c2NyaXB0IHNyYz1cIicrc1Rlc3RQcmVmaXgrbmFtZSsnXCI+PC9zY3JpcHQ+Jyk7XHJcblx0fSk7XHJcbn0pKCk7Ki9cclxuIiwiLypnbG9iYWwgUVVuaXQsdGVzdCxvayovXHJcbmltcG9ydCBjYXBhYmlsaXRpZXMgZnJvbSAnLi8uLi8uLi8uLi9zcmMvY2FwYWJpbGl0aWVzJztcclxuaW1wb3J0IHR5cGUgZnJvbSAnLi8uLi8uLi8uLi9zcmMvdHlwZSc7XHJcblFVbml0Lm1vZHVsZSgnY2FwYWJpbGl0aWVzJyk7XHJcbnRlc3QoJ3N0YW5kYWxvbmUnLCBmdW5jdGlvbigpIHtcclxuXHRvayh0eXBlKGNhcGFiaWxpdGllcy5zdGFuZGFsb25lKT09PXR5cGUuQk9PTEVBTiwnc3RhbmRhbG9uZScpO1xyXG59KTsiLCIvKmdsb2JhbCBRVW5pdCx0ZXN0LG9rKi9cclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJy4vLi4vLi4vLi4vc3JjL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHR5cGUgZnJvbSAnLi8uLi8uLi8uLi9zcmMvdHlwZSc7XHJcblxyXG5RVW5pdC5tb2R1bGUoJ2Vudmlyb25tZW50Jyk7XHJcbnRlc3QoJ2Vudmlyb25tZW50JywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIEJPT0xFQU4gPSB0eXBlLkJPT0xFQU47XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0lQYWQpPT09Qk9PTEVBTiwnaXNJUGFkJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0lQaG9uZSk9PT1CT09MRUFOLCdpc0lQaG9uZScpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuaXNJUG9kKT09PUJPT0xFQU4sJ2lzSVBvZCcpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuaXNBbmRyb2lkKT09PUJPT0xFQU4sJ2lzQW5kcm9pZCcpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuaXNCbGFja0JlcnJ5KT09PUJPT0xFQU4sJ2lzQmxhY2tCZXJyeScpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuaXNJRU1vYmlsZSk9PT1CT09MRUFOLCdpc0lFTW9iaWxlJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0lPUyk9PT1CT09MRUFOLCdpc0lPUycpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuaXNNb2JpbGUpPT09Qk9PTEVBTiwnaXNNb2JpbGUnKTtcclxuXHRvayh0eXBlKGVudmlyb25tZW50LnN0YW5kYWxvbmUpPT09Qk9PTEVBTiwnc3RhbmRhbG9uZScpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuYWRkQ2xhc3NOYW1lcykhPT1CT09MRUFOLCdhZGRDbGFzc05hbWVzJyk7XHJcbn0pOyIsIi8qZ2xvYmFsIFFVbml0LHRlc3Qsb2sqL1xyXG5pbXBvcnQgbmFtZXNwYWNlIGZyb20gJy4vLi4vLi4vLi4vc3JjL25hbWVzcGFjZSc7XHJcblFVbml0Lm1vZHVsZSgnbmFtZXNwYWNlJyk7XHJcbnRlc3QoJ2lkZHFkLm5zJywgZnVuY3Rpb24oKXtcclxuXHQvKmdsb2JhbCAgXHRhKi9cclxuXHRvaygobmFtZXNwYWNlKCdhJyx7Yjp7fSxjOnRydWV9KSxhLmMpLCduYW1lc3BhY2UgY3JlYXRlJyk7XHJcblx0b2soKG5hbWVzcGFjZSgnYS5iLmMnLHtkOnRydWV9KSxhLmIuYy5kKSwnbmFtZXNwYWNlIGFwcGVuZCcpO1xyXG5cdC8vb2soKG5hbWVzcGFjZSgnYS5iJyx7ZDp0cnVlfSksYS5iLmQpLCduYW1lc3BhY2Ugb3ZlcndyaXRlJyk7XHJcbn0pOyIsIi8qZ2xvYmFsIFFVbml0LHRlc3Qsb2sqL1xyXG5pbXBvcnQgKiBhcyBub2RlIGZyb20gJy4vLi4vLi4vLi4vc3JjL25hdGl2ZS9ub2RlJztcclxuUVVuaXQubW9kdWxlKCdub2RlJyk7XHJcbnRlc3QoJ25vZGUnLCBmdW5jdGlvbigpIHtcclxuXHRvayghIW5vZGUsJ3RvZG8nKTsvL3RvZG86dGVzdFxyXG59KTtcclxuIiwiLypnbG9iYWwgUVVuaXQsdGVzdCxvayovXHJcbmltcG9ydCAqIGFzIHN0cmluZyBmcm9tICcuLy4uLy4uLy4uL3NyYy9uYXRpdmUvc3RyaW5nJztcclxuLy9pbXBvcnQgdHlwZSBmcm9tICcuLy4uLy4uLy4uL3NyYy90eXBlJztcclxuXHJcblFVbml0Lm1vZHVsZSgnc3RyaW5nJyk7XHJcbnRlc3QoJ3BhZCcsIGZ1bmN0aW9uKCkge1xyXG5cdHZhciBwYWQgPSBzdHJpbmcucGFkO1xyXG5cdG9rKHBhZCgnYScsMywnYicpPT09J2FiYicsJ3BhZCcpO1xyXG5cdG9rKHBhZCgnYScsMywnYmMnKT09PSdhYmMnLCdwYWQnKTtcclxuXHRvayhwYWQoJ2EnLDMsJ2InLHRydWUpPT09J2JiYScsJ3BhZCBsZWZ0Jyk7XHJcblx0b2socGFkKCdhYWMnLDMsJ2InKT09PSdhYWMnLCdwYWQnKTtcclxuXHRvayhwYWQoJ2FhYWMnLDMsJ2InKT09PSdhYWFjJywncGFkJyk7XHJcbn0pO1xyXG50ZXN0KCd0b1R5cGUnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgdG9UeXBlID0gc3RyaW5nLnRvVHlwZTtcclxuXHRvayh0b1R5cGUoJ2EnKT09PSdhJywndG9UeXBlIHN0cmluZycpO1xyXG5cdG9rKHRvVHlwZSgnMScpPT09MSwndG9UeXBlIG51bWJlcicpO1xyXG5cdG9rKHRvVHlwZSgnMC4xJyk9PT0wLjEsJ3RvVHlwZSBudW1iZXInKTtcclxuXHRvayh0b1R5cGUoJ3RydWUnKT09PXRydWUsJ3RvVHlwZSBib29sZWFuJyk7XHJcbn0pO1xyXG50ZXN0KCd0b1hNTCcsIGZ1bmN0aW9uKCkge1xyXG5cdG9rKCEhc3RyaW5nLnRvWE1MKCc8Zm9vIGJhcj1cImJhelwiPnF1eDwvZm9vPicpLCd0b1hNTCcpO1xyXG59KTtcclxuLy90ZXN0KCd0b1hNTE9iaicsIGZ1bmN0aW9uKCkge1xyXG4vL1x0Ly9jb25zb2xlLmxvZygndG9YTUwnLHN0cmluZy50b1hNTCgnPGZvbyBiYXI9XCJiYXpcIj5xdXg8L2Zvbz4nKSk7IC8vIGxvZylcclxuLy9cdC8vY29uc29sZS5sb2coJ3RvWE1MT2JqJyxzdHJpbmcudG9YTUxPYmooJzxmb28gYmFyPVwiYmF6XCI+cXV4PC9mb28+JykpOyAvLyBsb2cpXHJcbi8vXHRvayhzdHJpbmcudG9YTUxPYmooJzxmb28gYmFyPVwiYmF6XCI+cXV4PC9mb28+JykuYmFyPT09J2JheicsJ3RvWE1MT2JqJyk7XHJcbi8vfSk7XHJcbi8vdGVzdCgnZ2VuZXJhdGUnLCBmdW5jdGlvbigpIHtcclxuLy9cdG9rKCEhc3RyaW5nLmdlbmVyYXRlKCksJ2dlbmVyYXRlJyk7XHJcbi8vfSk7XHJcbnRlc3QoJ25hbWVDYXNlJywgZnVuY3Rpb24oKSB7XHJcblx0b2soc3RyaW5nLm5hbWVDYXNlKCdmb28gYmFyJyk9PT0nRm9vIEJhcicsJ25hbWVDYXNlJyk7XHJcbn0pO1xyXG50ZXN0KCdjYW1lbENhc2UnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgY2FtZWxDYXNlID0gc3RyaW5nLmNhbWVsQ2FzZTtcclxuXHRvayhjYW1lbENhc2UoJ2ZvbyBiYXIgYmF6Jyk9PT0nZm9vQmFyQmF6JywnY2FtZWxDYXNlJyk7XHJcblx0b2soY2FtZWxDYXNlKCdmb28tYmFyLWJheicpPT09J2Zvb0JhckJheicsJ2NhbWVsQ2FzZScpO1xyXG5cdG9rKGNhbWVsQ2FzZSgnZm9vX2Jhcl9iYXonKT09PSdmb29CYXJCYXonLCdjYW1lbENhc2UnKTtcclxufSk7XHJcbnRlc3QoJ2Rhc2gnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgZGFzaCA9IHN0cmluZy5kYXNoO1xyXG5cdG9rKGRhc2goJ2ZvbyBiYXIgYmF6Jyk9PT0nZm9vLWJhci1iYXonLCdkYXNoJyk7XHJcblx0b2soZGFzaCgnZm9vQmFyQmF6Jyk9PT0nZm9vLWJhci1iYXonLCdkYXNoJyk7XHJcblx0b2soZGFzaCgnZm9vX2Jhcl9iYXonKT09PSdmb28tYmFyLWJheicsJ2Rhc2gnKTtcclxufSk7XHJcbnRlc3QoJ3VuZGVyc2NvcmUnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgdW5kZXJzY29yZSA9IHN0cmluZy51bmRlcnNjb3JlO1xyXG5cdG9rKHVuZGVyc2NvcmUoJ2ZvbyBiYXIgYmF6Jyk9PT0nZm9vX2Jhcl9iYXonLCd1bmRlcnNjb3JlJyk7XHJcblx0b2sodW5kZXJzY29yZSgnZm9vQmFyQmF6Jyk9PT0nZm9vX2Jhcl9iYXonLCd1bmRlcnNjb3JlJyk7XHJcblx0b2sodW5kZXJzY29yZSgnZm9vLWJhci1iYXonKT09PSdmb29fYmFyX2JheicsJ3VuZGVyc2NvcmUnKTtcclxufSk7XHJcbnRlc3QoJ2F1Z21lbnQnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgcGFkID0gc3RyaW5nLnBhZDtcclxuXHRvayhwYWQoJ2EnLDMsJ2InKT09PSdhYmInLCdwYWQnKTtcclxuXHRvayhwYWQoJ2EnLDMsJ2JjJyk9PT0nYWJjJywncGFkJyk7XHJcblx0b2socGFkKCdhJywzLCdiJyx0cnVlKT09PSdiYmEnLCdwYWQgbGVmdCcpO1xyXG5cdG9rKHBhZCgnYWFjJywzLCdiJyk9PT0nYWFjJywncGFkJyk7XHJcblx0b2socGFkKCdhYWFjJywzLCdiJyk9PT0nYWFhYycsJ3BhZCcpO1xyXG59KTtcclxudGVzdCgnaXNVcmwnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgaXNVcmwgPSBzdHJpbmcuaXNVcmw7XHJcblx0b2soaXNVcmwoJ2ZvbyBiYXIgYmF6Jyk9PT1mYWxzZSwnbm90IHVybCcpO1xyXG5cdG9rKGlzVXJsKCcvL21heGNkbi5ib290c3RyYXBjZG4uY29tL2Jvb3RzdHJhcC8zLjMuMS9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnKT09PXRydWUsJ0NETiB1cmwnKTtcclxuXHRvayhpc1VybCgnaHR0cHM6Ly9nbWFpbC5jb20vJyk9PT10cnVlLCdodHRwcyB1cmwnKTtcclxuXHRvayhpc1VybCgnaHR0cDovL2dvb2dsZS5jb20vJyk9PT10cnVlLCdodHRwIHVybCcpO1xyXG5cdG9rKGlzVXJsKCd3d3cuZmlsbWFjYWRlbWllLm5sJyk9PT1mYWxzZSwnaW52YWxpZCBzdHJpY3QnKTtcclxuXHRvayhpc1VybCgnd3d3LmZpbG1hY2FkZW1pZS5ubCcsZmFsc2UpPT09dHJ1ZSwndmFsaWQgbm9uLXN0cmljdCcpO1xyXG59KTtcclxudGVzdCgndG9TbHVnJywgZnVuY3Rpb24oKSB7XHJcblx0dmFyIHRvU2x1ZyA9IHN0cmluZy50b1NsdWc7XHJcblx0b2sodG9TbHVnKCdGb28gYu+/vXIgYkF6PycpPT09J2Zvby1iYXItYmF6JywnRm9vIGLvv71yIGJBeicpO1xyXG59KTtcclxudGVzdCgnbm9ybWFsaXplJywgZnVuY3Rpb24oKSB7XHJcblx0b2soc3RyaW5nLmNhbWVsQ2FzZSgnZm9vIGJhciBiYXonKT09PSdmb29CYXJCYXonLCdub3JtYWxpemUnKTtcclxufSk7IiwiLypnbG9iYWwgUVVuaXQsdGVzdCxvayovXHJcbmltcG9ydCB0eXBlIGZyb20gJy4vLi4vLi4vLi4vc3JjL3R5cGUnO1xyXG5cclxuUVVuaXQubW9kdWxlKCd0eXBlJyk7XHJcbnRlc3QoJ3VuZGVmaW5lZCcsb2suYmluZChudWxsLHR5cGUodW5kZWZpbmVkKT09PXR5cGUuVU5ERUZJTkVELCd1bmRlZmluZWQnKSk7XHJcbnRlc3QoJ251bGwnLG9rLmJpbmQobnVsbCx0eXBlKG51bGwpPT09dHlwZS5OVUxMLCdudWxsJykpO1xyXG50ZXN0KCdvYmplY3QnLCgpPT57XHJcblx0b2sodHlwZSh7fSk9PT10eXBlLk9CSkVDVCwnb2JqZWN0Jyk7XHJcblx0b2sodHlwZShhcmd1bWVudHMpPT09dHlwZS5PQkpFQ1QsJ2FyZ3VtZW50cycpO1xyXG59KTtcclxudGVzdCgnYXJyYXknLCgpPT57XHJcblx0b2sodHlwZShbXSk9PT10eXBlLkFSUkFZLCdbXScpO1xyXG5cdG9rKHR5cGUobmV3IEFycmF5KCkpPT09dHlwZS5BUlJBWSwnbmV3IEFycmF5Jyk7XHJcbn0pO1xyXG50ZXN0KCdub2RlJywoKT0+e1xyXG5cdG9rKHR5cGUoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpKT09PXR5cGUuTk9ERSwnbm9kZScpO1xyXG59KTtcclxuLyp0ZXN0KCdldmVudCcsKCk9PntcclxuXHRvayh0eXBlKG5ldyBFdmVudCgnZm9vJykpPT09dHlwZS5FVkVOVCwnRXZlbnQnKTtcclxuXHRvayh0eXBlKG5ldyBDdXN0b21FdmVudCgnYmFyJyx7fSkpPT09dHlwZS5FVkVOVCwnQ3VzdG9tRXZlbnQnKTtcclxuXHRvayh0eXBlKGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpKT09PXR5cGUuRVZFTlQsJ2RvY3VtZW50LmNyZWF0ZUV2ZW50Jyk7XHJcbn0pOyovXHJcbnRlc3QoJ2Z1bmN0aW9uJywoKT0+e1xyXG5cdG9rKHR5cGUoZnVuY3Rpb24oKXt9KT09PXR5cGUuRlVOQ1RJT04sJ2Z1bmN0aW9uJyk7XHJcbn0pO1xyXG50ZXN0KCdzdHJpbmcnLCgpPT57XHJcblx0b2sodHlwZSgnYScpPT09dHlwZS5TVFJJTkcsJ2EnKTtcclxuXHRvayh0eXBlKFN0cmluZygpKT09PXR5cGUuU1RSSU5HLCdTdHJpbmcoKScpO1xyXG59KTtcclxudGVzdCgnYm9vbGVhbicsKCk9PntcclxuXHRvayh0eXBlKHRydWUpPT09dHlwZS5CT09MRUFOLCd0cnVlJyk7XHJcblx0b2sodHlwZShmYWxzZSk9PT10eXBlLkJPT0xFQU4sJ2ZhbHNlJyk7XHJcbn0pO1xyXG50ZXN0KCdpbnQnLCgpPT57XHJcblx0b2sodHlwZSgwKT09PXR5cGUuSU5ULCcwJyk7XHJcblx0b2sodHlwZSgxKT09PXR5cGUuSU5ULCcxJyk7XHJcblx0b2sodHlwZSgweEZGKT09PXR5cGUuSU5ULCcweEZGJyk7XHJcblx0b2sodHlwZSgxRTQpPT09dHlwZS5JTlQsJzFFNCcpO1xyXG5cdG9rKHR5cGUoTnVtYmVyLk1JTl9WQUxVRSk9PT10eXBlLkZMT0FULCdOdW1iZXIuTUlOX1ZBTFVFJyk7XHJcblx0b2sodHlwZShOdW1iZXIuTUFYX1ZBTFVFKT09PXR5cGUuSU5ULCdOdW1iZXIuTUFYX1ZBTFVFJyk7XHJcbn0pO1xyXG50ZXN0KCdmbG9hdCcsKCk9PntcclxuXHRvayh0eXBlKDEuMSk9PT10eXBlLkZMT0FULCcxLjEnKTtcclxuXHRvayh0eXBlKE1hdGguUEkpPT09dHlwZS5GTE9BVCwnTWF0aC5QSScpO1xyXG5cdG9rKHR5cGUoMUUtNCk9PT10eXBlLkZMT0FULCcxRS00Jyk7XHJcbn0pO1xyXG50ZXN0KCduYW4nLCgpPT57XHJcblx0b2sodHlwZShOYU4pPT09dHlwZS5OQU4sJ05hTicpO1xyXG5cdG9rKHR5cGUoMC8wKT09PXR5cGUuTkFOLCcwLzAnKTtcclxufSk7XHJcbnRlc3QoJ2luZmluaXRlJywoKT0+e1xyXG5cdG9rKHR5cGUoSW5maW5pdHkpPT09dHlwZS5JTkZJTklURSwnSW5maW5pdHknKTtcclxuXHRvayh0eXBlKDIvMCk9PT10eXBlLklORklOSVRFLCcyLzAnKTtcclxuXHRvayh0eXBlKE51bWJlci5QT1NJVElWRV9JTkZJTklUWSk9PT10eXBlLklORklOSVRFLCdOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFknKTtcclxuXHRvayh0eXBlKE51bWJlci5ORUdBVElWRV9JTkZJTklUWSk9PT10eXBlLklORklOSVRFLCdOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFknKTtcclxufSk7XHJcbnRlc3QoJ3JlZ2V4cCcsKCk9PntcclxuXHRvayh0eXBlKC9cXHMvZ2kpPT09dHlwZS5SRUdFWFAsJy9cXFxccy9naScpO1xyXG5cdG9rKHR5cGUobmV3IFJlZ0V4cCgnJykpPT09dHlwZS5SRUdFWFAsJ25ldyBSZWdFeHAnKTtcclxufSk7XHJcbnRlc3QoJ2RhdGUnLCgpPT57XHJcblx0b2sodHlwZShuZXcgRGF0ZSgpKT09PXR5cGUuREFURSwnbmV3IERhdGUnKTtcclxufSk7IiwiLyoqXG4gKiBAbGljZW5zZVxuICogTG8tRGFzaCAyLjQuMSAoQ3VzdG9tIEJ1aWxkKSBsb2Rhc2guY29tL2xpY2Vuc2UgfCBVbmRlcnNjb3JlLmpzIDEuNS4yIHVuZGVyc2NvcmVqcy5vcmcvTElDRU5TRVxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kZXJuIC1vIC4vZGlzdC9sb2Rhc2guanNgXG4gKi9cbjsoZnVuY3Rpb24oKXtmdW5jdGlvbiBuKG4sdCxlKXtlPShlfHwwKS0xO2Zvcih2YXIgcj1uP24ubGVuZ3RoOjA7KytlPHI7KWlmKG5bZV09PT10KXJldHVybiBlO3JldHVybi0xfWZ1bmN0aW9uIHQodCxlKXt2YXIgcj10eXBlb2YgZTtpZih0PXQubCxcImJvb2xlYW5cIj09cnx8bnVsbD09ZSlyZXR1cm4gdFtlXT8wOi0xO1wibnVtYmVyXCIhPXImJlwic3RyaW5nXCIhPXImJihyPVwib2JqZWN0XCIpO3ZhciB1PVwibnVtYmVyXCI9PXI/ZTptK2U7cmV0dXJuIHQ9KHQ9dFtyXSkmJnRbdV0sXCJvYmplY3RcIj09cj90JiYtMTxuKHQsZSk/MDotMTp0PzA6LTF9ZnVuY3Rpb24gZShuKXt2YXIgdD10aGlzLmwsZT10eXBlb2YgbjtpZihcImJvb2xlYW5cIj09ZXx8bnVsbD09bil0W25dPXRydWU7ZWxzZXtcIm51bWJlclwiIT1lJiZcInN0cmluZ1wiIT1lJiYoZT1cIm9iamVjdFwiKTt2YXIgcj1cIm51bWJlclwiPT1lP246bStuLHQ9dFtlXXx8KHRbZV09e30pO1wib2JqZWN0XCI9PWU/KHRbcl18fCh0W3JdPVtdKSkucHVzaChuKTp0W3JdPXRydWVcbn19ZnVuY3Rpb24gcihuKXtyZXR1cm4gbi5jaGFyQ29kZUF0KDApfWZ1bmN0aW9uIHUobix0KXtmb3IodmFyIGU9bi5tLHI9dC5tLHU9LTEsbz1lLmxlbmd0aDsrK3U8bzspe3ZhciBpPWVbdV0sYT1yW3VdO2lmKGkhPT1hKXtpZihpPmF8fHR5cGVvZiBpPT1cInVuZGVmaW5lZFwiKXJldHVybiAxO2lmKGk8YXx8dHlwZW9mIGE9PVwidW5kZWZpbmVkXCIpcmV0dXJuLTF9fXJldHVybiBuLm4tdC5ufWZ1bmN0aW9uIG8obil7dmFyIHQ9LTEscj1uLmxlbmd0aCx1PW5bMF0sbz1uW3IvMnwwXSxpPW5bci0xXTtpZih1JiZ0eXBlb2YgdT09XCJvYmplY3RcIiYmbyYmdHlwZW9mIG89PVwib2JqZWN0XCImJmkmJnR5cGVvZiBpPT1cIm9iamVjdFwiKXJldHVybiBmYWxzZTtmb3IodT1mKCksdVtcImZhbHNlXCJdPXVbXCJudWxsXCJdPXVbXCJ0cnVlXCJdPXUudW5kZWZpbmVkPWZhbHNlLG89ZigpLG8uaz1uLG8ubD11LG8ucHVzaD1lOysrdDxyOylvLnB1c2goblt0XSk7cmV0dXJuIG99ZnVuY3Rpb24gaShuKXtyZXR1cm5cIlxcXFxcIitVW25dXG59ZnVuY3Rpb24gYSgpe3JldHVybiBoLnBvcCgpfHxbXX1mdW5jdGlvbiBmKCl7cmV0dXJuIGcucG9wKCl8fHtrOm51bGwsbDpudWxsLG06bnVsbCxcImZhbHNlXCI6ZmFsc2UsbjowLFwibnVsbFwiOmZhbHNlLG51bWJlcjpudWxsLG9iamVjdDpudWxsLHB1c2g6bnVsbCxzdHJpbmc6bnVsbCxcInRydWVcIjpmYWxzZSx1bmRlZmluZWQ6ZmFsc2UsbzpudWxsfX1mdW5jdGlvbiBsKG4pe24ubGVuZ3RoPTAsaC5sZW5ndGg8XyYmaC5wdXNoKG4pfWZ1bmN0aW9uIGMobil7dmFyIHQ9bi5sO3QmJmModCksbi5rPW4ubD1uLm09bi5vYmplY3Q9bi5udW1iZXI9bi5zdHJpbmc9bi5vPW51bGwsZy5sZW5ndGg8XyYmZy5wdXNoKG4pfWZ1bmN0aW9uIHAobix0LGUpe3R8fCh0PTApLHR5cGVvZiBlPT1cInVuZGVmaW5lZFwiJiYoZT1uP24ubGVuZ3RoOjApO3ZhciByPS0xO2U9ZS10fHwwO2Zvcih2YXIgdT1BcnJheSgwPmU/MDplKTsrK3I8ZTspdVtyXT1uW3Qrcl07cmV0dXJuIHV9ZnVuY3Rpb24gcyhlKXtmdW5jdGlvbiBoKG4sdCxlKXtpZighbnx8IVZbdHlwZW9mIG5dKXJldHVybiBuO1xudD10JiZ0eXBlb2YgZT09XCJ1bmRlZmluZWRcIj90OnR0KHQsZSwzKTtmb3IodmFyIHI9LTEsdT1WW3R5cGVvZiBuXSYmRmUobiksbz11P3UubGVuZ3RoOjA7KytyPG8mJihlPXVbcl0sZmFsc2UhPT10KG5bZV0sZSxuKSk7KTtyZXR1cm4gbn1mdW5jdGlvbiBnKG4sdCxlKXt2YXIgcjtpZighbnx8IVZbdHlwZW9mIG5dKXJldHVybiBuO3Q9dCYmdHlwZW9mIGU9PVwidW5kZWZpbmVkXCI/dDp0dCh0LGUsMyk7Zm9yKHIgaW4gbilpZihmYWxzZT09PXQobltyXSxyLG4pKWJyZWFrO3JldHVybiBufWZ1bmN0aW9uIF8obix0LGUpe3ZhciByLHU9bixvPXU7aWYoIXUpcmV0dXJuIG87Zm9yKHZhciBpPWFyZ3VtZW50cyxhPTAsZj10eXBlb2YgZT09XCJudW1iZXJcIj8yOmkubGVuZ3RoOysrYTxmOylpZigodT1pW2FdKSYmVlt0eXBlb2YgdV0pZm9yKHZhciBsPS0xLGM9Vlt0eXBlb2YgdV0mJkZlKHUpLHA9Yz9jLmxlbmd0aDowOysrbDxwOylyPWNbbF0sXCJ1bmRlZmluZWRcIj09dHlwZW9mIG9bcl0mJihvW3JdPXVbcl0pO1xucmV0dXJuIG99ZnVuY3Rpb24gVShuLHQsZSl7dmFyIHIsdT1uLG89dTtpZighdSlyZXR1cm4gbzt2YXIgaT1hcmd1bWVudHMsYT0wLGY9dHlwZW9mIGU9PVwibnVtYmVyXCI/MjppLmxlbmd0aDtpZigzPGYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGlbZi0yXSl2YXIgbD10dChpWy0tZi0xXSxpW2YtLV0sMik7ZWxzZSAyPGYmJlwiZnVuY3Rpb25cIj09dHlwZW9mIGlbZi0xXSYmKGw9aVstLWZdKTtmb3IoOysrYTxmOylpZigodT1pW2FdKSYmVlt0eXBlb2YgdV0pZm9yKHZhciBjPS0xLHA9Vlt0eXBlb2YgdV0mJkZlKHUpLHM9cD9wLmxlbmd0aDowOysrYzxzOylyPXBbY10sb1tyXT1sP2wob1tyXSx1W3JdKTp1W3JdO3JldHVybiBvfWZ1bmN0aW9uIEgobil7dmFyIHQsZT1bXTtpZighbnx8IVZbdHlwZW9mIG5dKXJldHVybiBlO2Zvcih0IGluIG4pbWUuY2FsbChuLHQpJiZlLnB1c2godCk7cmV0dXJuIGV9ZnVuY3Rpb24gSihuKXtyZXR1cm4gbiYmdHlwZW9mIG49PVwib2JqZWN0XCImJiFUZShuKSYmbWUuY2FsbChuLFwiX193cmFwcGVkX19cIik/bjpuZXcgUShuKVxufWZ1bmN0aW9uIFEobix0KXt0aGlzLl9fY2hhaW5fXz0hIXQsdGhpcy5fX3dyYXBwZWRfXz1ufWZ1bmN0aW9uIFgobil7ZnVuY3Rpb24gdCgpe2lmKHIpe3ZhciBuPXAocik7YmUuYXBwbHkobixhcmd1bWVudHMpfWlmKHRoaXMgaW5zdGFuY2VvZiB0KXt2YXIgbz1udChlLnByb3RvdHlwZSksbj1lLmFwcGx5KG8sbnx8YXJndW1lbnRzKTtyZXR1cm4gd3Qobik/bjpvfXJldHVybiBlLmFwcGx5KHUsbnx8YXJndW1lbnRzKX12YXIgZT1uWzBdLHI9blsyXSx1PW5bNF07cmV0dXJuICRlKHQsbiksdH1mdW5jdGlvbiBaKG4sdCxlLHIsdSl7aWYoZSl7dmFyIG89ZShuKTtpZih0eXBlb2YgbyE9XCJ1bmRlZmluZWRcIilyZXR1cm4gb31pZighd3QobikpcmV0dXJuIG47dmFyIGk9Y2UuY2FsbChuKTtpZighS1tpXSlyZXR1cm4gbjt2YXIgZj1BZVtpXTtzd2l0Y2goaSl7Y2FzZSBUOmNhc2UgRjpyZXR1cm4gbmV3IGYoK24pO2Nhc2UgVzpjYXNlIFA6cmV0dXJuIG5ldyBmKG4pO2Nhc2UgejpyZXR1cm4gbz1mKG4uc291cmNlLEMuZXhlYyhuKSksby5sYXN0SW5kZXg9bi5sYXN0SW5kZXgsb1xufWlmKGk9VGUobiksdCl7dmFyIGM9IXI7cnx8KHI9YSgpKSx1fHwodT1hKCkpO2Zvcih2YXIgcz1yLmxlbmd0aDtzLS07KWlmKHJbc109PW4pcmV0dXJuIHVbc107bz1pP2Yobi5sZW5ndGgpOnt9fWVsc2Ugbz1pP3Aobik6VSh7fSxuKTtyZXR1cm4gaSYmKG1lLmNhbGwobixcImluZGV4XCIpJiYoby5pbmRleD1uLmluZGV4KSxtZS5jYWxsKG4sXCJpbnB1dFwiKSYmKG8uaW5wdXQ9bi5pbnB1dCkpLHQ/KHIucHVzaChuKSx1LnB1c2gobyksKGk/U3Q6aCkobixmdW5jdGlvbihuLGkpe29baV09WihuLHQsZSxyLHUpfSksYyYmKGwociksbCh1KSksbyk6b31mdW5jdGlvbiBudChuKXtyZXR1cm4gd3Qobik/a2Uobik6e319ZnVuY3Rpb24gdHQobix0LGUpe2lmKHR5cGVvZiBuIT1cImZ1bmN0aW9uXCIpcmV0dXJuIFV0O2lmKHR5cGVvZiB0PT1cInVuZGVmaW5lZFwifHwhKFwicHJvdG90eXBlXCJpbiBuKSlyZXR1cm4gbjt2YXIgcj1uLl9fYmluZERhdGFfXztpZih0eXBlb2Ygcj09XCJ1bmRlZmluZWRcIiYmKERlLmZ1bmNOYW1lcyYmKHI9IW4ubmFtZSkscj1yfHwhRGUuZnVuY0RlY29tcCwhcikpe3ZhciB1PWdlLmNhbGwobik7XG5EZS5mdW5jTmFtZXN8fChyPSFPLnRlc3QodSkpLHJ8fChyPUUudGVzdCh1KSwkZShuLHIpKX1pZihmYWxzZT09PXJ8fHRydWUhPT1yJiYxJnJbMV0pcmV0dXJuIG47c3dpdGNoKGUpe2Nhc2UgMTpyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIG4uY2FsbCh0LGUpfTtjYXNlIDI6cmV0dXJuIGZ1bmN0aW9uKGUscil7cmV0dXJuIG4uY2FsbCh0LGUscil9O2Nhc2UgMzpyZXR1cm4gZnVuY3Rpb24oZSxyLHUpe3JldHVybiBuLmNhbGwodCxlLHIsdSl9O2Nhc2UgNDpyZXR1cm4gZnVuY3Rpb24oZSxyLHUsbyl7cmV0dXJuIG4uY2FsbCh0LGUscix1LG8pfX1yZXR1cm4gTXQobix0KX1mdW5jdGlvbiBldChuKXtmdW5jdGlvbiB0KCl7dmFyIG49Zj9pOnRoaXM7aWYodSl7dmFyIGg9cCh1KTtiZS5hcHBseShoLGFyZ3VtZW50cyl9cmV0dXJuKG98fGMpJiYoaHx8KGg9cChhcmd1bWVudHMpKSxvJiZiZS5hcHBseShoLG8pLGMmJmgubGVuZ3RoPGEpPyhyfD0xNixldChbZSxzP3I6LTQmcixoLG51bGwsaSxhXSkpOihofHwoaD1hcmd1bWVudHMpLGwmJihlPW5bdl0pLHRoaXMgaW5zdGFuY2VvZiB0PyhuPW50KGUucHJvdG90eXBlKSxoPWUuYXBwbHkobixoKSx3dChoKT9oOm4pOmUuYXBwbHkobixoKSlcbn12YXIgZT1uWzBdLHI9blsxXSx1PW5bMl0sbz1uWzNdLGk9bls0XSxhPW5bNV0sZj0xJnIsbD0yJnIsYz00JnIscz04JnIsdj1lO3JldHVybiAkZSh0LG4pLHR9ZnVuY3Rpb24gcnQoZSxyKXt2YXIgdT0tMSxpPXN0KCksYT1lP2UubGVuZ3RoOjAsZj1hPj1iJiZpPT09bixsPVtdO2lmKGYpe3ZhciBwPW8ocik7cD8oaT10LHI9cCk6Zj1mYWxzZX1mb3IoOysrdTxhOylwPWVbdV0sMD5pKHIscCkmJmwucHVzaChwKTtyZXR1cm4gZiYmYyhyKSxsfWZ1bmN0aW9uIHV0KG4sdCxlLHIpe3I9KHJ8fDApLTE7Zm9yKHZhciB1PW4/bi5sZW5ndGg6MCxvPVtdOysrcjx1Oyl7dmFyIGk9bltyXTtpZihpJiZ0eXBlb2YgaT09XCJvYmplY3RcIiYmdHlwZW9mIGkubGVuZ3RoPT1cIm51bWJlclwiJiYoVGUoaSl8fHl0KGkpKSl7dHx8KGk9dXQoaSx0LGUpKTt2YXIgYT0tMSxmPWkubGVuZ3RoLGw9by5sZW5ndGg7Zm9yKG8ubGVuZ3RoKz1mOysrYTxmOylvW2wrK109aVthXX1lbHNlIGV8fG8ucHVzaChpKX1yZXR1cm4gb1xufWZ1bmN0aW9uIG90KG4sdCxlLHIsdSxvKXtpZihlKXt2YXIgaT1lKG4sdCk7aWYodHlwZW9mIGkhPVwidW5kZWZpbmVkXCIpcmV0dXJuISFpfWlmKG49PT10KXJldHVybiAwIT09bnx8MS9uPT0xL3Q7aWYobj09PW4mJiEobiYmVlt0eXBlb2Ygbl18fHQmJlZbdHlwZW9mIHRdKSlyZXR1cm4gZmFsc2U7aWYobnVsbD09bnx8bnVsbD09dClyZXR1cm4gbj09PXQ7dmFyIGY9Y2UuY2FsbChuKSxjPWNlLmNhbGwodCk7aWYoZj09RCYmKGY9cSksYz09RCYmKGM9cSksZiE9YylyZXR1cm4gZmFsc2U7c3dpdGNoKGYpe2Nhc2UgVDpjYXNlIEY6cmV0dXJuK249PSt0O2Nhc2UgVzpyZXR1cm4gbiE9K24/dCE9K3Q6MD09bj8xL249PTEvdDpuPT0rdDtjYXNlIHo6Y2FzZSBQOnJldHVybiBuPT1vZSh0KX1pZihjPWY9PSQsIWMpe3ZhciBwPW1lLmNhbGwobixcIl9fd3JhcHBlZF9fXCIpLHM9bWUuY2FsbCh0LFwiX193cmFwcGVkX19cIik7aWYocHx8cylyZXR1cm4gb3QocD9uLl9fd3JhcHBlZF9fOm4scz90Ll9fd3JhcHBlZF9fOnQsZSxyLHUsbyk7XG5pZihmIT1xKXJldHVybiBmYWxzZTtpZihmPW4uY29uc3RydWN0b3IscD10LmNvbnN0cnVjdG9yLGYhPXAmJiEoZHQoZikmJmYgaW5zdGFuY2VvZiBmJiZkdChwKSYmcCBpbnN0YW5jZW9mIHApJiZcImNvbnN0cnVjdG9yXCJpbiBuJiZcImNvbnN0cnVjdG9yXCJpbiB0KXJldHVybiBmYWxzZX1mb3IoZj0hdSx1fHwodT1hKCkpLG98fChvPWEoKSkscD11Lmxlbmd0aDtwLS07KWlmKHVbcF09PW4pcmV0dXJuIG9bcF09PXQ7dmFyIHY9MCxpPXRydWU7aWYodS5wdXNoKG4pLG8ucHVzaCh0KSxjKXtpZihwPW4ubGVuZ3RoLHY9dC5sZW5ndGgsKGk9dj09cCl8fHIpZm9yKDt2LS07KWlmKGM9cCxzPXRbdl0scilmb3IoO2MtLSYmIShpPW90KG5bY10scyxlLHIsdSxvKSk7KTtlbHNlIGlmKCEoaT1vdChuW3ZdLHMsZSxyLHUsbykpKWJyZWFrfWVsc2UgZyh0LGZ1bmN0aW9uKHQsYSxmKXtyZXR1cm4gbWUuY2FsbChmLGEpPyh2KyssaT1tZS5jYWxsKG4sYSkmJm90KG5bYV0sdCxlLHIsdSxvKSk6dm9pZCAwfSksaSYmIXImJmcobixmdW5jdGlvbihuLHQsZSl7cmV0dXJuIG1lLmNhbGwoZSx0KT9pPS0xPC0tdjp2b2lkIDBcbn0pO3JldHVybiB1LnBvcCgpLG8ucG9wKCksZiYmKGwodSksbChvKSksaX1mdW5jdGlvbiBpdChuLHQsZSxyLHUpeyhUZSh0KT9TdDpoKSh0LGZ1bmN0aW9uKHQsbyl7dmFyIGksYSxmPXQsbD1uW29dO2lmKHQmJigoYT1UZSh0KSl8fFBlKHQpKSl7Zm9yKGY9ci5sZW5ndGg7Zi0tOylpZihpPXJbZl09PXQpe2w9dVtmXTticmVha31pZighaSl7dmFyIGM7ZSYmKGY9ZShsLHQpLGM9dHlwZW9mIGYhPVwidW5kZWZpbmVkXCIpJiYobD1mKSxjfHwobD1hP1RlKGwpP2w6W106UGUobCk/bDp7fSksci5wdXNoKHQpLHUucHVzaChsKSxjfHxpdChsLHQsZSxyLHUpfX1lbHNlIGUmJihmPWUobCx0KSx0eXBlb2YgZj09XCJ1bmRlZmluZWRcIiYmKGY9dCkpLHR5cGVvZiBmIT1cInVuZGVmaW5lZFwiJiYobD1mKTtuW29dPWx9KX1mdW5jdGlvbiBhdChuLHQpe3JldHVybiBuK2hlKFJlKCkqKHQtbisxKSl9ZnVuY3Rpb24gZnQoZSxyLHUpe3ZhciBpPS0xLGY9c3QoKSxwPWU/ZS5sZW5ndGg6MCxzPVtdLHY9IXImJnA+PWImJmY9PT1uLGg9dXx8dj9hKCk6cztcbmZvcih2JiYoaD1vKGgpLGY9dCk7KytpPHA7KXt2YXIgZz1lW2ldLHk9dT91KGcsaSxlKTpnOyhyPyFpfHxoW2gubGVuZ3RoLTFdIT09eTowPmYoaCx5KSkmJigodXx8dikmJmgucHVzaCh5KSxzLnB1c2goZykpfXJldHVybiB2PyhsKGguayksYyhoKSk6dSYmbChoKSxzfWZ1bmN0aW9uIGx0KG4pe3JldHVybiBmdW5jdGlvbih0LGUscil7dmFyIHU9e307ZT1KLmNyZWF0ZUNhbGxiYWNrKGUsciwzKSxyPS0xO3ZhciBvPXQ/dC5sZW5ndGg6MDtpZih0eXBlb2Ygbz09XCJudW1iZXJcIilmb3IoOysrcjxvOyl7dmFyIGk9dFtyXTtuKHUsaSxlKGkscix0KSx0KX1lbHNlIGgodCxmdW5jdGlvbih0LHIsbyl7bih1LHQsZSh0LHIsbyksbyl9KTtyZXR1cm4gdX19ZnVuY3Rpb24gY3Qobix0LGUscix1LG8pe3ZhciBpPTEmdCxhPTQmdCxmPTE2JnQsbD0zMiZ0O2lmKCEoMiZ0fHxkdChuKSkpdGhyb3cgbmV3IGllO2YmJiFlLmxlbmd0aCYmKHQmPS0xNyxmPWU9ZmFsc2UpLGwmJiFyLmxlbmd0aCYmKHQmPS0zMyxsPXI9ZmFsc2UpO1xudmFyIGM9biYmbi5fX2JpbmREYXRhX187cmV0dXJuIGMmJnRydWUhPT1jPyhjPXAoYyksY1syXSYmKGNbMl09cChjWzJdKSksY1szXSYmKGNbM109cChjWzNdKSksIWl8fDEmY1sxXXx8KGNbNF09dSksIWkmJjEmY1sxXSYmKHR8PTgpLCFhfHw0JmNbMV18fChjWzVdPW8pLGYmJmJlLmFwcGx5KGNbMl18fChjWzJdPVtdKSxlKSxsJiZ3ZS5hcHBseShjWzNdfHwoY1szXT1bXSksciksY1sxXXw9dCxjdC5hcHBseShudWxsLGMpKTooMT09dHx8MTc9PT10P1g6ZXQpKFtuLHQsZSxyLHUsb10pfWZ1bmN0aW9uIHB0KG4pe3JldHVybiBCZVtuXX1mdW5jdGlvbiBzdCgpe3ZhciB0PSh0PUouaW5kZXhPZik9PT1XdD9uOnQ7cmV0dXJuIHR9ZnVuY3Rpb24gdnQobil7cmV0dXJuIHR5cGVvZiBuPT1cImZ1bmN0aW9uXCImJnBlLnRlc3Qobil9ZnVuY3Rpb24gaHQobil7dmFyIHQsZTtyZXR1cm4gbiYmY2UuY2FsbChuKT09cSYmKHQ9bi5jb25zdHJ1Y3RvciwhZHQodCl8fHQgaW5zdGFuY2VvZiB0KT8oZyhuLGZ1bmN0aW9uKG4sdCl7ZT10XG59KSx0eXBlb2YgZT09XCJ1bmRlZmluZWRcInx8bWUuY2FsbChuLGUpKTpmYWxzZX1mdW5jdGlvbiBndChuKXtyZXR1cm4gV2Vbbl19ZnVuY3Rpb24geXQobil7cmV0dXJuIG4mJnR5cGVvZiBuPT1cIm9iamVjdFwiJiZ0eXBlb2Ygbi5sZW5ndGg9PVwibnVtYmVyXCImJmNlLmNhbGwobik9PUR8fGZhbHNlfWZ1bmN0aW9uIG10KG4sdCxlKXt2YXIgcj1GZShuKSx1PXIubGVuZ3RoO2Zvcih0PXR0KHQsZSwzKTt1LS0mJihlPXJbdV0sZmFsc2UhPT10KG5bZV0sZSxuKSk7KTtyZXR1cm4gbn1mdW5jdGlvbiBidChuKXt2YXIgdD1bXTtyZXR1cm4gZyhuLGZ1bmN0aW9uKG4sZSl7ZHQobikmJnQucHVzaChlKX0pLHQuc29ydCgpfWZ1bmN0aW9uIF90KG4pe2Zvcih2YXIgdD0tMSxlPUZlKG4pLHI9ZS5sZW5ndGgsdT17fTsrK3Q8cjspe3ZhciBvPWVbdF07dVtuW29dXT1vfXJldHVybiB1fWZ1bmN0aW9uIGR0KG4pe3JldHVybiB0eXBlb2Ygbj09XCJmdW5jdGlvblwifWZ1bmN0aW9uIHd0KG4pe3JldHVybiEoIW58fCFWW3R5cGVvZiBuXSlcbn1mdW5jdGlvbiBqdChuKXtyZXR1cm4gdHlwZW9mIG49PVwibnVtYmVyXCJ8fG4mJnR5cGVvZiBuPT1cIm9iamVjdFwiJiZjZS5jYWxsKG4pPT1XfHxmYWxzZX1mdW5jdGlvbiBrdChuKXtyZXR1cm4gdHlwZW9mIG49PVwic3RyaW5nXCJ8fG4mJnR5cGVvZiBuPT1cIm9iamVjdFwiJiZjZS5jYWxsKG4pPT1QfHxmYWxzZX1mdW5jdGlvbiB4dChuKXtmb3IodmFyIHQ9LTEsZT1GZShuKSxyPWUubGVuZ3RoLHU9WHQocik7Kyt0PHI7KXVbdF09bltlW3RdXTtyZXR1cm4gdX1mdW5jdGlvbiBDdChuLHQsZSl7dmFyIHI9LTEsdT1zdCgpLG89bj9uLmxlbmd0aDowLGk9ZmFsc2U7cmV0dXJuIGU9KDA+ZT9JZSgwLG8rZSk6ZSl8fDAsVGUobik/aT0tMTx1KG4sdCxlKTp0eXBlb2Ygbz09XCJudW1iZXJcIj9pPS0xPChrdChuKT9uLmluZGV4T2YodCxlKTp1KG4sdCxlKSk6aChuLGZ1bmN0aW9uKG4pe3JldHVybisrcjxlP3ZvaWQgMDohKGk9bj09PXQpfSksaX1mdW5jdGlvbiBPdChuLHQsZSl7dmFyIHI9dHJ1ZTt0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGU9LTE7XG52YXIgdT1uP24ubGVuZ3RoOjA7aWYodHlwZW9mIHU9PVwibnVtYmVyXCIpZm9yKDsrK2U8dSYmKHI9ISF0KG5bZV0sZSxuKSk7KTtlbHNlIGgobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHI9ISF0KG4sZSx1KX0pO3JldHVybiByfWZ1bmN0aW9uIE50KG4sdCxlKXt2YXIgcj1bXTt0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGU9LTE7dmFyIHU9bj9uLmxlbmd0aDowO2lmKHR5cGVvZiB1PT1cIm51bWJlclwiKWZvcig7KytlPHU7KXt2YXIgbz1uW2VdO3QobyxlLG4pJiZyLnB1c2gobyl9ZWxzZSBoKG4sZnVuY3Rpb24obixlLHUpe3QobixlLHUpJiZyLnB1c2gobil9KTtyZXR1cm4gcn1mdW5jdGlvbiBJdChuLHQsZSl7dD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKSxlPS0xO3ZhciByPW4/bi5sZW5ndGg6MDtpZih0eXBlb2YgciE9XCJudW1iZXJcIil7dmFyIHU7cmV0dXJuIGgobixmdW5jdGlvbihuLGUscil7cmV0dXJuIHQobixlLHIpPyh1PW4sZmFsc2UpOnZvaWQgMH0pLHV9Zm9yKDsrK2U8cjspe3ZhciBvPW5bZV07XG5pZih0KG8sZSxuKSlyZXR1cm4gb319ZnVuY3Rpb24gU3Qobix0LGUpe3ZhciByPS0xLHU9bj9uLmxlbmd0aDowO2lmKHQ9dCYmdHlwZW9mIGU9PVwidW5kZWZpbmVkXCI/dDp0dCh0LGUsMyksdHlwZW9mIHU9PVwibnVtYmVyXCIpZm9yKDsrK3I8dSYmZmFsc2UhPT10KG5bcl0scixuKTspO2Vsc2UgaChuLHQpO3JldHVybiBufWZ1bmN0aW9uIEV0KG4sdCxlKXt2YXIgcj1uP24ubGVuZ3RoOjA7aWYodD10JiZ0eXBlb2YgZT09XCJ1bmRlZmluZWRcIj90OnR0KHQsZSwzKSx0eXBlb2Ygcj09XCJudW1iZXJcIilmb3IoO3ItLSYmZmFsc2UhPT10KG5bcl0scixuKTspO2Vsc2V7dmFyIHU9RmUobikscj11Lmxlbmd0aDtoKG4sZnVuY3Rpb24obixlLG8pe3JldHVybiBlPXU/dVstLXJdOi0tcix0KG9bZV0sZSxvKX0pfXJldHVybiBufWZ1bmN0aW9uIFJ0KG4sdCxlKXt2YXIgcj0tMSx1PW4/bi5sZW5ndGg6MDtpZih0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLHR5cGVvZiB1PT1cIm51bWJlclwiKWZvcih2YXIgbz1YdCh1KTsrK3I8dTspb1tyXT10KG5bcl0scixuKTtcbmVsc2Ugbz1bXSxoKG4sZnVuY3Rpb24obixlLHUpe29bKytyXT10KG4sZSx1KX0pO3JldHVybiBvfWZ1bmN0aW9uIEF0KG4sdCxlKXt2YXIgdT0tMS8wLG89dTtpZih0eXBlb2YgdCE9XCJmdW5jdGlvblwiJiZlJiZlW3RdPT09biYmKHQ9bnVsbCksbnVsbD09dCYmVGUobikpe2U9LTE7Zm9yKHZhciBpPW4ubGVuZ3RoOysrZTxpOyl7dmFyIGE9bltlXTthPm8mJihvPWEpfX1lbHNlIHQ9bnVsbD09dCYma3Qobik/cjpKLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKSxTdChuLGZ1bmN0aW9uKG4sZSxyKXtlPXQobixlLHIpLGU+dSYmKHU9ZSxvPW4pfSk7cmV0dXJuIG99ZnVuY3Rpb24gRHQobix0LGUscil7aWYoIW4pcmV0dXJuIGU7dmFyIHU9Mz5hcmd1bWVudHMubGVuZ3RoO3Q9Si5jcmVhdGVDYWxsYmFjayh0LHIsNCk7dmFyIG89LTEsaT1uLmxlbmd0aDtpZih0eXBlb2YgaT09XCJudW1iZXJcIilmb3IodSYmKGU9blsrK29dKTsrK288aTspZT10KGUsbltvXSxvLG4pO2Vsc2UgaChuLGZ1bmN0aW9uKG4scixvKXtlPXU/KHU9ZmFsc2Usbik6dChlLG4scixvKVxufSk7cmV0dXJuIGV9ZnVuY3Rpb24gJHQobix0LGUscil7dmFyIHU9Mz5hcmd1bWVudHMubGVuZ3RoO3JldHVybiB0PUouY3JlYXRlQ2FsbGJhY2sodCxyLDQpLEV0KG4sZnVuY3Rpb24obixyLG8pe2U9dT8odT1mYWxzZSxuKTp0KGUsbixyLG8pfSksZX1mdW5jdGlvbiBUdChuKXt2YXIgdD0tMSxlPW4/bi5sZW5ndGg6MCxyPVh0KHR5cGVvZiBlPT1cIm51bWJlclwiP2U6MCk7cmV0dXJuIFN0KG4sZnVuY3Rpb24obil7dmFyIGU9YXQoMCwrK3QpO3JbdF09cltlXSxyW2VdPW59KSxyfWZ1bmN0aW9uIEZ0KG4sdCxlKXt2YXIgcjt0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGU9LTE7dmFyIHU9bj9uLmxlbmd0aDowO2lmKHR5cGVvZiB1PT1cIm51bWJlclwiKWZvcig7KytlPHUmJiEocj10KG5bZV0sZSxuKSk7KTtlbHNlIGgobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIShyPXQobixlLHUpKX0pO3JldHVybiEhcn1mdW5jdGlvbiBCdChuLHQsZSl7dmFyIHI9MCx1PW4/bi5sZW5ndGg6MDtpZih0eXBlb2YgdCE9XCJudW1iZXJcIiYmbnVsbCE9dCl7dmFyIG89LTE7XG5mb3IodD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKTsrK288dSYmdChuW29dLG8sbik7KXIrK31lbHNlIGlmKHI9dCxudWxsPT1yfHxlKXJldHVybiBuP25bMF06djtyZXR1cm4gcChuLDAsU2UoSWUoMCxyKSx1KSl9ZnVuY3Rpb24gV3QodCxlLHIpe2lmKHR5cGVvZiByPT1cIm51bWJlclwiKXt2YXIgdT10P3QubGVuZ3RoOjA7cj0wPnI/SWUoMCx1K3IpOnJ8fDB9ZWxzZSBpZihyKXJldHVybiByPXp0KHQsZSksdFtyXT09PWU/cjotMTtyZXR1cm4gbih0LGUscil9ZnVuY3Rpb24gcXQobix0LGUpe2lmKHR5cGVvZiB0IT1cIm51bWJlclwiJiZudWxsIT10KXt2YXIgcj0wLHU9LTEsbz1uP24ubGVuZ3RoOjA7Zm9yKHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyk7Kyt1PG8mJnQoblt1XSx1LG4pOylyKyt9ZWxzZSByPW51bGw9PXR8fGU/MTpJZSgwLHQpO3JldHVybiBwKG4scil9ZnVuY3Rpb24genQobix0LGUscil7dmFyIHU9MCxvPW4/bi5sZW5ndGg6dTtmb3IoZT1lP0ouY3JlYXRlQ2FsbGJhY2soZSxyLDEpOlV0LHQ9ZSh0KTt1PG87KXI9dStvPj4+MSxlKG5bcl0pPHQ/dT1yKzE6bz1yO1xucmV0dXJuIHV9ZnVuY3Rpb24gUHQobix0LGUscil7cmV0dXJuIHR5cGVvZiB0IT1cImJvb2xlYW5cIiYmbnVsbCE9dCYmKHI9ZSxlPXR5cGVvZiB0IT1cImZ1bmN0aW9uXCImJnImJnJbdF09PT1uP251bGw6dCx0PWZhbHNlKSxudWxsIT1lJiYoZT1KLmNyZWF0ZUNhbGxiYWNrKGUsciwzKSksZnQobix0LGUpfWZ1bmN0aW9uIEt0KCl7Zm9yKHZhciBuPTE8YXJndW1lbnRzLmxlbmd0aD9hcmd1bWVudHM6YXJndW1lbnRzWzBdLHQ9LTEsZT1uP0F0KFZlKG4sXCJsZW5ndGhcIikpOjAscj1YdCgwPmU/MDplKTsrK3Q8ZTspclt0XT1WZShuLHQpO3JldHVybiByfWZ1bmN0aW9uIEx0KG4sdCl7dmFyIGU9LTEscj1uP24ubGVuZ3RoOjAsdT17fTtmb3IodHx8IXJ8fFRlKG5bMF0pfHwodD1bXSk7KytlPHI7KXt2YXIgbz1uW2VdO3Q/dVtvXT10W2VdOm8mJih1W29bMF1dPW9bMV0pfXJldHVybiB1fWZ1bmN0aW9uIE10KG4sdCl7cmV0dXJuIDI8YXJndW1lbnRzLmxlbmd0aD9jdChuLDE3LHAoYXJndW1lbnRzLDIpLG51bGwsdCk6Y3QobiwxLG51bGwsbnVsbCx0KVxufWZ1bmN0aW9uIFZ0KG4sdCxlKXtmdW5jdGlvbiByKCl7YyYmdmUoYyksaT1jPXA9diwoZ3x8aCE9PXQpJiYocz1VZSgpLGE9bi5hcHBseShsLG8pLGN8fGl8fChvPWw9bnVsbCkpfWZ1bmN0aW9uIHUoKXt2YXIgZT10LShVZSgpLWYpOzA8ZT9jPV9lKHUsZSk6KGkmJnZlKGkpLGU9cCxpPWM9cD12LGUmJihzPVVlKCksYT1uLmFwcGx5KGwsbyksY3x8aXx8KG89bD1udWxsKSkpfXZhciBvLGksYSxmLGwsYyxwLHM9MCxoPWZhbHNlLGc9dHJ1ZTtpZighZHQobikpdGhyb3cgbmV3IGllO2lmKHQ9SWUoMCx0KXx8MCx0cnVlPT09ZSl2YXIgeT10cnVlLGc9ZmFsc2U7ZWxzZSB3dChlKSYmKHk9ZS5sZWFkaW5nLGg9XCJtYXhXYWl0XCJpbiBlJiYoSWUodCxlLm1heFdhaXQpfHwwKSxnPVwidHJhaWxpbmdcImluIGU/ZS50cmFpbGluZzpnKTtyZXR1cm4gZnVuY3Rpb24oKXtpZihvPWFyZ3VtZW50cyxmPVVlKCksbD10aGlzLHA9ZyYmKGN8fCF5KSxmYWxzZT09PWgpdmFyIGU9eSYmIWM7ZWxzZXtpfHx5fHwocz1mKTt2YXIgdj1oLShmLXMpLG09MD49djtcbm0/KGkmJihpPXZlKGkpKSxzPWYsYT1uLmFwcGx5KGwsbykpOml8fChpPV9lKHIsdikpfXJldHVybiBtJiZjP2M9dmUoYyk6Y3x8dD09PWh8fChjPV9lKHUsdCkpLGUmJihtPXRydWUsYT1uLmFwcGx5KGwsbykpLCFtfHxjfHxpfHwobz1sPW51bGwpLGF9fWZ1bmN0aW9uIFV0KG4pe3JldHVybiBufWZ1bmN0aW9uIEd0KG4sdCxlKXt2YXIgcj10cnVlLHU9dCYmYnQodCk7dCYmKGV8fHUubGVuZ3RoKXx8KG51bGw9PWUmJihlPXQpLG89USx0PW4sbj1KLHU9YnQodCkpLGZhbHNlPT09ZT9yPWZhbHNlOnd0KGUpJiZcImNoYWluXCJpbiBlJiYocj1lLmNoYWluKTt2YXIgbz1uLGk9ZHQobyk7U3QodSxmdW5jdGlvbihlKXt2YXIgdT1uW2VdPXRbZV07aSYmKG8ucHJvdG90eXBlW2VdPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy5fX2NoYWluX18sZT10aGlzLl9fd3JhcHBlZF9fLGk9W2VdO2lmKGJlLmFwcGx5KGksYXJndW1lbnRzKSxpPXUuYXBwbHkobixpKSxyfHx0KXtpZihlPT09aSYmd3QoaSkpcmV0dXJuIHRoaXM7XG5pPW5ldyBvKGkpLGkuX19jaGFpbl9fPXR9cmV0dXJuIGl9KX0pfWZ1bmN0aW9uIEh0KCl7fWZ1bmN0aW9uIEp0KG4pe3JldHVybiBmdW5jdGlvbih0KXtyZXR1cm4gdFtuXX19ZnVuY3Rpb24gUXQoKXtyZXR1cm4gdGhpcy5fX3dyYXBwZWRfX31lPWU/WS5kZWZhdWx0cyhHLk9iamVjdCgpLGUsWS5waWNrKEcsQSkpOkc7dmFyIFh0PWUuQXJyYXksWXQ9ZS5Cb29sZWFuLFp0PWUuRGF0ZSxuZT1lLkZ1bmN0aW9uLHRlPWUuTWF0aCxlZT1lLk51bWJlcixyZT1lLk9iamVjdCx1ZT1lLlJlZ0V4cCxvZT1lLlN0cmluZyxpZT1lLlR5cGVFcnJvcixhZT1bXSxmZT1yZS5wcm90b3R5cGUsbGU9ZS5fLGNlPWZlLnRvU3RyaW5nLHBlPXVlKFwiXlwiK29lKGNlKS5yZXBsYWNlKC9bLiorP14ke30oKXxbXFxdXFxcXF0vZyxcIlxcXFwkJlwiKS5yZXBsYWNlKC90b1N0cmluZ3wgZm9yIFteXFxdXSsvZyxcIi4qP1wiKStcIiRcIiksc2U9dGUuY2VpbCx2ZT1lLmNsZWFyVGltZW91dCxoZT10ZS5mbG9vcixnZT1uZS5wcm90b3R5cGUudG9TdHJpbmcseWU9dnQoeWU9cmUuZ2V0UHJvdG90eXBlT2YpJiZ5ZSxtZT1mZS5oYXNPd25Qcm9wZXJ0eSxiZT1hZS5wdXNoLF9lPWUuc2V0VGltZW91dCxkZT1hZS5zcGxpY2Usd2U9YWUudW5zaGlmdCxqZT1mdW5jdGlvbigpe3RyeXt2YXIgbj17fSx0PXZ0KHQ9cmUuZGVmaW5lUHJvcGVydHkpJiZ0LGU9dChuLG4sbikmJnRcbn1jYXRjaChyKXt9cmV0dXJuIGV9KCksa2U9dnQoa2U9cmUuY3JlYXRlKSYma2UseGU9dnQoeGU9WHQuaXNBcnJheSkmJnhlLENlPWUuaXNGaW5pdGUsT2U9ZS5pc05hTixOZT12dChOZT1yZS5rZXlzKSYmTmUsSWU9dGUubWF4LFNlPXRlLm1pbixFZT1lLnBhcnNlSW50LFJlPXRlLnJhbmRvbSxBZT17fTtBZVskXT1YdCxBZVtUXT1ZdCxBZVtGXT1adCxBZVtCXT1uZSxBZVtxXT1yZSxBZVtXXT1lZSxBZVt6XT11ZSxBZVtQXT1vZSxRLnByb3RvdHlwZT1KLnByb3RvdHlwZTt2YXIgRGU9Si5zdXBwb3J0PXt9O0RlLmZ1bmNEZWNvbXA9IXZ0KGUuYSkmJkUudGVzdChzKSxEZS5mdW5jTmFtZXM9dHlwZW9mIG5lLm5hbWU9PVwic3RyaW5nXCIsSi50ZW1wbGF0ZVNldHRpbmdzPXtlc2NhcGU6LzwlLShbXFxzXFxTXSs/KSU+L2csZXZhbHVhdGU6LzwlKFtcXHNcXFNdKz8pJT4vZyxpbnRlcnBvbGF0ZTpOLHZhcmlhYmxlOlwiXCIsaW1wb3J0czp7XzpKfX0sa2V8fChudD1mdW5jdGlvbigpe2Z1bmN0aW9uIG4oKXt9cmV0dXJuIGZ1bmN0aW9uKHQpe2lmKHd0KHQpKXtuLnByb3RvdHlwZT10O1xudmFyIHI9bmV3IG47bi5wcm90b3R5cGU9bnVsbH1yZXR1cm4gcnx8ZS5PYmplY3QoKX19KCkpO3ZhciAkZT1qZT9mdW5jdGlvbihuLHQpe00udmFsdWU9dCxqZShuLFwiX19iaW5kRGF0YV9fXCIsTSl9Okh0LFRlPXhlfHxmdW5jdGlvbihuKXtyZXR1cm4gbiYmdHlwZW9mIG49PVwib2JqZWN0XCImJnR5cGVvZiBuLmxlbmd0aD09XCJudW1iZXJcIiYmY2UuY2FsbChuKT09JHx8ZmFsc2V9LEZlPU5lP2Z1bmN0aW9uKG4pe3JldHVybiB3dChuKT9OZShuKTpbXX06SCxCZT17XCImXCI6XCImYW1wO1wiLFwiPFwiOlwiJmx0O1wiLFwiPlwiOlwiJmd0O1wiLCdcIic6XCImcXVvdDtcIixcIidcIjpcIiYjMzk7XCJ9LFdlPV90KEJlKSxxZT11ZShcIihcIitGZShXZSkuam9pbihcInxcIikrXCIpXCIsXCJnXCIpLHplPXVlKFwiW1wiK0ZlKEJlKS5qb2luKFwiXCIpK1wiXVwiLFwiZ1wiKSxQZT15ZT9mdW5jdGlvbihuKXtpZighbnx8Y2UuY2FsbChuKSE9cSlyZXR1cm4gZmFsc2U7dmFyIHQ9bi52YWx1ZU9mLGU9dnQodCkmJihlPXllKHQpKSYmeWUoZSk7cmV0dXJuIGU/bj09ZXx8eWUobik9PWU6aHQobilcbn06aHQsS2U9bHQoZnVuY3Rpb24obix0LGUpe21lLmNhbGwobixlKT9uW2VdKys6bltlXT0xfSksTGU9bHQoZnVuY3Rpb24obix0LGUpeyhtZS5jYWxsKG4sZSk/bltlXTpuW2VdPVtdKS5wdXNoKHQpfSksTWU9bHQoZnVuY3Rpb24obix0LGUpe25bZV09dH0pLFZlPVJ0LFVlPXZ0KFVlPVp0Lm5vdykmJlVlfHxmdW5jdGlvbigpe3JldHVybihuZXcgWnQpLmdldFRpbWUoKX0sR2U9OD09RWUoZCtcIjA4XCIpP0VlOmZ1bmN0aW9uKG4sdCl7cmV0dXJuIEVlKGt0KG4pP24ucmVwbGFjZShJLFwiXCIpOm4sdHx8MCl9O3JldHVybiBKLmFmdGVyPWZ1bmN0aW9uKG4sdCl7aWYoIWR0KHQpKXRocm93IG5ldyBpZTtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gMT4tLW4/dC5hcHBseSh0aGlzLGFyZ3VtZW50cyk6dm9pZCAwfX0sSi5hc3NpZ249VSxKLmF0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgdD1hcmd1bWVudHMsZT0tMSxyPXV0KHQsdHJ1ZSxmYWxzZSwxKSx0PXRbMl0mJnRbMl1bdFsxXV09PT1uPzE6ci5sZW5ndGgsdT1YdCh0KTsrK2U8dDspdVtlXT1uW3JbZV1dO1xucmV0dXJuIHV9LEouYmluZD1NdCxKLmJpbmRBbGw9ZnVuY3Rpb24obil7Zm9yKHZhciB0PTE8YXJndW1lbnRzLmxlbmd0aD91dChhcmd1bWVudHMsdHJ1ZSxmYWxzZSwxKTpidChuKSxlPS0xLHI9dC5sZW5ndGg7KytlPHI7KXt2YXIgdT10W2VdO25bdV09Y3Qoblt1XSwxLG51bGwsbnVsbCxuKX1yZXR1cm4gbn0sSi5iaW5kS2V5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIDI8YXJndW1lbnRzLmxlbmd0aD9jdCh0LDE5LHAoYXJndW1lbnRzLDIpLG51bGwsbik6Y3QodCwzLG51bGwsbnVsbCxuKX0sSi5jaGFpbj1mdW5jdGlvbihuKXtyZXR1cm4gbj1uZXcgUShuKSxuLl9fY2hhaW5fXz10cnVlLG59LEouY29tcGFjdD1mdW5jdGlvbihuKXtmb3IodmFyIHQ9LTEsZT1uP24ubGVuZ3RoOjAscj1bXTsrK3Q8ZTspe3ZhciB1PW5bdF07dSYmci5wdXNoKHUpfXJldHVybiByfSxKLmNvbXBvc2U9ZnVuY3Rpb24oKXtmb3IodmFyIG49YXJndW1lbnRzLHQ9bi5sZW5ndGg7dC0tOylpZighZHQoblt0XSkpdGhyb3cgbmV3IGllO1xucmV0dXJuIGZ1bmN0aW9uKCl7Zm9yKHZhciB0PWFyZ3VtZW50cyxlPW4ubGVuZ3RoO2UtLTspdD1bbltlXS5hcHBseSh0aGlzLHQpXTtyZXR1cm4gdFswXX19LEouY29uc3RhbnQ9ZnVuY3Rpb24obil7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIG59fSxKLmNvdW50Qnk9S2UsSi5jcmVhdGU9ZnVuY3Rpb24obix0KXt2YXIgZT1udChuKTtyZXR1cm4gdD9VKGUsdCk6ZX0sSi5jcmVhdGVDYWxsYmFjaz1mdW5jdGlvbihuLHQsZSl7dmFyIHI9dHlwZW9mIG47aWYobnVsbD09bnx8XCJmdW5jdGlvblwiPT1yKXJldHVybiB0dChuLHQsZSk7aWYoXCJvYmplY3RcIiE9cilyZXR1cm4gSnQobik7dmFyIHU9RmUobiksbz11WzBdLGk9bltvXTtyZXR1cm4gMSE9dS5sZW5ndGh8fGkhPT1pfHx3dChpKT9mdW5jdGlvbih0KXtmb3IodmFyIGU9dS5sZW5ndGgscj1mYWxzZTtlLS0mJihyPW90KHRbdVtlXV0sblt1W2VdXSxudWxsLHRydWUpKTspO3JldHVybiByfTpmdW5jdGlvbihuKXtyZXR1cm4gbj1uW29dLGk9PT1uJiYoMCE9PWl8fDEvaT09MS9uKVxufX0sSi5jdXJyeT1mdW5jdGlvbihuLHQpe3JldHVybiB0PXR5cGVvZiB0PT1cIm51bWJlclwiP3Q6K3R8fG4ubGVuZ3RoLGN0KG4sNCxudWxsLG51bGwsbnVsbCx0KX0sSi5kZWJvdW5jZT1WdCxKLmRlZmF1bHRzPV8sSi5kZWZlcj1mdW5jdGlvbihuKXtpZighZHQobikpdGhyb3cgbmV3IGllO3ZhciB0PXAoYXJndW1lbnRzLDEpO3JldHVybiBfZShmdW5jdGlvbigpe24uYXBwbHkodix0KX0sMSl9LEouZGVsYXk9ZnVuY3Rpb24obix0KXtpZighZHQobikpdGhyb3cgbmV3IGllO3ZhciBlPXAoYXJndW1lbnRzLDIpO3JldHVybiBfZShmdW5jdGlvbigpe24uYXBwbHkodixlKX0sdCl9LEouZGlmZmVyZW5jZT1mdW5jdGlvbihuKXtyZXR1cm4gcnQobix1dChhcmd1bWVudHMsdHJ1ZSx0cnVlLDEpKX0sSi5maWx0ZXI9TnQsSi5mbGF0dGVuPWZ1bmN0aW9uKG4sdCxlLHIpe3JldHVybiB0eXBlb2YgdCE9XCJib29sZWFuXCImJm51bGwhPXQmJihyPWUsZT10eXBlb2YgdCE9XCJmdW5jdGlvblwiJiZyJiZyW3RdPT09bj9udWxsOnQsdD1mYWxzZSksbnVsbCE9ZSYmKG49UnQobixlLHIpKSx1dChuLHQpXG59LEouZm9yRWFjaD1TdCxKLmZvckVhY2hSaWdodD1FdCxKLmZvckluPWcsSi5mb3JJblJpZ2h0PWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj1bXTtnKG4sZnVuY3Rpb24obix0KXtyLnB1c2godCxuKX0pO3ZhciB1PXIubGVuZ3RoO2Zvcih0PXR0KHQsZSwzKTt1LS0mJmZhbHNlIT09dChyW3UtLV0sclt1XSxuKTspO3JldHVybiBufSxKLmZvck93bj1oLEouZm9yT3duUmlnaHQ9bXQsSi5mdW5jdGlvbnM9YnQsSi5ncm91cEJ5PUxlLEouaW5kZXhCeT1NZSxKLmluaXRpYWw9ZnVuY3Rpb24obix0LGUpe3ZhciByPTAsdT1uP24ubGVuZ3RoOjA7aWYodHlwZW9mIHQhPVwibnVtYmVyXCImJm51bGwhPXQpe3ZhciBvPXU7Zm9yKHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyk7by0tJiZ0KG5bb10sbyxuKTspcisrfWVsc2Ugcj1udWxsPT10fHxlPzE6dHx8cjtyZXR1cm4gcChuLDAsU2UoSWUoMCx1LXIpLHUpKX0sSi5pbnRlcnNlY3Rpb249ZnVuY3Rpb24oKXtmb3IodmFyIGU9W10scj0tMSx1PWFyZ3VtZW50cy5sZW5ndGgsaT1hKCksZj1zdCgpLHA9Zj09PW4scz1hKCk7KytyPHU7KXt2YXIgdj1hcmd1bWVudHNbcl07XG4oVGUodil8fHl0KHYpKSYmKGUucHVzaCh2KSxpLnB1c2gocCYmdi5sZW5ndGg+PWImJm8ocj9lW3JdOnMpKSl9dmFyIHA9ZVswXSxoPS0xLGc9cD9wLmxlbmd0aDowLHk9W107bjpmb3IoOysraDxnOyl7dmFyIG09aVswXSx2PXBbaF07aWYoMD4obT90KG0sdik6ZihzLHYpKSl7Zm9yKHI9dSwobXx8cykucHVzaCh2KTstLXI7KWlmKG09aVtyXSwwPihtP3QobSx2KTpmKGVbcl0sdikpKWNvbnRpbnVlIG47eS5wdXNoKHYpfX1mb3IoO3UtLTspKG09aVt1XSkmJmMobSk7cmV0dXJuIGwoaSksbChzKSx5fSxKLmludmVydD1fdCxKLmludm9rZT1mdW5jdGlvbihuLHQpe3ZhciBlPXAoYXJndW1lbnRzLDIpLHI9LTEsdT10eXBlb2YgdD09XCJmdW5jdGlvblwiLG89bj9uLmxlbmd0aDowLGk9WHQodHlwZW9mIG89PVwibnVtYmVyXCI/bzowKTtyZXR1cm4gU3QobixmdW5jdGlvbihuKXtpWysrcl09KHU/dDpuW3RdKS5hcHBseShuLGUpfSksaX0sSi5rZXlzPUZlLEoubWFwPVJ0LEoubWFwVmFsdWVzPWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj17fTtcbnJldHVybiB0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGgobixmdW5jdGlvbihuLGUsdSl7cltlXT10KG4sZSx1KX0pLHJ9LEoubWF4PUF0LEoubWVtb2l6ZT1mdW5jdGlvbihuLHQpe2Z1bmN0aW9uIGUoKXt2YXIgcj1lLmNhY2hlLHU9dD90LmFwcGx5KHRoaXMsYXJndW1lbnRzKTptK2FyZ3VtZW50c1swXTtyZXR1cm4gbWUuY2FsbChyLHUpP3JbdV06clt1XT1uLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1pZighZHQobikpdGhyb3cgbmV3IGllO3JldHVybiBlLmNhY2hlPXt9LGV9LEoubWVyZ2U9ZnVuY3Rpb24obil7dmFyIHQ9YXJndW1lbnRzLGU9MjtpZighd3QobikpcmV0dXJuIG47aWYoXCJudW1iZXJcIiE9dHlwZW9mIHRbMl0mJihlPXQubGVuZ3RoKSwzPGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRbZS0yXSl2YXIgcj10dCh0Wy0tZS0xXSx0W2UtLV0sMik7ZWxzZSAyPGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIHRbZS0xXSYmKHI9dFstLWVdKTtmb3IodmFyIHQ9cChhcmd1bWVudHMsMSxlKSx1PS0xLG89YSgpLGk9YSgpOysrdTxlOylpdChuLHRbdV0scixvLGkpO1xucmV0dXJuIGwobyksbChpKSxufSxKLm1pbj1mdW5jdGlvbihuLHQsZSl7dmFyIHU9MS8wLG89dTtpZih0eXBlb2YgdCE9XCJmdW5jdGlvblwiJiZlJiZlW3RdPT09biYmKHQ9bnVsbCksbnVsbD09dCYmVGUobikpe2U9LTE7Zm9yKHZhciBpPW4ubGVuZ3RoOysrZTxpOyl7dmFyIGE9bltlXTthPG8mJihvPWEpfX1lbHNlIHQ9bnVsbD09dCYma3Qobik/cjpKLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKSxTdChuLGZ1bmN0aW9uKG4sZSxyKXtlPXQobixlLHIpLGU8dSYmKHU9ZSxvPW4pfSk7cmV0dXJuIG99LEoub21pdD1mdW5jdGlvbihuLHQsZSl7dmFyIHI9e307aWYodHlwZW9mIHQhPVwiZnVuY3Rpb25cIil7dmFyIHU9W107ZyhuLGZ1bmN0aW9uKG4sdCl7dS5wdXNoKHQpfSk7Zm9yKHZhciB1PXJ0KHUsdXQoYXJndW1lbnRzLHRydWUsZmFsc2UsMSkpLG89LTEsaT11Lmxlbmd0aDsrK288aTspe3ZhciBhPXVbb107clthXT1uW2FdfX1lbHNlIHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksZyhuLGZ1bmN0aW9uKG4sZSx1KXt0KG4sZSx1KXx8KHJbZV09bilcbn0pO3JldHVybiByfSxKLm9uY2U9ZnVuY3Rpb24obil7dmFyIHQsZTtpZighZHQobikpdGhyb3cgbmV3IGllO3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0P2U6KHQ9dHJ1ZSxlPW4uYXBwbHkodGhpcyxhcmd1bWVudHMpLG49bnVsbCxlKX19LEoucGFpcnM9ZnVuY3Rpb24obil7Zm9yKHZhciB0PS0xLGU9RmUobikscj1lLmxlbmd0aCx1PVh0KHIpOysrdDxyOyl7dmFyIG89ZVt0XTt1W3RdPVtvLG5bb11dfXJldHVybiB1fSxKLnBhcnRpYWw9ZnVuY3Rpb24obil7cmV0dXJuIGN0KG4sMTYscChhcmd1bWVudHMsMSkpfSxKLnBhcnRpYWxSaWdodD1mdW5jdGlvbihuKXtyZXR1cm4gY3QobiwzMixudWxsLHAoYXJndW1lbnRzLDEpKX0sSi5waWNrPWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj17fTtpZih0eXBlb2YgdCE9XCJmdW5jdGlvblwiKWZvcih2YXIgdT0tMSxvPXV0KGFyZ3VtZW50cyx0cnVlLGZhbHNlLDEpLGk9d3Qobik/by5sZW5ndGg6MDsrK3U8aTspe3ZhciBhPW9bdV07YSBpbiBuJiYoclthXT1uW2FdKVxufWVsc2UgdD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKSxnKG4sZnVuY3Rpb24obixlLHUpe3QobixlLHUpJiYocltlXT1uKX0pO3JldHVybiByfSxKLnBsdWNrPVZlLEoucHJvcGVydHk9SnQsSi5wdWxsPWZ1bmN0aW9uKG4pe2Zvcih2YXIgdD1hcmd1bWVudHMsZT0wLHI9dC5sZW5ndGgsdT1uP24ubGVuZ3RoOjA7KytlPHI7KWZvcih2YXIgbz0tMSxpPXRbZV07KytvPHU7KW5bb109PT1pJiYoZGUuY2FsbChuLG8tLSwxKSx1LS0pO3JldHVybiBufSxKLnJhbmdlPWZ1bmN0aW9uKG4sdCxlKXtuPStufHwwLGU9dHlwZW9mIGU9PVwibnVtYmVyXCI/ZTorZXx8MSxudWxsPT10JiYodD1uLG49MCk7dmFyIHI9LTE7dD1JZSgwLHNlKCh0LW4pLyhlfHwxKSkpO2Zvcih2YXIgdT1YdCh0KTsrK3I8dDspdVtyXT1uLG4rPWU7cmV0dXJuIHV9LEoucmVqZWN0PWZ1bmN0aW9uKG4sdCxlKXtyZXR1cm4gdD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKSxOdChuLGZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4hdChuLGUscilcbn0pfSxKLnJlbW92ZT1mdW5jdGlvbihuLHQsZSl7dmFyIHI9LTEsdT1uP24ubGVuZ3RoOjAsbz1bXTtmb3IodD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKTsrK3I8dTspZT1uW3JdLHQoZSxyLG4pJiYoby5wdXNoKGUpLGRlLmNhbGwobixyLS0sMSksdS0tKTtyZXR1cm4gb30sSi5yZXN0PXF0LEouc2h1ZmZsZT1UdCxKLnNvcnRCeT1mdW5jdGlvbihuLHQsZSl7dmFyIHI9LTEsbz1UZSh0KSxpPW4/bi5sZW5ndGg6MCxwPVh0KHR5cGVvZiBpPT1cIm51bWJlclwiP2k6MCk7Zm9yKG98fCh0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpKSxTdChuLGZ1bmN0aW9uKG4sZSx1KXt2YXIgaT1wWysrcl09ZigpO28/aS5tPVJ0KHQsZnVuY3Rpb24odCl7cmV0dXJuIG5bdF19KTooaS5tPWEoKSlbMF09dChuLGUsdSksaS5uPXIsaS5vPW59KSxpPXAubGVuZ3RoLHAuc29ydCh1KTtpLS07KW49cFtpXSxwW2ldPW4ubyxvfHxsKG4ubSksYyhuKTtyZXR1cm4gcH0sSi50YXA9ZnVuY3Rpb24obix0KXtyZXR1cm4gdChuKSxuXG59LEoudGhyb3R0bGU9ZnVuY3Rpb24obix0LGUpe3ZhciByPXRydWUsdT10cnVlO2lmKCFkdChuKSl0aHJvdyBuZXcgaWU7cmV0dXJuIGZhbHNlPT09ZT9yPWZhbHNlOnd0KGUpJiYocj1cImxlYWRpbmdcImluIGU/ZS5sZWFkaW5nOnIsdT1cInRyYWlsaW5nXCJpbiBlP2UudHJhaWxpbmc6dSksTC5sZWFkaW5nPXIsTC5tYXhXYWl0PXQsTC50cmFpbGluZz11LFZ0KG4sdCxMKX0sSi50aW1lcz1mdW5jdGlvbihuLHQsZSl7bj0tMTwobj0rbik/bjowO3ZhciByPS0xLHU9WHQobik7Zm9yKHQ9dHQodCxlLDEpOysrcjxuOyl1W3JdPXQocik7cmV0dXJuIHV9LEoudG9BcnJheT1mdW5jdGlvbihuKXtyZXR1cm4gbiYmdHlwZW9mIG4ubGVuZ3RoPT1cIm51bWJlclwiP3Aobik6eHQobil9LEoudHJhbnNmb3JtPWZ1bmN0aW9uKG4sdCxlLHIpe3ZhciB1PVRlKG4pO2lmKG51bGw9PWUpaWYodSllPVtdO2Vsc2V7dmFyIG89biYmbi5jb25zdHJ1Y3RvcjtlPW50KG8mJm8ucHJvdG90eXBlKX1yZXR1cm4gdCYmKHQ9Si5jcmVhdGVDYWxsYmFjayh0LHIsNCksKHU/U3Q6aCkobixmdW5jdGlvbihuLHIsdSl7cmV0dXJuIHQoZSxuLHIsdSlcbn0pKSxlfSxKLnVuaW9uPWZ1bmN0aW9uKCl7cmV0dXJuIGZ0KHV0KGFyZ3VtZW50cyx0cnVlLHRydWUpKX0sSi51bmlxPVB0LEoudmFsdWVzPXh0LEoud2hlcmU9TnQsSi53aXRob3V0PWZ1bmN0aW9uKG4pe3JldHVybiBydChuLHAoYXJndW1lbnRzLDEpKX0sSi53cmFwPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIGN0KHQsMTYsW25dKX0sSi54b3I9ZnVuY3Rpb24oKXtmb3IodmFyIG49LTEsdD1hcmd1bWVudHMubGVuZ3RoOysrbjx0Oyl7dmFyIGU9YXJndW1lbnRzW25dO2lmKFRlKGUpfHx5dChlKSl2YXIgcj1yP2Z0KHJ0KHIsZSkuY29uY2F0KHJ0KGUscikpKTplfXJldHVybiByfHxbXX0sSi56aXA9S3QsSi56aXBPYmplY3Q9THQsSi5jb2xsZWN0PVJ0LEouZHJvcD1xdCxKLmVhY2g9U3QsSi5lYWNoUmlnaHQ9RXQsSi5leHRlbmQ9VSxKLm1ldGhvZHM9YnQsSi5vYmplY3Q9THQsSi5zZWxlY3Q9TnQsSi50YWlsPXF0LEoudW5pcXVlPVB0LEoudW56aXA9S3QsR3QoSiksSi5jbG9uZT1mdW5jdGlvbihuLHQsZSxyKXtyZXR1cm4gdHlwZW9mIHQhPVwiYm9vbGVhblwiJiZudWxsIT10JiYocj1lLGU9dCx0PWZhbHNlKSxaKG4sdCx0eXBlb2YgZT09XCJmdW5jdGlvblwiJiZ0dChlLHIsMSkpXG59LEouY2xvbmVEZWVwPWZ1bmN0aW9uKG4sdCxlKXtyZXR1cm4gWihuLHRydWUsdHlwZW9mIHQ9PVwiZnVuY3Rpb25cIiYmdHQodCxlLDEpKX0sSi5jb250YWlucz1DdCxKLmVzY2FwZT1mdW5jdGlvbihuKXtyZXR1cm4gbnVsbD09bj9cIlwiOm9lKG4pLnJlcGxhY2UoemUscHQpfSxKLmV2ZXJ5PU90LEouZmluZD1JdCxKLmZpbmRJbmRleD1mdW5jdGlvbihuLHQsZSl7dmFyIHI9LTEsdT1uP24ubGVuZ3RoOjA7Zm9yKHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyk7KytyPHU7KWlmKHQobltyXSxyLG4pKXJldHVybiByO3JldHVybi0xfSxKLmZpbmRLZXk9ZnVuY3Rpb24obix0LGUpe3ZhciByO3JldHVybiB0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGgobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHQobixlLHUpPyhyPWUsZmFsc2UpOnZvaWQgMH0pLHJ9LEouZmluZExhc3Q9ZnVuY3Rpb24obix0LGUpe3ZhciByO3JldHVybiB0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLEV0KG4sZnVuY3Rpb24obixlLHUpe3JldHVybiB0KG4sZSx1KT8ocj1uLGZhbHNlKTp2b2lkIDBcbn0pLHJ9LEouZmluZExhc3RJbmRleD1mdW5jdGlvbihuLHQsZSl7dmFyIHI9bj9uLmxlbmd0aDowO2Zvcih0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpO3ItLTspaWYodChuW3JdLHIsbikpcmV0dXJuIHI7cmV0dXJuLTF9LEouZmluZExhc3RLZXk9ZnVuY3Rpb24obix0LGUpe3ZhciByO3JldHVybiB0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLG10KG4sZnVuY3Rpb24obixlLHUpe3JldHVybiB0KG4sZSx1KT8ocj1lLGZhbHNlKTp2b2lkIDB9KSxyfSxKLmhhcz1mdW5jdGlvbihuLHQpe3JldHVybiBuP21lLmNhbGwobix0KTpmYWxzZX0sSi5pZGVudGl0eT1VdCxKLmluZGV4T2Y9V3QsSi5pc0FyZ3VtZW50cz15dCxKLmlzQXJyYXk9VGUsSi5pc0Jvb2xlYW49ZnVuY3Rpb24obil7cmV0dXJuIHRydWU9PT1ufHxmYWxzZT09PW58fG4mJnR5cGVvZiBuPT1cIm9iamVjdFwiJiZjZS5jYWxsKG4pPT1UfHxmYWxzZX0sSi5pc0RhdGU9ZnVuY3Rpb24obil7cmV0dXJuIG4mJnR5cGVvZiBuPT1cIm9iamVjdFwiJiZjZS5jYWxsKG4pPT1GfHxmYWxzZVxufSxKLmlzRWxlbWVudD1mdW5jdGlvbihuKXtyZXR1cm4gbiYmMT09PW4ubm9kZVR5cGV8fGZhbHNlfSxKLmlzRW1wdHk9ZnVuY3Rpb24obil7dmFyIHQ9dHJ1ZTtpZighbilyZXR1cm4gdDt2YXIgZT1jZS5jYWxsKG4pLHI9bi5sZW5ndGg7cmV0dXJuIGU9PSR8fGU9PVB8fGU9PUR8fGU9PXEmJnR5cGVvZiByPT1cIm51bWJlclwiJiZkdChuLnNwbGljZSk/IXI6KGgobixmdW5jdGlvbigpe3JldHVybiB0PWZhbHNlfSksdCl9LEouaXNFcXVhbD1mdW5jdGlvbihuLHQsZSxyKXtyZXR1cm4gb3Qobix0LHR5cGVvZiBlPT1cImZ1bmN0aW9uXCImJnR0KGUsciwyKSl9LEouaXNGaW5pdGU9ZnVuY3Rpb24obil7cmV0dXJuIENlKG4pJiYhT2UocGFyc2VGbG9hdChuKSl9LEouaXNGdW5jdGlvbj1kdCxKLmlzTmFOPWZ1bmN0aW9uKG4pe3JldHVybiBqdChuKSYmbiE9K259LEouaXNOdWxsPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT09bn0sSi5pc051bWJlcj1qdCxKLmlzT2JqZWN0PXd0LEouaXNQbGFpbk9iamVjdD1QZSxKLmlzUmVnRXhwPWZ1bmN0aW9uKG4pe3JldHVybiBuJiZ0eXBlb2Ygbj09XCJvYmplY3RcIiYmY2UuY2FsbChuKT09enx8ZmFsc2Vcbn0sSi5pc1N0cmluZz1rdCxKLmlzVW5kZWZpbmVkPWZ1bmN0aW9uKG4pe3JldHVybiB0eXBlb2Ygbj09XCJ1bmRlZmluZWRcIn0sSi5sYXN0SW5kZXhPZj1mdW5jdGlvbihuLHQsZSl7dmFyIHI9bj9uLmxlbmd0aDowO2Zvcih0eXBlb2YgZT09XCJudW1iZXJcIiYmKHI9KDA+ZT9JZSgwLHIrZSk6U2UoZSxyLTEpKSsxKTtyLS07KWlmKG5bcl09PT10KXJldHVybiByO3JldHVybi0xfSxKLm1peGluPUd0LEoubm9Db25mbGljdD1mdW5jdGlvbigpe3JldHVybiBlLl89bGUsdGhpc30sSi5ub29wPUh0LEoubm93PVVlLEoucGFyc2VJbnQ9R2UsSi5yYW5kb209ZnVuY3Rpb24obix0LGUpe3ZhciByPW51bGw9PW4sdT1udWxsPT10O3JldHVybiBudWxsPT1lJiYodHlwZW9mIG49PVwiYm9vbGVhblwiJiZ1PyhlPW4sbj0xKTp1fHx0eXBlb2YgdCE9XCJib29sZWFuXCJ8fChlPXQsdT10cnVlKSksciYmdSYmKHQ9MSksbj0rbnx8MCx1Pyh0PW4sbj0wKTp0PSt0fHwwLGV8fG4lMXx8dCUxPyhlPVJlKCksU2UobitlKih0LW4rcGFyc2VGbG9hdChcIjFlLVwiKygoZStcIlwiKS5sZW5ndGgtMSkpKSx0KSk6YXQobix0KVxufSxKLnJlZHVjZT1EdCxKLnJlZHVjZVJpZ2h0PSR0LEoucmVzdWx0PWZ1bmN0aW9uKG4sdCl7aWYobil7dmFyIGU9blt0XTtyZXR1cm4gZHQoZSk/blt0XSgpOmV9fSxKLnJ1bkluQ29udGV4dD1zLEouc2l6ZT1mdW5jdGlvbihuKXt2YXIgdD1uP24ubGVuZ3RoOjA7cmV0dXJuIHR5cGVvZiB0PT1cIm51bWJlclwiP3Q6RmUobikubGVuZ3RofSxKLnNvbWU9RnQsSi5zb3J0ZWRJbmRleD16dCxKLnRlbXBsYXRlPWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj1KLnRlbXBsYXRlU2V0dGluZ3M7bj1vZShufHxcIlwiKSxlPV8oe30sZSxyKTt2YXIgdSxvPV8oe30sZS5pbXBvcnRzLHIuaW1wb3J0cykscj1GZShvKSxvPXh0KG8pLGE9MCxmPWUuaW50ZXJwb2xhdGV8fFMsbD1cIl9fcCs9J1wiLGY9dWUoKGUuZXNjYXBlfHxTKS5zb3VyY2UrXCJ8XCIrZi5zb3VyY2UrXCJ8XCIrKGY9PT1OP3g6Uykuc291cmNlK1wifFwiKyhlLmV2YWx1YXRlfHxTKS5zb3VyY2UrXCJ8JFwiLFwiZ1wiKTtuLnJlcGxhY2UoZixmdW5jdGlvbih0LGUscixvLGYsYyl7cmV0dXJuIHJ8fChyPW8pLGwrPW4uc2xpY2UoYSxjKS5yZXBsYWNlKFIsaSksZSYmKGwrPVwiJytfX2UoXCIrZStcIikrJ1wiKSxmJiYodT10cnVlLGwrPVwiJztcIitmK1wiO1xcbl9fcCs9J1wiKSxyJiYobCs9XCInKygoX190PShcIityK1wiKSk9PW51bGw/Jyc6X190KSsnXCIpLGE9Yyt0Lmxlbmd0aCx0XG59KSxsKz1cIic7XCIsZj1lPWUudmFyaWFibGUsZnx8KGU9XCJvYmpcIixsPVwid2l0aChcIitlK1wiKXtcIitsK1wifVwiKSxsPSh1P2wucmVwbGFjZSh3LFwiXCIpOmwpLnJlcGxhY2UoaixcIiQxXCIpLnJlcGxhY2UoayxcIiQxO1wiKSxsPVwiZnVuY3Rpb24oXCIrZStcIil7XCIrKGY/XCJcIjplK1wifHwoXCIrZStcIj17fSk7XCIpK1widmFyIF9fdCxfX3A9JycsX19lPV8uZXNjYXBlXCIrKHU/XCIsX19qPUFycmF5LnByb3RvdHlwZS5qb2luO2Z1bmN0aW9uIHByaW50KCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpfVwiOlwiO1wiKStsK1wicmV0dXJuIF9fcH1cIjt0cnl7dmFyIGM9bmUocixcInJldHVybiBcIitsKS5hcHBseSh2LG8pfWNhdGNoKHApe3Rocm93IHAuc291cmNlPWwscH1yZXR1cm4gdD9jKHQpOihjLnNvdXJjZT1sLGMpfSxKLnVuZXNjYXBlPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1wiXCI6b2UobikucmVwbGFjZShxZSxndCl9LEoudW5pcXVlSWQ9ZnVuY3Rpb24obil7dmFyIHQ9Kyt5O3JldHVybiBvZShudWxsPT1uP1wiXCI6bikrdFxufSxKLmFsbD1PdCxKLmFueT1GdCxKLmRldGVjdD1JdCxKLmZpbmRXaGVyZT1JdCxKLmZvbGRsPUR0LEouZm9sZHI9JHQsSi5pbmNsdWRlPUN0LEouaW5qZWN0PUR0LEd0KGZ1bmN0aW9uKCl7dmFyIG49e307cmV0dXJuIGgoSixmdW5jdGlvbih0LGUpe0oucHJvdG90eXBlW2VdfHwobltlXT10KX0pLG59KCksZmFsc2UpLEouZmlyc3Q9QnQsSi5sYXN0PWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj0wLHU9bj9uLmxlbmd0aDowO2lmKHR5cGVvZiB0IT1cIm51bWJlclwiJiZudWxsIT10KXt2YXIgbz11O2Zvcih0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpO28tLSYmdChuW29dLG8sbik7KXIrK31lbHNlIGlmKHI9dCxudWxsPT1yfHxlKXJldHVybiBuP25bdS0xXTp2O3JldHVybiBwKG4sSWUoMCx1LXIpKX0sSi5zYW1wbGU9ZnVuY3Rpb24obix0LGUpe3JldHVybiBuJiZ0eXBlb2Ygbi5sZW5ndGghPVwibnVtYmVyXCImJihuPXh0KG4pKSxudWxsPT10fHxlP24/blthdCgwLG4ubGVuZ3RoLTEpXTp2OihuPVR0KG4pLG4ubGVuZ3RoPVNlKEllKDAsdCksbi5sZW5ndGgpLG4pXG59LEoudGFrZT1CdCxKLmhlYWQ9QnQsaChKLGZ1bmN0aW9uKG4sdCl7dmFyIGU9XCJzYW1wbGVcIiE9PXQ7Si5wcm90b3R5cGVbdF18fChKLnByb3RvdHlwZVt0XT1mdW5jdGlvbih0LHIpe3ZhciB1PXRoaXMuX19jaGFpbl9fLG89bih0aGlzLl9fd3JhcHBlZF9fLHQscik7cmV0dXJuIHV8fG51bGwhPXQmJighcnx8ZSYmdHlwZW9mIHQ9PVwiZnVuY3Rpb25cIik/bmV3IFEobyx1KTpvfSl9KSxKLlZFUlNJT049XCIyLjQuMVwiLEoucHJvdG90eXBlLmNoYWluPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX19jaGFpbl9fPXRydWUsdGhpc30sSi5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gb2UodGhpcy5fX3dyYXBwZWRfXyl9LEoucHJvdG90eXBlLnZhbHVlPVF0LEoucHJvdG90eXBlLnZhbHVlT2Y9UXQsU3QoW1wiam9pblwiLFwicG9wXCIsXCJzaGlmdFwiXSxmdW5jdGlvbihuKXt2YXIgdD1hZVtuXTtKLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3ZhciBuPXRoaXMuX19jaGFpbl9fLGU9dC5hcHBseSh0aGlzLl9fd3JhcHBlZF9fLGFyZ3VtZW50cyk7XG5yZXR1cm4gbj9uZXcgUShlLG4pOmV9fSksU3QoW1wicHVzaFwiLFwicmV2ZXJzZVwiLFwic29ydFwiLFwidW5zaGlmdFwiXSxmdW5jdGlvbihuKXt2YXIgdD1hZVtuXTtKLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiB0LmFwcGx5KHRoaXMuX193cmFwcGVkX18sYXJndW1lbnRzKSx0aGlzfX0pLFN0KFtcImNvbmNhdFwiLFwic2xpY2VcIixcInNwbGljZVwiXSxmdW5jdGlvbihuKXt2YXIgdD1hZVtuXTtKLnByb3RvdHlwZVtuXT1mdW5jdGlvbigpe3JldHVybiBuZXcgUSh0LmFwcGx5KHRoaXMuX193cmFwcGVkX18sYXJndW1lbnRzKSx0aGlzLl9fY2hhaW5fXyl9fSksSn12YXIgdixoPVtdLGc9W10seT0wLG09K25ldyBEYXRlK1wiXCIsYj03NSxfPTQwLGQ9XCIgXFx0XFx4MEJcXGZcXHhhMFxcdWZlZmZcXG5cXHJcXHUyMDI4XFx1MjAyOVxcdTE2ODBcXHUxODBlXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwM1xcdTIwMDRcXHUyMDA1XFx1MjAwNlxcdTIwMDdcXHUyMDA4XFx1MjAwOVxcdTIwMGFcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcIix3PS9cXGJfX3BcXCs9Jyc7L2csaj0vXFxiKF9fcFxcKz0pJydcXCsvZyxrPS8oX19lXFwoLio/XFwpfFxcYl9fdFxcKSlcXCsnJzsvZyx4PS9cXCRcXHsoW15cXFxcfV0qKD86XFxcXC5bXlxcXFx9XSopKilcXH0vZyxDPS9cXHcqJC8sTz0vXlxccypmdW5jdGlvblsgXFxuXFxyXFx0XStcXHcvLE49LzwlPShbXFxzXFxTXSs/KSU+L2csST1SZWdFeHAoXCJeW1wiK2QrXCJdKjArKD89LiQpXCIpLFM9LygkXikvLEU9L1xcYnRoaXNcXGIvLFI9L1snXFxuXFxyXFx0XFx1MjAyOFxcdTIwMjlcXFxcXS9nLEE9XCJBcnJheSBCb29sZWFuIERhdGUgRnVuY3Rpb24gTWF0aCBOdW1iZXIgT2JqZWN0IFJlZ0V4cCBTdHJpbmcgXyBhdHRhY2hFdmVudCBjbGVhclRpbWVvdXQgaXNGaW5pdGUgaXNOYU4gcGFyc2VJbnQgc2V0VGltZW91dFwiLnNwbGl0KFwiIFwiKSxEPVwiW29iamVjdCBBcmd1bWVudHNdXCIsJD1cIltvYmplY3QgQXJyYXldXCIsVD1cIltvYmplY3QgQm9vbGVhbl1cIixGPVwiW29iamVjdCBEYXRlXVwiLEI9XCJbb2JqZWN0IEZ1bmN0aW9uXVwiLFc9XCJbb2JqZWN0IE51bWJlcl1cIixxPVwiW29iamVjdCBPYmplY3RdXCIsej1cIltvYmplY3QgUmVnRXhwXVwiLFA9XCJbb2JqZWN0IFN0cmluZ11cIixLPXt9O1xuS1tCXT1mYWxzZSxLW0RdPUtbJF09S1tUXT1LW0ZdPUtbV109S1txXT1LW3pdPUtbUF09dHJ1ZTt2YXIgTD17bGVhZGluZzpmYWxzZSxtYXhXYWl0OjAsdHJhaWxpbmc6ZmFsc2V9LE09e2NvbmZpZ3VyYWJsZTpmYWxzZSxlbnVtZXJhYmxlOmZhbHNlLHZhbHVlOm51bGwsd3JpdGFibGU6ZmFsc2V9LFY9e1wiYm9vbGVhblwiOmZhbHNlLFwiZnVuY3Rpb25cIjp0cnVlLG9iamVjdDp0cnVlLG51bWJlcjpmYWxzZSxzdHJpbmc6ZmFsc2UsdW5kZWZpbmVkOmZhbHNlfSxVPXtcIlxcXFxcIjpcIlxcXFxcIixcIidcIjpcIidcIixcIlxcblwiOlwiblwiLFwiXFxyXCI6XCJyXCIsXCJcXHRcIjpcInRcIixcIlxcdTIwMjhcIjpcInUyMDI4XCIsXCJcXHUyMDI5XCI6XCJ1MjAyOVwifSxHPVZbdHlwZW9mIHdpbmRvd10mJndpbmRvd3x8dGhpcyxIPVZbdHlwZW9mIGV4cG9ydHNdJiZleHBvcnRzJiYhZXhwb3J0cy5ub2RlVHlwZSYmZXhwb3J0cyxKPVZbdHlwZW9mIG1vZHVsZV0mJm1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZSYmbW9kdWxlLFE9SiYmSi5leHBvcnRzPT09SCYmSCxYPVZbdHlwZW9mIGdsb2JhbF0mJmdsb2JhbDshWHx8WC5nbG9iYWwhPT1YJiZYLndpbmRvdyE9PVh8fChHPVgpO1xudmFyIFk9cygpO3R5cGVvZiBkZWZpbmU9PVwiZnVuY3Rpb25cIiYmdHlwZW9mIGRlZmluZS5hbWQ9PVwib2JqZWN0XCImJmRlZmluZS5hbWQ/KEcuXz1ZLCBkZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gWX0pKTpIJiZKP1E/KEouZXhwb3J0cz1ZKS5fPVk6SC5fPVk6Ry5fPVl9KS5jYWxsKHRoaXMpOyJdfQ==
