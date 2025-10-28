// pequeno script para parallax e flicker — mantém vida no teaser
(() => {
  const grid = document.querySelector('.grid');
  const scanner = document.querySelector('.scanner');

  // leve parallax com o mouse para a grade
  function onMove(ev){
    const x = (ev.clientX / window.innerWidth - 0.5) * 10; // -5..5
    const y = (ev.clientY / window.innerHeight - 0.5) * 6; // -3..3
    grid.style.transform = `perspective(800px) rotateX(${66 + y}deg) translateY(${18 + y * 2}vh) rotateZ(${x/40}deg) scaleY(0.6)`;
  }

  // reduz movimento se usuário preferir
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!mq.matches){
    window.addEventListener('mousemove', onMove);
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
