/*
* jQuery Widdio 1.1.5 - A HTML5 video player
* Copyright (c) 2010 Ron Valstar
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*
* description
*   - A small HTML5 video player
*
* features
*	- video
*
* Usage: todo
*	$('video').widdio();
*	$('video#functions').widdio({
*		controls: [WIDDIO.CENTER]
*		,size: WIDDIO.SIZE_FIXED
*	});
*
* in this update:
*	- two bugfixes
*
* in last update:
*
* todo:
* 	- add volume control
* 	- add preload bar
*	- remove jQuery dependency?
*	- save state in cookie
*
*/

/* possibly handy properties functions for oVideo:

	controls		Boolean

	volume			float (0,1)
	muted			Boolean

	canPlayType()	String :: "probably" "maybe"
	load()
	play()
	pause()

	networkState	int :: NETWORK_EMPTY NETWORK_IDLE NETWORK_LOADING NETWORK_NO_SOURCE

	loop			Boolean
	autoplay		Boolean
	paused			Boolean
	ended			Boolean
	preload			int

	readyState		int :: HAVE_NOTHING HAVE_METADATA HAVE_CURRENT_DATA HAVE_FUTURE_DATA HAVE_ENOUGH_DATA

	startTime		int
	duration		int || NaN
	currentTime		int

	seekable		[object TimeRanges]
	buffered		[object TimeRanges]
	played			[object TimeRanges]

*/
iddqd.ns('iddqd.ui.video',(function(iddqd) {
	'use strict';
var $=function(o){return o};//todo:remove
	var $Body
		,resize = iddqd.uses(iddqd.signal.resize)
		,style = iddqd.uses(iddqd.style)
//		,element = iddqd.uses(iddqd.internal.host.htmlelement)
		,string = iddqd.uses(iddqd.internal.native.string)
		,getSheetByMedia = style.getSheetByMedia
		,requestFullScreen
		,warn = console.warn
		//
		,iScrW		// screen width
		,iScrH		// screen height
		,fScrAspR	// screen aspect ratio
		//
		,aWiddioObj = []
		//
		,bCssAdded = false
		//
		,iMaxZ = Math.pow(2,32)/2-1
		//
		// browser/device detection
		,oNavigator =	window.navigator
		,sUserAgent =	oNavigator.userAgent
		,bWebkit =		!!sUserAgent.match(/webkit/i)
		,bIPad =		!!sUserAgent.match(/iPad/i)
		//
		,oReturn = iddqd.extend(initialise,{
			// exposed properties
			 playOne: true 		// play only one video at a time

			// constants
			,PLAYPAUSE:			'playpause'
			,SCRUB:				'scrub'
			,STOP:				'stop'
			,MUTE:				'mute'
			,VOLUME:			'volume'
			,FULLSCREEN:		'fullscreen'
			,CENTER:			'center'
			,TIME:				'time'

			,CONTROLS_OVER:		'over'
			,CONTROLS_UNDER:	'under'

			,SCALE_ASPECTRATIO:	'aspectratio'
			,SCALE_BARS:		'bars'
			,SCALE_NOBARS:		'nobars'

			,SIZE_ORIGINAL:		'original'
			,SIZE_FIXED:		'fixed'
			,SIZE_DYNAMIC:		'dynamic'
			,SIZE_FULLSCREEN:	'fullscreen'

			,STATE_START:		'start'
			,STATE_PLAYING:		'playing'
			,STATE_PAUSED:		'paused'
			,STATE_ENDED:		'ended'
		})
		//
		,oDefaultSettings = {
			 debug:					false
			,fullscreen:			false
			,scaleMode:				oReturn.SCALE_BARS
			,fullscreenScaleMode:	oReturn.SCALE_NOBARS
			,size:					oReturn.SIZE_ORIGINAL
			,width:					null
			,height:				null
			,fadeVolumeTime:		0
			// controls
			,controls: [
				oReturn.PLAYPAUSE
				,oReturn.SCRUB
				,oReturn.TIME
				,oReturn.MUTE
				,oReturn.CENTER
			]
			,controlsPosition:		oReturn.CONTROLS_OVER
			,controlsFadeTime:		500
			,controlsFadeWhenPaused: false
			// event functions
			,stateChange: null
		}
	;
	//
	iddqd.onDOMReady(function(){
		$Body = $('body');
		//
		var mBody = document.body;
		requestFullScreen = mBody.requestFullScreen||mBody.webkitRequestFullScreen||mBody.mozRequestFullScreen;//||mBody.msRequestFullScreen;
		//
		// events
		['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach(function(s){
			document.addEventListener(s,handleFullscreenChange);
		});
		//
		resize.add(handleResize);
		handleResize();
	});

	//
	// handleFullscreenChange
	function handleFullscreenChange(e){
		//console.log('handleFullscreenChange',document.fullScreenElement||document.webkitFullScreenElement||document.mozFullScreenElement); // log;
		if (!isFullscreen()) getWiddio(e.target).setFullscreenView();
	}
	// isFullscreen
	function isFullscreen(){
		return document.isFullScreen||document.mozFullScreen||document.webkitIsFullScreen;
	}
	//
	// windowResize
	function handleResize(w,h) {
		iScrW = w;
		iScrH = h;
		if (iScrH!==null&&iScrH!==0) {
			fScrAspR = iScrW/iScrH;
			aWiddioObj.forEach(function(o){
				o.resize();
			});
		}
	}
	//
	// playOne
	function playOne(video){
		aWiddioObj.forEach(function(o){
			if (o.video!==video) o.pause();
		});
	}
	//
	// getVideo
	function getWiddio(video){
		var $Elm = $(video);
		var mElm = $Elm.get(0);
		video = mElm.nodeName=='VIDEO'?mElm:$Elm.find('video').get(0);
		var oReturn = null;
		aWiddioObj.forEach(function(o){
			if (o.video!==video) oReturn = o;
		});
		return oReturn;
	}

	function addCss(){
		console.log('addCss'); // log
		var oSheet = getSheetByMedia('all')||getSheetByMedia('screen')||document.styleSheets[0];
		[
			['.widdio .time',[
				'font-weight:bold;'
				,'font-size:12px;'
				,'line-height:30px;']]

			,['.widdio .icon.center',[
				'position:absolute;'
				,'left:50%;'
				,'top:50%;'
				,'width: 50px;'
				,'height: 50px;'
				,'margin: -25px 0 0 -25px;']]

			,['.widdio .bar>*',[
				'position:absolute;'
				,'left:0;'
				,'top:0;']]
			,['.widdio .bar',[
				'position:relative;'
				,'width:1px;'
				,'margin-top:10px;'
				,'height:10px;'
				,'background-color:#FFF;']]

			,['.widdio .icon.center.play:hover',	'background-position: -240px 0px;']
			,['.widdio .icon.center.pause:hover',	'background-position: -360px 0px;']
			,['.widdio .icon.play:hover',			'background-position:    0px -30px;']
			,['.widdio .icon.pause:hover',		'background-position:  -30px -30px;']
			,['.widdio .icon.stop:hover',			'background-position:  -60px -30px;']
			,['.widdio .icon.mute:hover',			'background-position:  -90px -30px;']
			,['.widdio .icon.muted:hover',		'background-position: -120px -30px;']
			,['.widdio .icon.fullscreen:hover',	'background-position: -150px -30px;']

			,['.widdio .icon.play.center',		'background-position: -180px 0px;']
			,['.widdio .icon.pause.center',		'background-position: -300px 0px;']
			,['.widdio .icon.play',				'background-position:    0px 0px;']
			,['.widdio .icon.pause',				'background-position:  -30px 0px;']
			,['.widdio .icon.stop',				'background-position:  -60px 0px;']
			,['.widdio .icon.mute',				'background-position:  -90px 0px;']
			,['.widdio .icon.muted',				'background-position: -120px 0px;']
			,['.widdio .icon.fullscreen',			'background-position: -150px 0px;']

			,['.widdio .icon',[
				'background-image: url(data:image/png;base64,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;'
				,'backround-repeat: no-repeat;'
				,'height: 30px;'
				,'width: 30px;']]

			,['.widdio .overlay',[
				'position:absolute;'
				,'left:0;'
				,'top:0;'
				,'width:100%;'
				,'height:100%;']]

			,['.widdio .controls>*',[
				'position:relative;'
				,'height:100%;'
				,'overflow:hidden;'
				,'display:block;'
				,'float:left;'
				,'cursor:pointer;'
				,'text-align:center;']]

			,['.widdio.'+oReturn.SIZE_FULLSCREEN+' .controls',[
				'position:fixed;'
				,'bottom:0;']]
			,['.widdio .controls.over',[
				'position:absolute;'
				,'bottom:0;']]
			,['.widdio .controls',[
				'height:30px;'
				,'overflow:hidden;'
				,'background-color: rgba(0,0,0,0.4;']]

			,['.widdio.'+oReturn.SIZE_FULLSCREEN+' video',[
				'width:100%;'
				,'height:100%;']]
			,['.widdio video',
				'display:block;']

			,['.widdio.'+oReturn.SCALE_NOBARS+' .staticwrap',[
				'width:100%;'
				,'height:100%;'
				,'overflow:hidden;']]

			,['.widdio.'+oReturn.SIZE_FULLSCREEN,[
				'position:fixed;'
				,'left:0;'
				,'top:0;'
				,'width:100%;'
				,'height:100%;'
				,'z-index:'+iMaxZ+';']]
			,['.widdio',[
				'position:relative;'
				,'z-index:auto;'
				,'color:white;']]
		].forEach(function(a){
			oSheet.addRule(a[0],a[1].join?a[1].join(''):a[1]);
		});
		bCssAdded = true;
	}

	//
	//
	// call
	function initialise(el,settings){
		var mVideo = el
			,sVideoId = mVideo.getAttribute('id')
			,sVideoW = mVideo.getAttribute('width')
			,sVideoH = mVideo.getAttribute('height')
			,iVideoW = mVideo.offsetWidth
			,iVideoH = mVideo.offsetHeight
			,fVidAspR	// video aspect ratio
			//
			,iWidW		// widdio width
			,iWidH		// widdio height (excludes the controls bar)
			,fWidAspR	// widdio aspect ratio
			//
			,$Video = $(el)
			,aSources
			//var oMimes = {
			//	ogg:	"ogv"
			//};
			//
			,mWiddio
			,mWrap
			,mStaticWrap
			,mControls
			//
			,mCnPlayPause
			,mCnStop
			,mCnMute
			,mCnVolume
			,mCnFullscreen
			//
			,mCnScrub
			,mControlsBar
			,mControlsBuffer
			//
			,mCnTime
			//
			,sOriginalSize
			,$WiddioGhost
			//
			,mCenter
			,iCenterFadeID = 0
			,iControlsFadeID = 0
			,iCenterFadeTime = 1500
			//
			,iControlsHeight
			//
			,oPublicWiddio = {
				 video:			el
				,play: function(file) {
					if (file===undefined) {
						togglePlay(true);
					} else {
						playVideo(file);
					}
				}
				,stop:			stop
				,toggle:		togglePlay
				,pause:			togglePlay.bind(null,false)
				,sound:			toggleSound
				,fullscreen:	toggleFullscreen
				,isPlaying:		isPlaying
				,resize:		resize
				,getState:		function(){return sState}
				,toString:		function(){return '[WiddioInstance #'+mWiddio.attr('id')+']'}
			}
		;
		//
		// PRIVATE FUNCTIONS
		//
		// init (self invoking)
		(function init() {
			settings = iddqd.extend(settings||{}, oDefaultSettings);
			//
			// width and height for fixed size
			if (settings.width===null)	settings.width =  !!sVideoW?parseInt(sVideoW,10):iVideoW;
			if (settings.height===null)	settings.height = !!sVideoH?parseInt(sVideoH,10):iVideoH;
			//
			// prepare video
			aSources = mVideo.querySelectorAll('source');
			mVideo.controls = false;
			//
			// fix iPad
			if (bIPad) {
				for (var i=0,l=aSources.length;i<l;i++) {
					var mSource = aSources[i];
					if (mVideo.canPlayType(mSource.getAttribute('type'))) {
						mVideo.setAttribute('src',mSource.getAttribute('src'));
					}
					mSource.parentNode.removeChild(mSource);
				}
			}
			//
			// video objects
			mVideo.widdio = oPublicWiddio; // todo: fix better :: $Video.data('widdio',oPublicWiddio);
			var oPrivateWiddio = {
				 video:					el
				,resize:				resize
				,setFullscreenView:		setFullscreenView
				,pause:					function(){togglePlay(false);}
			};
			aWiddioObj.push(oPrivateWiddio);
			//
			// add events
			[
//				,'loadstart'		// The user agent begins looking for media data, as part of the resource selection algorithm.	networkState equals NETWORK_LOADING
//				,'progress'			// The user agent is fetching media data.	networkState equals NETWORK_LOADING
//				,'suspend'			// The user agent is intentionally not currently fetching media data, but does not have the entire media resource downloaded.	networkState equals NETWORK_IDLE
//				,'abort'			// The user agent stops fetching the media data before it is completely downloaded, but not due to an error.	error is an object with the code MEDIA_ERR_ABORTED. networkState equals either NETWORK_EMPTY or NETWORK_IDLE, depending on when the download was aborted.
				 'error'			// An error occurs while fetching the media data.	error is an object with the code MEDIA_ERR_NETWORK or higher. networkState equals either NETWORK_EMPTY or NETWORK_IDLE, depending on when the download was aborted.
//				,'emptied'			// A media element whose networkState was previously not in the NETWORK_EMPTY state has just switched to that state (either because of a fatal error during load that's about to be reported, or because the load() method was invoked while the resource selection algorithm was already running).	networkState is NETWORK_EMPTY; all the IDL attributes are in their initial states.
//				,'stalled'			// The user agent is trying to fetch media data, but data is unexpectedly not forthcoming.	networkState is NETWORK_LOADING.
				,'loadedmetadata'	// Event	The user agent has just determined the duration and dimensions of the media resource and the text tracks are ready.	readyState is newly equal to HAVE_METADATA or greater for the first time.
//				,'loadeddata'		// The user agent can render the media data at the current playback position for the first time.	readyState newly increased to HAVE_CURRENT_DATA or greater for the first time.
//				,'canplay'			// The user agent can resume playback of the media data, but estimates that if playback were to be started now, the media resource could not be rendered at the current playback rate up to its end without having to stop for further buffering of content.	readyState newly increased to HAVE_FUTURE_DATA or greater.
//				,'canplaythrough'	// The user agent estimates that if playback were to be started now, the media resource could be rendered at the current playback rate all the way to its end without having to stop for further buffering.	readyState is newly equal to HAVE_ENOUGH_DATA.
//				,'playing'			// Playback is ready to start after having been paused or delayed due to lack of media data.	readyState is newly equal to or greater than HAVE_FUTURE_DATA and paused is false, or paused is newly false and readyState is equal to or greater than HAVE_FUTURE_DATA. Even if this event fires, the element might still not be potentially playing, e.g. if the element is blocked on its media controller (e.g. because the current media controller is paused, or another slaved media element is stalled somehow, or because the media resource has no data corresponding to the media controller position), or the element is paused for user interaction.
//				,'waiting'			// Playback has stopped because the next frame is not available, but the user agent expects that frame to become available in due course.	readyState is equal to or less than HAVE_CURRENT_DATA, and paused is false. Either seeking is true, or the current playback position is not contained in any of the ranges in buffered. It is possible for playback to stop for other reasons without paused being false, but those reasons do not fire this event (and when those situations resolve, a separate playing event is not fired either): e.g. the element is newly blocked on its media controller, or playback ended, or playback stopped due to errors, or the element has paused for user interaction.
//				,'seeking'			// The seeking IDL attribute changed to true and the seek operation is taking long enough that the user agent has time to fire the event.
//				,'seeked'			// The seeking IDL attribute changed to false.
				,'ended'			// Playback has stopped because the end of the media resource was reached.	currentTime equals the end of the media resource; ended is true.
//				,'durationchange'	// The duration attribute has just been updated.
				,'timeupdate'		// The current playback position changed as part of normal playback or in an especially interesting way, for example discontinuously.
				,'play'				// The element is no longer paused. Fired after the play() method has returned, or when the autoplay attribute has caused playback to begin.	paused is newly false.
				,'pause'			// The element has been paused. Fired after the pause() method has returned.	paused is newly true.
//				,'ratechange'		// Either the defaultPlaybackRate or the playbackRate attribute has just been updated.
				,'volumechange'		// Either the volume attribute or the muted attribute has changed. Fired after the relevant attribute's setter has returned.
			].forEach(function(s){
				mVideo.addEventListener(s,handleMediaEvent)
			});
			//
			mVideo.addEventListener('click',togglePlay);
			//
			if (!bCssAdded) addCss();
			addControls();
			//
			resize();
		})();

		function createElement(type,classes,parent,click){
			var mElement = document.createElement(type||'div');
			if (classes) {
				var oClassList = mElement.classList
					,aArguments = typeof(classes)==='string'?classes.split(' '):classes;
				oClassList.add.apply(oClassList,aArguments);
			}
			parent&&parent.appendChild(mElement);
			click&&mElement.addEventListener('click',click);
			return mElement;
		}

		function addControls(){
			// div.widdio>div.staticwrap>div.wrap>video
			// create wrappers
			var elm = createElement.bind(null,null);
			mWiddio = elm(['widdio',oReturn.STATE_START,settings.size,settings.scaleMode]);
			mStaticWrap = elm('staticwrap',mWiddio);
			mWrap = elm('wrap',mStaticWrap);
			// add controls
			mControls = elm(['controls',settings.controlsPosition],mWiddio);
			settings.controls.forEach(function(ctrl){
				if (ctrl===oReturn.PLAYPAUSE) {
					mCnPlayPause = elm('icon playpause play',mControls,togglePlay);
				} else if (ctrl===oReturn.STOP) {
					mCnStop = elm('icon stop',mControls,stop);
				} else if (ctrl===oReturn.VOLUME) {// TODO: add
					mCnVolume = elm('icon volume');
				} else if (ctrl===oReturn.MUTE) {
					mCnMute = elm('icon mute',mControls,toggleSound);
				} else if (ctrl===oReturn.FULLSCREEN) {
					mCnFullscreen = elm('icon fullscreen',mControls,toggleFullscreen);
				} else if (ctrl===oReturn.SCRUB) {
					mCnScrub = elm('scrub',mControls,scrub);
					var $CnGutter = elm('gutter',mCnScrub,scrub);
					mControlsBar = elm('bar',$CnGutter);
					mControlsBuffer = elm('buffer',$CnGutter);
				} else if (ctrl===oReturn.TIME) {
					mCnTime = elm('time',mControls);
					showTime();
				} else if (ctrl===oReturn.CENTER) {
					mCenter = elm('icon center play',mWrap,togglePlay);
					// test if center is only ui element
					if (settings.controls.length===1) mWiddio.removeChild(mControls);
				}
			});
			// overlay
			elm('overlay',mWrap,togglePlay);
			// finally insert wrapper and add video
			mVideo.parentNode.insertBefore(mWiddio,mVideo);
			mWrap.appendChild(mVideo);
			// once added to DOM measure controls
			iControlsHeight = mControls.offsetHeight;
			// set public api
			mWiddio.widdio = oPublicWiddio;
			// check or set id
			if (sVideoId) mWiddio.setAttribute('id','widdio_'+sVideoId);
			// fade ui when playing
			if (settings.controlsFadeTime!==0) {
				if (settings.controlsFadeWhenPaused) {
					mCenter&&mCenter.hide();//todo:fix
					if (settings.controlsPosition===oReturn.CONTROLS_OVER) mControls.hide();
				}
				mWiddio.addEventListener('mouseout',handleWiddioMouseout);
				mWiddio.addEventListener('mousemove',handleWiddioMousemove);
			}
			///////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////
			///////////////////////////////////////////////////////////////
//			$Widdio = $Video.wrap('<div class="widdio '+oReturn.STATE_START+'"></div>').parent()
//				.width(settings.width)
//				.addClass(settings.size+' '+settings.scaleMode+' '+$Video.attr("class"));
//
//			$Widdio.data('widdio',oPublicWiddio);
//			if ($Video.attr('id')!==undefined) $Widdio.attr('id',$.widdio.id.toLowerCase()+'_'+$Video.attr('id'));
//			$Wrap = $Video.wrap('<div class="wrap"></div>').parent();
//			$StaticWrap = $Wrap.wrap('<div class="staticwrap"></div>').parent();
//			$Controls = $('<div class="controls '+settings.controlsPosition+'"></div>').insertAfter($StaticWrap);
//			iControlsHeight = $Controls.height();
//			$.each(settings.controls,function(i,el){
//				switch (el) {
//					case oReturn.PLAYPAUSE:
//						$CnPlayPause = $('<div class="icon playpause play"></div>').appendTo($Controls).click(togglePlay);
//					break;
//					case oReturn.STOP:
//						$CnStop = $('<div class="icon stop"></div>').appendTo($Controls).click(stop);
//					break;
//					case oReturn.VOLUME: // TODO: add
//						$CnVolume = $('<div class="icon volume"></div>');
//					break;
//					case oReturn.MUTE:
//						$CnMute = $('<div class="icon mute"></div>').appendTo($Controls).click(toggleSound);
//					 break;
//					case oReturn.FULLSCREEN:
//						$CnFullscreen = $('<div class="icon fullscreen"></div>').appendTo($Controls).click(toggleFullscreen);
//					break;
//					case oReturn.SCRUB:
//						$CnScrub = $('<div class="scrub"></div>').appendTo($Controls).click(scrub);
//						var $CnGutter = $('<div class="gutter"></div>').appendTo($CnScrub).click(scrub);
//						$ControlsBar = $('<div class="bar"></div>').appendTo($CnGutter);
//						$ControlsBuffer = $('<div class="buffer"></div>').appendTo($CnGutter);
//					break;
//					case oReturn.TIME:
//						$CnTime = $('<div class="time"></div>').appendTo($Controls);
//						showTime();
//					break;
//					case oReturn.CENTER:
//						$Center = $('<div class="icon center play"></div>').insertAfter($Video).click(togglePlay);
//						// test if center is only ui element
//						if (settings.controls.length===1) $Controls.detach();
//					break;
//				}
//			});
//			//$Overlay =
//			$('<div class="overlay"></div>').insertAfter($Video).click(function(){$Video.click()});
//			// fade ui when playing
//			if (settings.controlsFadeTime!==0) {
//				if (settings.controlsFadeWhenPaused) {
//					$Center&&$Center.hide();
//					if (settings.controlsPosition===oReturn.CONTROLS_OVER) $Controls.hide();
//				}
//				$Widdio.mouseout(function(){
//					clearTimeout(iCenterFadeID);
//					if (settings.controlsFadeWhenPaused||!mVideo.paused) {
//						$Center&&$Center.stop().fadeTo("slow", 0);
//						if (settings.controlsPosition===oReturn.CONTROLS_OVER) {
//							clearTimeout(iControlsFadeID);
//							$Controls.stop();
//							$Controls.fadeTo("slow", 0);
//						}
//					}
//				}).mousemove(function(){
//					clearTimeout(iCenterFadeID);
//					$Center&&$Center.stop().fadeTo("slow", 1);
//					iCenterFadeID = setTimeout(function(){
//						if (!mVideo.paused) $Center&&$Center.fadeTo("slow", 0);
//					},iCenterFadeTime);
//					if (settings.controlsPosition===oReturn.CONTROLS_OVER) {
//						clearTimeout(iControlsFadeID);
//						$Controls.stop();
//						$Controls.fadeTo("slow", 1);
//						iControlsFadeID = setTimeout(function(){
//							if (!mVideo.paused) $Controls.fadeTo("slow", 0);
//						},iCenterFadeTime);
//					}
//				});
//			}
		}

		function handleWiddioMouseout(){
			clearTimeout(iCenterFadeID);
			if (settings.controlsFadeWhenPaused||!mVideo.paused) {
				mCenter&&mCenter.stop().fadeTo("slow", 0);//todo:fix
				if (settings.controlsPosition===oReturn.CONTROLS_OVER) {
					clearTimeout(iControlsFadeID);
					mControls.stop();//todo:fix
					mControls.fadeTo("slow", 0);//todo:fix
				}
			}
		}

		function handleWiddioMousemove(){
			clearTimeout(iCenterFadeID);
			mCenter&&mCenter.stop().fadeTo("slow", 1);//todo:fix
			iCenterFadeID = setTimeout(function(){
				if (!mVideo.paused) mCenter&&mCenter.fadeTo("slow", 0);//todo:fix
			},iCenterFadeTime);
			if (settings.controlsPosition===oReturn.CONTROLS_OVER) {
				clearTimeout(iControlsFadeID);
				mControls.stop();//todo:fix
				mControls.fadeTo("slow", 1);//todo:fix
				iControlsFadeID = setTimeout(function(){
					if (!mVideo.paused) mControls.fadeTo("slow", 0);//todo:fix
				},iCenterFadeTime);
			}
		}

		// resize
		function resize() {
			switch (settings.size) {
				case oReturn.SIZE_ORIGINAL:
					iWidW = iVideoW;
					iWidH = iVideoH;
				break;
				case oReturn.SIZE_FIXED:
					iWidW = settings.width;
					iWidH = settings.height;
				break;
				case oReturn.SIZE_FULLSCREEN:
					iWidW = iScrW;
					iWidH = iScrH;
				break;
				case oReturn.SIZE_DYNAMIC:
					mWiddio.style.width = 'auto';
					mWiddio.style.height = 'auto';
					iWidW = mWiddio.offsetWidth;
					iWidH = mWiddio.offsetHeight;
//					mWiddio.css({width:'auto',height:'auto'});
//					iWidW = mWiddio.width();
//					iWidH = mWiddio.height();
				break;
			}
			fWidAspR = iWidW/iWidH;
//			mWiddio.width(iWidW);
			mWiddio.style.width = iWidW+'px';
			//
			if (settings.size!==oReturn.SIZE_FULLSCREEN) {
//				var iWreal = mWiddio.width();
				var iWreal = mWiddio.offsetWidth;
				var bWisW = iWreal===iWidW;
				if (!bWisW) {
					iWidH = parseInt(iWidH*(iWreal/iWidW),10);
					iWidW = iWreal;
				}
			}
//			mWiddio.height(iWidH + (settings.size!==oReturn.SIZE_FULLSCREEN&&settings.controlsPosition!==oReturn.CONTROLS_OVER?iControlsHeight:0));
			mWiddio.style.height = (iWidH + (settings.size!==oReturn.SIZE_FULLSCREEN&&settings.controlsPosition!==oReturn.CONTROLS_OVER?iControlsHeight:0))+'px';
//			console.log('h',iWidH,iWidH + (oSettings.size!==ww.SIZE_FULLSCREEN&&oSettings.controlsPosition!==ww.CONTROLS_OVER?iControlsHeight:0)); // log
			resizeVideo();
			resizeControls();
			resizeScrub();
			//console.log($Video.attr('id'),iWidW,iWidH,$Widdio.width(),$Widdio.height(),iVidW,iVidH,oSettings.size,oSettings.controlsPosition,oSettings.controlsHeight); // log
		}
		// resizeVideo
		function resizeVideo() {	//  to do: iWidW
			var sL = 'auto';		//  to do: iWidW
			var sT = 'auto';		//  to do: iWidW
			var sW = '100%';		//  to do: iWidW
			var sH = '100%';		//  to do: iWidW
			mWiddio.style.width = iWidW+'px';
			mWiddio.style.height = iWidH+'px';
//			$Video.width(iWidW).height(iWidH);
			if (settings.scaleMode===oReturn.SCALE_NOBARS&&settings.size!==oReturn.SIZE_ORIGINAL) {
				var bFullscreen = settings.size===oReturn.SIZE_FULLSCREEN;
				var iTmpW = bFullscreen?iScrW:iWidW;
				var iTmpH = bFullscreen?iScrH:iWidH;
				var fTmpAspR = bFullscreen?fScrAspR:fWidAspR;
				if (fTmpAspR>fVidAspR) {
					var iTH = Math.floor(iTmpW/fVidAspR);
					sT = parseInt((iTmpH-iTH)/2)+'px';
					sH = iTH+'px';
				} else {
					var iTW = Math.floor(iTmpH*fVidAspR);
					sL = parseInt((iTmpW-iTW)/2)+'px';
					sW = iTW+'px';
					sH = iTmpH+'px';
				}
				$Video.width('100%').height('100%');
				mStaticWrap.width(iWidW).height(iWidH);
			}
			if (!bFullscreen&&settings.scaleMode===oReturn.SCALE_ASPECTRATIO) {
				var iH = iWidW/fVidAspR;
				sW = iWidW+'px';
				sH = iH+'px';
			}
			mWrap.style.width = sW;
			mWrap.style.height = sH;
//			mWrap.css({
//				 width:		sW
//				,height:	sH
//			});
			mVideo.style.marginLeft = sL;
			mVideo.style.marginTop = sT;
//			$Video.css({
//				 marginLeft:sL
//				,marginTop:	sT
//			});
		}
		// resizeControls
		function resizeControls() {
			mControls.style.width = iWidW+'px';
//			mControls.width(iWidW);
			try { // todo: fix
				var iOverW = mControls.outerWidth(true)-iWidW;
//				mControls.width(iWidW-iOverW);
				mControls.style.width = (iWidW-iOverW)+'px';
			}catch(err){}
		}
		// resizeScrub (todo: does not always init with multiple videos)
		function resizeScrub() {
			var iWidthMinusScrub = 0;
			try { // todo: fix
				mControls.children(':not(.scrub)').each(function(i,el){
					iWidthMinusScrub += $(el).outerWidth(true);
				});
				var iScrubW = mControls.width()-iWidthMinusScrub;
				if (mCnScrub) mCnScrub.width(iScrubW);
			}catch(err){}
		}

		// toggleFullscreen
		function toggleFullscreen(e){
			console.log('toggleFullscreen',!!requestFullScreen,bWebkit); // log
			// browser fullscreen (with user interface)
			if (requestFullScreen||bWebkit) {
				if (requestFullScreen) {
					if (isFullscreen()) {
						// this is fucking stupid... why doesn't this work: (document.exitFullScreen||document.webkitCancelFullScreen||document.mozCancelFullScreen)();
						if (document.exitFullScreen) document.exitFullScreen();
						else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
						else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
					} else {
						setFullscreenView(true);
						try	{ // try/catch because mozilla tends to screw it
							requestFullScreen.call(mWiddio[0]);
						} catch(err) {
							console.log(err+' reverting to fake fullscreen'); // log
							requestFullScreen = null; // todo: wrong solution...
						}
					}
				} else {
					setFullscreenView();
				}

			// webkit video fullscreen (reverts to native webkit user interface)
			} else if (bWebkit&&mVideo.webkitSupportsFullscreen) { // &&!oVideo.webkitDisplayingFullscreen
				mVideo.webkitEnterFullscreen();

			} else {
				setFullscreenView();

			}
		}
		// setFullscreenView
		function setFullscreenView(toFull){
			if (toFull===undefined) toFull = settings.size!==oReturn.SIZE_FULLSCREEN;
			//
			var bPlaying = !mVideo.paused;
			mWiddio.removeClass(settings.size);
			if (toFull) {
				sOriginalSize = settings.size; // store size when going fullscreen
				settings.size = oReturn.SIZE_FULLSCREEN;
				if (!requestFullScreen) {
					$WiddioGhost = $('<div></div>').insertAfter(mWiddio);
					mWiddio.prependTo($Body);
				}
			} else {
				settings.size = sOriginalSize?sOriginalSize:oReturn.SIZE_ORIGINAL;
				if ($WiddioGhost&&$WiddioGhost.length) {
					mWiddio.insertAfter($WiddioGhost);
					$WiddioGhost.remove();
					$WiddioGhost = null;
				}
			}
			mWiddio.addClass(settings.size);
			resize();
			!requestFullScreen&&bPlaying&&mVideo.play();
		}

		//
		// scrub
		function scrub(e) {
			setPartPlayed((e.pageX-mCnScrub.offset().left)/mCnScrub.width());
		}

		// setPartPlayed
		function setPartPlayed(f) {
			mVideo.currentTime = f*mVideo.duration;
		}

		// getPartPlayed
		function getPartPlayed() {
			var fPartPlayed = 0;
			if (mVideo.currentTime&&mVideo.duration) fPartPlayed = mVideo.currentTime/mVideo.duration;
			return fPartPlayed;
		}

		// isPlaying
		function isPlaying() {
			return mVideo.currentTime>0&&!mVideo.paused&&!mVideo.ended;
		}

		// playVideo
		function playVideo(file) {
			if (!mVideo.paused&&settings.fadeVolumeTime>0) {
				fadeOutBeforeLoad(file);
				return;
			}
			switch (typeof(file)) {
				case "string":
					mVideo.src = file;
				break;
				case "object": // removes all sources and inserts the new ones from the object
					aSources.remove();
					var bFound = false;
					$.each(file,function(type,src) {
						if (!bFound) {
							var sCanPlay = mVideo.canPlayType("video/"+type);
							if (sCanPlay=="maybe"||sCanPlay=="probably") {
								mVideo.src = src;
								bFound = true;
							}
						}
					});
					aSources = $Video.find("source");
				break;
			}
			mVideo.load();
			mVideo.play();
			if (mVideo.muted) { // hack for oVideo not remembering the sound state correctly after load
				toggleSound(true);
				toggleSound(false);
			}
			showPlayPause();
		}

		// stop
		function stop() {
			togglePlay(false);
			mVideo.currentTime = 0;
		}

		// togglePlay
		function togglePlay(e) {
			var bT = e===true;
			var bF = e===false;
			var bE = bT||bF;
			if ((!bE&&mVideo.paused)||(bE&&bT)) {
				mVideo.play();
			} else if ((!bE&&!mVideo.paused)||(bE&&bF)) {
				mVideo.pause();
			}
		}

		// showPlayPause
		function showPlayPause() {
//					$Center&&$Center.attr('data-char',oVideo.paused?oSettings.charPlay:oSettings.charPause);
			mCenter&&mCenter.removeClass(!mVideo.paused?'play':'pause').addClass(mVideo.paused?'play':'pause');
			mCnPlayPause&&mCnPlayPause.removeClass(!mVideo.paused?'play':'pause').addClass(mVideo.paused?'play':'pause');
//					$CnPlayPause&&$CnPlayPause.attr('data-char',oVideo.paused?oSettings.charPlay:oSettings.charPause);
		}

		// showTime
		function showTime() {
//			$CnTime&&$CnTime.text(formatMinutes(mVideo.currentTime||0)+' / '+formatMinutes(mVideo.duration||0));
			if (mCnTime) {
				mCnTime.textContent = formatMinutes(mVideo.currentTime||0)+' / '+formatMinutes(mVideo.duration||0)
			}
		}

		// formatMinutes
		function formatMinutes(f) {
//			return (''+parseInt(f/60)).pad(2,0,true)+':'+(''+parseInt(f)%60).pad(2,0,true);
			return string.pad(''+parseInt(f/60),2,0,true)+':'+string.pad(''+parseInt(f)%60,2,0,true);
		}

		// toggleSound
		function toggleSound(e) { // volume :: float (0-1), muted :: Boolean, null :: toggle mute
			// TODO: save states in cookie
			if (typeof(e)==='object'||e===null||e===undefined) e = mVideo.muted;
			var bT = e===true;
			var bF = e===false;
			if (bT||bF) { // mute
				mVideo.muted = !e;
			} else { // volume
				toggleSound(true);
				mVideo.volume = e;
			}
		}

		// showSound
		function showSound() {
			mCnMute.removeClass(!mVideo.muted?'muted':'mute').addClass(mVideo.muted?'muted':'mute');
		}

		// handleMediaEvent
		function handleMediaEvent(e) {
			//console.log('handleMediaEvent',e.type,e); // log
			switch (e.type) {
				case 'loadedmetadata':
					iVideoW = mVideo.videoWidth;
					iVideoH = mVideo.videoHeight;
					fVidAspR = iVideoW/iVideoH;
					resize();
					resize();
					showTime();
				break;
				case 'play':
					showPlayPause();
					setCssState();
					if (oReturn.playOne) playOne(mVideo);
				break;
				case 'pause':
					showPlayPause();
					setCssState();
				break;
				case 'timeupdate':
					mControlsBar&&mControlsBar.css("width",(100*getPartPlayed())+"%");
					showTime();
					setCssState();
				break;
				case 'ended':
					mVideo.pause();
					setCssState();
				break;
				case 'volumechange':
					showSound();
				break;
				case 'error':
					var oError = e.target.error;
					switch (oError.code) {
						case oError.MEDIA_ERR_ABORTED: warn('You aborted the video playback.'); break;
						case oError.MEDIA_ERR_NETWORK: warn('A network error caused the video download to fail part-way.'); break;
						case oError.MEDIA_ERR_DECODE: warn('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.'); break;
						case oError.MEDIA_ERR_SRC_NOT_SUPPORTED: warn('The video could not be loaded, either because the server or network failed or because the format is not supported.'); break;
						default: warn('An unknown error occurred.'); break;
					}
				break;
			}
		}

		// set css state
		var sState = oReturn.STATE_START;
		function setCssState() {
			var sOldState = sState;
			if (mVideo.paused) {
				if (mVideo.currentTime===0) sState = oReturn.STATE_START;
				else if (mVideo.currentTime===mVideo.duration) sState = oReturn.STATE_ENDED;
				else sState = oReturn.STATE_PAUSED;
			} else {
				sState = oReturn.STATE_PLAYING;
			}
			if (sOldState!=sState) {
				mWiddio.removeClass(sOldState);
				mWiddio.addClass(sState);
				if (settings.stateChange) settings.stateChange(sState);
			}
		}

		// fadeOutBeforeLoad
		function fadeOutBeforeLoad(file) {
			$Video.animate(
				 {opacity:0}
				,{
					 duration: settings.fadeVolumeTime
					,step: function(i,o){
						mVideo.volume = 1-o.pos;
					}
					,complete: function(){
						togglePlay(false);
						playVideo(file);
						$Video.fadeTo(1,1);
						mVideo.volume = 1;
					}
				}
			);
		}
	};

	return oReturn;
})(iddqd));