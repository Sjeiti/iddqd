
/*! type */
/**
 * Type checking, also checks untyped types like integer and float.
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @namespace iddqd.type
 * @requires iddqd.js
 * */
if (!iddqd.type) (function(rv) {

	// check requirements
	if (!rv) throw new ReferenceError('iddqd.type requires iddqd');

	var type = rv.type = function(o){0
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
})(iddqd);