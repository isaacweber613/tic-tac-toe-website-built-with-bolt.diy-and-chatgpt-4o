(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const f of n.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&o(f)}).observe(document,{childList:!0,subtree:!0});function l(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=l(t);fetch(t.href,n)}})();const m=document.querySelectorAll(".cell"),p=document.getElementById("reset"),h=document.getElementById("play-first"),v=document.getElementById("play-second");let c="X",i=Array(9).fill(null),u="X",s="O";h.addEventListener("click",()=>y("X"));v.addEventListener("click",()=>y("O"));p.addEventListener("click",L);function y(e){u=e,s=e==="X"?"O":"X",c="X",i.fill(null),m.forEach(r=>{r.textContent="",r.addEventListener("click",O)}),u==="O"&&g()}function O(e){const r=e.target.dataset.index;i[r]||a()||(i[r]=c,e.target.textContent=c,a()?alert(`${c} wins!`):i.every(l=>l)?alert("Draw!"):(c=c==="X"?"O":"X",c===s&&g()))}function g(){const e=E();i[e]=s,m[e].textContent=s,c=u,a()?alert(`${s} wins!`):i.every(r=>r)&&alert("Draw!")}function E(){let e=-1/0,r;for(let l=0;l<i.length;l++)if(!i[l]){i[l]=s;let o=d(i,0,!1);i[l]=null,o>e&&(e=o,r=l)}return r}function d(e,r,l){const o=a();if(o===s)return 10-r;if(o===u)return r-10;if(e.every(t=>t))return 0;if(l){let t=-1/0;for(let n=0;n<e.length;n++)if(!e[n]){e[n]=s;let f=d(e,r+1,!1);e[n]=null,t=Math.max(f,t)}return t}else{let t=1/0;for(let n=0;n<e.length;n++)if(!e[n]){e[n]=u;let f=d(e,r+1,!0);e[n]=null,t=Math.min(f,t)}return t}}function a(){const e=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(const r of e){const[l,o,t]=r;if(i[l]&&i[l]===i[o]&&i[l]===i[t])return i[l]}return null}function L(){i.fill(null),m.forEach(e=>e.textContent=""),c="X"}
