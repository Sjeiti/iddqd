/* global ga */
/* global _gaq */
/**
 * Add Google Analytics
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @namespace iddqd.utils.ga
 */
// todo: document and test
iddqd.ns('iddqd.utils.ga',(function(iddqd){
	'use strict';
	var bUniversal = false;
	/**
	 *
	 * @param {String} account - UA-670434-1
	 * @param {String} domain - sjeiti.com
	 * @param {Boolean} universal - false
	 */
	function add(account,domain,universal){
		bUniversal = universal;
		if (bUniversal){
			window.GoogleAnalyticsObject = 'ga';
			window.ga = window.ga || function () {
				(window.ga.q = window.ga.q || []).push(arguments);
			};
			window.ga.l = Math.floor(new Date());

			iddqd.loadScript('//www.google-analytics.com/analytics.js');

			ga('create', account, domain);
			ga('send', 'pageview');
		} else {
			window._gaq = window._gaq || [];
			_gaq.push(['_setAccount',account]);
			_gaq.push(['_setDomainName',domain]);
			_gaq.push(['_trackPageview']);

			iddqd.loadScript(('https:'==document.location.protocol?'https://ssl':'http://www') + '.google-analytics.com/ga.js');
		}
		setTimeout(function(){
			gaTrack('15_seconds', 'read');
		}, 15000);
	}
	function gaTrack() { // category, action, label, value, non_interaction
		if (window._gaq!==undefined||window.ga!==undefined) {
			var aList = bUniversal?['send','event']:['_trackEvent'];
			for (var i=0,l=arguments.length;i<l;i++) {
				aList.push(arguments[i]);
			}
			if (bUniversal){
				ga.call(ga,aList);
			} else {
				_gaq.push(aList);
			}
		} else {
			console.log('_trackEvent',arguments);
		}
	}
	return {
		add: add
		,gaTrack: gaTrack
	};
})(iddqd));