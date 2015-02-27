/**
 * Design patterns
 * @namespace iddqd.pattern
 * @summary Design patterns
 */
iddqd.ns('iddqd.pattern',(function(){
	'use strict';


	/**
	 * Creates an object pool for a factory method
	 * Adds a drop function to each instance
	 * @name iddqd.pattern.pool
	 * @method
	 * @param {Function} fnc The factory function we want to pool
	 * @returns {Function} The pooled method
	 */
	function pool(fnc){
		var aPool = [];
		function drop(){
			/* jshint validthis:true */
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
	 * @todo cleanup add max cache size to prevent memory leaks
	 */
	function memoize(fnc,storage,async){
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
			};
		}
		return function () {
			var sKey = sKeySuffix+JSON.stringify(arguments);
			return (sKey in oCache)?oCache[sKey]:oCache[sKey] = fnc.apply(fnc,arguments);
		};
	}

	/**
	 * Turn a regular callback method into a promise.
	 * The method must be of type function(param1,param2,...,successCallback,errorCallback)
	 * @param {Function} fn The function to convert
	 * @param {number} [success=1] The position of the callback argument
	 * @param {number} [error=2] The position of the error argument
	 * @returns {Function}
	 */
	function callbackToPromise(fn,success,error){
		var Promise = iddqd.uses(window.Promise);
		if (success===undefined) success = 1;
		if (error===undefined) error = 2;
		return function(){
			var arg = Array.prototype.slice.call(arguments,0);
			return new Promise(function(resolve,reject){
				if (!arg[success]) arg[success] = resolve;
				if (!arg[error]) arg[error] = reject;
				fn.apply(fn,arg);
			});
		};
	}

	/**
	 * Turn a node-style callback method into a promise.
	 * @param {Function} nodeStyleFunction
	 * @param {Function} filter Map the original functions callback params to nodeStyle
	 * @returns {Function}
	 * @name iddqd.pattern.denodify
	 * @method
	 * @todo cleanup
	 */
	function denodify(nodeStyleFunction, filter) {
		return function() {
			var self = this
				,functionArguments = new Array(arguments.length + 1)
				,Promise = iddqd.uses(window.Promise)
			;
			for (var i = 0,l=arguments.length; i < l; i += 1) {
				functionArguments[i] = arguments[i];
			}
			function promiseHandler(resolve, reject) {
				function callbackFunction() {
					var args = []
						,error
						,result
					;
					for (var i = 0,l=arguments.length; i<l; i++) {
						args[i] = arguments[i];
					}
					if (filter) {
						args = filter.apply(self, args);
					}
					error = args[0];
					result = args[1];
					if (error) {
						return reject(error);
					}
					return resolve(result);
				}
				functionArguments[functionArguments.length - 1] = callbackFunction;
				nodeStyleFunction.apply(self, functionArguments);
			}
			return new Promise(promiseHandler);
		};
	}

	return {
		pool:pool
		,memoize:memoize
		,callbackToPromise:callbackToPromise
		,denodify:denodify
	};
})());