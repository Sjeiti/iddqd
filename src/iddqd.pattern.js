/**
 * Design patterns
 * @namespace iddqd.pattern
 * @summary Design patterns
 */
iddqd.ns('iddqd.pattern',(function(){
	/**
	 * Creates an object pool for a factory method
	 * Adds a drop function to each instance
	 * @name iddqd.pattern.pool
	 * @method
	 * @param {Function} fnc The factory function we want to pool
	 * @returns {Function} The pooled method
	 */
	function pool(fnc){
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
	 * @param {(Object|Storage)} [storage=undefined] The storage type. Leave undefined for local variable, or localStorage or sessionStorage.
	 * @param {boolean} [async=undefined] If true the last of the arguments will be seen as the callback function in an asynchronous method.
	 * @returns {Object} The memoized function
	 */
	function memoize(fnc,storage,async){
		'use strict';
		var oCache = storage||{}
			,sKeySuffix = 0
			,sFnc
		;
		if (async) {
			sFnc = ''+fnc;
			for (var i=0, l=sFnc.length; i<l; i++) {
				sKeySuffix = ((sKeySuffix<<5)-sKeySuffix)+sFnc.charCodeAt(i);
				sKeySuffix = sKeySuffix&sKeySuffix;
			}
			//function a(a,b,cb){setTimeout(function(){cb(a+b)},1000)};b=iddqd.pattern.memoize(a,null,true);b(2,4,function(c){console.log(c)});b(2,4,function(c){console.log('c',c)});
			var oPending = {}
				,oArrayProto = Array.prototype
				,stringify = JSON.stringify
				,parse = JSON.parse
			;
			return function(){
				var fnCallback = oArrayProto.pop.call(arguments);
				var sKey = sKeySuffix+stringify(arguments);
				if (sKey in oCache) {
					fnCallback.apply(fnCallback,parse(oCache[sKey]));
				} else {
					if (sKey in oPending) {
						oPending[sKey].push(fnCallback);
					} else {
						var aPending = oPending[sKey] = [fnCallback];
						oArrayProto.push.call(arguments,function(){
							oCache[sKey] = stringify(oArrayProto.slice.call(arguments));
							for (var i=0,l=aPending.length;i<l;i++) {
								var pendingCallback = aPending[i];
								pendingCallback.apply(pendingCallback,arguments);
							}
						});
						fnc.apply(fnc,arguments);
					}
				}
			}
		}
		return function () {
			var sKey = sKeySuffix+JSON.stringify(arguments);
			return (sKey in oCache)?oCache[sKey]:oCache[sKey] = fnc.apply(fnc,arguments);
		};
	}
	return {
		pool:pool
		,memoize:memoize
	};
})());