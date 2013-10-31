
iddqd.ns('iddqd.storage',(function(rv){
	var bCanStore = window.Storage!==undefined
		,oReturn = {}
	;
//getItem(key) – retrieves the value for the given key or null if the key doesn’t exist.
//setItem(key, value) – sets the value for the given key.
//removeItem(key) – removes the key completely.
//key(position) – returns the key for the value in the given numeric position.
//clear() – removes all key-value pairs.
	rv.loop(['local','session'],function(i,s){
		var oTarget = bCanStore?(s=='local'?localStorage:sessionStorage):{clear:rv.fn};
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