/**
 * A mathematical vector with an x and y position.
 * Can be used for numerous vector calculations.
 * @name iddqd.vector
 * @method
 * @param {Number} x
 * @param {Number} y
 * @returns {Vector}
 */
iddqd.ns('iddqd.vector',(function(){
	'use strict';
	var aPool = [];

	/**
	 * @class Vector
	 */
//	 * @property {Function} getX - Get the x position
//	 * @property {Function} getY - Get the y position
//	 * @property {Function} setX - Set the x position
	function vector(x,y) {
		var fX,fY

			,_vector = iddqd.vector// todo: check if this works

			,fSize = 0
			,bRecalculateSize = true

			,fRad = 0
			,bRecalculateRadians = true

			,iLargest = 4503599627370496

			,oVector = {
				getX: getX
				,getY: getY
				,setX: setX
				,setY: setY
				,set: setXY
				,setVector: setVector
				//
				,size: size
				,setSize: setSize
				,normalize: normalize
				,normalized: normalized
				,distance: distance
				//
				,radians: radians
				,degrees: degrees
				,angle: angle
				,rotate: rotate
				,rotation: rotation
				//
				,add: add
				,addNumber: addNumber
				,addVector: addVector
				,subtract: subtract
				,subtractNumber: subtractNumber
				,subtractVector: subtractVector
				,multiply: multiply
				,multiplyNumber: multiplyNumber
				,multiplyVector: multiplyVector
				,divide: divide
				,divideNumber: divideNumber
				,divideVector: divideVector
				,average: average
				//
				,uv: uv
				,inTriangle: inTriangle
				,map: map
				//,intersectLineLine: intersectLineLine
				//
				,clone: clone
				//
				,drop: drop
				//
				,toString: toString
				,toArray: toArray
			}
		;

		// initialisation
		setXY(x,y);
		function drop() {
			aPool.push(oVector);
			return oVector;
		}

		// GETTER SETTER

		/**
		 * Get the x position
		 * @memberof Vector
		 * @returns {Number}
		 */
		function getX(){return fX;}

		/**
		 * Get the y position
		 * @memberof Vector
		 * @returns {Number}
		 */
		function getY(){return fY;}

		/**
		 * Sets the x value and returns the vector.
		 * @memberof Vector
		 * @param {Number} x
		 * @returns {Vector}
		 */
		function setX(x){
			bRecalculateRadians = true;
			bRecalculateSize = true;
			fX = x;
			return oVector;
		}
		/**
		 * Sets the y value and returns the vector.
		 * @memberof Vector
		 * @param {Number} y
		 * @returns {Vector}
		 */
		function setY(y){
			bRecalculateRadians = true;
			bRecalculateSize = true;
			fY = y;
			return oVector;
		}

		/**
		 * Sets the x and y values and returns the vector.
		 * @memberof Vector
		 * @param {Number} x
		 * @param {Number} y
		 * @returns {Vector}
		 */
		function setXY(x,y){
			bRecalculateRadians = true;
			bRecalculateSize = true;
			fX = x;
			fY = y;
			return oVector;
		}

		/**
		 * Copies the x and y value from the parsed vector and returns the vector.
		 * @memberof Vector
		 * @param {Vector} v
		 * @returns {Vector}
		 */
		function setVector(v){
			bRecalculateRadians = true;
			bRecalculateSize = true;
			fX = v.getX();
			fY = v.getY();
			return oVector;
		}

		// SIZE FUNCTIONS

		/**
		 * Returns the size of the vector
		 * @memberof Vector
		 * @returns {number}
		 */
		function size(){
			if (bRecalculateSize) {
				fSize = Math.sqrt(fX*fX+fY*fY);
				bRecalculateSize = false;
			}
			return fSize;
		}

		/**
		 * Sets the size and returns the vector
		 * @memberof Vector
		 * @param {Number} f
		 * @returns {Vector}
		 */
		function setSize(f){
			normalize();
			fX = fX * f;
			fY = fY * f;
			fSize = f;
			return oVector;
		}

		/**
		 * Normalizes the vector and returns it.
		 * @memberof Vector
		 * @returns {Vector}
		 */
		function normalize(){
			if (size()!==0&&fSize!==1){ // todo: make faster
				fX = fX / fSize;
				fY = fY / fSize;
				fSize = 1;
			}
			return oVector;
		}

		/**
		 * Returns a new, normalized vector.
		 * @memberof Vector
		 * @returns {Vector}
		 */
		function normalized(){
			return _vector(fX/size(),fY/size());
		}

		/**
		 * Returns the distance between two vectors
		 * @memberof Vector
		 * @param {Vector} v
		 * @returns {Number}
		 */
		function distance(v){
			v = v.clone();
			v.subtract(oVector);
			return v.drop().size();
		}

		// ROTATION FUNCTIONS

		/**
		 * Returns the rotation of the vector in radians.
		 * @memberof Vector
		 * @returns {number} A number from 0 to 2
		 */
		function radians(){
			if (bRecalculateRadians) {
				fRad = (fY>0?1:0)+Math.atan(-fX/fY)/Math.PI;
				bRecalculateRadians = false;
			}
			return fRad;
		}

		/**
		 * Returns the rotation of the vector in degrees.
		 * @memberof Vector
		 * @returns {number} A number from 0 to 360
		 */
		function degrees(){
			return radians()*180;
		}

		/**
		 * Returns the angle in radians.
		 * @memberof Vector
		 * @obsolete use radians
		 * @returns {number}
		 */
		function angle(){
			return radians();
		}

		/**
		 * Adds radians to the rotation of the vector and returns it.
		 * @memberof Vector
		 * @param {Number} radians
		 * @returns {Vector}
		 */
		function rotate(radians){
			fRad = radians()+radians;
			calculateXY();
			return oVector;
		}

		/**
		 * Sets the rotation of the vector and returns it.
		 * @memberof Vector
		 * @param {Number} radians
		 * @returns {Vector}
		 */
		function rotation(radians){
			fRad = radians;
			calculateXY();
			return oVector;
		}

		// NORMAL CALCULATIONS

		// ADDING

		/**
		 * Translates the vector by adding either a number or a vector.
		 * @memberof Vector
		 * @param {Number|Vector} o
		 * @returns {Vector}
		 */
		function add(o){
			return isObject(o)?addVector(o):addNumber(o);
		}

		/**
		 * Translates the vector by addition. Presumes x is y if y value is not given.
		 * @memberof Vector
		 * @param {Number} x
		 * @param {Number} [y]
		 * @returns {Vector}
		 */
		function addNumber(x,y){
			fX = fX + x;
			fY = fY + (y===undefined?x:y);
			bRecalculateRadians = true; // todo: could be unnecessary unless negative
			bRecalculateSize = true;
			return oVector;
		}

		/**
		 * Translates the vector by adding another vector.
		 * @memberof Vector
		 * @param {Vector} v
		 * @returns {Vector}
		 */
		function addVector(v){
			fX = fX + v.getX();
			fY = fY + v.getY();
			bRecalculateRadians = true;
			bRecalculateSize = true;
			return oVector;
		}

		// SUBTRACTION

		/**
		 * Translates the vector by subtracting either a number or a vector.
		 * @memberof Vector
		 * @param {Number|Vector} o
		 * @returns {Vector}
		 */
		function subtract(o){
			return isObject(o)?subtractVector(o):subtractNumber(o);
		}

		/**
		 * Translates the vector by subtraction. Presumes x is y if y value is not given.
		 * @memberof Vector
		 * @param {Number} x
		 * @param {Number} [y]
		 * @returns {Vector}
		 */
		function subtractNumber(x,y){
			fX = fX - x;
			fY = fY - (y===undefined?x:y);
			bRecalculateRadians = true; // todo: could be unnecessary unless negative
			bRecalculateSize = true;
			return oVector;
		}

		/**
		 * Translates the vector by subtracting another vector.
		 * @memberof Vector
		 * @param {Vector} v
		 * @returns {Vector}
		 */
		function subtractVector(v){
			fX = fX - v.getX();
			fY = fY - v.getY();
			bRecalculateRadians = true;
			bRecalculateSize = true;
			return oVector;
		}

		// MULTIPLY

		/**
		 * Multiplies the vector by either a number or a vector.
		 * @memberof Vector
		 * @param {Number|Vector} o
		 * @returns {Vector}
		 */
		function multiply(o){
			return isObject(o)?multiplyVector(o):multiplyNumber(o);
		}

		/**
		 * Multiplies the vector. Presumes x is y if y value is not given.
		 * @memberof Vector
		 * @param {Number} x
		 * @param {Number} [y]
		 * @returns {Vector}
		 */
		function multiplyNumber(x,y){
			fX = fX * x;
			fY = fY * (y===undefined?x:y);
			fSize = fSize * x;
			return oVector;
		}

		/**
		 * Multiplies the vector by another vector.
		 * @memberof Vector
		 * @param {Vector} v
		 * @returns {Vector}
		 */
		function multiplyVector(v){
			fX = fX * v.getX();
			fY = fY * v.getY();
			bRecalculateRadians = true;
			bRecalculateSize = true;
			return oVector;
		}

		// DIVIDE

		/**
		 * Divides the vector by either a number or a vector.
		 * @memberof Vector
		 * @param {Number|Vector} o
		 * @returns {Vector}
		 */
		function divide(o) {
			return isObject(o)?divideVector(o):divideNumber(o);
		}

		/**
		 * Divides the vector. Presumes x is y if y value is not given.
		 * @memberof Vector
		 * @param {Number} x
		 * @param {Number} [y]
		 * @returns {Vector}
		 */
		function divideNumber(x,y) {
			if (x===0) x = iLargest;
			if (y===0) y = iLargest;
			fX = fX / x;
			fY = fY / (y===undefined?x:y);
			fSize = fSize / x;
			return oVector;
		}

		/**
		 * Divides the vector by another vector.
		 * @memberof Vector
		 * @param {Vector} v
		 * @returns {Vector}
		 */
		function divideVector(v) {
			fX = fX / (v.getX()|iLargest);
			fY = fY / (v.getY()|iLargest);
			bRecalculateRadians = true;
			bRecalculateSize = true;
			return oVector;
		}

		// AVERAGE

		/**
		 * Calculates the average between two vectors
		 * @memberof Vector
		 * @param {Vector} v the other vector
		 * @param {Number} [f=0.5] how much the other vector weighs
		 * @returns {Vector}
		 */
		function average(v,f) {
			if (f===undefined) f = 0.5;
			multiplyNumber(1-f).add(v.clone().drop().multiplyNumber(f));
			bRecalculateRadians = true;
			bRecalculateSize = true;
			return oVector;
		}

/*	//
	function crossProduct(v1,v2) {
		return v1.getX()*v2.getY() - v1.getY()*v2.getX();
	}
	function dotProduct(v1,v2) {
		return v1.getX()*v2.getX() + v1.getY()*v2.getY();
	}
	function sameSide(p1,p2, a,b) {
//		var cp1 = crossProduct(b-a, p1-a)
//			,cp2 = crossProduct(b-a, p2-a);
		var cp1 = crossProduct(b.clone().subtract(a), p1.clone().subtract(a))
			,cp2 = crossProduct(b.clone().subtract(a), p2.clone().subtract(a));
		return dotProduct(cp1,cp2)>=0;
	}
	function pointInTriangle(p, a,b,c) {
		return sameSide(p,a, b,c)&&sameSide(p,b, a,c)&&sameSide(p,c, a,b);
	}*/
	function getTriangleVectors(a,b,c){
		var  ax = a.getX()
			,ay = a.getY()
			,bx = b.getX()
			,by = b.getY()
			,cx = c.getX()
			,cy = c.getY();
		return {v1:_vector(cx-ax,cy-ay),v2:_vector(bx-ax,by-ay)};
	}
	function uv(a,b,c) {
		var oTV = getTriangleVectors(a,b,c)
			,v1 = oTV.v1
			,v2 = oTV.v2
			,a1 = v1.toArray()
			,a2 = v2.toArray()
			,ap = [fX-a.getX(),fY-a.getY()]
			//
			,dot00 = a1[0]*a1[0] + a1[1]*a1[1]
			,dot01 = a1[0]*a2[0] + a1[1]*a2[1]
			,dot02 = a1[0]*ap[0] + a1[1]*ap[1]
			,dot11 = a2[0]*a2[0] + a2[1]*a2[1]
			,dot12 = a2[0]*ap[0] + a2[1]*ap[1]
			//
			,invDenom = 1 / (dot00*dot11 - dot01*dot01)
			//
			,u = (dot11*dot02 - dot01*dot12) * invDenom
			,v = (dot00*dot12 - dot01*dot02) * invDenom
		;
		return {u:u,v:v,v1:v1,v2:v2};
	}
	function map(a,b,c,d,e,f){
		var oUv = uv(a,b,c)
			,oTV = getTriangleVectors(d,e,f)
			,vb1 = oTV.v1
			,vb2 = oTV.v2
			,fb1 = vb1.size()
			,fb2 = vb2.size()
		;
		vb1.normalize().multiply(oUv.u*fb1);
		vb2.normalize().multiply(oUv.v*fb2);
		return d.clone().add(vb1).add(vb2);
	}
	function inTriangle(a,b,c){ // credit: http://www.blackpawn.com/texts/pointinpoly/default.html
		var oUv = uv(a,b,c)
			,u = oUv.u
			,v = oUv.v;
		return u>=0 && v>=0 && u+v<1;
	}
	/*function intersectLineLine(a1,a2,b1,b2) { // credit; http://www.kevlindev.com/gui/math/intersection
		var result;
		var ua_t = (b2.getX() - b1.getX()) * (a1.getY() - b1.getY()) - (b2.getY() - b1.getY()) * (a1.getX() - b1.getX());
		var ub_t = (a2.getX() - a1.getX()) * (a1.getY() - b1.getY()) - (a2.getY() - a1.getY()) * (a1.getX() - b1.getX());
		var u_b = (b2.getY() - b1.getY()) * (a2.getX() - a1.getX()) - (b2.getX() - b1.getX()) * (a2.getY() - a1.getY());
		if (u_b!=0) {
			var ua = ua_t/u_b;
			var ub = ub_t/u_b;
			if (0<=ua && ua<=1 && 0<=ub && ub<=1) {
				result = vector(a1.getX() + ua * (a2.getX() - a1.getX()),a1.getY() + ua * (a2.getY() - a1.getY()));
			}
		}
		return result;
	}*/

		// private
		function calculateXY(){
			fX =  size()*Math.sin(fRad*Math.PI);
			fY = -size()*Math.cos(fRad*Math.PI);
		}
		function isObject(o){
			return typeof o=='object';
		}

		// misc
		function clone(){
			return _vector(fX,fY);
		}
		function toString(){
			return '[object vector('+fX+','+fY+')]';
		}
		function toArray(){
			return [fX,fY];
		}

		// return
		return oVector;
	}
	return function(x,y) {
		return aPool.length?aPool.pop().set(x,y):vector(x,y);
	};
})());
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////


	iddqd.vector.crossPoint = function (v1,v2,v3,v4) {
		'use strict';
		var  v12 = v1.clone().subtractVector(v2)
			,fA1 = v12.getY()/v12.getX()
			,fB1 = v2.getY()-v2.getX()*fA1

			,v34 = v3.clone().subtractVector(v4)
			,fA2 = v34.getY()/v34.getX()
			,fB2 = v4.getY()-v4.getX()*fA2

			,fX = (fB2-fB1)/(fA1-fA2)
			,fY = fX*fA1+fB1
		;
		return iddqd.vector(fX,fY);
	};

