/**
 * Namespace to manipulate existing stylesheets.
 * @name scrollToAnchor
 * @namespace iddqd.ui
 * @method
 * @param {HTMLAnchorElement} anchorElement
 * @param {Number} millis
 * @param {Number} offset
 * @param {Function} easingMethod
 * @requires iddqd.animate
 */
iddqd.ns('iddqd.ui.scrollToAnchor',(function(){
	var animate = iddqd.uses(iddqd.animate)
		,oAnimate
		,mBody
		,mHTML;
	function scrollToAnchor(anchorElement,millis,offset,easingMethod){
		// todo: add optional size param to divide millis by so animation always has same speed
		var sHref = anchorElement.getAttribute('href')
			,sId = sHref.split('#').pop()
			,mHref = document.getElementById(sId);
		if (!mBody) mBody = document.body;
		if (!mHTML) mHTML = document.querySelector('html');
		anchorElement.addEventListener('click',handleClick);
		function handleClick(e){
			var iFrom = mBody.scrollTop||mHTML.scrollTop// window.scrollY
				,iTo = getOffset(mHref).top + (offset||0);
			oAnimate&&oAnimate.cancel();
			oAnimate = animate(millis||500,function(step){
				animateBody(iFrom,iTo,easingMethod?easingMethod(step):step);
			});
			e.preventDefault();
		}
	}
	// todo: move getOffset to generic ns (utils)
	function getOffset( el ) {
		var x = 0
			,y = 0;
		while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
			x += el.offsetLeft - el.scrollLeft;
			y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: y, left: x };
	}
	function animateBody(from,to,step){
		var iY = from + step*(to-from);
		if (window.scrollTo) {
			window.scrollTo(0,iY);
		} else {
			mBody.scrollTop = iY;
			mHTML.scrollTop = iY;
		}
	}
	return scrollToAnchor;
})());