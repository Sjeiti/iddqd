/* global module, test, ok */
/*jshint -W058 */
(function(){
	'use strict';

	module('iddqd.internal.native.object.js');
	test('extend', function() {
		var o = iddqd.internal.native.object.extend({a:0,b:2},{a:1,c:3});
		ok(o.a===0&&o.b===2&&o.c===3,'extend');
	});
	test('first', function() {
		ok(iddqd.internal.native.object.first({c:4,a:0,b:2})===4,'first');
	});
})();