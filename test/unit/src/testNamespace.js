/*global QUnit,test,ok*/
import namespace from './../../../src/namespace';
QUnit.module('namespace');
test('iddqd.ns', function(){
	/*global  	a*/
	ok((namespace('a',{b:{},c:true}),a.c),'namespace create');
	ok((namespace('a.b.c',{d:true}),a.b.c.d),'namespace append');
	//ok((namespace('a.b',{d:true}),a.b.d),'namespace overwrite');
});