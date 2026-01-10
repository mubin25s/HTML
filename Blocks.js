const characters = document.querySelectorAll('.character');

document.addEventListener('mousemove', e => {
  characters.forEach((char, index) => {
    const rect = char.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    const angleX = Math.max(Math.min(dx / 40, 6), -6);
    const angleY = Math.max(Math.min(dy / 40, 6), -6);

    const eyes = char.querySelectorAll('.eyes span');
    eyes.forEach(eye => {
      eye.style.transform = `translate(${angleX}px, ${angleY}px)`;
    });

    char.style.transform = `translate(${angleX * 0.6}px, ${angleY * 0.6}px)`;
  });
});
