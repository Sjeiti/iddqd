/**
 * Type checking, also checks untyped types like integer and float.
 * @name iddqd.type
 * @method
 * @param {*} obj
 * @returns {Function} A constant, ie: iddqd.type.BOOLEAN
 **/
iddqd.ns('iddqd.type',(function(iddqd,undefined){
	'use strict';
		/** @constant {object} iddqd.type.UNDEFINED */
	var  UNDEFINED =	getConstant('undefined')
		/** @constant {object} iddqd.type.NULL */
		,NULL =			getConstant('null')
		/** @constant {object} iddqd.type.OBJECT */
		,OBJECT =		getConstant('object')
		/** @constant {object} iddqd.type.ARRAY */
		,ARRAY =		getConstant('array')
		/** @constant {object} iddqd.type.NODE */
		,NODE =			getConstant('node')
		/** @constant {object} iddqd.type.EVENT */
		,EVENT =		getConstant('event')
		/** @constant {object} iddqd.type.FUNCTION */
		,FUNCTION =		getConstant('function')
		/** @constant {object} iddqd.type.STRING */
		,STRING =		getConstant('string')
		/** @constant {object} iddqd.type.BOOLEAN */
		,BOOLEAN =		getConstant('boolean')
		/** @constant {object} iddqd.type.INT */
		,INT =			getConstant('int')
		/** @constant {object} iddqd.type.FLOAT */
		,FLOAT =		getConstant('float')
		/** @constant {object} iddqd.type.NAN */
		,NAN =			getConstant('NaN')
		/** @constant {object} iddqd.type.INFINITE */
		,INFINITE =		getConstant('Infinite')
		/** @constant {object} iddqd.type.REGEXP */
		,REGEXP =		getConstant('regexp')
		/** @constant {object} iddqd.type.DATE */
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