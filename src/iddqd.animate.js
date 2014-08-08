/**
 * Animation methods
 * The namespace is really the exposed private method {@link iddqd.animate.animate animate}
 * @summary Animation methods
 * @namespace iddqd.animate
 */
iddqd.ns('iddqd.animate',(function(iddqd,uses){
	'use strict';
	/**
	 * Function that executes the callback asap.
	 * @name iddqd.animate.nextFrame
	 * @method
	 */
	var nextFrame = (function(){
			return window.requestAnimationFrame||
				window.webkitRequestAnimationFrame||
				window.mozRequestAnimationFrame||
				window.oRequestAnimationFrame||
				window.msRequestAnimationFrame||
				function(callback){
					window.setTimeout(callback, 1000/60);
				};
		})()
		,signals = uses(iddqd.signals)
	;
	/**
	 * Animates something
	 * @name animate
	 * @memberof iddqd.animate
	 * @method
	 * @private
	 * @param {Number} duration Length of animation in milliseconds.
	 * @param {Function} step Function called each step with a progress parameter (a 0-1 float).
	 * @param {Function} complete Callback function when animation finishes.
	 * @return {Object} An animation object with a cancel function.
	 */
	function animate(duration,step,complete){
		var t = iddqd.millis()
			,bRunning = true
			,fnRun = function(){
				if (bRunning) {
					var iTCurrent = iddqd.millis()-t;
					if (iTCurrent<duration) {
						step(iTCurrent/duration);
						nextFrame(fnRun);
					} else {
						step(1);
						complete&&complete();
					}
				}
			};
		function cancel(){
			bRunning = false;
		}
		fnRun();
		return {
			cancel: cancel
		};
	}

	/**
	 * Keyframe dispatcher using requestAnimationFrame.
	 * The callback for this signal is Function(deltaT)
	 * @name iddqd.signals.animate
	 * @type Signal
	 */
	signals.create('animate',function(signal){
		var fDeltaT = 0
			,iCurMillis
			,iLastMillis = iddqd.millis()
			,iMilliLen = 10
			,aMillis = (function(a,n){
				for (var i=0;i<iMilliLen;i++) a.push(n);
				return a;
			})([],iLastMillis)
			,iFrameNr = 0;
		function animate(){
			iCurMillis = iddqd.millis();
			aMillis.push(iCurMillis-iLastMillis);
			aMillis.shift();
			fDeltaT = 0;
			for (var i=0;i<iMilliLen;i++) fDeltaT += aMillis[i];
			iLastMillis = iCurMillis;
			signal.dispatch(fDeltaT/iMilliLen,iCurMillis,iFrameNr);
			nextFrame(animate);
		}
		animate();
	});


	animate.nextFrame = nextFrame;
	return animate;
})(iddqd,iddqd.uses));
