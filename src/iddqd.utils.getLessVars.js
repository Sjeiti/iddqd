/**
 * Tries to pull your LESS/SASS/etc variables from CSS and parse them to Javascript
 * @name iddqd.utils.getLessVars
 * @method
 * @param {String} id The css-id your variables are listed under.
 * @param {Boolean} [parseNumbers=true] Try to parse units as numbers.
 * @return {Object} A value object containing your LESS variables.
 * @example
 * less:
 *	&#64;foo: 123px;
 *	#less { .myFoo {width: @foo; } }
 *
 * javascript:
 *	getLessVars('less');
 *
 * returns:
 *	{myFoo:123}
 */
iddqd.ns('iddqd.utils.getLessVars',function(id,parseNumbers) {
	'use strict';

	/*
	 * http://www.w3.org/TR/css3-values/
	 * even though rule.style(CSSStyleDeclaration) should contain custom properties it doesn't
	 */
	// todo: memoisation
	var bNumbers = parseNumbers===undefined?true:parseNumbers
		,oLess = {}
		,rgId = /\#\w+/
		,rgNum = /^[0-9]+$/
		,rgUnit = /[a-z]+$/
		,aUnits = 'em,ex,ch,rem,vw,vh,vmin,cm,mm,in,pt,pc,px,deg,grad,rad,turn,s,ms,Hz,kHz,dpi,dpcm,dppx'.split(',')
		,rgKey = /\.(\w+)/
		,rgValue = /:\s?(.*)\s?;\s?\}/
		,sId = '#'+id
		,oStyles = document.styleSheets;
	for (var i=0,l=oStyles.length;i<l;i++) {
		var oSheet = oStyles[i]
			,sStyleHref = oSheet.href;
		if (sStyleHref&&sStyleHref.indexOf(location.origin)===0) {
			var oRules = oSheet.cssRules;// todo: IE8 err
			if (oRules) { // if ! callback
				for (var j=0,k=oRules.length;j<k;j++) {
					var sRule = oRules[j].cssText
						,aMatchId = sRule.match(rgId);
					if (aMatchId&&aMatchId[0]==sId) {
						var aKey = sRule.match(rgKey)
							,aVal = sRule.match(rgValue);
						if (aKey&&aVal) {
							var sKey = aKey[1]
								,oVal = aVal[1]
								,aUnit = oVal.match(rgUnit);
							if (bNumbers&&((aUnit&&aUnits.indexOf(aUnit[0])!==-1)||oVal.match(rgNum))) {
								oVal = parseFloat(oVal);
							}
							oLess[sKey] = oVal;
						}
					}
				}
			}
		}
	}
	return oLess;
});