import{B as i,r as u,C as p,j as r,e as d,o as h}from"./index-CEYCdedo.js";import{t as m,o as $,f as v}from"./modal-Bs8ai2sk.js";const b=["A","B","C","D"];function g(){const s=i.length>0,t=p,e=(o,l)=>o.map(n=>`<option ${n===l?"selected":""}>${n}</option>`).join(""),a=i.map((o,l)=>`
    <div class="question-card">
      <div class="question-card-header">
        <div class="question-number">Question ${l+1}</div>
        <div class="flex gap-2">
          <button class="btn btn-sm btn-ghost edit-q" data-id="${o.id}" title="Edit">${r.edit}</button>
          <button class="btn btn-sm btn-ghost text-danger delete-q" data-id="${o.id}" title="Delete">${r.trash}</button>
        </div>
      </div>
      <div class="question-text">${d(o.question)}</div>
      <div class="question-options">
        ${o.options.map((n,c)=>`
          <div class="question-opt ${c===o.correct?"correct":""}">
            <span class="font-semibold mr-2">${b[c]}.</span>${d(n)}
            ${c===o.correct?" ✓":""}
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");return`
    <div class="page-header">
      <h2>Exam Creation</h2>
      <div class="flex items-center gap-3">
        <span class="badge ${t.published?"badge-success":"badge-warning"}">${t.published?"Published":"Draft"}</span>
        <button class="btn btn-primary" id="btn-publish" ${s?"":"disabled"} title="${s?"":"Add at least one question to publish"}">
          ${t.published?"Update Exam":"Publish Exam"}
        </button>
      </div>
    </div>

    <div class="card mb-6">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="ex-subject">Subject</label>
          <select class="form-select" id="ex-subject">${e(["Mathematics","Further Mathematics"],t.subject)}</select>
        </div>
        <div class="form-group">
          <label class="form-label" for="ex-class">Class</label>
          <select class="form-select" id="ex-class">${e(["SS1","SS2"],t.class)}</select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="ex-open">Opens</label>
          <input type="datetime-local" class="form-input" id="ex-open" value="${t.opens}">
        </div>
        <div class="form-group">
          <label class="form-label" for="ex-close">Closes</label>
          <input type="datetime-local" class="form-input" id="ex-close" value="${t.closes}">
        </div>
      </div>
      <div class="form-group m-0" style="max-width:240px">
        <label class="form-label" for="ex-duration">Duration (minutes)</label>
        <input type="number" class="form-input" id="ex-duration" min="1" value="${t.duration}">
      </div>
    </div>

    <div class="flex justify-between items-center mb-4">
      <div class="section-heading m-0">Question Bank (${i.length} question${i.length===1?"":"s"})</div>
      <button class="btn btn-secondary" id="btn-add-q">${r.plus} Add Question</button>
    </div>

    ${a||'<div class="card empty-state"><p>No questions yet. Add your first question to enable publishing.</p></div>'}
  `}function f(s){const t=s??{question:"",options:["","","",""],correct:0};$({title:s?"Edit Question":"Add Question",submitLabel:s?"Save changes":"Add question",content:`
      <div class="form-group">
        <label class="form-label" for="q-text">Question</label>
        <textarea class="form-textarea" id="q-text" rows="3" required>${d(t.question)}</textarea>
      </div>
      ${b.map((e,a)=>`
        <div class="form-group flex items-center gap-3">
          <label class="flex items-center gap-2 text-sm font-medium" title="Mark as correct answer">
            <input type="radio" name="q-correct" value="${a}" ${a===t.correct?"checked":""}> ${e}
          </label>
          <input type="text" class="form-input" id="q-opt-${a}" value="${d(t.options[a])}" placeholder="Option ${e}" required>
        </div>
      `).join("")}
      <div class="form-hint">Select the radio button next to the correct answer.</div>
    `,onSubmit:()=>{var a;const e={question:v("q-text"),options:b.map((o,l)=>v(`q-opt-${l}`)),correct:Number(((a=document.querySelector('input[name="q-correct"]:checked'))==null?void 0:a.value)??0)};s?Object.assign(s,e):i.push({id:h(i),subject:p.subject,...e}),m(s?"Question updated":"Question added"),u()}})}function y(){const s=p,t=(e,a,o=l=>l)=>document.getElementById(e).addEventListener("change",l=>{s[a]=o(l.target.value)});t("ex-subject","subject"),t("ex-class","class"),t("ex-open","opens"),t("ex-close","closes"),t("ex-duration","duration",e=>Math.max(1,Number(e)||1)),document.getElementById("btn-add-q").addEventListener("click",()=>f()),document.querySelectorAll(".edit-q").forEach(e=>e.addEventListener("click",()=>{f(i.find(a=>a.id===Number(e.dataset.id)))})),document.querySelectorAll(".delete-q").forEach(e=>e.addEventListener("click",()=>{const a=i.findIndex(o=>o.id===Number(e.dataset.id));a>-1&&i.splice(a,1),m("Question deleted","info"),u()})),document.getElementById("btn-publish").addEventListener("click",()=>{const e=s.published;s.published=!0,m(e?"Exam updated":`${s.subject} exam published to ${s.class} — ${i.length} questions, ${s.duration} min`),u()})}export{y as init,g as render};
