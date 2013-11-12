iddqd.ns('iddqd.native.object',(function(){
	'use strict';
	return {
		augment: function() {
			iddqd.augment(Object,iddqd.native.object);
		}
		,extend: function(o){
			for (var s in o) this[s] = o[s];
		}
		,first: function(){
			for (var s in this) return this[s];
		}
	};
})());