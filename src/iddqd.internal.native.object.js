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
		 * @param withObject {Object} Property object.
		 * @returns {Object} Subject.
		 */
		extend: function(withObject){
			return iddqd.extend(this,withObject);
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