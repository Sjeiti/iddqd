/*global QUnit,test,ok*/
import capabilities from './../../../src/capabilities';
import type from './../../../src/type';
QUnit.module('capabilities');
test('standalone', function() {
	ok(type(capabilities.standalone)===type.BOOLEAN,'standalone');
});