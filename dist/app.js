(()=>{var se=Object.create;var Ft=Object.defineProperty;var oe=Object.getOwnPropertyDescriptor;var ue=Object.getOwnPropertyNames;var he=Object.getPrototypeOf,le=Object.prototype.hasOwnProperty;var z=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports);var ce=(r,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ue(t))!le.call(r,i)&&i!==e&&Ft(r,i,{get:()=>t[i],enumerable:!(n=oe(t,i))||n.enumerable});return r};var Rt=(r,t,e)=>(e=r!=null?se(he(r)):{},ce(t||!r||!r.__esModule?Ft(e,"default",{value:r,enumerable:!0}):e,r));var jt=(r,t,e)=>{if(!t.has(r))throw TypeError("Cannot "+e)};var a=(r,t,e)=>(jt(r,t,"read from private field"),e?e.call(r):t.get(r)),l=(r,t,e)=>{if(t.has(r))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(r):t.set(r,e)},c=(r,t,e,n)=>(jt(r,t,"write to private field"),n?n.call(r,e):t.set(r,e),e);var it=z(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});E.AttributeAction=E.IgnoreCaseMode=E.SelectorType=void 0;var pe;(function(r){r.Attribute="attribute",r.Pseudo="pseudo",r.PseudoElement="pseudo-element",r.Tag="tag",r.Universal="universal",r.Adjacent="adjacent",r.Child="child",r.Descendant="descendant",r.Parent="parent",r.Sibling="sibling",r.ColumnCombinator="column-combinator"})(pe=E.SelectorType||(E.SelectorType={}));E.IgnoreCaseMode={Unknown:null,QuirksMode:"quirks",IgnoreCase:!0,CaseSensitive:!1};var de;(function(r){r.Any="any",r.Element="element",r.End="end",r.Equals="equals",r.Exists="exists",r.Hyphen="hyphen",r.Not="not",r.Start="start"})(de=E.AttributeAction||(E.AttributeAction={}))});var Ht=z(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.parse=_.isTraversal=void 0;var h=it(),_t=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,me=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,Ce=new Map([[126,h.AttributeAction.Element],[94,h.AttributeAction.Start],[36,h.AttributeAction.End],[42,h.AttributeAction.Any],[33,h.AttributeAction.Not],[124,h.AttributeAction.Hyphen]]),ve=new Set(["has","not","matches","is","where","host","host-context"]);function qt(r){switch(r.type){case h.SelectorType.Adjacent:case h.SelectorType.Child:case h.SelectorType.Descendant:case h.SelectorType.Parent:case h.SelectorType.Sibling:case h.SelectorType.ColumnCombinator:return!0;default:return!1}}_.isTraversal=qt;var be=new Set(["contains","icontains"]);function ge(r,t,e){var n=parseInt(t,16)-65536;return n!==n||e?t:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,n&1023|56320)}function $(r){return r.replace(me,ge)}function ft(r){return r===39||r===34}function Gt(r){return r===32||r===9||r===10||r===12||r===13}function Ae(r){var t=[],e=Ut(t,"".concat(r),0);if(e<r.length)throw new Error("Unmatched selector: ".concat(r.slice(e)));return t}_.parse=Ae;function Ut(r,t,e){var n=[];function i(v){var g=t.slice(e+v).match(_t);if(!g)throw new Error("Expected name, found ".concat(t.slice(e)));var Mt=g[0];return e+=v+Mt.length,$(Mt)}function s(v){for(e+=v;e<t.length&&Gt(t.charCodeAt(e));)e++}function C(){e+=1;for(var v=e,g=1;g>0&&e<t.length;e++)t.charCodeAt(e)===40&&!j(e)?g++:t.charCodeAt(e)===41&&!j(e)&&g--;if(g)throw new Error("Parenthesis not matched");return $(t.slice(v,e-1))}function j(v){for(var g=0;t.charCodeAt(--v)===92;)g++;return(g&1)===1}function yt(){if(n.length>0&&qt(n[n.length-1]))throw new Error("Did not expect successive traversals.")}function Y(v){if(n.length>0&&n[n.length-1].type===h.SelectorType.Descendant){n[n.length-1].type=v;return}yt(),n.push({type:v})}function wt(v,g){n.push({type:h.SelectorType.Attribute,name:v,action:g,value:i(1),namespace:null,ignoreCase:"quirks"})}function Tt(){if(n.length&&n[n.length-1].type===h.SelectorType.Descendant&&n.pop(),n.length===0)throw new Error("Empty sub-selector");r.push(n)}if(s(0),t.length===e)return e;t:for(;e<t.length;){var ht=t.charCodeAt(e);switch(ht){case 32:case 9:case 10:case 12:case 13:{(n.length===0||n[0].type!==h.SelectorType.Descendant)&&(yt(),n.push({type:h.SelectorType.Descendant})),s(1);break}case 62:{Y(h.SelectorType.Child),s(1);break}case 60:{Y(h.SelectorType.Parent),s(1);break}case 126:{Y(h.SelectorType.Sibling),s(1);break}case 43:{Y(h.SelectorType.Adjacent),s(1);break}case 46:{wt("class",h.AttributeAction.Element);break}case 35:{wt("id",h.AttributeAction.Equals);break}case 91:{s(1);var D=void 0,O=null;t.charCodeAt(e)===124?D=i(1):t.startsWith("*|",e)?(O="*",D=i(2)):(D=i(0),t.charCodeAt(e)===124&&t.charCodeAt(e+1)!==61&&(O=D,D=i(1))),s(0);var nt=h.AttributeAction.Exists,St=Ce.get(t.charCodeAt(e));if(St){if(nt=St,t.charCodeAt(e+1)!==61)throw new Error("Expected `=`");s(2)}else t.charCodeAt(e)===61&&(nt=h.AttributeAction.Equals,s(1));var u="",lt=null;if(nt!=="exists"){if(ft(t.charCodeAt(e))){for(var Pt=t.charCodeAt(e),M=e+1;M<t.length&&(t.charCodeAt(M)!==Pt||j(M));)M+=1;if(t.charCodeAt(M)!==Pt)throw new Error("Attribute value didn't end");u=$(t.slice(e+1,M)),e=M+1}else{for(var ie=e;e<t.length&&(!Gt(t.charCodeAt(e))&&t.charCodeAt(e)!==93||j(e));)e+=1;u=$(t.slice(ie,e))}s(0);var Nt=t.charCodeAt(e)|32;Nt===115?(lt=!1,s(1)):Nt===105&&(lt=!0,s(1))}if(t.charCodeAt(e)!==93)throw new Error("Attribute selector didn't terminate");e+=1;var ae={type:h.SelectorType.Attribute,name:D,action:nt,value:u,namespace:O,ignoreCase:lt};n.push(ae);break}case 58:{if(t.charCodeAt(e+1)===58){n.push({type:h.SelectorType.PseudoElement,name:i(2).toLowerCase(),data:t.charCodeAt(e)===40?C():null});continue}var k=i(1).toLowerCase(),A=null;if(t.charCodeAt(e)===40)if(ve.has(k)){if(ft(t.charCodeAt(e+1)))throw new Error("Pseudo-selector ".concat(k," cannot be quoted"));if(A=[],e=Ut(A,t,e+1),t.charCodeAt(e)!==41)throw new Error("Missing closing parenthesis in :".concat(k," (").concat(t,")"));e+=1}else{if(A=C(),be.has(k)){var Lt=A.charCodeAt(0);Lt===A.charCodeAt(A.length-1)&&ft(Lt)&&(A=A.slice(1,-1))}A=$(A)}n.push({type:h.SelectorType.Pseudo,name:k,data:A});break}case 44:{Tt(),n=[],s(1);break}default:{if(t.startsWith("/*",e)){var Ot=t.indexOf("*/",e+2);if(Ot<0)throw new Error("Comment was not terminated");e=Ot+2,n.length===0&&s(0);break}var O=null,P=void 0;if(ht===42)e+=1,P="*";else if(ht===124){if(P="",t.charCodeAt(e+1)===124){Y(h.SelectorType.ColumnCombinator),s(2);break}}else if(_t.test(t.slice(e)))P=i(0);else break t;t.charCodeAt(e)===124&&t.charCodeAt(e+1)!==124&&(O=P,t.charCodeAt(e+1)===42?(P="*",e+=2):P=i(1)),n.push(P==="*"?{type:h.SelectorType.Universal,namespace:O}:{type:h.SelectorType.Tag,name:P,namespace:O})}}}return Tt(),e}});var zt=z(q=>{"use strict";var at=q&&q.__spreadArray||function(r,t,e){if(e||arguments.length===2)for(var n=0,i=t.length,s;n<i;n++)(s||!(n in t))&&(s||(s=Array.prototype.slice.call(t,0,n)),s[n]=t[n]);return r.concat(s||Array.prototype.slice.call(t))};Object.defineProperty(q,"__esModule",{value:!0});q.stringify=void 0;var f=it(),Kt=["\\",'"'],Vt=at(at([],Kt,!0),["(",")"],!1),Ee=new Set(Kt.map(function(r){return r.charCodeAt(0)})),Bt=new Set(Vt.map(function(r){return r.charCodeAt(0)})),G=new Set(at(at([],Vt,!0),["~","^","$","*","+","!","|",":","[","]"," ","."],!1).map(function(r){return r.charCodeAt(0)}));function Yt(r){return r.map(function(t){return t.map(ye).join("")}).join(", ")}q.stringify=Yt;function ye(r,t,e){switch(r.type){case f.SelectorType.Child:return t===0?"> ":" > ";case f.SelectorType.Parent:return t===0?"< ":" < ";case f.SelectorType.Sibling:return t===0?"~ ":" ~ ";case f.SelectorType.Adjacent:return t===0?"+ ":" + ";case f.SelectorType.Descendant:return" ";case f.SelectorType.ColumnCombinator:return t===0?"|| ":" || ";case f.SelectorType.Universal:return r.namespace==="*"&&t+1<e.length&&"name"in e[t+1]?"":"".concat(kt(r.namespace),"*");case f.SelectorType.Tag:return Wt(r);case f.SelectorType.PseudoElement:return"::".concat(T(r.name,G)).concat(r.data===null?"":"(".concat(T(r.data,Bt),")"));case f.SelectorType.Pseudo:return":".concat(T(r.name,G)).concat(r.data===null?"":"(".concat(typeof r.data=="string"?T(r.data,Bt):Yt(r.data),")"));case f.SelectorType.Attribute:{if(r.name==="id"&&r.action===f.AttributeAction.Equals&&r.ignoreCase==="quirks"&&!r.namespace)return"#".concat(T(r.value,G));if(r.name==="class"&&r.action===f.AttributeAction.Element&&r.ignoreCase==="quirks"&&!r.namespace)return".".concat(T(r.value,G));var n=Wt(r);return r.action===f.AttributeAction.Exists?"[".concat(n,"]"):"[".concat(n).concat(we(r.action),'="').concat(T(r.value,Ee),'"').concat(r.ignoreCase===null?"":r.ignoreCase?" i":" s","]")}}}function we(r){switch(r){case f.AttributeAction.Equals:return"";case f.AttributeAction.Element:return"~";case f.AttributeAction.Start:return"^";case f.AttributeAction.End:return"$";case f.AttributeAction.Any:return"*";case f.AttributeAction.Not:return"!";case f.AttributeAction.Hyphen:return"|";case f.AttributeAction.Exists:throw new Error("Shouldn't be here")}}function Wt(r){return"".concat(kt(r.namespace)).concat(T(r.name,G))}function kt(r){return r!==null?"".concat(r==="*"?"*":T(r,G),"|"):""}function T(r,t){for(var e=0,n="",i=0;i<r.length;i++)t.has(r.charCodeAt(i))&&(n+="".concat(r.slice(e,i),"\\").concat(r.charAt(i)),e=i+1);return n.length>0?n+r.slice(e):r}});var Qt=z(b=>{"use strict";var Te=b&&b.__createBinding||(Object.create?function(r,t,e,n){n===void 0&&(n=e);var i=Object.getOwnPropertyDescriptor(t,e);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[e]}}),Object.defineProperty(r,n,i)}:function(r,t,e,n){n===void 0&&(n=e),r[n]=t[e]}),Se=b&&b.__exportStar||function(r,t){for(var e in r)e!=="default"&&!Object.prototype.hasOwnProperty.call(t,e)&&Te(t,r,e)};Object.defineProperty(b,"__esModule",{value:!0});b.stringify=b.parse=b.isTraversal=void 0;Se(it(),b);var $t=Ht();Object.defineProperty(b,"isTraversal",{enumerable:!0,get:function(){return $t.isTraversal}});Object.defineProperty(b,"parse",{enumerable:!0,get:function(){return $t.parse}});var Pe=zt();Object.defineProperty(b,"stringify",{enumerable:!0,get:function(){return Pe.stringify}})});var pt=z(o=>{"use strict";var st,Ne=o&&o.__classPrivateFieldSet||function(r,t,e,n,i){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!i)throw new TypeError("Private accessor was defined without a setter");if(typeof t=="function"?r!==t||!i:!t.has(r))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?i.call(r,e):i?i.value=e:t.set(r,e),e},Le=o&&o.__classPrivateFieldGet||function(r,t,e,n){if(e==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof t=="function"?r!==t||!n:!t.has(r))throw new TypeError("Cannot read private member from an object whose class did not declare it");return e==="m"?n:e==="a"?n.call(r):n?n.value:t.get(r)};Object.defineProperty(o,"__esModule",{value:!0}),o.Element=o.t=o.s=o.removeClass=o.onEach=o.once=o.on=o.off=o.hasClass=o.h=o.empty=o.emitCustom=o.emit=o.addClass=void 0;var Oe=Qt();o.addClass=(r,...t)=>r.classList.add(...t);o.emit=(r,t)=>r.dispatchEvent(t);o.emitCustom=(r,t,...e)=>(0,o.emit)(r,new CustomEvent(t,{detail:e}));o.empty=r=>{for(var t;r.hasChildNodes();)(t=r.firstChild)===null||t===void 0||t.remove()};o.h=(r,...t)=>{let[e]=(0,Oe.parse)(r).map(n=>n.reduce((i,s)=>{var C;return s.type==="tag"?document.createElement(s.name):(s.type==="attribute"&&s.name!=="class"&&i.setAttribute(s.name,(C=s.value)!==null&&C!==void 0?C:""),s.type==="attribute"&&s.name==="class"&&i.classList.add(s.value),i)},document.createElement("div")));return t.forEach(n=>{n instanceof S&&(n=n.element()),e.append(n)}),e};o.hasClass=(r,t)=>r.classList.contains(t);o.off=(r,t,e,n={})=>r.removeEventListener(t,e,n);o.on=(r,t,e,n={})=>r.addEventListener(t,e,n);o.once=(r,t,e,n={})=>(0,o.on)(r,t,e,Object.assign(Object.assign({},typeof n=="boolean"?{capture:n}:n),{once:!0}));o.onEach=(r,t,e,n={})=>t.forEach(i=>(0,o.on)(r,i,e,n));o.removeClass=(r,...t)=>r.classList.remove(...t);o.s=r=>{let t=document.createElement("div");return t.innerHTML=r,t.firstElementChild};o.t=r=>document.createTextNode(r);var S=class{constructor(t){st.set(this,void 0),Ne(this,st,t,"f")}static fromSelector(t,...e){return new S((0,o.h)(t,...e))}static fromString(t){return new S((0,o.s)(t))}addClass(...t){(0,o.addClass)(this.element(),...t)}append(...t){t.forEach(e=>{e instanceof S&&(e=e.element()),this.element().append(e)})}element(){return Le(this,st,"f")}emit(t){return(0,o.emit)(this.element(),t)}emitCustom(t,...e){return(0,o.emitCustom)(this.element(),t,...e)}empty(){(0,o.empty)(this.element())}hasClass(t){return(0,o.hasClass)(this.element(),t)}on(t,e,n={}){(0,o.on)(this.element(),t,e,n)}off(t,e,n={}){(0,o.off)(this.element(),t,e,n)}once(t,e,n={}){(0,o.once)(this.element(),t,e,n)}onEach(t,e,n={}){(0,o.onEach)(this.element(),t,e,n)}query(t){return this.element().querySelector(t)}queryAll(t){return this.element().querySelectorAll(t)}removeClass(...t){(0,o.removeClass)(this.element(),...t)}};o.Element=S,st=new WeakMap,o.default=S});var Dt=(u=>(u[u.NONE=null]="NONE",u[u.RED=1]="RED",u[u.GREEN=2]="GREEN",u[u.BLUE=3]="BLUE",u[u.YELLOW=4]="YELLOW",u[u.ORANGE=5]="ORANGE",u[u.LIGHT_BLUE=6]="LIGHT_BLUE",u[u.PINK=7]="PINK",u[u.MAROON=8]="MAROON",u[u.PURPLE=9]="PURPLE",u[u.WHITE=10]="WHITE",u[u.GREY=11]="GREY",u[u.LIGHT_GREEN=12]="LIGHT_GREEN",u[u.BEIGE=13]="BEIGE",u[u.DARK_BLUE=14]="DARK_BLUE",u[u.TEAL=15]="TEAL",u[u.DARK_PINK=16]="DARK_PINK",u))(Dt||{}),fe={[1]:"red",[2]:"green",[3]:"blue",[4]:"yellow",[5]:"orange",[6]:"light-blue",[7]:"pink",[8]:"maroon",[9]:"purple",[10]:"white",[11]:"grey",[12]:"light-green",[13]:"beige",[14]:"dark-blue",[15]:"teal",[16]:"dark-pink"},ct=(...r)=>r.map(t=>fe[t]),w=Dt;var Xt=Rt(pt()),Q=Rt(pt()),dt=class extends Xt.default{attr(t,e=""){this.element().setAttribute(t,e)}removeAttr(t){!this.element().hasAttribute(t)||this.element().removeAttribute(t)}},ot=dt;var F,y,X,mt=class extends ot{constructor(e){super((0,Q.h)(".cell"));l(this,F,w.NONE);l(this,y,[]);l(this,X,void 0);c(this,X,e)}colour(){return a(this,F)}index(){return a(this,X)}setColour(e){a(this,F)&&this.removeClass(...ct(a(this,F))),c(this,F,e),e&&this.addClass(...ct(e))}addConnection(e){a(this,y).includes(e)||(a(this,y).push(e),this.attr("data-connections",a(this,y).join(" ")))}dropConnection(e){let n=a(this,y).indexOf(e);if(n!==-1){if(a(this,y).splice(n,1),a(this,y).length===0){this.removeAttr("data-connections");return}this.attr("data-connections",a(this,y).join(" "))}}setFinal(e){if(e){this.attr("data-final");return}this.removeAttr("data-final")}};F=new WeakMap,y=new WeakMap,X=new WeakMap;var ut=mt;var Ct=class extends ut{constructor(t,e){super(t),super.setColour(e),this.addClass("point")}setColour(t){throw new TypeError("Cannot change the colour of a Point")}},p=Ct;var bt=(r,t,e,n)=>{let i=r.index()%n-t.index()%n,s=Math.floor(r.index()/n)-Math.floor(t.index()/n);return i===-1&&s===0?"l":i===1&&s===0?"r":i===0&&s===-1?"t":i===0&&s===1?"b":!1};var d,U,H,B,vt=class{constructor(t,e){l(this,d,[]);l(this,U,void 0);l(this,H,void 0);l(this,B,0);c(this,U,t),c(this,H,e)}breakAt(t){if(!this.includes(t))return;let e=a(this,d).indexOf(t),n=a(this,d).slice(0,e);for(a(this,d).slice(e).length>n.length&&this.first()instanceof p&&this.last()instanceof p&&a(this,d).reverse();this.last()!==t;)this.pop()}canAdd(t){let e=this.last();return e===null?t instanceof p:this.complete()?!1:this.isNeighbour(e,t)&&(!(t instanceof p)||t.colour()===this.colour())}clear(){for(;this.last();)this.pop()}colour(){return a(this,U)}complete(){let t=this.first(),e=this.last();return this.length()>1&&t&&e&&t!==e&&t instanceof p&&e instanceof p}first(){return this.length()===0?null:a(this,d)[0]}includes(t){return a(this,d).includes(t)}isNeighbour(t,e){return bt(t,e,a(this,H).height(),a(this,H).width())}last(){return this.length()===0?null:a(this,d)[this.length()-1]}length(){return a(this,d).length}pop(){if(this.length()===0)return;let t=this.complete(),e=a(this,d).pop(),n=this.last();e instanceof p||e.setColour(w.NONE),e.setFinal(!1),n&&(n.dropConnection(this.isNeighbour(e,n)),e.dropConnection(this.isNeighbour(n,e))),t&&(e.setFinal(!1),a(this,d).forEach(i=>i.setFinal(!1)),this.setStatus(0))}push(t){let e=this.last();e&&!this.canAdd(t)||(a(this,d).push(t),t instanceof p||t.setColour(a(this,U)),e&&(e.addConnection(this.isNeighbour(t,e)),t.addConnection(this.isNeighbour(e,t))),this.complete()&&this.setStatus(2))}setStatus(t){if(!(a(this,B)===2&&t===1)){if(c(this,B,t),t===0){a(this,d).forEach(e=>e.setFinal(!1));return}a(this,d).forEach(e=>e.setFinal(!0))}}status(){return a(this,B)}};d=new WeakMap,U=new WeakMap,H=new WeakMap,B=new WeakMap;var Jt=vt;var Zt=(r,t=[])=>({cell:r,stack:t}),N,J,Z,W,K,x,R,I,gt=class{constructor(t,e,n){l(this,N,[]);l(this,J,void 0);l(this,Z,void 0);l(this,W,void 0);l(this,K,new Map);l(this,x,[]);l(this,R,[]);l(this,I,void 0);c(this,Z,e),c(this,W,t),c(this,I,n),c(this,J,t.cells()),a(this,R).push(Zt(e))}generate(){for(;a(this,R).length;){let t=a(this,R).shift(),{cell:e}=t;a(this,x).includes(e)||(this.neighboursOf(e).forEach(n=>{if(n instanceof p&&a(this,Z).colour()!==n.colour()||t.stack.includes(n))return;let i=Zt(n,[...t.stack,e]);if(n===a(this,I)){a(this,N).push(i.stack);return}a(this,R).push(i)}),a(this,x).push(e))}}isNeighbour(t,e){return bt(t,e,a(this,W).height(),a(this,W).width())}isPathAvailable(){return a(this,N).length===0&&this.generate(),a(this,N).length>0}neighboursOf(t){return a(this,K).has(t)||a(this,K).set(t,a(this,J).filter(e=>this.isNeighbour(t,e)!==!1)),a(this,K).get(t)}shortestPath(){a(this,N).length===0&&this.generate();let[t]=a(this,N).sort((e,n)=>e.length-n.length);return t}};N=new WeakMap,J=new WeakMap,Z=new WeakMap,W=new WeakMap,K=new WeakMap,x=new WeakMap,R=new WeakMap,I=new WeakMap;var xt=gt;var V,m,L,tt,et,At=class extends ot{constructor(e,n,i=[]){super((0,Q.h)(".grid"));l(this,V,new Map);l(this,m,null);l(this,L,new Map);l(this,tt,void 0);l(this,et,void 0);this.setSize(e,n),i.forEach(s=>{a(this,V).set(s.element(),s),this.append(s)}),this.bindEvents()}bindEvents(){this.on("pointerdown",e=>{if(!e.isPrimary)return;e.preventDefault();let n=this.cellFromEvent(e);if(n===null)return;let i=this.pathFromCell(n);if(i&&i.complete()&&i.last()===n){c(this,m,i),i.setStatus(0),i.clear(),i.push(n);return}if(i&&i.last()!==n){c(this,m,i),i.setStatus(0),i.breakAt(n);return}if(i&&i.last()===n){c(this,m,i),i.setStatus(0);return}if(!(n instanceof p))return;let s=new Jt(n.colour(),this);c(this,m,s),a(this,L).set(s.colour(),s)}),this.on("pointermove",e=>{if(e instanceof MouseEvent&&!e.buttons)return;let n=this.cellFromEvent(e),i=a(this,m);n===null||i===null||i&&i.status()===2&&!i.includes(n)||i.last()===n||this.handleAddCellToCurrentPath(n)},{passive:!0}),this.on("pointerup",()=>{a(this,m)!==null&&(a(this,m).setStatus(1),a(this,m).length()<2&&(a(this,m).clear(),a(this,L).delete(a(this,m).colour())),c(this,m,null))})}cells(){return Array.from(a(this,V).values())}cellFromEvent(e){var n;return(n=a(this,V).get(document.elementFromPoint(e.pageX,e.pageY)))!=null?n:null}handleAddCellToCurrentPath(e){let n=this.pathFromCell(e,a(this,m)),i=a(this,m);if(n&&n!==i&&!(e instanceof p)&&(n.breakAt(e),n.pop()),i.includes(e)&&i.last()!==e&&i.breakAt(e),i.canAdd(e)){i.push(e);return}let s=i.last();if(!s)return;let C=new xt(this,s,e);C.isPathAvailable()&&C.shortestPath().forEach(j=>this.handleAddCellToCurrentPath(j))}height(){return a(this,tt)}pathFromCell(e,n=null){let i=null;return a(this,L).forEach(s=>{i||s.includes(e)&&(i=s)}),i===null&&e instanceof p&&a(this,L).has(e.colour())&&(i=a(this,L).get(e.colour()),i!==n&&!i.canAdd(e)&&i.clear()),i}setSize(e,n){c(this,tt,e),c(this,et,n),this.element().style.setProperty("--height",e.toString()),this.element().style.setProperty("--width",n.toString())}width(){return a(this,et)}};V=new WeakMap,m=new WeakMap,L=new WeakMap,tt=new WeakMap,et=new WeakMap;var It=At;var te=[[3,3,"a1abc2bc"],[8,8,"2b7gfe5d10d1f3b1g2e1c2ca1h3a5h"],[15,15,"4o1i9l6a11eb5g5e20j2g26n9f1f9l7h1o7n10j7c6pd3mc4h5p6im3kad23b2k]"],[6,5,"1d2a4b2b1c2c10da"]];var ee=(r,t,e)=>{let n=e.match(/\d+|[a-z]/gi);if(n===null)throw new TypeError("Invalid level definition");let i=n.flatMap(C=>{if(/^\d+$/.test(C))return new Array(parseInt(C)).fill(w.NONE);if(/^[a-z]/i.test(C))return parseInt(C,36)-9;throw new TypeError(`Unknown level data '${C}'.`)}),s=r*t;return i.length<s&&i.push(...new Array(s-i.length).fill(w.NONE)),[r,t,i]},rt,Et=class{constructor(t){l(this,rt,void 0);c(this,rt,t)}generate(t=-1,e=-1,n=2){return ee(...te[Math.floor(Math.random()*te.length)])}fromURL(){let[t,e,n]=JSON.parse(atob(a(this,rt).hash.slice(1)));return ee(t,e,n)}};rt=new WeakMap;var re=Et;var ne=new re(location),[Me,Fe,Re]=location.hash.length>1?ne.fromURL():ne.generate(),je=new It(Me,Fe,Re.map((r,t)=>r===w.NONE?new ut(t):new p(t,r))),De=document.getElementById("app");De.append(je.element());})();
//# sourceMappingURL=app.js.map
