/**
 * Checks stylesheets for horizontal breakpoints
 * @name iddqd.signal.breakpoint
 * @type Signal
 */
iddqd.ns('iddqd.signal.breakpoint',iddqd.signal(function(signal){
	//oSignals.breakpoint = new signals.Signal();
	window.addEventListener('load',function(){
		/*global CSSMediaRule*/
		var /*signal = oSignals.breakpoint
			,*/forEach = Array.prototype.forEach
			,aSizes = [Number.MAX_VALUE]
			,iSizes
			,iCurrent = -1
		;
		signal.current = iCurrent;
		forEach.apply(document.styleSheets,[function(styleSheet){
			if (styleSheet.href!==null) {
				forEach.apply(styleSheet.rules,[function(rule){
					if (rule.constructor===CSSMediaRule) {
						forEach.apply(rule.media,[function(medium){
							var aMatch = medium.match(/\(([^\)]+)\)/g);
							aMatch&&aMatch.forEach(function(match){
								var aWidth = match.match(/width/)
									,aDigit = match.match(/\d+/)
									,bMax = !!match.match(/max/)
								;
								if (aWidth&&aDigit) {
									var iSize = parseInt(aDigit.pop()) + (bMax?1:0);
									if (aSizes.indexOf(iSize)===-1) aSizes.push(iSize);
								}
							});
						}]);
					}
				}]);
			}
		}]);
		aSizes.sort(function(a,b){return a>b?1:-1;});
		iSizes = aSizes.length;
		signal.points = aSizes;
		//
		if (iSizes!==0) {
			window.addEventListener('resize',handleResize);
			handleResize();
		} else {
			console.warn('No breakpoints found');
		}
		//
		function handleResize(){
			var iWindowWidth = window.innerWidth;
			var iCheckSize = aSizes[0];
			for (var i=0;i<iSizes;i++) {
				iCheckSize = aSizes[i];
				if (iWindowWidth<iCheckSize) {
					break;
				}
			}
			if (iCheckSize!==iCurrent) {
				var iOld = iCurrent;
				iCurrent = iCheckSize;
				signal.current = iCurrent;
				signal.dispatch(iCurrent,iOld);
			}
		}
	},false);
}));