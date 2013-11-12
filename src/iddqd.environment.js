iddqd.ns('iddqd.environment',(function(){
	'use strict';
	var
		oNavigator =	window.navigator
		,sUserAgent =	oNavigator.userAgent
		,isIPad =		!!sUserAgent.match(/iPad/i)
		,isIPhone =		!!sUserAgent.match(/iPhone/i)
		,isIPod =		!!sUserAgent.match(/iPod/i)
		,isAndroid =	!!sUserAgent.match(/Android/i)
		,isBlackBerry =	!!sUserAgent.match(/BlackBerry/i)
		,isIEMobile =	!!sUserAgent.match(/IEMobile/i)
		,isPhoneGap =	window.PhoneGap!==undefined
		,isCordova =	window.cordova!==undefined
		// cululative
		,isIOS =		isIPad||isIPhone||isIPod
		,isMobile =		isIOS||isAndroid||isBlackBerry||isIEMobile
		,isStandalone =	!!oNavigator.standalone
	;
	function addClassNames(){
		var mHTML = document.body//querySelector('html')
			,sPrefix = 'env_';
		isIPad&&mHTML.addClass(sPrefix+'ipad');
		isIPhone&&mHTML.addClass(sPrefix+'iphone');
		isIPod&&mHTML.addClass(sPrefix+'ipod');
		isAndroid&&mHTML.addClass(sPrefix+'android');
		isBlackBerry&&mHTML.addClass(sPrefix+'blackberry');
		isIEMobile&&mHTML.addClass(sPrefix+'iemobile');
		isIOS&&mHTML.addClass(sPrefix+'ios');
		isMobile&&mHTML.addClass(sPrefix+'mobile');
		isPhoneGap&&mHTML.addClass(sPrefix+'phonegap');
		isCordova&&mHTML.addClass(sPrefix+'cordova');
	}
	return {
		isIPad:isIPad
		,isIPhone:isIPhone
		,isIPod:isIPod
		,isAndroid:isAndroid
		,isBlackBerry:isBlackBerry
		,isIEMobile:isIEMobile
		,isIOS:isIOS
		,isMobile:isMobile
		,standalone: isStandalone
		,addClassNames:addClassNames
	};
})());
