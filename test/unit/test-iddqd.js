/* global module, test, ok */
/*jshint -W058 */
(function(){
	'use strict';

	module('iddqd.js');
	test('default functionality', function() {
		ok(!!location.origin,'location.origin');
		ok(!!window.console.log,'window.console.log');
	});
	test('iddqd.DOMReady', function(){
		ok(!iddqd.DOMReady,'DOMReady');
	});
	/*asyncTest('iddqd.onDOMReady async',function () {
		expect(2);
		iddqd.onDOMReady(function () {
			ok(true,'onDOMReady called');
			ok(iddqd.DOMReady,'onDOMReady set');
			start();
		});
	});*/
	test('iddqd.loop', function() {
		ok((function(){
			var a = [4,1,2,3], sResult = '';
			iddqd.loop(a,function(s){
				sResult += s;
			});
			return sResult===a.join('');
		})(),'array values');
		ok((function(){
			var a = [4,1,2,3], sResult = '';
			iddqd.loop(a,function(s,i){
				sResult += i;
			});
			return sResult==='0123';
		})(),'array keys');
		ok((function(){
			var a = {a:2,c:4,b:1}, sResult = '';
			iddqd.loop(a,function(s){
				sResult += s;
			});
			return sResult==='241';
		})(),'object values');
		ok((function(){
			var a = {a:2,c:4,b:1}, sResult = '';
			iddqd.loop(a,function(s,i){
				sResult += i;
			});
			return sResult==='acb';
		})(),'object keys');
	});
	test('iddqd.extend', function() {
		var a, b;
		ok((
			a = {a:1,c:2}
			,b = {a:3,b:4}
			,iddqd.extend(a,b)
			,a.a===1&&a.c===2&&a.b===4
		),'extend');
	});
	test('iddqd.ns', function(){
		/*global a*/
		ok((iddqd.ns('a',{b:{},c:true}),a.c),'namespace create');
		ok((iddqd.ns('a.b.c',{d:true}),a.b.c.d),'namespace append');
		ok((iddqd.ns('a.b',{d:true}),a.b.d),'namespace overwrite');
	});
	// todo DOMReady
	// todo onDOMReady
	// todo fireEvent
	// todo millis // tobe obsoleted
	// todo getGet
	// todo getLessVars
	// todo loadScript
	// todo tmpl
	// todo uses
	// todo factory

})();