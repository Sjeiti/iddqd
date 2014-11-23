/**
 * Jsdoc js copied and refactored a bit from Docstrap.
 * Could use a major overhaul.
 */
window.jsdoc = (function($){
	'use strict';

	function init(options){
		options.collapseSymbols&&initCollapseSymbols();
		initTableOfContents();
		initHash();
	}
	function initCollapseSymbols(){
		$('#main').localScroll({
			offset: { top: 56 } //offset by the height of your header (give or take a few px, see what works for you)
		});
		$("dt h4.name").each(function () {
			var $this = $(this);
			var icon = $("<i/>").addClass("icon-plus-sign").addClass("pull-right").addClass("icon-white");
			var dt = $this.parents("dt");
			var children = dt.next("dd");

			$this.append(icon).css({cursor: "pointer"});
			$this.addClass("member-collapsed").addClass("member");

			children.hide();
			$this.toggle(function () {
				icon.addClass("icon-minus-sign").removeClass("icon-plus-sign").removeClass("icon-white");
				$this.addClass("member-open").removeClass("member-collapsed");
				children.slideDown();
			},function () {
				icon.addClass("icon-plus-sign").removeClass("icon-minus-sign").addClass("icon-white");
				$this.addClass("member-collapsed").removeClass("member-open");
				children.slideUp();
			});
		});
	}
	function initTableOfContents(){
		var sPath = location.pathname.split('/').pop()
			, isIndex = sPath==='' || sPath==='index.html';
		if (isIndex) {
			$("#toc").detach();
		} else {
			$("#toc").toc({
				selectors: "h1,h2,h3,h4,dt>a",
				showAndHide: false,
				scrollTo: 60
			});
			$("#toc>ul").addClass("nav nav-pills nav-stacked");
			$("#main span[id^='toc']").addClass("toc-shim");
			if ($("#toc>ul").html()==='') $("#toc").detach();
		}
	}
	function initHash(){
		if (location.hash) {
			setTimeout(function () {
				$(location.hash).addClass('highlight');
				$.scrollTo(location.hash,500,{axis: 'y',offset: -50});
			},500);
		}
	}
	return {init:init};
})(jQuery);