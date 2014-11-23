/**
 * Dispatched when the device rotates.<br/>
 * The callback for this signal is Function(oldOrientation,newOrientation)
 * @name iddqd.signal.orientation
 * @type Signal
 */
iddqd.ns('iddqd.signal.orientation',iddqd.signal(function(signal){
	'use strict';

	if(iddqd.capabilities.touch) {
		var iOrientation = window.orientation;
		window.addEventListener('orientationchange',function(){
			signal.dispatch(iOrientation,window.orientation);
			iOrientation = window.orientation;
		});
	}
}));