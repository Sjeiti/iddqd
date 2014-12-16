/* global module, test, ok */
(function(){
	'use strict';

	module('iddqd.pattern.js');
	test('iddqd.pattern.pool', function(){
		var makeChicken = iddqd.pattern.pool(makeChicken_)
			,oldChicken,youngChicken;
		function makeChicken_(age,eggs) {
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
			,add = iddqd.pattern.memoize(add_);
		function add_(one,two) {
			iCalc++;
			return one+two;
		}
		add(2,3);
		add(2,3);
		ok(iCalc===1,'memoize');
	});
	// todo: callbackToPromise
	// todo: denodify
})();