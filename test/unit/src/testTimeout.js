/*global QUnit,asyncTest,ok,start*/
import timeout from './../../../src/timeout';
QUnit.module('timeout');
asyncTest('timeout',function () {
	timeout(()=>{}).then(()=>{
		ok(true,'then');
		start();
	});
});