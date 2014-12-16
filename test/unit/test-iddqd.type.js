/* global module, test, ok */
/*jshint -W058 */
(function(undefined){
	'use strict';

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

})();