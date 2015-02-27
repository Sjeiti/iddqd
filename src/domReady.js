/**
 * Method with callback function to be executed when DOM has finished loading. If DOM has already finished callback is executed immediately.
 * @name domReady
 * @method
 * @param {Function} callback Callback function.
 * @param {string} state Listen to particular state
 */
export default new Promise((resolve) => {
	function checkReadyState(fn) {
		document.readyState==='interactive'&&fn();
	}
	if (document.addEventListener) document.addEventListener('DOMContentLoaded',resolve,false);
	else document.onreadystatechange = checkReadyState.bind(null,resolve);
});