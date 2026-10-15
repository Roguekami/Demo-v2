import{s as i,n,d as r,e as c,a as u}from"./index-CEYCdedo.js";import{o as v,t as b,f as p}from"./modal-Bs8ai2sk.js";function y(){return`
    <div class="login-layout">
      <div class="login-card">
        <div class="login-logo">Alimo <span>EduCloud</span></div>
        <p class="login-subtitle">Sign in to the Lincoln Academy portal</p>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">Email address</label>
            <input class="form-input" type="email" id="login-email" placeholder="Enter your email" autocomplete="email" />
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input class="form-input" type="password" id="login-password" placeholder="Enter your password" autocomplete="current-password" />
          </div>
          <div class="form-error hidden" id="login-error">No account found for that email. Try one of the demo accounts below.</div>
          <a href="#" class="login-forgot" id="forgot-link">Forgot password?</a>
          <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px;">
            Sign in
          </button>
        </form>

        <div class="demo-accounts">
          <div class="demo-accounts-label">Quick demo access</div>
          <button class="demo-btn" data-role="admin">
            <div class="demo-btn-avatar" style="background:#2563eb;">AJ</div>
            <div class="demo-btn-info">
              <div class="demo-btn-name">Adewale Johnson</div>
              <div class="demo-btn-role">Administrator</div>
            </div>
          </button>
          <button class="demo-btn" data-role="teacher">
            <div class="demo-btn-avatar" style="background:#059669;">NO</div>
            <div class="demo-btn-info">
              <div class="demo-btn-name">Mrs. Ngozi Okafor</div>
              <div class="demo-btn-role">Teacher — Mathematics</div>
            </div>
          </button>
          <button class="demo-btn" data-role="student">
            <div class="demo-btn-avatar" style="background:#d97706;">CE</div>
            <div class="demo-btn-info">
              <div class="demo-btn-name">Chidera Eze</div>
              <div class="demo-btn-role">Student — SS2</div>
            </div>
          </button>
        </div>

        <a class="login-back" href="${u}">&larr; Back to Alimo EduCloud</a>
      </div>
    </div>
  `}function h(){var a,s;document.querySelectorAll(".demo-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.dataset.role;i(r[o]),n(`#/${o}/dashboard`)})}),(a=document.getElementById("login-form"))==null||a.addEventListener("submit",e=>{var l,d;e.preventDefault();const o=(d=(l=document.getElementById("login-email"))==null?void 0:l.value)==null?void 0:d.trim().toLowerCase(),t=Object.values(r).find(m=>m.email===o);t?(i(t),n(`#/${t.role}/dashboard`)):(document.getElementById("login-error").classList.remove("hidden"),document.getElementById("login-email").classList.add("is-invalid"))}),(s=document.getElementById("forgot-link"))==null||s.addEventListener("click",e=>{e.preventDefault(),v({title:"Reset your password",submitLabel:"Send reset link",content:`
        <p class="text-sm text-secondary mb-4">Enter the email on your account and we'll send you a link to reset your password.</p>
        <div class="form-group">
          <label class="form-label" for="reset-email">Email address</label>
          <input class="form-input" type="email" id="reset-email" value="${c(document.getElementById("login-email").value)}" required />
        </div>
      `,onSubmit:()=>b(`Reset link sent to ${c(p("reset-email"))}`)})})}export{h as init,y as render};
