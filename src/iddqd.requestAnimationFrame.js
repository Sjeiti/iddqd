/**
 * Function that executes the callback asap.
 * @name iddqd.requestAnimationFrame
 * @method
 */
iddqd.ns('iddqd.requestAnimationFrame'
	,window.requestAnimationFrame||
	window.webkitRequestAnimationFrame||
	window.mozRequestAnimationFrame||
	window.oRequestAnimationFrame||
	window.msRequestAnimationFrame||
	function(callback){
		window.setTimeout(callback, 1000/60);
	}
);