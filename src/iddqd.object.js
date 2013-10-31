
/*! Object */
// todo: document
iddqd.ns('iddqd.object',{
	init: function(){
		iddqd.object.init = iddqd.fn;
		iddqd.extend(Object.prototype,iddqd.object);
	}
	,create: function (o) {
		var fn = function(){};
		fn.prototype = o;
		return new fn();
	}
	,defineProperties: function (obj, props) {
		for (var prop in props) {
			Object.defineProperty(obj, prop, props[prop]);
		}
	}
	,extend: function(o){
		for (var s in o) this[s] = o[s];
	}
	,first: function(){
		for (var s in this) return this[s];
	}
});