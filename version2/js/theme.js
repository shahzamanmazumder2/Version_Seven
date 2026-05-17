    lucide.createIcons();

    // Theme Toggle
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    // Logo swap helper — works across all pages that use nav/hero/footer logos
    function swapLogos(isDark) {
      const src = isDark ? 'seven_logo_dark.png' : 'seven_logo_light.png';
      document.querySelectorAll('#heroLogo').forEach(function(el) {
        if (el) el.src = src;
      });
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      htmlElement.classList.add('light-mode');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      swapLogos(false);
    }

    themeToggle.addEventListener('click', () => {
      htmlElement.classList.toggle('light-mode');
      const isDark = !htmlElement.classList.contains('light-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      sunIcon.style.display = isDark ? 'block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'block';
      swapLogos(isDark);
      lucide.createIcons();
    });

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Simple counter animation
    function animateCounter(id, target, duration = 2000) {
      let start = 0;
      const increment = target / (duration / 16);
      const el = document.getElementById(id);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(start);
        }
      }, 16);
    }

    // Trigger counters when scrolled into view (simple version)
    window.addEventListener('scroll', () => {
      if (window.scrollY > 1200) {
        animateCounter('stat1', 47);
        animateCounter('stat2', 18);
        animateCounter('stat3', 9);
        animateCounter('stat4', 124);
        window.removeEventListener('scroll', arguments.callee);
      }
    });

    // SDK Integration
    const defaultConfig = {
      company_name: 'Seven Tech Ventures',
      hero_title: 'Simplifying Complexity',
      hero_description: 'Empowering businesses through cutting-edge technology solutions that drive global digital transformation.',
      footer_text: '© 2026 Seven Tech Ventures. All rights reserved.'
    };

    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        document.querySelectorAll('.company-name').forEach(el => {
          el.textContent = config.company_name || defaultConfig.company_name;
        });
        document.querySelectorAll('.hero-title').forEach(el => {
          el.textContent = config.hero_title || defaultConfig.hero_title;
        });
        document.querySelectorAll('.hero-description').forEach(el => {
          el.textContent = config.hero_description || defaultConfig.hero_description;
        });
        document.querySelectorAll('.footer-text').forEach(el => {
          el.textContent = config.footer_text || defaultConfig.footer_text;
        });
      },
      mapToCapabilities: (config) => ({
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
      }),
      mapToEditPanelValues: (config) => new Map([
        ['company_name', config.company_name || defaultConfig.company_name],
        ['hero_title', config.hero_title || defaultConfig.hero_title],
        ['hero_description', config.hero_description || defaultConfig.hero_description],
        ['footer_text', config.footer_text || defaultConfig.footer_text]
      ])
    });