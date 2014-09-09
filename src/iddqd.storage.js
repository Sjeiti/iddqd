/**
 * @summary Storage methods
 * @namespace iddqd.storage
 */

/**
 * @summary LocalStorage methods
 * @namespace iddqd.storage.local
 */
/**
 * @method iddqd.storage.local.get
 * @param {String} key
 * @param {Object} defaultValue
 * @returns {Object}
 */
/**
 * @method iddqd.storage.local.set
 * @param {String} key
 * @param {Object} value
 * @returns {Object} The value
 */
/**
 * @method iddqd.storage.local.clear
 * @param {String} key
 */

/**
 * @summary SessionStorage methods
 * @namespace iddqd.storage.session
 */
/**
 * @method iddqd.storage.session.get
 * @param {String} key
 * @param {Object} defaultValue
 * @returns {Object}
 */
/**
 * @method iddqd.storage.session.set
 * @param {String} key
 * @param {Object} value
 * @returns {Object} The value
 */
/**
 * @method iddqd.storage.session.clear
 * @param {String} key
 */
iddqd.ns('iddqd.storage',(function(iddqd){
	'use strict';
	var bCanStore = window.Storage!==undefined
		,oReturn = {}
	;
	['local','session'].forEach(function(type){
		var oType = bCanStore?(type=='local'?localStorage:sessionStorage):{clear:iddqd.fn};
		function get(key,defaultValue) {
			return this[key]&&JSON.parse(this[key])||defaultValue&&set.call(this,key,defaultValue);
		}
		function set(key,value) {
			this[key] = JSON.stringify(value);
			return value;
		}
		function clear(key) {
			if (key) delete this[key];
			else this.clear();
		}
		oReturn[type] = {
			get: get.bind(oType)
			,set: set.bind(oType) // todo: added return, update jsdoc
			,clear: clear.bind(oType)
		};
	});
	return oReturn;
})(iddqd));