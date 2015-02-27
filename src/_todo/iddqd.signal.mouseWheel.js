/**
 * Signal for mouseWheel.<br/>
 * The callback for this signal is Function(wheelDelta)
 * @name iddqd.signal.mouseWheel
 * @type Signal
 */
iddqd.ns('iddqd.signal.mouseWheel',iddqd.signal(function(signal){
	'use strict';

	window.addEventListener('mousewheel',function(e){
		signal.dispatch(e.wheelDelta,e);
	},false);
}));