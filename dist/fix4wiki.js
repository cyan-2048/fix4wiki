(()=>{var p=(l,i,a)=>new Promise((s,c)=>{var n=o=>{try{m(a.next(o))}catch(u){c(u)}},r=o=>{try{m(a.throw(o))}catch(u){c(u)}},m=o=>o.done?s(o.value):Promise.resolve(o.value).then(n,r);m((a=a.apply(l,i)).next())});function e(l,i,...a){let s=document.createElement(l);if(i)for(let[n,r]of Object.entries(i)){if(n==="ref"){r(s);continue}n.startsWith("on")?s[n]=r:typeof r=="string"?s.setAttribute(n,r):r&&(s[n]=r)}function c(n){n instanceof Node?s.appendChild(n):typeof n=="string"?s.appendChild(document.createTextNode(n)):Array.isArray(n)&&n.forEach(c)}return a.forEach(c),l==="svg"?h(s.outerHTML):s}function v(l){return p(this,null,function*(){let i=e("link",{rel:"stylesheet",href:l});return document.head.appendChild(i),new Promise((a,s)=>{i.onload=a,i.onerror=s})})}function h(l){let i=e("div");return i.innerHTML=l,i.firstElementChild}var x=e("svg",{style:"display:none",xmlns:"http://www.w3.org/2000/svg",class:"d-none"},e("symbol",{id:"svg-menu",viewBox:"0 0 24 24"},e("title",null,"Menu"),e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round",class:"feather feather-menu"},e("line",{x1:"3",y1:"12",x2:"21",y2:"12"}),e("line",{x1:"3",y1:"6",x2:"21",y2:"6"}),e("line",{x1:"3",y1:"18",x2:"21",y2:"18"}))));function k(){return p(this,null,function*(){if(document.querySelector("not-found")){document.body.innerHTML=`<h1>Not Found</h1><p>this page doesn't exist</p><a href="/">Go Home</a>`;return}document.body.className="fix";let l=document.querySelector("page");if(!l)return;function i(t){return l.getAttribute(t)}function a(t){return JSON.parse(atob(i(t)))}yield v("/fix4wiki.css");let s=document.querySelector("template").content.cloneNode(!0);s.querySelectorAll(".table").forEach(t=>{t.querySelectorAll("td").forEach(d=>{d.setAttribute("style","")})}),s.querySelectorAll("a.toc-anchor").forEach(t=>t.remove());let c=[e("h1",null,i("title")),e("p",null,i("description"))].concat(Array.from(s.firstElementChild.children)),n=i("path"),r=n==="home"||!n.includes("/")?null:e("nav",{class:"breadcrumb-nav","aria-label":"Breadcrumb"},e("ol",{class:"breadcrumb-list"},n.split("/").map((t,d,f)=>{let b=d===f.length-1,y="/"+f.slice(0,d+1).join("/");return e("li",{class:"breadcrumb-item"},b?e("span",null,t):e("a",{href:y},t))}))),m=a("sidebar"),o=()=>{},u=!1,g=e("div",{class:"sidebar"},e("div",{class:"site-header",role:"banner"},e("a",{href:"/",class:"site-title"},e("div",{class:"site-logo",role:"img","aria-label":"BananaHackers Wiki"})),e("button",{id:"menu-button",class:"site-button","aria-label":"Toggle menu","aria-pressed":"false",ref:t=>{t.onclick=()=>{t.classList.toggle("nav-open"),u=t.classList.contains("nav-open"),o()}}},e("svg",{viewBox:"0 0 24 24",class:"icon"},e("use",{"xlink:href":"#svg-menu"})))),e("nav",{"aria-label":"Main",id:"site-nav",class:"site-nav",ref:t=>{o=()=>{t.classList[u?"add":"remove"]("nav-open")}}},e("ul",{class:"nav-list"},m.map(t=>{let d=t.l;if(t.k=="link")return e("li",{class:"nav-list-item"},e("a",{href:t.t,class:"nav-list-link"},d));if(t.k=="header")return e("li",{class:"nav-list-item"},e("small",{class:"nav-list-link",style:"display:block;min-height: 2rem;line-height: 2rem;display:block;min-height: 1rem;line-height: 1rem;pointer-events: none;"},d));if(t.k=="divider")return e("hr",{style:"margin:8px 0"})}))));document.body.innerHTML="",document.body.appendChild(x),document.body.appendChild(g),document.body.appendChild(e("div",{class:"main"},e("div",{class:"content0-wrap"},r,e("div",{class:"content0"},e("main",null,c)))))})}k();})();
