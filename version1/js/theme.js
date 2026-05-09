// js/main.js  ← Combined All Scripts

const html = document.documentElement;
const themeButtons = document.querySelectorAll('.theme-btn');

/* ── Theme Management ── */
function applyTheme(name) {
    if (!name) name = 'earth';
    
    html.setAttribute('data-active-theme', name);
    localStorage.setItem('activeTheme', name);

    themeButtons.forEach(btn => {
        if (btn.dataset.theme === name) {
            btn.style.outline = '2px solid var(--accent-color)';
            btn.style.transform = 'scale(1.15)';
        } else {
            btn.style.outline = 'none';
            btn.style.transform = 'scale(1)';
        }
    });
}

/* ── Initialize Everything ── */
document.addEventListener('DOMContentLoaded', () => {

    /* Theme */
    const savedTheme = localStorage.getItem('activeTheme') || 'earth';
    applyTheme(savedTheme);

    themeButtons.forEach(btn => {
        btn.addEventListener('click', () => applyTheme(btn.dataset.theme));
    });

    /* Navbar scroll effect */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.style.boxShadow = window.scrollY > 40 
                ? '0 4px 30px rgba(0,0,0,.15)' 
                : 'none';
        });
    }

    /* Mobile menu */
    const toggle  = document.getElementById('menu-toggle');
    const menu    = document.getElementById('mobile-menu');
    const iconO   = document.getElementById('menu-icon-open');
    const iconC   = document.getElementById('menu-icon-close');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            if (iconO) iconO.classList.toggle('hidden', open);
            if (iconC) iconC.classList.toggle('hidden', !open);
        });

        menu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menu.classList.remove('open');
                if (iconO) iconO.classList.remove('hidden');
                if (iconC) iconC.classList.add('hidden');
            });
        });
    }

    /* Scroll Reveal */
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealEls.length > 0) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(el => io.observe(el));
    }

    /* Counter Animation */
    const counters = document.querySelectorAll('.counter-num[data-target]');
    if (counters.length > 0) {
        const counterIO = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;

                const el = e.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const step = Math.ceil(target / 60);

                const timer = setInterval(() => {
                    current = Math.min(current + step, target);
                    el.textContent = current;
                    if (current >= target) clearInterval(timer);
                }, 18);

                counterIO.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(c => counterIO.observe(c));
    }

    /* FAQ Accordion */
    window.toggleFaq = function(btn) {
        const body = btn.nextElementSibling;
        const icon = btn.querySelector('.faq-icon');
        const isOpen = !body.classList.contains('hidden');

        // Close all
        document.querySelectorAll('.faq-body').forEach(b => b.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

        if (!isOpen) {
            body.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
        }
    };

    /* Smooth Scroll */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

});