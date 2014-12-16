/* global module, test, ok */
(function(){
	'use strict';

	module('iddqd.storage.js');
	['cookie'].forEach(function(type) {
		test('iddqd.storage.'+type, function(){
			var storage = iddqd.storage[type]
				,sName = 'foo'+Date.now();
			ok(storage.get(sName)===undefined,type+'.get()');
			ok(storage.set(sName,{a:3}).a===3,type+'.set()');
			ok(storage.get(sName)!==undefined,type+'.get() after set');
			ok(storage.clear(sName)===undefined,type+'.clear(key)');
			ok(storage.get(sName)===undefined,type+'.get() after clear key');
			ok(storage.get(sName,{b:4}).b===4,type+'.get() with default');
			ok(storage.clear()===undefined,type+'.clear()');
			ok(storage.get(sName)===undefined,type+'.get() after clear');
		});
	});
})();