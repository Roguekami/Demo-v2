import{w as r,n as o,x as n,j as c,y as l,e as a,h as u,f as v,z as h}from"./index-CEYCdedo.js";const m=[{color:"var(--danger)",text:"SS2 Mathematics results not yet submitted",route:"#/teacher/results"},{color:"var(--warning)",text:"SS1 Further Mathematics results pending",route:"#/teacher/results"},{color:"var(--info)",text:"Upload resources for SS2 Mathematics",route:"#/teacher/resources"}];function p(){const s=h(),d=new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"}),t=v[0],i=n.map(e=>`
    <div class="schedule-item">
      <div class="schedule-time">${e.time}</div>
      <div class="schedule-info">
        <div class="schedule-subject">${e.subject}</div>
        <div class="schedule-class">${e.class} &middot; Period ${e.period}</div>
      </div>
      <button class="btn btn-sm btn-primary mark-attendance-btn" data-class="${e.class}">${c.clipboardCheck} Mark attendance</button>
    </div>
  `).join("");return`
    <div class="greeting-card">
      <h2>${l()}, ${a(s.name)}</h2>
      <p>${d} &middot; ${n.length} periods today</p>
    </div>

    <div class="grid-2">
      <div class="card p-0">
        <div class="p-5 border-b"><h3 class="section-heading m-0">Today's Schedule</h3></div>
        ${i}
      </div>

      <div>
        <div class="card mb-6">
          <h3 class="section-heading">Pending Actions</h3>
          ${m.map(e=>`
            <a href="${e.route}" class="flex items-center gap-3 mb-4 text-sm">
              <span style="width:10px;height:10px;border-radius:50%;background:${e.color};flex-shrink:0"></span>
              <span class="flex-1">${e.text}</span>
              <span class="text-muted">${c.chevronRight}</span>
            </a>
          `).join("")}
        </div>
        ${t?`
          <div class="section-heading">Latest Announcement</div>
          <div class="announcement-card">
            <div class="announcement-date">${u(t.date)}</div>
            <div class="announcement-title">${a(t.title)}</div>
            <div class="announcement-body">${a(t.body)}</div>
          </div>
        `:""}
      </div>
    </div>
  `}function $(){document.querySelectorAll(".mark-attendance-btn").forEach(s=>{s.addEventListener("click",()=>{r.attendanceClass=s.dataset.class,o("#/teacher/attendance")})})}export{$ as init,p as render};
