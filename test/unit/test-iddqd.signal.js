/* global module, test, ok */
(function(){
	'use strict';

	module('iddqd.signal');
	test('iddqd.signal', function(){
		/*iddqd.signal.DOMReady.add(function() {
			alert('DOMReady');
		});*/
		var iTestSignal = 0
			,sgTest = iddqd.signal(function(){//signal
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
})();