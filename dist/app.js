(()=>{var ie=Object.create;var Ot=Object.defineProperty;var ae=Object.getOwnPropertyDescriptor;var se=Object.getOwnPropertyNames;var oe=Object.getPrototypeOf,ue=Object.prototype.hasOwnProperty;var Y=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports);var le=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of se(t))!ue.call(r,i)&&i!==e&&Ot(r,i,{get:()=>t[i],enumerable:!(n=ae(t,i))||n.enumerable});return r};var Ft=(r,t,e)=>(e=r!=null?ie(oe(r)):{},le(t||!r||!r.__esModule?Ot(e,"default",{value:r,enumerable:!0}):e,r));var Rt=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var a=(r,t,e)=>(Rt(r,t,"read from private field"),e?e.call(r):t.get(r)),l=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},h=(r,t,e,n)=>(Rt(r,t,"write to private field"),n?n.call(r,e):t.set(r,e),e);var rt=Y(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.AttributeAction=A.IgnoreCaseMode=A.SelectorType=void 0;var ce;(function(r){r.Attribute="attribute",r.Pseudo="pseudo",r.PseudoElement="pseudo-element",r.Tag="tag",r.Universal="universal",r.Adjacent="adjacent",r.Child="child",r.Descendant="descendant",r.Parent="parent",r.Sibling="sibling",r.ColumnCombinator="column-combinator"})(ce=A.SelectorType||(A.SelectorType={}));A.IgnoreCaseMode={Unknown:null,QuirksMode:"quirks",IgnoreCase:!0,CaseSensitive:!1};var fe;(function(r){r.Any="any",r.Element="element",r.End="end",r.Equals="equals",r.Exists="exists",r.Hyphen="hyphen",r.Not="not",r.Start="start"})(fe=A.AttributeAction||(A.AttributeAction={}))});var qt=Y(D=>{"use strict";Object.defineProperty(D,"__esModule",{value:!0});D.parse=D.isTraversal=void 0;var u=rt(),Dt=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,pe=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,de=new Map([[126,u.AttributeAction.Element],[94,u.AttributeAction.Start],[36,u.AttributeAction.End],[42,u.AttributeAction.Any],[33,u.AttributeAction.Not],[124,u.AttributeAction.Hyphen]]),me=new Set(["has","not","matches","is","where","host","host-context"]);function _t(r){switch(r.type){case u.SelectorType.Adjacent:case u.SelectorType.Child:case u.SelectorType.Descendant:case u.SelectorType.Parent:case u.SelectorType.Sibling:case u.SelectorType.ColumnCombinator:return!0;default:return!1}}D.isTraversal=_t;var Ce=new Set(["contains","icontains"]);function ve(r,t,e){var n=parseInt(t,16)-65536;return n!==n||e?t:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,n&1023|56320)}function z(r){return r.replace(pe,ve)}function ct(r){return r===39||r===34}function jt(r){return r===32||r===9||r===10||r===12||r===13}function be(r){var t=[],e=Gt(t,"".concat(r),0);if(e<r.length)throw new Error("Unmatched selector: ".concat(r.slice(e)));return t}D.parse=be;function Gt(r,t,e){var n=[];function i(C){var b=t.slice(e+C).match(Dt);if(!b)throw new Error("Expected name, found ".concat(t.slice(e)));var Mt=b[0];return e+=C+Mt.length,z(Mt)}function s(C){for(e+=C;e<t.length&&jt(t.charCodeAt(e));)e++}function m(){e+=1;for(var C=e,b=1;b>0&&e<t.length;e++)t.charCodeAt(e)===40&&!F(e)?b++:t.charCodeAt(e)===41&&!F(e)&&b--;if(b)throw new Error("Parenthesis not matched");return z(t.slice(C,e-1))}function F(C){for(var b=0;t.charCodeAt(--C)===92;)b++;return(b&1)===1}function Et(){if(n.length>0&&_t(n[n.length-1]))throw new Error("Did not expect successive traversals.")}function K(C){if(n.length>0&&n[n.length-1].type===u.SelectorType.Descendant){n[n.length-1].type=C;return}Et(),n.push({type:C})}function yt(C,b){n.push({type:u.SelectorType.Attribute,name:C,action:b,value:i(1),namespace:null,ignoreCase:"quirks"})}function wt(){if(n.length&&n[n.length-1].type===u.SelectorType.Descendant&&n.pop(),n.length===0)throw new Error("Empty sub-selector");r.push(n)}if(s(0),t.length===e)return e;t:for(;e<t.length;){var ot=t.charCodeAt(e);switch(ot){case 32:case 9:case 10:case 12:case 13:{(n.length===0||n[0].type!==u.SelectorType.Descendant)&&(Et(),n.push({type:u.SelectorType.Descendant})),s(1);break}case 62:{K(u.SelectorType.Child),s(1);break}case 60:{K(u.SelectorType.Parent),s(1);break}case 126:{K(u.SelectorType.Sibling),s(1);break}case 43:{K(u.SelectorType.Adjacent),s(1);break}case 46:{yt("class",u.AttributeAction.Element);break}case 35:{yt("id",u.AttributeAction.Equals);break}case 91:{s(1);var R=void 0,N=null;t.charCodeAt(e)===124?R=i(1):t.startsWith("*|",e)?(N="*",R=i(2)):(R=i(0),t.charCodeAt(e)===124&&t.charCodeAt(e+1)!==61&&(N=R,R=i(1))),s(0);var et=u.AttributeAction.Exists,Tt=de.get(t.charCodeAt(e));if(Tt){if(et=Tt,t.charCodeAt(e+1)!==61)throw new Error("Expected `=`");s(2)}else t.charCodeAt(e)===61&&(et=u.AttributeAction.Equals,s(1));var ut="",lt=null;if(et!=="exists"){if(ct(t.charCodeAt(e))){for(var St=t.charCodeAt(e),L=e+1;L<t.length&&(t.charCodeAt(L)!==St||F(L));)L+=1;if(t.charCodeAt(L)!==St)throw new Error("Attribute value didn't end");ut=z(t.slice(e+1,L)),e=L+1}else{for(var re=e;e<t.length&&(!jt(t.charCodeAt(e))&&t.charCodeAt(e)!==93||F(e));)e+=1;ut=z(t.slice(re,e))}s(0);var Pt=t.charCodeAt(e)|32;Pt===115?(lt=!1,s(1)):Pt===105&&(lt=!0,s(1))}if(t.charCodeAt(e)!==93)throw new Error("Attribute selector didn't terminate");e+=1;var ne={type:u.SelectorType.Attribute,name:R,action:et,value:ut,namespace:N,ignoreCase:lt};n.push(ne);break}case 58:{if(t.charCodeAt(e+1)===58){n.push({type:u.SelectorType.PseudoElement,name:i(2).toLowerCase(),data:t.charCodeAt(e)===40?m():null});continue}var V=i(1).toLowerCase(),g=null;if(t.charCodeAt(e)===40)if(me.has(V)){if(ct(t.charCodeAt(e+1)))throw new Error("Pseudo-selector ".concat(V," cannot be quoted"));if(g=[],e=Gt(g,t,e+1),t.charCodeAt(e)!==41)throw new Error("Missing closing parenthesis in :".concat(V," (").concat(t,")"));e+=1}else{if(g=m(),Ce.has(V)){var Nt=g.charCodeAt(0);Nt===g.charCodeAt(g.length-1)&&ct(Nt)&&(g=g.slice(1,-1))}g=z(g)}n.push({type:u.SelectorType.Pseudo,name:V,data:g});break}case 44:{wt(),n=[],s(1);break}default:{if(t.startsWith("/*",e)){var Lt=t.indexOf("*/",e+2);if(Lt<0)throw new Error("Comment was not terminated");e=Lt+2,n.length===0&&s(0);break}var N=null,T=void 0;if(ot===42)e+=1,T="*";else if(ot===124){if(T="",t.charCodeAt(e+1)===124){K(u.SelectorType.ColumnCombinator),s(2);break}}else if(Dt.test(t.slice(e)))T=i(0);else break t;t.charCodeAt(e)===124&&t.charCodeAt(e+1)!==124&&(N=T,t.charCodeAt(e+1)===42?(T="*",e+=2):T=i(1)),n.push(T==="*"?{type:u.SelectorType.Universal,namespace:N}:{type:u.SelectorType.Tag,name:T,namespace:N})}}}return wt(),e}});var Yt=Y(_=>{"use strict";var nt=_&&_.__spreadArray||function(r,t,e){if(e||arguments.length===2)for(var n=0,i=t.length,s;n<i;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return r.concat(s||Array.prototype.slice.call(t))};Object.defineProperty(_,"__esModule",{value:!0});_.stringify=void 0;var c=rt(),Bt=["\\",'"'],Wt=nt(nt([],Bt,!0),["(",")"],!1),ge=new Set(Bt.map(function(r){return r.charCodeAt(0)})),Ut=new Set(Wt.map(function(r){return r.charCodeAt(0)})),j=new Set(nt(nt([],Wt,!0),["~","^","$","*","+","!","|",":","[","]"," ","."],!1).map(function(r){return r.charCodeAt(0)}));function Kt(r){return r.map(function(t){return t.map(Ae).join("")}).join(", ")}_.stringify=Kt;function Ae(r,t,e){switch(r.type){case c.SelectorType.Child:return t===0?"> ":" > ";case c.SelectorType.Parent:return t===0?"< ":" < ";case c.SelectorType.Sibling:return t===0?"~ ":" ~ ";case c.SelectorType.Adjacent:return t===0?"+ ":" + ";case c.SelectorType.Descendant:return" ";case c.SelectorType.ColumnCombinator:return t===0?"|| ":" || ";case c.SelectorType.Universal:return r.namespace==="*"&&t+1<e.length&&"name"in e[t+1]?"":"".concat(Vt(r.namespace),"*");case c.SelectorType.Tag:return Ht(r);case c.SelectorType.PseudoElement:return"::".concat(y(r.name,j)).concat(r.data===null?"":"(".concat(y(r.data,Ut),")"));case c.SelectorType.Pseudo:return":".concat(y(r.name,j)).concat(r.data===null?"":"(".concat(typeof r.data=="string"?y(r.data,Ut):Kt(r.data),")"));case c.SelectorType.Attribute:{if(r.name==="id"&&r.action===c.AttributeAction.Equals&&r.ignoreCase==="quirks"&&!r.namespace)return"#".concat(y(r.value,j));if(r.name==="class"&&r.action===c.AttributeAction.Element&&r.ignoreCase==="quirks"&&!r.namespace)return".".concat(y(r.value,j));var n=Ht(r);return r.action===c.AttributeAction.Exists?"[".concat(n,"]"):"[".concat(n).concat(Ee(r.action),'="').concat(y(r.value,ge),'"').concat(r.ignoreCase===null?"":r.ignoreCase?" i":" s","]")}}}function Ee(r){switch(r){case c.AttributeAction.Equals:return"";case c.AttributeAction.Element:return"~";case c.AttributeAction.Start:return"^";case c.AttributeAction.End:return"$";case c.AttributeAction.Any:return"*";case c.AttributeAction.Not:return"!";case c.AttributeAction.Hyphen:return"|";case c.AttributeAction.Exists:throw new Error("Shouldn't be here")}}function Ht(r){return"".concat(Vt(r.namespace)).concat(y(r.name,j))}function Vt(r){return r!==null?"".concat(r==="*"?"*":y(r,j),"|"):""}function y(r,t){for(var e=0,n="",i=0;i<r.length;i++)t.has(r.charCodeAt(i))&&(n+="".concat(r.slice(e,i),"\\").concat(r.charAt(i)),e=i+1);return n.length>0?n+r.slice(e):r}});var Qt=Y(v=>{"use strict";var ye=v&&v.__createBinding||(Object.create?function(r,t,e,n){n===void 0&&(n=e);var i=Object.getOwnPropertyDescriptor(t,e);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[e]}}),Object.defineProperty(r,n,i)}:function(r,t,e,n){n===void 0&&(n=e),r[n]=t[e]}),we=v&&v.__exportStar||function(r,t){for(var e in r)e!=="default"&&!Object.prototype.hasOwnProperty.call(t,e)&&ye(t,r,e)};Object.defineProperty(v,"__esModule",{value:!0});v.stringify=v.parse=v.isTraversal=void 0;we(rt(),v);var zt=qt();Object.defineProperty(v,"isTraversal",{enumerable:!0,get:function(){return zt.isTraversal}});Object.defineProperty(v,"parse",{enumerable:!0,get:function(){return zt.parse}});var Te=Yt();Object.defineProperty(v,"stringify",{enumerable:!0,get:function(){return Te.stringify}})});var ft=Y(o=>{"use strict";var it,Se=o&&o.__classPrivateFieldSet||function(r,t,e,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?r!==t||!i:!t.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(r,e):i?i.value=e:t.set(r,e),e},Pe=o&&o.__classPrivateFieldGet||function(r,t,e,n){if(e==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?r!==t||!n:!t.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?n:e==="a"?n.call(r):n?n.value:t.get(r)};Object.defineProperty(o,"__esModule",{value:!0}),o.Element=o.t=o.s=o.removeClass=o.onEach=o.once=o.on=o.off=o.hasClass=o.h=o.empty=o.emitCustom=o.emit=o.addClass=void 0;var Ne=Qt();o.addClass=(r,...t)=>r.classList.add(...t);o.emit=(r,t)=>r.dispatchEvent(t);o.emitCustom=(r,t,...e)=>(0,o.emit)(r,new CustomEvent(t,{detail:e}));o.empty=r=>{for(var t;r.hasChildNodes();)(t=r.firstChild)===null||t===void 0||t.remove()};o.h=(r,...t)=>{let[e]=(0,Ne.parse)(r).map(n=>n.reduce((i,s)=>{var m;return s.type==="tag"?document.createElement(s.name):(s.type==="attribute"&&s.name!=="class"&&i.setAttribute(s.name,(m=s.value)!==null&&m!==void 0?m:""),s.type==="attribute"&&s.name==="class"&&i.classList.add(s.value),i)},document.createElement("div")));return t.forEach(n=>{n instanceof w&&(n=n.element()),e.append(n)}),e};o.hasClass=(r,t)=>r.classList.contains(t);o.off=(r,t,e,n={})=>r.removeEventListener(t,e,n);o.on=(r,t,e,n={})=>r.addEventListener(t,e,n);o.once=(r,t,e,n={})=>(0,o.on)(r,t,e,Object.assign(Object.assign({},typeof n=="boolean"?{capture:n}:n),{once:!0}));o.onEach=(r,t,e,n={})=>t.forEach(i=>(0,o.on)(r,i,e,n));o.removeClass=(r,...t)=>r.classList.remove(...t);o.s=r=>{let t=document.createElement("div");return t.innerHTML=r,t.firstElementChild};o.t=r=>document.createTextNode(r);var w=class{constructor(t){it.set(this,void 0),Se(this,it,t,"f")}static fromSelector(t,...e){return new w((0,o.h)(t,...e))}static fromString(t){return new w((0,o.s)(t))}addClass(...t){(0,o.addClass)(this.element(),...t)}append(...t){t.forEach(e=>{e instanceof w&&(e=e.element()),this.element().append(e)})}element(){return Pe(this,it,"f")}emit(t){return(0,o.emit)(this.element(),t)}emitCustom(t,...e){return(0,o.emitCustom)(this.element(),t,...e)}empty(){(0,o.empty)(this.element())}hasClass(t){return(0,o.hasClass)(this.element(),t)}on(t,e,n={}){(0,o.on)(this.element(),t,e,n)}off(t,e,n={}){(0,o.off)(this.element(),t,e,n)}once(t,e,n={}){(0,o.once)(this.element(),t,e,n)}onEach(t,e,n={}){(0,o.onEach)(this.element(),t,e,n)}query(t){return this.element().querySelector(t)}queryAll(t){return this.element().querySelectorAll(t)}removeClass(...t){(0,o.removeClass)(this.element(),...t)}};o.Element=w,it=new WeakMap,o.default=w});var he={[1]:"red",[2]:"green",[3]:"blue",[4]:"yellow",[5]:"orange",[6]:"light-blue",[7]:"pink",[8]:"maroon",[9]:"purple",[10]:"white",[11]:"grey",[12]:"light-green",[13]:"beige",[14]:"dark-blue",[15]:"teal",[16]:"dark-pink"},ht=(...r)=>r.map(t=>he[t]);var $t=Ft(ft()),Q=Ft(ft()),pt=class extends $t.default{attr(t,e=""){this.element().setAttribute(t,e)}removeAttr(t){!this.element().hasAttribute(t)||this.element().removeAttribute(t)}},at=pt;var M,E,$,dt=class extends at{constructor(e){super((0,Q.h)(".cell"));l(this,M,null);l(this,E,[]);l(this,$,void 0);h(this,$,e)}colour(){return a(this,M)}index(){return a(this,$)}setColour(e){a(this,M)&&this.removeClass(...ht(a(this,M))),h(this,M,e),e&&this.addClass(...ht(e))}addConnection(e){a(this,E).includes(e)||(a(this,E).push(e),this.attr("data-connections",a(this,E).join(" ")))}dropConnection(e){let n=a(this,E).indexOf(e);if(n!==-1){if(a(this,E).splice(n,1),a(this,E).length===0){this.removeAttr("data-connections");return}this.attr("data-connections",a(this,E).join(" "))}}setFinal(e){if(e){this.attr("data-final");return}this.removeAttr("data-final")}};M=new WeakMap,E=new WeakMap,$=new WeakMap;var st=dt;var mt=class extends st{constructor(t,e){super(t),super.setColour(e),this.addClass("point")}setColour(t){throw new TypeError("Cannot change the colour of a Point")}},f=mt;var vt=(r,t,e,n)=>{let i=r.index()%n-t.index()%n,s=Math.floor(r.index()/n)-Math.floor(t.index()/n);return i===-1&&s===0?"l":i===1&&s===0?"r":i===0&&s===-1?"t":i===0&&s===1?"b":!1};var p,G,q,U,Ct=class{constructor(t,e){l(this,p,[]);l(this,G,void 0);l(this,q,void 0);l(this,U,0);h(this,G,t),h(this,q,e)}breakAt(t){if(!this.includes(t))return;let e=a(this,p).indexOf(t),n=a(this,p).slice(0,e);for(a(this,p).slice(e).length>n.length&&this.first()instanceof f&&this.last()instanceof f&&a(this,p).reverse();this.last()!==t;)this.pop()}canAdd(t){let e=this.last();return e===null?t instanceof f:this.complete()?!1:this.isNeighbour(e,t)&&(!(t instanceof f)||t.colour()===this.colour())}clear(){for(;this.last();)this.pop()}colour(){return a(this,G)}complete(){let t=this.first(),e=this.last();return this.length()>1&&t&&e&&t!==e&&t instanceof f&&e instanceof f}first(){return this.length()===0?null:a(this,p)[0]}includes(t){return a(this,p).includes(t)}isNeighbour(t,e){return vt(t,e,a(this,q).height(),a(this,q).width())}last(){return this.length()===0?null:a(this,p)[this.length()-1]}length(){return a(this,p).length}pop(){if(this.length()===0)return;let t=this.complete(),e=a(this,p).pop(),n=this.last();e instanceof f||e.setColour(null),e.setFinal(!1),n&&(n.dropConnection(this.isNeighbour(e,n)),e.dropConnection(this.isNeighbour(n,e))),t&&(e.setFinal(!1),a(this,p).forEach(i=>i.setFinal(!1)),this.setStatus(0))}push(t){let e=this.last();e&&!this.canAdd(t)||(a(this,p).push(t),t instanceof f||t.setColour(a(this,G)),e&&(e.addConnection(this.isNeighbour(t,e)),t.addConnection(this.isNeighbour(e,t))),this.complete()&&this.setStatus(2))}setStatus(t){if(!(a(this,U)===2&&t===1)){if(h(this,U,t),t===0){a(this,p).forEach(e=>e.setFinal(!1));return}a(this,p).forEach(e=>e.setFinal(!0))}}status(){return a(this,U)}};p=new WeakMap,G=new WeakMap,q=new WeakMap,U=new WeakMap;var kt=Ct;var Xt=(r,t=[])=>({cell:r,stack:t}),S,k,X,H,B,J,O,Z,bt=class{constructor(t,e,n){l(this,S,[]);l(this,k,void 0);l(this,X,void 0);l(this,H,void 0);l(this,B,new Map);l(this,J,[]);l(this,O,[]);l(this,Z,void 0);h(this,X,e),h(this,H,t),h(this,Z,n),h(this,k,t.cells()),a(this,O).push(Xt(e))}generate(){for(;a(this,O).length;){let t=a(this,O).shift(),{cell:e}=t;a(this,J).includes(e)||(this.neighboursOf(e).forEach(n=>{if(n instanceof f&&a(this,X).colour()!==n.colour()||t.stack.includes(n))return;let i=Xt(n,[...t.stack,e]);if(n===a(this,Z)){a(this,S).push(i.stack);return}a(this,O).push(i)}),a(this,J).push(e))}}isNeighbour(t,e){return vt(t,e,a(this,H).height(),a(this,H).width())}isPathAvailable(){return a(this,S).length===0&&this.generate(),a(this,S).length>0}neighboursOf(t){return a(this,B).has(t)||a(this,B).set(t,a(this,k).filter(e=>this.isNeighbour(t,e)!==!1)),a(this,B).get(t)}shortestPath(){a(this,S).length===0&&this.generate();let[t]=a(this,S).sort((e,n)=>e.length-n.length);return t}};S=new WeakMap,k=new WeakMap,X=new WeakMap,H=new WeakMap,B=new WeakMap,J=new WeakMap,O=new WeakMap,Z=new WeakMap;var Jt=bt;var W,d,P,x,I,gt=class extends at{constructor(e,n,i=[]){super((0,Q.h)(".grid"));l(this,W,new Map);l(this,d,null);l(this,P,new Map);l(this,x,void 0);l(this,I,void 0);this.setSize(e,n),i.forEach(s=>{a(this,W).set(s.element(),s),this.append(s)}),this.bindEvents()}bindEvents(){this.on("pointerdown",e=>{if(!e.isPrimary)return;e.preventDefault();let n=this.cellFromEvent(e);if(n===null)return;let i=this.pathFromCell(n);if(i&&i.complete()&&i.last()===n){h(this,d,i),i.setStatus(0),i.clear(),i.push(n);return}if(i&&i.last()!==n){h(this,d,i),i.setStatus(0),i.breakAt(n);return}if(i&&i.last()===n){h(this,d,i),i.setStatus(0);return}if(!(n instanceof f))return;let s=new kt(n.colour(),this);h(this,d,s),a(this,P).set(s.colour(),s)}),this.on("pointermove",e=>{if(e instanceof MouseEvent&&!e.buttons)return;let n=this.cellFromEvent(e),i=a(this,d);n===null||i===null||i&&i.status()===2&&!i.includes(n)||i.last()===n||this.handleAddCellToCurrentPath(n)},{passive:!0}),this.on("pointerup",()=>{a(this,d)!==null&&(a(this,d).setStatus(1),a(this,d).length()<2&&(a(this,d).clear(),a(this,P).delete(a(this,d).colour())),h(this,d,null))})}cells(){return Array.from(a(this,W).values())}cellFromEvent(e){var n;return(n=a(this,W).get(document.elementFromPoint(e.pageX,e.pageY)))!=null?n:null}handleAddCellToCurrentPath(e){let n=this.pathFromCell(e,a(this,d)),i=a(this,d);if(n&&n!==i&&!(e instanceof f)&&(n.breakAt(e),n.pop()),i.includes(e)&&i.last()!==e&&i.breakAt(e),i.canAdd(e)){i.push(e);return}let s=i.last();if(!s)return;let m=new Jt(this,s,e);m.isPathAvailable()&&m.shortestPath().forEach(F=>this.handleAddCellToCurrentPath(F))}height(){return a(this,x)}pathFromCell(e,n=null){let i=null;return a(this,P).forEach(s=>{i||s.includes(e)&&(i=s)}),i===null&&e instanceof f&&a(this,P).has(e.colour())&&(i=a(this,P).get(e.colour()),i!==n&&!i.canAdd(e)&&i.clear()),i}setSize(e,n){h(this,x,e),h(this,I,n),this.element().style.setProperty("--height",e.toString()),this.element().style.setProperty("--width",n.toString())}width(){return a(this,I)}};W=new WeakMap,d=new WeakMap,P=new WeakMap,x=new WeakMap,I=new WeakMap;var Zt=gt;var xt=[[6,5,"1d2a4b2b1c2c10da"]];var It=(r,t,e)=>{let n=e.match(/\d+|[a-z]/gi);if(n===null)throw new TypeError("Invalid level definition");let i=n.flatMap(m=>/^\d+$/.test(m)?new Array(parseInt(m)).fill(null):parseInt(m,36)-9),s=r*t;return i.length<s&&i.push(...new Array(s-i.length).fill(null)),[r,t,i]},tt,At=class{constructor(t){l(this,tt,void 0);h(this,tt,t)}generate(t=-1,e=-1,n=2){return It(...xt[Math.floor(Math.random()*xt.length)])}fromURL(){let[t,e,n]=JSON.parse(atob(a(this,tt).hash.slice(1)));return It(t,e,n)}};tt=new WeakMap;var te=At;var ee=new te(location),[Le,Me,Oe]=location.hash.length>1?ee.fromURL():ee.generate(),Fe=new Zt(Le,Me,Oe.map((r,t)=>r===null?new st(t):new f(t,r))),Re=document.getElementById("app");Re.append(Fe.element());})();
//# sourceMappingURL=app.js.map
