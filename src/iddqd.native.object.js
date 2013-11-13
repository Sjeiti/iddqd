/**
 * Object methods
 * @name iddqd.native.object
 * @namespace iddqd.native.object
 */
iddqd.ns('iddqd.native.object',(function(){
	'use strict';
	return iddqd.primitive(Object,{
		/**
		 * Extend an object
		 * @name iddqd.native.object.extend
		 * @method
		 * @param o {Object} Property object.
		 * @returns {Object} Subject.
		 */
		extend: function(o){
			return iddqd.extend(this,o);
		}
		/**
		 * Returns the first item in an object
		 * @name iddqd.native.object.first
		 * @method
		 * @returns {object}
		 */
		,first: function(){
			for (var s in this) return this[s];
		}
	});
})());