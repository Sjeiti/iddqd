/* global module, test, ok */
/*jshint -W058 */
(function(){
	'use strict';

	module('iddqd.capabilities.js');
	test('standalone', function() {
		ok(iddqd.type(iddqd.capabilities.standalone)===iddqd.type.BOOLEAN,'standalone');
	});
	// todo touch
})();