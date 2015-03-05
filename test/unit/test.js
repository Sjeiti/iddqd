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

//function toYYMMDD(date,reverse){//this?
//	var aDate = date.split('-');
//	if (aDate.length===(reverse?2:4)) {
//		aDate.reverse();
//	}
//	return aDate.join('-');
//}

//	function getDate(YYMMDDorDDMMYY){ // todo: implement (is in fcvr)
//		var a = YYMMDDorDDMMYY.split('-');
//		if (a[0].length===2) a.reverse();
//		return new Date(a.join('/')); // expect yyyy/MM/dd
//	}

//function overrideToString(toFormat){
//	if (toFormat===true||toFormat===undefined) {
//		oDateProto.toString = toFormatted;
//	} else if (toFormat===false) {
//		oDateProto.toString = fnOldToString;
//	}
//}

/**
 * Format a Date
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
exports.toFormatted = toFormatted;
/**
 * Date methods
 * @module internal/node
 */

var /*oDateProto = Date.prototype
    ,fnOldToString = oDateProto.toString
    ,*/aDay = ["Sunday", "Monday", "Thuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    aDayAbbr = ["Sun", "Mon", "Thu", "Wed", "Thu", "Fri", "Sat"],
    aMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    aMonthAbbr = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    aDayMonthSuffix = ["st", "nd", "rd", "th"]
/*,oExtendDate = {
	format: 'Y-m-d' // ISO 8601
	,overrideToString: overrideToString
	,toYYMMDD: toYYMMDD
}*/
/*,oExtendProto = {
	toFormatted: toFormatted
}*/
,
    iSecond = 1000,
    iMinute = iSecond * 60,
    iHour = iMinute * 60,
    iDay = iHour * 24;function toFormatted() {
	var date = arguments[0] === undefined ? new Date() : arguments[0];
	var format = arguments[1] === undefined ? "Y-m-d" : arguments[1];

	// getDate				Returns the day of the month (1-31) for the specified date according to local time.
	// getDay				Returns the day of the week (0-6) for the specified date according to local time.
	// getFullYear			Returns the year (4 digits for 4-digit years) of the specified date according to local time.
	// getHours				Returns the hour (0-23) in the specified date according to local time.
	// getMilliseconds		Returns the milliseconds (0-999) in the specified date according to local time.
	// getMinutes			Returns the minutes (0-59) in the specified date according to local time.
	// getMonth				Returns the month (0-11) in the specified date according to local time.
	// getSeconds			Returns the seconds (0-59) in the specified date according to local time.
	// getTime				Returns the numeric value of the specified date as the number of milliseconds since January 1, 1970, 00:00:00 UTC (negative for prior times).
	// getTimezoneOffset	Returns the time-zone offset in minutes for the current locale.
	// getUTCDate			Returns the day (date) of the month (1-31) in the specified date according to universal time.
	// getUTCDay			Returns the day of the week (0-6) in the specified date according to universal time.
	// getUTCFullYear		Returns the year (4 digits for 4-digit years) in the specified date according to universal time.
	// getUTCHours			Returns the hours (0-23) in the specified date according to universal time.
	// getUTCMilliseconds	Returns the milliseconds (0-999) in the specified date according to universal time.
	// getUTCMinutes		Returns the minutes (0-59) in the specified date according to universal time.
	// getUTCMonth			Returns the month (0-11) in the specified date according to universal time.
	// getUTCSeconds		Returns the seconds (0-59) in the specified date according to universal time.

	// d	Day of the month, 2 digits with leading zeros	01 to 31
	// D	A textual representation of a day, three letters	Mon through Sun
	// j	Day of the month without leading zeros	1 to 31
	// l (lowercase 'L')	A full textual representation of the day of the week	Sunday through Saturday
	// N	ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)	1 (for Monday) through 7 (for Sunday)
	// S	English ordinal suffix for the day of the month, 2 characters	st, nd, rd or th. Works well with j
	// w	Numeric representation of the day of the week	0 (for Sunday) through 6 (for Saturday)
	// z	The day of the year (starting from 0)	0 through 365
	// Week	---	---
	// W	ISO-8601 week number of year, weeks starting on Monday (added in PHP 4.1.0)	Example: 42 (the 42nd week in the year)
	// Month	---	---
	// F	A full textual representation of a month, such as January or March	January through December
	// m	Numeric representation of a month, with leading zeros	01 through 12
	// M	A short textual representation of a month, three letters	Jan through Dec
	// n	Numeric representation of a month, without leading zeros	1 through 12
	// t	Number of days in the given month	28 through 31
	// Year	---	---
	// L	Whether it's a leap year	1 if it is a leap year, 0 otherwise.
	// o	ISO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. (added in PHP 5.1.0)	Examples: 1999 or 2003
	// Y	A full numeric representation of a year, 4 digits	Examples: 1999 or 2003
	// y	A two digit representation of a year	Examples: 99 or 03
	// Time	---	---
	// a	Lowercase Ante meridiem and Post meridiem	am or pm
	// A	Uppercase Ante meridiem and Post meridiem	AM or PM
	// B	Swatch Internet time	000 through 999
	// g	12-hour format of an hour without leading zeros	1 through 12
	// G	24-hour format of an hour without leading zeros	0 through 23
	// h	12-hour format of an hour with leading zeros	01 through 12
	// H	24-hour format of an hour with leading zeros	00 through 23
	// i	Minutes with leading zeros	00 to 59
	// s	Seconds, with leading zeros	00 through 59
	// u	 Microseconds (added in PHP 5.2.2). Note that date() will always generate 000000 since it takes an integer parameter, whereas DateTime::format() does support microseconds.	Example: 654321
	// Timezone	---	---
	// e	Timezone identifier (added in PHP 5.1.0)	Examples: UTC, GMT, Atlantic/Azores
	// I (capital i)	Whether or not the date is in daylight saving time	1 if Daylight Saving Time, 0 otherwise.
	// O	Difference to Greenwich time (GMT) in hours	Example: +0200
	// P	Difference to Greenwich time (GMT) with colon between hours and minutes (added in PHP 5.1.3)	Example: +02:00
	// T	Timezone abbreviation	Examples: EST, MDT ...
	// Z	Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive.	-43200 through 50400
	// Full Date/Time	---	---
	// c	ISO 8601 date (added in PHP 5)	2004-02-12T15:19:21+00:00
	// r	» RFC 2822 formatted date	Example: Thu, 21 Dec 2000 16:01:07 +0200
	// U	Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)	See also time()
	// Day	---	---
	/*jshint validthis:true*/
	var sFormatted = "";
	/*jshint validthis:false	*/
	for (var i = 0, l = format.length; i < l; i++) {
		var s = format[i],
		    iYear = date.getFullYear(),
		    iMonth = date.getMonth(),
		    iDate = date.getDate(),
		    iWeekDay = date.getDay(),
		    iYearDay = Math.floor(new Date(date - new Date(iYear, 0, 0)).getTime() / iDay),
		    iHours = date.getHours(),
		    iHoursMod = iHours % 12,
		    iHours12 = iHoursMod === 0 ? 12 : iHoursMod,
		    iMinutes = date.getMinutes(),
		    iSeconds = date.getSeconds(),
		    iWeek = Math.ceil((iYearDay - 4) / 7) //?
		,
		    bLeapYear = iYear % 4 === 0 && iYear % 100 !== 0 || iYear % 400 === 0,
		    pad = function pad(a, b) {
			return (1000000000000000 + a + "").slice(-b);
		};
		switch (s) {
			// day
			case "d":
				sFormatted += pad(iDate, 2);break;
			case "D":
				sFormatted += aDayAbbr[iWeekDay];break;
			case "j":
				sFormatted += iDate;break;
			case "l":
				sFormatted += aDay[iWeekDay];break;
			case "N":
				sFormatted += iWeekDay === 0 ? 7 : iWeekDay;break;
			case "S":
				sFormatted += iDate > aDayMonthSuffix.length ? aDayMonthSuffix[aDayMonthSuffix.length - 1] : aDayMonthSuffix[iDate - 1];break;
			case "w":
				sFormatted += iWeekDay;break;
			case "z":
				sFormatted += iYearDay;break;
			// week
			case "W":
				sFormatted += iWeek === 0 ? 52 : iWeek;break;
			// month
			case "F":
				sFormatted += aMonth[iMonth];break;
			case "m":
				sFormatted += pad(iMonth + 1, 2);break;
			case "M":
				sFormatted += aMonthAbbr[iMonth];break;
			case "n":
				sFormatted += iMonth + 1;break;
			case "t":
				sFormatted += iMonth === 1 && !bLeapYear ? 28 : (iMonth > 5 ? iMonth + 1 : iMonth) % 2 ? 29 : 30;break;
			// year
			case "L":
				sFormatted += bLeapYear ? 1 : 0;break;
			case "o":
				sFormatted += iWeek === 0 ? iYear - 1 : iYear;break; //?
			case "Y":
				sFormatted += iYear;break;
			case "y":
				sFormatted += String(iYear).substr(2, 2);break;
			// time
			case "a":
				sFormatted += iHours < 12 ? "am" : "pm";break;
			case "A":
				sFormatted += iHours < 12 ? "AM" : "PM";break;
			case "B":
				sFormatted += "";break;
			case "g":
				sFormatted += iHours12;break;
			case "G":
				sFormatted += iHours;break;
			case "h":
				sFormatted += pad(iHours12, 2);break;
			case "H":
				sFormatted += pad(iHours, 2);break;
			case "i":
				sFormatted += pad(iMinutes, 2);break;
			case "s":
				sFormatted += pad(iSeconds, 2);break;
			case "u":
				sFormatted += "";break;
			// todo:timezone
			default:
				sFormatted += s;
		}
	}
	return sFormatted;
}
Object.defineProperty(exports, "__esModule", {
	value: true
});

},{}],4:[function(require,module,exports){
"use strict";

/**
 * Node methods
 * @module internal/node
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
 * Number methods
 * @module internal/number
 */

/**
 * Formats a number to the appropriate filesize notation
 * @param {number} number The number to format
 * @param {number} round The number of decimals to round by
 * @returns {string} Filesize string result
 * @todo extend to generic formatter
 */
exports.formatSize = formatSize;
function formatSize(number, round) {
  var i,
      size = number;
  if (round === undefined) round = 0;
  var aSizes = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  for (i = 0; size > 1024 && aSizes.length >= i + 2; i++) size /= 1024;
  var iMult = Math.pow(10, round);
  return Math.round(size * iMult) / iMult + aSizes[i];
}
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{}],6:[function(require,module,exports){
"use strict";

/**
 * String methods
 * @module internal/string
 */

/**
 * Tries to determine the type of the string and returns it.
 * @param {String} s A string
 * @returns {Object} Returns a string, number or boolean.
 */
exports.toType = toType;

/**
 * Pads a string left or right
 * @param {String} s A string
 * @param {Number} length Final length of the total string.
 * @param {String} chr Character to pad the string with.
 * @param {Boolean} [left=false] Pad to the left of the string.
 * @returns {string} The padded string
 */
exports.pad = pad;

/**
 * Converts string to XML
 * @param {String} s A string
 * @returns {Document} Returns an XML Document
 */
exports.toXML = toXML;

///**
// * Converts an XML string to an object
// * @param {String} s A string
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
 * @param {String} s A string
 * @returns {string}
 */
exports.nameCase = nameCase;

/**
 * Converts the string to camelCase notation
 * @param {String} s A string
 * @returns {string}
 */
exports.camelCase = camelCase;

/**
 * Converts the string to dashed notation
 * @param {String} s A string
 * @returns {string}
 */
exports.dash = dash;

/**
 * Converts the string to underscored notation
 * @param {String} s A string
 * @returns {string}
 */
exports.underscore = underscore;

/**
 * A minimal version of sprintf. Replaces variables in a string with the arguments. Variables are like %1$s and start at 1.
 * @param {String} s A string
 * @param {(string|string[])} [replacements] We're the replacements
 * @returns {string}
 */
exports.sprintf = sprintf;

/**
 * Test if a string is an url
 * @param {String} s A string
 * @param {boolean} [strict=true] Non-strict for urls without protocol, ie: www.google.com
 * @returns {boolean}
 */
exports.isUrl = isUrl;

// todo: doc, http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
/**
 * A string to hashcode method
 * @param {String} s A string
 * @returns {Number}
 */
exports.hashCode = hashCode;

/**
 * Turn a title into a slug
 * @param {String} s A string
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
}function isUrl(s) {
	var strict = arguments[1] === undefined ? true : arguments[1];

	var rxUrl = new RegExp(strict ? "^((http|https|ftp):)?//([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$" : "^(((http|https|ftp):)?//)?([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&amp;%$-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0).(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9-]+.)*[a-zA-Z0-9-]+.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(/($|[a-zA-Z0-9.,?'\\+&amp;%$#=~_-]+))*$");
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
	var str = s.toLowerCase(),
	    replace = {
		a: /[àáäâ]/g,
		e: /[èéëê]/g,
		i: /[ìíïî]/g,
		o: /[òóöô]/g,
		u: /[ùúüû]/g,
		n: /[ñ]/g,
		c: /[ç]/g,
		"-": /[^a-z0-9]|-+/g,
		"": /^-+|-+$/g
	};
	for (var replacement in replace) {
		str = str.replace(replace[replacement], replacement);
	}
	return str;
}
Object.defineProperty(exports, "__esModule", {
	value: true
});

},{}],7:[function(require,module,exports){
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

},{"./../vendor/lodash/dist/lodash.min.js":20}],8:[function(require,module,exports){
"use strict";

/**
 * Timeout
 * @module timeout
 * @param {Number} duration
 * @Returns {Promise}
 */
/* jshint ignore:start */

module.exports = function () {
    var duration = arguments[0] === undefined ? 40 : arguments[0];

    return new Promise(function (resolve) {
        setTimeout(resolve, duration);
    });
}
/* jshint ignore:end */
;

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

require("./testType");

require("./testTimeout");

require("./testNamespace");

// todo: other iddqd

require("./testCapabilities");

require("./testEnvironment");

require("./testInternalNode");

require("./testInternalString");

require("./testInternalNumber");

require("./testInternalDate");

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

},{"./testCapabilities":11,"./testEnvironment":12,"./testInternalDate":13,"./testInternalNode":14,"./testInternalNumber":15,"./testInternalString":16,"./testNamespace":17,"./testTimeout":18,"./testType":19}],11:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*global QUnit,test,ok*/

var capabilities = _interopRequire(require("./../../../src/capabilities"));

var type = _interopRequire(require("./../../../src/type"));

QUnit.module("capabilities");
test("standalone", function () {
	ok(type(capabilities.standalone) === type.BOOLEAN, "standalone");
});

},{"./../../../src/capabilities":1,"./../../../src/type":9}],12:[function(require,module,exports){
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

},{"./../../../src/environment":2,"./../../../src/type":9}],13:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/*global QUnit,test,ok*/

var date = _interopRequireWildcard(require("./../../../src/internal/date"));

QUnit.module("date", { setup: function setup() {
		this.date1 = new Date(2014, 8 - 1, 19, 21, 11, 23);
		this.date2 = new Date(2014, 8 - 1, 19, 11, 59, 59);
		this.date3 = new Date(2014, 8 - 1, 19, 12, 1, 1);
	} });
test("toFormatted", function () {
	var toFormatted = date.toFormatted;

	ok(toFormatted(this.date1) === "2014-08-19", "toFormatted default");
	ok(toFormatted(this.date1, "d/m/Y") === "19/08/2014", "toFormatted d/m/Y");
	ok(toFormatted(this.date1, "Y-m-d H:i:s") === "2014-08-19 21:11:23", "toFormatted Y-m-d H:i:s");
	ok(toFormatted(this.date1, "ga") === "9pm", "toFormatted ga:pm");
	ok(toFormatted(this.date3, "ga") === "12pm", "toFormatted ga:pm");
	ok(toFormatted(this.date2, "ga") === "11am", "toFormatted ga:am");
	ok(toFormatted().match(/^\d{4}-\d{2}-\d{2}$/), "toFormatted no param");
	//date.format = 'd/m/Y';//
	//ok(toFormatted(this.date1)==='19/08/2014','toFormatted set default');
});

},{"./../../../src/internal/date":3}],14:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/*global QUnit,test,ok*/

var node = _interopRequireWildcard(require("./../../../src/internal/node"));

QUnit.module("node");
test("node", function () {
	ok(!!node, "todo"); //todo:test
});

},{"./../../../src/internal/node":4}],15:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/*global QUnit,test,ok*/

var number = _interopRequireWildcard(require("./../../../src/internal/number"));

QUnit.module("number");
test("formatSize", function () {
	ok(number.formatSize(12436798) === "12MB", "formatSize");
});

},{"./../../../src/internal/number":5}],16:[function(require,module,exports){
"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

/*global QUnit,test,ok*/

var string = _interopRequireWildcard(require("./../../../src/internal/string"));

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
	ok(toSlug(" Foo bar bAz?") === "foo-bar-baz", "Foo bär bAz");
	ok(toSlug("Foo bär bAz?") === "foo-bar-baz", "Foo bär bAz");
});
test("normalize", function () {
	ok(string.camelCase("foo bar baz") === "fooBarBaz", "normalize");
});

},{"./../../../src/internal/string":6}],17:[function(require,module,exports){
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

},{"./../../../src/namespace":7}],18:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

/*global QUnit,asyncTest,ok,start*/

var timeout = _interopRequire(require("./../../../src/timeout"));

