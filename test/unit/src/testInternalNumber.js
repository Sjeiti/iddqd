/*global QUnit,test,ok*/
import * as number from './../../../src/internal/number';

QUnit.module('number');
test('formatSize', function() {
	ok(number.formatSize(12436798)==='12MB','formatSize');
});