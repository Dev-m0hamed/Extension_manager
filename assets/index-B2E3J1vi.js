(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&t(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const m=document.getElementById("ThemeToggle"),i=document.getElementById("sunIcon"),a=document.getElementById("moonIcon"),f=document.body;localStorage.getItem("theme")==="dark"?(document.body.classList.add("dark"),i.classList.remove("hidden"),a.classList.add("hidden")):(document.body.classList.remove("dark"),i.classList.add("hidden"),a.classList.remove("hidden"));m.addEventListener("click",()=>{const o=f.classList.toggle("dark");a.classList.toggle("hidden",o),i.classList.toggle("hidden",!o),localStorage.setItem("theme",o?"dark":"light")});const d=document.querySelectorAll("#btnContainer button");d.forEach(o=>{o.addEventListener("click",c=>{d.forEach(r=>{r.removeAttribute("data-active")}),c.target.setAttribute("data-active","true"),u(c.target.innerText)})});const l=document.getElementById("extensionsList");async function u(o){try{let r=await(await fetch("data.json")).json();o==="Active"&&(r=r.filter(t=>t.isActive===!0)),o==="Inactive"&&(r=r.filter(t=>t.isActive===!1)),l.innerHTML="",r.forEach(t=>{const e=document.createElement("div");e.className="card",e.innerHTML=`<div class="card-header">
          <img src="${t.logo}" alt="${t.name}" class="card-img"/>
          <div class="card-info">
            <h2 class="card-title">${t.name}</h2>
            <p class="card-description">${t.description}</p>
          </div>
        </div>
        <div class="card-control">
          <button class="card-btn">Remove</button>
          <label class="card-label">
            <input type="checkbox" class="sr-only peer" ${t.isActive?"checked":""}/>
            <span
              class="card-slider"
            ></span>
          </label>
        </div>`,e.querySelector(".card-btn").addEventListener("click",()=>e.remove()),l.appendChild(e)})}catch(c){console.error("Failed to load extensions:",c)}}u();
