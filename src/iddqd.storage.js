
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
			get:	function(key){return oTarget[key]&&JSON.parse(oTarget[key]);}
			,set:	function(key,value){oTarget[key] = JSON.stringify(value);}
			,clear: function(key){
				if (key) delete oTarget[key];
				else oTarget.clear();
			}
		};
	});
	return oReturn;
})(iddqd));