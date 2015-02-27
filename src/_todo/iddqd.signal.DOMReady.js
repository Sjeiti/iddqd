/**
 * Dispatched when the DOM is ready.<br/>
 * After dispatching any newly added functions will immediately be called.
 * @name iddqd.signal.DOMReady
 * @type Signal
 */
iddqd.ns('iddqd.signal.DOMReady',iddqd.signal(function(signal){
	'use strict';

	var fnDispatch = function(){
		// override 'add' and 'addOnce' before dispatch since DOMReady can only be fired once
		signal.add = signal.addOnce = function(fn){fn();};
		signal.dispatch();
	};
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded',fnDispatch,false);
	} else document.onreadystatechange = function(){
		if (document.readyState=='interactive') fnDispatch();
	};
}));