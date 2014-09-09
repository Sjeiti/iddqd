// todo probably obsolete because background-size:cover

/*! loadImage */
/**
 * iddqd.sizeImage
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @namespace hansreinerie
 * @requires signals.js
 * @requires iddqd.js
 * @requires iddqd.signals.js
 * @requires iddqd.vector.js
 * @requires iddqd.loadImage.js
 */
iddqd.ns('iddqd.sizeImage',(function(rv){
	var aImages = []
		,iW,iH
		,iProcessed = 0
		,sgProcessed = new signals.Signal
		,fnInit = function(){
			fnSetWH(document.body.clientWidth,document.body.clientHeight);
			rv.loop(document.body.getElementsByTagName('img'),function(i,img){
				if (img.attributes&&img.attributes['data-sizes']) {
					iProcessed++;
					var oData = eval('('+img.attributes['data-sizes'].value+')');
					if (img.height===0&&img.width===0) {
						img.addEventListener('load',function(e){
							fnHandleImgInit(img,oData);
						});
					} else {
						fnHandleImgInit(img,oData);
					}
				}
			});
		}
		,fnHandleImgInit = function(img,data){
			var sBasePath = data.basepath||''
				,aSizes = []
				,iImgW = img.width
				,iImgH = img.height
				,fAspectRatio = iImgW/iImgH
			;
			console.log('parent'
				,img.parentNode
				,img.parentNode.clientWidth
				,img.parentNode.offsetWidth
//				,img.parentNode.style.margin
//				,img.parentNode.style.marginLeft
//				,img.parentNode.style.paddingLeft
//				,'foo'
			); // log
			rv.loop(data.sizes,function(i,o){
				aSizes.push({
					src:sBasePath+o.file
					,w: o.w||(o.h*fAspectRatio<<0)
					,h: o.h||(o.w/fAspectRatio<<0)
				});
			});
			aSizes.sort(function(a,b){
				return a.w>b.w?1:-1;
			});
			var oImg = {
				 img: img
				,w: iImgW
				,h: iImgH
				,ar: fAspectRatio
				,sizes: aSizes
			};
			aImages.push(oImg);
			iProcessed--;
			if (iProcessed===0) sgProcessed.dispatch(aImages);
			fnTestSize(oImg);
		}
		,fnTestSizes = function(){
			rv.loop(aImages,function(i,oImg){fnTestSize(oImg)});
		}
		,fnTestSize = function(oImg){
//			console.log('testSize',oImg,oImg.img.width); // log
			var aSizes = oImg.sizes
				,mImg = oImg.img
				,iCurrentW = mImg.width
				,oLastSize;
			for (var j=0,l=aSizes.length;j<l;j++) {
				var oSize = aSizes[j];
				if (oSize.w<iW) {
//				if (oSize.w<oImg.img.width) {
					oLastSize = oSize;
				} else {
					break;
				}
			}
			if (oLastSize&&oLastSize.w!==iCurrentW) {
//				console.log(oLastSize); // log
				rv.loadImage(oLastSize.src,function(){
					mImg.src = oLastSize.src;
//					console.log('new size loaded'); // log
				});
			}
		}
		,fnResize = function(oldw,oldh,neww,newh){
			fnSetWH(neww,newh);
			fnTestSizes();
		}
		,fnSetWH = function(w,h){
			iW = w;
			iH = h;
		}
	;
	fnResize();
	rv.signals.resize.add(fnResize);
	return {
		toString: function(){return '[object sizeImage]'}
		,getImages: function(){return aImages}
		,processed: sgProcessed
		,init: fnInit
	};
})(iddqd));