QUnit.module("timeout");
asyncTest("timeout", function () {
	timeout(function () {}).then(function () {
		ok(true, "then");
		start();
	});
});

},{"./../../../src/timeout":8}],19:[function(require,module,exports){
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

},{"./../../../src/type":9}],20:[function(require,module,exports){
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

},{}]},{},[10])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcVXNlcnNcXFJvblxcQXBwRGF0YVxcUm9hbWluZ1xcbnBtXFxub2RlX21vZHVsZXNcXGJyb3dzZXJpZnlcXG5vZGVfbW9kdWxlc1xcYnJvd3Nlci1wYWNrXFxfcHJlbHVkZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvY2FwYWJpbGl0aWVzLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3NyYy9lbnZpcm9ubWVudC5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvaW50ZXJuYWwvZGF0ZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvaW50ZXJuYWwvbm9kZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvaW50ZXJuYWwvbnVtYmVyLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3NyYy9pbnRlcm5hbC9zdHJpbmcuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvc3JjL25hbWVzcGFjZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvdGltZW91dC5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC9zcmMvdHlwZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC90ZXN0L3VuaXQvc3JjL3Rlc3QuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvdGVzdC91bml0L3NyYy90ZXN0Q2FwYWJpbGl0aWVzLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3Rlc3QvdW5pdC9zcmMvdGVzdEVudmlyb25tZW50LmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3Rlc3QvdW5pdC9zcmMvdGVzdEludGVybmFsRGF0ZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC90ZXN0L3VuaXQvc3JjL3Rlc3RJbnRlcm5hbE5vZGUuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvdGVzdC91bml0L3NyYy90ZXN0SW50ZXJuYWxOdW1iZXIuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvdGVzdC91bml0L3NyYy90ZXN0SW50ZXJuYWxTdHJpbmcuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvdGVzdC91bml0L3NyYy90ZXN0TmFtZXNwYWNlLmpzIiwiQzoveGFtcHAvaHRkb2NzL2lkZHFkL3Rlc3QvdW5pdC9zcmMvdGVzdFRpbWVvdXQuanMiLCJDOi94YW1wcC9odGRvY3MvaWRkcWQvdGVzdC91bml0L3NyYy90ZXN0VHlwZS5qcyIsIkM6L3hhbXBwL2h0ZG9jcy9pZGRxZC92ZW5kb3IvbG9kYXNoL2Rpc3QvbG9kYXNoLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O2lCQ0VlLENBQUMsWUFBSTtBQUNuQixLQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUztLQUM1QixVQUFVLEdBQUcsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUNqQztBQUNELFFBQU87QUFDTixZQUFVLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVO0FBQzdCLE9BQUssRUFBRSxDQUFDLEVBQUUsQUFBQyxVQUFVLElBQUUsUUFBUSxJQUFFLFVBQVUsSUFBRSxVQUFVLElBQUssTUFBTSxDQUFDLGFBQWEsSUFBSSxRQUFRLFlBQVksYUFBYSxDQUFBLEFBQUM7RUFDdkgsQ0FBQztDQUNGLENBQUEsRUFBRzs7Ozs7OztpQkNUVyxDQUFDLFlBQUk7QUFDbkIsS0FDQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFNBQVM7S0FDNUIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxTQUFTO0tBQ2pDLE1BQU0sR0FBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7S0FDckMsUUFBUSxHQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztLQUN6QyxNQUFNLEdBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO0tBQ3JDLFNBQVMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7S0FDMUMsWUFBWSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztLQUNoRCxVQUFVLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0tBQzVDLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxLQUFHLFNBQVM7S0FDeEMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLEtBQUcsU0FBUzs7QUFBQTtLQUV0QyxLQUFLLEdBQUksTUFBTSxJQUFFLFFBQVEsSUFBRSxNQUFNO0tBQ2pDLFFBQVEsR0FBSSxLQUFLLElBQUUsU0FBUyxJQUFFLFlBQVksSUFBRSxVQUFVO0tBQ3RELFlBQVksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FDdkM7QUFDRCxVQUFTLGFBQWEsR0FBRTtBQUN2QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSTtNQUN6QixPQUFPLEdBQUcsTUFBTTtNQUNoQixZQUFZLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzRCxRQUFNLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxVQUFRLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxRQUFNLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQyxXQUFTLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQyxjQUFZLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxZQUFZLENBQUMsQ0FBQztBQUNqRCxZQUFVLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QyxPQUFLLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxVQUFRLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxZQUFVLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QyxXQUFTLElBQUUsWUFBWSxDQUFDLE9BQU8sR0FBQyxTQUFTLENBQUMsQ0FBQztFQUMzQztBQUNELFFBQU87QUFDTixRQUFNLEVBQUMsTUFBTTtBQUNaLFVBQVEsRUFBQyxRQUFRO0FBQ2pCLFFBQU0sRUFBQyxNQUFNO0FBQ2IsV0FBUyxFQUFDLFNBQVM7QUFDbkIsY0FBWSxFQUFDLFlBQVk7QUFDekIsWUFBVSxFQUFDLFVBQVU7QUFDckIsT0FBSyxFQUFDLEtBQUs7QUFDWCxVQUFRLEVBQUMsUUFBUTtBQUNqQixZQUFVLEVBQUUsWUFBWTtBQUN4QixlQUFhLEVBQUMsYUFBYTtFQUM1QixDQUFDO0NBQ0YsQ0FBQSxFQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUNTWSxXQUFXLEdBQVgsV0FBVzs7Ozs7O0FBakQzQjs7T0FFSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxVQUFVLENBQUM7SUFDbEYsUUFBUSxHQUFHLENBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDO0lBQ3RELE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsVUFBVSxDQUFDO0lBQ3hILFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsS0FBSyxDQUFDO0lBQzdGLGVBQWUsR0FBRyxDQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0FBQUE7SUFTdkMsT0FBTyxHQUFHLElBQUk7SUFDZCxPQUFPLEdBQUcsT0FBTyxHQUFDLEVBQUU7SUFDcEIsS0FBSyxHQUFHLE9BQU8sR0FBQyxFQUFFO0lBQ2xCLElBQUksR0FBRyxLQUFLLEdBQUMsRUFBRSxDQUNoQixBQThCTSxTQUFTLFdBQVcsR0FBZ0M7S0FBL0IsSUFBSSxnQ0FBQyxJQUFJLElBQUksRUFBRTtLQUFDLE1BQU0sZ0NBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUV6RCxLQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXBCLE1BQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDckMsTUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztNQUNmLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFO01BQzFCLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO01BQ3hCLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFO01BQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO01BQ3hCLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUMsSUFBSSxDQUFDO01BQ3hFLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFO01BQ3hCLFNBQVMsR0FBRyxNQUFNLEdBQUMsRUFBRTtNQUNyQixRQUFRLEdBQUcsU0FBUyxLQUFHLENBQUMsR0FBQyxFQUFFLEdBQUMsU0FBUztNQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtNQUM1QixRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtNQUM1QixLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBQyxDQUFDLENBQUEsR0FBRSxDQUFDLENBQUM7QUFBQTtNQUNqQyxTQUFTLEdBQUcsQUFBQyxLQUFLLEdBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxLQUFLLEdBQUMsR0FBRyxLQUFHLENBQUMsSUFBSSxLQUFLLEdBQUMsR0FBRyxLQUFHLENBQUMsQUFBQztNQUN6RCxHQUFHLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQU0sQ0FBQyxnQkFBSSxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUEsQ0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUFDLENBQ3REO0FBQ0QsVUFBUSxDQUFDOztBQUVSLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUMsTUFBTTtBQUFBLEFBQzVDLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDbEQsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEtBQUssQ0FBQyxBQUFDLE1BQU07QUFBQSxBQUNyQyxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEFBQUMsTUFBTTtBQUFBLEFBQzlDLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxRQUFRLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxRQUFRLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDdkQsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEtBQUssR0FBQyxlQUFlLENBQUMsTUFBTSxHQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFDLGVBQWUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDL0gsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLFFBQVEsQ0FBQyxBQUFDLE1BQU07QUFBQSxBQUN4QyxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksUUFBUSxDQUFDLEFBQUMsTUFBTTtBQUFBO0FBRXhDLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxLQUFLLEtBQUcsQ0FBQyxHQUFDLEVBQUUsR0FBQyxLQUFLLENBQUMsQUFBQyxNQUFNO0FBQUE7QUFFbEQsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLE1BQU07QUFBQSxBQUM5QyxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDL0MsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxBQUFDLE1BQU07QUFBQSxBQUNsRCxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksTUFBTSxHQUFDLENBQUMsQ0FBQyxBQUFDLE1BQU07QUFBQSxBQUN4QyxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksTUFBTSxLQUFHLENBQUMsSUFBRSxDQUFDLFNBQVMsR0FBQyxFQUFFLEdBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFBLEdBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQUFBQyxNQUFNO0FBQUE7QUFFNUYsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLFNBQVMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEFBQUMsTUFBTTtBQUFBLEFBQzdDLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxLQUFLLEtBQUcsQ0FBQyxHQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFDLEFBQUMsTUFBTTtBQUN2RCxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksS0FBSyxDQUFDLEFBQUMsTUFBTTtBQUFBLEFBQ3JDLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLE1BQU07QUFBQTtBQUV6RCxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksTUFBTSxHQUFDLEVBQUUsR0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLEFBQUMsTUFBTTtBQUFBLEFBQ25ELFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxNQUFNLEdBQUMsRUFBRSxHQUFDLElBQUksR0FBQyxJQUFJLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDbkQsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEVBQUUsQ0FBQyxBQUFDLE1BQU07QUFBQSxBQUNsQyxRQUFLLEdBQUc7QUFBRSxjQUFVLElBQUksUUFBUSxDQUFDLEFBQUMsTUFBTTtBQUFBLEFBQ3hDLFFBQUssR0FBRztBQUFFLGNBQVUsSUFBSSxNQUFNLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDdEMsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDL0MsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDN0MsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDL0MsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsQUFBQyxNQUFNO0FBQUEsQUFDL0MsUUFBSyxHQUFHO0FBQUUsY0FBVSxJQUFJLEVBQUUsQ0FBQyxBQUFDLE1BQU07QUFBQTtBQUVsQztBQUNDLGNBQVUsSUFBSSxDQUFDLENBQUM7QUFBQSxHQUNqQjtFQUNEO0FBQ0QsUUFBTyxV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QUM7RUFDckQ7QUFDRCxRQUFPLElBQUksQ0FBQztDQUNaLEFBc0RNLFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBQztBQUMxQixRQUFPLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQSxDQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsVUFBQSxFQUFFO1NBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7RUFBQSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQzFHLEFBT00sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFDO0FBQzNCLFFBQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsVUFBQSxFQUFFO1NBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQztFQUFBLENBQUMsQ0FBQztDQUN4RyxBQU9NLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBQztBQUN0QixLQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFBLEVBQUU7U0FBRSxHQUFHLEdBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRTtFQUFBLENBQUMsQ0FBQztBQUMzRCxLQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN0QyxRQUFPLENBQUMsSUFBRSxNQUFNLEdBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQztDQUMvQixBQU9NLFNBQVMsVUFBVSxDQUFDLENBQUMsRUFBQztBQUM1QixLQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFBLEVBQUU7U0FBRSxHQUFHLEdBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRTtF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LENBQUMsS0FBRyxTQUFTLEVBQUMsVUFBVSxDQUFDLENBQUM7Q0FDdEQsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLFdBQVcsRUFBRSxZQUFXO0FBQzVCLEtBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDakMsR0FBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBRyxXQUFXLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkQsR0FBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBRyxXQUFXLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkQsR0FBRSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBRyxXQUFXLEVBQUMsV0FBVyxDQUFDLENBQUM7Q0FDdkQsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFXO0FBQ3ZCLEtBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDdkIsR0FBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBRyxhQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsR0FBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBRyxhQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDN0MsR0FBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBRyxhQUFhLEVBQUMsTUFBTSxDQUFDLENBQUM7Q0FDL0MsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFXO0FBQzdCLEtBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDbkMsR0FBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBRyxhQUFhLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0QsR0FBRSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBRyxhQUFhLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFDekQsR0FBRSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBRyxhQUFhLEVBQUMsWUFBWSxDQUFDLENBQUM7Q0FDM0QsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFXO0FBQzFCLEtBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDckIsR0FBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxLQUFHLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxHQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEtBQUcsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xDLEdBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEtBQUcsS0FBSyxFQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQzNDLEdBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxHQUFHLENBQUMsS0FBRyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDbkMsR0FBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxLQUFHLE1BQU0sRUFBQyxLQUFLLENBQUMsQ0FBQztDQUNyQyxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsT0FBTyxFQUFFLFlBQVc7QUFDeEIsS0FBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN6QixHQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFHLEtBQUssRUFBQyxTQUFTLENBQUMsQ0FBQztBQUMzQyxHQUFFLENBQUMsS0FBSyxDQUFDLGlFQUFpRSxDQUFDLEtBQUcsSUFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzlGLEdBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsS0FBRyxJQUFJLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkQsR0FBRSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFHLElBQUksRUFBQyxVQUFVLENBQUMsQ0FBQztBQUNsRCxHQUFFLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLEtBQUcsS0FBSyxFQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDMUQsR0FBRSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBQyxLQUFLLENBQUMsS0FBRyxJQUFJLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztDQUNqRSxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFLFlBQVc7QUFDekIsS0FBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUMzQixHQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFHLGFBQWEsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUMxRCxHQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFHLGFBQWEsRUFBQyxhQUFhLENBQUMsQ0FBQztDQUN6RCxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVc7QUFDNUIsR0FBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUcsV0FBVyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQzlELENBQUMsQ0FBQzs7Ozs7Ozs7O0lDM0VJLFNBQVMsMkJBQU0sMEJBQTBCOztBQUNoRCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFCLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBVTs7QUFFMUIsR0FBRSxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQzFELEdBQUUsRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzs7Q0FFN0QsQ0FBQyxDQUFDOzs7Ozs7Ozs7SUNQSSxPQUFPLDJCQUFNLHdCQUF3Qjs7QUFDNUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QixTQUFTLENBQUMsU0FBUyxFQUFDLFlBQVk7QUFDL0IsUUFBTyxDQUFDLFlBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDeEIsSUFBRSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQztBQUNoQixPQUFLLEVBQUUsQ0FBQztFQUNSLENBQUMsQ0FBQztDQUNILENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUNQSSxJQUFJLDJCQUFNLHFCQUFxQjs7QUFFdEMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQixJQUFJLENBQUMsV0FBVyxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBRyxJQUFJLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDN0UsSUFBSSxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUcsSUFBSSxDQUFDLElBQUksRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3pELElBQUksQ0FBQyxRQUFRLEVBQUMsWUFBSTtBQUNqQixHQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEMsR0FBRSxDQUFDLElBQUksWUFBVyxLQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsV0FBVyxDQUFDLENBQUM7Q0FDOUMsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLE9BQU8sRUFBQyxZQUFJO0FBQ2hCLEdBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUcsSUFBSSxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixHQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsS0FBRyxJQUFJLENBQUMsS0FBSyxFQUFDLFdBQVcsQ0FBQyxDQUFDO0NBQy9DLENBQUMsQ0FBQztBQUNILElBQUksQ0FBQyxNQUFNLEVBQUMsWUFBSTtBQUNmLEdBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxJQUFJLEVBQUMsTUFBTSxDQUFDLENBQUM7Q0FDekQsQ0FBQyxDQUFDOzs7Ozs7QUFNSCxJQUFJLENBQUMsVUFBVSxFQUFDLFlBQUk7QUFDbkIsR0FBRSxDQUFDLElBQUksQ0FBQyxZQUFVLEVBQUUsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7Q0FDbEQsQ0FBQyxDQUFDO0FBQ0gsSUFBSSxDQUFDLFFBQVEsRUFBQyxZQUFJO0FBQ2pCLEdBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQztBQUNoQyxHQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQyxVQUFVLENBQUMsQ0FBQztDQUM1QyxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsU0FBUyxFQUFDLFlBQUk7QUFDbEIsR0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBRyxJQUFJLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3JDLEdBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUcsSUFBSSxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUMsQ0FBQztDQUN2QyxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsS0FBSyxFQUFDLFlBQUk7QUFDZCxHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFHLElBQUksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsR0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBRyxJQUFJLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLEdBQUUsQ0FBQyxJQUFJLENBQUMsR0FBSSxDQUFDLEtBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUNqQyxHQUFFLENBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxLQUFHLElBQUksQ0FBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsR0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUcsSUFBSSxDQUFDLEtBQUssRUFBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQzNELEdBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFHLElBQUksQ0FBQyxHQUFHLEVBQUMsa0JBQWtCLENBQUMsQ0FBQztDQUN6RCxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsT0FBTyxFQUFDLFlBQUk7QUFDaEIsR0FBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBRyxJQUFJLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2pDLEdBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFHLElBQUksQ0FBQyxLQUFLLEVBQUMsU0FBUyxDQUFDLENBQUM7QUFDekMsR0FBRSxDQUFDLElBQUksQ0FBQyxNQUFJLENBQUMsS0FBRyxJQUFJLENBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ25DLENBQUMsQ0FBQztBQUNILElBQUksQ0FBQyxLQUFLLEVBQUMsWUFBSTtBQUNkLEdBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUcsSUFBSSxDQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUMvQixHQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBRyxJQUFJLENBQUMsR0FBRyxFQUFDLEtBQUssQ0FBQyxDQUFDO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksQ0FBQyxVQUFVLEVBQUMsWUFBSTtBQUNuQixHQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUMsR0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUcsSUFBSSxDQUFDLFFBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxHQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUM5RSxHQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFHLElBQUksQ0FBQyxRQUFRLEVBQUMsMEJBQTBCLENBQUMsQ0FBQztDQUM5RSxDQUFDLENBQUM7QUFDSCxJQUFJLENBQUMsUUFBUSxFQUFDLFlBQUk7QUFDakIsR0FBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3pDLEdBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDLFlBQVksQ0FBQyxDQUFDO0NBQ3BELENBQUMsQ0FBQztBQUNILElBQUksQ0FBQyxNQUFNLEVBQUMsWUFBSTtBQUNmLEdBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxLQUFHLElBQUksQ0FBQyxJQUFJLEVBQUMsVUFBVSxDQUFDLENBQUM7Q0FDNUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ3pESCxDQUFDLENBQUMsWUFBVTtBQUFDLFdBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsS0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQztBQUFDLGFBQU8sQ0FBQyxDQUFDO0tBQUEsT0FBTSxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFNBQVMsSUFBRSxDQUFDLElBQUUsSUFBSSxJQUFFLENBQUMsQ0FBQTtBQUFDLGFBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztLQUFBLFFBQVEsSUFBRSxDQUFDLElBQUUsUUFBUSxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsUUFBUSxDQUFBLEFBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxRQUFRLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxRQUFRLElBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBLENBQUE7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFHLFNBQVMsSUFBRSxDQUFDLElBQUUsSUFBSSxJQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUk7QUFBQyxjQUFRLElBQUUsQ0FBQyxJQUFFLFFBQVEsSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLFFBQVEsQ0FBQSxBQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsUUFBUSxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUEsQUFBQyxDQUFDLFFBQVEsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxDQUFDLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUE7S0FDOWY7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxXQUFPLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsS0FBRyxDQUFDLEVBQUM7QUFBQyxZQUFHLENBQUMsR0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsV0FBVztBQUFDLGlCQUFPLENBQUMsQ0FBQztTQUFBLElBQUcsQ0FBQyxHQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxXQUFXO0FBQUMsaUJBQU0sQ0FBQyxDQUFDLENBQUE7U0FBQTtPQUFDO0tBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU07UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7UUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUTtBQUFDLGFBQU8sS0FBSyxDQUFDO0tBQUEsS0FBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0dBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBTSxJQUFJLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0dBQzdmLFNBQVMsQ0FBQyxHQUFFO0FBQUMsV0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUUsRUFBRSxDQUFBO0dBQUMsU0FBUyxDQUFDLEdBQUU7QUFBQyxXQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBRSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLEtBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7R0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxRQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtHQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsS0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLE9BQU8sQ0FBQyxJQUFFLFdBQVcsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0dBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFHLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxBQUNsaUIsQ0FBQyxHQUFDLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxXQUFXLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUcsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLENBQUMsR0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsV0FBVyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBRyxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxLQUFJLElBQUksQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLElBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxJQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDO0FBQ2hnQixhQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxJQUFJLENBQUMsR0FBQyxTQUFTO1VBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLElBQUUsUUFBUSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUcsQ0FBQyxHQUFDLENBQUMsSUFBRSxVQUFVLElBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxJQUFFLFVBQVUsSUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUcsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLGFBQWEsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUN4aEIsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsV0FBVyxHQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQztBQUFDLGVBQVMsQ0FBQyxHQUFFO0FBQUMsWUFBRyxDQUFDLEVBQUM7QUFBQyxjQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUE7U0FBQyxJQUFHLElBQUksWUFBWSxDQUFDLEVBQUM7QUFBQyxjQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztjQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsU0FBUyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtTQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLFNBQVMsQ0FBQyxDQUFBO09BQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxXQUFXO0FBQUMsaUJBQU8sQ0FBQyxDQUFBO1NBQUE7T0FBQyxJQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUFDLGVBQU8sQ0FBQyxDQUFDO09BQUEsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFDLGVBQU8sQ0FBQyxDQUFDO09BQUEsSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQU8sQ0FBQyxHQUFFLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUFDLGlCQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsaUJBQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0FBQUMsa0JBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFBLENBQUE7QUFBQSxPQUN6aUIsS0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQSxBQUFDLENBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxHQUFFLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUM7QUFBQyxpQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FBQSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUMsRUFBRSxDQUFBO09BQUMsTUFBSyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLFFBQU8sQ0FBQyxLQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQSxBQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUcsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBLENBQUUsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxFQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLENBQUEsR0FBRSxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsT0FBTyxDQUFDLElBQUUsVUFBVTtBQUFDLGVBQU8sRUFBRSxDQUFDO09BQUEsSUFBRyxPQUFPLENBQUMsSUFBRSxXQUFXLElBQUUsRUFBRSxXQUFXLElBQUcsQ0FBQyxDQUFBLEFBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQztPQUFBLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxXQUFXLEtBQUcsRUFBRSxDQUFDLFNBQVMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBLEFBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFqQixVQUFFLENBQUMsU0FBUyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLElBQUcsS0FBSyxLQUFHLENBQUMsSUFBRSxJQUFJLEtBQUcsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxRQUFPLENBQUMsR0FBRSxLQUFLLENBQUM7QUFBQyxpQkFBTyxVQUFTLENBQUMsRUFBQztBQUFDLG1CQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1dBQUMsQ0FBQyxLQUFLLENBQUM7QUFBQyxpQkFBTyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxtQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7V0FBQyxDQUFDLEtBQUssQ0FBQztBQUFDLGlCQUFPLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxtQkFBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1dBQUMsQ0FBQyxLQUFLLENBQUM7QUFBQyxpQkFBTyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLG1CQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1dBQUMsQ0FBQSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGVBQVMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBRyxDQUFDLEVBQUM7QUFBQyxjQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsU0FBUyxDQUFDLENBQUE7U0FBQyxPQUFNLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQSxLQUFJLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBLEFBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxLQUFHLENBQUMsR0FBQyxTQUFTLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxJQUFJLFlBQVksQ0FBQyxJQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUN6bUIsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFFO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBRyxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsR0FBQyxLQUFLLENBQUE7T0FBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBTyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsT0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFHLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFFLFFBQVEsS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQztBQUFDLFdBQUMsS0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztjQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTTtjQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUFDLE1BQUssQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxPQUFPLENBQUMsQ0FBQTtLQUM1ZixTQUFTLEVBQUU7OztnQ0FBYTs7WUFBWixDQUFDO1lBQUMsQ0FBQztZ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QUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFBLEFBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFBLEFBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsR0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDO0FBQUMsaUJBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQztTQUFBLElBQUksQ0FBQyxHQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxFQUFDO0FBQUMsZUFBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFBLEVBQUMsT0FBSyxDQUFDLEVBQUUsR0FBRSxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsRUFBQyxPQUFLLENBQUMsRUFBRSxJQUFFLEVBQUUsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLElBQUcsRUFBRSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLE1BQUs7U0FBQyxNQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGlCQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxHQUFFLEtBQUssQ0FBQyxDQUFBO1NBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxpQkFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEdBQUMsS0FBSyxDQUFDLENBQUE7U0FDeGpCLENBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO09BQUM7S0FBQSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsT0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQSxDQUFFLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUM7WUFBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxLQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUM7QUFBQyxlQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxHQUFFLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEVBQUM7QUFBQyxhQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQUs7V0FBQyxJQUFHLENBQUMsQ0FBQyxFQUFDO0FBQUMsZ0JBQUksQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLElBQUUsV0FBVyxDQUFBLEFBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1dBQUM7U0FBQyxNQUFLLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBRSxXQUFXLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxFQUFDLE9BQU8sQ0FBQyxJQUFFLFdBQVcsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRTtVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUU7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQztBQUNqaEIsV0FBSSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEtBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLElBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLFFBQU8sQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLEVBQUMsT0FBSyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxjQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxNQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1NBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRTs7Ozs7Z0NBQWE7O1lBQVosQ0FBQztZQUFDLENBQUM7WUFBQyxDQUFDO1lBQUMsQ0FBQztZQUFDLENBQUM7WUFBQyxDQUFDO0FBQU0sU0FBQyxHQUFLLENBQUMsR0FBSyxDQUFDLEdBQU0sQ0FBQyxHQUM5WixDQUFDO0FBRHFZLFlBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsSUFBRyxFQUFFLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBRyxDQUFDLElBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUEsQUFBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUcsQ0FBQyxJQUFFLENBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFBLEFBQUMsQ0FBQztBQUN4Z0IsWUFBSSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsQUFBTyxJQUFBLENBQUMsSUFBRSxJQUFJLEtBQUcsQ0FBQztBQUFFLFdBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEFBQWlCO3VCQUFGLENBQUM7Ozs7Ozs7Ozs7aUJBQUcsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxDQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUFBO09BQUM7S0FBQSxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxHQUFFO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQSxLQUFJLEVBQUUsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxPQUFPLENBQUMsSUFBRSxVQUFVLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFBLEFBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsR0FBQyxDQUFDLENBQUE7T0FDMWdCLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBRSxXQUFXLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsR0FBRSxLQUFLLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxJQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLEtBQUssQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxRQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtPQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxPQUFPLENBQUMsSUFBRSxVQUFVLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxhQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7S0FDdmdCLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsS0FBSyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxLQUFLLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRTtVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxRQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLElBQUUsUUFBUSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxlQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxLQUFLLENBQUMsR0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BoQixVQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLEVBQUMsT0FBSyxFQUFFLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxlQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLEVBQUMsT0FBSyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLE1BQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsT0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLElBQUcsT0FBTyxDQUFDLElBQUUsUUFBUSxFQUFDO0FBQUMsWUFBSSxDQUFDLENBQUMsUUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxpQkFBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQSxHQUFFLEtBQUssQ0FBQyxDQUFBO1NBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO09BQUMsT0FBSyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcmdCLFlBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQUMsaUJBQU8sQ0FBQyxDQUFBO1NBQUE7T0FBQztLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLElBQUUsT0FBTyxDQUFDLElBQUUsV0FBVyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsSUFBRSxRQUFRLENBQUEsRUFBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFdBQVcsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLElBQUUsUUFBUSxDQUFBLEVBQUMsT0FBSyxDQUFDLEVBQUUsSUFBRSxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSTtBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxrQkFBTyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUE7U0FBQyxDQUFDLENBQUE7T0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLElBQUUsUUFBUSxDQUFBLEVBQUMsS0FBSSxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxLQUNuaEIsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBRyxPQUFPLENBQUMsSUFBRSxVQUFVLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEtBQUcsQ0FBQyxHQUFDLElBQUksQ0FBQSxBQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsRUFBQztBQUFDLFNBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsY0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7U0FBQztPQUFDLE1BQUssQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsQ0FBQyxDQUFDO0FBQUMsZUFBTyxDQUFDLENBQUM7T0FBQSxJQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUcsT0FBTyxDQUFDLElBQUUsUUFBUSxFQUFDLEtBQUksQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQ3ZoQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLFFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFFBQVEsRUFBQyxPQUFLLEVBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxlQUFNLEVBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLENBQUMsQ0FBQyxPQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLElBQUcsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLElBQUksSUFBRSxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1aEIsYUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQTtPQUFDLE1BQUssS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLElBQUksSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFBO0FBQUMsZUFBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztPQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQTtPQUFDLE1BQUssSUFBRyxDQUFDO0FBQUMsZ0JBQU8sQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztPQUFBLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUcsT0FBTyxDQUFDLElBQUUsUUFBUSxJQUFFLElBQUksSUFBRSxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDO1lBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRSxDQUFDLEVBQUUsQ0FBQTtPQUFDLE1BQUssQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQzVpQixhQUFPLENBQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sT0FBTyxDQUFDLElBQUUsU0FBUyxJQUFFLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQSxBQUFDLEVBQUMsSUFBSSxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsU0FBUyxFQUFFLEdBQUU7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLFNBQVMsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEtBQUksQ0FBQyxJQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsRUFBRSxDQUFBLEFBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3RoQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQVMsQ0FBQyxHQUFFO0FBQUMsU0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsQ0FBQSxLQUFJLENBQUMsR0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQSxBQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsU0FBUyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLElBQUUsRUFBRSxFQUFFLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQSxBQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsQ0FBQTtPQUFDLElBQUksQ0FBQztVQUFDLENBQUM7VUFBQyxDQUFDO1VBQUMsQ0FBQztVQUFDLENBQUM7VUFBQyxDQUFDO1VBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEtBQUs7VUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLElBQUksS0FBRyxDQUFDLENBQUEsRUFBQyxJQUFJLENBQUMsR0FBQyxJQUFJO1VBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLEdBQUMsU0FBUyxJQUFHLENBQUMsS0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxVQUFVLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxPQUFPLFlBQVU7QUFBQyxhQUFHLENBQUMsR0FBQyxTQUFTLEVBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBRSxFQUFDLENBQUMsR0FBQyxJQUFJLEVBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLEtBQUssS0FBRyxDQUFDLENBQUEsRUFBQyxJQUFJLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSTtBQUFDLFdBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQztjQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDO0FBQ3BoQixXQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtTQUFDLFFBQU8sQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLElBQUksRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO09BQUMsQ0FBQTtLQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxDQUFBO0tBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxJQUFJO1VBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxDQUFBLEFBQUMsS0FBRyxJQUFJLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLEtBQUssS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsT0FBTyxJQUFHLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQSxBQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUMsWUFBVTtBQUFDLGNBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxTQUFTO2NBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxXQUFXO2NBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQSxFQUFDO0FBQUMsZ0JBQUcsQ0FBQyxLQUFHLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxJQUFJLENBQUM7QUFDamdCLGFBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLENBQUMsQ0FBQTtXQUFDLE9BQU8sQ0FBQyxDQUFBO1NBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxDQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsR0FBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sVUFBUyxDQUFDLEVBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUE7S0FBQyxTQUFTLEVBQUUsR0FBRTtBQUFDLGFBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtLQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFDLENBQUMsQ0FBQyxLQUFLO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxPQUFPO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxJQUFJO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxRQUFRO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxJQUFJO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxNQUFNO1FBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxTQUFTO1FBQUMsRUFBRSxHQUFDLEVBQUU7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLFNBQVM7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLFFBQVE7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBQyxLQUFLLENBQUMsR0FBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLElBQUk7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLFlBQVk7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEtBQUs7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFFLEVBQUU7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLGNBQWM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLElBQUk7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLFVBQVU7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLE1BQU07UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLE9BQU87UUFBQyxFQUFFLEdBQUMsQ0FBQSxZQUFVO0FBQUMsVUFBRztBQUFDLFlBQUksQ0FBQyxHQUFDLEVBQUU7WUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUUsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUE7T0FDbHJCLENBQUEsT0FBTSxDQUFDLEVBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtLQUFDLENBQUEsRUFBRTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBRSxFQUFFO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFFLEVBQUU7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLFFBQVE7UUFBQyxFQUFFLEdBQUMsQ0FBQyxDQUFDLEtBQUs7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUUsRUFBRTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRztRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsR0FBRztRQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsUUFBUTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsTUFBTTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsR0FBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxJQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsZ0JBQWdCLEdBQUMsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsUUFBUSxFQUFDLGlCQUFpQixFQUFDLFdBQVcsRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxFQUFFLEtBQUcsRUFBRSxHQUFDLENBQUEsWUFBVTtBQUFDLGVBQVMsQ0FBQyxHQUFFLEVBQUUsT0FBTyxVQUFTLENBQUMsRUFBQztBQUFDLFlBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQUMsV0FBQyxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDdGlCLGNBQUksQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFBLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUE7U0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUE7T0FBQyxDQUFBO0tBQUMsQ0FBQSxFQUFFLENBQUEsQUFBQyxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLGNBQWMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEdBQUMsRUFBRTtRQUFDLEVBQUUsR0FBQyxFQUFFLElBQUUsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxLQUFLLENBQUE7S0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFBO0tBQUMsR0FBQyxDQUFDO1FBQUMsRUFBRSxHQUFDLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsSUFBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDNWdCLEdBQUMsRUFBRTtRQUFDLEVBQUUsR0FBQyxFQUFFLENBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFFBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7S0FBQyxDQUFDO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsT0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxDQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLENBQUM7UUFBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0tBQUMsQ0FBQztRQUFDLEVBQUUsR0FBQyxFQUFFO1FBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFFLEVBQUUsSUFBRSxZQUFVO0FBQUMsYUFBTSxBQUFDLElBQUksRUFBRSxFQUFBLENBQUUsT0FBTyxFQUFFLENBQUE7S0FBQztRQUFDLEVBQUUsR0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUE7S0FBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUEsQ0FBQyxPQUFPLFlBQVU7QUFBQyxlQUFPLENBQUMsR0FBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsR0FBQyxLQUFLLENBQUMsQ0FBQTtPQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzaEIsYUFBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRTtBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGNBQU8sQ0FBQyxHQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsT0FBTyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsWUFBVTtBQUFDLFdBQUksSUFBSSxDQUFDLEdBQUMsU0FBUyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxHQUFFLElBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDO0FBQ3JnQixhQUFPLFlBQVU7QUFBQyxhQUFJLElBQUksQ0FBQyxHQUFDLFNBQVMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsR0FBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sWUFBVTtBQUFDLGVBQU8sQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxjQUFjLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUcsSUFBSSxJQUFFLENBQUMsSUFBRSxVQUFVLElBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxRQUFRLElBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBRSxDQUFDLEtBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsS0FBSyxFQUFDLENBQUMsRUFBRSxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUEsQUFBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO09BQUMsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGdCQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxLQUFHLENBQUMsS0FBRyxDQUFDLEtBQUcsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUEsQ0FBQTtPQUMvZ0IsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxjQUFPLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsWUFBVTtBQUFDLFNBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLE1BQU0sSUFBSSxFQUFFLEVBQUEsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVU7QUFBQyxTQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxjQUFPLE9BQU8sQ0FBQyxJQUFFLFNBQVMsSUFBRSxJQUFJLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxJQUFFLFVBQVUsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLENBQUEsQUFBQyxFQUFDLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLENBQUE7S0FDN2lCLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFlBQVksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBRSxLQUFLLEtBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsSUFBSSxJQUFFLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUE7T0FBQyxNQUFLLENBQUMsR0FBQyxJQUFJLElBQUUsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsWUFBWSxHQUFDLFlBQVU7QUFBQyxXQUFJLElBQUksQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxFQUFDLENBQUMsR0FBQyxFQUFFLEVBQUUsRUFBQyxDQUFDLEdBQUMsQ0FBQyxLQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pqQixTQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsS0FBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFFLENBQUMsQ0FBQyxNQUFNLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLE9BQUssRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUM7QUFBQyxlQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFBLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLENBQUEsRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQUM7T0FBQyxPQUFLLENBQUMsRUFBRSxHQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLE9BQU8sQ0FBQyxJQUFFLFVBQVU7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUUsUUFBUSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUUsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDO0FBQy9nQixjQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsU0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQVMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUs7WUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxHQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFBO09BQUMsSUFBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLElBQUksRUFBRSxFQUFBLENBQUMsUUFBTyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLFNBQVM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLENBQUMsS0FBRyxRQUFRLElBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsVUFBVSxJQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUMsQ0FBQyxJQUFFLFVBQVUsSUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xpQixjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFHLE9BQU8sQ0FBQyxJQUFFLFVBQVUsSUFBRSxDQUFDLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsS0FBRyxDQUFDLEdBQUMsSUFBSSxDQUFBLEFBQUMsRUFBQyxJQUFJLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQSxFQUFDO0FBQUMsU0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxjQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtTQUFDO09BQUMsTUFBSyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxVQUFVLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxXQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQUMsQ0FBQyxDQUFDLEtBQUksSUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsY0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQztPQUFDLE1BQUssQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUN0aEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDLE9BQU8sWUFBVTtBQUFDLGVBQU8sQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxTQUFTLENBQUMsRUFBQyxDQUFDLEdBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQSxBQUFDLENBQUE7T0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFO0FBQUMsWUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtPQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxJQUFHLE9BQU8sQ0FBQyxJQUFFLFVBQVUsRUFBQyxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtPQUNqZ0IsTUFBSyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFNBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsV0FBSSxJQUFJLENBQUMsR0FBQyxTQUFTLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxLQUFJLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEtBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUEsQUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxPQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLENBQUMsR0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxJQUFJLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxJQUFHLENBQUMsSUFBRSxDQUFDLENBQUEsQUFBQyxDQUFDLENBQUMsQ0FBQyxLQUFJLElBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxjQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsZUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQzFmLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLENBQUEsQUFBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxpQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFBLENBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUM3ZixFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLElBQUk7VUFBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLElBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsTUFBTSxJQUFJLEVBQUUsRUFBQSxDQUFDLFFBQU8sS0FBSyxLQUFHLENBQUMsR0FBQyxDQUFDLEdBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsU0FBUyxJQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsVUFBVSxJQUFHLENBQUMsR0FBQyxDQUFDLENBQUMsUUFBUSxHQUFDLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsT0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxBQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLElBQUUsT0FBTyxDQUFDLENBQUMsTUFBTSxJQUFFLFFBQVEsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxJQUFFLENBQUMsRUFBQyxJQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLEtBQUk7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7T0FBQyxRQUFPLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUEsQ0FBRSxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQzVqQixDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLFlBQVU7QUFBQyxhQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBQyxZQUFVO0FBQUMsV0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLEdBQUU7QUFBQyxZQUFJLENBQUMsR0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO09BQUMsT0FBTyxDQUFDLElBQUUsRUFBRSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsSUFBSSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGNBQU8sT0FBTyxDQUFDLElBQUUsU0FBUyxJQUFFLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxLQUFLLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxJQUFFLFVBQVUsSUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUE7S0FDam1CLEVBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxPQUFPLENBQUMsSUFBRSxVQUFVLElBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sSUFBSSxJQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUFDLENBQUMsR0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxDQUFDLFFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFBLEdBQUUsS0FBSyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxDQUFDLFFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFBLEdBQUUsS0FBSyxDQUFDLENBQUE7T0FDaGlCLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEtBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsR0FBRSxJQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxDQUFDLFFBQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxlQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFBLEdBQUUsS0FBSyxDQUFDLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxDQUFDLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsUUFBUSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsV0FBVyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLFVBQVMsQ0FBQyxFQUFDO0FBQUMsYUFBTyxJQUFJLEtBQUcsQ0FBQyxJQUFFLEtBQUssS0FBRyxDQUFDLElBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxLQUFLLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLElBQUUsS0FBSyxDQUFBO0tBQ2poQixFQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLENBQUMsSUFBRSxDQUFDLEtBQUcsQ0FBQyxDQUFDLFFBQVEsSUFBRSxLQUFLLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxJQUFJLENBQUMsSUFBRyxDQUFDLENBQUMsRUFBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLENBQUMsSUFBRSxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLFlBQVU7QUFBQyxlQUFPLENBQUMsR0FBQyxLQUFLLENBQUE7T0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsT0FBTyxDQUFDLElBQUUsVUFBVSxJQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxhQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxDQUFDLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sSUFBSSxLQUFHLENBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFFBQVEsSUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFFLENBQUMsSUFBRSxLQUFLLENBQUE7S0FDMWtCLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFdBQVcsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sT0FBTyxDQUFDLElBQUUsV0FBVyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsV0FBVyxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsS0FBSSxPQUFPLENBQUMsSUFBRSxRQUFRLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxFQUFFLEdBQUUsSUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUMsWUFBVTtBQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsSUFBSSxDQUFBLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDO1VBQUMsQ0FBQyxHQUFDLElBQUksSUFBRSxDQUFDLENBQUMsUUFBTyxJQUFJLElBQUUsQ0FBQyxLQUFHLE9BQU8sQ0FBQyxJQUFFLFNBQVMsSUFBRSxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFNBQVMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUEsQUFBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxLQUFHLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBRSxDQUFDLEVBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsRUFBRSxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxVQUFVLENBQUMsS0FBSyxJQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQSxDQUFFLE1BQU0sR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFDLENBQUEsQUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUUsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQSxDQUFBO0tBQzdpQixFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBRyxDQUFDLEVBQUM7QUFBQyxZQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUMsQ0FBQyxDQUFBO09BQUM7S0FBQyxFQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsT0FBTyxPQUFPLENBQUMsSUFBRSxRQUFRLEdBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxXQUFXLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7VUFBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDO1VBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxXQUFXLElBQUUsQ0FBQztVQUFDLENBQUMsR0FBQyxRQUFRO1VBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUUsQ0FBQyxDQUFBLENBQUUsTUFBTSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxDQUFFLE1BQU0sR0FBQyxHQUFHLEdBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFFLENBQUMsQ0FBQSxDQUFFLE1BQU0sR0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQztBQUFDLGdCQUFPLENBQUMsS0FBRyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUMsRUFBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxJQUFFLFFBQVEsR0FBQyxDQUFDLEdBQUMsS0FBSyxDQUFBLEFBQUMsRUFBQyxDQUFDLEtBQUcsQ0FBQyxHQUFDLElBQUksRUFBQyxDQUFDLElBQUUsSUFBSSxHQUFDLENBQUMsR0FBQyxXQUFXLENBQUEsQUFBQyxFQUFDLENBQUMsS0FBRyxDQUFDLElBQUUsV0FBVyxHQUFDLENBQUMsR0FBQyxvQkFBb0IsQ0FBQSxBQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQSxDQUFBO09BQ2hxQixDQUFDLEVBQUMsQ0FBQyxJQUFFLElBQUksRUFBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUMsQ0FBQyxLQUFHLENBQUMsR0FBQyxLQUFLLEVBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLEdBQUMsSUFBSSxHQUFDLENBQUMsR0FBQyxHQUFHLENBQUEsQUFBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsR0FBQyxDQUFDLENBQUEsQ0FBRSxPQUFPLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxHQUFDLFdBQVcsR0FBQyxDQUFDLEdBQUMsSUFBSSxJQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsT0FBTyxDQUFBLEFBQUMsR0FBQyw2QkFBNkIsSUFBRSxDQUFDLEdBQUMseUVBQXlFLEdBQUMsR0FBRyxDQUFBLEFBQUMsR0FBQyxDQUFDLEdBQUMsYUFBYSxDQUFDLElBQUc7QUFBQyxZQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLFNBQVMsR0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQSxPQUFNLENBQUMsRUFBQztBQUFDLGVBQU0sQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLENBQUE7T0FBQyxPQUFPLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtLQUFDLEVBQUMsQ0FBQyxDQUFDLFFBQVEsR0FBQyxVQUFTLENBQUMsRUFBQztBQUFDLGFBQU8sSUFBSSxJQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7S0FBQyxFQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLElBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUE7S0FDOWYsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsU0FBUyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsT0FBTyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQSxZQUFVO0FBQUMsVUFBSSxDQUFDLEdBQUMsRUFBRSxDQUFDLFFBQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxTQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUEsQUFBQyxDQUFBO09BQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQSxDQUFBO0tBQUMsQ0FBQSxFQUFFLEVBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEtBQUssR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksR0FBQyxVQUFTLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsQ0FBQztVQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsSUFBRyxPQUFPLENBQUMsSUFBRSxRQUFRLElBQUUsSUFBSSxJQUFFLENBQUMsRUFBQztBQUFDLFlBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxLQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLElBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLENBQUE7T0FBQyxNQUFLLEtBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLElBQUUsQ0FBQyxJQUFFLENBQUMsQ0FBQSxFQUFDLE9BQU8sQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLFVBQVMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUM7QUFBQyxjQUFPLENBQUMsSUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLElBQUUsUUFBUSxLQUFHLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUEsQUFBQyxFQUFDLElBQUksSUFBRSxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxDQUFBO0tBQzdoQixFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsVUFBSSxDQUFDLEdBQUMsUUFBUSxLQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUMsVUFBUyxDQUFDLEVBQUMsQ0FBQyxFQUFDO0FBQUMsWUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFFLElBQUksSUFBRSxDQUFDLEtBQUcsQ0FBQyxDQUFDLElBQUUsQ0FBQyxJQUFFLE9BQU8sQ0FBQyxJQUFFLFVBQVUsQ0FBQSxBQUFDLEdBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQTtPQUFDLENBQUEsQUFBQyxDQUFBO0tBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFDLFlBQVU7QUFBQyxjQUFPLElBQUksQ0FBQyxTQUFTLEdBQUMsSUFBSSxFQUFDLElBQUksQ0FBQSxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBQyxZQUFVO0FBQUMsYUFBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQUMsRUFBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxZQUFVO0FBQUMsWUFBSSxDQUFDLEdBQUMsSUFBSSxDQUFDLFNBQVM7WUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzFoQixlQUFPLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxTQUFTLENBQUMsRUFBQyxVQUFTLENBQUMsRUFBQztBQUFDLFVBQUksQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFDLFlBQVU7QUFBQyxnQkFBTyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFBLENBQUE7T0FBQyxDQUFBO0tBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLEVBQUMsVUFBUyxDQUFDLEVBQUM7QUFBQyxVQUFJLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBQyxZQUFVO0FBQUMsZUFBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsU0FBUyxDQUFDLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO09BQUMsQ0FBQTtLQUFDLENBQUMsRUFBQyxDQUFDLENBQUEsQ0FBQTtHQUFDLElBQUksQ0FBQztNQUFDLENBQUMsR0FBQyxFQUFFO01BQUMsQ0FBQyxHQUFDLEVBQUU7TUFBQyxDQUFDLEdBQUMsQ0FBQztNQUFDLENBQUMsR0FBQyxDQUFDLElBQUksSUFBSSxFQUFBLEdBQUMsRUFBRTtNQUFDLENBQUMsR0FBQyxFQUFFO01BQUMsQ0FBQyxHQUFDLEVBQUU7TUFBQyxDQUFDLEdBQUMsK0NBQXFJO01BQUMsQ0FBQyxHQUFDLGNBQWM7TUFBQyxDQUFDLEdBQUMsaUJBQWlCO01BQUMsQ0FBQyxHQUFDLDRCQUE0QjtNQUFDLENBQUMsR0FBQyxpQ0FBaUM7TUFBQyxDQUFDLEdBQUMsTUFBTTtNQUFDLENBQUMsR0FBQywwQkFBMEI7TUFBQyxDQUFDLEdBQUMsa0JBQWtCO01BQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUMsQ0FBQyxHQUFDLFlBQVksQ0FBQztNQUFDLENBQUMsR0FBQyxNQUFNO01BQUMsQ0FBQyxHQUFDLFVBQVU7TUFBQyxDQUFDLEdBQUMsMEJBQTBCO01BQUMsQ0FBQyxHQUFDLDRIQUE0SCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7TUFBQyxDQUFDLEdBQUMsb0JBQW9CO01BQUMsQ0FBQyxHQUFDLGdCQUFnQjtNQUFDLENBQUMsR0FBQyxrQkFBa0I7TUFBQyxDQUFDLEdBQUMsZUFBZTtNQUFDLENBQUMsR0FBQyxtQkFBbUI7TUFBQyxDQUFDLEdBQUMsaUJBQWlCO01BQUMsQ0FBQyxHQUFDLGlCQUFpQjtNQUFDLENBQUMsR0FBQyxpQkFBaUI7TUFBQyxDQUFDLEdBQUMsaUJBQWlCO01BQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQztBQUMzaUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsS0FBSyxFQUFDO01BQUMsQ0FBQyxHQUFDLEVBQUMsWUFBWSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEtBQUssRUFBQztNQUFDLENBQUMsR0FBQyxFQUFDLFNBQVUsS0FBSyxFQUFDLFVBQVUsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQztNQUFDLENBQUMsR0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUM7TUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sTUFBTSxDQUFDLElBQUUsTUFBTSxJQUFFLElBQUk7TUFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUUsT0FBTyxJQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBRSxPQUFPO01BQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxJQUFFLE1BQU0sSUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUUsTUFBTTtNQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBRyxDQUFDLElBQUUsQ0FBQztNQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsT0FBTyxNQUFNLENBQUMsSUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBRyxDQUFDLElBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBRyxDQUFDLEtBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDLENBQUM7QUFDNWpCLE1BQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sTUFBTSxJQUFFLFVBQVUsSUFBRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLElBQUUsUUFBUSxJQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFlBQVU7QUFBQyxXQUFPLENBQUMsQ0FBQTtHQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxDQUFDLENBQUEsQ0FBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBO0NBQUMsQ0FBQSxDQUFFLElBQUksV0FBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIGdsb2JhbCBEb2N1bWVudFRvdWNoICovXHJcbi8vIHRvZG8gZG9jdW1lbnRcclxuZXhwb3J0IGRlZmF1bHQgKCgpPT57XHJcblx0Y29uc3Qgb0luZm8gPSB3aW5kb3cubmF2aWdhdG9yXHJcblx0XHQsc1R5cGVUb3VjaCA9IHR5cGVvZiB3aW5kb3cuVG91Y2hcclxuXHQ7XHJcblx0cmV0dXJuIHtcclxuXHRcdHN0YW5kYWxvbmU6ICEhb0luZm8uc3RhbmRhbG9uZVxyXG5cdFx0LHRvdWNoOiAhISgoc1R5cGVUb3VjaD09J29iamVjdCd8fHNUeXBlVG91Y2g9PSdmdW5jdGlvbicpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaClcclxuXHR9O1xyXG59KSgpO1xyXG4iLCIvLyB0b2RvIGRvY3VtZW50XHJcbmV4cG9ydCBkZWZhdWx0ICgoKT0+e1xyXG5cdGNvbnN0XHJcblx0XHRvTmF2aWdhdG9yID1cdHdpbmRvdy5uYXZpZ2F0b3JcclxuXHRcdCxzVXNlckFnZW50ID1cdG9OYXZpZ2F0b3IudXNlckFnZW50XHJcblx0XHQsaXNJUGFkID1cdFx0ISFzVXNlckFnZW50Lm1hdGNoKC9pUGFkL2kpXHJcblx0XHQsaXNJUGhvbmUgPVx0XHQhIXNVc2VyQWdlbnQubWF0Y2goL2lQaG9uZS9pKVxyXG5cdFx0LGlzSVBvZCA9XHRcdCEhc1VzZXJBZ2VudC5tYXRjaCgvaVBvZC9pKVxyXG5cdFx0LGlzQW5kcm9pZCA9XHQhIXNVc2VyQWdlbnQubWF0Y2goL0FuZHJvaWQvaSlcclxuXHRcdCxpc0JsYWNrQmVycnkgPVx0ISFzVXNlckFnZW50Lm1hdGNoKC9CbGFja0JlcnJ5L2kpXHJcblx0XHQsaXNJRU1vYmlsZSA9XHQhIXNVc2VyQWdlbnQubWF0Y2goL0lFTW9iaWxlL2kpXHJcblx0XHQsaXNQaG9uZUdhcCA9XHR3aW5kb3cuUGhvbmVHYXAhPT11bmRlZmluZWRcclxuXHRcdCxpc0NvcmRvdmEgPVx0d2luZG93LmNvcmRvdmEhPT11bmRlZmluZWRcclxuXHRcdC8vIGN1bXVsYXRpdmVcclxuXHRcdCxpc0lPUyA9XHRcdGlzSVBhZHx8aXNJUGhvbmV8fGlzSVBvZFxyXG5cdFx0LGlzTW9iaWxlID1cdFx0aXNJT1N8fGlzQW5kcm9pZHx8aXNCbGFja0JlcnJ5fHxpc0lFTW9iaWxlXHJcblx0XHQsaXNTdGFuZGFsb25lID1cdCEhb05hdmlnYXRvci5zdGFuZGFsb25lXHJcblx0O1xyXG5cdGZ1bmN0aW9uIGFkZENsYXNzTmFtZXMoKXtcclxuXHRcdGNvbnN0IG1IVE1MID0gZG9jdW1lbnQuYm9keVxyXG5cdFx0XHQsc1ByZWZpeCA9ICdlbnZfJ1xyXG5cdFx0XHQsYWRkQm9keUNsYXNzID0gbUhUTUwuY2xhc3NMaXN0LmFkZC5iaW5kKG1IVE1MLmNsYXNzTGlzdCk7XHJcblx0XHRpc0lQYWQmJmFkZEJvZHlDbGFzcyhzUHJlZml4KydpcGFkJyk7XHJcblx0XHRpc0lQaG9uZSYmYWRkQm9keUNsYXNzKHNQcmVmaXgrJ2lwaG9uZScpO1xyXG5cdFx0aXNJUG9kJiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnaXBvZCcpO1xyXG5cdFx0aXNBbmRyb2lkJiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnYW5kcm9pZCcpO1xyXG5cdFx0aXNCbGFja0JlcnJ5JiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnYmxhY2tiZXJyeScpO1xyXG5cdFx0aXNJRU1vYmlsZSYmYWRkQm9keUNsYXNzKHNQcmVmaXgrJ2llbW9iaWxlJyk7XHJcblx0XHRpc0lPUyYmYWRkQm9keUNsYXNzKHNQcmVmaXgrJ2lvcycpO1xyXG5cdFx0aXNNb2JpbGUmJmFkZEJvZHlDbGFzcyhzUHJlZml4Kydtb2JpbGUnKTtcclxuXHRcdGlzUGhvbmVHYXAmJmFkZEJvZHlDbGFzcyhzUHJlZml4KydwaG9uZWdhcCcpO1xyXG5cdFx0aXNDb3Jkb3ZhJiZhZGRCb2R5Q2xhc3Moc1ByZWZpeCsnY29yZG92YScpO1xyXG5cdH1cclxuXHRyZXR1cm4ge1xyXG5cdFx0aXNJUGFkOmlzSVBhZFxyXG5cdFx0LGlzSVBob25lOmlzSVBob25lXHJcblx0XHQsaXNJUG9kOmlzSVBvZFxyXG5cdFx0LGlzQW5kcm9pZDppc0FuZHJvaWRcclxuXHRcdCxpc0JsYWNrQmVycnk6aXNCbGFja0JlcnJ5XHJcblx0XHQsaXNJRU1vYmlsZTppc0lFTW9iaWxlXHJcblx0XHQsaXNJT1M6aXNJT1NcclxuXHRcdCxpc01vYmlsZTppc01vYmlsZVxyXG5cdFx0LHN0YW5kYWxvbmU6IGlzU3RhbmRhbG9uZVxyXG5cdFx0LGFkZENsYXNzTmFtZXM6YWRkQ2xhc3NOYW1lc1xyXG5cdH07XHJcbn0pKCk7XHJcbiIsIi8qKlxyXG4gKiBEYXRlIG1ldGhvZHNcclxuICogQG1vZHVsZSBpbnRlcm5hbC9ub2RlXHJcbiAqL1xyXG5cclxudmFyIC8qb0RhdGVQcm90byA9IERhdGUucHJvdG90eXBlXHJcblx0LGZuT2xkVG9TdHJpbmcgPSBvRGF0ZVByb3RvLnRvU3RyaW5nXHJcblx0LCovYURheSA9IFsnU3VuZGF5JywnTW9uZGF5JywnVGh1ZXNkYXknLCdXZWRuZXNkYXknLCdUaHVyc2RheScsJ0ZyaWRheScsJ1NhdHVyZGF5J11cclxuXHQsYURheUFiYnIgPSBbJ1N1bicsJ01vbicsJ1RodScsJ1dlZCcsJ1RodScsJ0ZyaScsJ1NhdCddXHJcblx0LGFNb250aCA9IFsnSmFudWFyeScsJ0ZlYnJ1YXJ5JywnTWFyY2gnLCdBcHJpbCcsJ01heScsJ0p1bmUnLCdKdWx5JywnQXVndXN0JywnU2VwdGVtYmVyJywnT2N0b2JlcicsJ05vdmVtYmVyJywnRGVjZW1iZXInXVxyXG5cdCxhTW9udGhBYmJyID0gWydKYW4nLCdGZWInLCdNYXJjaCcsJ0FwcmlsJywnTWF5JywnSnVuZScsJ0p1bHknLCdBdWcnLCdTZXB0JywnT2N0JywnTm92JywnRGVjJ11cclxuXHQsYURheU1vbnRoU3VmZml4ID0gWydzdCcsJ25kJywncmQnLCd0aCddXHJcblx0Lyosb0V4dGVuZERhdGUgPSB7XHJcblx0XHRmb3JtYXQ6ICdZLW0tZCcgLy8gSVNPIDg2MDFcclxuXHRcdCxvdmVycmlkZVRvU3RyaW5nOiBvdmVycmlkZVRvU3RyaW5nXHJcblx0XHQsdG9ZWU1NREQ6IHRvWVlNTUREXHJcblx0fSovXHJcblx0Lyosb0V4dGVuZFByb3RvID0ge1xyXG5cdFx0dG9Gb3JtYXR0ZWQ6IHRvRm9ybWF0dGVkXHJcblx0fSovXHJcblx0LGlTZWNvbmQgPSAxMDAwXHJcblx0LGlNaW51dGUgPSBpU2Vjb25kKjYwXHJcblx0LGlIb3VyID0gaU1pbnV0ZSo2MFxyXG5cdCxpRGF5ID0gaUhvdXIqMjRcclxuO1xyXG5cclxuLy9mdW5jdGlvbiB0b1lZTU1ERChkYXRlLHJldmVyc2Upey8vdGhpcz9cclxuLy9cdHZhciBhRGF0ZSA9IGRhdGUuc3BsaXQoJy0nKTtcclxuLy9cdGlmIChhRGF0ZS5sZW5ndGg9PT0ocmV2ZXJzZT8yOjQpKSB7XHJcbi8vXHRcdGFEYXRlLnJldmVyc2UoKTtcclxuLy9cdH1cclxuLy9cdHJldHVybiBhRGF0ZS5qb2luKCctJyk7XHJcbi8vfVxyXG5cclxuLy9cdGZ1bmN0aW9uIGdldERhdGUoWVlNTUREb3JERE1NWVkpeyAvLyB0b2RvOiBpbXBsZW1lbnQgKGlzIGluIGZjdnIpXHJcbi8vXHRcdHZhciBhID0gWVlNTUREb3JERE1NWVkuc3BsaXQoJy0nKTtcclxuLy9cdFx0aWYgKGFbMF0ubGVuZ3RoPT09MikgYS5yZXZlcnNlKCk7XHJcbi8vXHRcdHJldHVybiBuZXcgRGF0ZShhLmpvaW4oJy8nKSk7IC8vIGV4cGVjdCB5eXl5L01NL2RkXHJcbi8vXHR9XHJcblxyXG4vL2Z1bmN0aW9uIG92ZXJyaWRlVG9TdHJpbmcodG9Gb3JtYXQpe1xyXG4vL1x0aWYgKHRvRm9ybWF0PT09dHJ1ZXx8dG9Gb3JtYXQ9PT11bmRlZmluZWQpIHtcclxuLy9cdFx0b0RhdGVQcm90by50b1N0cmluZyA9IHRvRm9ybWF0dGVkO1xyXG4vL1x0fSBlbHNlIGlmICh0b0Zvcm1hdD09PWZhbHNlKSB7XHJcbi8vXHRcdG9EYXRlUHJvdG8udG9TdHJpbmcgPSBmbk9sZFRvU3RyaW5nO1xyXG4vL1x0fVxyXG4vL31cclxuXHJcbi8qKlxyXG4gKiBGb3JtYXQgYSBEYXRlXHJcbiAqIEBwYXJhbSB7RGF0ZX0gZGF0ZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0XHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9Gb3JtYXR0ZWQoZGF0ZT1uZXcgRGF0ZSgpLGZvcm1hdD0nWS1tLWQnKXtcclxuXHQvLyBnZXREYXRlXHRcdFx0XHRSZXR1cm5zIHRoZSBkYXkgb2YgdGhlIG1vbnRoICgxLTMxKSBmb3IgdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byBsb2NhbCB0aW1lLlxyXG5cdC8vIGdldERheVx0XHRcdFx0UmV0dXJucyB0aGUgZGF5IG9mIHRoZSB3ZWVrICgwLTYpIGZvciB0aGUgc3BlY2lmaWVkIGRhdGUgYWNjb3JkaW5nIHRvIGxvY2FsIHRpbWUuXHJcblx0Ly8gZ2V0RnVsbFllYXJcdFx0XHRSZXR1cm5zIHRoZSB5ZWFyICg0IGRpZ2l0cyBmb3IgNC1kaWdpdCB5ZWFycykgb2YgdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byBsb2NhbCB0aW1lLlxyXG5cdC8vIGdldEhvdXJzXHRcdFx0XHRSZXR1cm5zIHRoZSBob3VyICgwLTIzKSBpbiB0aGUgc3BlY2lmaWVkIGRhdGUgYWNjb3JkaW5nIHRvIGxvY2FsIHRpbWUuXHJcblx0Ly8gZ2V0TWlsbGlzZWNvbmRzXHRcdFJldHVybnMgdGhlIG1pbGxpc2Vjb25kcyAoMC05OTkpIGluIHRoZSBzcGVjaWZpZWQgZGF0ZSBhY2NvcmRpbmcgdG8gbG9jYWwgdGltZS5cclxuXHQvLyBnZXRNaW51dGVzXHRcdFx0UmV0dXJucyB0aGUgbWludXRlcyAoMC01OSkgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byBsb2NhbCB0aW1lLlxyXG5cdC8vIGdldE1vbnRoXHRcdFx0XHRSZXR1cm5zIHRoZSBtb250aCAoMC0xMSkgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byBsb2NhbCB0aW1lLlxyXG5cdC8vIGdldFNlY29uZHNcdFx0XHRSZXR1cm5zIHRoZSBzZWNvbmRzICgwLTU5KSBpbiB0aGUgc3BlY2lmaWVkIGRhdGUgYWNjb3JkaW5nIHRvIGxvY2FsIHRpbWUuXHJcblx0Ly8gZ2V0VGltZVx0XHRcdFx0UmV0dXJucyB0aGUgbnVtZXJpYyB2YWx1ZSBvZiB0aGUgc3BlY2lmaWVkIGRhdGUgYXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgc2luY2UgSmFudWFyeSAxLCAxOTcwLCAwMDowMDowMCBVVEMgKG5lZ2F0aXZlIGZvciBwcmlvciB0aW1lcykuXHJcblx0Ly8gZ2V0VGltZXpvbmVPZmZzZXRcdFJldHVybnMgdGhlIHRpbWUtem9uZSBvZmZzZXQgaW4gbWludXRlcyBmb3IgdGhlIGN1cnJlbnQgbG9jYWxlLlxyXG5cdC8vIGdldFVUQ0RhdGVcdFx0XHRSZXR1cm5zIHRoZSBkYXkgKGRhdGUpIG9mIHRoZSBtb250aCAoMS0zMSkgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byB1bml2ZXJzYWwgdGltZS5cclxuXHQvLyBnZXRVVENEYXlcdFx0XHRSZXR1cm5zIHRoZSBkYXkgb2YgdGhlIHdlZWsgKDAtNikgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byB1bml2ZXJzYWwgdGltZS5cclxuXHQvLyBnZXRVVENGdWxsWWVhclx0XHRSZXR1cm5zIHRoZSB5ZWFyICg0IGRpZ2l0cyBmb3IgNC1kaWdpdCB5ZWFycykgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byB1bml2ZXJzYWwgdGltZS5cclxuXHQvLyBnZXRVVENIb3Vyc1x0XHRcdFJldHVybnMgdGhlIGhvdXJzICgwLTIzKSBpbiB0aGUgc3BlY2lmaWVkIGRhdGUgYWNjb3JkaW5nIHRvIHVuaXZlcnNhbCB0aW1lLlxyXG5cdC8vIGdldFVUQ01pbGxpc2Vjb25kc1x0UmV0dXJucyB0aGUgbWlsbGlzZWNvbmRzICgwLTk5OSkgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byB1bml2ZXJzYWwgdGltZS5cclxuXHQvLyBnZXRVVENNaW51dGVzXHRcdFJldHVybnMgdGhlIG1pbnV0ZXMgKDAtNTkpIGluIHRoZSBzcGVjaWZpZWQgZGF0ZSBhY2NvcmRpbmcgdG8gdW5pdmVyc2FsIHRpbWUuXHJcblx0Ly8gZ2V0VVRDTW9udGhcdFx0XHRSZXR1cm5zIHRoZSBtb250aCAoMC0xMSkgaW4gdGhlIHNwZWNpZmllZCBkYXRlIGFjY29yZGluZyB0byB1bml2ZXJzYWwgdGltZS5cclxuXHQvLyBnZXRVVENTZWNvbmRzXHRcdFJldHVybnMgdGhlIHNlY29uZHMgKDAtNTkpIGluIHRoZSBzcGVjaWZpZWQgZGF0ZSBhY2NvcmRpbmcgdG8gdW5pdmVyc2FsIHRpbWUuXHJcblxyXG5cdC8vIGRcdERheSBvZiB0aGUgbW9udGgsIDIgZGlnaXRzIHdpdGggbGVhZGluZyB6ZXJvc1x0MDEgdG8gMzFcclxuXHQvLyBEXHRBIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBkYXksIHRocmVlIGxldHRlcnNcdE1vbiB0aHJvdWdoIFN1blxyXG5cdC8vIGpcdERheSBvZiB0aGUgbW9udGggd2l0aG91dCBsZWFkaW5nIHplcm9zXHQxIHRvIDMxXHJcblx0Ly8gbCAobG93ZXJjYXNlICdMJylcdEEgZnVsbCB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdFN1bmRheSB0aHJvdWdoIFNhdHVyZGF5XHJcblx0Ly8gTlx0SVNPLTg2MDEgbnVtZXJpYyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IG9mIHRoZSB3ZWVrIChhZGRlZCBpbiBQSFAgNS4xLjApXHQxIChmb3IgTW9uZGF5KSB0aHJvdWdoIDcgKGZvciBTdW5kYXkpXHJcblx0Ly8gU1x0RW5nbGlzaCBvcmRpbmFsIHN1ZmZpeCBmb3IgdGhlIGRheSBvZiB0aGUgbW9udGgsIDIgY2hhcmFjdGVyc1x0c3QsIG5kLCByZCBvciB0aC4gV29ya3Mgd2VsbCB3aXRoIGpcclxuXHQvLyB3XHROdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgb2YgdGhlIHdlZWtcdDAgKGZvciBTdW5kYXkpIHRocm91Z2ggNiAoZm9yIFNhdHVyZGF5KVxyXG5cdC8vIHpcdFRoZSBkYXkgb2YgdGhlIHllYXIgKHN0YXJ0aW5nIGZyb20gMClcdDAgdGhyb3VnaCAzNjVcclxuXHQvLyBXZWVrXHQtLS1cdC0tLVxyXG5cdC8vIFdcdElTTy04NjAxIHdlZWsgbnVtYmVyIG9mIHllYXIsIHdlZWtzIHN0YXJ0aW5nIG9uIE1vbmRheSAoYWRkZWQgaW4gUEhQIDQuMS4wKVx0RXhhbXBsZTogNDIgKHRoZSA0Mm5kIHdlZWsgaW4gdGhlIHllYXIpXHJcblx0Ly8gTW9udGhcdC0tLVx0LS0tXHJcblx0Ly8gRlx0QSBmdWxsIHRleHR1YWwgcmVwcmVzZW50YXRpb24gb2YgYSBtb250aCwgc3VjaCBhcyBKYW51YXJ5IG9yIE1hcmNoXHRKYW51YXJ5IHRocm91Z2ggRGVjZW1iZXJcclxuXHQvLyBtXHROdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGggbGVhZGluZyB6ZXJvc1x0MDEgdGhyb3VnaCAxMlxyXG5cdC8vIE1cdEEgc2hvcnQgdGV4dHVhbCByZXByZXNlbnRhdGlvbiBvZiBhIG1vbnRoLCB0aHJlZSBsZXR0ZXJzXHRKYW4gdGhyb3VnaCBEZWNcclxuXHQvLyBuXHROdW1lcmljIHJlcHJlc2VudGF0aW9uIG9mIGEgbW9udGgsIHdpdGhvdXQgbGVhZGluZyB6ZXJvc1x0MSB0aHJvdWdoIDEyXHJcblx0Ly8gdFx0TnVtYmVyIG9mIGRheXMgaW4gdGhlIGdpdmVuIG1vbnRoXHQyOCB0aHJvdWdoIDMxXHJcblx0Ly8gWWVhclx0LS0tXHQtLS1cclxuXHQvLyBMXHRXaGV0aGVyIGl0J3MgYSBsZWFwIHllYXJcdDEgaWYgaXQgaXMgYSBsZWFwIHllYXIsIDAgb3RoZXJ3aXNlLlxyXG5cdC8vIG9cdElTTy04NjAxIHllYXIgbnVtYmVyLiBUaGlzIGhhcyB0aGUgc2FtZSB2YWx1ZSBhcyBZLCBleGNlcHQgdGhhdCBpZiB0aGUgSVNPIHdlZWsgbnVtYmVyIChXKSBiZWxvbmdzIHRvIHRoZSBwcmV2aW91cyBvciBuZXh0IHllYXIsIHRoYXQgeWVhciBpcyB1c2VkIGluc3RlYWQuIChhZGRlZCBpbiBQSFAgNS4xLjApXHRFeGFtcGxlczogMTk5OSBvciAyMDAzXHJcblx0Ly8gWVx0QSBmdWxsIG51bWVyaWMgcmVwcmVzZW50YXRpb24gb2YgYSB5ZWFyLCA0IGRpZ2l0c1x0RXhhbXBsZXM6IDE5OTkgb3IgMjAwM1xyXG5cdC8vIHlcdEEgdHdvIGRpZ2l0IHJlcHJlc2VudGF0aW9uIG9mIGEgeWVhclx0RXhhbXBsZXM6IDk5IG9yIDAzXHJcblx0Ly8gVGltZVx0LS0tXHQtLS1cclxuXHQvLyBhXHRMb3dlcmNhc2UgQW50ZSBtZXJpZGllbSBhbmQgUG9zdCBtZXJpZGllbVx0YW0gb3IgcG1cclxuXHQvLyBBXHRVcHBlcmNhc2UgQW50ZSBtZXJpZGllbSBhbmQgUG9zdCBtZXJpZGllbVx0QU0gb3IgUE1cclxuXHQvLyBCXHRTd2F0Y2ggSW50ZXJuZXQgdGltZVx0MDAwIHRocm91Z2ggOTk5XHJcblx0Ly8gZ1x0MTItaG91ciBmb3JtYXQgb2YgYW4gaG91ciB3aXRob3V0IGxlYWRpbmcgemVyb3NcdDEgdGhyb3VnaCAxMlxyXG5cdC8vIEdcdDI0LWhvdXIgZm9ybWF0IG9mIGFuIGhvdXIgd2l0aG91dCBsZWFkaW5nIHplcm9zXHQwIHRocm91Z2ggMjNcclxuXHQvLyBoXHQxMi1ob3VyIGZvcm1hdCBvZiBhbiBob3VyIHdpdGggbGVhZGluZyB6ZXJvc1x0MDEgdGhyb3VnaCAxMlxyXG5cdC8vIEhcdDI0LWhvdXIgZm9ybWF0IG9mIGFuIGhvdXIgd2l0aCBsZWFkaW5nIHplcm9zXHQwMCB0aHJvdWdoIDIzXHJcblx0Ly8gaVx0TWludXRlcyB3aXRoIGxlYWRpbmcgemVyb3NcdDAwIHRvIDU5XHJcblx0Ly8gc1x0U2Vjb25kcywgd2l0aCBsZWFkaW5nIHplcm9zXHQwMCB0aHJvdWdoIDU5XHJcblx0Ly8gdVx0IE1pY3Jvc2Vjb25kcyAoYWRkZWQgaW4gUEhQIDUuMi4yKS4gTm90ZSB0aGF0IGRhdGUoKSB3aWxsIGFsd2F5cyBnZW5lcmF0ZSAwMDAwMDAgc2luY2UgaXQgdGFrZXMgYW4gaW50ZWdlciBwYXJhbWV0ZXIsIHdoZXJlYXMgRGF0ZVRpbWU6OmZvcm1hdCgpIGRvZXMgc3VwcG9ydCBtaWNyb3NlY29uZHMuXHRFeGFtcGxlOiA2NTQzMjFcclxuXHQvLyBUaW1lem9uZVx0LS0tXHQtLS1cclxuXHQvLyBlXHRUaW1lem9uZSBpZGVudGlmaWVyIChhZGRlZCBpbiBQSFAgNS4xLjApXHRFeGFtcGxlczogVVRDLCBHTVQsIEF0bGFudGljL0F6b3Jlc1xyXG5cdC8vIEkgKGNhcGl0YWwgaSlcdFdoZXRoZXIgb3Igbm90IHRoZSBkYXRlIGlzIGluIGRheWxpZ2h0IHNhdmluZyB0aW1lXHQxIGlmIERheWxpZ2h0IFNhdmluZyBUaW1lLCAwIG90aGVyd2lzZS5cclxuXHQvLyBPXHREaWZmZXJlbmNlIHRvIEdyZWVud2ljaCB0aW1lIChHTVQpIGluIGhvdXJzXHRFeGFtcGxlOiArMDIwMFxyXG5cdC8vIFBcdERpZmZlcmVuY2UgdG8gR3JlZW53aWNoIHRpbWUgKEdNVCkgd2l0aCBjb2xvbiBiZXR3ZWVuIGhvdXJzIGFuZCBtaW51dGVzIChhZGRlZCBpbiBQSFAgNS4xLjMpXHRFeGFtcGxlOiArMDI6MDBcclxuXHQvLyBUXHRUaW1lem9uZSBhYmJyZXZpYXRpb25cdEV4YW1wbGVzOiBFU1QsIE1EVCAuLi5cclxuXHQvLyBaXHRUaW1lem9uZSBvZmZzZXQgaW4gc2Vjb25kcy4gVGhlIG9mZnNldCBmb3IgdGltZXpvbmVzIHdlc3Qgb2YgVVRDIGlzIGFsd2F5cyBuZWdhdGl2ZSwgYW5kIGZvciB0aG9zZSBlYXN0IG9mIFVUQyBpcyBhbHdheXMgcG9zaXRpdmUuXHQtNDMyMDAgdGhyb3VnaCA1MDQwMFxyXG5cdC8vIEZ1bGwgRGF0ZS9UaW1lXHQtLS1cdC0tLVxyXG5cdC8vIGNcdElTTyA4NjAxIGRhdGUgKGFkZGVkIGluIFBIUCA1KVx0MjAwNC0wMi0xMlQxNToxOToyMSswMDowMFxyXG5cdC8vIHJcdMK7IFJGQyAyODIyIGZvcm1hdHRlZCBkYXRlXHRFeGFtcGxlOiBUaHUsIDIxIERlYyAyMDAwIDE2OjAxOjA3ICswMjAwXHJcblx0Ly8gVVx0U2Vjb25kcyBzaW5jZSB0aGUgVW5peCBFcG9jaCAoSmFudWFyeSAxIDE5NzAgMDA6MDA6MDAgR01UKVx0U2VlIGFsc28gdGltZSgpXHJcblx0Ly8gRGF5XHQtLS1cdC0tLVxyXG5cdC8qanNoaW50IHZhbGlkdGhpczp0cnVlKi9cclxuXHR2YXIgc0Zvcm1hdHRlZCA9ICcnO1xyXG5cdC8qanNoaW50IHZhbGlkdGhpczpmYWxzZVx0Ki9cclxuXHRmb3IgKHZhciBpPTAsbD1mb3JtYXQubGVuZ3RoO2k8bDtpKyspIHtcclxuXHRcdHZhciBzID0gZm9ybWF0W2ldXHJcblx0XHRcdCxpWWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKVxyXG5cdFx0XHQsaU1vbnRoID0gZGF0ZS5nZXRNb250aCgpXHJcblx0XHRcdCxpRGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpXHJcblx0XHRcdCxpV2Vla0RheSA9IGRhdGUuZ2V0RGF5KClcclxuXHRcdFx0LGlZZWFyRGF5ID0gTWF0aC5mbG9vcihuZXcgRGF0ZShkYXRlLW5ldyBEYXRlKGlZZWFyLDAsMCkpLmdldFRpbWUoKS9pRGF5KVxyXG5cdFx0XHQsaUhvdXJzID0gZGF0ZS5nZXRIb3VycygpXHJcblx0XHRcdCxpSG91cnNNb2QgPSBpSG91cnMlMTJcclxuXHRcdFx0LGlIb3VyczEyID0gaUhvdXJzTW9kPT09MD8xMjppSG91cnNNb2RcclxuXHRcdFx0LGlNaW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcclxuXHRcdFx0LGlTZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKClcclxuXHRcdFx0LGlXZWVrID0gTWF0aC5jZWlsKChpWWVhckRheS00KS83KS8vP1xyXG5cdFx0XHQsYkxlYXBZZWFyID0gKGlZZWFyJTQ9PT0wJiZpWWVhciUxMDAhPT0wKXx8KGlZZWFyJTQwMD09PTApXHJcblx0XHRcdCxwYWQgPSBmdW5jdGlvbiBwYWQoYSxiKXtyZXR1cm4oMWUxNSthKycnKS5zbGljZSgtYik7fVxyXG5cdFx0O1xyXG5cdFx0c3dpdGNoIChzKSB7XHJcblx0XHRcdC8vIGRheVxyXG5cdFx0XHRjYXNlICdkJzogc0Zvcm1hdHRlZCArPSBwYWQoaURhdGUsMik7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdEJzogc0Zvcm1hdHRlZCArPSBhRGF5QWJicltpV2Vla0RheV07IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdqJzogc0Zvcm1hdHRlZCArPSBpRGF0ZTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2wnOiBzRm9ybWF0dGVkICs9IGFEYXlbaVdlZWtEYXldOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnTic6IHNGb3JtYXR0ZWQgKz0gaVdlZWtEYXk9PT0wPzc6aVdlZWtEYXk7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdTJzogc0Zvcm1hdHRlZCArPSBpRGF0ZT5hRGF5TW9udGhTdWZmaXgubGVuZ3RoP2FEYXlNb250aFN1ZmZpeFthRGF5TW9udGhTdWZmaXgubGVuZ3RoLTFdOmFEYXlNb250aFN1ZmZpeFtpRGF0ZS0xXTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3cnOiBzRm9ybWF0dGVkICs9IGlXZWVrRGF5OyBicmVhaztcclxuXHRcdFx0Y2FzZSAneic6IHNGb3JtYXR0ZWQgKz0gaVllYXJEYXk7IGJyZWFrO1xyXG5cdFx0XHQvLyB3ZWVrXHJcblx0XHRcdGNhc2UgJ1cnOiBzRm9ybWF0dGVkICs9IGlXZWVrPT09MD81MjppV2VlazsgYnJlYWs7XHJcblx0XHRcdC8vIG1vbnRoXHJcblx0XHRcdGNhc2UgJ0YnOiBzRm9ybWF0dGVkICs9IGFNb250aFtpTW9udGhdOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnbSc6IHNGb3JtYXR0ZWQgKz0gcGFkKGlNb250aCsxLDIpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnTSc6IHNGb3JtYXR0ZWQgKz0gYU1vbnRoQWJicltpTW9udGhdOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnbic6IHNGb3JtYXR0ZWQgKz0gaU1vbnRoKzE7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICd0Jzogc0Zvcm1hdHRlZCArPSBpTW9udGg9PT0xJiYhYkxlYXBZZWFyPzI4OihpTW9udGg+NT9pTW9udGgrMTppTW9udGgpJTI/Mjk6MzA7IGJyZWFrO1xyXG5cdFx0XHQvLyB5ZWFyXHJcblx0XHRcdGNhc2UgJ0wnOiBzRm9ybWF0dGVkICs9IGJMZWFwWWVhcj8xOjA7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdvJzogc0Zvcm1hdHRlZCArPSBpV2Vlaz09PTA/aVllYXItMTppWWVhcjsgYnJlYWs7Ly8/XHJcblx0XHRcdGNhc2UgJ1knOiBzRm9ybWF0dGVkICs9IGlZZWFyOyBicmVhaztcclxuXHRcdFx0Y2FzZSAneSc6IHNGb3JtYXR0ZWQgKz0gU3RyaW5nKGlZZWFyKS5zdWJzdHIoMiwyKTsgYnJlYWs7XHJcblx0XHRcdC8vIHRpbWVcclxuXHRcdFx0Y2FzZSAnYSc6IHNGb3JtYXR0ZWQgKz0gaUhvdXJzPDEyPydhbSc6J3BtJzsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ0EnOiBzRm9ybWF0dGVkICs9IGlIb3VyczwxMj8nQU0nOidQTSc7IGJyZWFrO1xyXG5cdFx0XHRjYXNlICdCJzogc0Zvcm1hdHRlZCArPSAnJzsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2cnOiBzRm9ybWF0dGVkICs9IGlIb3VyczEyOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnRyc6IHNGb3JtYXR0ZWQgKz0gaUhvdXJzOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnaCc6IHNGb3JtYXR0ZWQgKz0gcGFkKGlIb3VyczEyLDIpOyBicmVhaztcclxuXHRcdFx0Y2FzZSAnSCc6IHNGb3JtYXR0ZWQgKz0gcGFkKGlIb3VycywyKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ2knOiBzRm9ybWF0dGVkICs9IHBhZChpTWludXRlcywyKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3MnOiBzRm9ybWF0dGVkICs9IHBhZChpU2Vjb25kcywyKTsgYnJlYWs7XHJcblx0XHRcdGNhc2UgJ3UnOiBzRm9ybWF0dGVkICs9ICcnOyBicmVhaztcclxuXHRcdFx0Ly8gdG9kbzp0aW1lem9uZVxyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHNGb3JtYXR0ZWQgKz0gcztcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIHNGb3JtYXR0ZWQ7XHJcbn0iLCIvKipcclxuICogTm9kZSBtZXRob2RzXHJcbiAqIEBtb2R1bGUgaW50ZXJuYWwvbm9kZVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyBhIG5vZGUgdG8gYW4gb2JqZWN0IChhdHRyaWJ1dGUgYW5kIGNoaWxkbm9kZSBjb2xsaXNpb25zIG1heSBvY2N1cilcclxuICogQHBhcmFtIHtOb2RlfSBub2RlIEEgbm9kZVxyXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0ZW5kVG8gQW4gb3B0aW9uYWwgcHJlLWV4aXN0aW5nIG9iamVjdCB0byBmaWxsLlxyXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvT2JqZWN0KG5vZGUsZXh0ZW5kVG8pe1xyXG5cdGlmIChleHRlbmRUbz09PXVuZGVmaW5lZCkgZXh0ZW5kVG8gPSB7fTtcclxuXHR2YXIgaSxsXHJcblx0XHQsYUF0dHJpYnV0ZXMgPSBub2RlLmF0dHJpYnV0ZXNcclxuXHRcdCxhQ2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcclxuXHQvLyBhdHRyaWJ1dGVzXHJcblx0aWYgKGFBdHRyaWJ1dGVzJiZhQXR0cmlidXRlcy5sZW5ndGgpIHtcclxuXHRcdGZvciAoaT0wLGw9YUF0dHJpYnV0ZXMubGVuZ3RoO2k8bDtpKyspIHtcclxuXHRcdFx0dmFyIG9BdHRyID0gYUF0dHJpYnV0ZXNbaV07XHJcblx0XHRcdGV4dGVuZFRvW29BdHRyLm5vZGVOYW1lXSA9IG9BdHRyLm5vZGVWYWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8gbm9kZXNcclxuXHRmb3IgKGk9MCxsPWFDaGlsZE5vZGVzLmxlbmd0aDtpPGw7aSsrKSB7XHJcblx0XHR2YXIgZWwgPSBhQ2hpbGROb2Rlc1tpXVxyXG5cdFx0XHQsc0VsTm9kZU5hbWUgPSBlbC5ub2RlTmFtZVxyXG5cdFx0XHQsaU5vZGVUeXBlID0gZWwubm9kZVR5cGVcclxuXHRcdFx0LG9Ob2RlID0gaWRkcWQuaW50ZXJuYWwuaG9zdC5ub2RlLnRvT2JqZWN0KGVsKTtcclxuXHRcdHN3aXRjaCAoaU5vZGVUeXBlKSB7XHJcblx0XHRcdGNhc2UgMTogLy8gbm9kZVxyXG5cdFx0XHRcdGlmIChleHRlbmRUby5oYXNPd25Qcm9wZXJ0eShzRWxOb2RlTmFtZSkpIHtcclxuXHRcdFx0XHRcdGlmIChBcnJheS5pc0FycmF5KGV4dGVuZFRvW3NFbE5vZGVOYW1lXSkpIGV4dGVuZFRvW3NFbE5vZGVOYW1lXS5wdXNoKG9Ob2RlKTtcclxuXHRcdFx0XHRcdGVsc2UgZXh0ZW5kVG9bc0VsTm9kZU5hbWVdID0gW2V4dGVuZFRvW2VsLm5vZGVOYW1lXSxvTm9kZV07XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGV4dGVuZFRvW3NFbE5vZGVOYW1lXSA9IG9Ob2RlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgMzogLy8gdGV4dFxyXG5cdFx0XHRcdGV4dGVuZFRvLl90ZXh0ID0gZWwuaW5uZXJUZXh0fHxlbC50ZXh0Q29udGVudDtcclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIGV4dGVuZFRvO1xyXG59IiwiLyoqXHJcbiAqIE51bWJlciBtZXRob2RzXHJcbiAqIEBtb2R1bGUgaW50ZXJuYWwvbnVtYmVyXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZvcm1hdHMgYSBudW1iZXIgdG8gdGhlIGFwcHJvcHJpYXRlIGZpbGVzaXplIG5vdGF0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1iZXIgVGhlIG51bWJlciB0byBmb3JtYXRcclxuICogQHBhcmFtIHtudW1iZXJ9IHJvdW5kIFRoZSBudW1iZXIgb2YgZGVjaW1hbHMgdG8gcm91bmQgYnlcclxuICogQHJldHVybnMge3N0cmluZ30gRmlsZXNpemUgc3RyaW5nIHJlc3VsdFxyXG4gKiBAdG9kbyBleHRlbmQgdG8gZ2VuZXJpYyBmb3JtYXR0ZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRTaXplKG51bWJlcixyb3VuZCkge1xyXG5cdHZhciBpLCBzaXplID0gbnVtYmVyO1xyXG5cdGlmIChyb3VuZD09PXVuZGVmaW5lZCkgcm91bmQgPSAwO1xyXG5cdHZhciBhU2l6ZXMgPSBbJ0InLCdrQicsJ01CJywnR0InLCdUQicsJ1BCJywnRUInLCdaQicsJ1lCJ107XHJcblx0Zm9yIChpID0gMDsgc2l6ZT4xMDI0ICYmIChhU2l6ZXMubGVuZ3RoPj0oaSArIDIpKTsgaSsrKSBzaXplIC89IDEwMjQ7XHJcblx0dmFyIGlNdWx0ID0gTWF0aC5wb3coMTAscm91bmQpO1xyXG5cdHJldHVybiAoTWF0aC5yb3VuZChzaXplICogaU11bHQpIC8gaU11bHQpICsgYVNpemVzW2ldO1xyXG59IiwiLyoqXHJcbiAqIFN0cmluZyBtZXRob2RzXHJcbiAqIEBtb2R1bGUgaW50ZXJuYWwvc3RyaW5nXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFRyaWVzIHRvIGRldGVybWluZSB0aGUgdHlwZSBvZiB0aGUgc3RyaW5nIGFuZCByZXR1cm5zIGl0LlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGEgc3RyaW5nLCBudW1iZXIgb3IgYm9vbGVhbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1R5cGUocyl7XHJcblx0Ly8gaW50ZWdlclxyXG5cdHZhciBpID0gcGFyc2VJbnQocywxMCk7XHJcblx0aWYgKGkudG9TdHJpbmcoKT09cykgcmV0dXJuIGk7XHJcblx0Ly8gZmxvYXRpbmcgcG9pbnRcclxuXHR2YXIgZiA9IHBhcnNlRmxvYXQocyk7XHJcblx0aWYgKGYudG9TdHJpbmcoKT09cykgcmV0dXJuIGY7XHJcblx0Ly8gYm9vbGVhblxyXG5cdHZhciBiID0gcz09J3RydWUnfHwocz09J2ZhbHNlJz9mYWxzZTpudWxsKTtcclxuXHRpZiAoYiE9PW51bGwpIHJldHVybiBiO1xyXG5cdC8vXHJcblx0cmV0dXJuIHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQYWRzIGEgc3RyaW5nIGxlZnQgb3IgcmlnaHRcclxuICogQHBhcmFtIHtTdHJpbmd9IHMgQSBzdHJpbmdcclxuICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBGaW5hbCBsZW5ndGggb2YgdGhlIHRvdGFsIHN0cmluZy5cclxuICogQHBhcmFtIHtTdHJpbmd9IGNociBDaGFyYWN0ZXIgdG8gcGFkIHRoZSBzdHJpbmcgd2l0aC5cclxuICogQHBhcmFtIHtCb29sZWFufSBbbGVmdD1mYWxzZV0gUGFkIHRvIHRoZSBsZWZ0IG9mIHRoZSBzdHJpbmcuXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBwYWRkZWQgc3RyaW5nXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFkKHMsbGVuZ3RoLGNocixsZWZ0KXtcclxuXHRpZiAobGVmdD09PXVuZGVmaW5lZCkgbGVmdCA9IGZhbHNlO1xyXG5cdHZhciBpTGVuU3RyID0gcy5sZW5ndGhcclxuXHRcdCxpTGVuUGFkID0gbGVuZ3RoLWlMZW5TdHJcclxuXHRcdCxpTGVuQ2hyID0gY2hyLmxlbmd0aFxyXG5cdFx0LGJDdXQgPSBpTGVuQ2hyPjFcclxuXHRcdCxpRmlsbCA9IE1hdGgubWF4KDAsYkN1dD9NYXRoLmNlaWwoaUxlblBhZC9pTGVuQ2hyKTppTGVuUGFkKVxyXG5cdFx0LGFGaWxsID0gW11cclxuXHRcdCxzRmlsbFxyXG5cdDtcclxuXHRmb3IgKHZhciBpPTA7aTxpRmlsbDtpKyspIGFGaWxsLnB1c2goY2hyKTtcclxuXHRzRmlsbCA9IGFGaWxsLmpvaW4oJycpO1xyXG5cdGlmIChiQ3V0KSBzRmlsbCA9IHNGaWxsLnN1YnN0cigwLGlMZW5QYWQpO1xyXG5cdHJldHVybiBsZWZ0P3NGaWxsK3M6cytzRmlsbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHN0cmluZyB0byBYTUxcclxuICogQHBhcmFtIHtTdHJpbmd9IHMgQSBzdHJpbmdcclxuICogQHJldHVybnMge0RvY3VtZW50fSBSZXR1cm5zIGFuIFhNTCBEb2N1bWVudFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRvWE1MKHMpIHtcclxuXHQvKiBnbG9iYWwgQWN0aXZlWE9iamVjdCAqL1xyXG5cdHZhciB4RG9jO1xyXG5cdGlmICh3aW5kb3cuQWN0aXZlWE9iamVjdCkge1xyXG5cdFx0eERvYyA9IG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MRE9NJyk7XHJcblx0XHR4RG9jLmFzeW5jID0gJ2ZhbHNlJztcclxuXHRcdHhEb2MubG9hZFhNTChzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0eERvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcocywndGV4dC94bWwnKTtcclxuXHR9XHJcblx0cmV0dXJuIHhEb2M7XHJcbn1cclxuXHJcblxyXG4vLy8qKlxyXG4vLyAqIENvbnZlcnRzIGFuIFhNTCBzdHJpbmcgdG8gYW4gb2JqZWN0XHJcbi8vICogQHBhcmFtIHtTdHJpbmd9IHMgQSBzdHJpbmdcclxuLy8gKiBAcmV0dXJucyB7T2JqZWN0fVxyXG4vLyAqL1xyXG4vL2V4cG9ydCBmdW5jdGlvbiB0b1hNTE9iaihzKXtcclxuLy9cdGltcG9ydCB0b09iamVjdCBmcm9tICcuL25hdGl2ZS9ub2RlJzsgLy8gdG9kb1xyXG4vL1x0cmV0dXJuIHRvT2JqZWN0KHRvWE1MKHMpLmNoaWxkTm9kZXNbMF0pO1xyXG4vL31cclxuLy9cdFx0LyoqXHJcbi8vXHRcdCAqIEdlbmVyYXRlcyBhIHJhbmRvbSwgYnV0IHByb25vdW5jZWFibGUgc3RyaW5nXHJcbi8vXHRcdCAqIEBuYW1lIHN0cmluZy5nZW5lcmF0ZVxyXG4vL1x0XHQgKiBAbWV0aG9kXHJcbi8vXHRcdCAqIEBwYXJhbSBsZW5ndGgge051bWJlcn0gTGVuZ3RoIG9mIHRoZSBzdHJpbmdcclxuLy9cdFx0ICogQHBhcmFtIGN1dCB7Qm9vbGVhbn0gQ3V0IHN0cmluZyB0byBsZW5ndGhcclxuLy9cdFx0ICogQHJldHVybnMge3N0cmluZ31cclxuLy9cdFx0ICovXHJcbi8vXHRcdCxnZW5lcmF0ZTogZnVuY3Rpb24obGVuZ3RoLGN1dCkge1xyXG4vL1x0XHRcdHZhciBpc0ludCA9IGZ1bmN0aW9uKG4pIHtcclxuLy9cdFx0XHRcdHJldHVybiAobiUxKT09PTA7XHJcbi8vXHRcdFx0fTtcclxuLy9cdFx0XHR2YXIgcmFuZCA9IGZ1bmN0aW9uKGZTdHIsZkVuZCkge1xyXG4vL1x0XHRcdFx0dmFyIGZOdW0gPSBmU3RyICsgTWF0aC5yYW5kb20oKSooZkVuZC1mU3RyKTtcclxuLy9cdFx0XHRcdHJldHVybiAoaXNJbnQoZlN0cikmJmlzSW50KGZFbmQpKT9NYXRoLnJvdW5kKGZOdW0pOmZOdW07XHJcbi8vXHRcdFx0fTtcclxuLy9cdFx0XHRpZiAobGVuZ3RoPT09dW5kZWZpbmVkKSBsZW5ndGggPSA2O1xyXG4vL1x0XHRcdGlmIChjdXQ9PT11bmRlZmluZWQpIGN1dCA9IGZhbHNlO1xyXG4vL1x0XHRcdHZhciBhTHRyID0gW1xyXG4vL1x0XHRcdFx0WydhJywnZScsJ2knLCdvJywndScsJ3knXVxyXG4vL1x0XHRcdFx0LFsnYWEnLCdhaScsJ2F1JywnZWEnLCdlZScsJ2VpJywnZXUnLCdpYScsJ2llJywnaW8nLCdpdScsJ29hJywnb2UnLCdvaScsJ3VhJywndWknXVxyXG4vL1x0XHRcdFx0LFsnYicsJ2MnLCdkJywnZicsJ2cnLCdoJywnaicsJ2snLCdsJywnbScsJ24nLCdwJywncScsJ3InLCdzJywndCcsJ3YnLCd3JywneCcsJ3onXVxyXG4vL1x0XHRcdFx0LFsnYmInLCdicicsJ2JzJywnY2MnLCdjaCcsJ2NsJywnY3InLCdkYicsJ2RkJywnZGYnLCdkZycsJ2RoJywnZGonLCdkaycsJ2RsJywnZG0nLCdkbicsJ2RwJywnZHEnLCdkcicsJ2RzJywnZHQnLCdkdicsJ2R3JywnZHonLCdmYicsJ2ZkJywnZmYnLCdmZycsJ2ZoJywnZmonLCdmaycsJ2ZsJywnZm0nLCdmbicsJ2ZwJywnZnEnLCdmcicsJ2ZzJywnZnQnLCdmdicsJ2Z3JywnZnonLCdnYicsJ2dkJywnZ2YnLCdnZycsJ2doJywnZ2onLCdnaycsJ2dsJywnZ20nLCdnbicsJ2dwJywnZ3EnLCdncicsJ2dzJywnZ3QnLCdndicsJ2d3JywnZ3onLCdrYicsJ2tkJywna2YnLCdrZycsJ2toJywna2onLCdraycsJ2tsJywna20nLCdrbicsJ2twJywna3EnLCdrcicsJ2tzJywna3QnLCdrdicsJ2t3Jywna3onLCdsYicsJ2xkJywnbGYnLCdsZycsJ2xoJywnbGonLCdsaycsJ2xsJywnbG0nLCdsbicsJ2xwJywnbHEnLCdscicsJ2xzJywnbHQnLCdsdicsJ2x3JywnbHonLCdtYicsJ21kJywnbWYnLCdtZycsJ21oJywnbWonLCdtaycsJ21sJywnbW0nLCdtbicsJ21wJywnbXEnLCdtcicsJ21zJywnbXQnLCdtdicsJ213JywnbXonLCduYicsJ25kJywnbmYnLCduZycsJ25oJywnbmonLCduaycsJ25sJywnbm0nLCdubicsJ25wJywnbnEnLCducicsJ25zJywnbnQnLCdudicsJ253JywnbnonLCdwYicsJ3BkJywncGYnLCdwZycsJ3BoJywncGonLCdwaycsJ3BsJywncG0nLCdwbicsJ3BwJywncHEnLCdwcicsJ3BzJywncHQnLCdwdicsJ3B3JywncHonLCdxYicsJ3FkJywncWYnLCdxZycsJ3FoJywncWonLCdxaycsJ3FsJywncW0nLCdxbicsJ3FwJywncXEnLCdxcicsJ3FzJywncXQnLCdxdicsJ3F3JywncXonLCdyYicsJ3JkJywncmYnLCdyZycsJ3JoJywncmonLCdyaycsJ3JsJywncm0nLCdybicsJ3JwJywncnEnLCdycicsJ3JzJywncnQnLCdydicsJ3J3JywncnonLCdzYicsJ3NjJywnc2QnLCdzZicsJ3NnJywnc2gnLCdzaicsJ3NrJywnc2wnLCdzbScsJ3NuJywnc3AnLCdzcScsJ3NyJywnc3MnLCdzdCcsJ3N2Jywnc3cnLCdzeicsJ3RiJywndGQnLCd0ZicsJ3RnJywndGgnLCd0aicsJ3RrJywndGwnLCd0bScsJ3RuJywndHAnLCd0cScsJ3RyJywndHMnLCd0dCcsJ3R2JywndHcnLCd0eicsJ3ZiJywndmQnLCd2ZicsJ3ZnJywndmgnLCd2aicsJ3ZrJywndmwnLCd2bScsJ3ZuJywndnAnLCd2cScsJ3ZyJywndnMnLCd2dCcsJ3Z2JywndncnLCd2eicsJ3hiJywneGQnLCd4ZicsJ3hnJywneGgnLCd4aicsJ3hrJywneGwnLCd4bScsJ3huJywneHAnLCd4cScsJ3hyJywneHMnLCd4dCcsJ3h2JywneHcnLCd4eCcsJ3h6J11cclxuLy9cdFx0XHRdO1xyXG4vL1x0XHRcdHZhciBpU25tID0gNjtcclxuLy9cdFx0XHR2YXIgc1BzdyA9IFwiXCI7XHJcbi8vXHRcdFx0dmFyIGlOdW0gPSAwO1xyXG4vL1x0XHRcdGZvciAodmFyIGk9MDtpPGlTbm07aSsrKSB7XHJcbi8vXHRcdFx0XHRpZiAoaT09PTApXHRcdFx0aU51bSA9IHJhbmQoMCwyKTtcclxuLy9cdFx0XHRcdGVsc2UgaWYgKGk9PWlTbm0tMSlcdGlOdW0gPSAoaU51bTwyKT8yOnJhbmQoMCwxKTtcclxuLy9cdFx0XHRcdGVsc2VcdFx0XHRcdGlOdW0gPSAoaU51bTwyKT9yYW5kKDAsMSkrMjpyYW5kKDAsMSk7XHJcbi8vXHRcdFx0XHR2YXIgYUxzdCA9IGFMdHJbaU51bV07XHJcbi8vXHRcdFx0XHRzUHN3ICs9IGFMc3RbIHJhbmQoMCxhTHN0Lmxlbmd0aC0xKSBdO1xyXG4vL1x0XHRcdH1cclxuLy9cdFx0XHRyZXR1cm4gY3V0P3NQc3cuc3Vic3RyKDAsbGVuZ3RoKTpzUHN3O1xyXG4vL1x0XHR9XHJcblxyXG4vKipcclxuICogQ2FwaXRhbGl6ZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgc3RyaW5nXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzIEEgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmFtZUNhc2Uocyl7XHJcblx0cmV0dXJuICgnLScrcykucmVwbGFjZSgvW19cXHNcXC1dW2Etel0vZywgJDE9PiQxLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgnLScsJyAnKS5yZXBsYWNlKCdfJywnICcpKS5zdWJzdHIoMSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgc3RyaW5nIHRvIGNhbWVsQ2FzZSBub3RhdGlvblxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVsQ2FzZShzKXtcclxuXHRyZXR1cm4gcy5yZXBsYWNlKC9bX1xcc1xcLV1bYS16XS9nLCAkMT0+JDEudG9VcHBlckNhc2UoKS5yZXBsYWNlKCctJywnJykucmVwbGFjZSgnICcsJycpLnJlcGxhY2UoJ18nLCcnKSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb252ZXJ0cyB0aGUgc3RyaW5nIHRvIGRhc2hlZCBub3RhdGlvblxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRhc2gocyl7XHJcblx0dmFyIHNDYW1lbCA9IHMucmVwbGFjZSgvW0EtWl0vZywgJDE9PlwiLVwiKyQxLnRvTG93ZXJDYXNlKCkpO1xyXG5cdHZhciBzVW5TcGMgPSBzLnJlcGxhY2UoL1tcXHNfXS9nLCAnLScpO1xyXG5cdHJldHVybiBzPT1zQ2FtZWw/c1VuU3BjOnNDYW1lbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIENvbnZlcnRzIHRoZSBzdHJpbmcgdG8gdW5kZXJzY29yZWQgbm90YXRpb25cclxuICogQHBhcmFtIHtTdHJpbmd9IHMgQSBzdHJpbmdcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmRlcnNjb3JlKHMpe1xyXG5cdHZhciBzQ2FtZWwgPSBzLnJlcGxhY2UoL1tBLVpdL2csICQxPT5cIl9cIiskMS50b0xvd2VyQ2FzZSgpKTtcclxuXHR2YXIgc1VuU3BjID0gcy5yZXBsYWNlKC9bXFxzXFwtXS9nLCAnXycpO1xyXG5cdHJldHVybiBzPT1zQ2FtZWw/c1VuU3BjOnNDYW1lbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgbWluaW1hbCB2ZXJzaW9uIG9mIHNwcmludGYuIFJlcGxhY2VzIHZhcmlhYmxlcyBpbiBhIHN0cmluZyB3aXRoIHRoZSBhcmd1bWVudHMuIFZhcmlhYmxlcyBhcmUgbGlrZSAlMSRzIGFuZCBzdGFydCBhdCAxLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBIHN0cmluZ1xyXG4gKiBAcGFyYW0geyhzdHJpbmd8c3RyaW5nW10pfSBbcmVwbGFjZW1lbnRzXSBXZSdyZSB0aGUgcmVwbGFjZW1lbnRzXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3ByaW50ZihzKXtcclxuXHR2YXIgYU1hdGNoID0gcy5tYXRjaCgvKCVcXGQrXFwkcykvZ2kpO1xyXG5cdGlmIChhTWF0Y2gpIGZvciAodmFyIGk9MCxsPWFNYXRjaC5sZW5ndGg7aTxsO2krKykgcyA9IHMucmVwbGFjZShuZXcgUmVnRXhwKCcoXFxcXCUnKyhpKzEpKydcXFxcJHMpJywnZycpLGFyZ3VtZW50c1tpXSk7XHJcblx0cmV0dXJuIHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUZXN0IGlmIGEgc3RyaW5nIGlzIGFuIHVybFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBIHN0cmluZ1xyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtzdHJpY3Q9dHJ1ZV0gTm9uLXN0cmljdCBmb3IgdXJscyB3aXRob3V0IHByb3RvY29sLCBpZTogd3d3Lmdvb2dsZS5jb21cclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaXNVcmwocyxzdHJpY3Q9dHJ1ZSkge1xyXG5cdHZhciByeFVybCA9IG5ldyBSZWdFeHAoc3RyaWN0P1xyXG5cdFx0XHRcIl4oKGh0dHB8aHR0cHN8ZnRwKTopPy8vKFthLXpBLVowLTkuLV0rKDpbYS16QS1aMC05LiZhbXA7JSQtXSspKkApKigoMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV0pLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMS05XXwwKS4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV18MCkuKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFswLTldKXwoW2EtekEtWjAtOS1dKy4pKlthLXpBLVowLTktXSsuKGNvbXxlZHV8Z292fGludHxtaWx8bmV0fG9yZ3xiaXp8YXJwYXxpbmZvfG5hbWV8cHJvfGFlcm98Y29vcHxtdXNldW18W2EtekEtWl17Mn0pKSg6WzAtOV0rKSooLygkfFthLXpBLVowLTkuLD9cXCdcXFxcKyZhbXA7JSQjPX5fLV0rKSkqJFwiXHJcblx0XHRcdDpcIl4oKChodHRwfGh0dHBzfGZ0cCk6KT8vLyk/KFthLXpBLVowLTkuLV0rKDpbYS16QS1aMC05LiZhbXA7JSQtXSspKkApKigoMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV0pLigyNVswLTVdfDJbMC00XVswLTldfFswLTFdezF9WzAtOV17Mn18WzEtOV17MX1bMC05XXsxfXxbMS05XXwwKS4oMjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXXsxfVswLTldezJ9fFsxLTldezF9WzAtOV17MX18WzEtOV18MCkuKDI1WzAtNV18MlswLTRdWzAtOV18WzAtMV17MX1bMC05XXsyfXxbMS05XXsxfVswLTldezF9fFswLTldKXwoW2EtekEtWjAtOS1dKy4pKlthLXpBLVowLTktXSsuKGNvbXxlZHV8Z292fGludHxtaWx8bmV0fG9yZ3xiaXp8YXJwYXxpbmZvfG5hbWV8cHJvfGFlcm98Y29vcHxtdXNldW18W2EtekEtWl17Mn0pKSg6WzAtOV0rKSooLygkfFthLXpBLVowLTkuLD9cXCdcXFxcKyZhbXA7JSQjPX5fLV0rKSkqJFwiXHJcblx0XHQpO1xyXG5cdHJldHVybiByeFVybC50ZXN0KHMpO1xyXG59XHJcblxyXG4vLyB0b2RvOiBkb2MsIGh0dHA6Ly93ZXJ4bHRkLmNvbS93cC8yMDEwLzA1LzEzL2phdmFzY3JpcHQtaW1wbGVtZW50YXRpb24tb2YtamF2YXMtc3RyaW5nLWhhc2hjb2RlLW1ldGhvZC9cclxuLyoqXHJcbiAqIEEgc3RyaW5nIHRvIGhhc2hjb2RlIG1ldGhvZFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gcyBBIHN0cmluZ1xyXG4gKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhc2hDb2RlKHMpe1xyXG5cdHZhciBzSGFzaCA9IDA7XHJcblx0aWYgKHMubGVuZ3RoPT09MCkgcmV0dXJuIHNIYXNoO1xyXG5cdGZvciAodmFyIGk9MCwgbD1zLmxlbmd0aDsgaTxsOyBpKyspIHtcclxuXHRcdHZhciBzQ2hhciA9IHMuY2hhckNvZGVBdChpKTtcclxuXHRcdHNIYXNoID0gKChzSGFzaDw8NSktc0hhc2gpK3NDaGFyO1xyXG5cdFx0c0hhc2ggPSBzSGFzaCZzSGFzaDtcclxuXHR9XHJcblx0cmV0dXJuIHNIYXNoO1xyXG59XHJcblxyXG4vKipcclxuICogVHVybiBhIHRpdGxlIGludG8gYSBzbHVnXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzIEEgc3RyaW5nXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdG9TbHVnKHMpIHtcclxuXHR2YXIgc3RyID0gcy50b0xvd2VyQ2FzZSgpXHJcblx0XHQscmVwbGFjZSA9IHtcclxuXHRcdFx0YTogL1vDoMOhw6TDol0vZ1xyXG5cdFx0XHQsZTogL1vDqMOpw6vDql0vZ1xyXG5cdFx0XHQsaTogL1vDrMOtw6/Drl0vZ1xyXG5cdFx0XHQsbzogL1vDssOzw7bDtF0vZ1xyXG5cdFx0XHQsdTogL1vDucO6w7zDu10vZ1xyXG5cdFx0XHQsbjogL1vDsV0vZ1xyXG5cdFx0XHQsYzogL1vDp10vZ1xyXG5cdFx0XHQsJy0nOiAvW15hLXowLTldfC0rL2dcclxuXHRcdFx0LCcnOiAvXi0rfC0rJC9nXHJcblx0XHR9XHJcblx0O1xyXG5cdGZvciAodmFyIHJlcGxhY2VtZW50IGluIHJlcGxhY2UpIHtcclxuXHRcdHN0ciA9IHN0ci5yZXBsYWNlKHJlcGxhY2VbcmVwbGFjZW1lbnRdLHJlcGxhY2VtZW50KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0cjtcclxufSIsIi8qKlxyXG4gKiBDcmVhdGUgbmFtZXNwYWNlcy4gSWYgb25seSB0aGUgZmlyc3QgJ25hbWVzcGFjZScgcGFyYW1ldGVyIGlzIHNldCBpdCB3aWxsIHJldHVybiB0aGUgbmFtZXNwYWNlIGlmIGl0IGV4aXN0cyBvciBudWxsIGlmIGl0IGRvZXNuJ3QuXHJcbiAqIEBuYW1lIG5hbWVzcGFjZVxyXG4gKiBAbWV0aG9kXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgVGhlIG5hbWVzcGFjZSB3ZSdyZSBjcmVhdGluZyBvciBleHBhbmRpbmdcclxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHdpdGggd2hpY2ggdG8gZXh0ZW5kIHRoZSBuYW1lc3BhY2VcclxuICovXHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnLi8uLi92ZW5kb3IvbG9kYXNoL2Rpc3QvbG9kYXNoLm1pbi5qcyc7XHJcbmV4cG9ydCBkZWZhdWx0IChuYW1lc3BhY2Usb2JqZWN0KT0+e1xyXG5cdHZhciBleHRlbmQgPSBfLmV4dGVuZFxyXG5cdFx0LG9CYXNlID0gd2luZG93XHJcblx0XHQsYU5TID0gbmFtZXNwYWNlLnNwbGl0KCcuJylcclxuXHRcdCxzXHJcblx0O1xyXG5cdHdoaWxlKHM9YU5TLnNoaWZ0KCkpe1xyXG5cdFx0aWYgKG9iamVjdCkge1xyXG5cdFx0XHRpZiAoYU5TLmxlbmd0aD09PTApIHtcclxuXHRcdFx0XHR2YXIgb0V4aXN0cyA9IG9CYXNlLmhhc093blByb3BlcnR5KHMpP29CYXNlW3NdOm51bGw7XHJcblx0XHRcdFx0b0Jhc2Vbc10gPSBvYmplY3Q7XHJcblx0XHRcdFx0aWYgKCFvYmplY3QuaGFzT3duUHJvcGVydHkoJ3RvU3RyaW5nJykpIHtcclxuXHRcdFx0XHRcdG9iamVjdC50b1N0cmluZyA9IChmdW5jdGlvbihzKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gJ1tvYmplY3QgJytzKyddJzt9O30pKHMpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAob0V4aXN0cykge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdPdmVyd3JpdGluZyAnK3MrJyBpbiAnK25hbWVzcGFjZSk7XHJcblx0XHRcdFx0XHRleHRlbmQob0Jhc2Vbc10sb0V4aXN0cyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2UgaWYgKCFvQmFzZS5oYXNPd25Qcm9wZXJ0eShzKSkge1xyXG5cdFx0XHQvL30gZWxzZSBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvQmFzZSxzKSkgeyAvLyBpZTggZml4XHJcblx0XHRcdFx0b0Jhc2Vbc10gPSB7fTtcclxuXHRcdFx0fVxyXG5cdFx0XHRvQmFzZSA9IG9CYXNlW3NdO1xyXG5cdFx0fSBlbHNlIGlmIChvQmFzZS5oYXNPd25Qcm9wZXJ0eShzKSkge1xyXG5cdFx0Ly99IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob0Jhc2UscykpIHsgLy8gaWU4IGZpeFxyXG5cdFx0XHRvQmFzZSA9IG9CYXNlW3NdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gb0Jhc2U7XHJcbn0iLCIvKipcclxuICogVGltZW91dFxyXG4gKiBAbW9kdWxlIHRpbWVvdXRcclxuICogQHBhcmFtIHtOdW1iZXJ9IGR1cmF0aW9uXHJcbiAqIEBSZXR1cm5zIHtQcm9taXNlfVxyXG4gKi9cclxuLyoganNoaW50IGlnbm9yZTpzdGFydCAqL1xyXG5leHBvcnQgZGVmYXVsdCAoZHVyYXRpb24gPSA0MCk9PntcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgZHVyYXRpb24pO1xyXG4gICAgfSk7XHJcbn1cclxuLyoganNoaW50IGlnbm9yZTplbmQgKi9cclxuIiwiLyoqXHJcbiAqIFR5cGUgY2hlY2tpbmcsIGFsc28gY2hlY2tzIHVudHlwZWQgdHlwZXMgbGlrZSBpbnRlZ2VyIGFuZCBmbG9hdC5cclxuICogQG1vZHVsZSB0eXBlXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0geyp9IG9ialxyXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgY29uc3RhbnQsIGllOiBpZGRxZC50eXBlLkJPT0xFQU5cclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuVU5ERUZJTkVEXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLk5VTExcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuT0JKRUNUXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLkFSUkFZXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLk5PREVcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuRVZFTlRcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuRlVOQ1RJT05cclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuU1RSSU5HXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLkJPT0xFQU5cclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuSU5UXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLkZMT0FUXHJcbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSB0eXBlLk5BTlxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5JTkZJTklURVxyXG4gKiBAcHJvcGVydHkge29iamVjdH0gdHlwZS5SRUdFWFBcclxuICogQHByb3BlcnR5IHtvYmplY3R9IHR5cGUuREFURVxyXG4gKiBAZXhhbXBsZVxyXG4gdHlwZSgwKT09PXR5cGUuSU5UO1xyXG4gdHlwZSgnJyk9PT10eXBlLlNUUklORztcclxuIHR5cGUobnVsbCk9PT10eXBlLk5VTEw7XHJcbiB0eXBlKHt9KT09PXR5cGUuT0JKRUNUO1xyXG4gKi9cclxuXHQvLyB1c2luZyBvYmplY3RzIGZvciBjb25zdGFudHMgZm9yIHNwZWVkIChzZWUgaHR0cDovL2pzcGVyZi5jb20vZXF1YWxpdHktY2hlY2tpbmctZGlmZmVyZW50LXR5cGVzKVxyXG52YXIgIFVOREVGSU5FRCA9XHRnZXRDb25zdGFudCgndW5kZWZpbmVkJylcclxuXHQsTlVMTCA9XHRcdFx0Z2V0Q29uc3RhbnQoJ251bGwnKVxyXG5cdCxPQkpFQ1QgPVx0XHRnZXRDb25zdGFudCgnb2JqZWN0JylcclxuXHQsQVJSQVkgPVx0XHRnZXRDb25zdGFudCgnYXJyYXknKVxyXG5cdCxOT0RFID1cdFx0XHRnZXRDb25zdGFudCgnbm9kZScpXHJcblx0LEVWRU5UID1cdFx0Z2V0Q29uc3RhbnQoJ2V2ZW50JylcclxuXHQsRlVOQ1RJT04gPVx0XHRnZXRDb25zdGFudCgnZnVuY3Rpb24nKVxyXG5cdCxTVFJJTkcgPVx0XHRnZXRDb25zdGFudCgnc3RyaW5nJylcclxuXHQsQk9PTEVBTiA9XHRcdGdldENvbnN0YW50KCdib29sZWFuJylcclxuXHQsSU5UID1cdFx0XHRnZXRDb25zdGFudCgnaW50JylcclxuXHQsRkxPQVQgPVx0XHRnZXRDb25zdGFudCgnZmxvYXQnKVxyXG5cdCxOQU4gPVx0XHRcdGdldENvbnN0YW50KCdOYU4nKVxyXG5cdCxJTkZJTklURSA9XHRcdGdldENvbnN0YW50KCdJbmZpbml0ZScpXHJcblx0LFJFR0VYUCA9XHRcdGdldENvbnN0YW50KCdyZWdleHAnKVxyXG5cdCxEQVRFID1cdFx0XHRnZXRDb25zdGFudCgnZGF0ZScpXHJcblx0Ly8gRXJyb3JcclxuXHQsYUV2ZW50UHJvcGVydGllcyA9IFtcclxuXHRcdCdldmVudFBoYXNlJ1xyXG5cdFx0LCdjdXJyZW50VGFyZ2V0J1xyXG5cdFx0LCdjYW5jZWxhYmxlJ1xyXG5cdFx0LCd0YXJnZXQnXHJcblx0XHQsJ2J1YmJsZXMnXHJcblx0XHQsJ3R5cGUnXHJcblx0XHQsJ2NhbmNlbEJ1YmJsZSdcclxuXHRcdCwnc3JjRWxlbWVudCdcclxuXHRcdCwnZGVmYXVsdFByZXZlbnRlZCdcclxuXHRcdCwndGltZVN0YW1wJ1xyXG5cdF1cclxuO1xyXG5mdW5jdGlvbiBnZXRDb25zdGFudChuYW1lKSB7XHJcblx0dmFyIG9Db25zdGFudCA9IHt0b1N0cmluZzogZnVuY3Rpb24oKSB7cmV0dXJuIG5hbWU7fX1cclxuXHRcdCxzQ29uc3RhbnQgPSBuYW1lLnRvVXBwZXJDYXNlKCk7XHJcblx0dHlwZVtzQ29uc3RhbnRdID0gb0NvbnN0YW50O1xyXG5cdHJldHVybiBvQ29uc3RhbnQ7XHJcbn1cclxuZnVuY3Rpb24gdHlwZShvYmopIHtcclxuXHR2YXIgaVR5cGUgPSAtMTtcclxuXHRpZiAob2JqPT09bnVsbCkge1xyXG5cdFx0aVR5cGUgPSBOVUxMO1xyXG5cdH0gZWxzZSBpZiAob2JqPT09dW5kZWZpbmVkKSB7XHJcblx0XHRpVHlwZSA9IFVOREVGSU5FRDtcclxuXHR9IGVsc2UgeyAvLyB0b2RvOiBodHRwOi8vanNwZXJmLmNvbS90ZXN0aW5nLXR5cGVzXHJcblx0XHRzd2l0Y2ggKHR5cGVvZihvYmopKXtcclxuXHRcdGNhc2UgJ29iamVjdCc6XHJcblx0XHRcdHZhciBjID0gb2JqLmNvbnN0cnVjdG9yO1xyXG5cdFx0XHRpZiAoYz09PUFycmF5KSBpVHlwZSA9IEFSUkFZO1xyXG5cdFx0XHRlbHNlIGlmIChjPT09UmVnRXhwKSBpVHlwZSA9IFJFR0VYUDtcclxuXHRcdFx0ZWxzZSBpZiAoYz09PURhdGUpIGlUeXBlID0gREFURTtcclxuXHRcdFx0ZWxzZSBpZiAob2JqLm93bmVyRG9jdW1lbnQhPT11bmRlZmluZWQpIGlUeXBlID0gTk9ERTtcclxuXHRcdFx0ZWxzZSBpZiAoKGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0dmFyIGlzRXZlbnQgPSB0cnVlO1xyXG5cdFx0XHRcdGZvciAodmFyIHMgaW4gYUV2ZW50UHJvcGVydGllcykge1xyXG5cdFx0XHRcdFx0aWYgKGFFdmVudFByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkocykpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG9ialthRXZlbnRQcm9wZXJ0aWVzW3NdXT09PXVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdFx0XHRcdGlzRXZlbnQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRicmVhaztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gaXNFdmVudDtcclxuXHRcdFx0fSkoKSkgaVR5cGUgPSBFVkVOVDtcclxuXHRcdFx0ZWxzZSBpVHlwZSA9IE9CSkVDVDtcclxuXHRcdGJyZWFrO1xyXG5cdFx0Y2FzZSAnZnVuY3Rpb24nOiBpVHlwZSA9IEZVTkNUSU9OOyBicmVhaztcclxuXHRcdGNhc2UgJ3N0cmluZyc6IGlUeXBlID0gU1RSSU5HOyBicmVhaztcclxuXHRcdGNhc2UgJ2Jvb2xlYW4nOiBpVHlwZSA9IEJPT0xFQU47IGJyZWFrO1xyXG5cdFx0Y2FzZSAnbnVtYmVyJzpcclxuXHRcdFx0aWYgKGlzTmFOKG9iaikpIHtcclxuXHRcdFx0XHRpVHlwZSA9IE5BTjtcclxuXHRcdFx0fSBlbHNlIGlmICghaXNGaW5pdGUob2JqKSkge1xyXG5cdFx0XHRcdGlUeXBlID0gSU5GSU5JVEU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0aVR5cGUgPSBvYmo9PU1hdGguZmxvb3Iob2JqKT9JTlQ6RkxPQVQ7XHJcblx0XHRcdH1cclxuXHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gaVR5cGU7XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgdHlwZTsiLCJpbXBvcnQgJy4vdGVzdFR5cGUnO1xyXG5pbXBvcnQgJy4vdGVzdFRpbWVvdXQnO1xyXG5pbXBvcnQgJy4vdGVzdE5hbWVzcGFjZSc7Ly8gdG9kbzogb3RoZXIgaWRkcWRcclxuaW1wb3J0ICcuL3Rlc3RDYXBhYmlsaXRpZXMnO1xyXG5pbXBvcnQgJy4vdGVzdEVudmlyb25tZW50JztcclxuaW1wb3J0ICcuL3Rlc3RJbnRlcm5hbE5vZGUnO1xyXG5pbXBvcnQgJy4vdGVzdEludGVybmFsU3RyaW5nJztcclxuaW1wb3J0ICcuL3Rlc3RJbnRlcm5hbE51bWJlcic7XHJcbmltcG9ydCAnLi90ZXN0SW50ZXJuYWxEYXRlJztcclxuXHJcblxyXG4vKlxyXG4oZnVuY3Rpb24oKXtcclxuXHQndXNlIHN0cmljdCc7XHJcblx0UVVuaXQuY29uZmlnLmhpZGVwYXNzZWQgPSB0cnVlO1xyXG5cdHZhciBzU291cmNlUGF0aCA9ICcuLi8uLi9zcmMvJ1xyXG5cdFx0LHNUZXN0UHJlZml4ID0gJ3Rlc3QtJ1xyXG5cdFx0LGFUZXN0cyA9IFtcclxuXHRcdFx0J2lkZHFkLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLnR5cGUuanMnXHJcblx0XHRcdCwnaWRkcWQuY2FwYWJpbGl0aWVzLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmVudmlyb25tZW50LmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLmhvc3Qubm9kZS5qcydcclxuXHRcdFx0LCdpZGRxZC5pbnRlcm5hbC5uYXRpdmUuc3RyaW5nLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLm5hdGl2ZS5hcnJheS5qcydcclxuXHRcdFx0LCdpZGRxZC5pbnRlcm5hbC5uYXRpdmUubnVtYmVyLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmludGVybmFsLm5hdGl2ZS5vYmplY3QuanMnXHJcblx0XHRcdCwnaWRkcWQuaW50ZXJuYWwubmF0aXZlLmRhdGUuanMnXHJcblx0XHRcdCwnaWRkcWQubWF0aC5jb2xvci5qcydcclxuXHRcdFx0LCdpZGRxZC5tYXRoLnBybmcuanMnXHJcblx0XHRcdCwnaWRkcWQubWF0aC52ZWN0b3IuanMnXHJcblx0XHRcdCwnaWRkcWQubmV0d29yay5qc29ucC5qcydcclxuXHRcdFx0LCdpZGRxZC5wYXR0ZXJuLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLnN0b3JhZ2UuanMnXHJcblx0XHRcdCwnaWRkcWQuc3RvcmFnZS5jb29raWUuanMnXHJcblx0XHRcdCwnaWRkcWQuc2lnbmFsLmpzJ1xyXG5cdFx0XHQsJ2lkZHFkLmltYWdlLmpzJ1xyXG5cdFx0XTtcclxuXHRhVGVzdHMuZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcclxuXHRcdC8hKmpzbGludCBldmlsOiB0cnVlICohL1xyXG5cdFx0ZG9jdW1lbnQud3JpdGUoJzxzY3JpcHQgc3JjPVwiJytzU291cmNlUGF0aCtuYW1lKydcIj48L3NjcmlwdD4nKTtcclxuXHRcdGRvY3VtZW50LndyaXRlKCc8c2NyaXB0IHNyYz1cIicrc1Rlc3RQcmVmaXgrbmFtZSsnXCI+PC9zY3JpcHQ+Jyk7XHJcblx0fSk7XHJcbn0pKCk7Ki8iLCIvKmdsb2JhbCBRVW5pdCx0ZXN0LG9rKi9cclxuaW1wb3J0IGNhcGFiaWxpdGllcyBmcm9tICcuLy4uLy4uLy4uL3NyYy9jYXBhYmlsaXRpZXMnO1xyXG5pbXBvcnQgdHlwZSBmcm9tICcuLy4uLy4uLy4uL3NyYy90eXBlJztcclxuUVVuaXQubW9kdWxlKCdjYXBhYmlsaXRpZXMnKTtcclxudGVzdCgnc3RhbmRhbG9uZScsIGZ1bmN0aW9uKCkge1xyXG5cdG9rKHR5cGUoY2FwYWJpbGl0aWVzLnN0YW5kYWxvbmUpPT09dHlwZS5CT09MRUFOLCdzdGFuZGFsb25lJyk7XHJcbn0pOyIsIi8qZ2xvYmFsIFFVbml0LHRlc3Qsb2sqL1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi8uLi8uLi8uLi9zcmMvZW52aXJvbm1lbnQnO1xyXG5pbXBvcnQgdHlwZSBmcm9tICcuLy4uLy4uLy4uL3NyYy90eXBlJztcclxuXHJcblFVbml0Lm1vZHVsZSgnZW52aXJvbm1lbnQnKTtcclxudGVzdCgnZW52aXJvbm1lbnQnLCBmdW5jdGlvbigpIHtcclxuXHR2YXIgQk9PTEVBTiA9IHR5cGUuQk9PTEVBTjtcclxuXHRvayh0eXBlKGVudmlyb25tZW50LmlzSVBhZCk9PT1CT09MRUFOLCdpc0lQYWQnKTtcclxuXHRvayh0eXBlKGVudmlyb25tZW50LmlzSVBob25lKT09PUJPT0xFQU4sJ2lzSVBob25lJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0lQb2QpPT09Qk9PTEVBTiwnaXNJUG9kJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0FuZHJvaWQpPT09Qk9PTEVBTiwnaXNBbmRyb2lkJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0JsYWNrQmVycnkpPT09Qk9PTEVBTiwnaXNCbGFja0JlcnJ5Jyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc0lFTW9iaWxlKT09PUJPT0xFQU4sJ2lzSUVNb2JpbGUnKTtcclxuXHRvayh0eXBlKGVudmlyb25tZW50LmlzSU9TKT09PUJPT0xFQU4sJ2lzSU9TJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5pc01vYmlsZSk9PT1CT09MRUFOLCdpc01vYmlsZScpO1xyXG5cdG9rKHR5cGUoZW52aXJvbm1lbnQuc3RhbmRhbG9uZSk9PT1CT09MRUFOLCdzdGFuZGFsb25lJyk7XHJcblx0b2sodHlwZShlbnZpcm9ubWVudC5hZGRDbGFzc05hbWVzKSE9PUJPT0xFQU4sJ2FkZENsYXNzTmFtZXMnKTtcclxufSk7IiwiLypnbG9iYWwgUVVuaXQsdGVzdCxvayovXG5pbXBvcnQgKiBhcyBkYXRlIGZyb20gJy4vLi4vLi4vLi4vc3JjL2ludGVybmFsL2RhdGUnO1xuXG5RVW5pdC5tb2R1bGUoJ2RhdGUnLHtzZXR1cDpmdW5jdGlvbigpe1xuXHR0aGlzLmRhdGUxID0gbmV3IERhdGUoMjAxNCw4LTEsMTksMjEsMTEsMjMpO1xuXHR0aGlzLmRhdGUyID0gbmV3IERhdGUoMjAxNCw4LTEsMTksMTEsNTksNTkpO1xuXHR0aGlzLmRhdGUzID0gbmV3IERhdGUoMjAxNCw4LTEsMTksMTIsMSwxKTtcbn19KTtcbnRlc3QoJ3RvRm9ybWF0dGVkJywgZnVuY3Rpb24oKSB7XG5cdHZhciB0b0Zvcm1hdHRlZCA9IGRhdGUudG9Gb3JtYXR0ZWQ7XG5cblx0b2sodG9Gb3JtYXR0ZWQodGhpcy5kYXRlMSk9PT0nMjAxNC0wOC0xOScsJ3RvRm9ybWF0dGVkIGRlZmF1bHQnKTtcblx0b2sodG9Gb3JtYXR0ZWQodGhpcy5kYXRlMSwnZC9tL1knKT09PScxOS8wOC8yMDE0JywndG9Gb3JtYXR0ZWQgZC9tL1knKTtcblx0b2sodG9Gb3JtYXR0ZWQodGhpcy5kYXRlMSwnWS1tLWQgSDppOnMnKT09PScyMDE0LTA4LTE5IDIxOjExOjIzJywndG9Gb3JtYXR0ZWQgWS1tLWQgSDppOnMnKTtcblx0b2sodG9Gb3JtYXR0ZWQodGhpcy5kYXRlMSwnZ2EnKT09PSc5cG0nLCd0b0Zvcm1hdHRlZCBnYTpwbScpO1xuXHRvayh0b0Zvcm1hdHRlZCh0aGlzLmRhdGUzLCdnYScpPT09JzEycG0nLCd0b0Zvcm1hdHRlZCBnYTpwbScpO1xuXHRvayh0b0Zvcm1hdHRlZCh0aGlzLmRhdGUyLCdnYScpPT09JzExYW0nLCd0b0Zvcm1hdHRlZCBnYTphbScpO1xuXHRvayh0b0Zvcm1hdHRlZCgpLm1hdGNoKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLyksJ3RvRm9ybWF0dGVkIG5vIHBhcmFtJyk7XG5cdC8vZGF0ZS5mb3JtYXQgPSAnZC9tL1knOy8vXG5cdC8vb2sodG9Gb3JtYXR0ZWQodGhpcy5kYXRlMSk9PT0nMTkvMDgvMjAxNCcsJ3RvRm9ybWF0dGVkIHNldCBkZWZhdWx0Jyk7XG59KTsiLCIvKmdsb2JhbCBRVW5pdCx0ZXN0LG9rKi9cclxuaW1wb3J0ICogYXMgbm9kZSBmcm9tICcuLy4uLy4uLy4uL3NyYy9pbnRlcm5hbC9ub2RlJztcclxuUVVuaXQubW9kdWxlKCdub2RlJyk7XHJcbnRlc3QoJ25vZGUnLCBmdW5jdGlvbigpIHtcclxuXHRvayghIW5vZGUsJ3RvZG8nKTsvL3RvZG86dGVzdFxyXG59KTtcclxuIiwiLypnbG9iYWwgUVVuaXQsdGVzdCxvayovXG5pbXBvcnQgKiBhcyBudW1iZXIgZnJvbSAnLi8uLi8uLi8uLi9zcmMvaW50ZXJuYWwvbnVtYmVyJztcblxuUVVuaXQubW9kdWxlKCdudW1iZXInKTtcbnRlc3QoJ2Zvcm1hdFNpemUnLCBmdW5jdGlvbigpIHtcblx0b2sobnVtYmVyLmZvcm1hdFNpemUoMTI0MzY3OTgpPT09JzEyTUInLCdmb3JtYXRTaXplJyk7XG59KTsiLCIvKmdsb2JhbCBRVW5pdCx0ZXN0LG9rKi9cbmltcG9ydCAqIGFzIHN0cmluZyBmcm9tICcuLy4uLy4uLy4uL3NyYy9pbnRlcm5hbC9zdHJpbmcnO1xuLy9pbXBvcnQgdHlwZSBmcm9tICcuLy4uLy4uLy4uL3NyYy90eXBlJztcblxuUVVuaXQubW9kdWxlKCdzdHJpbmcnKTtcbnRlc3QoJ3BhZCcsIGZ1bmN0aW9uKCkge1xuXHR2YXIgcGFkID0gc3RyaW5nLnBhZDtcblx0b2socGFkKCdhJywzLCdiJyk9PT0nYWJiJywncGFkJyk7XG5cdG9rKHBhZCgnYScsMywnYmMnKT09PSdhYmMnLCdwYWQnKTtcblx0b2socGFkKCdhJywzLCdiJyx0cnVlKT09PSdiYmEnLCdwYWQgbGVmdCcpO1xuXHRvayhwYWQoJ2FhYycsMywnYicpPT09J2FhYycsJ3BhZCcpO1xuXHRvayhwYWQoJ2FhYWMnLDMsJ2InKT09PSdhYWFjJywncGFkJyk7XG59KTtcbnRlc3QoJ3RvVHlwZScsIGZ1bmN0aW9uKCkge1xuXHR2YXIgdG9UeXBlID0gc3RyaW5nLnRvVHlwZTtcblx0b2sodG9UeXBlKCdhJyk9PT0nYScsJ3RvVHlwZSBzdHJpbmcnKTtcblx0b2sodG9UeXBlKCcxJyk9PT0xLCd0b1R5cGUgbnVtYmVyJyk7XG5cdG9rKHRvVHlwZSgnMC4xJyk9PT0wLjEsJ3RvVHlwZSBudW1iZXInKTtcblx0b2sodG9UeXBlKCd0cnVlJyk9PT10cnVlLCd0b1R5cGUgYm9vbGVhbicpO1xufSk7XG50ZXN0KCd0b1hNTCcsIGZ1bmN0aW9uKCkge1xuXHRvayghIXN0cmluZy50b1hNTCgnPGZvbyBiYXI9XCJiYXpcIj5xdXg8L2Zvbz4nKSwndG9YTUwnKTtcbn0pO1xuLy90ZXN0KCd0b1hNTE9iaicsIGZ1bmN0aW9uKCkge1xuLy9cdC8vY29uc29sZS5sb2coJ3RvWE1MJyxzdHJpbmcudG9YTUwoJzxmb28gYmFyPVwiYmF6XCI+cXV4PC9mb28+JykpOyAvLyBsb2cpXG4vL1x0Ly9jb25zb2xlLmxvZygndG9YTUxPYmonLHN0cmluZy50b1hNTE9iaignPGZvbyBiYXI9XCJiYXpcIj5xdXg8L2Zvbz4nKSk7IC8vIGxvZylcbi8vXHRvayhzdHJpbmcudG9YTUxPYmooJzxmb28gYmFyPVwiYmF6XCI+cXV4PC9mb28+JykuYmFyPT09J2JheicsJ3RvWE1MT2JqJyk7XG4vL30pO1xuLy90ZXN0KCdnZW5lcmF0ZScsIGZ1bmN0aW9uKCkge1xuLy9cdG9rKCEhc3RyaW5nLmdlbmVyYXRlKCksJ2dlbmVyYXRlJyk7XG4vL30pO1xudGVzdCgnbmFtZUNhc2UnLCBmdW5jdGlvbigpIHtcblx0b2soc3RyaW5nLm5hbWVDYXNlKCdmb28gYmFyJyk9PT0nRm9vIEJhcicsJ25hbWVDYXNlJyk7XG59KTtcbnRlc3QoJ2NhbWVsQ2FzZScsIGZ1bmN0aW9uKCkge1xuXHR2YXIgY2FtZWxDYXNlID0gc3RyaW5nLmNhbWVsQ2FzZTtcblx0b2soY2FtZWxDYXNlKCdmb28gYmFyIGJheicpPT09J2Zvb0JhckJheicsJ2NhbWVsQ2FzZScpO1xuXHRvayhjYW1lbENhc2UoJ2Zvby1iYXItYmF6Jyk9PT0nZm9vQmFyQmF6JywnY2FtZWxDYXNlJyk7XG5cdG9rKGNhbWVsQ2FzZSgnZm9vX2Jhcl9iYXonKT09PSdmb29CYXJCYXonLCdjYW1lbENhc2UnKTtcbn0pO1xudGVzdCgnZGFzaCcsIGZ1bmN0aW9uKCkge1xuXHR2YXIgZGFzaCA9IHN0cmluZy5kYXNoO1xuXHRvayhkYXNoKCdmb28gYmFyIGJheicpPT09J2Zvby1iYXItYmF6JywnZGFzaCcpO1xuXHRvayhkYXNoKCdmb29CYXJCYXonKT09PSdmb28tYmFyLWJheicsJ2Rhc2gnKTtcblx0b2soZGFzaCgnZm9vX2Jhcl9iYXonKT09PSdmb28tYmFyLWJheicsJ2Rhc2gnKTtcbn0pO1xudGVzdCgndW5kZXJzY29yZScsIGZ1bmN0aW9uKCkge1xuXHR2YXIgdW5kZXJzY29yZSA9IHN0cmluZy51bmRlcnNjb3JlO1xuXHRvayh1bmRlcnNjb3JlKCdmb28gYmFyIGJheicpPT09J2Zvb19iYXJfYmF6JywndW5kZXJzY29yZScpO1xuXHRvayh1bmRlcnNjb3JlKCdmb29CYXJCYXonKT09PSdmb29fYmFyX2JheicsJ3VuZGVyc2NvcmUnKTtcblx0b2sodW5kZXJzY29yZSgnZm9vLWJhci1iYXonKT09PSdmb29fYmFyX2JheicsJ3VuZGVyc2NvcmUnKTtcbn0pO1xudGVzdCgnYXVnbWVudCcsIGZ1bmN0aW9uKCkge1xuXHR2YXIgcGFkID0gc3RyaW5nLnBhZDtcblx0b2socGFkKCdhJywzLCdiJyk9PT0nYWJiJywncGFkJyk7XG5cdG9rKHBhZCgnYScsMywnYmMnKT09PSdhYmMnLCdwYWQnKTtcblx0b2socGFkKCdhJywzLCdiJyx0cnVlKT09PSdiYmEnLCdwYWQgbGVmdCcpO1xuXHRvayhwYWQoJ2FhYycsMywnYicpPT09J2FhYycsJ3BhZCcpO1xuXHRvayhwYWQoJ2FhYWMnLDMsJ2InKT09PSdhYWFjJywncGFkJyk7XG59KTtcbnRlc3QoJ2lzVXJsJywgZnVuY3Rpb24oKSB7XG5cdHZhciBpc1VybCA9IHN0cmluZy5pc1VybDtcblx0b2soaXNVcmwoJ2ZvbyBiYXIgYmF6Jyk9PT1mYWxzZSwnbm90IHVybCcpO1xuXHRvayhpc1VybCgnLy9tYXhjZG4uYm9vdHN0cmFwY2RuLmNvbS9ib290c3RyYXAvMy4zLjEvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJyk9PT10cnVlLCdDRE4gdXJsJyk7XG5cdG9rKGlzVXJsKCdodHRwczovL2dtYWlsLmNvbS8nKT09PXRydWUsJ2h0dHBzIHVybCcpO1xuXHRvayhpc1VybCgnaHR0cDovL2dvb2dsZS5jb20vJyk9PT10cnVlLCdodHRwIHVybCcpO1xuXHRvayhpc1VybCgnd3d3LmZpbG1hY2FkZW1pZS5ubCcpPT09ZmFsc2UsJ2ludmFsaWQgc3RyaWN0Jyk7XG5cdG9rKGlzVXJsKCd3d3cuZmlsbWFjYWRlbWllLm5sJyxmYWxzZSk9PT10cnVlLCd2YWxpZCBub24tc3RyaWN0Jyk7XG59KTtcbnRlc3QoJ3RvU2x1ZycsIGZ1bmN0aW9uKCkge1xuXHR2YXIgdG9TbHVnID0gc3RyaW5nLnRvU2x1Zztcblx0b2sodG9TbHVnKCcgRm9vIGJhciBiQXo/Jyk9PT0nZm9vLWJhci1iYXonLCdGb28gYsOkciBiQXonKTtcblx0b2sodG9TbHVnKCdGb28gYsOkciBiQXo/Jyk9PT0nZm9vLWJhci1iYXonLCdGb28gYsOkciBiQXonKTtcbn0pO1xudGVzdCgnbm9ybWFsaXplJywgZnVuY3Rpb24oKSB7XG5cdG9rKHN0cmluZy5jYW1lbENhc2UoJ2ZvbyBiYXIgYmF6Jyk9PT0nZm9vQmFyQmF6Jywnbm9ybWFsaXplJyk7XG59KTsiLCIvKmdsb2JhbCBRVW5pdCx0ZXN0LG9rKi9cclxuaW1wb3J0IG5hbWVzcGFjZSBmcm9tICcuLy4uLy4uLy4uL3NyYy9uYW1lc3BhY2UnO1xyXG5RVW5pdC5tb2R1bGUoJ25hbWVzcGFjZScpO1xyXG50ZXN0KCdpZGRxZC5ucycsIGZ1bmN0aW9uKCl7XHJcblx0LypnbG9iYWwgIFx0YSovXHJcblx0b2soKG5hbWVzcGFjZSgnYScse2I6e30sYzp0cnVlfSksYS5jKSwnbmFtZXNwYWNlIGNyZWF0ZScpO1xyXG5cdG9rKChuYW1lc3BhY2UoJ2EuYi5jJyx7ZDp0cnVlfSksYS5iLmMuZCksJ25hbWVzcGFjZSBhcHBlbmQnKTtcclxuXHQvL29rKChuYW1lc3BhY2UoJ2EuYicse2Q6dHJ1ZX0pLGEuYi5kKSwnbmFtZXNwYWNlIG92ZXJ3cml0ZScpO1xyXG59KTsiLCIvKmdsb2JhbCBRVW5pdCxhc3luY1Rlc3Qsb2ssc3RhcnQqL1xyXG5pbXBvcnQgdGltZW91dCBmcm9tICcuLy4uLy4uLy4uL3NyYy90aW1lb3V0JztcclxuUVVuaXQubW9kdWxlKCd0aW1lb3V0Jyk7XHJcbmFzeW5jVGVzdCgndGltZW91dCcsZnVuY3Rpb24gKCkge1xyXG5cdHRpbWVvdXQoKCk9Pnt9KS50aGVuKCgpPT57XHJcblx0XHRvayh0cnVlLCd0aGVuJyk7XHJcblx0XHRzdGFydCgpO1xyXG5cdH0pO1xyXG59KTsiLCIvKmdsb2JhbCBRVW5pdCx0ZXN0LG9rKi9cclxuaW1wb3J0IHR5cGUgZnJvbSAnLi8uLi8uLi8uLi9zcmMvdHlwZSc7XHJcblxyXG5RVW5pdC5tb2R1bGUoJ3R5cGUnKTtcclxudGVzdCgndW5kZWZpbmVkJyxvay5iaW5kKG51bGwsdHlwZSh1bmRlZmluZWQpPT09dHlwZS5VTkRFRklORUQsJ3VuZGVmaW5lZCcpKTtcclxudGVzdCgnbnVsbCcsb2suYmluZChudWxsLHR5cGUobnVsbCk9PT10eXBlLk5VTEwsJ251bGwnKSk7XHJcbnRlc3QoJ29iamVjdCcsKCk9PntcclxuXHRvayh0eXBlKHt9KT09PXR5cGUuT0JKRUNULCdvYmplY3QnKTtcclxuXHRvayh0eXBlKGFyZ3VtZW50cyk9PT10eXBlLk9CSkVDVCwnYXJndW1lbnRzJyk7XHJcbn0pO1xyXG50ZXN0KCdhcnJheScsKCk9PntcclxuXHRvayh0eXBlKFtdKT09PXR5cGUuQVJSQVksJ1tdJyk7XHJcblx0b2sodHlwZShuZXcgQXJyYXkoKSk9PT10eXBlLkFSUkFZLCduZXcgQXJyYXknKTtcclxufSk7XHJcbnRlc3QoJ25vZGUnLCgpPT57XHJcblx0b2sodHlwZShkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJykpPT09dHlwZS5OT0RFLCdub2RlJyk7XHJcbn0pO1xyXG4vKnRlc3QoJ2V2ZW50JywoKT0+e1xyXG5cdG9rKHR5cGUobmV3IEV2ZW50KCdmb28nKSk9PT10eXBlLkVWRU5ULCdFdmVudCcpO1xyXG5cdG9rKHR5cGUobmV3IEN1c3RvbUV2ZW50KCdiYXInLHt9KSk9PT10eXBlLkVWRU5ULCdDdXN0b21FdmVudCcpO1xyXG5cdG9rKHR5cGUoZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50JykpPT09dHlwZS5FVkVOVCwnZG9jdW1lbnQuY3JlYXRlRXZlbnQnKTtcclxufSk7Ki9cclxudGVzdCgnZnVuY3Rpb24nLCgpPT57XHJcblx0b2sodHlwZShmdW5jdGlvbigpe30pPT09dHlwZS5GVU5DVElPTiwnZnVuY3Rpb24nKTtcclxufSk7XHJcbnRlc3QoJ3N0cmluZycsKCk9PntcclxuXHRvayh0eXBlKCdhJyk9PT10eXBlLlNUUklORywnYScpO1xyXG5cdG9rKHR5cGUoU3RyaW5nKCkpPT09dHlwZS5TVFJJTkcsJ1N0cmluZygpJyk7XHJcbn0pO1xyXG50ZXN0KCdib29sZWFuJywoKT0+e1xyXG5cdG9rKHR5cGUodHJ1ZSk9PT10eXBlLkJPT0xFQU4sJ3RydWUnKTtcclxuXHRvayh0eXBlKGZhbHNlKT09PXR5cGUuQk9PTEVBTiwnZmFsc2UnKTtcclxufSk7XHJcbnRlc3QoJ2ludCcsKCk9PntcclxuXHRvayh0eXBlKDApPT09dHlwZS5JTlQsJzAnKTtcclxuXHRvayh0eXBlKDEpPT09dHlwZS5JTlQsJzEnKTtcclxuXHRvayh0eXBlKDB4RkYpPT09dHlwZS5JTlQsJzB4RkYnKTtcclxuXHRvayh0eXBlKDFFNCk9PT10eXBlLklOVCwnMUU0Jyk7XHJcblx0b2sodHlwZShOdW1iZXIuTUlOX1ZBTFVFKT09PXR5cGUuRkxPQVQsJ051bWJlci5NSU5fVkFMVUUnKTtcclxuXHRvayh0eXBlKE51bWJlci5NQVhfVkFMVUUpPT09dHlwZS5JTlQsJ051bWJlci5NQVhfVkFMVUUnKTtcclxufSk7XHJcbnRlc3QoJ2Zsb2F0JywoKT0+e1xyXG5cdG9rKHR5cGUoMS4xKT09PXR5cGUuRkxPQVQsJzEuMScpO1xyXG5cdG9rKHR5cGUoTWF0aC5QSSk9PT10eXBlLkZMT0FULCdNYXRoLlBJJyk7XHJcblx0b2sodHlwZSgxRS00KT09PXR5cGUuRkxPQVQsJzFFLTQnKTtcclxufSk7XHJcbnRlc3QoJ25hbicsKCk9PntcclxuXHRvayh0eXBlKE5hTik9PT10eXBlLk5BTiwnTmFOJyk7XHJcblx0b2sodHlwZSgwLzApPT09dHlwZS5OQU4sJzAvMCcpO1xyXG59KTtcclxudGVzdCgnaW5maW5pdGUnLCgpPT57XHJcblx0b2sodHlwZShJbmZpbml0eSk9PT10eXBlLklORklOSVRFLCdJbmZpbml0eScpO1xyXG5cdG9rKHR5cGUoMi8wKT09PXR5cGUuSU5GSU5JVEUsJzIvMCcpO1xyXG5cdG9rKHR5cGUoTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZKT09PXR5cGUuSU5GSU5JVEUsJ051bWJlci5QT1NJVElWRV9JTkZJTklUWScpO1xyXG5cdG9rKHR5cGUoTnVtYmVyLk5FR0FUSVZFX0lORklOSVRZKT09PXR5cGUuSU5GSU5JVEUsJ051bWJlci5ORUdBVElWRV9JTkZJTklUWScpO1xyXG59KTtcclxudGVzdCgncmVnZXhwJywoKT0+e1xyXG5cdG9rKHR5cGUoL1xccy9naSk9PT10eXBlLlJFR0VYUCwnL1xcXFxzL2dpJyk7XHJcblx0b2sodHlwZShuZXcgUmVnRXhwKCcnKSk9PT10eXBlLlJFR0VYUCwnbmV3IFJlZ0V4cCcpO1xyXG59KTtcclxudGVzdCgnZGF0ZScsKCk9PntcclxuXHRvayh0eXBlKG5ldyBEYXRlKCkpPT09dHlwZS5EQVRFLCduZXcgRGF0ZScpO1xyXG59KTsiLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBMby1EYXNoIDIuNC4xIChDdXN0b20gQnVpbGQpIGxvZGFzaC5jb20vbGljZW5zZSB8IFVuZGVyc2NvcmUuanMgMS41LjIgdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFXG4gKiBCdWlsZDogYGxvZGFzaCBtb2Rlcm4gLW8gLi9kaXN0L2xvZGFzaC5qc2BcbiAqL1xuOyhmdW5jdGlvbigpe2Z1bmN0aW9uIG4obix0LGUpe2U9KGV8fDApLTE7Zm9yKHZhciByPW4/bi5sZW5ndGg6MDsrK2U8cjspaWYobltlXT09PXQpcmV0dXJuIGU7cmV0dXJuLTF9ZnVuY3Rpb24gdCh0LGUpe3ZhciByPXR5cGVvZiBlO2lmKHQ9dC5sLFwiYm9vbGVhblwiPT1yfHxudWxsPT1lKXJldHVybiB0W2VdPzA6LTE7XCJudW1iZXJcIiE9ciYmXCJzdHJpbmdcIiE9ciYmKHI9XCJvYmplY3RcIik7dmFyIHU9XCJudW1iZXJcIj09cj9lOm0rZTtyZXR1cm4gdD0odD10W3JdKSYmdFt1XSxcIm9iamVjdFwiPT1yP3QmJi0xPG4odCxlKT8wOi0xOnQ/MDotMX1mdW5jdGlvbiBlKG4pe3ZhciB0PXRoaXMubCxlPXR5cGVvZiBuO2lmKFwiYm9vbGVhblwiPT1lfHxudWxsPT1uKXRbbl09dHJ1ZTtlbHNle1wibnVtYmVyXCIhPWUmJlwic3RyaW5nXCIhPWUmJihlPVwib2JqZWN0XCIpO3ZhciByPVwibnVtYmVyXCI9PWU/bjptK24sdD10W2VdfHwodFtlXT17fSk7XCJvYmplY3RcIj09ZT8odFtyXXx8KHRbcl09W10pKS5wdXNoKG4pOnRbcl09dHJ1ZVxufX1mdW5jdGlvbiByKG4pe3JldHVybiBuLmNoYXJDb2RlQXQoMCl9ZnVuY3Rpb24gdShuLHQpe2Zvcih2YXIgZT1uLm0scj10Lm0sdT0tMSxvPWUubGVuZ3RoOysrdTxvOyl7dmFyIGk9ZVt1XSxhPXJbdV07aWYoaSE9PWEpe2lmKGk+YXx8dHlwZW9mIGk9PVwidW5kZWZpbmVkXCIpcmV0dXJuIDE7aWYoaTxhfHx0eXBlb2YgYT09XCJ1bmRlZmluZWRcIilyZXR1cm4tMX19cmV0dXJuIG4ubi10Lm59ZnVuY3Rpb24gbyhuKXt2YXIgdD0tMSxyPW4ubGVuZ3RoLHU9blswXSxvPW5bci8yfDBdLGk9bltyLTFdO2lmKHUmJnR5cGVvZiB1PT1cIm9iamVjdFwiJiZvJiZ0eXBlb2Ygbz09XCJvYmplY3RcIiYmaSYmdHlwZW9mIGk9PVwib2JqZWN0XCIpcmV0dXJuIGZhbHNlO2Zvcih1PWYoKSx1W1wiZmFsc2VcIl09dVtcIm51bGxcIl09dVtcInRydWVcIl09dS51bmRlZmluZWQ9ZmFsc2Usbz1mKCksby5rPW4sby5sPXUsby5wdXNoPWU7Kyt0PHI7KW8ucHVzaChuW3RdKTtyZXR1cm4gb31mdW5jdGlvbiBpKG4pe3JldHVyblwiXFxcXFwiK1Vbbl1cbn1mdW5jdGlvbiBhKCl7cmV0dXJuIGgucG9wKCl8fFtdfWZ1bmN0aW9uIGYoKXtyZXR1cm4gZy5wb3AoKXx8e2s6bnVsbCxsOm51bGwsbTpudWxsLFwiZmFsc2VcIjpmYWxzZSxuOjAsXCJudWxsXCI6ZmFsc2UsbnVtYmVyOm51bGwsb2JqZWN0Om51bGwscHVzaDpudWxsLHN0cmluZzpudWxsLFwidHJ1ZVwiOmZhbHNlLHVuZGVmaW5lZDpmYWxzZSxvOm51bGx9fWZ1bmN0aW9uIGwobil7bi5sZW5ndGg9MCxoLmxlbmd0aDxfJiZoLnB1c2gobil9ZnVuY3Rpb24gYyhuKXt2YXIgdD1uLmw7dCYmYyh0KSxuLms9bi5sPW4ubT1uLm9iamVjdD1uLm51bWJlcj1uLnN0cmluZz1uLm89bnVsbCxnLmxlbmd0aDxfJiZnLnB1c2gobil9ZnVuY3Rpb24gcChuLHQsZSl7dHx8KHQ9MCksdHlwZW9mIGU9PVwidW5kZWZpbmVkXCImJihlPW4/bi5sZW5ndGg6MCk7dmFyIHI9LTE7ZT1lLXR8fDA7Zm9yKHZhciB1PUFycmF5KDA+ZT8wOmUpOysrcjxlOyl1W3JdPW5bdCtyXTtyZXR1cm4gdX1mdW5jdGlvbiBzKGUpe2Z1bmN0aW9uIGgobix0LGUpe2lmKCFufHwhVlt0eXBlb2Ygbl0pcmV0dXJuIG47XG50PXQmJnR5cGVvZiBlPT1cInVuZGVmaW5lZFwiP3Q6dHQodCxlLDMpO2Zvcih2YXIgcj0tMSx1PVZbdHlwZW9mIG5dJiZGZShuKSxvPXU/dS5sZW5ndGg6MDsrK3I8byYmKGU9dVtyXSxmYWxzZSE9PXQobltlXSxlLG4pKTspO3JldHVybiBufWZ1bmN0aW9uIGcobix0LGUpe3ZhciByO2lmKCFufHwhVlt0eXBlb2Ygbl0pcmV0dXJuIG47dD10JiZ0eXBlb2YgZT09XCJ1bmRlZmluZWRcIj90OnR0KHQsZSwzKTtmb3IociBpbiBuKWlmKGZhbHNlPT09dChuW3JdLHIsbikpYnJlYWs7cmV0dXJuIG59ZnVuY3Rpb24gXyhuLHQsZSl7dmFyIHIsdT1uLG89dTtpZighdSlyZXR1cm4gbztmb3IodmFyIGk9YXJndW1lbnRzLGE9MCxmPXR5cGVvZiBlPT1cIm51bWJlclwiPzI6aS5sZW5ndGg7KythPGY7KWlmKCh1PWlbYV0pJiZWW3R5cGVvZiB1XSlmb3IodmFyIGw9LTEsYz1WW3R5cGVvZiB1XSYmRmUodSkscD1jP2MubGVuZ3RoOjA7KytsPHA7KXI9Y1tsXSxcInVuZGVmaW5lZFwiPT10eXBlb2Ygb1tyXSYmKG9bcl09dVtyXSk7XG5yZXR1cm4gb31mdW5jdGlvbiBVKG4sdCxlKXt2YXIgcix1PW4sbz11O2lmKCF1KXJldHVybiBvO3ZhciBpPWFyZ3VtZW50cyxhPTAsZj10eXBlb2YgZT09XCJudW1iZXJcIj8yOmkubGVuZ3RoO2lmKDM8ZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgaVtmLTJdKXZhciBsPXR0KGlbLS1mLTFdLGlbZi0tXSwyKTtlbHNlIDI8ZiYmXCJmdW5jdGlvblwiPT10eXBlb2YgaVtmLTFdJiYobD1pWy0tZl0pO2Zvcig7KythPGY7KWlmKCh1PWlbYV0pJiZWW3R5cGVvZiB1XSlmb3IodmFyIGM9LTEscD1WW3R5cGVvZiB1XSYmRmUodSkscz1wP3AubGVuZ3RoOjA7KytjPHM7KXI9cFtjXSxvW3JdPWw/bChvW3JdLHVbcl0pOnVbcl07cmV0dXJuIG99ZnVuY3Rpb24gSChuKXt2YXIgdCxlPVtdO2lmKCFufHwhVlt0eXBlb2Ygbl0pcmV0dXJuIGU7Zm9yKHQgaW4gbiltZS5jYWxsKG4sdCkmJmUucHVzaCh0KTtyZXR1cm4gZX1mdW5jdGlvbiBKKG4pe3JldHVybiBuJiZ0eXBlb2Ygbj09XCJvYmplY3RcIiYmIVRlKG4pJiZtZS5jYWxsKG4sXCJfX3dyYXBwZWRfX1wiKT9uOm5ldyBRKG4pXG59ZnVuY3Rpb24gUShuLHQpe3RoaXMuX19jaGFpbl9fPSEhdCx0aGlzLl9fd3JhcHBlZF9fPW59ZnVuY3Rpb24gWChuKXtmdW5jdGlvbiB0KCl7aWYocil7dmFyIG49cChyKTtiZS5hcHBseShuLGFyZ3VtZW50cyl9aWYodGhpcyBpbnN0YW5jZW9mIHQpe3ZhciBvPW50KGUucHJvdG90eXBlKSxuPWUuYXBwbHkobyxufHxhcmd1bWVudHMpO3JldHVybiB3dChuKT9uOm99cmV0dXJuIGUuYXBwbHkodSxufHxhcmd1bWVudHMpfXZhciBlPW5bMF0scj1uWzJdLHU9bls0XTtyZXR1cm4gJGUodCxuKSx0fWZ1bmN0aW9uIFoobix0LGUscix1KXtpZihlKXt2YXIgbz1lKG4pO2lmKHR5cGVvZiBvIT1cInVuZGVmaW5lZFwiKXJldHVybiBvfWlmKCF3dChuKSlyZXR1cm4gbjt2YXIgaT1jZS5jYWxsKG4pO2lmKCFLW2ldKXJldHVybiBuO3ZhciBmPUFlW2ldO3N3aXRjaChpKXtjYXNlIFQ6Y2FzZSBGOnJldHVybiBuZXcgZigrbik7Y2FzZSBXOmNhc2UgUDpyZXR1cm4gbmV3IGYobik7Y2FzZSB6OnJldHVybiBvPWYobi5zb3VyY2UsQy5leGVjKG4pKSxvLmxhc3RJbmRleD1uLmxhc3RJbmRleCxvXG59aWYoaT1UZShuKSx0KXt2YXIgYz0hcjtyfHwocj1hKCkpLHV8fCh1PWEoKSk7Zm9yKHZhciBzPXIubGVuZ3RoO3MtLTspaWYocltzXT09bilyZXR1cm4gdVtzXTtvPWk/ZihuLmxlbmd0aCk6e319ZWxzZSBvPWk/cChuKTpVKHt9LG4pO3JldHVybiBpJiYobWUuY2FsbChuLFwiaW5kZXhcIikmJihvLmluZGV4PW4uaW5kZXgpLG1lLmNhbGwobixcImlucHV0XCIpJiYoby5pbnB1dD1uLmlucHV0KSksdD8oci5wdXNoKG4pLHUucHVzaChvKSwoaT9TdDpoKShuLGZ1bmN0aW9uKG4saSl7b1tpXT1aKG4sdCxlLHIsdSl9KSxjJiYobChyKSxsKHUpKSxvKTpvfWZ1bmN0aW9uIG50KG4pe3JldHVybiB3dChuKT9rZShuKTp7fX1mdW5jdGlvbiB0dChuLHQsZSl7aWYodHlwZW9mIG4hPVwiZnVuY3Rpb25cIilyZXR1cm4gVXQ7aWYodHlwZW9mIHQ9PVwidW5kZWZpbmVkXCJ8fCEoXCJwcm90b3R5cGVcImluIG4pKXJldHVybiBuO3ZhciByPW4uX19iaW5kRGF0YV9fO2lmKHR5cGVvZiByPT1cInVuZGVmaW5lZFwiJiYoRGUuZnVuY05hbWVzJiYocj0hbi5uYW1lKSxyPXJ8fCFEZS5mdW5jRGVjb21wLCFyKSl7dmFyIHU9Z2UuY2FsbChuKTtcbkRlLmZ1bmNOYW1lc3x8KHI9IU8udGVzdCh1KSkscnx8KHI9RS50ZXN0KHUpLCRlKG4scikpfWlmKGZhbHNlPT09cnx8dHJ1ZSE9PXImJjEmclsxXSlyZXR1cm4gbjtzd2l0Y2goZSl7Y2FzZSAxOnJldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gbi5jYWxsKHQsZSl9O2Nhc2UgMjpyZXR1cm4gZnVuY3Rpb24oZSxyKXtyZXR1cm4gbi5jYWxsKHQsZSxyKX07Y2FzZSAzOnJldHVybiBmdW5jdGlvbihlLHIsdSl7cmV0dXJuIG4uY2FsbCh0LGUscix1KX07Y2FzZSA0OnJldHVybiBmdW5jdGlvbihlLHIsdSxvKXtyZXR1cm4gbi5jYWxsKHQsZSxyLHUsbyl9fXJldHVybiBNdChuLHQpfWZ1bmN0aW9uIGV0KG4pe2Z1bmN0aW9uIHQoKXt2YXIgbj1mP2k6dGhpcztpZih1KXt2YXIgaD1wKHUpO2JlLmFwcGx5KGgsYXJndW1lbnRzKX1yZXR1cm4ob3x8YykmJihofHwoaD1wKGFyZ3VtZW50cykpLG8mJmJlLmFwcGx5KGgsbyksYyYmaC5sZW5ndGg8YSk/KHJ8PTE2LGV0KFtlLHM/cjotNCZyLGgsbnVsbCxpLGFdKSk6KGh8fChoPWFyZ3VtZW50cyksbCYmKGU9blt2XSksdGhpcyBpbnN0YW5jZW9mIHQ/KG49bnQoZS5wcm90b3R5cGUpLGg9ZS5hcHBseShuLGgpLHd0KGgpP2g6bik6ZS5hcHBseShuLGgpKVxufXZhciBlPW5bMF0scj1uWzFdLHU9blsyXSxvPW5bM10saT1uWzRdLGE9bls1XSxmPTEmcixsPTImcixjPTQmcixzPTgmcix2PWU7cmV0dXJuICRlKHQsbiksdH1mdW5jdGlvbiBydChlLHIpe3ZhciB1PS0xLGk9c3QoKSxhPWU/ZS5sZW5ndGg6MCxmPWE+PWImJmk9PT1uLGw9W107aWYoZil7dmFyIHA9byhyKTtwPyhpPXQscj1wKTpmPWZhbHNlfWZvcig7Kyt1PGE7KXA9ZVt1XSwwPmkocixwKSYmbC5wdXNoKHApO3JldHVybiBmJiZjKHIpLGx9ZnVuY3Rpb24gdXQobix0LGUscil7cj0ocnx8MCktMTtmb3IodmFyIHU9bj9uLmxlbmd0aDowLG89W107KytyPHU7KXt2YXIgaT1uW3JdO2lmKGkmJnR5cGVvZiBpPT1cIm9iamVjdFwiJiZ0eXBlb2YgaS5sZW5ndGg9PVwibnVtYmVyXCImJihUZShpKXx8eXQoaSkpKXt0fHwoaT11dChpLHQsZSkpO3ZhciBhPS0xLGY9aS5sZW5ndGgsbD1vLmxlbmd0aDtmb3Ioby5sZW5ndGgrPWY7KythPGY7KW9bbCsrXT1pW2FdfWVsc2UgZXx8by5wdXNoKGkpfXJldHVybiBvXG59ZnVuY3Rpb24gb3Qobix0LGUscix1LG8pe2lmKGUpe3ZhciBpPWUobix0KTtpZih0eXBlb2YgaSE9XCJ1bmRlZmluZWRcIilyZXR1cm4hIWl9aWYobj09PXQpcmV0dXJuIDAhPT1ufHwxL249PTEvdDtpZihuPT09biYmIShuJiZWW3R5cGVvZiBuXXx8dCYmVlt0eXBlb2YgdF0pKXJldHVybiBmYWxzZTtpZihudWxsPT1ufHxudWxsPT10KXJldHVybiBuPT09dDt2YXIgZj1jZS5jYWxsKG4pLGM9Y2UuY2FsbCh0KTtpZihmPT1EJiYoZj1xKSxjPT1EJiYoYz1xKSxmIT1jKXJldHVybiBmYWxzZTtzd2l0Y2goZil7Y2FzZSBUOmNhc2UgRjpyZXR1cm4rbj09K3Q7Y2FzZSBXOnJldHVybiBuIT0rbj90IT0rdDowPT1uPzEvbj09MS90Om49PSt0O2Nhc2UgejpjYXNlIFA6cmV0dXJuIG49PW9lKHQpfWlmKGM9Zj09JCwhYyl7dmFyIHA9bWUuY2FsbChuLFwiX193cmFwcGVkX19cIikscz1tZS5jYWxsKHQsXCJfX3dyYXBwZWRfX1wiKTtpZihwfHxzKXJldHVybiBvdChwP24uX193cmFwcGVkX186bixzP3QuX193cmFwcGVkX186dCxlLHIsdSxvKTtcbmlmKGYhPXEpcmV0dXJuIGZhbHNlO2lmKGY9bi5jb25zdHJ1Y3RvcixwPXQuY29uc3RydWN0b3IsZiE9cCYmIShkdChmKSYmZiBpbnN0YW5jZW9mIGYmJmR0KHApJiZwIGluc3RhbmNlb2YgcCkmJlwiY29uc3RydWN0b3JcImluIG4mJlwiY29uc3RydWN0b3JcImluIHQpcmV0dXJuIGZhbHNlfWZvcihmPSF1LHV8fCh1PWEoKSksb3x8KG89YSgpKSxwPXUubGVuZ3RoO3AtLTspaWYodVtwXT09bilyZXR1cm4gb1twXT09dDt2YXIgdj0wLGk9dHJ1ZTtpZih1LnB1c2gobiksby5wdXNoKHQpLGMpe2lmKHA9bi5sZW5ndGgsdj10Lmxlbmd0aCwoaT12PT1wKXx8cilmb3IoO3YtLTspaWYoYz1wLHM9dFt2XSxyKWZvcig7Yy0tJiYhKGk9b3QobltjXSxzLGUscix1LG8pKTspO2Vsc2UgaWYoIShpPW90KG5bdl0scyxlLHIsdSxvKSkpYnJlYWt9ZWxzZSBnKHQsZnVuY3Rpb24odCxhLGYpe3JldHVybiBtZS5jYWxsKGYsYSk/KHYrKyxpPW1lLmNhbGwobixhKSYmb3QoblthXSx0LGUscix1LG8pKTp2b2lkIDB9KSxpJiYhciYmZyhuLGZ1bmN0aW9uKG4sdCxlKXtyZXR1cm4gbWUuY2FsbChlLHQpP2k9LTE8LS12OnZvaWQgMFxufSk7cmV0dXJuIHUucG9wKCksby5wb3AoKSxmJiYobCh1KSxsKG8pKSxpfWZ1bmN0aW9uIGl0KG4sdCxlLHIsdSl7KFRlKHQpP1N0OmgpKHQsZnVuY3Rpb24odCxvKXt2YXIgaSxhLGY9dCxsPW5bb107aWYodCYmKChhPVRlKHQpKXx8UGUodCkpKXtmb3IoZj1yLmxlbmd0aDtmLS07KWlmKGk9cltmXT09dCl7bD11W2ZdO2JyZWFrfWlmKCFpKXt2YXIgYztlJiYoZj1lKGwsdCksYz10eXBlb2YgZiE9XCJ1bmRlZmluZWRcIikmJihsPWYpLGN8fChsPWE/VGUobCk/bDpbXTpQZShsKT9sOnt9KSxyLnB1c2godCksdS5wdXNoKGwpLGN8fGl0KGwsdCxlLHIsdSl9fWVsc2UgZSYmKGY9ZShsLHQpLHR5cGVvZiBmPT1cInVuZGVmaW5lZFwiJiYoZj10KSksdHlwZW9mIGYhPVwidW5kZWZpbmVkXCImJihsPWYpO25bb109bH0pfWZ1bmN0aW9uIGF0KG4sdCl7cmV0dXJuIG4raGUoUmUoKSoodC1uKzEpKX1mdW5jdGlvbiBmdChlLHIsdSl7dmFyIGk9LTEsZj1zdCgpLHA9ZT9lLmxlbmd0aDowLHM9W10sdj0hciYmcD49YiYmZj09PW4saD11fHx2P2EoKTpzO1xuZm9yKHYmJihoPW8oaCksZj10KTsrK2k8cDspe3ZhciBnPWVbaV0seT11P3UoZyxpLGUpOmc7KHI/IWl8fGhbaC5sZW5ndGgtMV0hPT15OjA+ZihoLHkpKSYmKCh1fHx2KSYmaC5wdXNoKHkpLHMucHVzaChnKSl9cmV0dXJuIHY/KGwoaC5rKSxjKGgpKTp1JiZsKGgpLHN9ZnVuY3Rpb24gbHQobil7cmV0dXJuIGZ1bmN0aW9uKHQsZSxyKXt2YXIgdT17fTtlPUouY3JlYXRlQ2FsbGJhY2soZSxyLDMpLHI9LTE7dmFyIG89dD90Lmxlbmd0aDowO2lmKHR5cGVvZiBvPT1cIm51bWJlclwiKWZvcig7KytyPG87KXt2YXIgaT10W3JdO24odSxpLGUoaSxyLHQpLHQpfWVsc2UgaCh0LGZ1bmN0aW9uKHQscixvKXtuKHUsdCxlKHQscixvKSxvKX0pO3JldHVybiB1fX1mdW5jdGlvbiBjdChuLHQsZSxyLHUsbyl7dmFyIGk9MSZ0LGE9NCZ0LGY9MTYmdCxsPTMyJnQ7aWYoISgyJnR8fGR0KG4pKSl0aHJvdyBuZXcgaWU7ZiYmIWUubGVuZ3RoJiYodCY9LTE3LGY9ZT1mYWxzZSksbCYmIXIubGVuZ3RoJiYodCY9LTMzLGw9cj1mYWxzZSk7XG52YXIgYz1uJiZuLl9fYmluZERhdGFfXztyZXR1cm4gYyYmdHJ1ZSE9PWM/KGM9cChjKSxjWzJdJiYoY1syXT1wKGNbMl0pKSxjWzNdJiYoY1szXT1wKGNbM10pKSwhaXx8MSZjWzFdfHwoY1s0XT11KSwhaSYmMSZjWzFdJiYodHw9OCksIWF8fDQmY1sxXXx8KGNbNV09byksZiYmYmUuYXBwbHkoY1syXXx8KGNbMl09W10pLGUpLGwmJndlLmFwcGx5KGNbM118fChjWzNdPVtdKSxyKSxjWzFdfD10LGN0LmFwcGx5KG51bGwsYykpOigxPT10fHwxNz09PXQ/WDpldCkoW24sdCxlLHIsdSxvXSl9ZnVuY3Rpb24gcHQobil7cmV0dXJuIEJlW25dfWZ1bmN0aW9uIHN0KCl7dmFyIHQ9KHQ9Si5pbmRleE9mKT09PVd0P246dDtyZXR1cm4gdH1mdW5jdGlvbiB2dChuKXtyZXR1cm4gdHlwZW9mIG49PVwiZnVuY3Rpb25cIiYmcGUudGVzdChuKX1mdW5jdGlvbiBodChuKXt2YXIgdCxlO3JldHVybiBuJiZjZS5jYWxsKG4pPT1xJiYodD1uLmNvbnN0cnVjdG9yLCFkdCh0KXx8dCBpbnN0YW5jZW9mIHQpPyhnKG4sZnVuY3Rpb24obix0KXtlPXRcbn0pLHR5cGVvZiBlPT1cInVuZGVmaW5lZFwifHxtZS5jYWxsKG4sZSkpOmZhbHNlfWZ1bmN0aW9uIGd0KG4pe3JldHVybiBXZVtuXX1mdW5jdGlvbiB5dChuKXtyZXR1cm4gbiYmdHlwZW9mIG49PVwib2JqZWN0XCImJnR5cGVvZiBuLmxlbmd0aD09XCJudW1iZXJcIiYmY2UuY2FsbChuKT09RHx8ZmFsc2V9ZnVuY3Rpb24gbXQobix0LGUpe3ZhciByPUZlKG4pLHU9ci5sZW5ndGg7Zm9yKHQ9dHQodCxlLDMpO3UtLSYmKGU9clt1XSxmYWxzZSE9PXQobltlXSxlLG4pKTspO3JldHVybiBufWZ1bmN0aW9uIGJ0KG4pe3ZhciB0PVtdO3JldHVybiBnKG4sZnVuY3Rpb24obixlKXtkdChuKSYmdC5wdXNoKGUpfSksdC5zb3J0KCl9ZnVuY3Rpb24gX3Qobil7Zm9yKHZhciB0PS0xLGU9RmUobikscj1lLmxlbmd0aCx1PXt9OysrdDxyOyl7dmFyIG89ZVt0XTt1W25bb11dPW99cmV0dXJuIHV9ZnVuY3Rpb24gZHQobil7cmV0dXJuIHR5cGVvZiBuPT1cImZ1bmN0aW9uXCJ9ZnVuY3Rpb24gd3Qobil7cmV0dXJuISghbnx8IVZbdHlwZW9mIG5dKVxufWZ1bmN0aW9uIGp0KG4pe3JldHVybiB0eXBlb2Ygbj09XCJudW1iZXJcInx8biYmdHlwZW9mIG49PVwib2JqZWN0XCImJmNlLmNhbGwobik9PVd8fGZhbHNlfWZ1bmN0aW9uIGt0KG4pe3JldHVybiB0eXBlb2Ygbj09XCJzdHJpbmdcInx8biYmdHlwZW9mIG49PVwib2JqZWN0XCImJmNlLmNhbGwobik9PVB8fGZhbHNlfWZ1bmN0aW9uIHh0KG4pe2Zvcih2YXIgdD0tMSxlPUZlKG4pLHI9ZS5sZW5ndGgsdT1YdChyKTsrK3Q8cjspdVt0XT1uW2VbdF1dO3JldHVybiB1fWZ1bmN0aW9uIEN0KG4sdCxlKXt2YXIgcj0tMSx1PXN0KCksbz1uP24ubGVuZ3RoOjAsaT1mYWxzZTtyZXR1cm4gZT0oMD5lP0llKDAsbytlKTplKXx8MCxUZShuKT9pPS0xPHUobix0LGUpOnR5cGVvZiBvPT1cIm51bWJlclwiP2k9LTE8KGt0KG4pP24uaW5kZXhPZih0LGUpOnUobix0LGUpKTpoKG4sZnVuY3Rpb24obil7cmV0dXJuKytyPGU/dm9pZCAwOiEoaT1uPT09dCl9KSxpfWZ1bmN0aW9uIE90KG4sdCxlKXt2YXIgcj10cnVlO3Q9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksZT0tMTtcbnZhciB1PW4/bi5sZW5ndGg6MDtpZih0eXBlb2YgdT09XCJudW1iZXJcIilmb3IoOysrZTx1JiYocj0hIXQobltlXSxlLG4pKTspO2Vsc2UgaChuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gcj0hIXQobixlLHUpfSk7cmV0dXJuIHJ9ZnVuY3Rpb24gTnQobix0LGUpe3ZhciByPVtdO3Q9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksZT0tMTt2YXIgdT1uP24ubGVuZ3RoOjA7aWYodHlwZW9mIHU9PVwibnVtYmVyXCIpZm9yKDsrK2U8dTspe3ZhciBvPW5bZV07dChvLGUsbikmJnIucHVzaChvKX1lbHNlIGgobixmdW5jdGlvbihuLGUsdSl7dChuLGUsdSkmJnIucHVzaChuKX0pO3JldHVybiByfWZ1bmN0aW9uIEl0KG4sdCxlKXt0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGU9LTE7dmFyIHI9bj9uLmxlbmd0aDowO2lmKHR5cGVvZiByIT1cIm51bWJlclwiKXt2YXIgdTtyZXR1cm4gaChuLGZ1bmN0aW9uKG4sZSxyKXtyZXR1cm4gdChuLGUscik/KHU9bixmYWxzZSk6dm9pZCAwfSksdX1mb3IoOysrZTxyOyl7dmFyIG89bltlXTtcbmlmKHQobyxlLG4pKXJldHVybiBvfX1mdW5jdGlvbiBTdChuLHQsZSl7dmFyIHI9LTEsdT1uP24ubGVuZ3RoOjA7aWYodD10JiZ0eXBlb2YgZT09XCJ1bmRlZmluZWRcIj90OnR0KHQsZSwzKSx0eXBlb2YgdT09XCJudW1iZXJcIilmb3IoOysrcjx1JiZmYWxzZSE9PXQobltyXSxyLG4pOyk7ZWxzZSBoKG4sdCk7cmV0dXJuIG59ZnVuY3Rpb24gRXQobix0LGUpe3ZhciByPW4/bi5sZW5ndGg6MDtpZih0PXQmJnR5cGVvZiBlPT1cInVuZGVmaW5lZFwiP3Q6dHQodCxlLDMpLHR5cGVvZiByPT1cIm51bWJlclwiKWZvcig7ci0tJiZmYWxzZSE9PXQobltyXSxyLG4pOyk7ZWxzZXt2YXIgdT1GZShuKSxyPXUubGVuZ3RoO2gobixmdW5jdGlvbihuLGUsbyl7cmV0dXJuIGU9dT91Wy0tcl06LS1yLHQob1tlXSxlLG8pfSl9cmV0dXJuIG59ZnVuY3Rpb24gUnQobix0LGUpe3ZhciByPS0xLHU9bj9uLmxlbmd0aDowO2lmKHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksdHlwZW9mIHU9PVwibnVtYmVyXCIpZm9yKHZhciBvPVh0KHUpOysrcjx1OylvW3JdPXQobltyXSxyLG4pO1xuZWxzZSBvPVtdLGgobixmdW5jdGlvbihuLGUsdSl7b1srK3JdPXQobixlLHUpfSk7cmV0dXJuIG99ZnVuY3Rpb24gQXQobix0LGUpe3ZhciB1PS0xLzAsbz11O2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCImJmUmJmVbdF09PT1uJiYodD1udWxsKSxudWxsPT10JiZUZShuKSl7ZT0tMTtmb3IodmFyIGk9bi5sZW5ndGg7KytlPGk7KXt2YXIgYT1uW2VdO2E+byYmKG89YSl9fWVsc2UgdD1udWxsPT10JiZrdChuKT9yOkouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLFN0KG4sZnVuY3Rpb24obixlLHIpe2U9dChuLGUsciksZT51JiYodT1lLG89bil9KTtyZXR1cm4gb31mdW5jdGlvbiBEdChuLHQsZSxyKXtpZighbilyZXR1cm4gZTt2YXIgdT0zPmFyZ3VtZW50cy5sZW5ndGg7dD1KLmNyZWF0ZUNhbGxiYWNrKHQsciw0KTt2YXIgbz0tMSxpPW4ubGVuZ3RoO2lmKHR5cGVvZiBpPT1cIm51bWJlclwiKWZvcih1JiYoZT1uWysrb10pOysrbzxpOyllPXQoZSxuW29dLG8sbik7ZWxzZSBoKG4sZnVuY3Rpb24obixyLG8pe2U9dT8odT1mYWxzZSxuKTp0KGUsbixyLG8pXG59KTtyZXR1cm4gZX1mdW5jdGlvbiAkdChuLHQsZSxyKXt2YXIgdT0zPmFyZ3VtZW50cy5sZW5ndGg7cmV0dXJuIHQ9Si5jcmVhdGVDYWxsYmFjayh0LHIsNCksRXQobixmdW5jdGlvbihuLHIsbyl7ZT11Pyh1PWZhbHNlLG4pOnQoZSxuLHIsbyl9KSxlfWZ1bmN0aW9uIFR0KG4pe3ZhciB0PS0xLGU9bj9uLmxlbmd0aDowLHI9WHQodHlwZW9mIGU9PVwibnVtYmVyXCI/ZTowKTtyZXR1cm4gU3QobixmdW5jdGlvbihuKXt2YXIgZT1hdCgwLCsrdCk7clt0XT1yW2VdLHJbZV09bn0pLHJ9ZnVuY3Rpb24gRnQobix0LGUpe3ZhciByO3Q9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksZT0tMTt2YXIgdT1uP24ubGVuZ3RoOjA7aWYodHlwZW9mIHU9PVwibnVtYmVyXCIpZm9yKDsrK2U8dSYmIShyPXQobltlXSxlLG4pKTspO2Vsc2UgaChuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4hKHI9dChuLGUsdSkpfSk7cmV0dXJuISFyfWZ1bmN0aW9uIEJ0KG4sdCxlKXt2YXIgcj0wLHU9bj9uLmxlbmd0aDowO2lmKHR5cGVvZiB0IT1cIm51bWJlclwiJiZudWxsIT10KXt2YXIgbz0tMTtcbmZvcih0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpOysrbzx1JiZ0KG5bb10sbyxuKTspcisrfWVsc2UgaWYocj10LG51bGw9PXJ8fGUpcmV0dXJuIG4/blswXTp2O3JldHVybiBwKG4sMCxTZShJZSgwLHIpLHUpKX1mdW5jdGlvbiBXdCh0LGUscil7aWYodHlwZW9mIHI9PVwibnVtYmVyXCIpe3ZhciB1PXQ/dC5sZW5ndGg6MDtyPTA+cj9JZSgwLHUrcik6cnx8MH1lbHNlIGlmKHIpcmV0dXJuIHI9enQodCxlKSx0W3JdPT09ZT9yOi0xO3JldHVybiBuKHQsZSxyKX1mdW5jdGlvbiBxdChuLHQsZSl7aWYodHlwZW9mIHQhPVwibnVtYmVyXCImJm51bGwhPXQpe3ZhciByPTAsdT0tMSxvPW4/bi5sZW5ndGg6MDtmb3IodD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKTsrK3U8byYmdChuW3VdLHUsbik7KXIrK31lbHNlIHI9bnVsbD09dHx8ZT8xOkllKDAsdCk7cmV0dXJuIHAobixyKX1mdW5jdGlvbiB6dChuLHQsZSxyKXt2YXIgdT0wLG89bj9uLmxlbmd0aDp1O2ZvcihlPWU/Si5jcmVhdGVDYWxsYmFjayhlLHIsMSk6VXQsdD1lKHQpO3U8bzspcj11K28+Pj4xLGUobltyXSk8dD91PXIrMTpvPXI7XG5yZXR1cm4gdX1mdW5jdGlvbiBQdChuLHQsZSxyKXtyZXR1cm4gdHlwZW9mIHQhPVwiYm9vbGVhblwiJiZudWxsIT10JiYocj1lLGU9dHlwZW9mIHQhPVwiZnVuY3Rpb25cIiYmciYmclt0XT09PW4/bnVsbDp0LHQ9ZmFsc2UpLG51bGwhPWUmJihlPUouY3JlYXRlQ2FsbGJhY2soZSxyLDMpKSxmdChuLHQsZSl9ZnVuY3Rpb24gS3QoKXtmb3IodmFyIG49MTxhcmd1bWVudHMubGVuZ3RoP2FyZ3VtZW50czphcmd1bWVudHNbMF0sdD0tMSxlPW4/QXQoVmUobixcImxlbmd0aFwiKSk6MCxyPVh0KDA+ZT8wOmUpOysrdDxlOylyW3RdPVZlKG4sdCk7cmV0dXJuIHJ9ZnVuY3Rpb24gTHQobix0KXt2YXIgZT0tMSxyPW4/bi5sZW5ndGg6MCx1PXt9O2Zvcih0fHwhcnx8VGUoblswXSl8fCh0PVtdKTsrK2U8cjspe3ZhciBvPW5bZV07dD91W29dPXRbZV06byYmKHVbb1swXV09b1sxXSl9cmV0dXJuIHV9ZnVuY3Rpb24gTXQobix0KXtyZXR1cm4gMjxhcmd1bWVudHMubGVuZ3RoP2N0KG4sMTcscChhcmd1bWVudHMsMiksbnVsbCx0KTpjdChuLDEsbnVsbCxudWxsLHQpXG59ZnVuY3Rpb24gVnQobix0LGUpe2Z1bmN0aW9uIHIoKXtjJiZ2ZShjKSxpPWM9cD12LChnfHxoIT09dCkmJihzPVVlKCksYT1uLmFwcGx5KGwsbyksY3x8aXx8KG89bD1udWxsKSl9ZnVuY3Rpb24gdSgpe3ZhciBlPXQtKFVlKCktZik7MDxlP2M9X2UodSxlKTooaSYmdmUoaSksZT1wLGk9Yz1wPXYsZSYmKHM9VWUoKSxhPW4uYXBwbHkobCxvKSxjfHxpfHwobz1sPW51bGwpKSl9dmFyIG8saSxhLGYsbCxjLHAscz0wLGg9ZmFsc2UsZz10cnVlO2lmKCFkdChuKSl0aHJvdyBuZXcgaWU7aWYodD1JZSgwLHQpfHwwLHRydWU9PT1lKXZhciB5PXRydWUsZz1mYWxzZTtlbHNlIHd0KGUpJiYoeT1lLmxlYWRpbmcsaD1cIm1heFdhaXRcImluIGUmJihJZSh0LGUubWF4V2FpdCl8fDApLGc9XCJ0cmFpbGluZ1wiaW4gZT9lLnRyYWlsaW5nOmcpO3JldHVybiBmdW5jdGlvbigpe2lmKG89YXJndW1lbnRzLGY9VWUoKSxsPXRoaXMscD1nJiYoY3x8IXkpLGZhbHNlPT09aCl2YXIgZT15JiYhYztlbHNle2l8fHl8fChzPWYpO3ZhciB2PWgtKGYtcyksbT0wPj12O1xubT8oaSYmKGk9dmUoaSkpLHM9ZixhPW4uYXBwbHkobCxvKSk6aXx8KGk9X2Uocix2KSl9cmV0dXJuIG0mJmM/Yz12ZShjKTpjfHx0PT09aHx8KGM9X2UodSx0KSksZSYmKG09dHJ1ZSxhPW4uYXBwbHkobCxvKSksIW18fGN8fGl8fChvPWw9bnVsbCksYX19ZnVuY3Rpb24gVXQobil7cmV0dXJuIG59ZnVuY3Rpb24gR3Qobix0LGUpe3ZhciByPXRydWUsdT10JiZidCh0KTt0JiYoZXx8dS5sZW5ndGgpfHwobnVsbD09ZSYmKGU9dCksbz1RLHQ9bixuPUosdT1idCh0KSksZmFsc2U9PT1lP3I9ZmFsc2U6d3QoZSkmJlwiY2hhaW5cImluIGUmJihyPWUuY2hhaW4pO3ZhciBvPW4saT1kdChvKTtTdCh1LGZ1bmN0aW9uKGUpe3ZhciB1PW5bZV09dFtlXTtpJiYoby5wcm90b3R5cGVbZV09ZnVuY3Rpb24oKXt2YXIgdD10aGlzLl9fY2hhaW5fXyxlPXRoaXMuX193cmFwcGVkX18saT1bZV07aWYoYmUuYXBwbHkoaSxhcmd1bWVudHMpLGk9dS5hcHBseShuLGkpLHJ8fHQpe2lmKGU9PT1pJiZ3dChpKSlyZXR1cm4gdGhpcztcbmk9bmV3IG8oaSksaS5fX2NoYWluX189dH1yZXR1cm4gaX0pfSl9ZnVuY3Rpb24gSHQoKXt9ZnVuY3Rpb24gSnQobil7cmV0dXJuIGZ1bmN0aW9uKHQpe3JldHVybiB0W25dfX1mdW5jdGlvbiBRdCgpe3JldHVybiB0aGlzLl9fd3JhcHBlZF9ffWU9ZT9ZLmRlZmF1bHRzKEcuT2JqZWN0KCksZSxZLnBpY2soRyxBKSk6Rzt2YXIgWHQ9ZS5BcnJheSxZdD1lLkJvb2xlYW4sWnQ9ZS5EYXRlLG5lPWUuRnVuY3Rpb24sdGU9ZS5NYXRoLGVlPWUuTnVtYmVyLHJlPWUuT2JqZWN0LHVlPWUuUmVnRXhwLG9lPWUuU3RyaW5nLGllPWUuVHlwZUVycm9yLGFlPVtdLGZlPXJlLnByb3RvdHlwZSxsZT1lLl8sY2U9ZmUudG9TdHJpbmcscGU9dWUoXCJeXCIrb2UoY2UpLnJlcGxhY2UoL1suKis/XiR7fSgpfFtcXF1cXFxcXS9nLFwiXFxcXCQmXCIpLnJlcGxhY2UoL3RvU3RyaW5nfCBmb3IgW15cXF1dKy9nLFwiLio/XCIpK1wiJFwiKSxzZT10ZS5jZWlsLHZlPWUuY2xlYXJUaW1lb3V0LGhlPXRlLmZsb29yLGdlPW5lLnByb3RvdHlwZS50b1N0cmluZyx5ZT12dCh5ZT1yZS5nZXRQcm90b3R5cGVPZikmJnllLG1lPWZlLmhhc093blByb3BlcnR5LGJlPWFlLnB1c2gsX2U9ZS5zZXRUaW1lb3V0LGRlPWFlLnNwbGljZSx3ZT1hZS51bnNoaWZ0LGplPWZ1bmN0aW9uKCl7dHJ5e3ZhciBuPXt9LHQ9dnQodD1yZS5kZWZpbmVQcm9wZXJ0eSkmJnQsZT10KG4sbixuKSYmdFxufWNhdGNoKHIpe31yZXR1cm4gZX0oKSxrZT12dChrZT1yZS5jcmVhdGUpJiZrZSx4ZT12dCh4ZT1YdC5pc0FycmF5KSYmeGUsQ2U9ZS5pc0Zpbml0ZSxPZT1lLmlzTmFOLE5lPXZ0KE5lPXJlLmtleXMpJiZOZSxJZT10ZS5tYXgsU2U9dGUubWluLEVlPWUucGFyc2VJbnQsUmU9dGUucmFuZG9tLEFlPXt9O0FlWyRdPVh0LEFlW1RdPVl0LEFlW0ZdPVp0LEFlW0JdPW5lLEFlW3FdPXJlLEFlW1ddPWVlLEFlW3pdPXVlLEFlW1BdPW9lLFEucHJvdG90eXBlPUoucHJvdG90eXBlO3ZhciBEZT1KLnN1cHBvcnQ9e307RGUuZnVuY0RlY29tcD0hdnQoZS5hKSYmRS50ZXN0KHMpLERlLmZ1bmNOYW1lcz10eXBlb2YgbmUubmFtZT09XCJzdHJpbmdcIixKLnRlbXBsYXRlU2V0dGluZ3M9e2VzY2FwZTovPCUtKFtcXHNcXFNdKz8pJT4vZyxldmFsdWF0ZTovPCUoW1xcc1xcU10rPyklPi9nLGludGVycG9sYXRlOk4sdmFyaWFibGU6XCJcIixpbXBvcnRzOntfOkp9fSxrZXx8KG50PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gbigpe31yZXR1cm4gZnVuY3Rpb24odCl7aWYod3QodCkpe24ucHJvdG90eXBlPXQ7XG52YXIgcj1uZXcgbjtuLnByb3RvdHlwZT1udWxsfXJldHVybiByfHxlLk9iamVjdCgpfX0oKSk7dmFyICRlPWplP2Z1bmN0aW9uKG4sdCl7TS52YWx1ZT10LGplKG4sXCJfX2JpbmREYXRhX19cIixNKX06SHQsVGU9eGV8fGZ1bmN0aW9uKG4pe3JldHVybiBuJiZ0eXBlb2Ygbj09XCJvYmplY3RcIiYmdHlwZW9mIG4ubGVuZ3RoPT1cIm51bWJlclwiJiZjZS5jYWxsKG4pPT0kfHxmYWxzZX0sRmU9TmU/ZnVuY3Rpb24obil7cmV0dXJuIHd0KG4pP05lKG4pOltdfTpILEJlPXtcIiZcIjpcIiZhbXA7XCIsXCI8XCI6XCImbHQ7XCIsXCI+XCI6XCImZ3Q7XCIsJ1wiJzpcIiZxdW90O1wiLFwiJ1wiOlwiJiMzOTtcIn0sV2U9X3QoQmUpLHFlPXVlKFwiKFwiK0ZlKFdlKS5qb2luKFwifFwiKStcIilcIixcImdcIiksemU9dWUoXCJbXCIrRmUoQmUpLmpvaW4oXCJcIikrXCJdXCIsXCJnXCIpLFBlPXllP2Z1bmN0aW9uKG4pe2lmKCFufHxjZS5jYWxsKG4pIT1xKXJldHVybiBmYWxzZTt2YXIgdD1uLnZhbHVlT2YsZT12dCh0KSYmKGU9eWUodCkpJiZ5ZShlKTtyZXR1cm4gZT9uPT1lfHx5ZShuKT09ZTpodChuKVxufTpodCxLZT1sdChmdW5jdGlvbihuLHQsZSl7bWUuY2FsbChuLGUpP25bZV0rKzpuW2VdPTF9KSxMZT1sdChmdW5jdGlvbihuLHQsZSl7KG1lLmNhbGwobixlKT9uW2VdOm5bZV09W10pLnB1c2godCl9KSxNZT1sdChmdW5jdGlvbihuLHQsZSl7bltlXT10fSksVmU9UnQsVWU9dnQoVWU9WnQubm93KSYmVWV8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBadCkuZ2V0VGltZSgpfSxHZT04PT1FZShkK1wiMDhcIik/RWU6ZnVuY3Rpb24obix0KXtyZXR1cm4gRWUoa3Qobik/bi5yZXBsYWNlKEksXCJcIik6bix0fHwwKX07cmV0dXJuIEouYWZ0ZXI9ZnVuY3Rpb24obix0KXtpZighZHQodCkpdGhyb3cgbmV3IGllO3JldHVybiBmdW5jdGlvbigpe3JldHVybiAxPi0tbj90LmFwcGx5KHRoaXMsYXJndW1lbnRzKTp2b2lkIDB9fSxKLmFzc2lnbj1VLEouYXQ9ZnVuY3Rpb24obil7Zm9yKHZhciB0PWFyZ3VtZW50cyxlPS0xLHI9dXQodCx0cnVlLGZhbHNlLDEpLHQ9dFsyXSYmdFsyXVt0WzFdXT09PW4/MTpyLmxlbmd0aCx1PVh0KHQpOysrZTx0Oyl1W2VdPW5bcltlXV07XG5yZXR1cm4gdX0sSi5iaW5kPU10LEouYmluZEFsbD1mdW5jdGlvbihuKXtmb3IodmFyIHQ9MTxhcmd1bWVudHMubGVuZ3RoP3V0KGFyZ3VtZW50cyx0cnVlLGZhbHNlLDEpOmJ0KG4pLGU9LTEscj10Lmxlbmd0aDsrK2U8cjspe3ZhciB1PXRbZV07blt1XT1jdChuW3VdLDEsbnVsbCxudWxsLG4pfXJldHVybiBufSxKLmJpbmRLZXk9ZnVuY3Rpb24obix0KXtyZXR1cm4gMjxhcmd1bWVudHMubGVuZ3RoP2N0KHQsMTkscChhcmd1bWVudHMsMiksbnVsbCxuKTpjdCh0LDMsbnVsbCxudWxsLG4pfSxKLmNoYWluPWZ1bmN0aW9uKG4pe3JldHVybiBuPW5ldyBRKG4pLG4uX19jaGFpbl9fPXRydWUsbn0sSi5jb21wYWN0PWZ1bmN0aW9uKG4pe2Zvcih2YXIgdD0tMSxlPW4/bi5sZW5ndGg6MCxyPVtdOysrdDxlOyl7dmFyIHU9blt0XTt1JiZyLnB1c2godSl9cmV0dXJuIHJ9LEouY29tcG9zZT1mdW5jdGlvbigpe2Zvcih2YXIgbj1hcmd1bWVudHMsdD1uLmxlbmd0aDt0LS07KWlmKCFkdChuW3RdKSl0aHJvdyBuZXcgaWU7XG5yZXR1cm4gZnVuY3Rpb24oKXtmb3IodmFyIHQ9YXJndW1lbnRzLGU9bi5sZW5ndGg7ZS0tOyl0PVtuW2VdLmFwcGx5KHRoaXMsdCldO3JldHVybiB0WzBdfX0sSi5jb25zdGFudD1mdW5jdGlvbihuKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gbn19LEouY291bnRCeT1LZSxKLmNyZWF0ZT1mdW5jdGlvbihuLHQpe3ZhciBlPW50KG4pO3JldHVybiB0P1UoZSx0KTplfSxKLmNyZWF0ZUNhbGxiYWNrPWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj10eXBlb2YgbjtpZihudWxsPT1ufHxcImZ1bmN0aW9uXCI9PXIpcmV0dXJuIHR0KG4sdCxlKTtpZihcIm9iamVjdFwiIT1yKXJldHVybiBKdChuKTt2YXIgdT1GZShuKSxvPXVbMF0saT1uW29dO3JldHVybiAxIT11Lmxlbmd0aHx8aSE9PWl8fHd0KGkpP2Z1bmN0aW9uKHQpe2Zvcih2YXIgZT11Lmxlbmd0aCxyPWZhbHNlO2UtLSYmKHI9b3QodFt1W2VdXSxuW3VbZV1dLG51bGwsdHJ1ZSkpOyk7cmV0dXJuIHJ9OmZ1bmN0aW9uKG4pe3JldHVybiBuPW5bb10saT09PW4mJigwIT09aXx8MS9pPT0xL24pXG59fSxKLmN1cnJ5PWZ1bmN0aW9uKG4sdCl7cmV0dXJuIHQ9dHlwZW9mIHQ9PVwibnVtYmVyXCI/dDordHx8bi5sZW5ndGgsY3Qobiw0LG51bGwsbnVsbCxudWxsLHQpfSxKLmRlYm91bmNlPVZ0LEouZGVmYXVsdHM9XyxKLmRlZmVyPWZ1bmN0aW9uKG4pe2lmKCFkdChuKSl0aHJvdyBuZXcgaWU7dmFyIHQ9cChhcmd1bWVudHMsMSk7cmV0dXJuIF9lKGZ1bmN0aW9uKCl7bi5hcHBseSh2LHQpfSwxKX0sSi5kZWxheT1mdW5jdGlvbihuLHQpe2lmKCFkdChuKSl0aHJvdyBuZXcgaWU7dmFyIGU9cChhcmd1bWVudHMsMik7cmV0dXJuIF9lKGZ1bmN0aW9uKCl7bi5hcHBseSh2LGUpfSx0KX0sSi5kaWZmZXJlbmNlPWZ1bmN0aW9uKG4pe3JldHVybiBydChuLHV0KGFyZ3VtZW50cyx0cnVlLHRydWUsMSkpfSxKLmZpbHRlcj1OdCxKLmZsYXR0ZW49ZnVuY3Rpb24obix0LGUscil7cmV0dXJuIHR5cGVvZiB0IT1cImJvb2xlYW5cIiYmbnVsbCE9dCYmKHI9ZSxlPXR5cGVvZiB0IT1cImZ1bmN0aW9uXCImJnImJnJbdF09PT1uP251bGw6dCx0PWZhbHNlKSxudWxsIT1lJiYobj1SdChuLGUscikpLHV0KG4sdClcbn0sSi5mb3JFYWNoPVN0LEouZm9yRWFjaFJpZ2h0PUV0LEouZm9ySW49ZyxKLmZvckluUmlnaHQ9ZnVuY3Rpb24obix0LGUpe3ZhciByPVtdO2cobixmdW5jdGlvbihuLHQpe3IucHVzaCh0LG4pfSk7dmFyIHU9ci5sZW5ndGg7Zm9yKHQ9dHQodCxlLDMpO3UtLSYmZmFsc2UhPT10KHJbdS0tXSxyW3VdLG4pOyk7cmV0dXJuIG59LEouZm9yT3duPWgsSi5mb3JPd25SaWdodD1tdCxKLmZ1bmN0aW9ucz1idCxKLmdyb3VwQnk9TGUsSi5pbmRleEJ5PU1lLEouaW5pdGlhbD1mdW5jdGlvbihuLHQsZSl7dmFyIHI9MCx1PW4/bi5sZW5ndGg6MDtpZih0eXBlb2YgdCE9XCJudW1iZXJcIiYmbnVsbCE9dCl7dmFyIG89dTtmb3IodD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKTtvLS0mJnQobltvXSxvLG4pOylyKyt9ZWxzZSByPW51bGw9PXR8fGU/MTp0fHxyO3JldHVybiBwKG4sMCxTZShJZSgwLHUtciksdSkpfSxKLmludGVyc2VjdGlvbj1mdW5jdGlvbigpe2Zvcih2YXIgZT1bXSxyPS0xLHU9YXJndW1lbnRzLmxlbmd0aCxpPWEoKSxmPXN0KCkscD1mPT09bixzPWEoKTsrK3I8dTspe3ZhciB2PWFyZ3VtZW50c1tyXTtcbihUZSh2KXx8eXQodikpJiYoZS5wdXNoKHYpLGkucHVzaChwJiZ2Lmxlbmd0aD49YiYmbyhyP2Vbcl06cykpKX12YXIgcD1lWzBdLGg9LTEsZz1wP3AubGVuZ3RoOjAseT1bXTtuOmZvcig7KytoPGc7KXt2YXIgbT1pWzBdLHY9cFtoXTtpZigwPihtP3QobSx2KTpmKHMsdikpKXtmb3Iocj11LChtfHxzKS5wdXNoKHYpOy0tcjspaWYobT1pW3JdLDA+KG0/dChtLHYpOmYoZVtyXSx2KSkpY29udGludWUgbjt5LnB1c2godil9fWZvcig7dS0tOykobT1pW3VdKSYmYyhtKTtyZXR1cm4gbChpKSxsKHMpLHl9LEouaW52ZXJ0PV90LEouaW52b2tlPWZ1bmN0aW9uKG4sdCl7dmFyIGU9cChhcmd1bWVudHMsMikscj0tMSx1PXR5cGVvZiB0PT1cImZ1bmN0aW9uXCIsbz1uP24ubGVuZ3RoOjAsaT1YdCh0eXBlb2Ygbz09XCJudW1iZXJcIj9vOjApO3JldHVybiBTdChuLGZ1bmN0aW9uKG4pe2lbKytyXT0odT90Om5bdF0pLmFwcGx5KG4sZSl9KSxpfSxKLmtleXM9RmUsSi5tYXA9UnQsSi5tYXBWYWx1ZXM9ZnVuY3Rpb24obix0LGUpe3ZhciByPXt9O1xucmV0dXJuIHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksaChuLGZ1bmN0aW9uKG4sZSx1KXtyW2VdPXQobixlLHUpfSkscn0sSi5tYXg9QXQsSi5tZW1vaXplPWZ1bmN0aW9uKG4sdCl7ZnVuY3Rpb24gZSgpe3ZhciByPWUuY2FjaGUsdT10P3QuYXBwbHkodGhpcyxhcmd1bWVudHMpOm0rYXJndW1lbnRzWzBdO3JldHVybiBtZS5jYWxsKHIsdSk/clt1XTpyW3VdPW4uYXBwbHkodGhpcyxhcmd1bWVudHMpfWlmKCFkdChuKSl0aHJvdyBuZXcgaWU7cmV0dXJuIGUuY2FjaGU9e30sZX0sSi5tZXJnZT1mdW5jdGlvbihuKXt2YXIgdD1hcmd1bWVudHMsZT0yO2lmKCF3dChuKSlyZXR1cm4gbjtpZihcIm51bWJlclwiIT10eXBlb2YgdFsyXSYmKGU9dC5sZW5ndGgpLDM8ZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdFtlLTJdKXZhciByPXR0KHRbLS1lLTFdLHRbZS0tXSwyKTtlbHNlIDI8ZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgdFtlLTFdJiYocj10Wy0tZV0pO2Zvcih2YXIgdD1wKGFyZ3VtZW50cywxLGUpLHU9LTEsbz1hKCksaT1hKCk7Kyt1PGU7KWl0KG4sdFt1XSxyLG8saSk7XG5yZXR1cm4gbChvKSxsKGkpLG59LEoubWluPWZ1bmN0aW9uKG4sdCxlKXt2YXIgdT0xLzAsbz11O2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCImJmUmJmVbdF09PT1uJiYodD1udWxsKSxudWxsPT10JiZUZShuKSl7ZT0tMTtmb3IodmFyIGk9bi5sZW5ndGg7KytlPGk7KXt2YXIgYT1uW2VdO2E8byYmKG89YSl9fWVsc2UgdD1udWxsPT10JiZrdChuKT9yOkouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLFN0KG4sZnVuY3Rpb24obixlLHIpe2U9dChuLGUsciksZTx1JiYodT1lLG89bil9KTtyZXR1cm4gb30sSi5vbWl0PWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj17fTtpZih0eXBlb2YgdCE9XCJmdW5jdGlvblwiKXt2YXIgdT1bXTtnKG4sZnVuY3Rpb24obix0KXt1LnB1c2godCl9KTtmb3IodmFyIHU9cnQodSx1dChhcmd1bWVudHMsdHJ1ZSxmYWxzZSwxKSksbz0tMSxpPXUubGVuZ3RoOysrbzxpOyl7dmFyIGE9dVtvXTtyW2FdPW5bYV19fWVsc2UgdD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKSxnKG4sZnVuY3Rpb24obixlLHUpe3QobixlLHUpfHwocltlXT1uKVxufSk7cmV0dXJuIHJ9LEoub25jZT1mdW5jdGlvbihuKXt2YXIgdCxlO2lmKCFkdChuKSl0aHJvdyBuZXcgaWU7cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHQ/ZToodD10cnVlLGU9bi5hcHBseSh0aGlzLGFyZ3VtZW50cyksbj1udWxsLGUpfX0sSi5wYWlycz1mdW5jdGlvbihuKXtmb3IodmFyIHQ9LTEsZT1GZShuKSxyPWUubGVuZ3RoLHU9WHQocik7Kyt0PHI7KXt2YXIgbz1lW3RdO3VbdF09W28sbltvXV19cmV0dXJuIHV9LEoucGFydGlhbD1mdW5jdGlvbihuKXtyZXR1cm4gY3QobiwxNixwKGFyZ3VtZW50cywxKSl9LEoucGFydGlhbFJpZ2h0PWZ1bmN0aW9uKG4pe3JldHVybiBjdChuLDMyLG51bGwscChhcmd1bWVudHMsMSkpfSxKLnBpY2s9ZnVuY3Rpb24obix0LGUpe3ZhciByPXt9O2lmKHR5cGVvZiB0IT1cImZ1bmN0aW9uXCIpZm9yKHZhciB1PS0xLG89dXQoYXJndW1lbnRzLHRydWUsZmFsc2UsMSksaT13dChuKT9vLmxlbmd0aDowOysrdTxpOyl7dmFyIGE9b1t1XTthIGluIG4mJihyW2FdPW5bYV0pXG59ZWxzZSB0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLGcobixmdW5jdGlvbihuLGUsdSl7dChuLGUsdSkmJihyW2VdPW4pfSk7cmV0dXJuIHJ9LEoucGx1Y2s9VmUsSi5wcm9wZXJ0eT1KdCxKLnB1bGw9ZnVuY3Rpb24obil7Zm9yKHZhciB0PWFyZ3VtZW50cyxlPTAscj10Lmxlbmd0aCx1PW4/bi5sZW5ndGg6MDsrK2U8cjspZm9yKHZhciBvPS0xLGk9dFtlXTsrK288dTspbltvXT09PWkmJihkZS5jYWxsKG4sby0tLDEpLHUtLSk7cmV0dXJuIG59LEoucmFuZ2U9ZnVuY3Rpb24obix0LGUpe249K258fDAsZT10eXBlb2YgZT09XCJudW1iZXJcIj9lOitlfHwxLG51bGw9PXQmJih0PW4sbj0wKTt2YXIgcj0tMTt0PUllKDAsc2UoKHQtbikvKGV8fDEpKSk7Zm9yKHZhciB1PVh0KHQpOysrcjx0Oyl1W3JdPW4sbis9ZTtyZXR1cm4gdX0sSi5yZWplY3Q9ZnVuY3Rpb24obix0LGUpe3JldHVybiB0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpLE50KG4sZnVuY3Rpb24obixlLHIpe3JldHVybiF0KG4sZSxyKVxufSl9LEoucmVtb3ZlPWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj0tMSx1PW4/bi5sZW5ndGg6MCxvPVtdO2Zvcih0PUouY3JlYXRlQ2FsbGJhY2sodCxlLDMpOysrcjx1OyllPW5bcl0sdChlLHIsbikmJihvLnB1c2goZSksZGUuY2FsbChuLHItLSwxKSx1LS0pO3JldHVybiBvfSxKLnJlc3Q9cXQsSi5zaHVmZmxlPVR0LEouc29ydEJ5PWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj0tMSxvPVRlKHQpLGk9bj9uLmxlbmd0aDowLHA9WHQodHlwZW9mIGk9PVwibnVtYmVyXCI/aTowKTtmb3Iob3x8KHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMykpLFN0KG4sZnVuY3Rpb24obixlLHUpe3ZhciBpPXBbKytyXT1mKCk7bz9pLm09UnQodCxmdW5jdGlvbih0KXtyZXR1cm4gblt0XX0pOihpLm09YSgpKVswXT10KG4sZSx1KSxpLm49cixpLm89bn0pLGk9cC5sZW5ndGgscC5zb3J0KHUpO2ktLTspbj1wW2ldLHBbaV09bi5vLG98fGwobi5tKSxjKG4pO3JldHVybiBwfSxKLnRhcD1mdW5jdGlvbihuLHQpe3JldHVybiB0KG4pLG5cbn0sSi50aHJvdHRsZT1mdW5jdGlvbihuLHQsZSl7dmFyIHI9dHJ1ZSx1PXRydWU7aWYoIWR0KG4pKXRocm93IG5ldyBpZTtyZXR1cm4gZmFsc2U9PT1lP3I9ZmFsc2U6d3QoZSkmJihyPVwibGVhZGluZ1wiaW4gZT9lLmxlYWRpbmc6cix1PVwidHJhaWxpbmdcImluIGU/ZS50cmFpbGluZzp1KSxMLmxlYWRpbmc9cixMLm1heFdhaXQ9dCxMLnRyYWlsaW5nPXUsVnQobix0LEwpfSxKLnRpbWVzPWZ1bmN0aW9uKG4sdCxlKXtuPS0xPChuPStuKT9uOjA7dmFyIHI9LTEsdT1YdChuKTtmb3IodD10dCh0LGUsMSk7KytyPG47KXVbcl09dChyKTtyZXR1cm4gdX0sSi50b0FycmF5PWZ1bmN0aW9uKG4pe3JldHVybiBuJiZ0eXBlb2Ygbi5sZW5ndGg9PVwibnVtYmVyXCI/cChuKTp4dChuKX0sSi50cmFuc2Zvcm09ZnVuY3Rpb24obix0LGUscil7dmFyIHU9VGUobik7aWYobnVsbD09ZSlpZih1KWU9W107ZWxzZXt2YXIgbz1uJiZuLmNvbnN0cnVjdG9yO2U9bnQobyYmby5wcm90b3R5cGUpfXJldHVybiB0JiYodD1KLmNyZWF0ZUNhbGxiYWNrKHQsciw0KSwodT9TdDpoKShuLGZ1bmN0aW9uKG4scix1KXtyZXR1cm4gdChlLG4scix1KVxufSkpLGV9LEoudW5pb249ZnVuY3Rpb24oKXtyZXR1cm4gZnQodXQoYXJndW1lbnRzLHRydWUsdHJ1ZSkpfSxKLnVuaXE9UHQsSi52YWx1ZXM9eHQsSi53aGVyZT1OdCxKLndpdGhvdXQ9ZnVuY3Rpb24obil7cmV0dXJuIHJ0KG4scChhcmd1bWVudHMsMSkpfSxKLndyYXA9ZnVuY3Rpb24obix0KXtyZXR1cm4gY3QodCwxNixbbl0pfSxKLnhvcj1mdW5jdGlvbigpe2Zvcih2YXIgbj0tMSx0PWFyZ3VtZW50cy5sZW5ndGg7KytuPHQ7KXt2YXIgZT1hcmd1bWVudHNbbl07aWYoVGUoZSl8fHl0KGUpKXZhciByPXI/ZnQocnQocixlKS5jb25jYXQocnQoZSxyKSkpOmV9cmV0dXJuIHJ8fFtdfSxKLnppcD1LdCxKLnppcE9iamVjdD1MdCxKLmNvbGxlY3Q9UnQsSi5kcm9wPXF0LEouZWFjaD1TdCxKLmVhY2hSaWdodD1FdCxKLmV4dGVuZD1VLEoubWV0aG9kcz1idCxKLm9iamVjdD1MdCxKLnNlbGVjdD1OdCxKLnRhaWw9cXQsSi51bmlxdWU9UHQsSi51bnppcD1LdCxHdChKKSxKLmNsb25lPWZ1bmN0aW9uKG4sdCxlLHIpe3JldHVybiB0eXBlb2YgdCE9XCJib29sZWFuXCImJm51bGwhPXQmJihyPWUsZT10LHQ9ZmFsc2UpLFoobix0LHR5cGVvZiBlPT1cImZ1bmN0aW9uXCImJnR0KGUsciwxKSlcbn0sSi5jbG9uZURlZXA9ZnVuY3Rpb24obix0LGUpe3JldHVybiBaKG4sdHJ1ZSx0eXBlb2YgdD09XCJmdW5jdGlvblwiJiZ0dCh0LGUsMSkpfSxKLmNvbnRhaW5zPUN0LEouZXNjYXBlPWZ1bmN0aW9uKG4pe3JldHVybiBudWxsPT1uP1wiXCI6b2UobikucmVwbGFjZSh6ZSxwdCl9LEouZXZlcnk9T3QsSi5maW5kPUl0LEouZmluZEluZGV4PWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj0tMSx1PW4/bi5sZW5ndGg6MDtmb3IodD1KLmNyZWF0ZUNhbGxiYWNrKHQsZSwzKTsrK3I8dTspaWYodChuW3JdLHIsbikpcmV0dXJuIHI7cmV0dXJuLTF9LEouZmluZEtleT1mdW5jdGlvbihuLHQsZSl7dmFyIHI7cmV0dXJuIHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksaChuLGZ1bmN0aW9uKG4sZSx1KXtyZXR1cm4gdChuLGUsdSk/KHI9ZSxmYWxzZSk6dm9pZCAwfSkscn0sSi5maW5kTGFzdD1mdW5jdGlvbihuLHQsZSl7dmFyIHI7cmV0dXJuIHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksRXQobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHQobixlLHUpPyhyPW4sZmFsc2UpOnZvaWQgMFxufSkscn0sSi5maW5kTGFzdEluZGV4PWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj1uP24ubGVuZ3RoOjA7Zm9yKHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyk7ci0tOylpZih0KG5bcl0scixuKSlyZXR1cm4gcjtyZXR1cm4tMX0sSi5maW5kTGFzdEtleT1mdW5jdGlvbihuLHQsZSl7dmFyIHI7cmV0dXJuIHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyksbXQobixmdW5jdGlvbihuLGUsdSl7cmV0dXJuIHQobixlLHUpPyhyPWUsZmFsc2UpOnZvaWQgMH0pLHJ9LEouaGFzPWZ1bmN0aW9uKG4sdCl7cmV0dXJuIG4/bWUuY2FsbChuLHQpOmZhbHNlfSxKLmlkZW50aXR5PVV0LEouaW5kZXhPZj1XdCxKLmlzQXJndW1lbnRzPXl0LEouaXNBcnJheT1UZSxKLmlzQm9vbGVhbj1mdW5jdGlvbihuKXtyZXR1cm4gdHJ1ZT09PW58fGZhbHNlPT09bnx8biYmdHlwZW9mIG49PVwib2JqZWN0XCImJmNlLmNhbGwobik9PVR8fGZhbHNlfSxKLmlzRGF0ZT1mdW5jdGlvbihuKXtyZXR1cm4gbiYmdHlwZW9mIG49PVwib2JqZWN0XCImJmNlLmNhbGwobik9PUZ8fGZhbHNlXG59LEouaXNFbGVtZW50PWZ1bmN0aW9uKG4pe3JldHVybiBuJiYxPT09bi5ub2RlVHlwZXx8ZmFsc2V9LEouaXNFbXB0eT1mdW5jdGlvbihuKXt2YXIgdD10cnVlO2lmKCFuKXJldHVybiB0O3ZhciBlPWNlLmNhbGwobikscj1uLmxlbmd0aDtyZXR1cm4gZT09JHx8ZT09UHx8ZT09RHx8ZT09cSYmdHlwZW9mIHI9PVwibnVtYmVyXCImJmR0KG4uc3BsaWNlKT8hcjooaChuLGZ1bmN0aW9uKCl7cmV0dXJuIHQ9ZmFsc2V9KSx0KX0sSi5pc0VxdWFsPWZ1bmN0aW9uKG4sdCxlLHIpe3JldHVybiBvdChuLHQsdHlwZW9mIGU9PVwiZnVuY3Rpb25cIiYmdHQoZSxyLDIpKX0sSi5pc0Zpbml0ZT1mdW5jdGlvbihuKXtyZXR1cm4gQ2UobikmJiFPZShwYXJzZUZsb2F0KG4pKX0sSi5pc0Z1bmN0aW9uPWR0LEouaXNOYU49ZnVuY3Rpb24obil7cmV0dXJuIGp0KG4pJiZuIT0rbn0sSi5pc051bGw9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PT1ufSxKLmlzTnVtYmVyPWp0LEouaXNPYmplY3Q9d3QsSi5pc1BsYWluT2JqZWN0PVBlLEouaXNSZWdFeHA9ZnVuY3Rpb24obil7cmV0dXJuIG4mJnR5cGVvZiBuPT1cIm9iamVjdFwiJiZjZS5jYWxsKG4pPT16fHxmYWxzZVxufSxKLmlzU3RyaW5nPWt0LEouaXNVbmRlZmluZWQ9ZnVuY3Rpb24obil7cmV0dXJuIHR5cGVvZiBuPT1cInVuZGVmaW5lZFwifSxKLmxhc3RJbmRleE9mPWZ1bmN0aW9uKG4sdCxlKXt2YXIgcj1uP24ubGVuZ3RoOjA7Zm9yKHR5cGVvZiBlPT1cIm51bWJlclwiJiYocj0oMD5lP0llKDAscitlKTpTZShlLHItMSkpKzEpO3ItLTspaWYobltyXT09PXQpcmV0dXJuIHI7cmV0dXJuLTF9LEoubWl4aW49R3QsSi5ub0NvbmZsaWN0PWZ1bmN0aW9uKCl7cmV0dXJuIGUuXz1sZSx0aGlzfSxKLm5vb3A9SHQsSi5ub3c9VWUsSi5wYXJzZUludD1HZSxKLnJhbmRvbT1mdW5jdGlvbihuLHQsZSl7dmFyIHI9bnVsbD09bix1PW51bGw9PXQ7cmV0dXJuIG51bGw9PWUmJih0eXBlb2Ygbj09XCJib29sZWFuXCImJnU/KGU9bixuPTEpOnV8fHR5cGVvZiB0IT1cImJvb2xlYW5cInx8KGU9dCx1PXRydWUpKSxyJiZ1JiYodD0xKSxuPStufHwwLHU/KHQ9bixuPTApOnQ9K3R8fDAsZXx8biUxfHx0JTE/KGU9UmUoKSxTZShuK2UqKHQtbitwYXJzZUZsb2F0KFwiMWUtXCIrKChlK1wiXCIpLmxlbmd0aC0xKSkpLHQpKTphdChuLHQpXG59LEoucmVkdWNlPUR0LEoucmVkdWNlUmlnaHQ9JHQsSi5yZXN1bHQ9ZnVuY3Rpb24obix0KXtpZihuKXt2YXIgZT1uW3RdO3JldHVybiBkdChlKT9uW3RdKCk6ZX19LEoucnVuSW5Db250ZXh0PXMsSi5zaXplPWZ1bmN0aW9uKG4pe3ZhciB0PW4/bi5sZW5ndGg6MDtyZXR1cm4gdHlwZW9mIHQ9PVwibnVtYmVyXCI/dDpGZShuKS5sZW5ndGh9LEouc29tZT1GdCxKLnNvcnRlZEluZGV4PXp0LEoudGVtcGxhdGU9ZnVuY3Rpb24obix0LGUpe3ZhciByPUoudGVtcGxhdGVTZXR0aW5ncztuPW9lKG58fFwiXCIpLGU9Xyh7fSxlLHIpO3ZhciB1LG89Xyh7fSxlLmltcG9ydHMsci5pbXBvcnRzKSxyPUZlKG8pLG89eHQobyksYT0wLGY9ZS5pbnRlcnBvbGF0ZXx8UyxsPVwiX19wKz0nXCIsZj11ZSgoZS5lc2NhcGV8fFMpLnNvdXJjZStcInxcIitmLnNvdXJjZStcInxcIisoZj09PU4/eDpTKS5zb3VyY2UrXCJ8XCIrKGUuZXZhbHVhdGV8fFMpLnNvdXJjZStcInwkXCIsXCJnXCIpO24ucmVwbGFjZShmLGZ1bmN0aW9uKHQsZSxyLG8sZixjKXtyZXR1cm4gcnx8KHI9byksbCs9bi5zbGljZShhLGMpLnJlcGxhY2UoUixpKSxlJiYobCs9XCInK19fZShcIitlK1wiKSsnXCIpLGYmJih1PXRydWUsbCs9XCInO1wiK2YrXCI7XFxuX19wKz0nXCIpLHImJihsKz1cIicrKChfX3Q9KFwiK3IrXCIpKT09bnVsbD8nJzpfX3QpKydcIiksYT1jK3QubGVuZ3RoLHRcbn0pLGwrPVwiJztcIixmPWU9ZS52YXJpYWJsZSxmfHwoZT1cIm9ialwiLGw9XCJ3aXRoKFwiK2UrXCIpe1wiK2wrXCJ9XCIpLGw9KHU/bC5yZXBsYWNlKHcsXCJcIik6bCkucmVwbGFjZShqLFwiJDFcIikucmVwbGFjZShrLFwiJDE7XCIpLGw9XCJmdW5jdGlvbihcIitlK1wiKXtcIisoZj9cIlwiOmUrXCJ8fChcIitlK1wiPXt9KTtcIikrXCJ2YXIgX190LF9fcD0nJyxfX2U9Xy5lc2NhcGVcIisodT9cIixfX2o9QXJyYXkucHJvdG90eXBlLmpvaW47ZnVuY3Rpb24gcHJpbnQoKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyl9XCI6XCI7XCIpK2wrXCJyZXR1cm4gX19wfVwiO3RyeXt2YXIgYz1uZShyLFwicmV0dXJuIFwiK2wpLmFwcGx5KHYsbyl9Y2F0Y2gocCl7dGhyb3cgcC5zb3VyY2U9bCxwfXJldHVybiB0P2ModCk6KGMuc291cmNlPWwsYyl9LEoudW5lc2NhcGU9ZnVuY3Rpb24obil7cmV0dXJuIG51bGw9PW4/XCJcIjpvZShuKS5yZXBsYWNlKHFlLGd0KX0sSi51bmlxdWVJZD1mdW5jdGlvbihuKXt2YXIgdD0rK3k7cmV0dXJuIG9lKG51bGw9PW4/XCJcIjpuKSt0XG59LEouYWxsPU90LEouYW55PUZ0LEouZGV0ZWN0PUl0LEouZmluZFdoZXJlPUl0LEouZm9sZGw9RHQsSi5mb2xkcj0kdCxKLmluY2x1ZGU9Q3QsSi5pbmplY3Q9RHQsR3QoZnVuY3Rpb24oKXt2YXIgbj17fTtyZXR1cm4gaChKLGZ1bmN0aW9uKHQsZSl7Si5wcm90b3R5cGVbZV18fChuW2VdPXQpfSksbn0oKSxmYWxzZSksSi5maXJzdD1CdCxKLmxhc3Q9ZnVuY3Rpb24obix0LGUpe3ZhciByPTAsdT1uP24ubGVuZ3RoOjA7aWYodHlwZW9mIHQhPVwibnVtYmVyXCImJm51bGwhPXQpe3ZhciBvPXU7Zm9yKHQ9Si5jcmVhdGVDYWxsYmFjayh0LGUsMyk7by0tJiZ0KG5bb10sbyxuKTspcisrfWVsc2UgaWYocj10LG51bGw9PXJ8fGUpcmV0dXJuIG4/blt1LTFdOnY7cmV0dXJuIHAobixJZSgwLHUtcikpfSxKLnNhbXBsZT1mdW5jdGlvbihuLHQsZSl7cmV0dXJuIG4mJnR5cGVvZiBuLmxlbmd0aCE9XCJudW1iZXJcIiYmKG49eHQobikpLG51bGw9PXR8fGU/bj9uW2F0KDAsbi5sZW5ndGgtMSldOnY6KG49VHQobiksbi5sZW5ndGg9U2UoSWUoMCx0KSxuLmxlbmd0aCksbilcbn0sSi50YWtlPUJ0LEouaGVhZD1CdCxoKEosZnVuY3Rpb24obix0KXt2YXIgZT1cInNhbXBsZVwiIT09dDtKLnByb3RvdHlwZVt0XXx8KEoucHJvdG90eXBlW3RdPWZ1bmN0aW9uKHQscil7dmFyIHU9dGhpcy5fX2NoYWluX18sbz1uKHRoaXMuX193cmFwcGVkX18sdCxyKTtyZXR1cm4gdXx8bnVsbCE9dCYmKCFyfHxlJiZ0eXBlb2YgdD09XCJmdW5jdGlvblwiKT9uZXcgUShvLHUpOm99KX0pLEouVkVSU0lPTj1cIjIuNC4xXCIsSi5wcm90b3R5cGUuY2hhaW49ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fX2NoYWluX189dHJ1ZSx0aGlzfSxKLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBvZSh0aGlzLl9fd3JhcHBlZF9fKX0sSi5wcm90b3R5cGUudmFsdWU9UXQsSi5wcm90b3R5cGUudmFsdWVPZj1RdCxTdChbXCJqb2luXCIsXCJwb3BcIixcInNoaWZ0XCJdLGZ1bmN0aW9uKG4pe3ZhciB0PWFlW25dO0oucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7dmFyIG49dGhpcy5fX2NoYWluX18sZT10LmFwcGx5KHRoaXMuX193cmFwcGVkX18sYXJndW1lbnRzKTtcbnJldHVybiBuP25ldyBRKGUsbik6ZX19KSxTdChbXCJwdXNoXCIsXCJyZXZlcnNlXCIsXCJzb3J0XCIsXCJ1bnNoaWZ0XCJdLGZ1bmN0aW9uKG4pe3ZhciB0PWFlW25dO0oucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIHQuYXBwbHkodGhpcy5fX3dyYXBwZWRfXyxhcmd1bWVudHMpLHRoaXN9fSksU3QoW1wiY29uY2F0XCIsXCJzbGljZVwiLFwic3BsaWNlXCJdLGZ1bmN0aW9uKG4pe3ZhciB0PWFlW25dO0oucHJvdG90eXBlW25dPWZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBRKHQuYXBwbHkodGhpcy5fX3dyYXBwZWRfXyxhcmd1bWVudHMpLHRoaXMuX19jaGFpbl9fKX19KSxKfXZhciB2LGg9W10sZz1bXSx5PTAsbT0rbmV3IERhdGUrXCJcIixiPTc1LF89NDAsZD1cIiBcXHRcXHgwQlxcZlxceGEwXFx1ZmVmZlxcblxcclxcdTIwMjhcXHUyMDI5XFx1MTY4MFxcdTE4MGVcXHUyMDAwXFx1MjAwMVxcdTIwMDJcXHUyMDAzXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwYVxcdTIwMmZcXHUyMDVmXFx1MzAwMFwiLHc9L1xcYl9fcFxcKz0nJzsvZyxqPS9cXGIoX19wXFwrPSknJ1xcKy9nLGs9LyhfX2VcXCguKj9cXCl8XFxiX190XFwpKVxcKycnOy9nLHg9L1xcJFxceyhbXlxcXFx9XSooPzpcXFxcLlteXFxcXH1dKikqKVxcfS9nLEM9L1xcdyokLyxPPS9eXFxzKmZ1bmN0aW9uWyBcXG5cXHJcXHRdK1xcdy8sTj0vPCU9KFtcXHNcXFNdKz8pJT4vZyxJPVJlZ0V4cChcIl5bXCIrZCtcIl0qMCsoPz0uJClcIiksUz0vKCReKS8sRT0vXFxidGhpc1xcYi8sUj0vWydcXG5cXHJcXHRcXHUyMDI4XFx1MjAyOVxcXFxdL2csQT1cIkFycmF5IEJvb2xlYW4gRGF0ZSBGdW5jdGlvbiBNYXRoIE51bWJlciBPYmplY3QgUmVnRXhwIFN0cmluZyBfIGF0dGFjaEV2ZW50IGNsZWFyVGltZW91dCBpc0Zpbml0ZSBpc05hTiBwYXJzZUludCBzZXRUaW1lb3V0XCIuc3BsaXQoXCIgXCIpLEQ9XCJbb2JqZWN0IEFyZ3VtZW50c11cIiwkPVwiW29iamVjdCBBcnJheV1cIixUPVwiW29iamVjdCBCb29sZWFuXVwiLEY9XCJbb2JqZWN0IERhdGVdXCIsQj1cIltvYmplY3QgRnVuY3Rpb25dXCIsVz1cIltvYmplY3QgTnVtYmVyXVwiLHE9XCJbb2JqZWN0IE9iamVjdF1cIix6PVwiW29iamVjdCBSZWdFeHBdXCIsUD1cIltvYmplY3QgU3RyaW5nXVwiLEs9e307XG5LW0JdPWZhbHNlLEtbRF09S1skXT1LW1RdPUtbRl09S1tXXT1LW3FdPUtbel09S1tQXT10cnVlO3ZhciBMPXtsZWFkaW5nOmZhbHNlLG1heFdhaXQ6MCx0cmFpbGluZzpmYWxzZX0sTT17Y29uZmlndXJhYmxlOmZhbHNlLGVudW1lcmFibGU6ZmFsc2UsdmFsdWU6bnVsbCx3cml0YWJsZTpmYWxzZX0sVj17XCJib29sZWFuXCI6ZmFsc2UsXCJmdW5jdGlvblwiOnRydWUsb2JqZWN0OnRydWUsbnVtYmVyOmZhbHNlLHN0cmluZzpmYWxzZSx1bmRlZmluZWQ6ZmFsc2V9LFU9e1wiXFxcXFwiOlwiXFxcXFwiLFwiJ1wiOlwiJ1wiLFwiXFxuXCI6XCJuXCIsXCJcXHJcIjpcInJcIixcIlxcdFwiOlwidFwiLFwiXFx1MjAyOFwiOlwidTIwMjhcIixcIlxcdTIwMjlcIjpcInUyMDI5XCJ9LEc9Vlt0eXBlb2Ygd2luZG93XSYmd2luZG93fHx0aGlzLEg9Vlt0eXBlb2YgZXhwb3J0c10mJmV4cG9ydHMmJiFleHBvcnRzLm5vZGVUeXBlJiZleHBvcnRzLEo9Vlt0eXBlb2YgbW9kdWxlXSYmbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlJiZtb2R1bGUsUT1KJiZKLmV4cG9ydHM9PT1IJiZILFg9Vlt0eXBlb2YgZ2xvYmFsXSYmZ2xvYmFsOyFYfHxYLmdsb2JhbCE9PVgmJlgud2luZG93IT09WHx8KEc9WCk7XG52YXIgWT1zKCk7dHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZ0eXBlb2YgZGVmaW5lLmFtZD09XCJvYmplY3RcIiYmZGVmaW5lLmFtZD8oRy5fPVksIGRlZmluZShmdW5jdGlvbigpe3JldHVybiBZfSkpOkgmJko/UT8oSi5leHBvcnRzPVkpLl89WTpILl89WTpHLl89WX0pLmNhbGwodGhpcyk7Il19
