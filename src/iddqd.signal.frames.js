// todo: implement
/**
 * Wait a couple of frames before dispatching.
 * @name iddqd.signals.frames
 * @type Signal
 */
/*
oSignals.frames = (function(){
	var fnAdd = function(fn,frames){
		var sgFrame = new signals.Signal()
			,fnCount = function(){
				frames--;
				if (frames<=0) {
					oSignals.animate.remove(fnCount);
					sgFrame.dispatch();
					sgFrame.dispose();
				}
			}
		;
		oSignals.animate.add(fnCount);
		return sgFrame.add(fn);
	};
	return {
		add: fnAdd
		,addOnce: fnAdd
	};
})();*/
