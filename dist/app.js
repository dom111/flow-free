(()=>{var ut=Object.create;var J=Object.defineProperty;var ct=Object.getOwnPropertyDescriptor;var mt=Object.getOwnPropertyNames;var dt=Object.getPrototypeOf,ft=Object.prototype.hasOwnProperty;var pt=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var Ct=(i,t,e,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of mt(t))!ft.call(i,n)&&n!==e&&J(i,n,{get:()=>t[n],enumerable:!(r=ct(t,n))||r.enumerable});return i};var Q=(i,t,e)=>(e=i!=null?ut(dt(i)):{},Ct(t||!i||!i.__esModule?J(e,"default",{value:i,enumerable:!0}):e,i));var V=(i,t,e)=>{if(!t.has(i))throw TypeError("Cannot "+e)};var s=(i,t,e)=>(V(i,t,"read from private field"),e?e.call(i):t.get(i)),l=(i,t,e)=>{if(t.has(i))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(i):t.set(i,e)},u=(i,t,e,r)=>(V(i,t,"write to private field"),r?r.call(i,e):t.set(i,e),e);var B=pt(o=>{"use strict";var D,gt=o&&o.__classPrivateFieldSet||function(i,t,e,r,n){if(r==="m")throw new TypeError("Private method is not writable");if(r==="a"&&!n)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?i!==t||!n:!t.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return r==="a"?n.call(i,e):n?n.value=e:t.set(i,e),e},bt=o&&o.__classPrivateFieldGet||function(i,t,e,r){if(e==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?i!==t||!r:!t.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?r:e==="a"?r.call(i):r?r.value:t.get(i)};Object.defineProperty(o,"__esModule",{value:!0}),o.Element=o.t=o.s=o.removeClass=o.onEach=o.once=o.on=o.off=o.hasClass=o.empty=o.emitCustom=o.emit=o.addClass=void 0;o.addClass=(i,...t)=>i.classList.add(...t);o.emit=(i,t)=>i.dispatchEvent(t);o.emitCustom=(i,t,...e)=>(0,o.emit)(i,new CustomEvent(t,{detail:e}));o.empty=i=>{for(var t;i.hasChildNodes();)(t=i.firstChild)===null||t===void 0||t.remove()};o.hasClass=(i,t)=>i.classList.contains(t);o.off=(i,t,e,r={})=>i.removeEventListener(t,e,r);o.on=(i,t,e,r={})=>i.addEventListener(t,e,r);o.once=(i,t,e,r={})=>(0,o.on)(i,t,e,Object.assign(Object.assign({},typeof r=="boolean"?{capture:r}:r),{once:!0}));o.onEach=(i,t,e,r={})=>t.forEach(n=>(0,o.on)(i,n,e,r));o.removeClass=(i,...t)=>i.classList.remove(...t);o.s=i=>{let t=document.createElement("div");return t.innerHTML=i,t.firstElementChild};o.t=i=>document.createTextNode(i);var b=class{constructor(t){D.set(this,void 0),gt(this,D,t,"f")}static fromString(t){return new b((0,o.s)(t))}addClass(...t){(0,o.addClass)(this.element(),...t)}append(...t){t.forEach(e=>{e instanceof b&&(e=e.element()),this.element().append(e)})}element(){return bt(this,D,"f")}emit(t){return(0,o.emit)(this.element(),t)}emitCustom(t,...e){return(0,o.emitCustom)(this.element(),t,...e)}empty(){(0,o.empty)(this.element())}hasClass(t){return(0,o.hasClass)(this.element(),t)}on(t,e,r={}){(0,o.on)(this.element(),t,e,r)}off(t,e,r={}){(0,o.off)(this.element(),t,e,r)}once(t,e,r={}){(0,o.once)(this.element(),t,e,r)}onEach(t,e,r={}){(0,o.onEach)(this.element(),t,e,r)}query(t){return this.element().querySelector(t)}queryAll(t){return this.element().querySelectorAll(t)}removeClass(...t){(0,o.removeClass)(this.element(),...t)}};o.Element=b,D=new WeakMap,o.default=b});var Z=(a=>(a[a.NONE=null]="NONE",a[a.RED=1]="RED",a[a.GREEN=2]="GREEN",a[a.BLUE=3]="BLUE",a[a.YELLOW=4]="YELLOW",a[a.ORANGE=5]="ORANGE",a[a.LIGHT_BLUE=6]="LIGHT_BLUE",a[a.PINK=7]="PINK",a[a.MAROON=8]="MAROON",a[a.PURPLE=9]="PURPLE",a[a.WHITE=10]="WHITE",a[a.GREY=11]="GREY",a[a.LIGHT_GREEN=12]="LIGHT_GREEN",a[a.BEIGE=13]="BEIGE",a[a.DARK_BLUE=14]="DARK_BLUE",a[a.TEAL=15]="TEAL",a[a.DARK_PINK=16]="DARK_PINK",a))(Z||{}),Et={[1]:"red",[2]:"green",[3]:"blue",[4]:"yellow",[5]:"orange",[6]:"light-blue",[7]:"pink",[8]:"maroon",[9]:"purple",[10]:"white",[11]:"grey",[12]:"light-green",[13]:"beige",[14]:"dark-blue",[15]:"teal",[16]:"dark-pink"},U=(...i)=>i.map(t=>Et[t]),p=Z;var tt=Q(B()),R=Q(B()),j=class extends tt.default{attr(t,e=""){this.element().setAttribute(t,e)}removeAttr(t){!this.element().hasAttribute(t)||this.element().removeAttribute(t)}},_=j;var v,f,y,K=class extends _{constructor(e){super((0,R.s)('<div class="cell"></div>'));l(this,v,p.NONE);l(this,f,[]);l(this,y,void 0);u(this,y,e)}colour(){return s(this,v)}index(){return s(this,y)}setColour(e){s(this,v)&&this.removeClass(...U(s(this,v))),u(this,v,e),e&&this.addClass(...U(e))}addConnection(e){s(this,f).includes(e)||(s(this,f).push(e),this.attr("data-connections",s(this,f).join(" ")))}dropConnection(e){let r=s(this,f).indexOf(e);if(r!==-1){if(s(this,f).splice(r,1),s(this,f).length===0){this.removeAttr("data-connections");return}this.attr("data-connections",s(this,f).join(" "))}}setFinal(e){if(e){this.attr("data-final");return}this.removeAttr("data-final")}};v=new WeakMap,f=new WeakMap,y=new WeakMap;var H=K;var Y=class extends H{constructor(t,e){super(t),super.setColour(e),this.addClass("point")}setColour(t){throw new TypeError("Cannot change the colour of a Point")}},c=Y;var q=(i,t,e,r)=>{let n=i.index()%r-t.index()%r,h=Math.floor(i.index()/r)-Math.floor(t.index()/r);return n===-1&&h===0?"l":n===1&&h===0?"r":n===0&&h===-1?"t":n===0&&h===1?"b":!1};var m,w,A,L,W=class{constructor(t,e){l(this,m,[]);l(this,w,void 0);l(this,A,void 0);l(this,L,0);u(this,w,t),u(this,A,e)}breakAt(t){if(!this.includes(t))return;let e=s(this,m).indexOf(t),r=s(this,m).slice(0,e);for(s(this,m).slice(e).length>r.length&&this.first()instanceof c&&this.last()instanceof c&&s(this,m).reverse();this.last()!==t;)this.pop()}canAdd(t){let e=this.last();return e===null?t instanceof c:this.complete()?!1:this.isNeighbour(e,t)&&(!(t instanceof c)||t.colour()===this.colour())}clear(){for(;this.last();)this.pop()}colour(){return s(this,w)}complete(){let t=this.first(),e=this.last();return this.length()>1&&t&&e&&t!==e&&t instanceof c&&e instanceof c}first(){return this.length()===0?null:s(this,m)[0]}includes(t){return s(this,m).includes(t)}isNeighbour(t,e){return q(t,e,s(this,A).height(),s(this,A).width())}last(){return this.length()===0?null:s(this,m)[this.length()-1]}length(){return s(this,m).length}pop(){if(this.length()===0)return;let t=this.complete(),e=s(this,m).pop(),r=this.last();e instanceof c||e.setColour(p.NONE),e.setFinal(!1),r&&(r.dropConnection(this.isNeighbour(e,r)),e.dropConnection(this.isNeighbour(r,e))),t&&(e.setFinal(!1),s(this,m).forEach(n=>n.setFinal(!1)),this.setStatus(0))}push(t){let e=this.last();e&&!this.canAdd(t)||(s(this,m).push(t),t instanceof c||t.setColour(s(this,w)),e&&(e.addConnection(this.isNeighbour(t,e)),t.addConnection(this.isNeighbour(e,t))),this.complete()&&this.setStatus(2))}setStatus(t){if(!(s(this,L)===2&&t===1)){if(u(this,L,t),t===0){s(this,m).forEach(e=>e.setFinal(!1));return}s(this,m).forEach(e=>e.setFinal(!0))}}status(){return s(this,L)}};m=new WeakMap,w=new WeakMap,A=new WeakMap,L=new WeakMap;var et=W;var rt=(i,t=[])=>({cell:i,stack:t}),E,O,F,P,T,M,N,S,z=class{constructor(t,e,r){l(this,E,[]);l(this,O,void 0);l(this,F,void 0);l(this,P,void 0);l(this,T,new Map);l(this,M,[]);l(this,N,[]);l(this,S,void 0);u(this,F,e),u(this,P,t),u(this,S,r),u(this,O,t.cells()),s(this,N).push(rt(e))}generate(){for(;s(this,N).length;){let t=s(this,N).shift(),{cell:e}=t;s(this,M).includes(e)||(this.neighboursOf(e).forEach(r=>{if(r instanceof c&&s(this,F).colour()!==r.colour()||t.stack.includes(r))return;let n=rt(r,[...t.stack,e]);if(r===s(this,S)){s(this,E).push(n.stack);return}s(this,N).push(n)}),s(this,M).push(e))}}isNeighbour(t,e){return q(t,e,s(this,P).height(),s(this,P).width())}isPathAvailable(){return s(this,E).length===0&&this.generate(),s(this,E).length>0}neighboursOf(t){return s(this,T).has(t)||s(this,T).set(t,s(this,O).filter(e=>this.isNeighbour(t,e)!==!1)),s(this,T).get(t)}shortestPath(){s(this,E).length===0&&this.generate();let[t]=s(this,E).sort((e,r)=>e.length-r.length);return t}};E=new WeakMap,O=new WeakMap,F=new WeakMap,P=new WeakMap,T=new WeakMap,M=new WeakMap,N=new WeakMap,S=new WeakMap;var it=z;var x,d,g,I,G,X=class extends _{constructor(e,r,n=[]){super((0,R.s)('<div class="grid"></div>'));l(this,x,new Map);l(this,d,null);l(this,g,new Map);l(this,I,void 0);l(this,G,void 0);this.setSize(e,r),n.forEach(h=>{s(this,x).set(h.element(),h),this.append(h)}),this.bindEvents()}bindEvents(){this.on("pointerdown",e=>{if(!e.isPrimary)return;e.preventDefault();let r=this.cellFromEvent(e);if(r===null)return;let n=this.pathFromCell(r);if(n&&n.complete()&&n.last()===r){u(this,d,n),n.setStatus(0),n.clear(),n.push(r);return}if(n&&n.last()!==r){u(this,d,n),n.setStatus(0),n.breakAt(r);return}if(n&&n.last()===r){u(this,d,n),n.setStatus(0);return}if(!(r instanceof c))return;let h=new et(r.colour(),this);u(this,d,h),h.push(r),s(this,g).set(h.colour(),h)}),this.on("pointerenter",e=>{if(!e.isPrimary)return;let r=this.cellFromEvent(e),n=s(this,d);r===null||n===null||n&&n.status()===2&&!n.includes(r)||n.last()===r||this.handleAddCellToCurrentPath(r)},{capture:!0}),this.on("pointerup",()=>{s(this,d)!==null&&(s(this,d).setStatus(1),s(this,d).length()<2&&(s(this,d).clear(),s(this,g).delete(s(this,d).colour())),u(this,d,null))})}cells(){return Array.from(s(this,x).values())}cellFromEvent(e){var r;return(r=s(this,x).get(document.elementFromPoint(e.pageX,e.pageY)))!=null?r:null}handleAddCellToCurrentPath(e){let r=this.pathFromCell(e,s(this,d)),n=s(this,d);if(r&&r!==n&&!(e instanceof c)&&(r.breakAt(e),r.pop()),n.includes(e)&&n.last()!==e&&n.breakAt(e),n.canAdd(e)){n.push(e);return}let h=n.last();if(!h)return;let C=new it(this,h,e);C.isPathAvailable()&&C.shortestPath().forEach(ht=>this.handleAddCellToCurrentPath(ht))}height(){return s(this,I)}pathFromCell(e,r=null){let n=null;return s(this,g).forEach(h=>{n||h.includes(e)&&(n=h)}),n===null&&e instanceof c&&s(this,g).has(e.colour())&&(n=s(this,g).get(e.colour()),n!==r&&!n.canAdd(e)&&n.clear()),n}setSize(e,r){u(this,I,e),u(this,G,r),this.element().style.setProperty("--height",e.toString()),this.element().style.setProperty("--width",r.toString())}width(){return s(this,G)}};x=new WeakMap,d=new WeakMap,g=new WeakMap,I=new WeakMap,G=new WeakMap;var st=X;var nt=[[3,3,"a1abc2bc"],[8,8,"2b7gfe5d10d1f3b1g2e1c2ca1h3a5h"],[15,15,"4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k]"],[6,5,"1d2a4b2b1c2c10da"]];var ot=(i,t,e)=>{let r=e.match(/\d+|[a-z]/gi);if(r===null)throw new TypeError("Invalid level definition");let n=r.flatMap(C=>{if(/^\d+$/.test(C))return new Array(parseInt(C)).fill(p.NONE);if(/^[a-z]/i.test(C))return parseInt(C,36)-9;throw new TypeError(`Unknown level data '${C}'.`)}),h=i*t;return n.length<h&&n.push(...new Array(h-n.length).fill(p.NONE)),[i,t,n]},k,$=class{constructor(t){l(this,k,void 0);u(this,k,t)}generate(t=-1,e=-1,r=2){return ot(...nt[Math.floor(Math.random()*nt.length)])}fromURL(){let[t,e,r]=JSON.parse(atob(s(this,k).hash.slice(1)));return ot(t,e,r)}};k=new WeakMap;var at=$;var lt=new at(location),[vt,Nt,wt]=location.hash.length>1?lt.fromURL():lt.generate(),At=new st(vt,Nt,wt.map((i,t)=>i===p.NONE?new H(t):new c(t,i))),Lt=document.getElementById("app");Lt.append(At.element());})();
//# sourceMappingURL=app.js.map
