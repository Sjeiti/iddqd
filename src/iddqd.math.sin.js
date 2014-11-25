/**
 * A memoized sine function
 * @name iddqd.math.sin
 * @method
 * @param {Number} f
 * @returns {Number}
 * @todo document
 */
iddqd.ns('iddqd.math.sin',(function() {
	'use strict';

	var aSine = []
		,iSine = 0
		,PI = Math.PI
		,PI2 = 2*PI
		,PIH = PI/2
	;
	function set(step) {
		iSine = step;
		aSine.length = 0;
		for (var i=0;i<iSine;i++) {
			aSine.push(Math.sin(i/iSine*PI2));
		}
		return {sin:sin,cos:cos};
	}
	function sin(f) {
		return aSine[((f/PI2)*iSine%iSine)<<0];
	}
	function cos(f) {
		return sin(f+PIH);
	}
	//
	sin.set = set;
	cos.set = set;
	//
	return sin;
})());
/**
 * A memoized cosine function
 * @name iddqd.math.cos
 * @method
 * @param {Number} f
 * @returns {Number}
 * @todo document
 */
iddqd.ns('iddqd.math.cos',iddqd.math.sin.set(360).cos);

