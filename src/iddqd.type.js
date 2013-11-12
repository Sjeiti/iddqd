
/*! type */
/**
 * Type checking, also checks untyped types like integer and float.
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @namespace iddqd.type
 * @requires iddqd.js
 * */
iddqd.ns('iddqd.type',(function(iddqd,undefined){
	'use strict';
	var  UNDEFINED =	getConstant('undefined')
		,NULL =			getConstant('null')
		,OBJECT =		getConstant('object')
		,ARRAY =		getConstant('array')
		,NODE =			getConstant('node')
		,EVENT =		getConstant('event')
		,FUNCTION =		getConstant('function')
		,STRING =		getConstant('string')
		,BOOLEAN =		getConstant('boolean')
		,INT =			getConstant('int')
		,FLOAT =		getConstant('float')
		,NAN =			getConstant('NaN')
		,INFINITE =		getConstant('Infinite')
		// todo: below
		,REGEXP =		getConstant('regexp')
		,aEventProperties = [
			'eventPhase'
			,'currentTarget'
			,'cancelable'
			,'target'
			,'bubbles'
			,'type'
			,'cancelBubble'
			,'srcElement'
			,'defaultPrevented'
			,'timeStamp'
			,'returnValue'
		]
	;
	function getConstant(name) {
		var oConstant = {toString: function() {return name;}}
			,sConstant = name.toUpperCase();
		type[sConstant] = oConstant;
		return oConstant;
	}
	function type(obj) {
		var iType = -1;
		if (obj===null) {
			iType = NULL;
		} else if (obj===undefined) {
			iType = UNDEFINED;
		} else { // todo: http://jsperf.com/testing-types
			switch (typeof(obj)){
			case 'object':
				var c = obj.constructor;
				if (c===Array) iType = ARRAY;
				//    if (o && (o.nodeType === 1 || o.nodeType === 9)) {
				else if (obj.ownerDocument!==undefined) iType = NODE;
				else if ((function(){
					var isEvent = true;
					for (var s in aEventProperties) {
						if (aEventProperties.hasOwnProperty(s)) {
							if (obj[aEventProperties[s]]===undefined) {
								isEvent = false;
								break;
							}
						}
					}
					return isEvent;
				})()) iType = EVENT;
				else iType = OBJECT;
			break;
			case 'function': iType = FUNCTION; break;
			case 'string': iType = STRING; break;
			case 'boolean': iType = BOOLEAN; break;
			case 'number':
				if (isNaN(obj)) {
					iType = NAN;
				} else if (!isFinite(obj)) {
					iType = INFINITE;
				} else {
					iType = obj==Math.floor(obj)?INT:FLOAT;
				}
			break;
			}
		}
		return iType;
	}
	return type;
})(iddqd));
	
	
	
	
	
	
	
	
/*if (!iddqd.type) (function(rv) {

	// check requirements
	if (!rv) throw new ReferenceError('iddqd.type requires iddqd');

	var type = rv.type = function(o){
		type.UNDEFINED = 0;
		type.NULL = 1;

		type.OBJECT = 2;
		type.ARRAY = 21;
		type.NODE = 22;
		type.EVENT = 23;

		type.FUNCTION = 3;

		type.STRING = 4;
		type.BOOLEAN = 5;
		type.INT = 6;
		type.FLOAT = 7;

		type.s = function(o,check){
			if (check===undefined) check = true;
			var iType = check?type(o):o;
			var s;
			switch (iType) {
				case type.UNDEFINED: s = 'undefined'; break;
				case type.NULL: s = 'null'; break;

				case type.OBJECT: s = 'Object'; break;
				case type.ARRAY: s = 'Array'; break;
				case type.NODE: s = 'Node'; break;
				case type.EVENT: s = 'Event'; break;

				case type.FUNCTION: s = 'function'; break;
				case type.REGEXP: s = 'RegExp'; break;

				case type.STRING: s = 'String'; break;
				case type.BOOLEAN: s = 'boolean'; break;
				case type.INT: s = 'int'; break;
				case type.FLOAT: s = 'float'; break;
			}
			return s;
		};
		var i = 0;
		if (o===null) {
			i = type.NULL;
		} else { // todo: http://jsperf.com/testing-types
			switch (typeof(o)){
			case 'object':
				var c = o.constructor;
				if (c===Array) i = type.ARRAY;
				else if (o.ownerDocument!==undefined) i = type.NODE;
				else if ((function(){
					var bE = true;
					var aE = [
						'eventPhase'
						,'currentTarget'
						,'cancelable'
						,'target'
						,'bubbles'
						,'type'
						,'cancelBubble'
						,'srcElement'
						,'defaultPrevented'
						,'timeStamp'
						,'returnValue'
					];
					for (var s in aE) {
						if (aE.hasOwnProperty(s)) {
							if (o[aE[s]]===undefined) {
								bE = false;
								break;
							}
						}
					}
					return bE;
				})()) i = type.EVENT;
				else i = type.OBJECT;
			break;
			case 'function': i = type.FUNCTION; break;
			case 'string': i = type.STRING; break;
			case 'boolean': i = type.BOOLEAN; break;
			case 'number': i = o==Math.floor(o)?type.INT:type.FLOAT; break;
			}
		}
		return i;
	};
})(iddqd);*/