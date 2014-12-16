/* global module, test, ok */
(function(){
	'use strict';

	var color = iddqd.math.color;

	module('iddqd.math.color.js',{setup:function() {
		this.color1 = color('#f00');
		this.color2 = color(16711680);
		this.color3 = color(0,255,0);
	}});
	test('color', function() {
		ok(this.color1.r===this.color2.r&&this.color1.g===this.color2.g&&this.color1.b===this.color2.b,'1===2');
		ok(this.color3.g===255,'green');
	});
	test('integer', function() {
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
})();