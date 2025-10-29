// pequeno script para parallax e flicker — mantém vida no teaser
(() => {
  const grid = document.querySelector('.grid');
  const scanner = document.querySelector('.scanner');
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navMenu = document.querySelector('[data-nav-menu]');
  const MOBILE_BREAKPOINT = 720;

  // leve parallax com o mouse para a grade
  if(grid){
    const onMove = (ev) => {
      const x = (ev.clientX / window.innerWidth - 0.5) * 10; // -5..5
      const y = (ev.clientY / window.innerHeight - 0.5) * 6; // -3..3
      grid.style.transform = `perspective(800px) rotateX(${66 + y}deg) translateY(${18 + y * 2}vh) rotateZ(${x/40}deg) scaleY(0.6)`;
    };

    // reduz movimento se usuário preferir
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if(!mq.matches){
      window.addEventListener('mousemove', onMove);
    }
  }

  // menu responsivo acessível
  if(navToggle && navMenu){
    const setMenuState = (open) => {
      navMenu.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
      if(window.innerWidth <= MOBILE_BREAKPOINT){
        navMenu.setAttribute('aria-hidden', String(!open));
      } else {
        navMenu.removeAttribute('aria-hidden');
      }
    };

    setMenuState(false);

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    navMenu.addEventListener('click', (event) => {
      if(window.innerWidth > MOBILE_BREAKPOINT) return;
      if(event.target instanceof Element && event.target.closest('a')){
        setMenuState(false);
      }
    });

    window.addEventListener('resize', () => {
      if(window.innerWidth > MOBILE_BREAKPOINT){
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Abrir menu');
        navMenu.removeAttribute('aria-hidden');
      } else {
        const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
        navMenu.setAttribute('aria-hidden', String(!isOpen));
      }
    });
  }

  // flicker ocasional no brilho (apenas para dar vida)
  function flicker(){
    if(!scanner) return;
    if(Math.random() < 0.14){
      const prev = scanner.style.filter || '';
      scanner.style.filter = 'drop-shadow(0 0 28px rgba(255,255,255,0.5))';
      setTimeout(()=> scanner.style.filter = prev, 140 + Math.random()*360);
    }
  }
  setInterval(flicker, 2400);
})();
