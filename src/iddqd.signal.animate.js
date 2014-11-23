/**
 * Keyframe dispatcher using requestAnimationFrame for continuous animation.
 * The callback for this signal is Function(deltaT,iCurMillis,iFrameNr)
 * todo: possibly stop when last signal listener is removed
 * @name iddqd.signal.animate
 * @type Signal
 */
iddqd.ns('iddqd.signal.animate',iddqd.signal(function(signal){
	'use strict';

	var requestAnimationFrame = iddqd.uses(iddqd.requestAnimationFrame,'Include iddqd.requestAnimationFrame')
		,fDeltaT = 0
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
		requestAnimationFrame(animate);
	}
	animate();
}));
