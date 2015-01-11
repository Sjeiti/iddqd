/* global module, test, ok */
(function(){
	'use strict';

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
})();