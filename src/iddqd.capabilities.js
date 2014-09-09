/* global DocumentTouch */
// todo document
iddqd.ns('iddqd.capabilities',(function(){
	'use strict';
	var oInfo = window.navigator
		,sTypeTouch = typeof window.Touch
	;
	return {
		standalone: !!oInfo.standalone
		,touch: !!((sTypeTouch=='object'||sTypeTouch=='function') || window.DocumentTouch && document instanceof DocumentTouch)
	};
})());
