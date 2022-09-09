(()=>{var te=Object.create;var Ft=Object.defineProperty;var ee=Object.getOwnPropertyDescriptor;var re=Object.getOwnPropertyNames;var ne=Object.getPrototypeOf,ie=Object.prototype.hasOwnProperty;var tt=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);var ae=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of re(e))!ie.call(r,i)&&i!==t&&Ft(r,i,{get:()=>e[i],enumerable:!(n=ee(e,i))||n.enumerable});return r};var Ot=(r,e,t)=>(t=r!=null?te(ne(r)):{},ae(e||!r||!r.__esModule?Ft(t,"default",{value:r,enumerable:!0}):t,r));var Dt=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var a=(r,e,t)=>(Dt(r,e,"read from private field"),t?t.call(r):e.get(r)),l=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},f=(r,e,t,n)=>(Dt(r,e,"write to private field"),n?n.call(r,t):e.set(r,t),t);var ct=tt(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.AttributeAction=T.IgnoreCaseMode=T.SelectorType=void 0;var se;(function(r){r.Attribute="attribute",r.Pseudo="pseudo",r.PseudoElement="pseudo-element",r.Tag="tag",r.Universal="universal",r.Adjacent="adjacent",r.Child="child",r.Descendant="descendant",r.Parent="parent",r.Sibling="sibling",r.ColumnCombinator="column-combinator"})(se=T.SelectorType||(T.SelectorType={}));T.IgnoreCaseMode={Unknown:null,QuirksMode:"quirks",IgnoreCase:!0,CaseSensitive:!1};var oe;(function(r){r.Any="any",r.Element="element",r.End="end",r.Equals="equals",r.Exists="exists",r.Hyphen="hyphen",r.Not="not",r.Start="start"})(oe=T.AttributeAction||(T.AttributeAction={}))});var Gt=tt(z=>{"use strict";Object.defineProperty(z,"__esModule",{value:!0});z.parse=z.isTraversal=void 0;var u=ct(),jt=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,ue=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,le=new Map([[126,u.AttributeAction.Element],[94,u.AttributeAction.Start],[36,u.AttributeAction.End],[42,u.AttributeAction.Any],[33,u.AttributeAction.Not],[124,u.AttributeAction.Hyphen]]),he=new Set(["has","not","matches","is","where","host","host-context"]);function qt(r){switch(r.type){case u.SelectorType.Adjacent:case u.SelectorType.Child:case u.SelectorType.Descendant:case u.SelectorType.Parent:case u.SelectorType.Sibling:case u.SelectorType.ColumnCombinator:return!0;default:return!1}}z.isTraversal=qt;var ce=new Set(["contains","icontains"]);function fe(r,e,t){var n=parseInt(e,16)-65536;return n!==n||t?e:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,n&1023|56320)}function et(r){return r.replace(ue,fe)}function vt(r){return r===39||r===34}function Lt(r){return r===32||r===9||r===10||r===12||r===13}function pe(r){var e=[],t=_t(e,"".concat(r),0);if(t<r.length)throw new Error("Unmatched selector: ".concat(r.slice(t)));return e}z.parse=pe;function _t(r,e,t){var n=[];function i(g){var C=e.slice(t+g).match(jt);if(!C)throw new Error("Expected name, found ".concat(e.slice(t)));var Nt=C[0];return t+=g+Nt.length,et(Nt)}function s(g){for(t+=g;t<e.length&&Lt(e.charCodeAt(t));)t++}function p(){t+=1;for(var g=t,C=1;C>0&&t<e.length;t++)e.charCodeAt(t)===40&&!c(t)?C++:e.charCodeAt(t)===41&&!c(t)&&C--;if(C)throw new Error("Parenthesis not matched");return et(e.slice(g,t-1))}function c(g){for(var C=0;e.charCodeAt(--g)===92;)C++;return(C&1)===1}function O(){if(n.length>0&&qt(n[n.length-1]))throw new Error("Did not expect successive traversals.")}function A(g){if(n.length>0&&n[n.length-1].type===u.SelectorType.Descendant){n[n.length-1].type=g;return}O(),n.push({type:g})}function S(g,C){n.push({type:u.SelectorType.Attribute,name:g,action:C,value:i(1),namespace:null,ignoreCase:"quirks"})}function k(){if(n.length&&n[n.length-1].type===u.SelectorType.Descendant&&n.pop(),n.length===0)throw new Error("Empty sub-selector");r.push(n)}if(s(0),e.length===t)return t;t:for(;t<e.length;){var _=e.charCodeAt(t);switch(_){case 32:case 9:case 10:case 12:case 13:{(n.length===0||n[0].type!==u.SelectorType.Descendant)&&(O(),n.push({type:u.SelectorType.Descendant})),s(1);break}case 62:{A(u.SelectorType.Child),s(1);break}case 60:{A(u.SelectorType.Parent),s(1);break}case 126:{A(u.SelectorType.Sibling),s(1);break}case 43:{A(u.SelectorType.Adjacent),s(1);break}case 46:{S("class",u.AttributeAction.Element);break}case 35:{S("id",u.AttributeAction.Equals);break}case 91:{s(1);var P=void 0,M=null;e.charCodeAt(t)===124?P=i(1):e.startsWith("*|",t)?(M="*",P=i(2)):(P=i(0),e.charCodeAt(t)===124&&e.charCodeAt(t+1)!==61&&(M=P,P=i(1))),s(0);var G=u.AttributeAction.Exists,H=le.get(e.charCodeAt(t));if(H){if(G=H,e.charCodeAt(t+1)!==61)throw new Error("Expected `=`");s(2)}else e.charCodeAt(t)===61&&(G=u.AttributeAction.Equals,s(1));var D="",y=null;if(G!=="exists"){if(vt(e.charCodeAt(t))){for(var V=e.charCodeAt(t),E=t+1;E<e.length&&(e.charCodeAt(E)!==V||c(E));)E+=1;if(e.charCodeAt(E)!==V)throw new Error("Attribute value didn't end");D=et(e.slice(t+1,E)),t=E+1}else{for(var W=t;t<e.length&&(!Lt(e.charCodeAt(t))&&e.charCodeAt(t)!==93||c(t));)t+=1;D=et(e.slice(W,t))}s(0);var x=e.charCodeAt(t)|32;x===115?(y=!1,s(1)):x===105&&(y=!0,s(1))}if(e.charCodeAt(t)!==93)throw new Error("Attribute selector didn't terminate");t+=1;var It={type:u.SelectorType.Attribute,name:P,action:G,value:D,namespace:M,ignoreCase:y};n.push(It);break}case 58:{if(e.charCodeAt(t+1)===58){n.push({type:u.SelectorType.PseudoElement,name:i(2).toLowerCase(),data:e.charCodeAt(t)===40?p():null});continue}var I=i(1).toLowerCase(),w=null;if(e.charCodeAt(t)===40)if(he.has(I)){if(vt(e.charCodeAt(t+1)))throw new Error("Pseudo-selector ".concat(I," cannot be quoted"));if(w=[],t=_t(w,e,t+1),e.charCodeAt(t)!==41)throw new Error("Missing closing parenthesis in :".concat(I," (").concat(e,")"));t+=1}else{if(w=p(),ce.has(I)){var Pt=w.charCodeAt(0);Pt===w.charCodeAt(w.length-1)&&vt(Pt)&&(w=w.slice(1,-1))}w=et(w)}n.push({type:u.SelectorType.Pseudo,name:I,data:w});break}case 44:{k(),n=[],s(1);break}default:{if(e.startsWith("/*",t)){var Mt=e.indexOf("*/",t+2);if(Mt<0)throw new Error("Comment was not terminated");t=Mt+2,n.length===0&&s(0);break}var M=null,j=void 0;if(_===42)t+=1,j="*";else if(_===124){if(j="",e.charCodeAt(t+1)===124){A(u.SelectorType.ColumnCombinator),s(2);break}}else if(jt.test(e.slice(t)))j=i(0);else break t;e.charCodeAt(t)===124&&e.charCodeAt(t+1)!==124&&(M=j,e.charCodeAt(t+1)===42?(j="*",t+=2):j=i(1)),n.push(j==="*"?{type:u.SelectorType.Universal,namespace:M}:{type:u.SelectorType.Tag,name:j,namespace:M})}}}return k(),t}});var zt=tt(Q=>{"use strict";var ft=Q&&Q.__spreadArray||function(r,e,t){if(t||arguments.length===2)for(var n=0,i=e.length,s;n<i;n++)(s||!(n in e))&&(s||(s=Array.prototype.slice.call(e,0,n)),s[n]=e[n]);return r.concat(s||Array.prototype.slice.call(e))};Object.defineProperty(Q,"__esModule",{value:!0});Q.stringify=void 0;var h=ct(),Bt=["\\",'"'],Rt=ft(ft([],Bt,!0),["(",")"],!1),de=new Set(Bt.map(function(r){return r.charCodeAt(0)})),Ht=new Set(Rt.map(function(r){return r.charCodeAt(0)})),U=new Set(ft(ft([],Rt,!0),["~","^","$","*","+","!","|",":","[","]"," ","."],!1).map(function(r){return r.charCodeAt(0)}));function Vt(r){return r.map(function(e){return e.map(me).join("")}).join(", ")}Q.stringify=Vt;function me(r,e,t){switch(r.type){case h.SelectorType.Child:return e===0?"> ":" > ";case h.SelectorType.Parent:return e===0?"< ":" < ";case h.SelectorType.Sibling:return e===0?"~ ":" ~ ";case h.SelectorType.Adjacent:return e===0?"+ ":" + ";case h.SelectorType.Descendant:return" ";case h.SelectorType.ColumnCombinator:return e===0?"|| ":" || ";case h.SelectorType.Universal:return r.namespace==="*"&&e+1<t.length&&"name"in t[e+1]?"":"".concat(Wt(r.namespace),"*");case h.SelectorType.Tag:return $t(r);case h.SelectorType.PseudoElement:return"::".concat(N(r.name,U)).concat(r.data===null?"":"(".concat(N(r.data,Ht),")"));case h.SelectorType.Pseudo:return":".concat(N(r.name,U)).concat(r.data===null?"":"(".concat(typeof r.data=="string"?N(r.data,Ht):Vt(r.data),")"));case h.SelectorType.Attribute:{if(r.name==="id"&&r.action===h.AttributeAction.Equals&&r.ignoreCase==="quirks"&&!r.namespace)return"#".concat(N(r.value,U));if(r.name==="class"&&r.action===h.AttributeAction.Element&&r.ignoreCase==="quirks"&&!r.namespace)return".".concat(N(r.value,U));var n=$t(r);return r.action===h.AttributeAction.Exists?"[".concat(n,"]"):"[".concat(n).concat(ve(r.action),'="').concat(N(r.value,de),'"').concat(r.ignoreCase===null?"":r.ignoreCase?" i":" s","]")}}}function ve(r){switch(r){case h.AttributeAction.Equals:return"";case h.AttributeAction.Element:return"~";case h.AttributeAction.Start:return"^";case h.AttributeAction.End:return"$";case h.AttributeAction.Any:return"*";case h.AttributeAction.Not:return"!";case h.AttributeAction.Hyphen:return"|";case h.AttributeAction.Exists:throw new Error("Shouldn't be here")}}function $t(r){return"".concat(Wt(r.namespace)).concat(N(r.name,U))}function Wt(r){return r!==null?"".concat(r==="*"?"*":N(r,U),"|"):""}function N(r,e){for(var t=0,n="",i=0;i<r.length;i++)e.has(r.charCodeAt(i))&&(n+="".concat(r.slice(t,i),"\\").concat(r.charAt(i)),t=i+1);return n.length>0?n+r.slice(t):r}});var Qt=tt(b=>{"use strict";var ge=b&&b.__createBinding||(Object.create?function(r,e,t,n){n===void 0&&(n=t);var i=Object.getOwnPropertyDescriptor(e,t);(!i||("get"in i?!e.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(r,n,i)}:function(r,e,t,n){n===void 0&&(n=t),r[n]=e[t]}),be=b&&b.__exportStar||function(r,e){for(var t in r)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&ge(e,r,t)};Object.defineProperty(b,"__esModule",{value:!0});b.stringify=b.parse=b.isTraversal=void 0;be(ct(),b);var Ut=Gt();Object.defineProperty(b,"isTraversal",{enumerable:!0,get:function(){return Ut.isTraversal}});Object.defineProperty(b,"parse",{enumerable:!0,get:function(){return Ut.parse}});var Ce=zt();Object.defineProperty(b,"stringify",{enumerable:!0,get:function(){return Ce.stringify}})});var gt=tt(o=>{"use strict";var pt,Ae=o&&o.__classPrivateFieldSet||function(r,e,t,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?r!==e||!i:!e.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(r,t):i?i.value=t:e.set(r,t),t},ye=o&&o.__classPrivateFieldGet||function(r,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?r!==e||!n:!e.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(r):n?n.value:e.get(r)};Object.defineProperty(o,"__esModule",{value:!0}),o.Element=o.t=o.s=o.removeClass=o.onEach=o.once=o.on=o.off=o.hasClass=o.h=o.empty=o.emitCustom=o.emit=o.addClass=void 0;var we=Qt();o.addClass=(r,...e)=>r.classList.add(...e);o.emit=(r,e)=>r.dispatchEvent(e);o.emitCustom=(r,e,...t)=>(0,o.emit)(r,new CustomEvent(e,{detail:t}));o.empty=r=>{for(var e;r.hasChildNodes();)(e=r.firstChild)===null||e===void 0||e.remove()};o.h=(r,...e)=>{let[t]=(0,we.parse)(r).map(n=>n.reduce((i,s)=>{var p;return s.type==="tag"?document.createElement(s.name):(s.type==="attribute"&&s.name!=="class"&&i.setAttribute(s.name,(p=s.value)!==null&&p!==void 0?p:""),s.type==="attribute"&&s.name==="class"&&i.classList.add(s.value),i)},document.createElement("div")));return e.forEach(n=>{n instanceof F&&(n=n.element()),t.append(n)}),t};o.hasClass=(r,e)=>r.classList.contains(e);o.off=(r,e,t,n={})=>r.removeEventListener(e,t,n);o.on=(r,e,t,n={})=>r.addEventListener(e,t,n);o.once=(r,e,t,n={})=>(0,o.on)(r,e,t,Object.assign(Object.assign({},typeof n=="boolean"?{capture:n}:n),{once:!0}));o.onEach=(r,e,t,n={})=>e.forEach(i=>(0,o.on)(r,i,t,n));o.removeClass=(r,...e)=>r.classList.remove(...e);o.s=r=>{let e=document.createElement("div");return e.innerHTML=r,e.firstElementChild};o.t=r=>document.createTextNode(r);var F=class{constructor(e){pt.set(this,void 0),Ae(this,pt,e,"f")}static fromSelector(e,...t){return new F((0,o.h)(e,...t))}static fromString(e){return new F((0,o.s)(e))}addClass(...e){(0,o.addClass)(this.element(),...e)}append(...e){e.forEach(t=>{t instanceof F&&(t=t.element()),this.element().append(t)})}element(){return ye(this,pt,"f")}emit(e){return(0,o.emit)(this.element(),e)}emitCustom(e,...t){return(0,o.emitCustom)(this.element(),e,...t)}empty(){(0,o.empty)(this.element())}hasClass(e){return(0,o.hasClass)(this.element(),e)}on(e,t,n={}){(0,o.on)(this.element(),e,t,n)}off(e,t,n={}){(0,o.off)(this.element(),e,t,n)}once(e,t,n={}){(0,o.once)(this.element(),e,t,n)}onEach(e,t,n={}){(0,o.onEach)(this.element(),e,t,n)}query(e){return this.element().querySelector(e)}queryAll(e){return this.element().querySelectorAll(e)}removeClass(...e){(0,o.removeClass)(this.element(),...e)}};o.Element=F,pt=new WeakMap,o.default=F});var Xt=Ot(gt()),rt=Ot(gt()),bt=class extends Xt.default{attr(e,t=""){this.element().setAttribute(e,t)}removeAttr(e){!this.element().hasAttribute(e)||this.element().removeAttribute(e)}},dt=bt;var nt,$,it,Ct=class extends dt{constructor(t){super((0,rt.h)(".cell"));l(this,nt,null);l(this,$,[]);l(this,it,void 0);f(this,it,t),this.attr("data-i",t.toString())}colour(){return a(this,nt)}index(){return a(this,it)}setColour(t){if(f(this,nt,t),t===null){this.removeAttr("data-id");return}this.attr("data-id",t.toString())}addConnection(t){a(this,$).includes(t)||(a(this,$).push(t),this.attr("data-"+t))}dropConnection(t){let n=a(this,$).indexOf(t);n!==-1&&(a(this,$).splice(n,1),this.removeAttr("data-"+t))}setFinal(t){if(t){this.attr("data-final");return}this.removeAttr("data-final")}};nt=new WeakMap,$=new WeakMap,it=new WeakMap;var mt=Ct;var At=class extends mt{constructor(e,t){super(e),super.setColour(t),this.attr("data-id",t.toString()),this.attr("data-point")}setColour(e){throw new TypeError("Cannot change the colour of a Point")}},d=At;var wt=(r,e,t,n)=>{let i=r.index()%t-e.index()%t,s=Math.floor(r.index()/n)-Math.floor(e.index()/n);return i===-1&&s===0?"l":i===1&&s===0?"r":i===0&&s===-1?"t":i===0&&s===1?"b":!1};var m,X,Y,J,yt=class{constructor(e,t){l(this,m,[]);l(this,X,void 0);l(this,Y,void 0);l(this,J,0);f(this,X,e),f(this,Y,t)}breakAt(e){if(!this.includes(e))return;let t=a(this,m).indexOf(e),n=a(this,m).slice(0,t);for(a(this,m).slice(t).length>n.length&&this.first()instanceof d&&this.last()instanceof d&&a(this,m).reverse();this.last()!==e;)this.pop()}canAdd(e){let t=this.last();return t===null?e instanceof d:this.complete()?!1:this.isNeighbour(t,e)&&(!(e instanceof d)||e.colour()===this.colour())}clear(){for(;this.last();)this.pop()}colour(){return a(this,X)}complete(){let e=this.first(),t=this.last();return this.length()>1&&e&&t&&e!==t&&e instanceof d&&t instanceof d}first(){return this.length()===0?null:a(this,m)[0]}includes(e){return a(this,m).includes(e)}isNeighbour(e,t){return wt(e,t,a(this,Y).width(),a(this,Y).height())}last(){return this.length()===0?null:a(this,m)[this.length()-1]}length(){return a(this,m).length}pop(){if(this.length()===0)return;let e=this.complete(),t=a(this,m).pop(),n=this.last();t instanceof d||t.setColour(null),t.setFinal(!1),n&&(n.dropConnection(this.isNeighbour(t,n)),t.dropConnection(this.isNeighbour(n,t))),e&&(t.setFinal(!1),a(this,m).forEach(i=>i.setFinal(!1)),this.setStatus(0))}push(e){let t=this.last();t&&!this.canAdd(e)||(a(this,m).push(e),e instanceof d||e.setColour(a(this,X)),t&&(t.addConnection(this.isNeighbour(e,t)),e.addConnection(this.isNeighbour(t,e))),this.complete()&&this.setStatus(2))}setStatus(e){if(!(a(this,J)===2&&e===1)){if(f(this,J,e),e===0){a(this,m).forEach(t=>t.setFinal(!1));return}a(this,m).forEach(t=>t.setFinal(!0))}}status(){return a(this,J)}};m=new WeakMap,X=new WeakMap,Y=new WeakMap,J=new WeakMap;var Yt=yt;var Jt=(r,e=[])=>({cell:r,stack:e}),L,at,st,K,Z,ot,B,ut,Et=class{constructor(e,t,n){l(this,L,[]);l(this,at,void 0);l(this,st,void 0);l(this,K,void 0);l(this,Z,new Map);l(this,ot,[]);l(this,B,[]);l(this,ut,void 0);f(this,st,t),f(this,K,e),f(this,ut,n),f(this,at,e.cells()),a(this,B).push(Jt(t))}generate(){for(;a(this,B).length;){let e=a(this,B).shift(),{cell:t}=e;a(this,ot).includes(t)||(this.neighboursOf(t).forEach(n=>{if(n instanceof d&&a(this,st).colour()!==n.colour()||e.stack.includes(n))return;let i=Jt(n,[...e.stack,t]);if(n===a(this,ut)){a(this,L).push(i.stack);return}a(this,B).push(i)}),a(this,ot).push(t))}}isNeighbour(e,t){return wt(e,t,a(this,K).width(),a(this,K).height())}isPathAvailable(){return a(this,L).length===0&&this.generate(),a(this,L).length>0}neighboursOf(e){return a(this,Z).has(e)||a(this,Z).set(e,a(this,at).filter(t=>this.isNeighbour(e,t)!==!1)),a(this,Z).get(e)}shortestPath(){a(this,L).length===0&&this.generate();let[e]=a(this,L).sort((t,n)=>t.length-n.length);return e}};L=new WeakMap,at=new WeakMap,st=new WeakMap,K=new WeakMap,Z=new WeakMap,ot=new WeakMap,B=new WeakMap,ut=new WeakMap;var Kt=Et;function Zt(r,e,t){var n=t||{},i=n.noTrailing,s=i===void 0?!1:i,p=n.noLeading,c=p===void 0?!1:p,O=n.debounceMode,A=O===void 0?void 0:O,S,k=!1,_=0;function P(){S&&clearTimeout(S)}function M(H){var D=H||{},y=D.upcomingOnly,V=y===void 0?!1:y;P(),k=!V}function G(){for(var H=arguments.length,D=new Array(H),y=0;y<H;y++)D[y]=arguments[y];var V=this,E=Date.now()-_;if(k)return;function W(){_=Date.now(),e.apply(V,D)}function x(){S=void 0}!c&&A&&!S&&W(),P(),A===void 0&&E>r?c?(_=Date.now(),s||(S=setTimeout(A?x:W,r))):W():s!==!0&&(S=setTimeout(A?x:W,A===void 0?r-E:r))}return G.cancel=M,G}var R,v,q,lt,ht,St=class extends dt{constructor(t,n,i=[]){super((0,rt.h)(".grid"));l(this,R,new Map);l(this,v,null);l(this,q,new Map);l(this,lt,void 0);l(this,ht,void 0);let s=t*n;i.length<s&&i.push(...new Array(s-i.length).fill(null));let p=Math.sqrt(i.length);if(p!==Math.floor(p))throw new TypeError("Invalid cell data");this.setSize(t,n),i.forEach(c=>{a(this,R).set(c.element(),c),this.append(c)}),this.bindEvents()}static loadFromString(t,n,i){let s=i.match(/\d+|[a-z]/gi);if(s===null)throw new TypeError("Invalid grid definition");let p=s.flatMap(c=>/^\d+$/.test(c)?new Array(parseInt(c)).fill(null):parseInt(c,36)-9);return new St(t,n,p.map((c,O)=>c!==null?new d(O,c):new mt(O)))}bindEvents(){this.onEach(["touchstart","mousedown"],t=>{if(t instanceof MouseEvent&&t.buttons!==1)return;t.preventDefault();let n=this.cellFromEvent(t);if(n===null)return;let i=this.pathFromCell(n);if(i&&i.complete()&&i.last()===n){f(this,v,i),i.setStatus(0),i.clear(),i.push(n);return}if(i&&i.last()!==n){f(this,v,i),i.setStatus(0),i.breakAt(n);return}if(i&&i.last()===n){f(this,v,i),i.setStatus(0);return}if(!(n instanceof d))return;let s=new Yt(n.colour(),this);f(this,v,s),a(this,q).set(s.colour(),s)}),this.onEach(["touchmove","mousemove"],Zt(1e3/60,t=>{if(t instanceof MouseEvent&&!t.buttons)return;let n=this.cellFromEvent(t),i=a(this,v);n===null||i===null||i&&i.status()===2&&!i.includes(n)||i.last()===n||this.handleAddCellToCurrentPath(n)})),this.onEach(["touchend","mouseup"],()=>{a(this,v)!==null&&(a(this,v).setStatus(1),a(this,v).length()<2&&(a(this,v).clear(),a(this,q).delete(a(this,v).colour())),f(this,v,null))})}cells(){return Array.from(a(this,R).values())}cellFromEvent(t){var n,i;return t instanceof MouseEvent?(n=a(this,R).get(t.relatedTarget||t.target))!=null?n:null:(i=a(this,R).get(document.elementFromPoint(t.touches[0].pageX,t.touches[0].pageY)))!=null?i:null}handleAddCellToCurrentPath(t){let n=this.pathFromCell(t,a(this,v)),i=a(this,v);if(n&&n!==i&&!(t instanceof d)&&(n.breakAt(t),n.pop()),i.includes(t)&&i.last()!==t&&i.breakAt(t),i.canAdd(t)){i.push(t);return}let s=i.last();if(!s)return;let p=new Kt(this,s,t);p.isPathAvailable()&&p.shortestPath().forEach(c=>this.handleAddCellToCurrentPath(c))}height(){return a(this,lt)}pathFromCell(t,n=null){let i=null;return a(this,q).forEach(s=>{i||s.includes(t)&&(i=s)}),i===null&&t instanceof d&&a(this,q).has(t.colour())&&(i=a(this,q).get(t.colour()),i!==n&&!i.canAdd(t)&&(console.log(i,n),console.log("clearing the path"),i.clear())),i}setSize(t,n){f(this,lt,t),f(this,ht,n),this.element().style.setProperty("--height",t.toString()),this.element().style.setProperty("--width",n.toString())}width(){return a(this,ht)}},Tt=St;R=new WeakMap,v=new WeakMap,q=new WeakMap,lt=new WeakMap,ht=new WeakMap;var kt=Tt;var xt=[[8,8,"2b7gfe5d10d1f3b1g2e1c2ca1h3a5h5"]],Ee=kt.loadFromString(...xt[Math.floor(Math.random()*xt.length)]),Te=document.getElementById("app");Te.append(Ee.element());})();
//# sourceMappingURL=app.js.map
