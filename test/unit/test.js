/* global qunit */
/* global module */
/* global test */
/* global ok */
/* global CustomEvent */
/* jshint ignore:start */
(function(undefined){

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
			iddqd.loop(a,function(i,s){
				sResult += s;
			});
			return sResult===a.join('');
		})(),'array values');
		ok((function(){
			var a = [4,1,2,3], sResult = '';
			iddqd.loop(a,function(i){
				sResult += i;
			});
			return sResult==='0123';
		})(),'array keys');
		ok((function(){
			var a = {a:2,c:4,b:1}, sResult = '';
			iddqd.loop(a,function(i,s){
				sResult += s;
			});
			return sResult==='241';
		})(),'object values');
		ok((function(){
			var a = {a:2,c:4,b:1}, sResult = '';
			iddqd.loop(a,function(i,s){
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
	/*test('iddqd.augment', function() {
		ok((function(){
			var oProto = Object.create({
					foo: function(){}
					,toString:function(){return '[object Foo]';}
				})
				,oObjA = Object.create(oProto)
				,oObjB = Object.create(oProto)
			;
			oProto.aaa = function(){};
			iddqd.augment(oProto,{bar:true});
			return oObjA.bar&&oObjB.bar;
		})(),'augment');
		ok((function(){
			var oProto = Object.create({
					foo: function(){}
					,toString:function(){return '[object Foo]';}
				})
				,oObjA = Object.create(oProto)
				,oObjB = Object.create(oProto)
			;
			iddqd.augment(oProto,{foo:true});
			return oObjA.foo!==true&&oObjB.foo!==true;
		})(),'augment');
	});*/
	test('iddqd.ns', function(){
		ok((iddqd.ns('a',{b:{},c:true}),a.c),'namespace create');
		ok((iddqd.ns('a.b.c',{d:true}),a.b.c.d),'namespace append');
		ok((iddqd.ns('a.b',{d:true}),a.b.d),'namespace overwrite');
	});
	// todo fireEvent
	// todo millis
	// todo requestAnimFrame
	// todo animate
	// todo getGet
	// todo getLessVars
	// todo loadScript

	module('iddqd.type.js');
	test('undefined', function() {
		ok(iddqd.type(undefined)===iddqd.type.UNDEFINED,'undefined');
	});
	test('null', function() {
		ok(iddqd.type(null)===iddqd.type.NULL,'null');
	});
	test('object', function() {
		ok(iddqd.type({})===iddqd.type.OBJECT,'object');
		ok(iddqd.type(arguments)===iddqd.type.OBJECT,'arguments');
	});
	test('array', function() {
		ok(iddqd.type([])===iddqd.type.ARRAY,'[]');
		ok(iddqd.type(new Array)===iddqd.type.ARRAY,'new Array');
	});
	test('node', function() {
		ok(iddqd.type(document.createElement('a'))===iddqd.type.NODE,'node');
	});
	/*test('event', function() {
		ok(iddqd.type(new Event('foo'))===iddqd.type.EVENT,'Event');
		ok(iddqd.type(new CustomEvent('bar',{}))===iddqd.type.EVENT,'CustomEvent');
		ok(iddqd.type(document.createEvent('Event'))===iddqd.type.EVENT,'document.createEvent');
	});*/
	test('function', function() {
		ok(iddqd.type(function(){})===iddqd.type.FUNCTION,'function');
	});
	test('string', function() {
		ok(iddqd.type('a')===iddqd.type.STRING,'a');
		ok(iddqd.type(String())===iddqd.type.STRING,'String()');
	});
	test('boolean', function() {
		ok(iddqd.type(true)===iddqd.type.BOOLEAN,'true');
		ok(iddqd.type(false)===iddqd.type.BOOLEAN,'false');
	});
	test('int', function() {
		ok(iddqd.type(0)===iddqd.type.INT,'0');
		ok(iddqd.type(1)===iddqd.type.INT,'1');
		ok(iddqd.type(0xFF)===iddqd.type.INT,'0xFF');
		ok(iddqd.type(1E4)===iddqd.type.INT,'1E4');
		ok(iddqd.type(Number.MAX_VALUE)===iddqd.type.INT,'Number.MAX_VALUE');
	});
	test('float', function() {
		ok(iddqd.type(1.1)===iddqd.type.FLOAT,'1.1');
		ok(iddqd.type(Math.PI)===iddqd.type.FLOAT,'Math.PI');
		ok(iddqd.type(1E-4)===iddqd.type.FLOAT,'1E-4');
		ok(iddqd.type(Number.MIN_VALUE)===iddqd.type.FLOAT,'Number.MIN_VALUE');
	});
	test('nan', function() {
		ok(iddqd.type(NaN)===iddqd.type.NAN,'NaN');
		ok(iddqd.type(0/0)===iddqd.type.NAN,'0/0');
	});
	test('infinite', function() {
		ok(iddqd.type(Infinity)===iddqd.type.INFINITE,'Infinity');
		ok(iddqd.type(2/0)===iddqd.type.INFINITE,'2/0');
		ok(iddqd.type(Number.POSITIVE_INFINITY)===iddqd.type.INFINITE,'Number.POSITIVE_INFINITY');
		ok(iddqd.type(Number.NEGATIVE_INFINITY)===iddqd.type.INFINITE,'Number.NEGATIVE_INFINITY');
	});
	test('regexp', function() {
		ok(iddqd.type(/\s/gi)===iddqd.type.REGEXP,'/\s/gi');
		ok(iddqd.type(new RegExp(''))===iddqd.type.REGEXP,'new RegExp');
	});
	test('date', function() {
		ok(iddqd.type(new Date())===iddqd.type.DATE,'new Date');
	});

	module('iddqd.internal.native.string.js');
	test('pad', function() {
		ok(iddqd.internal.native.string.pad.apply('a',[3,'b'])==='abb','pad');
		ok(iddqd.internal.native.string.pad.apply('a',[3,'bc'])==='abc','pad');
		ok(iddqd.internal.native.string.pad.apply('a',[3,'b',true])==='bba','pad left');
		ok(iddqd.internal.native.string.pad.apply('aac',[3,'b'])==='aac','pad');
		ok(iddqd.internal.native.string.pad.apply('aaac',[3,'b'])==='aaac','pad');
	});
	test('toType', function() {
		ok(iddqd.internal.native.string.toType.apply('a')==='a','toType string');
		ok(iddqd.internal.native.string.toType.apply('1')===1,'toType number');
		ok(iddqd.internal.native.string.toType.apply('0.1')===.1,'toType number');
		ok(iddqd.internal.native.string.toType.apply('true')===true,'toType boolean');
	});
	test('toXML', function() {
		ok(!!iddqd.internal.native.string.toXML.apply('<foo bar="baz">qux</foo>'),'toXML');
	});
	test('toXMLObj', function() {
		ok(iddqd.internal.native.string.toXMLObj.apply('<foo bar="baz">qux</foo>').bar==='baz','toXMLObj');
	});
	test('generate', function() {
		ok(!!iddqd.internal.native.string.generate(),'generate');
	});
	test('nameCase', function() {
		ok(iddqd.internal.native.string.nameCase.apply('foo bar')==='Foo Bar','nameCase');
	});
	test('camelCase', function() {
		ok(iddqd.internal.native.string.camelCase.apply('foo bar baz')==='fooBarBaz','camelCase');
		ok(iddqd.internal.native.string.camelCase.apply('foo-bar-baz')==='fooBarBaz','camelCase');
		ok(iddqd.internal.native.string.camelCase.apply('foo_bar_baz')==='fooBarBaz','camelCase');
	});
	test('dash', function() {
		ok(iddqd.internal.native.string.dash.apply('foo bar baz')==='foo-bar-baz','dash');
		ok(iddqd.internal.native.string.dash.apply('fooBarBaz')==='foo-bar-baz','dash');
		ok(iddqd.internal.native.string.dash.apply('foo_bar_baz')==='foo-bar-baz','dash');
	});
	test('underscore', function() {
		ok(iddqd.internal.native.string.underscore.apply('foo bar baz')==='foo_bar_baz','underscore');
		ok(iddqd.internal.native.string.underscore.apply('fooBarBaz')==='foo_bar_baz','underscore');
		ok(iddqd.internal.native.string.underscore.apply('foo-bar-baz')==='foo_bar_baz','underscore');
	});
	test('augment', function() {
		ok(iddqd.internal.native.string.augment(),('').nameCase,'augment');
	});
	test('normalize', function() {
		iddqd.internal.native.string.normalize();
		ok(iddqd.internal.native.string.camelCase('foo bar baz')==='fooBarBaz','normalize');
	});
	test('normalize', function() {
		iddqd.internal.native.string.normalize();
		ok(iddqd.internal.native.string.camelCase('foo bar baz')==='fooBarBaz','normalize');
	});

	module('iddqd.internal.native.array.js');
	// todo iddqd.internal.native.array.js

	module('iddqd.internal.native.number.js');
	// todo iddqd.internal.native.number.js

	module('iddqd.internal.native.object.js');
	// todo iddqd.internal.native.object.js

	module('iddqd.internal.native.date.js');
	// todo iddqd.internal.native.date.js

	// todo etc

})();

/* jshint ignore:end */