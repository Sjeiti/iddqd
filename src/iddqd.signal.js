/*
 * Signal implementation for various generic events.<br/>
 * Implements {@link http://millermedeiros.github.com/js-signals js-signals} by Miller Demeiros.<br/>
 * Signals can be created at their proper namespace or module by calling {@link iddqd.signal.create} (for instance see {@link iddqd.animate.js}).
 * @summary Signal implementation for various generic events.
 * @namespace iddqd.signals
 * @requires signals.js http://millermedeiros.github.com/js-signals/
 */
 
/**
 * Creates a signal.<br/>
 * The signals is dead (no events attached) until the first signal.add or signal.addOnce is called.<br/>
 * @name iddqd.signal
 * @method
 * @param {Function} init The initialisation method, called after the first signal.add or signal.addOnce.
 * @returns {Signal} The signal
 */
iddqd.ns('iddqd.signal',function(init){
	// todo: what if the signal already exists
	//var oSignal = oReturn[name] = new signals.Signal()
	var oSignal = new window.signals.Signal()
		,fnTmpAdd = oSignal.add
		,fnTmpAddOnce = oSignal.addOnce
		,fnInited = function(){
			oSignal.add = fnTmpAdd;
			oSignal.addOnce = fnTmpAddOnce;
			init(oSignal);
		}
	;
	oSignal.add = function(){
		fnInited();
		return oSignal.add.apply(this,arguments);
	};
	oSignal.addOnce = function(){
		fnInited();
		return oSignal.addOnce.apply(this,arguments);
	};
	return oSignal;
});