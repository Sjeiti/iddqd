/**
 * Internal object methods
 * The namespace is actually {@link iddqd.internal.internal exposed private method} to define methods augmenting or applying to host and internal objects.
 * Note that augmentation is generally frowned upon so use with caution.
 * @summary Internal object methods
 * @see {@link iddqd.internal.internal}
 * @namespace iddqd.internal
 */
iddqd.ns('iddqd.internal',(function(iddqd){
	'use strict';
	var loop = iddqd.loop;
	/**
	 * Augment an objects prototype
	 * @name augment
	 * @memberof iddqd.internal
	 * @method
	 * @private
	 * @param obj {Object} The object to augment.
	 * @param augmentwith {Object} A key value pair ({name:Function})
	 * @returns {Boolean} Success
	 * @example
iddqd.ns('bar',(function(){
	return iddqd.internal(String,{
		wrap: function(prefix,suffix){
			return prefix+this+suffix;
		}
	});
})());
// normally you'd use the method like so:
var myString = 'foo';
bar.wrap.apply(myString,['(',')']); // returns '(foo)'
// the augments adds the method to the prototype to be used like so:
myString.wrap('(',')');
	 */
	function augment(obj,augmentwith){
		var oPrototype = obj.prototype||Object.getPrototypeOf(obj)
			,bSuccess = false;
		if (oPrototype===undefined) {
			console.warn('Object has no prototype to augment, use extend instead.');
		} else {
			loop(augmentwith,function(fnc,name){
				if (name!=='toString'&&name!=='normalize'&&name!=='augment') {
					if (oPrototype.hasOwnProperty(name)) {
						if (oPrototype[name]!==augmentwith[name]) {
							console.warn('Attempting to augment with an existing propery: \''+name+'\' in \''+obj+'\'.');
						}
					} else {
						oPrototype[name] = fnc.org===undefined?fnc:fnc.org;
						bSuccess = true;
					}
				}
			});
		}
		return bSuccess;
	}
	/**
	 * Normalizes a namespace so methods can be called without applying.
	 * @name normalize
	 * @memberof iddqd.internal
	 * @method
	 * @private
	 * @param namespace {Object} The object to augment.
	 * @example
iddqd.ns('bar',(function(){
	return iddqd.internal(String,{
		wrap: function(prefix,suffix){
			return prefix+this+suffix;
		}
	});
})());
// normally you'd use the method like so:
var myString = 'foo';
bar.wrap.apply(myString,['(',')']); // returns '(foo)'
// the normalize adds -this- as the first parameter so the method can be used like so:
bar.wrap(myString,'(',')');
	 */
	function normalize(namespace){
		loop(namespace,function(fnc,name){
			if (
				typeof(fnc)==='function'
				&&name!=='augment'
				&&name!=='normalize'
				&&name!=='toString'
				&&!fnc.normalized
			) {
				var fnOrg = namespace[name];
				namespace[name] = function(s){
					return fnc.apply(s,Array.prototype.slice.apply(arguments,[1]));
				};
				namespace[name].normalized = true;
				namespace[name].org = fnOrg;
			}
		});
	}

	/**
	 * Adds {@link iddqd.internal.augment augment} and {@link iddqd.internal.normalize normalize} methods to host- and/or native objects.
	 * @name internal
	 * @memberof iddqd.internal
	 * @method
	 * @private
	 * @param {object} primitiveObject The host- or native object.
	 * @param {object} namespace The namespace to add the methods to.
	 * @returns {object} The namespace
	 * @see iddqd.internal.augment
	 * @see iddqd.internal.normalize
	 * @example
iddqd.ns('foo',(function(){
	return iddqd.internal(Math,{
		// keys and properties in this object will be added through foo.augment() and foo.normalize()
		answerToLifeTheUniverseAndEverything: function(){
			return 42;
		}
	});
})());
	 */
	function internal(primitiveObject,namespace){
		namespace.augment = function() {
			return augment(primitiveObject,namespace);
		};
		namespace.normalize = function(){
			normalize(namespace);
		};
		normalize(namespace);
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

