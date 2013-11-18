/**
 * Internal object methods
* @namespace iddqd.internal
 * @summary Internal object methods
 */
iddqd.ns('iddqd.internal',(function(iddqd){
	'use strict';
	var loop = iddqd.loop;
//	/**
//	 * Augment an objects prototype
//	 * @name iddqd.augment
//	 * @method
//	 * @param obj {Object} The object to augment.
//	 * @param augmentwith {Object} A key value pair ({name:Function})
//	 * @returns {Boolean} Success
//	 */
	function augment(obj,augmentwith){
		var oPrototype = obj.prototype||Object.getPrototypeOf(obj)
			,bSuccess = false;
		if (oPrototype===undefined) {
			console.warn('Object has no prototype to augment, use extend instead.');
		} else {
			loop(augmentwith,function(name,fnc){
				if (name!=='toString'&&name!=='normalize'&&name!=='augment') {
					if (oPrototype.hasOwnProperty(name)) {
						if (oPrototype[name]!==augmentwith[name]) {
							console.warn('Attempting to augment with an existing propery: \''+name+'\' in \''+obj+'\'.');
						}
					} else {
						oPrototype[name] = fnc;
						bSuccess = true;
					}
				}
			});
		}
		return bSuccess;
	}
//	/**
//	 * Normalizes a namespace so methods can be called without applying.
//	 * @name iddqd.normalize
//	 * @method
//	 * @param namespace {Object} The object to augment.
//	 */
	function normalize(namespace){
		loop(namespace,function(name,fnc){
			if (name!=='augment'&&name!=='normalize'&&name!=='toString'&&!fnc.normalized) {
				namespace[name] = function(s){
					return fnc.apply(s);
				};
				namespace[name].normalized = true;
			}
		});
	}

//	/**
//	 * Adds augment and normalize methods to host- and/or native objects.
//	 * @name iddqd.internal
//	 * @method
//	 * @param {object} primitiveObject The host- or native object.
//	 * @param {object} namespace The namespace to add the methods to.
//	 * @returns {object} The namespace
//	 * @example
//iddqd.ns('foo',(function(){
//	return iddqd.internal(Math,{
//		// keys and properties in this object will be added through foo.augment() and foo.normalize()
//		answerToLifeTheUniverseAndEverything: function(){
//			return 42;
//		}
//	});
//})());
//	 */
	function internal(primitiveObject,namespace){
		namespace.augment = function() {
			return augment(primitiveObject,namespace);
		};
		namespace.normalize = function(){
			normalize(namespace);
		};
		return namespace;
	}

	return internal;
})(iddqd));


// no files exist for the namespaces below

/**
* Host object methods
* @namespace iddqd.internal.host
* @summary Host object methods
*/

/**
* Native object methods
* @namespace iddqd.internal.native
* @summary Native object methods
*/

