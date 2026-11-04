/* One media timeline: playback failure must never become an animated poster. */
(() => {
  const video = document.querySelector('[data-booking-video]');
  const button = document.querySelector('[data-booking-play]');
  const status = document.querySelector('[data-booking-status]');
  if (!video || !button || !status) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  const sync = () => {
    button.textContent = video.paused ? 'Play highlights' : 'Pause highlights';
    button.setAttribute('aria-label', video.paused ? 'Play ABC performance highlights' : 'Pause ABC performance highlights');
  };
  const play = () => {
    status.textContent = '';
    return video.play().catch(() => {
      status.textContent = 'Press Play to watch the highlights, or use the full-performance links below.';
      sync();
    });
  };
  button.addEventListener('click', () => { if (video.paused) play(); else video.pause(); });
  video.addEventListener('playing', () => { status.textContent = ''; sync(); });
  video.addEventListener('pause', sync);
  video.addEventListener('error', () => { status.textContent = 'The highlights could not load. You can watch the full performances below.'; sync(); });
  reduced.addEventListener('change', () => { if (reduced.matches) video.pause(); });
  sync();
  if (!reduced.matches) play();
})();
