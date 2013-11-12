/**
 * A crude but tiny json parser
 * @namespace iddqd.json
 * @requires iddqd
 * @requires iddqd.type
 */
if (!iddqd.json) (function(rv,type) {
	'use strict';
	// check requirements
	if (!rv)	throw new ReferenceError('iddqd.json requires iddqd');
	if (!type)	throw new ReferenceError('iddqd.json requires iddqd.type');

	function parse(s) {
		/*jshint evil:true */
		return eval('('+s+')');
	}
	function stringify(o,s) {
		if (s===undefined) s = '';
		var iTp = type(o)
			,bOb = iTp===type.OBJECT
			,bAr = iTp===type.ARRAY;
		if (bOb||bAr) {
			s += bOb?'{':'[';
			var sS = '';
			if (bOb) for (var z in o) sS += ',"'+z+'":'+stringify(o[z]);
			else for (var i = 0;i<o.length;i++) sS += ','+stringify(o[i]);
			if (sS.length) s += sS.substr(1);
			s += bOb?'}':']';
		} else if (iTp===type.STRING) {
			s += '"'+o+'"';
		} else if (iTp===type.BOOLEAN) {
			s += o?'true':'false';
		} else {
			s += o;
		}
		return s;
	}
	rv.json = {
		toString: function(){return '[JSON]';}
		/**
		 * Parses a string to an object
		 * @name iddqd.json.parse
		 * @param {String} Json string
		 * @returns a json object
		 */
		,parse:parse
		/**
		 * Parses an object to a string
		 * @name iddqd.json.stringify
		 * @param {Object} Json object
		 * @returns a json string
		 */
		,stringify:stringify
	};
})(iddqd,iddqd.type);