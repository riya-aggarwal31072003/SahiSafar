function renderNav(activePage){
  const pages=[
    {href:'../index.html',label:'Home',id:'home'},
    {href:'../pages/route-finder.html',label:'🗺 Route Finder',id:'route'},
    {href:'../pages/lines.html',label:'🚇 Lines',id:'lines'},
    {href:'../pages/crowd.html',label:'📊 Crowd',id:'crowd'},
    {href:'../pages/faq.html',label:'❓ FAQ',id:'faq'},
  ];
  const links=pages.map(p=>`<a href="${p.href}" class="${activePage===p.id?'active':''}">${p.label}</a>`).join('');
  return `
  <nav class="nav">
    <a class="nav-brand" href="../index.html">
      <div class="nav-logo">SS</div>
      <div class="nav-title">SahiSafar <span>सही सफ़र • Right Journey</span></div>
    </a>
    <div class="nav-links" id="navLinks">${links}</div>
    <button class="nav-hamburger" onclick="toggleNav()" aria-label="Menu">☰</button>
  </nav>`;
}

function renderFooter(){
  return `
  <footer>
    <div class="footer-inner">
      <div class="footer-logo">Sahi<span>Safar</span></div>
      <div class="footer-tagline">सही सफ़र — Right Journey, Every Time 🚇</div>
      <div class="footer-links">
        <a href="../index.html">Home</a>
        <a href="../pages/route-finder.html">Route Finder</a>
        <a href="../pages/lines.html">Metro Lines</a>
        <a href="../pages/crowd.html">Crowd Info</a>
        <a href="../pages/faq.html">FAQ</a>
      </div>
      <hr class="footer-divider"/>
      <div class="footer-credit">
        <span>Built with ❤️ for every Delhi commuter</span>
        <span>•</span>
        <a href="https://www.linkedin.com/in/riya-aggarwal31072003" target="_blank" class="linkedin-link">
          <span>in</span> Connect on LinkedIn
        </a>
      </div>
      <div class="footer-disclaimer">
        SahiSafar is an independent project. Not officially affiliated with DMRC or NCRTC.
      </div>
    </div>
  </footer>`;
}

function toggleNav(){
  document.getElementById('navLinks').classList.toggle('open');
}

function fixNavForRoot(){
  document.querySelectorAll('.nav-links a').forEach(a=>{
    a.href=a.href.replace('../','');
  });
  document.querySelectorAll('footer a').forEach(a=>{
    if(a.href.includes('../'))a.href=a.href.replace('../','');
  });
}