/**
 * Type checking, also checks untyped types like integer and float.
 * @name iddqd.type
 * @function
 * @param {*} obj
 * @returns {Function} A constant, ie: iddqd.type.BOOLEAN
 * @property {object} iddqd.type.UNDEFINED
 * @property {object} iddqd.type.NULL
 * @property {object} iddqd.type.OBJECT
 * @property {object} iddqd.type.ARRAY
 * @property {object} iddqd.type.NODE
 * @property {object} iddqd.type.EVENT
 * @property {object} iddqd.type.FUNCTION
 * @property {object} iddqd.type.STRING
 * @property {object} iddqd.type.BOOLEAN
 * @property {object} iddqd.type.INT
 * @property {object} iddqd.type.FLOAT
 * @property {object} iddqd.type.NAN
 * @property {object} iddqd.type.INFINITE
 * @property {object} iddqd.type.REGEXP
 * @property {object} iddqd.type.DATE
 * @example
 var type = iddqd.type;
 type(0)===type.INT;
 type('')===type.STRING;
 type(null)===type.NULL;
 type({})===type.OBJECT;
 */
iddqd.ns('iddqd.type',(function(iddqd,undefined){
	'use strict';
	// using objects for constants for speed (see http://jsperf.com/equality-checking-different-types)
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
		,REGEXP =		getConstant('regexp')
		,DATE =			getConstant('date')
		// Error
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
				else if (c===RegExp) iType = REGEXP;
				else if (c===Date) iType = DATE;
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