/**
 * Fires an event
 * @name fireEvent
 * @method
 * @param {Object} target The target
 * @param {String} evt The event
 */
module.exports = (target,evt) => {
	if (document.createEventObject){ // dispatch for IE
		return target.fireEvent('on'+evt,document.createEventObject());
	} else { // dispatch for others
		const oEvt = document.createEvent('HTMLEvents');
		oEvt.initEvent(evt,true,true); // event type,bubbling,cancelable
		return !target.dispatchEvent(oEvt);
	}
};