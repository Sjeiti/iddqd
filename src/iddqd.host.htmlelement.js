// todo: document
iddqd.ns('iddqd.host.htmlelement',(function(){
	'use strict';
	return iddqd.primitive(HTMLElement,{
		addChild: function(elementName,attributes,append) {
			if (append===undefined) append = true;
			var m = document.createElement(elementName);
			if (attributes!==undefined) m.setAttributes(attributes);
			if (append===true) this.appendChild(m);
			else this.insertBefore(m, this.firstChild);
			return m;
		}
		,addSibling: function(elementName,attributes,after) {
			if (after===undefined) after = true;
			var m = document.createElement(elementName);
			if (attributes!==undefined) m.setAttributes(attributes);
			if (after===true) {
				if (this.nextSibling) this.parentNode.insertBefore(m, this.nextSibling);
				else this.parentNode.appendChild(m);
			} else {
				this.parentNode.insertBefore(m, this);
			}
			return m;
		}
		,setAttributes: function(o) {
			for (var s in o) this.setAttribute(s,o[s]);
			return this;
		}
		,remove: function() {
			if (this.parentNode) this.parentNode.removeChild(this);
			return this;
		}
		,empty: function(){
			for (var i=0,l=this.children.length;i<l;i++) this.removeChild(this.children[0]);
		}
		,css: function(rules){
			var oStyle = this.style;
			for (var s in rules) {
				var oVal = rules[s];
				if (oStyle[s]!=oVal) oStyle[s] = oVal;
			}
			return this;
		}
		,hasClass: function(name){
			return !!~this.className.indexOf(name);
		}
		,removeClass: function(name){
			this.className = this.className.replace(name,'').replace(/\s{2,}/g,' ');
			return this;
		}
		,addClass: function(name){
			if (!this.hasClass(name)) this.className += this.className.length===0?name:' '+name;
			return this;
		}
		,toggleClass: function(name){
			if (this.hasClass(name)) this.removeClass(name);
			else this.addClass(name);
			return this;
		}
		,addEvent: function(evt,fn,useCapture){
			iddqd.addEvent(this,evt,fn,useCapture);
			return this;
			/*if (window.addEvent!==undefined) window.addEvent(this,evt,fn,useCapture);
			else console.log('Window.js missing'); */
		}
		,descendsFrom: function(parentNode){
			var mParent = this.parentNode;
			while (parentNode!==mParent&&mParent!==document.body) {
				mParent = mParent.parentNode;
			}
			return parentNode===mParent;
			/*if (window.addEvent!==undefined) window.addEvent(this,evt,fn,useCapture);
			else console.log('Window.js missing'); */
		}
		,visible: function(){
			return this.offsetWidth>0||this.offsetHeight>0;
		}
		/*,addEvent: (function(){
			return window.addEventListener?function(evt,fn,useCapture){
				if (useCapture===undefined) useCapture = false;
				var aEvt = evt.split(',')
					iEvt = aEvt.length;
				if (iEvt>1) while (iEvt--) this.addEventListener(aEvt[iEvt],fn,useCapture);
				else this.addEventListener(evt,fn,useCapture);
			}:function(evt,fn){
				var aEvt = evt.split(',')
					iEvt = aEvt.length;
				if (iEvt>1) while (iEvt--) this.addEventListener(aEvt[iEvt],fn,f);
				else this.attachEvent('on'+evt,fn);
			};
		})()*/
//	};
//}
		});
	})()
);