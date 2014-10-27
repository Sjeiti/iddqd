/**
 * Checks stylesheets for horizontal breakpoints
 * @name iddqd.signal.breakpoint
 * @type Signal
 */
iddqd.ns('iddqd.signal.breakpoint',iddqd.signal(function(signal){
	var forEach = Array.prototype.forEach
		,aSizes = [Number.MAX_VALUE]
		,iSizes
		,iCurrent = -1
		,bLoaded = false
		,aPostMap
	;
	signal.current = iCurrent;
	signal.points = aSizes;
	signal.map = map;
	function map(){
		if (bLoaded) {
			if (arguments.length===iSizes) {
				for (var i=0;i<iSizes;i++) {
					var sMap = arguments[i];
					signal[sMap] = aSizes[i];
				}
			} else {
				console.warn('Arguments do not match breakpoints:',aSizes);
			}
		} else {
			aPostMap = arguments;
		}
	}
	window.addEventListener('load',function(){
		bLoaded = true;
		// loop styleSheets, then cssRules, then media
		forEach.apply(document.styleSheets,[function(styleSheet){
			if (styleSheet.cssRules) {//styleSheet.href!==null&& // todo: why href!==null what about inline
				forEach.apply(styleSheet.cssRules,[function(rule){
					if (rule.constructor===CSSMediaRule) {
						if (rule.media.length>0&&rule.media[0]===undefined) { // see: http://msdn.microsoft.com/en-us/library/ff460307(v=vs.85).aspx
							findBreakpoint(rule.media.mediaText);
						} else {
							forEach.apply(rule.media,[function(medium){
								findBreakpoint(medium);
							}]);
						}
					}
				}]);
			}
		}]);
		aSizes.sort(function(a,b){return a>b?1:-1;});
		iSizes = aSizes.length;
		aPostMap&&map.apply(this,aPostMap);
		signal.current = iCurrent;
		signal.points = aSizes;
		if (iSizes!==0) {
			window.addEventListener('resize',handleResize);
			handleResize();
		} else {
			console.warn('No breakpoints found');
		}

		/**
		 * Searches string for breakpoint to add to the list.
		 * @param medium {string}
		 */
		function findBreakpoint(medium){
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
		}

		/**
		 * Handle resize event to check which breakpoint we are at.
		 * Dispatches signal when breakpoint changes
		 */
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
//	//oSignals.breakpoint = new signals.Signal();
//	window.addEventListener('load',function(){
//		/*global CSSMediaRule*/
//		var /*signal = oSignals.breakpoint
//			,*/forEach = Array.prototype.forEach
//			,aSizes = [Number.MAX_VALUE]
//			,iSizes
//			,iCurrent = -1
//		;
//		signal.current = iCurrent;
//		forEach.apply(document.styleSheets,[function(styleSheet){
//			if (styleSheet.href!==null) {
//				forEach.apply(styleSheet.rules,[function(rule){
//					if (rule.constructor===CSSMediaRule) {
//						forEach.apply(rule.media,[function(medium){
//							var aMatch = medium.match(/\(([^\)]+)\)/g);
//							aMatch&&aMatch.forEach(function(match){
//								var aWidth = match.match(/width/)
//									,aDigit = match.match(/\d+/)
//									,bMax = !!match.match(/max/)
//								;
//								if (aWidth&&aDigit) {
//									var iSize = parseInt(aDigit.pop()) + (bMax?1:0);
//									if (aSizes.indexOf(iSize)===-1) aSizes.push(iSize);
//								}
//							});
//						}]);
//					}
//				}]);
//			}
//		}]);
//		aSizes.sort(function(a,b){return a>b?1:-1;});
//		iSizes = aSizes.length;
//		signal.points = aSizes;
//		//
//		if (iSizes!==0) {
//			window.addEventListener('resize',handleResize);
//			handleResize();
//		} else {
//			console.warn('No breakpoints found');
//		}
//		//
//		function handleResize(){
//			var iWindowWidth = window.innerWidth;
//			var iCheckSize = aSizes[0];
//			for (var i=0;i<iSizes;i++) {
//				iCheckSize = aSizes[i];
//				if (iWindowWidth<iCheckSize) {
//					break;
//				}
//			}
//			if (iCheckSize!==iCurrent) {
//				var iOld = iCurrent;
//				iCurrent = iCheckSize;
//				signal.current = iCurrent;
//				signal.dispatch(iCurrent,iOld);
//			}
//		}
//	},false);
}));