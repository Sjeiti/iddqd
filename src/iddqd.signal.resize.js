/**
 * Dispatched when the viewport resizes.<br/>
 * The callback for this signal is Function(newWidth,newHeight,oldWidth,oldHeight)
 * @name iddqd.signal.resize
 * @type Signal
 */
iddqd.ns('iddqd.signal.resize',iddqd.signal(function(signal){
	var win = window,
		doc = document,
		docElm = doc.documentElement,
		mBody = doc.body,//getElementsByTagName('body')[0],
		iW = win.innerWidth || docElm.clientWidth || mBody.clientWidth,
		iH = win.innerHeight|| docElm.clientHeight|| mBody.clientHeight;
	win.addEventListener('resize', function(docElm){
		var  iOldW = iW
			,iOldH = iH;
		iW = win.innerWidth || docElm.clientWidth || mBody.clientWidth;
		iH = win.innerHeight|| docElm.clientHeight|| mBody.clientHeight;
		signal.dispatch(iW,iH,iOldW,iOldH);
	},false);
}));