/*
			,p1 = [-40,-20+40*Math.sin(.0001*t)]
			,p2 = [-20,-5]
			,p12 = [p1[0]-p2[0],p1[1]-p2[1]]
			,p12a = p12[1]/p12[0]
			,p12b = p1[1]-p1[0]*p12a
			//
			,p3 = [40,0]
			,p4 = [35+40*Math.sin(.00023*t),-10]
			,p34 = [p3[0]-p4[0],p3[1]-p4[1]]
			,p34a = p34[1]/p34[0]
			,p34b = p3[1]-p3[0]*p34a
			//
			// x = x*p12a+p12b
			// x = x*p34a+p34b
			// x*p12a+p12b = x*p34a+p34b
			// x*p12a-x*p34a = p34b-p12b
			// x*(p12a-p34a) = p34b-p12b
			// x = (p34b-p12b)/(p12a-p34a)
			,xx = (p34b-p12b)/(p12a-p34a)
		;
*/
/*var vector = iddqd.vector
	,v1 = vector(1,2).drop()
	,v2 = vector(9,9)
	,v3 = vector(5,5)
;
var i = 100;
while (i--){
	vector(1,2).drop()
}
window.onerror=function(err){
	//console.log(JSON.stringify(arguments));
	console.log(err);
};
alert(v2);*/