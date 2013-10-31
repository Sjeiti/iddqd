
iddqd.ns('iddqd.pattern',{
	pool: function(fnc){
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
		}
	}
	,memoize: function(fnc){
		var oCache = {};
		return function () {
			var sKey = JSON.stringify(arguments);
			return (sKey in oCache)?oCache[sKey]:oCache[sKey] = fnc.apply(fnc,arguments);
		}
	}
});