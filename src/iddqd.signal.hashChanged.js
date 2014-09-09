/**
 * Signal for mouseWheel.<br/>
 * The callback for this signal is Function(wheelDelta)
 * @name iddqd.signal.mouseWheel
 * @type Signal
 */
iddqd.ns('iddqd.signal.hashChanged',iddqd.signal(function(signal){
	var oLocation = window.location
		,sHash = oLocation.hash.substr(1);
	window.addEventListener('hashchange',function(){
		var sOldHash = sHash;
		sHash = oLocation.hash.substr(1);
		signal.dispatch(sOldHash,sHash);
	},false);
}));