import{f as t,r as c,v as p,j as d,h as b,e as i,o as l,i as o}from"./index-CEYCdedo.js";import{t as r,o as v,f as s}from"./modal-Bs8ai2sk.js";function g(){const n=t.map(e=>`
    <div class="announcement-card">
      <div class="flex justify-between items-center">
        <div class="announcement-date">${b(e.date)}</div>
        <button class="btn btn-sm btn-ghost text-danger delete-announcement" data-id="${e.id}" title="Delete">${d.trash}</button>
      </div>
      <div class="announcement-title">${i(e.title)}</div>
      <div class="announcement-body">${i(e.body)}</div>
    </div>
  `).join("");return`
    <div class="page-header">
      <h2>Announcements & Events</h2>
      <button class="btn btn-primary" id="btn-new-announcement">
        ${d.plus} New Announcement
      </button>
    </div>

    <p class="text-sm text-secondary mb-4">Posts here appear on every teacher's and student's dashboard.</p>

    <div class="card">
      ${n||'<div class="empty-state"><p>No announcements yet.</p></div>'}
    </div>
  `}function f(){v({title:"New Announcement",submitLabel:"Post",content:`
      <div class="form-group">
        <label class="form-label" for="ann-title">Title</label>
        <input type="text" class="form-input" id="ann-title" placeholder="e.g. Open Day this Saturday" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="ann-date">Date</label>
        <input type="date" class="form-input" id="ann-date" value="${p()}" required>
      </div>
      <div class="form-group">
        <label class="form-label" for="ann-body">Message</label>
        <textarea class="form-textarea" id="ann-body" rows="4" required></textarea>
      </div>
      <label class="flex items-center gap-2 text-sm">
        <input type="checkbox" id="ann-event"> Also add to Upcoming Events
      </label>
    `,onSubmit:()=>{const n=s("ann-date"),e=s("ann-title");if(t.unshift({id:l(t),title:e,date:n,body:s("ann-body")}),document.getElementById("ann-event").checked){const a=new Date(n);o.push({id:l(o),title:e,date:n,day:String(a.getDate()),month:a.toLocaleDateString("en-GB",{month:"short"}),description:s("ann-body").slice(0,60)}),o.sort((m,u)=>m.date.localeCompare(u.date))}r("Announcement posted to all teachers and students"),c()}})}function x(){document.getElementById("btn-new-announcement").addEventListener("click",f),document.querySelectorAll(".delete-announcement").forEach(n=>{n.addEventListener("click",()=>{const e=t.findIndex(a=>a.id===Number(n.dataset.id));e>-1&&t.splice(e,1),r("Announcement deleted","info"),c()})})}export{x as init,f as openAnnouncementModal,g as render};
