import{n as m,t as g,g as b,b as p,c,f as $,h,e as a,i as f,j as s,k as l}from"./index-DNKaiGY_.js";import{openEnrollModal as y}from"./students-Be3W3AtS.js";import{openAnnouncementModal as E}from"./announcements-D1437T7S.js";import"./modal-Dzxcghj1.js";function A(){const v=c.length,o=g.filter(t=>t.status==="active").length,d=b(),e=p(),n=Math.round(d/(d+e||1)*100),i=c.filter(t=>t.amountDue>t.amountPaid).length,r=$.slice(0,2).map(t=>`
    <div class="announcement-card">
      <div class="announcement-date">${h(t.date)}</div>
      <div class="announcement-title">${a(t.title)}</div>
      <div class="announcement-body">${a(t.body)}</div>
    </div>
  `).join(""),u=f.map(t=>`
    <div class="event-item">
      <div class="event-date-badge">
        <span class="day">${t.day}</span>
        <span class="month">${t.month}</span>
      </div>
      <div>
        <div class="event-title">${a(t.title)}</div>
        <div class="event-desc">${a(t.description||"")}</div>
      </div>
    </div>
  `).join("");return`
    <div class="page-header">
      <h2>Dashboard</h2>
      <div class="quick-actions m-0">
        <button class="btn btn-primary" id="btn-enroll">
          ${s.plus} Enroll Student
        </button>
        <button class="btn btn-secondary" id="btn-announce">
          ${s.megaphone} Post Announcement
        </button>
      </div>
    </div>

    <div class="card-grid">
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Total Students</div>
          <div class="stat-card-value">${v}</div>
          <div class="stat-card-sub">Currently enrolled</div>
        </div>
        <div class="stat-icon blue">${s.users}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Teachers</div>
          <div class="stat-card-value">${o}</div>
          <div class="stat-card-sub">Active staff</div>
        </div>
        <div class="stat-icon green">${s.graduationCap}</div>
      </div>
      <div class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Fees Collected</div>
          <div class="stat-card-value">${l(d)}</div>
          <div class="progress-bar mt-2"><div class="progress-fill green" style="width:${n}%"></div></div>
          <div class="stat-card-sub">${n}% of this term's fees</div>
        </div>
        <div class="stat-icon blue">${s.creditCard}</div>
      </div>
      <div class="stat-card clickable-row" id="card-outstanding">
        <div class="stat-card-content">
          <div class="stat-card-label">Fees Outstanding</div>
          <div class="stat-card-value">${l(e)}</div>
          <div class="stat-card-sub">${i} student${i===1?"":"s"} owing &rarr;</div>
        </div>
        <div class="stat-icon amber">${s.creditCard}</div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div class="section-heading">Recent Announcements</div>
        <div class="card">
          ${r||'<p class="text-sm text-muted">No announcements yet.</p>'}
        </div>
      </div>
      <div>
        <div class="section-heading">Upcoming Events</div>
        <div class="card">
          ${u||'<p class="text-sm text-muted">No upcoming events.</p>'}
        </div>
      </div>
    </div>
  `}function T(){document.getElementById("btn-enroll").addEventListener("click",y),document.getElementById("btn-announce").addEventListener("click",E),document.getElementById("card-outstanding").addEventListener("click",()=>m("#/admin/fees"))}export{T as init,A as render};
