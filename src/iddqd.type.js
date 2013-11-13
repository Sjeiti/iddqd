/**
 * Type checking, also checks untyped types like integer and float.
 * @name iddqd.type
 * @method
 * @param {*} obj
 * @returns {Function} A constant, ie: iddqd.type.BOOLEAN
 **/
iddqd.ns('iddqd.type',(function(iddqd,undefined){
	'use strict';
		/** @constant {Function} iddqd.type.UNDEFINED */
	var  UNDEFINED =	getConstant('undefined')
		/** @constant {Function} iddqd.type.NULL */
		,NULL =			getConstant('null')
		/** @constant {Function} iddqd.type.OBJECT */
		,OBJECT =		getConstant('object')
		/** @constant {Function} iddqd.type.ARRAY */
		,ARRAY =		getConstant('array')
		/** @constant {Function} iddqd.type.NODE */
		,NODE =			getConstant('node')
		/** @constant {Function} iddqd.type.EVENT */
		,EVENT =		getConstant('event')
		/** @constant {Function} iddqd.type.FUNCTION */
		,FUNCTION =		getConstant('function')
		/** @constant {Function} iddqd.type.STRING */
		,STRING =		getConstant('string')
		/** @constant {Function} iddqd.type.BOOLEAN */
		,BOOLEAN =		getConstant('boolean')
		/** @constant {Function} iddqd.type.INT */
		,INT =			getConstant('int')
		/** @constant {Function} iddqd.type.FLOAT */
		,FLOAT =		getConstant('float')
		/** @constant {Function} iddqd.type.NAN */
		,NAN =			getConstant('NaN')
		/** @constant {Function} iddqd.type.INFINITE */
		,INFINITE =		getConstant('Infinite')
		// todo: below
//		,REGEXP =		getConstant('regexp')
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