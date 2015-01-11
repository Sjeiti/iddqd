/* global module, test, ok */
(function(undefined){
	'use strict';

	var vector = iddqd.math.vector;

	module('iddqd.math.vector.js');
	test('empty', function() {
		var v = vector();
		ok(!!v,'exists');
		ok(v.getX()===undefined,'no X');
		ok(v.getY()===undefined,'no Y');
		ok(isNaN(v.size()),'no size');
	});
	test('normal', function() {
		var v = vector(3,7);
		ok(!!v,'exists');
		ok(v.getX()===3,'getX');
		ok(v.getY()===7,'getY');
		ok(v.size()===Math.sqrt(3*3+7*7),'size');
	});
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
})();