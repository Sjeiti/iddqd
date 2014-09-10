/* global module */
/* global test */
/* global asyncTest */
/* global ok */
/* global start */
/*jshint -W058 */
(function(undefined){

	'use strict';

	QUnit.config.hidepassed = true;

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
			iddqd.loop(a,function(i){
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
		ok(iddqd.type(Number.MIN_VALUE)===iddqd.type.FLOAT,'Number.MIN_VALUE');
		ok(iddqd.type(Number.MAX_VALUE)===iddqd.type.INT,'Number.MAX_VALUE');
	});
	test('float', function() {
		ok(iddqd.type(1.1)===iddqd.type.FLOAT,'1.1');
		ok(iddqd.type(Math.PI)===iddqd.type.FLOAT,'Math.PI');
		ok(iddqd.type(1E-4)===iddqd.type.FLOAT,'1E-4');
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
		ok(iddqd.type(/\s/gi)===iddqd.type.REGEXP,'/\\s/gi');
		ok(iddqd.type(new RegExp(''))===iddqd.type.REGEXP,'new RegExp');
	});
	test('date', function() {
		ok(iddqd.type(new Date())===iddqd.type.DATE,'new Date');
	});


	module('iddqd.capabilities.js');
	test('standalone', function() {
		ok(iddqd.type(iddqd.capabilities.standalone)===iddqd.type.BOOLEAN,'standalone');
	});
	// todo touch


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


	module('iddqd.internal.native.string.js');
	test('pad', function() {
		var pad = iddqd.internal.native.string.pad;
		ok(pad('a',3,'b')==='abb','pad');
		ok(pad('a',3,'bc')==='abc','pad');
		ok(pad('a',3,'b',true)==='bba','pad left');
		ok(pad('aac',3,'b')==='aac','pad');
		ok(pad('aaac',3,'b')==='aaac','pad');
	});
	test('toType', function() {
		var toType = iddqd.internal.native.string.toType;
		ok(toType('a')==='a','toType string');
		ok(toType('1')===1,'toType number');
		ok(toType('0.1')===0.1,'toType number');
		ok(toType('true')===true,'toType boolean');
	});
	test('toXML', function() {
		ok(!!iddqd.internal.native.string.toXML('<foo bar="baz">qux</foo>'),'toXML');
	});
	test('toXMLObj', function() {
		//console.log('toXML',iddqd.internal.native.string.toXML('<foo bar="baz">qux</foo>')); // log)
		//console.log('toXMLObj',iddqd.internal.native.string.toXMLObj('<foo bar="baz">qux</foo>')); // log)
		ok(iddqd.internal.native.string.toXMLObj('<foo bar="baz">qux</foo>').bar==='baz','toXMLObj');
	});
	test('generate', function() {
		ok(!!iddqd.internal.native.string.generate(),'generate');
	});
	test('nameCase', function() {
		ok(iddqd.internal.native.string.nameCase('foo bar')==='Foo Bar','nameCase');
	});
	test('camelCase', function() {
		var camelCase = iddqd.internal.native.string.camelCase;
		ok(camelCase('foo bar baz')==='fooBarBaz','camelCase');
		ok(camelCase('foo-bar-baz')==='fooBarBaz','camelCase');
		ok(camelCase('foo_bar_baz')==='fooBarBaz','camelCase');
	});
	test('dash', function() {
		var dash = iddqd.internal.native.string.dash;
		ok(dash('foo bar baz')==='foo-bar-baz','dash');
		ok(dash('fooBarBaz')==='foo-bar-baz','dash');
		ok(dash('foo_bar_baz')==='foo-bar-baz','dash');
	});
	test('underscore', function() {
		var underscore = iddqd.internal.native.string.underscore;
		ok(underscore('foo bar baz')==='foo_bar_baz','underscore');
		ok(underscore('fooBarBaz')==='foo_bar_baz','underscore');
		ok(underscore('foo-bar-baz')==='foo_bar_baz','underscore');
	});
	test('augment', function() {
		ok(iddqd.internal.native.string.augment(),('').nameCase,'augment');
		ok('a'.pad(3,'b')==='abb','pad');
		ok('a'.pad(3,'bc')==='abc','pad');
		ok('a'.pad(3,'b',true)==='bba','pad left');
		ok('aac'.pad(3,'b')==='aac','pad');
		ok('aaac'.pad(3,'b')==='aaac','pad');
	});
	test('normalize', function() {
		iddqd.internal.native.string.normalize();
		ok(iddqd.internal.native.string.camelCase('foo bar baz')==='fooBarBaz','normalize');
	});
	test('normalize', function() {
		iddqd.internal.native.string.normalize();
		ok(iddqd.internal.native.string.camelCase('foo bar baz')==='fooBarBaz','normalize');
	});

	module('iddqd.internal.native.array.js',{setup:function(){
		this.a = [4,5,-3,-1.1,2,9,3,9,1.1];
	}});
	test('largest', function() {
		ok(iddqd.internal.native.array.largest(this.a)===9,'largest');
	});
	test('smallest', function() {
		ok(iddqd.internal.native.array.smallest(this.a)===-3,'smallest');
	});
	test('rnd', function() {
		var i = 100
			,fRnd
			,bDifferent = false
			,rnd = iddqd.internal.native.array.rnd;
		while (i--) bDifferent = bDifferent||rnd(this.a)!==rnd(this.a);
		ok(bDifferent,'rnd');
	});
	test('unique', function() {
		ok(iddqd.internal.native.array.unique(this.a)===1,'unique deletions');
		ok(iddqd.internal.native.array.sum(this.a)===20,'unique sum');
	});
	// todo: copy
	test('shuffle', function() {
		ok(this.a.join()!==iddqd.internal.native.array.shuffle(this.a).join(),'shuffle');
	});
	test('sum', function() {
		ok(iddqd.internal.native.array.sum(this.a)===29,'sum');
	});

	module('iddqd.internal.native.number.js');
	test('formatSize', function() {
		ok(iddqd.internal.native.number.formatSize(12436798)==='12MB','formatSize');
	});

	module('iddqd.internal.native.object.js');
	test('extend', function() {
		var o = iddqd.internal.native.object.extend({a:0,b:2},{a:1,c:3});
		ok(o.a===0&&o.b===2&&o.c===3,'extend');
	});
	test('first', function() {
		ok(iddqd.internal.native.object.first({c:4,a:0,b:2})===4,'first');
	});

	module('iddqd.internal.native.date.js',{setup:function(){
		this.date1 = new Date(2014,8-1,19,21,11,23);
		this.date2 = new Date(2014,8-1,19,11,59,59);
		this.date3 = new Date(2014,8-1,19,12,1,1);
	}});
	test('toFormatted', function() {
		var date = iddqd.internal.native.date
			,toFormatted = date.toFormatted;
		ok(toFormatted(this.date1)==='2014-08-19','toFormatted default');
		ok(toFormatted(this.date1,'d/m/Y')==='19/08/2014','toFormatted d/m/Y');
		ok(toFormatted(this.date1,'Y-m-d H:i:s')==='2014-08-19 21:11:23','toFormatted Y-m-d H:i:s');
		ok(toFormatted(this.date1,'ga')==='9pm','toFormatted ga:pm');
		ok(toFormatted(this.date3,'ga')==='12pm','toFormatted ga:pm');
		ok(toFormatted(this.date2,'ga')==='11am','toFormatted ga:am');
		ok(toFormatted().match(/^\d{4}-\d{2}-\d{2}$/),'toFormatted no param');
		date.format = 'd/m/Y';
		ok(toFormatted(this.date1)==='19/08/2014','toFormatted set default');
	});


	module('iddqd.math.color.js',{setup:function() {
		var color = iddqd.math.color;
		this.color1 = color('#f00');
		this.color2 = color(16711680);
		this.color3 = color(0,255,0);
	}});
	test('color', function() {
		var color = iddqd.math.color;
		ok(this.color1.r===this.color2.r&&this.color1.g===this.color2.g&&this.color1.b===this.color2.b,'1===2');
		ok(this.color3.g===255,'green');
	});
	test('integer', function() {
		var color = iddqd.math.color;
		ok(this.color1.integer===this.color2.integer,'1===2');
		ok(this.color1.integer===16711680,'16711680');
	});
	// todo integer
	// todo r
	// todo g
	// todo b
	// todo hex
	// todo get
	// todo set
	// todo randomize
	// todo clone
	// todo rgba
	// todo add
	// todo subtract
	// todo average
	// todo multiply
	// todo divide
	// todo brightness
	// todo huey
	// todo saturation
	// todo lightness
	// todo toString

	module('iddqd.math.prng.js');
	// todo iddqd.math.prng.js
	// todo seed
	// todo rnd
	// todo random

	module('iddqd.math.vector.js');
	// todo iddqd.math.vector.js
	// todo getX
	// todo getY
	// todo setX
	// todo setY
	// todo set
	// todo setVector
	// todo size
	// todo setSize
	// todo normalize
	// todo normalized
	// todo distance
	// todo radians
	// todo degrees
	// todo angle
	// todo rotate
	// todo rotation
	// todo add
	// todo addNumber
	// todo addVector
	// todo subtract
	// todo subtractNumber
	// todo subtractVector
	// todo multiply
	// todo multiplyNumber
	// todo multiplyVector
	// todo divide
	// todo divideNumber
	// todo divideVector
	// todo average
	// todo uv
	// todo inTriangle
	// todo map
	// todo clone
	// todo drop
	// todo toString
	// todo toArray


	module('iddqd.network.jsonp.js');
	// todo iddqd.network.jsonp.js

	module('iddqd.network.xhttp.js');
	// todo iddqd.network.xhttp.js


	/*
	todo: fails
	module('iddqd.requestAnimationFrame.js');
	asyncTest('iddqd.requestAnimationFrame',function () {
		iddqd.requestAnimationFrame(next);
		function next(imageLoaded){
			ok(true,'requestAnimationFrame');
			start();
		}
	});
	*/


	module('iddqd.pattern.js');
	test('iddqd.pattern.pool', function(){
		var iCalc = 0
			,makeChicken = iddqd.pattern.pool(makeChicken)
			,oldChicken,youngChicken;
		function makeChicken(age,eggs) {
			var oReturn = {age:age,eggs:eggs,reset:reset};
			function reset(age,eggs) {
				oReturn.age = age;
				oReturn.eggs = eggs;
			}
			return oReturn;
		}
		youngChicken = makeChicken(1,2);
		ok(youngChicken.age===1&&youngChicken.eggs===2,'pool 1st instance');
		youngChicken.drop();
		oldChicken = makeChicken(2,0);
		ok(oldChicken.age===2&&oldChicken.eggs===0,'pool 2nd instance');
		ok(oldChicken===youngChicken,'pool same instance');
	});
	test('iddqd.pattern.memoize', function(){
		var iCalc = 0
			,add = iddqd.pattern.memoize(add);
		function add(one,two) {
			iCalc++;
			return one+two;
		}
		add(2,3);
		add(2,3);
		ok(iCalc===1,'memoize');
	});


	module('iddqd.log.js');
	// todo iddqd.log.js


	module('iddqd.image.js');
	// todo iddqd.image.js


	module('iddqd.style.js');
	// todo iddqd.style.js


	module('iddqd.storage.js');
	['session','local','cookie'].forEach(function(type) {
		test('iddqd.storage.'+type, function(){
			var storage = iddqd.storage[type]
				,sName = 'foo'+Date.now();
			ok(storage.get(sName)===undefined,type+'.get()');
			ok(storage.set(sName,{a:3}).a===3,type+'.set()');
			ok(storage.get(sName)!==undefined,type+'.get() after set');
			ok(storage.clear(sName)===undefined,type+'.clear(key)');
			ok(storage.get(sName)===undefined,type+'.get() after clear key');
			ok(storage.get(sName,{b:4}).b===4,type+'.get() with default');
			ok(storage.clear()===undefined,type+'.clear()');
			ok(storage.get(sName)===undefined,type+'.get() after clear');
		});
	});


	module('iddqd.ui.scroll.js');
	// todo iddqd.ui.scroll.js


	module('iddqd.utils.ga.js');
	// todo iddqd.utils.ga.js


	module('iddqd.signal');
	test('iddqd.signal', function(){
		/*iddqd.signal.DOMReady.add(function() {
			alert('DOMReady');
		});*/
		var iTestSignal = 0
			,sgTest = iddqd.signal(function(signal){
				iTestSignal++;
			})
		;
		ok(sgTest,'iddqd.signal()');
		ok(iTestSignal===0,'iddqd.signal() not initialized');
		ok(sgTest.add(function(i){iTestSignal=i;}),'iddqd.signal().add()');
		ok(iTestSignal===1,'iddqd.signal() initialized');
		ok(sgTest.dispatch(3)===undefined,'iddqd.signal() dispatches');
		ok(iTestSignal===3,'iddqd.signal() dispatched');
	});
	test('iddqd.signal.DOMReady', function(){
		ok(true,'iddqd.signal()');
	});
	test('iddqd.signal.readyState', function(){
		ok(true,'iddqd.signal()');
	});
	test('iddqd.signal.resize', function(){
		ok(true,'iddqd.signal()');
	});
	test('iddqd.signal.breakpoint', function(){
		iddqd.signal.breakpoint.add(function(point) {
			alert(point);
		});
		//alert(iddqd.signal.breakpoint.points);
		ok(true,'iddqd.signal()');
	});



	module('iddqd.image.js');
	asyncTest('iddqd.image.load uri',function () {
		var sImageUri = 'data/image320.jpg'
			,sImageName = sImageUri.split('/').pop()
			,oImageLoad = iddqd.image.load(sImageUri,loadCallback);
		ok(!!oImageLoad.load,'oImageLoad.load');
		ok(oImageLoad.getResult()===undefined,'oImageLoad.getResult undefined');
		function loadCallback(imageLoaded){
			ok(true,'loadCallback');
			ok(oImageLoad.getResult()===imageLoaded,'oImageLoad.getResult');
			ok(imageLoaded.width===320,'width');
			ok(imageLoaded.height===256,'height');
			ok(imageLoaded.uri===sImageUri,'uri');
			ok(imageLoaded.name===sImageName,'name');
			ok(imageLoaded.type==='jpg','type');
			start();
		}
	});
	asyncTest('iddqd.image.load anonymous',function () {
		var sImageUri = 'data/image.php?img=image320.jpg&foobar'
			,sImageName = sImageUri.split('/').pop()
			,oImageLoad = iddqd.image.load(sImageUri,loadCallback);
		ok(!!oImageLoad.load,'oImageLoad.load');
		ok(oImageLoad.getResult()===undefined,'oImageLoad.getResult undefined');
		function loadCallback(imageLoaded){
			ok(true,'loadCallback');
			ok(oImageLoad.getResult()===imageLoaded,'oImageLoad.getResult');
			ok(imageLoaded.width===320,'width');
			ok(imageLoaded.height===256,'height');
			ok(imageLoaded.uri===sImageUri,'uri');
			ok(imageLoaded.name===sImageName,'name');
			ok(imageLoaded.type==='jpg&foobar','type'); // todo: wrong
			start();
		}
	});
	asyncTest('iddqd.image.load error',function () {
		var sImageUri = 'data/image.gif'
			,oImageLoad = iddqd.image.load(sImageUri,iddqd.fn,loadError);
		ok(!!oImageLoad.load,'oImageLoad.load');
		ok(oImageLoad.getResult()===undefined,'oImageLoad.getResult undefined');
		function loadError(error){
			ok(true,'loadError');
			ok(iddqd.type(error)===iddqd.type.EVENT,'event');
			ok(error.type==='error','type is error');
			start();
		}
	});


})();