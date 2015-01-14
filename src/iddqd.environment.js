// todo document
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
		// cumulative
		,isIOS =		isIPad||isIPhone||isIPod
		,isMobile =		isIOS||isAndroid||isBlackBerry||isIEMobile
		,isStandalone =	!!oNavigator.standalone
	;
	function addClassNames(){
		var mHTML = document.body
			,sPrefix = 'env_'
			,addBodyClass = mHTML.classList.add.bind(mHTML.classList);
		isIPad&&addBodyClass(sPrefix+'ipad');
		isIPhone&&addBodyClass(sPrefix+'iphone');
		isIPod&&addBodyClass(sPrefix+'ipod');
		isAndroid&&addBodyClass(sPrefix+'android');
		isBlackBerry&&addBodyClass(sPrefix+'blackberry');
		isIEMobile&&addBodyClass(sPrefix+'iemobile');
		isIOS&&addBodyClass(sPrefix+'ios');
		isMobile&&addBodyClass(sPrefix+'mobile');
		isPhoneGap&&addBodyClass(sPrefix+'phonegap');
		isCordova&&addBodyClass(sPrefix+'cordova');
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
