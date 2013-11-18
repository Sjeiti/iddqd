/**
 * Object methods
 * @namespace iddqd.internal.native.object
 */
iddqd.ns('iddqd.internal.native.object',(function(internal){
	'use strict';
	return internal(Object,{
		/**
		 * Extend an object
		 * @name iddqd.internal.native.object.extend
		 * @method
		 * @param o {Object} Property object.
		 * @returns {Object} Subject.
		 */
		extend: function(o){
			return iddqd.extend(this,o);
		}
		/**
		 * Returns the first item in an object
		 * @name iddqd.internal.native.object.first
		 * @method
		 * @returns {object}
		 */
		,first: function(){
			for (var s in this) return this[s];
		}
	});
})(iddqd.internal));