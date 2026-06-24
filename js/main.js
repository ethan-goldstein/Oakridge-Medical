/* ============================================================
   Oakridge Medical Group — Interactions
   ============================================================ */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Data ---------- */
  const providers = [
    { name:'Dr. Sarah Mitchell, MD', spec:'Family Medicine', initials:'SM',
      bio:'Comprehensive healthcare for patients of all ages with a focus on preventive medicine and long-term wellness.',
      exp:'15+ years', edu:'Georgetown University SOM',
      areas:'Preventive care, chronic disease, wellness',
      img:'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=500&q=80' },
    { name:'Dr. Michael Chen, MD', spec:'Pediatrics', initials:'MC',
      bio:'Dedicated pediatric specialist focused on child development, preventive healthcare, and family-centered treatment.',
      exp:'12+ years', edu:'Johns Hopkins University',
      areas:'Child development, immunizations, well-child',
      img:'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=500&q=80' },
    { name:'Dr. Emily Rodriguez, DO', spec:'Women\'s Health & Family Medicine', initials:'ER',
      bio:'Specializes in women\'s healthcare, preventive services, and comprehensive family medicine.',
      exp:'10+ years', edu:'VCOM — Virginia',
      areas:'Women\'s health, family planning, screenings',
      img:'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=500&q=80' },
    { name:'Dr. James Carter, MD', spec:'Behavioral Health & Primary Care', initials:'JC',
      bio:'Provides integrated mental health support and primary care services with a patient-centered approach.',
      exp:'14+ years', edu:'University of Virginia SOM',
      areas:'Behavioral health, anxiety, depression',
      img:'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80' },
  ];

  const insurers = [
    {n:'Blue Cross Blue Shield', l:'BCBS'}, {n:'Aetna', l:'Ae'}, {n:'Cigna', l:'Ci'},
    {n:'UnitedHealthcare', l:'UH'}, {n:'Medicare', l:'Mc'}, {n:'Medicaid', l:'Md'},
  ];

  const testimonials = [
    { q:'The providers are incredibly professional and genuinely care about their patients.', a:'Jennifer L.', r:'Patient since 2019', i:'JL' },
    { q:'Scheduling appointments online is simple and convenient.', a:'Marcus T.', r:'Patient since 2021', i:'MT' },
    { q:'Our family has trusted Oakridge Medical Group for years.', a:'The Patel Family', r:'Patients since 2016', i:'PF' },
    { q:'The telehealth experience was seamless and saved me a trip to the office.', a:'Dana R.', r:'Telehealth patient', i:'DR' },
  ];

  const faqs = [
    { q:'Do you accept new patients?', a:'Yes. We welcome new patients of all ages.' },
    { q:'Do you offer telehealth appointments?', a:'Yes. Virtual appointments are available for many visit types.' },
    { q:'What insurance plans do you accept?', a:'We accept most major insurance providers. Please contact our office to verify coverage and eligibility.' },
    { q:'How do I schedule an appointment?', a:'Appointments can be booked online, by phone, or through the patient portal.' },
    { q:'Do you offer same-day appointments?', a:'Yes, based on provider availability. Use online booking or call our office to check today\'s openings.' },
    { q:'What should I bring to my first visit?', a:'Photo ID, insurance card, a list of current medications, and any relevant medical records.' },
  ];

  const feed = [
    { tag:'Wellness', t:'5 simple habits for a healthier heart', p:'Small daily changes add up. Here\'s where to start this season.',
      img:'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&q=80', likes:128 },
    { tag:'Pediatrics', t:'Your child\'s immunization checklist', p:'A quick guide to staying on schedule from infancy through adolescence.',
      img:'https://images.unsplash.com/photo-1632053002928-1919d1e0bb9c?auto=format&fit=crop&w=600&q=80', likes:96 },
    { tag:'Telehealth', t:'When a virtual visit is the right call', p:'Learn which symptoms and follow-ups are perfect for telehealth.',
      img:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80', likes:174 },
  ];

  const apptTypes = ['Annual Wellness Visit','Physical Exam','Sick Visit','Pediatric Appointment','Women\'s Health Consultation','Mental Health Consultation','Telehealth Visit'];

  /* ---------- Image fallback (never show broken images) ---------- */
  const fallback = (label, c1='#1E4E8C', c2='#4BB3A7') =>
    `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${c1}'/><stop offset='1' stop-color='${c2}'/></linearGradient></defs><rect width='400' height='400' fill='url(%23g)'/><text x='50%' y='52%' font-family='Plus Jakarta Sans,Arial' font-size='34' font-weight='700' fill='white' text-anchor='middle'>${label}</text></svg>`
    )}`;
  const attachFallback = (img, label) => {
    img.addEventListener('error', () => { img.src = fallback(label); }, { once:true });
  };

  /* ---------- Render: Providers ---------- */
  $('#providersGrid').innerHTML = providers.map(p => `
    <article class="provider-card reveal">
      <div class="pc-photo">
        <span class="pc-badge">${p.spec.split(' ')[0]}</span>
        <img alt="Portrait of ${p.name}" loading="lazy" src="${p.img}" data-fb="${p.initials}">
      </div>
      <div class="pc-body">
        <h3>${p.name}</h3>
        <p class="pc-spec">${p.spec}</p>
        <p class="pc-bio">${p.bio}</p>
        <div class="pc-meta">
          <div><b>Experience</b> ${p.exp}</div>
          <div><b>Education</b> ${p.edu}</div>
          <div><b>Expertise</b> ${p.areas}</div>
        </div>
        <button class="pc-book" data-book data-provider="${p.name}">Book Appointment</button>
      </div>
    </article>`).join('');
  $$('#providersGrid img').forEach(img => attachFallback(img, img.dataset.fb));

  /* ---------- Render: Insurance ---------- */
  $('#insuranceGrid').innerHTML = insurers.map(i => `
    <div class="ins-card reveal"><span class="ins-logo">${i.l}</span>${i.n}</div>`).join('');

  /* ---------- Render: Testimonials ---------- */
  $('#carouselTrack').innerHTML = testimonials.map((t, i) => `
    <div class="t-slide ${i===0?'active':''}" data-i="${i}">
      <div class="t-stars">★★★★★</div>
      <p class="t-quote">“${t.q}”</p>
      <div class="t-author"><span class="t-ava">${t.i}</span><div><strong>${t.a}</strong><small>${t.r}</small></div></div>
    </div>`).join('');
  $('#carDots').innerHTML = testimonials.map((_, i) => `<span class="car-dot ${i===0?'active':''}" data-i="${i}" role="button" tabindex="0" aria-label="Go to testimonial ${i+1}"></span>`).join('');

  /* ---------- Render: FAQ ---------- */
  $('#faqList').innerHTML = faqs.map(f => `
    <div class="faq-item reveal">
      <button class="faq-q" aria-expanded="false">${f.q}<span class="faq-icon">+</span></button>
      <div class="faq-a"><p>${f.a}</p></div>
    </div>`).join('');

  /* ---------- Render: Social feed ---------- */
  $('#socialFeed').innerHTML = feed.map(f => `
    <article class="feed-card reveal">
      <div class="feed-img"><span class="feed-tag">${f.tag}</span><img alt="${f.t}" loading="lazy" src="${f.img}" data-fb="${f.tag}"></div>
      <div class="feed-body"><h4>${f.t}</h4><p>${f.p}</p>
        <div class="feed-meta"><span>${f.likes} Likes</span><span>${Math.round(f.likes/6)} Comments</span><span>@OakridgeMedical</span></div>
      </div>
    </article>`).join('');
  $$('#socialFeed img').forEach(img => attachFallback(img, img.dataset.fb));

  /* ---------- Reveal on scroll (text + images) ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:.1, rootMargin:'0px 0px -50px' });
  $$('.reveal, .reveal-img').forEach(el => io.observe(el));

  /* ---------- Parallax ---------- */
  const parallaxEls = $$('[data-parallax]');
  let ticking = false;
  const runParallax = () => {
    const vh = window.innerHeight;
    parallaxEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.transform = `translateY(${(-offset).toFixed(1)}px)`;
    });
    ticking = false;
  };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (parallaxEls.length && !reduceMotion) {
    window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(runParallax); ticking = true; } }, { passive:true });
    runParallax();
  }

  /* ---------- Scroll progress bar ---------- */
  const progress = $('#scrollProgress');
  const updateProgress = () => {
    const h = document.documentElement;
    const pct = (h.scrollTop || document.body.scrollTop) / ((h.scrollHeight - h.clientHeight) || 1) * 100;
    progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive:true });
  updateProgress();

  /* ---------- Animated counters ---------- */
  const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    if (isNaN(target)) return;
    const dec = +el.dataset.decimals || 0;
    const suffix = el.dataset.suffix || '';
    const dur = 1600; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target * eased;
      el.textContent = (dec ? val.toFixed(dec) : Math.floor(val).toLocaleString()) + suffix;
      if (p < 1) requestAnimationFrame(tick); else el.textContent = (dec ? target.toFixed(dec) : target.toLocaleString()) + suffix;
    };
    requestAnimationFrame(tick);
  };
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); countIO.unobserve(e.target); } });
  }, { threshold:.5 });
  $$('.stat-num[data-count]').forEach(el => countIO.observe(el));

  /* ---------- Nav: scroll state, mobile menu, active link ---------- */
  const nav = $('#nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    $('#fab')?.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  const fab = $('.fab'); fab.id = 'fab';
  window.addEventListener('scroll', () => fab.classList.toggle('show', window.scrollY > 600), { passive:true });

  const hamburger = $('#hamburger'), navLinks = $('#navLinks');
  const toggleMenu = (open) => {
    navLinks.classList.toggle('open', open);
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  };
  hamburger.addEventListener('click', () => toggleMenu(!navLinks.classList.contains('open')));
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

  // Active link via scroll spy
  const sections = $$('main section[id]');
  const linkFor = (id) => $(`#navLinks a[href="#${id}"]`);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('#navLinks a').forEach(a => a.classList.remove('active'));
        linkFor(e.target.id)?.classList.add('active');
      }
    });
  }, { threshold:.5 });
  sections.forEach(s => spy.observe(s));

  /* ---------- Emergency bar ---------- */
  $('#emergencyClose').addEventListener('click', () => $('#emergencyBar').classList.add('hide'));

  /* ---------- Dark mode ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', savedTheme);
  $('#themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- Accessibility panel ---------- */
  const a11yPanel = $('#a11yPanel');
  $('#a11yToggle').addEventListener('click', () => a11yPanel.classList.toggle('open'));
  const a11yMap = { a11yText:'a11y-text', a11yContrast:'a11y-contrast', a11yMotion:'a11y-motion', a11yLinks:'a11y-links' };
  Object.entries(a11yMap).forEach(([id, cls]) => {
    const box = $('#' + id);
    if (localStorage.getItem(id) === '1') { box.checked = true; root.classList.add(cls); }
    box.addEventListener('change', () => {
      root.classList.toggle(cls, box.checked);
      localStorage.setItem(id, box.checked ? '1' : '0');
    });
  });
  $('#a11yReset').addEventListener('click', () => {
    Object.entries(a11yMap).forEach(([id, cls]) => { $('#' + id).checked = false; root.classList.remove(cls); localStorage.removeItem(id); });
  });
  document.addEventListener('click', (e) => {
    if (a11yPanel.classList.contains('open') && !a11yPanel.contains(e.target) && e.target.id !== 'a11yToggle' && !$('#a11yToggle').contains(e.target))
      a11yPanel.classList.remove('open');
  });

  /* ---------- FAQ accordion ---------- */
  $$('.faq-item').forEach(item => {
    const q = $('.faq-q', item), a = $('.faq-a', item);
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      $$('.faq-item.open').forEach(o => { o.classList.remove('open'); $('.faq-a', o).style.maxHeight = null; $('.faq-q', o).setAttribute('aria-expanded','false'); });
      if (!open) { item.classList.add('open'); a.style.maxHeight = a.scrollHeight + 'px'; q.setAttribute('aria-expanded','true'); }
    });
  });

  /* ---------- Testimonial carousel ---------- */
  let curT = 0, tTimer;
  const slides = $$('.t-slide'), dots = $$('.car-dot');
  const goT = (i) => {
    curT = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('active', n === curT));
    dots.forEach((d, n) => d.classList.toggle('active', n === curT));
  };
  const autoT = () => { clearInterval(tTimer); tTimer = setInterval(() => goT(curT + 1), 5500); };
  $('#carNext').addEventListener('click', () => { goT(curT + 1); autoT(); });
  $('#carPrev').addEventListener('click', () => { goT(curT - 1); autoT(); });
  dots.forEach(d => { d.addEventListener('click', () => { goT(+d.dataset.i); autoT(); });
    d.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { goT(+d.dataset.i); autoT(); } }); });
  autoT();

  /* ---------- Toast ---------- */
  const toast = $('#toast'); let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg; toast.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  /* ---------- Modal engine ---------- */
  const modal = $('#modal'), modalContent = $('#modalContent');
  let lastFocus = null;
  const openModal = (html) => {
    modalContent.innerHTML = html;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    lastFocus = document.activeElement;
    const first = modal.querySelector('input,select,textarea,button:not(.modal-x)');
    setTimeout(() => first?.focus(), 60);
  };
  const closeModal = () => {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
    lastFocus?.focus();
  };
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  /* ---------- Modal templates ---------- */
  const successView = (title, msg) => `
    <div class="modal-success">
      <div class="ms-ico">✓</div>
      <h3>${title}</h3>
      <p class="modal-sub">${msg}</p>
      <button class="btn btn-primary" data-close>Done</button>
    </div>`;

  const bookingForm = (provider) => `
    <h3 id="modalTitle">Book an Appointment</h3>
    <p class="modal-sub">Tell us a bit about your visit and we'll confirm within one business day.</p>
    <form id="modalBookForm">
      <div class="field-row">
        <div class="field"><label>Full Name</label><input name="name" required></div>
        <div class="field"><label>Phone</label><input name="phone" type="tel" required></div>
      </div>
      <div class="field"><label>Email</label><input name="email" type="email" required></div>
      <div class="field-row">
        <div class="field"><label>Appointment Type</label>
          <select name="type">${apptTypes.map(t => `<option>${t}</option>`).join('')}</select></div>
        <div class="field"><label>Provider</label>
          <select name="provider">${['No preference', ...providers.map(p=>p.name)].map(p => `<option ${p===provider?'selected':''}>${p}</option>`).join('')}</select></div>
      </div>
      <div class="field-row">
        <div class="field"><label>Preferred Date</label><input name="date" type="date"></div>
        <div class="field"><label>Preferred Time</label>
          <select name="time"><option>Morning</option><option>Afternoon</option><option>No preference</option></select></div>
      </div>
      <button class="btn btn-primary btn-lg" type="submit">Confirm Request</button>
    </form>`;

  const portalView = `
    <h3 id="modalTitle">Patient Portal</h3>
    <p class="modal-sub">Securely access your records, results, and messages.</p>
    <div class="tab-row"><button class="active" data-tab="login">Log In</button><button data-tab="register">New Patient</button></div>
    <form id="modalPortalForm" data-mode="login">
      <div class="field"><label>Email or Username</label><input name="user" required></div>
      <div class="field" data-only="login"><label>Password</label><input name="pass" type="password" required></div>
      <div class="field" data-only="register" style="display:none"><label>Full Name</label><input name="name"></div>
      <div class="field" data-only="register" style="display:none"><label>Date of Birth</label><input name="dob" type="date"></div>
      <button class="btn btn-primary btn-lg" type="submit" data-label-login="Log In" data-label-register="Create Account">Log In</button>
    </form>`;

  const refillView = `
    <h3 id="modalTitle">Prescription Refill</h3>
    <p class="modal-sub">Request a refill and we'll send it to your pharmacy.</p>
    <form id="modalRefillForm">
      <div class="field"><label>Full Name</label><input name="name" required></div>
      <div class="field"><label>Date of Birth</label><input name="dob" type="date" required></div>
      <div class="field"><label>Medication Name</label><input name="med" required></div>
      <div class="field"><label>Preferred Pharmacy</label><input name="pharmacy" placeholder="Name & location"></div>
      <button class="btn btn-primary btn-lg" type="submit">Submit Refill Request</button>
    </form>`;

  const insuranceView = `
    <h3 id="modalTitle">Verify Your Insurance</h3>
    <p class="modal-sub">Enter your details and our team will confirm your coverage.</p>
    <form id="modalInsForm">
      <div class="field"><label>Full Name</label><input name="name" required></div>
      <div class="field-row">
        <div class="field"><label>Insurance Provider</label>
          <select name="provider">${insurers.map(i=>`<option>${i.n}</option>`).join('')}<option>Other</option></select></div>
        <div class="field"><label>Member ID</label><input name="member" required></div>
      </div>
      <div class="field"><label>Date of Birth</label><input name="dob" type="date" required></div>
      <button class="btn btn-primary btn-lg" type="submit">Check Coverage</button>
    </form>`;

  /* ---------- Modal openers ---------- */
  document.addEventListener('click', (e) => {
    const bookBtn = e.target.closest('[data-book]');
    const refillBtn = e.target.closest('[data-refill]');
    const closeBtn = e.target.closest('[data-close]');
    if (bookBtn) { e.preventDefault(); openModal(bookingForm(bookBtn.dataset.provider || '')); bindModalForms(); }
    else if (refillBtn) { e.preventDefault(); openModal(refillView); bindModalForms(); }
    else if (closeBtn) { closeModal(); }
  });
  const openPortal = (e) => { e?.preventDefault(); openModal(portalView); bindModalForms(); };
  ['#portalBtn','#portalBtn2','#portalBtn3'].forEach(s => $(s)?.addEventListener('click', openPortal));
  const openIns = (e) => { e?.preventDefault(); openModal(insuranceView); bindModalForms(); };
  ['#verifyBtn','#verifyBtn2'].forEach(s => $(s)?.addEventListener('click', openIns));

  /* ---------- Modal form handlers ---------- */
  function bindModalForms() {
    $('#modalBookForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      openModal(successView('Appointment Requested!', 'Thank you. Our team will call to confirm your visit within one business day. A confirmation has been sent to your email.'));
      bindClose();
    });
    $('#modalRefillForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      openModal(successView('Refill Submitted!', 'Your prescription refill request has been received. We\'ll notify you once it\'s ready at your pharmacy.'));
      bindClose();
    });
    $('#modalInsForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      openModal(successView('We\'re On It!', 'Our billing team is verifying your coverage and will reach out shortly with the details.'));
      bindClose();
    });
    const pf = $('#modalPortalForm');
    if (pf) {
      $$('.tab-row button').forEach(btn => btn.addEventListener('click', () => {
        $$('.tab-row button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.tab; pf.dataset.mode = mode;
        $$('[data-only]', pf).forEach(f => f.style.display = (f.dataset.only === mode) ? '' : 'none');
        $$('[data-only] input', pf).forEach(inp => inp.required = inp.closest('[data-only]').dataset.only === mode);
        const sub = $('button[type=submit]', pf); sub.textContent = sub.dataset['label' + mode.charAt(0).toUpperCase() + mode.slice(1)];
      }));
      pf.addEventListener('submit', (e) => {
        e.preventDefault();
        const reg = pf.dataset.mode === 'register';
        openModal(successView(reg ? 'Welcome to Oakridge!' : 'Logged In', reg ? 'Your patient account has been created. You can now manage appointments, messages, and records.' : 'This is a demo portal. In production you\'d now see your dashboard, results, and messages.'));
        bindClose();
      });
    }
  }
  function bindClose() { $('[data-close]')?.addEventListener('click', closeModal); }

  /* ---------- Contact form ---------- */
  $('#contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    let ok = true;
    ['name','email','phone'].forEach(n => {
      const el = form.elements[n];
      const bad = !el.value.trim() || (n === 'email' && !/^[^@]+@[^@]+\.[^@]+$/.test(el.value));
      el.classList.toggle('invalid', bad); if (bad) ok = false;
    });
    if (!ok) { $('#contactStatus').textContent = 'Please complete the required fields.'; $('#contactStatus').style.color = '#d93a36'; return; }
    $('#contactStatus').style.color = ''; $('#contactStatus').textContent = '✓ Thank you! We\'ll contact you within one business day to confirm.';
    showToast('Appointment request sent — we\'ll be in touch soon!');
    form.reset();
  });

  /* ---------- Newsletter ---------- */
  $('#newsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#newsMsg').textContent = '✓ You\'re subscribed! Watch your inbox for healthcare tips.';
    e.target.reset();
  });

  /* ---------- Live chat ---------- */
  const chat = $('#chat'), chatBody = $('#chatBody');
  $('#chatToggle').addEventListener('click', () => chat.classList.toggle('open'));
  $('#chatClose').addEventListener('click', () => chat.classList.remove('open'));
  const botReply = (text) => {
    const msg = document.createElement('div');
    msg.className = 'chat-msg bot'; msg.textContent = text;
    chatBody.appendChild(msg); chatBody.scrollTop = chatBody.scrollHeight;
  };
  const userMsg = (text) => {
    const msg = document.createElement('div');
    msg.className = 'chat-msg user'; msg.textContent = text;
    chatBody.appendChild(msg); chatBody.scrollTop = chatBody.scrollHeight;
  };
  const answer = (text) => {
    const t = text.toLowerCase();
    if (/hour|open|close/.test(t)) return 'We\'re open Mon–Fri 8 AM–6 PM, Sat 9 AM–2 PM, and closed Sundays.';
    if (/insur|cover/.test(t)) return 'We accept most major plans including BCBS, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. Want me to start a verification?';
    if (/book|appoint|schedul/.test(t)) return 'Great! Tap "Book appointment" above, or call (703) 555-0184 — same-day visits are often available.';
    if (/refill|prescription|medic/.test(t)) return 'You can request a refill anytime through the patient portal or the "Refill Rx" button.';
    if (/location|address|where|park/.test(t)) return 'We\'re at 825 Oakridge Boulevard, Alexandria, VA 22314 — free parking and a 3-min walk from the Metro.';
    if (/emergency|911/.test(t)) return 'If this is an emergency, please call 911 or go to the nearest ER right away.';
    return 'Thanks for your message! Our care team will follow up shortly. For urgent needs, call (703) 555-0184.';
  };
  $('#chatForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input'); const val = input.value.trim();
    if (!val) return;
    userMsg(val); input.value = '';
    setTimeout(() => botReply(answer(val)), 600);
  });
  $$('.chat-q[data-q]').forEach(b => b.addEventListener('click', () => { userMsg(b.textContent); setTimeout(() => botReply(answer(b.dataset.q)), 500); }));

  /* ---------- Year ---------- */
  $('#year').textContent = new Date().getFullYear();

  /* ---------- Booking mockup micro-interactions ---------- */
  $$('.bm-chip').forEach(c => c.addEventListener('click', () => { $$('.bm-chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); }));
  $$('.bm-time').forEach(t => t.addEventListener('click', () => { $$('.bm-time').forEach(x => x.classList.remove('active')); t.classList.add('active'); }));
  $('.bm-confirm')?.addEventListener('click', () => { openModal(bookingForm('')); bindModalForms(); });
})();
