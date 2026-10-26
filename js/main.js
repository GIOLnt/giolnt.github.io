// ═══ Portfolio GL — scorrimento e animazioni ═══
(function () {
  const SITE = window.SITE || {};

  // 1. Riempie i testi dal file config.js (nome, ruolo, premio…)
  const pick = (path) => path.split('.').reduce((o, k) => (o ? o[k] : undefined), SITE);
  document.querySelectorAll('[data-site]').forEach((el) => {
    const value = pick(el.dataset.site);
    if (value !== undefined) el.textContent = value;
  });
  document.title = `${SITE.nome} — ${SITE.ruolo}`;

  // 2. Apertura: il reel parte da solo a tutto schermo, appena esiste il file media/showreel.mp4
  const hero = document.querySelector('.hero');
  const reel = document.querySelector('.hero__video');
  const soundBtn = document.querySelector('.hero__sound');
  reel.addEventListener('loadeddata', () => {
    hero.classList.add('has-video');
    soundBtn.hidden = false;
    reel.play().catch(() => {});
  });
  reel.src = 'media/showreel.mp4';
  const setSound = (on) => {
    reel.muted = !on;
    if (on) reel.volume = 1;
    soundBtn.classList.toggle('is-on', on);
    soundBtn.textContent = on ? 'Audio on' : 'Audio';
  };
  soundBtn.addEventListener('click', () => setSound(reel.muted));

  // Appena si comincia a scorrere, l'audio del reel sfuma e si spegne (si riaccende solo col tasto)
  let fading = false;
  const fadeOutSound = () => {
    if (reel.muted || fading) return;
    fading = true;
    const start = reel.volume, t0 = performance.now(), dur = 600;
    const step = () => {
      const k = Math.min(1, Math.max(0, (performance.now() - t0) / dur));
      reel.volume = Math.max(0, Math.min(1, start * (1 - k)));
      if (k < 1) requestAnimationFrame(step);
      else { setSound(false); fading = false; }
    };
    requestAnimationFrame(step);
  };
  window.addEventListener('scroll', () => { if (window.scrollY > 40) fadeOutSound(); }, { passive: true });

  // Spot, documentari e short film: al clic su un riquadro con data-full si apre il video intero con l'audio;
  // si chiude col tasto, con Esc o cliccando fuori
  const player = document.querySelector('.player');
  const playerVideo = player.querySelector('.player__video');
  const closePlayer = () => {
    playerVideo.pause();
    playerVideo.removeAttribute('src');
    playerVideo.load();
    player.hidden = true;
    document.documentElement.style.overflow = '';
    window.lenis?.start();
  };
  // la scheda sotto il video: titolo, categoria e durata, una riga, i crediti come nei titoli di coda, gli strumenti
  const playerCard = player.querySelector('.player__card');
  const fillCard = (work) => {
    playerCard.hidden = !work;
    if (!work) return;
    playerCard.querySelector('.player__title').textContent = work.title;
    playerCard.querySelector('.player__meta').textContent = [work.category, work.duration].filter(Boolean).join(' · ');
    playerCard.querySelector('.player__text').textContent = work.text || '';
    // riga del premio (in oro) e riga di licenza: solo nei lavori che le hanno
    for (const [cls, value] of [['.player__award', work.award], ['.player__note', work.note]]) {
      const el = playerCard.querySelector(cls);
      el.textContent = value || '';
      el.hidden = !value;
    }
    const credits = playerCard.querySelector('.player__credits');
    credits.replaceChildren();
    (work.credits || []).forEach(([role, name]) => {
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = role;
      dd.textContent = name;
      credits.append(dt, dd);
    });
    playerCard.querySelector('.player__tools').textContent = (work.tools || []).join(' · ');
  };
  document.querySelectorAll('[data-full]').forEach((card) => {
    card.addEventListener('click', () => {
      fillCard(window.WORKS?.[card.dataset.full]);
      playerVideo.poster = card.querySelector('video.preview')?.poster || '';
      playerVideo.src = card.dataset.full;
      player.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      window.lenis?.stop();
      playerVideo.play().catch(() => {});
    });
  });
  player.querySelector('.player__close').addEventListener('click', closePlayer);
  player.addEventListener('click', (e) => { if (e.target === player) closePlayer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !player.hidden) closePlayer(); });

  // Anteprime dei lavori: si caricano e partono solo quando entrano nello schermo, si fermano quando escono
  const previews = document.querySelectorAll('video.preview');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ target: v, isIntersecting }) => {
      if (isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { rootMargin: '0px 200px 0px 200px', threshold: 0.15 });
  previews.forEach((v) => io.observe(v));

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!(window.gsap && window.ScrollTrigger) || reduce) return;
  gsap.registerPlugin(ScrollTrigger);

  // 3. Scorrimento morbido (Lenis) collegato alle animazioni
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  window.lenis = lenis; // serve al lettore degli spot per fermare lo scorrimento mentre è aperto
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.6 });
    });
  });

  // Barra di avanzamento in alto
  gsap.to('.progress__bar', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });

  // 4. All'apertura compaiono solo le scritte piccole sopra il reel
  gsap.from(['.topbar', '.hero__caption', '.hero__sound', '.hero__scroll'], { opacity: 0, y: 16, duration: 1, stagger: 0.12, delay: 0.4, ease: 'power3.out' });

  // Scorrendo, il reel si allontana leggermente
  gsap.to('.hero__media', { scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // 5. Titoli delle sezioni: salgono da sotto una maschera
  document.querySelectorAll('.section__title').forEach((title) => {
    const inner = document.createElement('span');
    inner.className = 'ln';
    inner.textContent = title.textContent;
    title.textContent = '';
    title.appendChild(inner);
    gsap.from(inner, { yPercent: 105, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: title, start: 'top 85%' } });
  });
  gsap.utils.toArray('.section__num, .section__intro').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 20, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
  });

  // 6. Elementi che compaiono scorrendo
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 60, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  // 7. Short film, documentari e spot: la sezione si ferma e scorre in orizzontale (solo su schermi larghi;
  //    sul telefono le schede stanno una sotto l'altra, lo decide il CSS)
  gsap.matchMedia().add('(min-width: 761px)', () => {
    document.querySelectorAll('.section--h').forEach((section) => {
      const row = section.querySelector('.hscroll');
      const distance = () => Math.max(0, row.scrollWidth - window.innerWidth);
      gsap.to(row, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + distance(), pin: true, scrub: 1, invalidateOnRefresh: true }
      });
    });
  });
})();
