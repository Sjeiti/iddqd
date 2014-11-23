/**
 * Dispatched when the readyState changes (mainly for finding state=='interactive', otherwise iddqd.signals.DOMReady suffices).<br/>
 * The callback for this signal is Function(readyState)
 * @name iddqd.signal.readyState
 * @type Signal
 */
iddqd.ns('iddqd.signal.readyState',iddqd.signal(function(signal){
	'use strict';

	document.onreadystatechange = function () {
		signal.dispatch(document.readyState);
	};
}));