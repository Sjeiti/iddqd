/* global module, test, ok */
/*jshint -W058 */
(function(){
	'use strict';

	module('iddqd.environment.js');
	test('iddqd.environment', function() {
		var env = iddqd.environment
			,type = iddqd.type
			,BOOLEAN = type.BOOLEAN;
		ok(type(env.isIPad)===BOOLEAN,'isIPad');
		ok(type(env.isIPhone)===BOOLEAN,'isIPhone');
		ok(type(env.isIPod)===BOOLEAN,'isIPod');
		ok(type(env.isAndroid)===BOOLEAN,'isAndroid');
		ok(type(env.isBlackBerry)===BOOLEAN,'isBlackBerry');
		ok(type(env.isIEMobile)===BOOLEAN,'isIEMobile');
		ok(type(env.isIOS)===BOOLEAN,'isIOS');
		ok(type(env.isMobile)===BOOLEAN,'isMobile');
		ok(type(env.standalone)===BOOLEAN,'standalone');
		ok(type(env.addClassNames)!==BOOLEAN,'addClassNames');
	});
})();