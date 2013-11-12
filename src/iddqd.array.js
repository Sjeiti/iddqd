// todo: document
iddqd.ns('iddqd.array',(function(){
	'use strict';
	return {
		augment: function() {
			iddqd.augment(Array,iddqd.array);
		}
		,largest: function(){
			return Math.max.apply(Math,this);
		}
		,smallest: function(){
			return Math.min.apply(Math,this);
		}
		,rnd: function(){
			return this[Math.round(Math.random()*this.length)-1];
		}
		,unique: function(){
			var a = [],i,j=this.length,k=j,o;
			for (i=0;i<j;i++) {
				o = this[i];
				if (a.indexOf(o)===-1) {
					a.push(o);
				} else {
					this.splice(i,1);
					i--;
					j--;
				}
			}
			return k-j;
		}
		// todo: clone?
		,copy: function(){
			var a = [], i = this.length;
			while (i--) a[i] = (typeof this[i].copy!=='undefined')?this[i].copy():this[i];
			return a;
		}
		,shuffle: function(){
			var i = this.length,j,t;
			while (i--) {
				j = Math.floor((i+1)*Math.random());
				t = this[i];
				this[i] = this[j];
				this[j] = t;
			}
			return this;
		}
		/*,insert: function(i,v){ // todo: insert is similar to splice ... maybe rewrite, maybe not
			if (i>=0) {
				var a = this.slice(), b = a.splice(i);
				a[i] = v;
				return a.concat(b);
			}
		}*/
	/*	,concat: function(a){
			for (var i = 0, b = this.copy(); i<a.length; i++) {
				b[b.length] = a[i];
			}
			return b;
		}*/
	/*	,pop: function(){
			var b = this[this.length - 1];
			this.length--;
			return b;
		}
		,push: function(){
			for (var i = 0,b = this.length,a = arguments; i<a.length; i++) {
				this[b+i] = a[i];
			}
			return this.length;
		}
		,shift: function(){
			for (var i = 0,b = this[0]; i<this.length - 1; i++) {
				this[i] = this[i + 1];
			}
			this.length--;
			return b;
		}
		,slice: function(a,c) {
			var i = 0, b, d = [];
			if (!c) c = this.length;
			if (c<0) c = this.length + c;
			if (a<0) a = this.length - a;
			if (c<a) {
				b = a;
				a = c;
				c = b;
			}
			for (i; i<c - a; i++) d[i] = this[a + i];
			return d;
		}
		,splice: function(a,c) {
			var i = 0,e = arguments,d = this.copy(),f = a;
			if (!c) c = this.length - a;
			for (i; i<e.length - 2; i++) {
				this[a + i] = e[i + 2];
			}
			for (a; a<this.length - c; a++) {
				this[a + e.length - 2] = d[a - c];
			}
			this.length -= c - e.length + 2;
			return d.slice(f,f + c);
		}
		,unshift: function(a) {
			this.reverse();
			var b = this.push(a);
			this.reverse();
			return b;
		}*/

		// todo: rshift lshift
	//	Array.prototype.rshift = function(n) {
	//		for (var i=0; i < n; i++) {
	//			this.unshift(this.pop());
	//		};
	//		return this;
	//	}
	//
	//	Array.prototype.lshift = function(n) {
	//		for (var i=0; i < n; i++) {
	//			this.push(this.shift());
	//		};
	//		return this;
	//	}
	};
})());
