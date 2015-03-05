/*global QUnit,test,ok*/
import * as string from './../../../src/native/string';
//import type from './../../../src/type';

QUnit.module('string');
test('pad', function() {
	var pad = string.pad;
	ok(pad('a',3,'b')==='abb','pad');
	ok(pad('a',3,'bc')==='abc','pad');
	ok(pad('a',3,'b',true)==='bba','pad left');
	ok(pad('aac',3,'b')==='aac','pad');
	ok(pad('aaac',3,'b')==='aaac','pad');
});
test('toType', function() {
	var toType = string.toType;
	ok(toType('a')==='a','toType string');
	ok(toType('1')===1,'toType number');
	ok(toType('0.1')===0.1,'toType number');
	ok(toType('true')===true,'toType boolean');
});
test('toXML', function() {
	ok(!!string.toXML('<foo bar="baz">qux</foo>'),'toXML');
});
//test('toXMLObj', function() {
//	//console.log('toXML',string.toXML('<foo bar="baz">qux</foo>')); // log)
//	//console.log('toXMLObj',string.toXMLObj('<foo bar="baz">qux</foo>')); // log)
//	ok(string.toXMLObj('<foo bar="baz">qux</foo>').bar==='baz','toXMLObj');
//});
//test('generate', function() {
//	ok(!!string.generate(),'generate');
//});
test('nameCase', function() {
	ok(string.nameCase('foo bar')==='Foo Bar','nameCase');
});
test('camelCase', function() {
	var camelCase = string.camelCase;
	ok(camelCase('foo bar baz')==='fooBarBaz','camelCase');
	ok(camelCase('foo-bar-baz')==='fooBarBaz','camelCase');
	ok(camelCase('foo_bar_baz')==='fooBarBaz','camelCase');
});
test('dash', function() {
	var dash = string.dash;
	ok(dash('foo bar baz')==='foo-bar-baz','dash');
	ok(dash('fooBarBaz')==='foo-bar-baz','dash');
	ok(dash('foo_bar_baz')==='foo-bar-baz','dash');
});
test('underscore', function() {
	var underscore = string.underscore;
	ok(underscore('foo bar baz')==='foo_bar_baz','underscore');
	ok(underscore('fooBarBaz')==='foo_bar_baz','underscore');
	ok(underscore('foo-bar-baz')==='foo_bar_baz','underscore');
});
test('augment', function() {
	var pad = string.pad;
	ok(pad('a',3,'b')==='abb','pad');
	ok(pad('a',3,'bc')==='abc','pad');
	ok(pad('a',3,'b',true)==='bba','pad left');
	ok(pad('aac',3,'b')==='aac','pad');
	ok(pad('aaac',3,'b')==='aaac','pad');
});
test('isUrl', function() {
	var isUrl = string.isUrl;
	ok(isUrl('foo bar baz')===false,'not url');
	ok(isUrl('//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css')===true,'CDN url');
	ok(isUrl('https://gmail.com/')===true,'https url');
	ok(isUrl('http://google.com/')===true,'http url');
	ok(isUrl('www.filmacademie.nl')===false,'invalid strict');
	ok(isUrl('www.filmacademie.nl',false)===true,'valid non-strict');
});
test('toSlug', function() {
	var toSlug = string.toSlug;
	ok(toSlug('Foo bär bAz?')==='foo-bar-baz','Foo bär bAz');
});
test('normalize', function() {
	ok(string.camelCase('foo bar baz')==='fooBarBaz','normalize');
});