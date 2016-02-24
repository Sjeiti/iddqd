/**
 * Dispatched when the viewport resizes.<br/>
 * The callback for this signal is Function(newWidth,newHeight,oldWidth,oldHeight)
 * @name iddqd.signal.resize
 * @type Signal
 */
iddqd.ns('iddqd.signal.fullscreen',iddqd.signal(function(signal){
	'use strict';

	['','webkit','moz','ms'].forEach(function(prefix){
		document.addEventListener(prefix+'fullscreenchange', handleFullscreenEvent, false);
	});

	function handleFullscreenEvent(e) {
		var fullscreenElement = getFullscreenElement();
		signal.dispatch(!!fullscreenElement,fullscreenElement);
	}

	function getFullscreenElement(){
		return document.fullscreenElement
			||document.mozFullScreenElement
			||document.webkitFullscreenElement
			||document.msFullscreenElement;
	}

	function getFullscreenState(){
		return !!getFullscreenElement();
	}

	Object.defineProperty(signal, 'element', {
		enumerable: false
		,configurable: false
		,get: getFullscreenElement
	});

	Object.defineProperty(signal, 'state', {
		enumerable: false
		,configurable: false
		,get: getFullscreenState
	});

}));