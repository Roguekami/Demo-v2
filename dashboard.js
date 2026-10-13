/* ============================================================
   ALIMO EDUCLOUD — ADMIN DASHBOARD (DEMO)
   ============================================================
   All data below is fabricated sample data for a fictional
   school. There is no backend: every table is rendered from
   the constants in this file, and nothing persists.
   ============================================================ */

(function () {
  'use strict';

  /* ── Formatting helpers ───────────────────────────────── */
  var naira = new Intl.NumberFormat('en-NG', {
    style: 'currency', currency: 'NGN', maximumFractionDigits: 0
  });
  var money = function (n) { return naira.format(n); };
  var pct = function (a, b) { return b === 0 ? 0 : Math.round((a / b) * 100); };

  // Compact Naira for headline tiles: 3_075_000 -> "₦3.08m"
  function moneyShort(n) {
    if (n >= 1e6) return '₦' + (n / 1e6).toFixed(2).replace(/\.00$/, '') + 'm';
    if (n >= 1e3) return '₦' + Math.round(n / 1e3) + 'k';
    return money(n);
  }

  // Small deterministic hash so generated rosters/registers are
  // stable across reloads but still change when inputs change.
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    // Avalanche step. Without it, FNV leaves near-identical inputs
    // ("JSS2A" + name + the same date) correlated, which clustered
    // absences into whole classes instead of spreading them.
    h ^= h >>> 15;
    h = Math.imul(h, 2246822507) >>> 0;
    h ^= h >>> 13;
    h = Math.imul(h, 3266489909) >>> 0;
    h ^= h >>> 16;
    return h >>> 0;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ── Reference data ───────────────────────────────────── */
  var CLASSES = ['JSS1A', 'JSS1B', 'JSS2A', 'JSS2B', 'JSS3A', 'SS1A', 'SS2A', 'SS3A'];

  var FEE_BY_LEVEL = { JSS: 185000, SS: 215000 };
  var levelOf = function (cls) { return cls.indexOf('JSS') === 0 ? 'JSS' : 'SS'; };
  var feeFor = function (cls) { return FEE_BY_LEVEL[levelOf(cls)]; };

  /* Students — the enrolment register shown on the Students page.
     `paid` drives the Fees page so the two never disagree. */
  var STUDENTS = [
    { name: 'Chinedu Okafor',     adm: 'LA/2024/118', cls: 'JSS1A', gender: 'Male',   guardian: 'Mr. Emeka Okafor',      status: 'Active',   paid: 185000 },
    { name: 'Aisha Bello',        adm: 'LA/2024/124', cls: 'JSS1A', gender: 'Female', guardian: 'Alhaji Musa Bello',     status: 'Active',   paid: 185000 },
    { name: 'Temitope Alabi',     adm: 'LA/2024/131', cls: 'JSS1B', gender: 'Female', guardian: 'Mrs. Bisi Alabi',       status: 'Active',   paid: 120000 },
    { name: 'Yusuf Danjuma',      adm: 'LA/2024/137', cls: 'JSS1B', gender: 'Male',   guardian: 'Mr. Garba Danjuma',     status: 'Active',   paid: 185000 },
    { name: 'Ngozi Eze',          adm: 'LA/2023/078', cls: 'JSS2A', gender: 'Female', guardian: 'Mrs. Chioma Eze',       status: 'Active',   paid: 185000 },
    { name: 'Ibrahim Musa',       adm: 'LA/2023/081', cls: 'JSS2A', gender: 'Male',   guardian: 'Mallam Sani Musa',      status: 'Active',   paid: 90000  },
    { name: 'Folake Adebayo',     adm: 'LA/2023/086', cls: 'JSS2A', gender: 'Female', guardian: 'Mr. Tunde Adebayo',     status: 'Active',   paid: 185000 },
    { name: 'Emeka Nwosu',        adm: 'LA/2023/092', cls: 'JSS2B', gender: 'Male',   guardian: 'Mrs. Uche Nwosu',       status: 'Active',   paid: 185000 },
    { name: 'Zainab Yusuf',       adm: 'LA/2023/095', cls: 'JSS2B', gender: 'Female', guardian: 'Dr. Halima Yusuf',      status: 'Inactive', paid: 0      },
    { name: 'Oluwaseun Ogunleye', adm: 'LA/2022/044', cls: 'JSS3A', gender: 'Male',   guardian: 'Mr. Dele Ogunleye',     status: 'Active',   paid: 185000 },
    { name: 'Chiamaka Obi',       adm: 'LA/2022/051', cls: 'JSS3A', gender: 'Female', guardian: 'Mrs. Ifeoma Obi',       status: 'Active',   paid: 100000 },
    { name: 'Blessing Okonkwo',   adm: 'LA/2022/057', cls: 'JSS3A', gender: 'Female', guardian: 'Mr. Paul Okonkwo',      status: 'Active',   paid: 185000 },
    { name: 'Segun Bakare',       adm: 'LA/2021/019', cls: 'SS1A',  gender: 'Male',   guardian: 'Mrs. Yemi Bakare',      status: 'Active',   paid: 215000 },
    { name: 'Halima Abubakar',    adm: 'LA/2021/023', cls: 'SS1A',  gender: 'Female', guardian: 'Alhaji Nuhu Abubakar',  status: 'Active',   paid: 215000 },
    { name: 'Uchenna Nnamdi',     adm: 'LA/2021/028', cls: 'SS1A',  gender: 'Male',   guardian: 'Mr. Obi Nnamdi',        status: 'Inactive', paid: 0      },
    { name: 'Kelechi Anyanwu',    adm: 'LA/2020/007', cls: 'SS2A',  gender: 'Male',   guardian: 'Mrs. Ada Anyanwu',      status: 'Active',   paid: 110000 },
    { name: 'Fatima Sani',        adm: 'LA/2020/011', cls: 'SS2A',  gender: 'Female', guardian: 'Mallam Idris Sani',     status: 'Active',   paid: 215000 },
    { name: 'Adaeze Igwe',        adm: 'LA/2020/015', cls: 'SS2A',  gender: 'Female', guardian: 'Mr. Chuka Igwe',        status: 'Active',   paid: 215000 },
    { name: 'Tunde Adeyemi',      adm: 'LA/2019/003', cls: 'SS3A',  gender: 'Male',   guardian: 'Mrs. Ronke Adeyemi',    status: 'Active',   paid: 100000 },
    { name: 'Amina Lawal',        adm: 'LA/2019/006', cls: 'SS3A',  gender: 'Female', guardian: 'Alhaji Bello Lawal',    status: 'Active',   paid: 215000 }
  ];

  /* JSS2A result sheet — the class the Results page ships with. */
  var RESULTS_JSS2A = [
    { name: 'Ngozi Eze',          math: 88, eng: 82, sci: 90 },
    { name: 'Ibrahim Musa',       math: 74, eng: 69, sci: 78 },
    { name: 'Folake Adebayo',     math: 91, eng: 85, sci: 87 },
    { name: 'Chidi Umeh',         math: 65, eng: 71, sci: 62 },
    { name: 'Hauwa Garba',        math: 58, eng: 64, sci: 60 },
    { name: 'Olumide Fashola',    math: 79, eng: 75, sci: 81 },
    { name: 'Grace Adeniyi',      math: 83, eng: 88, sci: 79 },
    { name: 'Musa Aliyu',         math: 52, eng: 48, sci: 55 },
    { name: 'Peace Ekong',        math: 70, eng: 73, sci: 68 },
    { name: 'Daniel Oyelaran',    math: 61, eng: 59, sci: 66 },
    { name: 'Rahma Idris',        math: 77, eng: 80, sci: 74 },
    { name: 'Victor Nwachukwu',   math: 45, eng: 51, sci: 49 },
    { name: 'Sade Olaniyi',       math: 86, eng: 79, sci: 84 },
    { name: 'Abdul Yakubu',       math: 68, eng: 62, sci: 71 },
    { name: 'Ifeoma Chukwu',      math: 73, eng: 77, sci: 70 },
    { name: 'Bola Shittu',        math: 55, eng: 57, sci: 53 },
    { name: 'Nneka Obiora',       math: 90, eng: 87, sci: 92 },
    { name: 'Suleiman Bala',      math: 63, eng: 66, sci: 60 },
    { name: 'Tobi Akinwale',      math: 71, eng: 68, sci: 75 },
    { name: 'Esther Udo',         math: 80, eng: 84, sci: 78 },
    { name: 'Habeeb Oyinlola',    math: 49, eng: 44, sci: 52 },
    { name: 'Chisom Nwankwo',     math: 84, eng: 81, sci: 86 },
    { name: 'Maryam Tijani',      math: 66, eng: 70, sci: 64 },
    { name: 'Gbenga Soyinka',     math: 57, eng: 53, sci: 59 },
    { name: 'Amara Onyeka',       math: 76, eng: 72, sci: 79 }
  ];

  /* Name pool used to build plausible registers for the other
     classes on the Attendance page. JSS2A uses the sheet above. */
  var NAME_POOL = [
    'Adanna Eze', 'Bashir Lawal', 'Chioma Nwafor', 'Damilola Ajayi', 'Ebuka Madu',
    'Farida Abdullahi', 'Gbemisola Ade', 'Hassan Umar', 'Ifeanyi Obiora', 'Jumoke Sanni',
    'Kemi Adeleke', 'Lanre Oyebode', 'Maryam Bello', 'Nnamdi Okeke', 'Oyinkansola Dada',
    'Patience Etim', 'Quadri Olatunji', 'Rukayat Jimoh', 'Samuel Agbaje', 'Tochukwu Ibe',
    'Usman Shehu', 'Victoria Ndukwe', 'Wasiu Balogun', 'Yetunde Ojo', 'Zara Mohammed',
    'Abiodun Taiwo', 'Chukwuemeka Alo', 'Deborah Ukachi', 'Emmanuel Opara', 'Funmilayo Bello',
    'Godwin Ameh', 'Hadiza Bukar', 'Isioma Okolie', 'Joshua Terna', 'Khadijat Raji',
    'Linda Nwachi', 'Mustapha Audu', 'Nkechi Agu', 'Olamide Shoda', 'Precious Bassey'
  ];

  /* Teaching staff, split by school level. */
  var JUNIOR_SUBJECTS = [
    ['Mathematics', 'Mr. Okonjo'], ['English Language', 'Mrs. Balogun'],
    ['Basic Science', 'Mr. Eze'], ['Social Studies', 'Mrs. Adeyemi'],
    ['Civic Education', 'Mr. Lawal'], ['Agric Science', 'Mrs. Nwankwo'],
    ['Computer Studies', 'Mr. Bello'], ['Business Studies', 'Mrs. Chukwu'],
    ['Yoruba', 'Mr. Adeniran'], ['Fine Art', 'Mr. Obi'],
    ['P.H.E.', 'Mr. Danladi'], ['Home Economics', 'Mrs. Ibrahim']
  ];

  var SENIOR_SUBJECTS = [
    ['Mathematics', 'Mr. Okonjo'], ['English Language', 'Mrs. Balogun'],
    ['Physics', 'Mr. Adewale'], ['Chemistry', 'Mrs. Okafor'],
    ['Biology', 'Mr. Nnaji'], ['Literature-in-English', 'Mrs. Bassey'],
    ['Government', 'Mr. Yusuf'], ['Economics', 'Mrs. Afolabi'],
    ['Further Maths', 'Mr. Okonjo'], ['Civic Education', 'Mr. Lawal'],
    ['Geography', 'Mrs. Ejike'], ['Computer Studies', 'Mr. Bello']
  ];

  var ENROLMENT = [
    { month: 'Sep', value: 782 }, { month: 'Oct', value: 798 },
    { month: 'Nov', value: 806 }, { month: 'Dec', value: 820 },
    { month: 'Jan', value: 834 }, { month: 'Feb', value: 847 }
  ];

  var ACTIVITY = [
    { icon: 'check',  text: 'JSS2A attendance marked by Mr. Eze',            meta: 'Today, 08:12' },
    { icon: 'card',   text: 'Term 2 invoices generated for 847 students',    meta: 'Today, 07:05' },
    { icon: 'doc',    text: 'JSS3A Mathematics results uploaded',            meta: 'Yesterday, 16:22' },
    { icon: 'user',   text: 'New student enrolled into SS1A — Amara Nwoye',  meta: 'Yesterday, 11:48' },
    { icon: 'bell',   text: 'Fee reminder SMS sent to 112 guardians',        meta: '2 days ago, 09:00' }
  ];

  var MODULES = [
    { view: 'students',   name: 'Students',   sub: '847 enrolled',       icon: 'user' },
    { view: 'fees',       name: 'Fees',       sub: '78% collected',      icon: 'card' },
    { view: 'attendance', name: 'Attendance', sub: '91% today',          icon: 'check' },
    { view: 'results',    name: 'Results',    sub: 'Second Term',        icon: 'doc' },
    { view: 'timetable',  name: 'Timetable',  sub: '8 classes',          icon: 'grid' },
    { view: 'settings',   name: 'Settings',   sub: 'School profile',     icon: 'cog' }
  ];

  var ICONS = {
    check: '<path d="M3 12.5l5.5 5.5L21 5.5"/>',
    card:  '<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M2.5 10h19"/>',
    doc:   '<path d="M5 3.5h14v17l-7-3.4-7 3.4z"/>',
    user:  '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8"/>',
    bell:  '<path d="M18 8.5a6 6 0 1 0-12 0c0 6-2 7.5-2 7.5h16s-2-1.5-2-7.5z"/>',
    grid:  '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9.5h18M9 9.5v11"/>',
    cog:   '<circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/>'
  };

  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : '') + '>' + (ICONS[name] || '') + '</svg>';
  }

  /* ── Derived helpers ──────────────────────────────────── */
  function rosterFor(cls) {
    if (cls === 'JSS2A') return RESULTS_JSS2A.map(function (r) { return r.name; });
    var seed = hash(cls);
    var size = 18 + (seed % 7);               // 18–24 students per class
    var start = seed % NAME_POOL.length;
    var out = [];
    for (var i = 0; i < size; i++) out.push(NAME_POOL[(start + i * 3) % NAME_POOL.length]);
    // de-duplicate while preserving order
    return out.filter(function (n, i) { return out.indexOf(n) === i; });
  }

  /* Admission numbers must be unique and must agree with the
     enrolment register, so a student on the Students page keeps
     the same number on the Attendance register. Names not in the
     register get a number seeded by their position in the class,
     which keeps generated numbers unique within that class. */
  var ADM_BY_NAME = {};
  STUDENTS.forEach(function (s) { ADM_BY_NAME[s.name] = s.adm; });

  function admFor(cls, name, i) {
    if (ADM_BY_NAME[name]) return ADM_BY_NAME[name];
    var h = hash(cls + name);
    var year = 2019 + (h % 6);
    var serial = 100 + ((hash(cls) % 300) + i * 7) % 800;
    return 'LA/' + year + '/' + serial;
  }

  function gradeFor(avg) {
    if (avg >= 70) return 'A';
    if (avg >= 60) return 'B';
    if (avg >= 50) return 'C';
    if (avg >= 45) return 'D';
    if (avg >= 40) return 'E';
    return 'F';
  }

  function badge(label, kind) {
    return '<span class="badge badge-' + kind + '">' + label + '</span>';
  }

  function feeStatus(due, paid) {
    if (paid >= due) return 'Paid';
    if (paid > 0) return 'Partial';
    return 'Unpaid';
  }

  /* ── Enrolment chart (line: the 782→847 range would render
        as near-flat bars, and truncating a bar baseline to
        manufacture variation misstates the data) ─────────── */
  function renderChart() {
    var host = document.getElementById('enrolment-chart');
    if (!host) return;

    var W = 620, H = 200, padL = 46, padR = 30, padT = 14, padB = 30;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var yMin = 760, yMax = 860, ticks = [760, 785, 810, 835, 860];

    var x = function (i) { return padL + (plotW / (ENROLMENT.length - 1)) * i; };
    var y = function (v) { return padT + plotH - ((v - yMin) / (yMax - yMin)) * plotH; };

    var svg = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'aria-label="Enrolment rose from 782 students in September to 847 in February.">';

    ticks.forEach(function (t) {
      svg += '<line class="grid-line" x1="' + padL + '" y1="' + y(t) + '" x2="' + (W - padR) + '" y2="' + y(t) + '"/>';
      svg += '<text class="axis-text" x="' + (padL - 10) + '" y="' + (y(t) + 4) + '" text-anchor="end">' + t + '</text>';
    });

    ENROLMENT.forEach(function (d, i) {
      svg += '<text class="axis-text" x="' + x(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + d.month + '</text>';
    });

    var path = ENROLMENT.map(function (d, i) {
      return (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(d.value).toFixed(1);
    }).join(' ');
    svg += '<path class="series-line" d="' + path + '"/>';

    ENROLMENT.forEach(function (d, i) {
      svg += '<circle class="series-dot" cx="' + x(i) + '" cy="' + y(d.value) + '" r="4"/>';
    });

    // Direct label on the final point only — never a number on every point.
    var last = ENROLMENT[ENROLMENT.length - 1];
    svg += '<text class="axis-text" x="' + (x(ENROLMENT.length - 1) + 9) + '" y="' +
      (y(last.value) + 4) + '" style="font-weight:500;fill:var(--accent)">' + last.value + '</text>';

    // Hover targets sit above the marks and are wider than them.
    ENROLMENT.forEach(function (d, i) {
      var colW = plotW / (ENROLMENT.length - 1);
      svg += '<rect class="hit-col" data-i="' + i + '" x="' + (x(i) - colW / 2) + '" y="' + padT +
        '" width="' + colW + '" height="' + plotH + '"/>';
    });

    svg += '</svg><div class="tooltip" id="chart-tip" role="status"></div>';
    host.innerHTML = svg;

    var tip = document.getElementById('chart-tip');
    var svgNode = host.querySelector('svg');

    host.querySelectorAll('.hit-col').forEach(function (r) {
      r.addEventListener('mouseenter', function () {
        var i = +r.getAttribute('data-i');
        var d = ENROLMENT[i];
        var prev = i > 0 ? ENROLMENT[i - 1].value : null;
        var delta = prev == null ? '' : '<br>' + (d.value - prev >= 0 ? '+' : '') + (d.value - prev) + ' vs ' + ENROLMENT[i - 1].month;
        tip.innerHTML = '<b>' + d.value + ' students</b><br>' + d.month + ' 2025' + delta;

        var rect = svgNode.getBoundingClientRect();
        tip.style.left = (x(i) / W) * rect.width + 'px';
        tip.style.top = (y(d.value) / H) * rect.height + 'px';
        tip.classList.add('is-on');
      });
      r.addEventListener('mouseleave', function () { tip.classList.remove('is-on'); });
    });
  }

  /* ── Dashboard home ───────────────────────────────────── */
  function renderHome() {
    var feed = document.getElementById('activity-feed');
    feed.innerHTML = ACTIVITY.map(function (a) {
      return '<li><span class="feed-icon">' + icon(a.icon) + '</span>' +
        '<span><span class="feed-text">' + a.text + '</span>' +
        '<span class="feed-meta">' + a.meta + '</span></span></li>';
    }).join('');

    document.getElementById('quick-links').innerHTML = MODULES.map(function (m) {
      return '<a class="quick" href="#/' + m.view + '">' + icon(m.icon) +
        '<span class="quick-name">' + m.name + '</span>' +
        '<span class="quick-sub">' + m.sub + '</span></a>';
    }).join('');

    var d = new Date();
    document.getElementById('today-line').textContent =
      d.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) +
      ' · Second Term, week 6.';

    renderChart();
  }

  /* ── Students ─────────────────────────────────────────── */
  function renderStudents() {
    var q = document.getElementById('st-search').value.trim().toLowerCase();
    var cls = document.getElementById('st-class').value;
    var status = document.getElementById('st-status').value;

    var rows = STUDENTS.filter(function (s) {
      if (cls && s.cls !== cls) return false;
      if (status && s.status !== status) return false;
      if (q && s.name.toLowerCase().indexOf(q) < 0 && s.guardian.toLowerCase().indexOf(q) < 0) return false;
      return true;
    });

    var body = document.getElementById('st-body');
    body.innerHTML = rows.length ? rows.map(function (s) {
      return '<tr>' +
        '<td class="name">' + s.name + '</td>' +
        '<td class="mono">' + s.adm + '</td>' +
        '<td>' + s.cls + '</td>' +
        '<td>' + s.gender + '</td>' +
        '<td>' + s.guardian + '</td>' +
        '<td>' + badge(s.status, s.status === 'Active' ? 'good' : 'mute') + '</td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="6" class="empty">No students match these filters.</td></tr>';

    document.getElementById('st-count').textContent =
      rows.length + ' of ' + STUDENTS.length + ' students';
  }

  /* ── Fees ─────────────────────────────────────────────── */
  function renderFees() {
    var cls = document.getElementById('fee-class').value;
    var status = document.getElementById('fee-status').value;

    var ledger = STUDENTS.map(function (s) {
      var due = feeFor(s.cls);
      return { name: s.name, cls: s.cls, due: due, paid: s.paid, bal: due - s.paid, status: feeStatus(due, s.paid) };
    });

    var rows = ledger.filter(function (r) {
      if (cls && r.cls !== cls) return false;
      if (status && r.status !== status) return false;
      return true;
    });

    var expected = rows.reduce(function (a, r) { return a + r.due; }, 0);
    var collected = rows.reduce(function (a, r) { return a + r.paid; }, 0);
    var outstanding = expected - collected;
    var rate = pct(collected, expected);

    document.getElementById('fee-expected').textContent = moneyShort(expected);
    document.getElementById('fee-expected-sub').textContent = rows.length + ' students billed';
    document.getElementById('fee-collected').textContent = moneyShort(collected);
    document.getElementById('fee-collected-sub').textContent = rate + '% of expected';
    document.getElementById('fee-meter').style.width = rate + '%';
    document.getElementById('fee-outstanding').textContent = moneyShort(outstanding);
    document.getElementById('fee-outstanding-sub').textContent =
      rows.filter(function (r) { return r.status !== 'Paid'; }).length + ' accounts with a balance';

    var kind = { Paid: 'good', Partial: 'warn', Unpaid: 'bad' };
    var body = document.getElementById('fee-body');
    body.innerHTML = rows.length ? rows.map(function (r) {
      return '<tr>' +
        '<td class="name">' + r.name + '</td>' +
        '<td>' + r.cls + '</td>' +
        '<td class="num">' + money(r.due) + '</td>' +
        '<td class="num">' + money(r.paid) + '</td>' +
        '<td class="num">' + (r.bal > 0 ? money(r.bal) : '—') + '</td>' +
        '<td>' + badge(r.status, kind[r.status]) + '</td>' +
        '</tr>';
    }).join('') : '<tr><td colspan="6" class="empty">No fee records match these filters.</td></tr>';

    document.getElementById('fee-count').textContent = rows.length + ' of ' + ledger.length + ' records';
  }

  /* ── Attendance ───────────────────────────────────────── */
  function renderAttendance() {
    var cls = document.getElementById('att-class').value;
    var date = document.getElementById('att-date').value;
    var roster = rosterFor(cls);

    // Lands a typical class near the 91% school-wide figure the
    // dashboard reports, with one or two absentees on most days.
    var rows = roster.map(function (name, i) {
      var v = hash(cls + name + date) % 100;
      var status = v < 86 ? 'Present' : (v < 92 ? 'Late' : 'Absent');
      var note = status === 'Absent' ? 'Guardian notified by SMS'
        : status === 'Late' ? 'Arrived 08:' + String(16 + (v % 20)).padStart(2, '0')
          : '—';
      return { name: name, adm: admFor(cls, name, i), status: status, note: note };
    });

    var present = rows.filter(function (r) { return r.status === 'Present'; }).length;
    var late = rows.filter(function (r) { return r.status === 'Late'; }).length;
    var absent = rows.filter(function (r) { return r.status === 'Absent'; }).length;
    var rate = pct(present + late, rows.length);

    document.getElementById('att-present').textContent = present;
    document.getElementById('att-absent').textContent = absent;
    document.getElementById('att-late').textContent = late;
    document.getElementById('att-meter').style.width = rate + '%';
    document.getElementById('att-rate').textContent = rate + '% of ' + rows.length + ' on roll';

    var pretty = date ? new Date(date + 'T00:00:00').toLocaleDateString('en-NG',
      { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '';
    document.getElementById('att-title').textContent = cls + ' register';
    document.getElementById('att-marked').textContent = pretty;

    var kind = { Present: 'good', Late: 'warn', Absent: 'bad' };
    document.getElementById('att-body').innerHTML = rows.map(function (r) {
      return '<tr>' +
        '<td class="name">' + r.name + '</td>' +
        '<td class="mono">' + r.adm + '</td>' +
        '<td>' + badge(r.status, kind[r.status]) + '</td>' +
        '<td>' + r.note + '</td>' +
        '</tr>';
    }).join('');
  }

  /* ── Results ──────────────────────────────────────────── */
  function renderResults() {
    var cls = document.getElementById('res-class').value;

    var sheet;
    if (cls === 'JSS2A') {
      sheet = RESULTS_JSS2A.slice();
    } else {
      // Other classes get a plausible sheet derived from their roster.
      sheet = rosterFor(cls).map(function (name) {
        var h = hash(cls + name + 'scores');
        return {
          name: name,
          math: 40 + (h % 56),
          eng: 40 + ((h >> 5) % 56),
          sci: 40 + ((h >> 11) % 56)
        };
      });
    }

    sheet.forEach(function (r) {
      r.avg = Math.round(((r.math + r.eng + r.sci) / 3) * 10) / 10;
      r.grade = gradeFor(r.avg);
    });
    sheet.sort(function (a, b) { return b.avg - a.avg; });
    sheet.forEach(function (r, i) { r.pos = i + 1; });

    var classAvg = Math.round((sheet.reduce(function (a, r) { return a + r.avg; }, 0) / sheet.length) * 10) / 10;
    var passing = sheet.filter(function (r) { return r.avg >= 50; }).length;
    var passRate = pct(passing, sheet.length);

    document.getElementById('res-avg').textContent = classAvg.toFixed(1);
    document.getElementById('res-avg-sub').textContent = 'Across ' + sheet.length + ' students, 3 subjects';
    document.getElementById('res-top').textContent = sheet[0].avg.toFixed(1);
    document.getElementById('res-top-sub').textContent = sheet[0].name;
    document.getElementById('res-pass').textContent = passRate + '%';
    document.getElementById('res-meter').style.width = passRate + '%';

    var gradeKind = function (g) {
      if (g === 'A' || g === 'B') return 'good';
      if (g === 'C' || g === 'D') return 'warn';
      return 'bad';
    };

    document.getElementById('res-body').innerHTML = sheet.map(function (r) {
      return '<tr>' +
        '<td class="name">' + r.name + '</td>' +
        '<td class="num">' + r.math + '</td>' +
        '<td class="num">' + r.eng + '</td>' +
        '<td class="num">' + r.sci + '</td>' +
        '<td class="num">' + r.avg.toFixed(1) + '</td>' +
        '<td>' + badge(r.grade, gradeKind(r.grade)) + '</td>' +
        '<td class="num">' + r.pos + '</td>' +
        '</tr>';
    }).join('');

    document.getElementById('res-count').textContent = sheet.length + ' students';
  }

  /* ── Timetable ────────────────────────────────────────── */

  /* Seeded Fisher-Yates, so a class always gets the same week. */
  function shuffleSeeded(arr, seed) {
    var a = arr.slice(), s = seed >>> 0;
    for (var i = a.length - 1; i > 0; i--) {
      s = (s * 1664525 + 1013904223) >>> 0;
      var j = s % (i + 1);
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* Allocate a realistic week rather than picking each cell at
     random: Maths and English sit once a day (5 periods a week),
     the remaining six slots rotate through the other subjects so
     each appears two to three times and never twice in one day. */
  function weekFor(cls) {
    var pool = levelOf(cls) === 'JSS' ? JUNIOR_SUBJECTS : SENIOR_SUBJECTS;
    var core = pool.slice(0, 2);          // Mathematics, English Language
    var rest = pool.slice(2);
    var week = [];
    for (var d = 0; d < 5; d++) {
      var day = core.slice();
      for (var k = 0; k < 6; k++) day.push(rest[(d * 6 + k) % rest.length]);
      week.push(shuffleSeeded(day, hash(cls + 'day' + d)));
    }
    return week;
  }

  function renderTimetable() {
    var cls = document.getElementById('tt-class').value;
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    var periods = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
    var week = weekFor(cls);

    var html = '<thead><tr><th class="period-col" scope="col">Period</th>';
    days.forEach(function (d) { html += '<th scope="col">' + d + '</th>'; });
    html += '</tr></thead><tbody>';

    periods.forEach(function (p, pi) {
      // Long break sits between the 4th and 5th periods.
      if (pi === 4) {
        html += '<tr><td class="period">Break</td><td class="is-break" colspan="5">Long break &middot; 11:20 &ndash; 11:50</td></tr>';
      }
      html += '<tr><td class="period">' + p + '</td>';
      days.forEach(function (d, di) {
        var pick = week[di][pi];
        html += '<td><span class="tt-subject">' + pick[0] + '</span>' +
          '<span class="tt-teacher">' + pick[1] + '</span></td>';
      });
      html += '</tr>';
    });

    html += '</tbody>';
    document.getElementById('tt-table').innerHTML = html;
    document.getElementById('tt-title').textContent = cls + ' weekly timetable';
  }

  /* ── Select population ────────────────────────────────── */
  function fillSelect(id, opts) {
    var sel = document.getElementById(id);
    sel.innerHTML = opts.map(function (o) {
      return '<option value="' + o.v + '"' + (o.sel ? ' selected' : '') + '>' + o.t + '</option>';
    }).join('');
  }

  var allClasses = CLASSES.map(function (c) { return { v: c, t: c }; });

  /* ── Router ───────────────────────────────────────────── */
  var VIEWS = ['dashboard', 'students', 'fees', 'attendance', 'results', 'timetable', 'settings'];
  var TITLES = {
    dashboard: 'Dashboard', students: 'Students', fees: 'Fee Management',
    attendance: 'Attendance', results: 'Results', timetable: 'Timetable', settings: 'Settings'
  };

  function route() {
    var name = (location.hash || '').replace('#/', '');
    if (VIEWS.indexOf(name) < 0) name = 'dashboard';

    VIEWS.forEach(function (v) {
      document.getElementById('view-' + v).hidden = (v !== name);
    });

    document.querySelectorAll('.sb-nav a').forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('data-view') === name);
      if (a.getAttribute('data-view') === name) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    document.title = TITLES[name] + ' — Lincoln Academy | Alimo EduCloud';
    window.scrollTo(0, 0);
  }

  /* ── Init ─────────────────────────────────────────────── */
  function init() {
    fillSelect('st-class', [{ v: '', t: 'All classes' }].concat(allClasses));
    fillSelect('fee-class', [{ v: '', t: 'All classes' }].concat(allClasses));
    fillSelect('att-class', CLASSES.map(function (c) { return { v: c, t: c, sel: c === 'JSS2A' }; }));
    fillSelect('res-class', CLASSES.map(function (c) { return { v: c, t: c, sel: c === 'JSS2A' }; }));
    fillSelect('tt-class', CLASSES.map(function (c) { return { v: c, t: c, sel: c === 'JSS2A' }; }));

    var today = new Date();
    var iso = today.getFullYear() + '-' +
      String(today.getMonth() + 1).padStart(2, '0') + '-' +
      String(today.getDate()).padStart(2, '0');
    document.getElementById('att-date').value = iso;

    ['st-search', 'st-class', 'st-status'].forEach(function (id) {
      document.getElementById(id).addEventListener('input', renderStudents);
    });
    ['fee-class', 'fee-status', 'fee-term'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', renderFees);
    });
    ['att-date', 'att-class'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', renderAttendance);
    });
    ['res-class', 'res-term'].forEach(function (id) {
      document.getElementById(id).addEventListener('change', renderResults);
    });
    document.getElementById('tt-class').addEventListener('change', renderTimetable);

    renderHome();
    renderStudents();
    renderFees();
    renderAttendance();
    renderResults();
    renderTimetable();

    window.addEventListener('hashchange', route);
    route();

    window.addEventListener('resize', function () {
      var tip = document.getElementById('chart-tip');
      if (tip) tip.classList.remove('is-on');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
