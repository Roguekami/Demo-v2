import{n as v,F as o,G as u,C as d,j as i,y as m,e as r,k as p,h as b,f as g,z as $}from"./index-CEYCdedo.js";function h(){const t=$(),a=o(t.studentId),s=u(t.studentId)??{daysPresent:0,totalDays:0},n=s.totalDays?Math.round(s.daysPresent/s.totalDays*100):0,c=a.amountDue-a.amountPaid,e=g[0],l=a.name.split(" ")[0];return`
    <div class="greeting-card flex items-center gap-4">
      <div class="sidebar-avatar" style="width:56px;height:56px;font-size:1.125rem">${t.initials}</div>
      <div>
        <h2>${m()}, ${r(l)}</h2>
        <p>${a.class} &middot; ${a.admissionNo}</p>
      </div>
    </div>

    ${d.published&&d.class===a.class?`
      <div class="card mb-6 flex items-center justify-between gap-4" style="flex-wrap:wrap;border-left:4px solid var(--primary)">
        <div>
          <div class="font-semibold">${d.subject} CBT exam is open</div>
          <div class="text-sm text-secondary">${d.duration} minutes &middot; one attempt</div>
        </div>
        <button class="btn btn-primary" id="btn-start-exam">Start exam ${i.chevronRight}</button>
      </div>
    `:""}

    <div class="card-grid">
      <a href="#/student/attendance" class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Attendance</div>
          <div class="stat-card-value">${s.daysPresent}/${s.totalDays} days</div>
          <div class="progress-bar mt-2"><div class="progress-fill ${n>=75?"green":"amber"}" style="width:${n}%"></div></div>
          <div class="stat-card-sub">${n}% present this term</div>
        </div>
        <div class="stat-icon blue">${i.clipboardCheck}</div>
      </a>

      <a href="#/student/fees" class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Fee Balance</div>
          ${c>0?`
            <div class="stat-card-value text-danger">${p(c)}</div>
            <div class="stat-card-sub">Outstanding this term</div>
          `:`
            <div class="stat-card-value">Fully paid</div>
            <div class="stat-card-sub">Nothing owed this term</div>
          `}
        </div>
        <div class="stat-icon ${c>0?"red":"green"}">${i.creditCard}</div>
      </a>

      <a href="#/student/results" class="stat-card">
        <div class="stat-card-content">
          <div class="stat-card-label">Latest Report Card</div>
          <div class="stat-card-value">Term 1</div>
          <div class="stat-card-sub">View and print &rarr;</div>
        </div>
        <div class="stat-icon blue">${i.trendingUp}</div>
      </a>
    </div>

    <div class="section-heading">Latest Announcement</div>
    ${e?`
      <div class="announcement-card">
        <div class="announcement-date">${b(e.date)}</div>
        <div class="announcement-title">${r(e.title)}</div>
        <div class="announcement-body">${r(e.body)}</div>
      </div>
    `:'<div class="card empty-state"><p>No new announcements.</p></div>'}
  `}function f(){var t;(t=document.getElementById("btn-start-exam"))==null||t.addEventListener("click",()=>v("#/student/exams"))}export{f as init,h as render};
