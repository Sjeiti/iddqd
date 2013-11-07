/* global iddqd */
// todo: document
iddqd.ns('iddqd.string',(function(){
	'use strict';
	return {
		init: function(){
			iddqd.string.init = iddqd.fn;
			iddqd.extend(String.prototype,iddqd.string);
		}
		,pad: function(length,chr,left){
			if (left===undefined) left = false;
			var iFill = Math.max(0,length-this.length);
			var aFill = [];
			for (var i=0;i<iFill;i++) aFill.push(chr);
			return left?(aFill.join('')+this):(this+aFill.join(''));
		}
		,toType: function(){
			// integer
			var i = parseInt(this);
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
		,toXMLObj: function(){
			return this.toXML().childNodes[0].toObj();
		}
		,generate: function(iLen,bCut) {
			var isInt = function(n) {
				return (n%1)===0;
			}
			var rand = function(fStr,fEnd) {
				var fNum = fStr + Math.random()*(fEnd-fStr);
				return (isInt(fStr)&&isInt(fEnd))?Math.round(fNum):fNum;
			}
			if (iLen===undefined) iLen = 6;
			if (bCut===undefined) bCut = false;
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
				if (i==0)			iNum = rand(0,2);
				else if (i==iSnm-1)	iNum = (iNum<2)?2:rand(0,1);
				else				iNum = (iNum<2)?rand(0,1)+2:rand(0,1);
				var aLst = aLtr[iNum];
				sPsw += aLst[ rand(0,aLst.length-1) ];
			}
			return bCut?sPsw.substr(0,iLen):sPsw;
		}
		,nameCase: function(){
			return this.substr(0,1).toUpperCase()+this.substr(1).toLowerCase();
		}

		,camelCase: function(){
			return this.replace(/[_\s\-][a-z]/g, function($1){return $1.toUpperCase().replace('-','').replace(' ','').replace('_','');});//
	//		return this.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
		}
		,dash: function(){
			var sCamel = this.replace(/[A-Z]/g, function($1){return "-"+$1.toLowerCase();});
			var sUnSpc = this.replace(/[\s_]/g, '-');
			return this==sCamel?sUnSpc:sCamel;
	//		return this.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
		}
		,underscore: function(){
			var sCamel = this.replace(/[A-Z]/g, function($1){return "_"+$1.toLowerCase();});
			var sUnSpc = this.replace(/[\s\-]/g, '_');
			return this==sCamel?sUnSpc:sCamel;
	//		return this.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
		}
	//	,upperCase: function(){} // todo: case fns
	//	,lowerCase: function(){}
	//	,switchCase: function(){}

	// reverse case with array indexing
	//	int main()
	//{
	//  int i;
	//  char str[80] = "This Is A Test";
	//
	//  cout << "Original string: " << str << "\n";
	//
	//  for(i = 0; str[i]; i++) {
	//    if(isupper(str[i]))
	//      str[i] = tolower(str[i]);
	//    else if(islower(str[i]))
	//      str[i] = toupper(str[i]);
	//  }
	//
	//  cout << "Inverted-case string: " << str;
	//
	//  return 0;
	//}

	//String.prototype.capitalize = function () {
	//    return this.replace(RegExp("^\\p{L}"), function ($0) { return $0.toUpperCase(); })
	//}
	};
})());