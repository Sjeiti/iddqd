
/*! iddqd.style */
// todo: document
iddqd.ns('iddqd.style',(function(rv) {


/*
//		var geta = document.getElementsByTagName;
//var mBody = document.getElementsByTagName('body')[0];
//alert(mBody===document.body);
document.addEventListener('ready',function(e){
alert(953);
});
//mBody.addEventListener('load',function(e){
//alert(953);
//});
//trace(mBody);
//document.body.addEventListener('load',function(e){
//alert(953);
//});
		window.addEventListener('load',function(e){
			//alert('load');
			var aP = document.getElementsByTagName('head');
			aP = document.getElementsByTagName('body');
			if (aP.length===0) aP = document.getElementsByTagName('body');
			var mStyle;
			if (aP.length!==0) mStyle = aP[0].addChild('style',{title:sId});
			//if (aP.length!==0) aP[0].addChild('link',{type:'text/css',title:sId,href:'data:text/css,a{color:red;}'});
			//mStyle.createTextNode('ul{border:1px solid #f00;}');
			mStyle.innerHTML = 'ul{border:1px solid #f00;}';
		});
*/
	if (document.styleSheets[0].addRule===undefined) {
		StyleSheet.prototype.addRule = function(selector,value){
			return this.insertRule(selector + '{' + value + '}', this.cssRules.length);
		}
	}

	var transitionEnd = (function(){
		/*var mElm = document.createElement('div')
			,sReturn = '';
		rv.loop({
			transition:			'transitionEnd'
			,OTransition:		'oTransitionEnd'
			,MSTransition:		'msTransitionEnd'
			,MozTransition:		'transitionend'
			,WebkitTransition:	'webkitTransitionEnd'
    	},function(interface,event){
			if (mElm.style[interface]!==undefined) sReturn = event;
		});
		return sReturn;*/
		var sInterface
			,mElm = document.createElement('fakeelement')
			,oTransitions = {
				transition:'transitionend'
				,OTransition:'oTransitionEnd'
				,MozTransition:'transitionend'
				,WebkitTransition:'webkitTransitionEnd'
			}
		;
		for(sInterface in oTransitions){
			if( mElm.style[sInterface]!==undefined){
				return oTransitions[sInterface];
			}
		}
	})();
	console.log('transitionEnd',transitionEnd); // log

	var aSheets = document.styleSheets
		// ie rearanges selectors: span#a.c.d.b becomes span.b.c.d#a
		/*,addRule = function(sheet,selector,value){
			var sReturn;
			if (sheet.addRule) {
				sReturn = sheet.addRule(selector,value);
			} else {
				sReturn = sheet.insertRule(selector + '{' + value + '}', sheet.cssRules.length);
			}
			return sReturn;
		}*/
		,bReversedSelectors = (function(){
			var oSheet = aSheets[0]
				,aRules = oSheet.cssRules
				,iNumRules = aRules.length
				,sSelector = 'span#a.c.d.b'
				,iAdd = oSheet.addRule(sSelector, 'font-weight:inherit')
				,sSelectorResult = aRules[iNumRules].selectorText
				,bIsReversed = sSelectorResult!=sSelector
			;
			oSheet.deleteRule(iNumRules);
			return bIsReversed;
		})()
		// make span#a.c.d.b into span.b.c.d#a
		,getReverse = function(selector){ // todo: memoize
			/*var aParts = or.split(/\s?>\s?|\s/);
			rv.loop(aParts,function(i,sub){
				var aWords = sub.match(/([#.]?\w+)/g).sort() // ["#a", ".b", ".c", ".d", "span"]
					,iWords = aWords.length
					,sId = ''
					,sEl = '';
				if (aWords[0].substr(0,1)=='#') sId = aWords.shift();
				if (aWords[iWords-1].substr(0,1)!='.') sEl = aWords.pop();
				aWords.unshift(sEl);
				aWords.push(sId);
				aParts[i] = aWords.join('');
			});*/
			var oSheet = aSheets[0]
				,aRules = oSheet.cssRules
				,iNumRules = aRules.length
				,iAdd = oSheet.addRule(selector, 'font-weight:inherit')
				,sSelectorResult = aRules[iNumRules].selectorText
			;
			oSheet.deleteRule(iNumRules);
			return sSelectorResult;
		}
		,fnSelect = function select(or){
			if (bReversedSelectors) or = getReverse(or);
			var aStyles = [];
			for (var i = 0;i<aSheets.length;i++) {
				var oSheet = aSheets[i]
					,sStyleHref = oSheet.href;
				if (sStyleHref&&sStyleHref.indexOf(location.origin)===0) {
					var aRules = oSheet.cssRules;
					if (aRules) {
						for (var j = 0;j<aRules.length;j++) {
							var oRule = aRules[j];
							if (oRule.constructor===CSSStyleRule) {

								/*console.log('oRule',oRule.selectorText.split(' {').shift()==or,oRule.selectorText,' ',or); // log
								$.each(oRule,function(i,s){
									console.log('   oRule ',i,' ',s); // log
								});*/

		//						console.log(j,oRule); // log
			//						if (oRule.selectors===undefined) oRule.selectors = oRule.selectorText.replace(/\s*,\s*/g,',').split(',');
			//if (j===43) console.log('oRule.selectors.indexOf(or)>0:',oRule.selectorText,or,oRule.selectorText.indexOf(or)); // TRACE ### oRule.selectors.indexOf(or)>0

		//							if (oRule.selectors.indexOf(or)>0) aStyles.push(oRule);
		//							if (oRule.selectorText.split(' {').shift().indexOf(or)>=0) aStyles.push(oRule);
									if (oRule.selectorText.split(' {').shift()==or) aStyles.push(oRule);
								}
			//console.log(j,oRule.constructor===CSSStyleRule);
						}
					}
				}
			}
			return aStyles;
		}
		,fnChangeRule = function changeRule(selector,rules) {
			var aSel = fnSelect(selector.replace('>',' > ').replace('  ',' '));
			for (var s in rules){
				for (var j = 0;j<aSel.length;j++) {
					var oRule = aSel[j];
					var oStyle = oRule.style;
					oStyle.removeProperty(s);
					oStyle[s] = rules[s];
				}
			}
			return aSel;
		}
		,fnAddRule = function addRule(selector,rules) {
			var sRules = '';
			rv.loop(rules,function(prop,val){sRules+=prop+':'+val+';'});
			var oSheet = aSheets[0];
			oSheet.addRule(selector,sRules);
			return oSheet.cssRules[oSheet.cssRules.length-1];
		}
		/*,oPrefix = (function () {
			var oStyles = window.getComputedStyle(document.documentElement, '')
				,sPre = (Array.prototype.slice
					.call(oStyles)
					.join('')
					.match(/-(moz|webkit|ms)-/) || (oStyles.OLink === '' && ['', 'o'])
					)[1]
				,sDom = ('WebKit|Moz|MS|O').match(new RegExp('(' + sPre + ')', 'i'))[1];
			return {
				dom: sDom,
				lowercase: sPre,
				css: '-' + sPre + '-',
				js: sPre[0].toUpperCase() + sPre.substr(1)
			};
		})()*/
		,prefixes = ['','-webkit-','-moz-','-ms-','-o-']
		,aStyles = Array.prototype.slice.call(window.getComputedStyle(document.documentElement,''))
		,styleName = function(style){
			for (var i=0,l=prefixes.length;i<l;i++) {
				var sPrefix = prefixes[i];
				if (aStyles.indexOf(sPrefix+style)!==-1) {
					style = sPrefix+style;
					break;
				}
			}
			return style;
		}
	;
	return {
		toString: function(){return '[iddqd.style]';}
		,select: fnSelect
		,changeRule: fnChangeRule
		,addRule: fnAddRule
//		,prefix: oPrefix
		,styleName: styleName
		,transitionEnd: transitionEnd
	};
})(iddqd));
/*align-items align-self animation-delay animation-direction animation-duration animation-fill-mode animation-iteration-count animation-name animation-play-state animation-timing-function backface-visibility background-attachment background-clip background-color background-image background-origin background-position background-repeat background-size border-bottom-color border-bottom-left-radius border-bottom-right-radius border-bottom-style border-bottom-width border-collapse border-image-outset border-image-repeat border-image-slice border-image-source border-image-width border-left-color border-left-style border-left-width border-right-color border-right-style border-right-width border-spacing border-top-color border-top-left-radius border-top-right-radius border-top-style border-top-width bottom box-shadow caption-side clear clip color content counter-increment counter-reset cursor direction display empty-cells flex-basis flex-direction flex-grow flex-shrink float font-family font-size font-size-adjust font-stretch font-style font-variant font-weight height ime-mode justify-content left letter-spacing line-height list-style-image list-style-position list-style-type margin-bottom margin-left margin-right margin-top marker-offset max-height max-width min-height min-width opacity order outline-color outline-offset outline-style outline-width overflow overflow-x overflow-y padding-bottom padding-left padding-right padding-top page-break-after page-break-before page-break-inside perspective perspective-origin pointer-events position quotes resize right table-layout text-align text-decoration text-indent text-overflow text-shadow text-transform top transform transform-origin transform-style transition-delay transition-duration transition-property transition-timing-function unicode-bidi vertical-align visibility white-space width word-break word-spacing word-wrap z-index -moz-appearance -moz-background-inline-policy -moz-binding -moz-border-bottom-colors -moz-border-left-colors -moz-border-right-colors -moz-border-top-colors -moz-box-align -moz-box-direction -moz-box-flex -moz-box-ordinal-group -moz-box-orient -moz-box-pack -moz-box-sizing -moz-column-count -moz-column-gap -moz-column-rule-color -moz-column-rule-style -moz-column-rule-width -moz-column-width -moz-float-edge -moz-font-feature-settings -moz-font-language-override -moz-force-broken-image-icon -moz-hyphens -moz-image-region -moz-orient -moz-outline-radius-bottomleft -moz-outline-radius-bottomright -moz-outline-radius-topleft -moz-outline-radius-topright -moz-stack-sizing -moz-tab-size -moz-text-align-last -moz-text-blink -moz-text-decoration-color -moz-text-decoration-line -moz-text-decoration-style -moz-text-size-adjust -moz-user-focus -moz-user-input -moz-user-modify -moz-user-select -moz-window-shadow clip-path clip-rule color-interpolation color-interpolation-filters dominant-baseline fill fill-opacity fill-rule filter flood-color flood-opacity image-rendering lighting-color marker-end marker-mid marker-start mask mask-type shape-rendering stop-color stop-opacity stroke stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-rendering vector-effect*/