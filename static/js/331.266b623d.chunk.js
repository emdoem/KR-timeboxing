"use strict";(self.webpackChunktimeboxing=self.webpackChunktimeboxing||[]).push([[331],{6331:function(e,n,t){t.r(n),t.d(n,{default:function(){return H}});var r=t(5671),i=t(3144),o=t(136),u=t(7277),c=t(2791),a=t(4164),s=t(7593),l=t(6064),f=t(184);var d=function(e){var n=(0,c.useContext)(l.Z).accessToken;return(0,f.jsxs)(f.Fragment,{children:["Hi ",x(n),"!"]})};function x(e){return s.t5(e).email}var m=function(){return(0,f.jsxs)("header",{className:"header",children:[(0,f.jsx)(d,{}),(0,f.jsx)(l.Z.Consumer,{children:function(e){var n=e.handleLogout;return(0,f.jsx)("a",{onClick:n,className:"header__logout-link",href:"#",children:"Log out"})}})]})};var T=function(e){var n=(0,c.useRef)(),t=(0,c.useRef)();return(0,f.jsxs)("form",{onSubmit:function(r){r.preventDefault(),e.onCreate({title:n.current.value,totalTimeInMinutes:t.current.value,finished:!1}),n.current.value="",t.current.value=""},className:"TimeboxCreator",children:[(0,f.jsxs)("label",{children:["What are you doing?",(0,f.jsx)("input",{ref:n,type:"text"})]}),(0,f.jsx)("br",{}),(0,f.jsxs)("label",{children:["How much time will it take?",(0,f.jsx)("input",{ref:t,type:"number",step:"0.01"})]}),(0,f.jsx)("br",{}),(0,f.jsx)("button",{children:"Add Timebox"})]})},h=t(9330),b=t(1413),p=t(4165),v=t(5861),j=t(4261);function E(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3;return new Promise((function(n){setTimeout(n,e)}))}var I=[{id:1,title:"Task A",totalTimeInMinutes:25,finished:!1},{id:2,title:"Task B",totalTimeInMinutes:15,finished:!1},{id:3,title:"Task C",totalTimeInMinutes:5,finished:!1},{id:4,title:"Task D",totalTimeInMinutes:2,finished:!1}];function y(e){var n=I.findIndex((function(n){return n.id==e}));if(n<0)throw new Error("Timebox with this id doesn't exist");return n}var C={getAllTimeboxes:function(){var e=(0,v.Z)((0,p.Z)().mark((function e(){return(0,p.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(200);case 2:return e.abrupt("return",[].concat(I));case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),addTimebox:function(){var e=(0,v.Z)((0,p.Z)().mark((function e(n){var t;return(0,p.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(200);case 2:return t=(0,b.Z)((0,b.Z)({},n),{},{id:(0,j.Z)()}),I.push(t),e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),replaceTimebox:function(){var e=(0,v.Z)((0,p.Z)().mark((function e(n){var t;return(0,p.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(200);case 2:if(n.id){e.next=4;break}throw new Error("Cannot replace timebox without an id");case 4:return y(n.id),t=(0,b.Z)({},n),e.abrupt("return",t);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),removeTimebox:function(){var e=(0,v.Z)((0,p.Z)().mark((function e(n){var t;return(0,p.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E(200);case 2:if(n.id){e.next=4;break}throw new Error("Cannot remove timebox without an id");case 4:t=y(n.id),I.splice(t,1);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()},g=C,M=t(585),k=(t(702),t(9101));function w(e){var n=e.timeboxes,t=e.renderTimebox;return(0,f.jsx)("div",{className:"TimeboxesList",children:n.map(t)})}(0,k.$j)((function(e){return{timeboxes:(0,M.Te)(e.timeboxesManager)}}))(w);var Z=(0,k.$j)((function(e){return{timeboxes:(0,M.nB)(e.timeboxesManager)}}))(w);c.Component;var _=function(e){var n=(0,c.useRef)(),t=(0,c.useRef)(),r=function(){n.current.value=e.initialTitle,t.current.value=e.initialTotalTimeInMinutes};return(0,f.jsxs)("form",{onSubmit:function(i){i.preventDefault(),e.onUpdate({title:n.current.value,totalTimeInMinutes:t.current.value}),r()},className:"TimeboxCreator",children:[(0,f.jsxs)("label",{children:["What are you doing?",(0,f.jsx)("input",{ref:n,defaultValue:e.initialTitle,type:"text"})]}),(0,f.jsx)("br",{}),(0,f.jsxs)("label",{children:["How much time will it take?",(0,f.jsx)("input",{ref:t,defaultValue:e.initialTotalTimeInMinutes,type:"number",step:"0.01"})]}),(0,f.jsx)("br",{}),(0,f.jsx)("a",{onClick:function(){e.onCancel(),r()},children:"Cancel"}),(0,f.jsx)("button",{children:"Save"})]})},R=(0,k.$j)((function(e,n){return{isEdited:(0,M.b$)(e.timeboxesManager,n.timebox)}}),(function(e,n){return{onEdit:function(){return e({type:"TIMEBOX_EDIT_START",currentlyEditedTimeboxId:n.timebox.id})},onCancel:function(){return e({type:"TIMEBOX_EDIT_STOP"})},onMakeCurrent:function(){return e({type:"TIMEBOX_MAKE_CURRENT",timebox:n.timebox})}}}))((function(e){var n=e.timebox,t=e.isEdited,r=e.onCancel,i=e.onEdit,o=e.onUpdate,u=e.onDelete,c=e.onMakeCurrent;return(0,f.jsx)(f.Fragment,{children:t?(0,f.jsx)(_,{initialTitle:n.title,initialTotalTimeInMinutes:n.totalTimeInMinutes,onCancel:r,onUpdate:o},n.id):(0,f.jsx)(S,{title:n.title,totalTimeInMinutes:n.totalTimeInMinutes,onDelete:u,onEdit:i,onMakeCurrent:c},n.id)})})),S=c.lazy((function(){return t.e(256).then(t.bind(t,1256))}));function N(){var e=(0,k.I0)(),n=(0,k.v9)(M.gy),t=(0,k.v9)(M.EH),r=(0,c.useContext)(l.Z).accessToken;(0,c.useEffect)((function(){e(function(e){return function(n){g.getAllTimeboxes(e).then((function(e){n(function(e){return{type:"TIMEBOXES_SET",timeboxes:e}}(e))})).catch((function(e){return n(function(e){return{type:"ERROR_SET",error:e}}(e))})).finally((function(){return n({type:"LOADING_INDICATOR_DISABLE"})}))}}(r))}),[]);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(T,{onCreate:function(n){try{g.addTimebox(n,r).then((function(n){return e({type:"TIMEBOX_ADD",timebox:n})}))}catch(t){console.log("Wyst\u0105pi\u0142 b\u0142\u0105d przy tworzeniu timeboxa: ",t)}}}),n?"Timeboxy si\u0119 \u0142aduj\u0105...":null,t?"Co\u015b si\u0119 wykrzaczy\u0142o w li\u015bcie :(":null,(0,f.jsx)(h.Z,{message:"Co\u015b si\u0119 wykrzaczy\u0142o w li\u015bcie :(",children:(0,f.jsx)(Z,{renderTimebox:function(n){return(0,f.jsx)(R,{timebox:n,onUpdate:function(t){return e(function(e,n,t){return function(r){g.replaceTimebox((0,b.Z)((0,b.Z)({},e),n),t).then((function(e){return r(function(e){return{type:"TIMEBOX_REPLACE",replacedTimebox:e}}(e))})),r({type:"TIMEBOX_EDIT_STOP"})}}(n,t,r))},onDelete:function(){return e(function(e,n){return function(t){g.removeTimebox(e,n).then((function(){return t({type:"TIMEBOX_REMOVE",removedTimebox:e})}))}}(n,r))}})}})})]})}N.contextType=l.Z;var O=N,B=t(885);var D=(0,k.$j)((function(e,n){var t,r=e.currentTimebox.elapsedTimeInSeconds,i=n.totalTimeInSeconds-r,o=[(t=i)>0?Math.floor(t/60):0,t>0?Math.floor(t%60):0],u=(0,B.Z)(o,2);return{minutes:u[0],seconds:u[1]}}))((function(e){var n=e.className,t=e.minutes,r=e.seconds,i=t.toString();i.length<2&&(i="0"+i);var o=r.toString();return o.length<2&&(o="0"+o),(0,f.jsxs)("h2",{className:"Clock "+n,children:["Pozosta\u0142o ",i,":",o]})})),A=t(1694),U=t.n(A);var X=function(e){var n,t=e.className,r=void 0===t?"":t,i=(e.percent,e.timeLeft),o=void 0===i?900:i,u=e.totalTime,c=void 0===u?1800:u,a=e.color,s=void 0===a?null:a,l=e.big,d=void 0!==l&&l,x=U()("progress",r,{"progress--big":d,"progress--color-red":"red"===s});return n=o/c*100,(0,f.jsx)("div",{className:x,children:(0,f.jsx)("div",{className:"progress__bar",style:{width:"".concat(n,"%")}})})},L=t(518);var P=function(){var e=(0,k.I0)(),n=(0,k.v9)((function(e){return(0,L.sB)(e.currentTimebox)})),t=(0,k.v9)((function(e){return(0,L.QY)(e.currentTimebox)})),r=(0,k.v9)((function(e){return(0,L.D4)(e.currentTimebox)})),i=(0,k.v9)((function(e){return(0,L.zU)(e.currentTimebox)})),o=(0,k.v9)((function(e){return(0,L.H8)(e.currentTimebox)})),u=(0,k.v9)((function(e){return(0,M._t)(e.timeboxesManager)})),a=u?u.title:null,s=u?u.totalTimeInMinutes:null,d=(0,c.useContext)(l.Z).accessToken,x=(0,c.useRef)(null);function m(){e({type:"TIMER_STOP"}),h()}function T(){null===x.current&&(x.current=window.setInterval((function(){return e({type:"TIMER_RUNNING"})}),100))}function h(){window.clearInterval(x.current),x.current=null}(0,c.useEffect)((function(){v<=.001&&(e(function(e,n){return function(t){var r=(0,b.Z)((0,b.Z)({},e),{},{finished:!0});g.replaceTimebox((0,b.Z)((0,b.Z)({},e),r),n).then((function(e){return t(function(e){return{type:"TIMEBOX_FINISH",finishedTimebox:e}}(e))}))}}(u,d)),e({type:"CURRENT_TIMEBOX_CLOSE"}),m())}),[o]);var p=60*s,v=p-o;return(0,f.jsx)(f.Fragment,{children:u?(0,f.jsxs)("div",{className:"CurrentTimebox",children:[(0,f.jsx)("h1",{children:a}),(0,f.jsx)(D,{totalTimeInSeconds:p,className:n?"inactive":""}),(0,f.jsx)(X,{className:n?"inactive":"",timeLeft:v,totalTime:p,color:"purp",big:!0}),(0,f.jsx)("button",{onClick:function(){e({type:"TIMER_START"}),T()},disabled:t||i,children:"Start"}),(0,f.jsx)("button",{onClick:m,disabled:!t,children:"Stop"}),(0,f.jsx)("button",{onClick:function(){e({type:"PAUSE_TOGGLE"}),n?T():h()},disabled:!t,children:n?"Resume":"Pause"}),"Pauses count: ",r,(0,f.jsx)("button",{onClick:function(){e({type:"CURRENT_TIMEBOX_CLOSE"}),e({type:"CURRENT_TIMEBOX_RESET"}),h()},children:"Close"})]}):null})};var z=function(){var e=(0,c.useState)(null),n=(0,B.Z)(e,2),r=n[0],i=n[1];return(0,c.useEffect)((function(){t.e(594).then(t.t.bind(t,1594,23)).then((function(e){i(e.getQuote())})).catch((function(){return console.log("Couldn't log qoutes")})),console.count("Using useEffect!")}),[]),(0,f.jsx)(f.Fragment,{children:r?(0,f.jsxs)("figure",{children:[(0,f.jsx)("blockquote",{children:r.text}),(0,f.jsx)("figcaption",{children:(0,f.jsx)("cite",{children:r.author})})]}):"..."})},F=document.getElementById("headerRoot");var H=function(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)($,{children:(0,f.jsx)(m,{})}),(0,f.jsx)(O,{}),(0,f.jsx)(P,{}),(0,f.jsx)(z,{})]})},$=function(e){(0,o.Z)(t,e);var n=(0,u.Z)(t);function t(e){var i;return(0,r.Z)(this,t),(i=n.call(this,e)).container=F,i}return(0,i.Z)(t,[{key:"render",value:function(){return a.createPortal(this.props.children,this.container)}}]),t}(c.Component)}}]);
//# sourceMappingURL=331.266b623d.chunk.js.map