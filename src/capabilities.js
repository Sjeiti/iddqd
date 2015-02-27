/* global DocumentTouch */
// todo document
export default (()=>{
	const oInfo = window.navigator
		,sTypeTouch = typeof window.Touch
	;
	return {
		standalone: !!oInfo.standalone
		,touch: !!((sTypeTouch=='object'||sTypeTouch=='function') || window.DocumentTouch && document instanceof DocumentTouch)
	};
})();
