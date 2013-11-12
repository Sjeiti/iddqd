/* global ActiveXObject */
iddqd.ns('iddqd.native.string',(function(iddqd){
	'use strict';
	return {
		/**
		 * Augment the String prototype
		 * Without augmentation all iddqd.native.string methods have to be applied (ie iddqd.native.string.camelCase.apply('camel-case')).
		 * @name iddqd.native.string.augment
		 * @method
		 * @returns {Boolean} Success
		 */
		augment: function() {
			return iddqd.augment(String,iddqd.native.string);
		}
		/**
		 * Pads a string left or right
		 * @param {Number} length Final length of the total string.
		 * @param {String} chr Character to pad the string with.
		 * @param {Boolean} [left=false] Pad to the left of the string.
		 * @returns {string} The padded string
		 */
		,pad: function(length,chr,left){
			if (left===undefined) left = false;
			var iLenStr = this.length
				,iLenPad = length-iLenStr
				,iLenChr = chr.length
				,bCut = iLenChr>1
				,iFill = Math.max(0,bCut?Math.ceil(iLenPad/iLenChr):iLenPad)
				,aFill = []
				,sFill
			;
			for (var i=0;i<iFill;i++) aFill.push(chr);
			sFill = aFill.join('');
			if (bCut) sFill = sFill.substr(0,iLenPad);
			return left?sFill+this:this+sFill;
		}
		/**
		 * Tries to determine the type of the string and returns it.
		 * @returns {Object} Returns a string, number or boolean.
		 */
		,toType: function(){
			// integer
			var i = parseInt(this,10);
			if (i.toString()==this) return i;
			// floating point
			var f = parseFloat(this);
			if (f.toString()==this) return f;
			// boolean
			var b = this=='true'||(this=='false'?false:null);
			if (b!==null) return b;
			//
			return this;
		}
		/**
		 * Converts string to XML
		 * @returns {Document} Returns an XML Document
		 */
		,toXML: function() {
			var xDoc;
			if (window.ActiveXObject) {
				xDoc = new ActiveXObject('Microsoft.XMLDOM');
				xDoc.async = 'false';
				xDoc.loadXML(this);
			} else {
				xDoc = new DOMParser().parseFromString(this,'text/xml');
			}
			return xDoc;
		}
		/**
		 * Converts an XML string to an object
		 * @returns {Object}
		 */
		,toXMLObj: function(){
			if (!iddqd.host||!iddqd.host.node||!iddqd.host.node.toObject) {
				console.warn('The required function iddqd.host.node.toObject does not exist');
				return false;
			} else {
				return iddqd.host.node.toObject.apply(iddqd.native.string.toXML.apply(this).childNodes[0]);
			}
		}
		/**
		 * Generates a random, but pronounceable string
		 * @param length {Number} Length of the string
		 * @param cut {Boolean} Cut string to length
		 * @returns {string}
		 */
		,generate: function(length,cut) {
			var isInt = function(n) {
				return (n%1)===0;
			};
			var rand = function(fStr,fEnd) {
				var fNum = fStr + Math.random()*(fEnd-fStr);
				return (isInt(fStr)&&isInt(fEnd))?Math.round(fNum):fNum;
			};
			if (length===undefined) length = 6;
			if (cut===undefined) cut = false;
			var aLtr = [
				['a','e','i','o','u','y']
				,['aa','ai','au','ea','ee','ei','eu','ia','ie','io','iu','oa','oe','oi','ua','ui']
				,['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','z']
				,['bb','br','bs','cc','ch','cl','cr','db','dd','df','dg','dh','dj','dk','dl','dm','dn','dp','dq','dr','ds','dt','dv','dw','dz','fb','fd','ff','fg','fh','fj','fk','fl','fm','fn','fp','fq','fr','fs','ft','fv','fw','fz','gb','gd','gf','gg','gh','gj','gk','gl','gm','gn','gp','gq','gr','gs','gt','gv','gw','gz','kb','kd','kf','kg','kh','kj','kk','kl','km','kn','kp','kq','kr','ks','kt','kv','kw','kz','lb','ld','lf','lg','lh','lj','lk','ll','lm','ln','lp','lq','lr','ls','lt','lv','lw','lz','mb','md','mf','mg','mh','mj','mk','ml','mm','mn','mp','mq','mr','ms','mt','mv','mw','mz','nb','nd','nf','ng','nh','nj','nk','nl','nm','nn','np','nq','nr','ns','nt','nv','nw','nz','pb','pd','pf','pg','ph','pj','pk','pl','pm','pn','pp','pq','pr','ps','pt','pv','pw','pz','qb','qd','qf','qg','qh','qj','qk','ql','qm','qn','qp','qq','qr','qs','qt','qv','qw','qz','rb','rd','rf','rg','rh','rj','rk','rl','rm','rn','rp','rq','rr','rs','rt','rv','rw','rz','sb','sc','sd','sf','sg','sh','sj','sk','sl','sm','sn','sp','sq','sr','ss','st','sv','sw','sz','tb','td','tf','tg','th','tj','tk','tl','tm','tn','tp','tq','tr','ts','tt','tv','tw','tz','vb','vd','vf','vg','vh','vj','vk','vl','vm','vn','vp','vq','vr','vs','vt','vv','vw','vz','xb','xd','xf','xg','xh','xj','xk','xl','xm','xn','xp','xq','xr','xs','xt','xv','xw','xx','xz']
			];
			var iSnm = 6;
			var sPsw = "";
			var iNum = 0;
			for (var i=0;i<iSnm;i++) {
				if (i===0)			iNum = rand(0,2);
				else if (i==iSnm-1)	iNum = (iNum<2)?2:rand(0,1);
				else				iNum = (iNum<2)?rand(0,1)+2:rand(0,1);
				var aLst = aLtr[iNum];
				sPsw += aLst[ rand(0,aLst.length-1) ];
			}
			return cut?sPsw.substr(0,length):sPsw;
		}
		/**
		 * Capitalizes the first character of the string
		 * @returns {string}
		 */
		,nameCase: function(){
			return ('-'+this).replace(/[_\s\-][a-z]/g, function($1){return $1.toUpperCase().replace('-',' ').replace('_',' ');}).substr(1);
		}
		/**
		 * Converts the string to camelCase notation
		 * @returns {string}
		 */
		,camelCase: function(){
			return this.replace(/[_\s\-][a-z]/g, function($1){return $1.toUpperCase().replace('-','').replace(' ','').replace('_','');});
		}
		/**
		 * Converts the string to dashed notation
		 * @returns {string}
		 */
		,dash: function(){
			var sCamel = this.replace(/[A-Z]/g, function($1){return "-"+$1.toLowerCase();});
			var sUnSpc = this.replace(/[\s_]/g, '-');
			return this==sCamel?sUnSpc:sCamel;
		}
		/**
		 * Converts the string to underscored notation
		 * @returns {string}
		 */
		,underscore: function(){
			var sCamel = this.replace(/[A-Z]/g, function($1){return "_"+$1.toLowerCase();});
			var sUnSpc = this.replace(/[\s\-]/g, '_');
			return this==sCamel?sUnSpc:sCamel;
		}
	};
})(iddqd));