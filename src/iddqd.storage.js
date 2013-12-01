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
 * @returns {Object}
 */
/**
 * @method iddqd.storage.local.set
 * @param {String} key
 * @param {Object} value
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
 * @returns {Object}
 */
/**
 * @method iddqd.storage.session.set
 * @param {String} key
 * @param {Object} value
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
//getItem(key) – retrieves the value for the given key or null if the key does not exist.
//setItem(key, value) – sets the value for the given key.
//removeItem(key) – removes the key completely.
//key(position) – returns the key for the value in the given numeric position.
//clear() – removes all key-value pairs.
	iddqd.loop(['local','session'],function(i,s){
		var oTarget = bCanStore?(s=='local'?localStorage:sessionStorage):{clear:iddqd.fn};
		oReturn[s] = {
			get:	function(key){return oTarget[key]&&JSON.parse(oTarget[key]);} // todo: add default value
			,set:	function(key,value){return oTarget[key] = JSON.stringify(value);} // todo: added return, update jsdoc
			,clear: function(key){
				if (key) delete oTarget[key];
				else oTarget.clear();
			}
		};
	});
	return oReturn;
})(iddqd));