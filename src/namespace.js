/**
 * Create namespaces. If only the first 'namespace' parameter is set it will return the namespace if it exists or null if it doesn't.
 * @name namespace
 * @method
 * @param {String} namespace The namespace we're creating or expanding
 * @param {Object} object The object with which to extend the namespace
 */
import * as _ from './../vendor/lodash/dist/lodash.min.js';
export default (namespace,object)=>{
	var extend = _.extend
		,oBase = window
		,aNS = namespace.split('.')
		,s
	;
	while(s=aNS.shift()){
		if (object) {
			if (aNS.length===0) {
				var oExists = oBase.hasOwnProperty(s)?oBase[s]:null;
				oBase[s] = object;
				if (!object.hasOwnProperty('toString')) {
					object.toString = (function(s){return function(){return '[object '+s+']';};})(s);
				}
				if (oExists) {
					console.warn('Overwriting '+s+' in '+namespace);
					extend(oBase[s],oExists);
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
}