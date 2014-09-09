/* Signal for scrolling.<br/>
 * The callback for this signal is Function(scrollLeft,scrollTop)
 * @name iddqd.signal.scroll
 * @type Signal
 */
iddqd.ns('iddqd.signal.scroll',iddqd.signal(function(signal){
	window.addEventListener('scroll',function(e){
		var mBody = document.body;
		signal.dispatch(e,mBody.scrollLeft,mBody.scrollTop);
	},false);
}));