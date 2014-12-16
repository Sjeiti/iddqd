/* global module, test, ok */
/*jshint -W058 */
(function(){
	'use strict';

	module('iddqd.internal.native.number.js');
	test('formatSize', function() {
		ok(iddqd.internal.native.number.formatSize(12436798)==='12MB','formatSize');
	});
})();