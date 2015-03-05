/*global QUnit,test,ok*/
import environment from './../../../src/environment';
import type from './../../../src/type';

QUnit.module('environment');
test('environment', function() {
	var BOOLEAN = type.BOOLEAN;
	ok(type(environment.isIPad)===BOOLEAN,'isIPad');
	ok(type(environment.isIPhone)===BOOLEAN,'isIPhone');
	ok(type(environment.isIPod)===BOOLEAN,'isIPod');
	ok(type(environment.isAndroid)===BOOLEAN,'isAndroid');
	ok(type(environment.isBlackBerry)===BOOLEAN,'isBlackBerry');
	ok(type(environment.isIEMobile)===BOOLEAN,'isIEMobile');
	ok(type(environment.isIOS)===BOOLEAN,'isIOS');
	ok(type(environment.isMobile)===BOOLEAN,'isMobile');
	ok(type(environment.standalone)===BOOLEAN,'standalone');
	ok(type(environment.addClassNames)!==BOOLEAN,'addClassNames');
});