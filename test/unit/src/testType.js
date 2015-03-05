/*global QUnit,test,ok*/
import type from './../../../src/type';

QUnit.module('type');
test('undefined',ok.bind(null,type(undefined)===type.UNDEFINED,'undefined'));
test('null',ok.bind(null,type(null)===type.NULL,'null'));
test('object',()=>{
	ok(type({})===type.OBJECT,'object');
	ok(type(arguments)===type.OBJECT,'arguments');
});
test('array',()=>{
	ok(type([])===type.ARRAY,'[]');
	ok(type(new Array())===type.ARRAY,'new Array');
});
test('node',()=>{
	ok(type(document.createElement('a'))===type.NODE,'node');
});
/*test('event',()=>{
	ok(type(new Event('foo'))===type.EVENT,'Event');
	ok(type(new CustomEvent('bar',{}))===type.EVENT,'CustomEvent');
	ok(type(document.createEvent('Event'))===type.EVENT,'document.createEvent');
});*/
test('function',()=>{
	ok(type(function(){})===type.FUNCTION,'function');
});
test('string',()=>{
	ok(type('a')===type.STRING,'a');
	ok(type(String())===type.STRING,'String()');
});
test('boolean',()=>{
	ok(type(true)===type.BOOLEAN,'true');
	ok(type(false)===type.BOOLEAN,'false');
});
test('int',()=>{
	ok(type(0)===type.INT,'0');
	ok(type(1)===type.INT,'1');
	ok(type(0xFF)===type.INT,'0xFF');
	ok(type(1E4)===type.INT,'1E4');
	ok(type(Number.MIN_VALUE)===type.FLOAT,'Number.MIN_VALUE');
	ok(type(Number.MAX_VALUE)===type.INT,'Number.MAX_VALUE');
});
test('float',()=>{
	ok(type(1.1)===type.FLOAT,'1.1');
	ok(type(Math.PI)===type.FLOAT,'Math.PI');
	ok(type(1E-4)===type.FLOAT,'1E-4');
});
test('nan',()=>{
	ok(type(NaN)===type.NAN,'NaN');
	ok(type(0/0)===type.NAN,'0/0');
});
test('infinite',()=>{
	ok(type(Infinity)===type.INFINITE,'Infinity');
	ok(type(2/0)===type.INFINITE,'2/0');
	ok(type(Number.POSITIVE_INFINITY)===type.INFINITE,'Number.POSITIVE_INFINITY');
	ok(type(Number.NEGATIVE_INFINITY)===type.INFINITE,'Number.NEGATIVE_INFINITY');
});
test('regexp',()=>{
	ok(type(/\s/gi)===type.REGEXP,'/\\s/gi');
	ok(type(new RegExp(''))===type.REGEXP,'new RegExp');
});
test('date',()=>{
	ok(type(new Date())===type.DATE,'new Date');
});