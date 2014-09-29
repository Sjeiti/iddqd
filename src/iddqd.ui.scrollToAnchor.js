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
	// todo: html/body add scroll target
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
			var iFrom = mBody.scrollTop
				,iTo = mHref.offsetTop + (offset||0);
			oAnimate&&oAnimate.cancel();
			oAnimate = animate(millis||500,function(step){
				animateBody(iFrom,iTo,easingMethod?easingMethod(step):step);
			});
			e.preventDefault();
		}
	}
	function animateBody(from,to,step){
		//mBody.scrollTop = from + step*(to-from);
		mHTML.scrollTop = from + step*(to-from);
	}
	return scrollToAnchor;
})());