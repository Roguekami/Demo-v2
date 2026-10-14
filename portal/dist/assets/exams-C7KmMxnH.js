import{B as a,C as c,j as d,e as p,z as B,E as I,n as L}from"./index-DNKaiGY_.js";import{o as x,t as k}from"./modal-Dzxcghj1.js";const S=["A","B","C","D"];let e,g=null;function f(){clearInterval(g),g=null}window.addEventListener("hashchange",()=>{window.location.hash!=="#/student/exams"&&f()});function T(){return a.length?`
    <div class="cbt-layout">
      <div class="cbt-header">
        <div class="cbt-title">${p(c.subject)} &mdash; ${c.class} CBT</div>
        <div class="cbt-progress"><span id="answered-count">0</span> of ${a.length} answered</div>
        <div class="flex items-center gap-4">
          <div class="cbt-timer calm flex items-center gap-2" id="timer">${d.clock} <span id="timer-text">--:--</span></div>
          <button class="btn btn-sm btn-ghost" id="btn-exit">Exit</button>
        </div>
      </div>
      <div class="cbt-progress-track"><div class="cbt-progress-fill" id="progress-fill" style="width:0%"></div></div>

      <div class="cbt-main">
        <div class="cbt-body">
          <div class="cbt-question-num" id="q-title"></div>
          <div class="cbt-question" id="q-text"></div>
          <div id="q-options"></div>
        </div>

        <div class="cbt-footer">
          <div class="cbt-footer-group">
            <button class="btn btn-secondary" id="btn-flag">${d.flag} <span>Flag for review</span></button>
            <button class="btn btn-secondary" id="btn-review">${d.eye} Review all</button>
          </div>
          <div class="cbt-footer-group">
            <button class="btn btn-secondary" id="btn-prev">${d.chevronLeft} Previous</button>
            <button class="btn btn-primary" id="btn-next"></button>
          </div>
        </div>
      </div>

      <div class="cbt-review-backdrop" id="review-backdrop"></div>
      <aside class="cbt-review-panel" id="review-panel">
        <div class="cbt-review-header">
          Review questions
          <button class="modal-close" id="btn-close-review" aria-label="Close">${d.x}</button>
        </div>
        <div class="cbt-review-grid" id="review-grid"></div>
        <div class="cbt-review-legend">
          <span class="lg-answered">Answered</span>
          <span class="lg-flagged">Flagged</span>
          <span>Not answered</span>
        </div>
        <div class="p-5 border-t" style="margin-top:auto">
          <button class="btn btn-primary w-full justify-center" id="btn-submit-panel">Submit exam</button>
        </div>
      </aside>
    </div>
  `:`
      <div class="cbt-layout">
        <div class="cbt-result card">
          <h2 class="text-xl font-semibold mb-2">No exam available</h2>
          <p class="text-secondary mb-6">Your teacher hasn't published an exam yet.</p>
          <a href="#/student/dashboard" class="btn btn-primary">Back to dashboard</a>
        </div>
      </div>
    `}function v(){return e.answers.filter(t=>t!==void 0).length}function l(){const t=e.current,i=a[t],n=t===a.length-1;document.getElementById("q-title").textContent=`Question ${t+1} of ${a.length}`,document.getElementById("q-text").textContent=i.question,document.getElementById("q-options").innerHTML=i.options.map((m,r)=>`
    <div class="cbt-option ${e.answers[t]===r?"selected":""}" data-index="${r}" role="button" tabindex="0">
      <span class="cbt-option-letter">${S[r]}</span>
      <span>${p(m)}</span>
    </div>
  `).join(""),document.getElementById("btn-prev").disabled=t===0,document.getElementById("btn-next").innerHTML=n?`${d.check} Finish`:`Next ${d.chevronRight}`;const s=e.flagged.has(t),o=document.getElementById("btn-flag");o.classList.toggle("flag-active",s),o.querySelector("span").textContent=s?"Flagged":"Flag for review",y()}function y(){const t=v();document.getElementById("answered-count").textContent=t,document.getElementById("progress-fill").style.width=`${t/a.length*100}%`,document.getElementById("review-grid").innerHTML=a.map((i,n)=>`<div class="cbt-review-dot ${[e.answers[n]!==void 0?"answered":"",e.flagged.has(n)?"flagged":"",e.current===n?"current":""].join(" ")}" data-index="${n}">${n+1}</div>`).join("")}function b(){const t=Math.floor(e.remaining/60),i=e.remaining%60;document.getElementById("timer-text").textContent=`${String(t).padStart(2,"0")}:${String(i).padStart(2,"0")}`;const n=document.getElementById("timer");n.classList.toggle("calm",e.remaining>300),n.classList.toggle("urgent",e.remaining<=60)}function u(t){document.getElementById("review-panel").classList.toggle("open",t),document.getElementById("review-backdrop").classList.toggle("open",t)}function w(){u(!1);const t=a.length-v();x({title:"Submit exam?",submitLabel:"Submit exam",content:`
      <p class="text-sm text-secondary mb-4">You can't change your answers after submitting.</p>
      <div class="flex justify-between text-sm mb-2"><span>Answered</span><span class="font-semibold">${v()} / ${a.length}</span></div>
      ${t?`<div class="flex justify-between text-sm mb-2 text-danger"><span>Unanswered</span><span class="font-semibold">${t}</span></div>`:""}
      ${e.flagged.size?`<div class="flex justify-between text-sm text-secondary"><span>Flagged for review</span><span class="font-semibold">${e.flagged.size}</span></div>`:""}
    `,onSubmit:()=>h()})}function h(t=!1){var o,m,r;f();const i=a.filter((E,$)=>e.answers[$]===E.correct).length,n=Math.round(i/a.length*100),s=(o=B())==null?void 0:o.studentId;s&&(((m=I)[r=c.subject]??(m[r]={}))[s]=n),document.querySelector(".cbt-layout").innerHTML=`
    <div class="cbt-result card">
      <div class="stat-icon green" style="margin:0 auto 16px;width:56px;height:56px">${d.check}</div>
      <h2 class="text-xl font-semibold mb-2">${t?"Time's up — exam submitted":"Exam submitted"}</h2>
      <p class="text-secondary mb-6">${p(c.subject)} &mdash; ${c.class}</p>
      <div class="cbt-result-score">${n}%</div>
      <p class="text-sm text-secondary mb-6">${i} of ${a.length} correct</p>
      <p class="text-xs text-muted mb-6">Your score has been sent to your teacher and will appear on your report card once results are published.</p>
      <a href="#/student/dashboard" class="btn btn-primary">Back to dashboard</a>
    </div>
  `,t&&k("Time's up — your answers were submitted automatically","warning")}function C(){if(!a.length)return;e={current:0,answers:[],flagged:new Set,remaining:c.duration*60},l(),b(),f(),g=setInterval(()=>{if(e.remaining--,e.remaining<=0){e.remaining=0,b(),h(!0);return}b()},1e3);const t=n=>{e.answers[e.current]=Number(n.dataset.index),document.querySelectorAll(".cbt-option").forEach(s=>s.classList.toggle("selected",s===n)),y()},i=document.getElementById("q-options");i.addEventListener("click",n=>{const s=n.target.closest(".cbt-option");s&&t(s)}),i.addEventListener("keydown",n=>{const s=n.target.closest(".cbt-option");s&&(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),t(s))}),document.getElementById("btn-next").addEventListener("click",()=>{e.current<a.length-1?(e.current++,l()):w()}),document.getElementById("btn-prev").addEventListener("click",()=>{e.current>0&&(e.current--,l())}),document.getElementById("btn-flag").addEventListener("click",()=>{e.flagged.has(e.current)?e.flagged.delete(e.current):e.flagged.add(e.current),l()}),document.getElementById("btn-exit").addEventListener("click",()=>{x({title:"Leave exam?",content:'<p class="text-sm text-secondary">Your answers will not be saved.</p>',submitLabel:"Leave exam",onSubmit:()=>L("#/student/dashboard")})}),document.getElementById("btn-review").addEventListener("click",()=>u(!0)),document.getElementById("btn-close-review").addEventListener("click",()=>u(!1)),document.getElementById("review-backdrop").addEventListener("click",()=>u(!1)),document.getElementById("btn-submit-panel").addEventListener("click",w),document.getElementById("review-grid").addEventListener("click",n=>{const s=n.target.closest(".cbt-review-dot");s&&(e.current=Number(s.dataset.index),l(),u(!1))})}export{C as init,T as render};
