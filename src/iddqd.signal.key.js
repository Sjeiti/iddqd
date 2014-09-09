// todo: document, maybe remove key ns
iddqd.ns('iddqd.signal.key',(function(){
	var aKeys = [];
	function keypress(){
		oSignals.keypress.dispatch(aKeys);
	}
	iddqd.ns('iddqd.signal.keydown',iddqd.signal(function(signal){
		document.addEventListener('keydown',function(e){
			var iKeyCode = e.keyCode;
			aKeys[iKeyCode] = true;
			oSignals.animate.add(keypress);
			signal.dispatch(iKeyCode);
			//
			oSignals.keypress.add(fnEmpty).detach();
			oSignals.keyup.add(fnEmpty).detach();
		});
	}));
	iddqd.ns('iddqd.signal.keypress',iddqd.signal(function(signal){
		oSignals.keyup.add(fnEmpty).detach();
		oSignals.keydown.add(fnEmpty).detach();
		signal.keys = aKeys;
	}));
	iddqd.ns('iddqd.signal.keyup',iddqd.signal(function(signal){
		document.addEventListener('keyup',function(e){
			var iKeyCode = e.keyCode;
			aKeys[iKeyCode] = false;
			oSignals.animate.remove(keypress);
			signal.dispatch(iKeyCode);
			//
			oSignals.keydown.add(fnEmpty).detach();
			oSignals.keypress.add(fnEmpty).detach();
		});
	}));
	return aKeys;
})());