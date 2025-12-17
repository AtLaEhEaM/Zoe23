// Hide/show navbar on scroll
(function() {
	const navbar = document.querySelector('.navbar');
	if (!navbar) return;

	let lastScroll = window.scrollY || 0;

	window.addEventListener('scroll', () => {
		const current = window.scrollY || 0;
		// if scrolling down and past threshold -> hide
		if (current > lastScroll && current > 100) {
			navbar.classList.add('nav-hidden');
		} else {
			navbar.classList.remove('nav-hidden');
		}
		lastScroll = current;
	}, { passive: true });

  // mobile menu toggle
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('#nav-menu');
  if (toggle && menu) {
		toggle.addEventListener('click', () => {
			const isOpen = navbar.classList.toggle('open');
			toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		});
  }

	// close menu on link click (mobile)
	document.addEventListener('click', (e) => {
		const isNavLink = e.target.closest('.nav-link');
		if (!isNavLink) return;
		// if link is inside nav-menu and navbar is open, close it
		if (navbar.classList.contains('open')) {
			navbar.classList.remove('open');
			if (toggle) toggle.setAttribute('aria-expanded', 'false');
		}
	});

	// keyboard: Esc closes menu
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && navbar.classList.contains('open')) {
			navbar.classList.remove('open');
			if (toggle) toggle.setAttribute('aria-expanded', 'false');
			toggle && toggle.focus();
		}
	});

})();

// Observe section-2 blocks and replay fade-up animation when they enter/leave viewport
document.addEventListener('DOMContentLoaded', () => {
	const targets = document.querySelectorAll('.section-2 .about-me, .section-2 .dos, .section-2 .donts, .section-2 .terms');
	if (!targets || targets.length === 0) return;

	const obs = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('in-view');
			} else {
				// remove class to allow replay when scrolled back into view
				entry.target.classList.remove('in-view');
			}
		});
	}, { threshold: 0.2 });

	targets.forEach(t => obs.observe(t));
});
