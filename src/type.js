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
export default type;