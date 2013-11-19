/**
 * Design patterns
 * @namespace iddqd.pattern
 * @summary Design patterns
 */
iddqd.ns('iddqd.pattern',{

	/**
	 * Creates an object pool for a factory method
	 * Adds a drop function to each instance
	 * @name iddqd.pattern.pool
	 * @method
	 * @param {Function} fnc The factory function we want to pool
	 * @returns {Function} The pooled method
	 */
	pool: function(fnc){
		'use strict';
		/* jshint validthis:true */
		var aPool = [];
		function drop(){
			aPool.push(this);
			return this;
		}
		return function(){
			var oInstance;
			if (aPool.length) {
				oInstance = aPool.pop();
				if (oInstance.reset) oInstance.reset.apply(oInstance,arguments);
			} else {
				oInstance = fnc.apply(fnc,arguments);
				oInstance.drop = drop;
			}
			return oInstance;
		};
	}

	/**
	 * Memoisation function
	 * Memoizes the return values to the functions argument values
	 * @name iddqd.pattern.memoize
	 * @method
	 * @param {Function} fnc The function we want to memoize
	 * @returns {Object} The memoized function
	 */
	,memoize: function(fnc){
		'use strict';
		var oCache = {};
		return function () {
			var sKey = JSON.stringify(arguments);
			return (sKey in oCache)?oCache[sKey]:oCache[sKey] = fnc.apply(fnc,arguments);
		};
	}
});