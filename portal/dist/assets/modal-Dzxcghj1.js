import{j as c}from"./index-DNKaiGY_.js";let o=null,u=null;function y(){o||(o=document.createElement("div"),o.id="modal-root",document.body.appendChild(o))}function h({title:t,content:a,footer:e,submitLabel:d="Save",onSubmit:l}){var m;y(),clearTimeout(u);const f=e??`
    <button class="btn btn-secondary" data-modal-close>Cancel</button>
    <button class="btn btn-primary" data-modal-submit>${d}</button>
  `;o.innerHTML=`
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" role="dialog" aria-modal="true">
        <div class="modal-header">
          <h3 class="modal-title">${t}</h3>
          <button class="modal-close" data-modal-close aria-label="Close">${c.x}</button>
        </div>
        <div class="modal-body">${a}</div>
        <div class="modal-footer">${f}</div>
      </div>
    </div>
  `;const i=o.querySelector(".modal-overlay");return requestAnimationFrame(()=>i.classList.add("open")),o.querySelectorAll("[data-modal-close]").forEach(r=>{r.addEventListener("click",n)}),i.addEventListener("click",r=>{r.target===i&&n()}),document.addEventListener("keydown",v),l&&b(l),(m=o.querySelector(".modal-body input, .modal-body select, .modal-body textarea"))==null||m.focus(),o.querySelector(".modal-body")}function n(){if(!o)return;const t=o.querySelector(".modal-overlay");t&&(t.classList.remove("open"),u=setTimeout(()=>{o.innerHTML=""},200)),document.removeEventListener("keydown",v)}function v(t){t.key==="Escape"&&n()}function b(t){if(!o)return;const a=o.querySelector("[data-modal-submit]");a&&a.addEventListener("click",()=>{const e=o.querySelector(".modal-body"),d=[...e.querySelectorAll("[required]")].filter(l=>!String(l.value).trim());if(e.querySelectorAll(".is-invalid").forEach(l=>l.classList.remove("is-invalid")),d.length){d.forEach(l=>l.classList.add("is-invalid")),d[0].focus();return}t(e)!==!1&&n()})}function E(t){var a,e;return((e=(a=document.getElementById(t))==null?void 0:a.value)==null?void 0:e.trim())??""}let s=null;function L(t,a="success"){s||(s=document.createElement("div"),s.className="toast-root",document.body.appendChild(s));const e=document.createElement("div");e.className=`toast toast-${a}`,e.innerHTML=`${a==="success"?c.check:c.alertCircle}<span>${t}</span>`,s.appendChild(e),requestAnimationFrame(()=>e.classList.add("show")),setTimeout(()=>{e.classList.remove("show"),setTimeout(()=>e.remove(),250)},3e3)}export{E as f,h as o,L as t};
