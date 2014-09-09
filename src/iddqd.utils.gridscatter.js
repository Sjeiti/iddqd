/*
gridscatter.add(
	{number} gridSize
	,{number} gridRadius
	,{Function} createSprite(prng,...).reset(prng,...)
)
gridscatter.animate()
*/
iddqd.ns('iddqd.utils.gridscatter',function(canvas,undefined) {
	'use strict';
	
	var math = iddqd.math
		,sin = math.sin
		,cos = math.cos
		,random = math.prng.lcg.random
		,ceil = Math.ceil
		//
		,mCanvas = canvas
		,oContext = mCanvas.getContext('2d')
		,iW = mCanvas.width
		,iH = mCanvas.height
		//
		,aCollection = []
		,iCollection = 0
	;
	
	/*
	 * Adds an object type
	 * @param {number} gridSize
	 * @param {number} gridRadius
	 * @param {Function} createSprite(prng,...).reset(prng,...)
	 */
	function add(gridSize,gridRadius,createSprite,props) {
		//
		var aSprites = []
			,oCollection = iddqd.extend(props||{},{
				resize: collectionResize
				,gridSize: gridSize
				,gridRadius: gridRadius
				,gridX: 0
				,gridY: 0
				,sprites: aSprites
				,seed: random()
				,speed: 1
				//,args:[]
			})
		;
		function collectionResize() {
			var	iGridAdd = ceilGrid(gridSize,gridRadius);
			oCollection.gridX = ceilGrid(gridSize,iW) + 2*iGridAdd;
			oCollection.gridY = ceilGrid(gridSize,iH) + 2*iGridAdd;
			return oCollection;
		}
		//
		collectionResize();
		for (var i=0;i<oCollection.gridX;i++) {
			aSprites.push(sprite(createSprite,props&&props.args));
		}
		//
		iCollection = aCollection.push(oCollection);
	}
	
	/*
	 */	
	function resize(){
		iW = mCanvas.width;
		iH = mCanvas.height;
		for (var i=0;i<iCollection;i++) {
			aCollection[i].resize();
		}
	}
	
	/*
	 */
	function sprite(createSprite,args) {
		var mSprite = document.createElement('canvas')
			,oSprite = mSprite.getContext('2d')
			
		;
		mSprite.reset = function(seed) {
			mSprite.seed = seed;
			if (args===undefined) {
				createSprite(mSprite,oSprite,seed);
			} else {
				var aParams = [mSprite,oSprite,seed];
				Array.prototype.push.apply(aParams,args);
				createSprite.apply(null,aParams);
			}
		}
		mSprite.reset(1);
		return mSprite;
	}
	
	/*
	 */
	function animate(offset) {
		//
		//!window.lpo&&alert(iCollection+' ');window.lpo=true;
		//
		for (var k=0;k<iCollection;k++) {
			var oCollection = aCollection[k]
				,iGridSize = oCollection.gridSize
				,iGridRadius = oCollection.gridRadius
				,iGridX = oCollection.gridX
				,iGridY = oCollection.gridY
				,aSprites = oCollection.sprites
				,fOffsetX = oCollection.speed*offset
				//
				,aDraw = []
			;
			for (var i=0;i<iGridX;i++) {
				var iX = i - ceil(fOffsetX/iGridSize)
					,iSeed = oCollection.seed*iX*iX
					,fRandom = random(iSeed)
					,iSpriteX = i*iGridSize - iGridRadius + fOffsetX%iGridSize + (random()-.5)*iGridRadius
					,iSpriteY = .15*iH + iH*fRandom*.15
				;
				aDraw.push({
					sprite: getSpriteBySeed(aSprites,iSeed)
					,x: iSpriteX
					,y: iSpriteY
					,seed: iSeed
					,random: fRandom
				});
			}
			aDraw.sort(function(a,b){return a.y>b.y?1:-1});
			for (var i=0,l=aDraw.length;i<l;i++) {
				var oDraw = aDraw.shift()//aDraw[i]
					,mDrawSprite = oDraw.sprite;
				if (mDrawSprite===undefined) {
					mDrawSprite = aSprites.pop();
					//var iSize = .2*iSpriteMaxW+.8*iSpriteMaxW*oDraw.random;
					//document.getElementById('content').textContent = draw.x+': '+draw.seed;
					mDrawSprite.reset(oDraw.seed);//,iSize);
				}
				if (mDrawSprite.hasOwnProperty('y')) oDraw.y = mDrawSprite.y;
				oContext.drawImage(
					mDrawSprite
					,oDraw.x-mDrawSprite.width/2
					,oDraw.y-mDrawSprite.height/2
				);
				aSprites.push(mDrawSprite);
			}
		}
	}
	
	/*
	 */
	function getSpriteBySeed(list,seed) {
		var mSprite;
		for (var j=0,l=list.length;j<l;j++) {
			var mCheckSprite = list[j];
			if (mCheckSprite.seed===seed) {
				mSprite = mCheckSprite;
				list.splice(j,1);
				break;
			}
		}
		return mSprite;
	}
	
	/*
	 */
	function ceilGrid(gridSize,gridRadius) {
		return ceil((gridRadius+1E-6)/gridSize);
	}
	
	return {
		add: add
		,animate: animate
		,resize: resize
		,toString: function(){
			return '[object gridscatter]';
		}
	};
});
	