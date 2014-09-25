/**
 * String methods
 * @namespace iddqd.internal.native.string
 */
iddqd.ns('iddqd.internal.native.string',(function(internal){
	'use strict';
	return internal(String,{
		/**
		 * Pads a string left or right
		 * @name iddqd.internal.native.string.pad
		 * @method
		 * @param {Number} length Final length of the total string.
		 * @param {String} chr Character to pad the string with.
		 * @param {Boolean} [left=false] Pad to the left of the string.
		 * @returns {string} The padded string
		 */
		pad: function(length,chr,left){
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
		 * @name iddqd.internal.native.string.toType
		 * @method
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
		 * @name iddqd.internal.native.string.toXML
		 * @method
		 * @returns {Document} Returns an XML Document
		 */
		,toXML: function() {
			/* global ActiveXObject */
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
		 * @name iddqd.internal.native.string.toXMLObj
		 * @method
		 * @returns {Object}
		 */
		,toXMLObj: function(){
			var host = iddqd.internal.host;
			if (!host||!host.node||!host.node.toObject) {
				console.warn('The required function iddqd.host.node.toObject does not exist');
				return false;
			} else {
				// todo: no apply
				return host.node.toObject(iddqd.internal.native.string.toXML(this).childNodes[0]);
			}
		}
		/**
		 * Generates a random, but pronounceable string
		 * @name iddqd.internal.native.string.generate
		 * @method
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
		 * @name iddqd.internal.native.string.nameCase
		 * @method
		 * @returns {string}
		 */
		,nameCase: function(){
			return ('-'+this).replace(/[_\s\-][a-z]/g, function($1){return $1.toUpperCase().replace('-',' ').replace('_',' ');}).substr(1);
		}
		/**
		 * Converts the string to camelCase notation
		 * @name iddqd.internal.native.string.camelCase
		 * @method
		 * @returns {string}
		 */
		,camelCase: function(){
			return this.replace(/[_\s\-][a-z]/g, function($1){return $1.toUpperCase().replace('-','').replace(' ','').replace('_','');});
		}
		/**
		 * Converts the string to dashed notation
		 * @name iddqd.internal.native.string.dash
		 * @method
		 * @returns {string}
		 */
		,dash: function(){
			var sCamel = this.replace(/[A-Z]/g, function($1){return "-"+$1.toLowerCase();});
			var sUnSpc = this.replace(/[\s_]/g, '-');
			return this==sCamel?sUnSpc:sCamel;
		}
		/**
		 * Converts the string to underscored notation
		 * @name iddqd.internal.native.string.underscore
		 * @method
		 * @returns {string}
		 */
		,underscore: function(){
			var sCamel = this.replace(/[A-Z]/g, function($1){return "_"+$1.toLowerCase();});
			var sUnSpc = this.replace(/[\s\-]/g, '_');
			return this==sCamel?sUnSpc:sCamel;
		}
		// todo: doc, http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
		,hashCode: function(){
			var sHash = 0;
			if (this.length===0) return sHash;
			for (var i=0, l=this.length; i<l; i++) {
				var sChar = this.charCodeAt(i);
				sHash = ((sHash<<5)-sHash)+sChar;
				sHash = sHash&sHash;
			}
			return sHash;
		}
		,toSlug: function(str) {
			str = str.replace(/^\s+|\s+$/g,''); // trim
			str = str.toLowerCase();

			// remove accents, swap ñ for n, etc
			var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
			var to = "aaaaeeeeiiiioooouuuunc------";
			for (var i = 0, l = from.length; i<l; i++) {
				str = str.replace(new RegExp(from.charAt(i),'g'),to.charAt(i));
			}

			str = str.replace(/[^a-z0-9 -]/g,'') // remove invalid chars
				.replace(/\s+/g,'-') // collapse whitespace and replace by -
				.replace(/-+/g,'-'); // collapse dashes

			return str;
		}
	});
})(iddqd.internal));