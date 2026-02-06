/* ====================================
   PORTFOLIO — Interactions & Animations
   ==================================== */

(function () {
    'use strict';

    // ===== DOM ELEMENTS =====
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('navMenu');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelectorAll('.nav-link');
    const terminalText = document.getElementById('terminalText');

    // ===== NAVBAR SCROLL =====
    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== MOBILE MENU =====
    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                var offset = 80;
                var pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });

    // ===== ACTIVE NAV HIGHLIGHTING =====
    var sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // ===== SCROLL REVEAL =====
    var revealElements = document.querySelectorAll(
        '.section-heading, .section-line, .about-content, .timeline-item, ' +
        '.project-card, .skill-group, .education-card, .education-divider, ' +
        '.contact-intro, .contact-links, .contact-form, .about-stats'
    );

    revealElements.forEach(function (el) {
        el.classList.add('reveal');
    });

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
        revealObserver.observe(el);
    });

    // ===== TERMINAL TYPING EFFECT =====
    var commands = [
        'python build.py --deploy production',
        'git push origin main',
        'pytest --cov=src -v',
        'pip install -r requirements.txt',
        'docker compose up -d'
    ];

    var cmdIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typeSpeed = 60;
    var deleteSpeed = 30;
    var pauseEnd = 2000;
    var pauseStart = 500;

    function typeCommand() {
        var current = commands[cmdIndex];

        if (!isDeleting) {
            terminalText.textContent = current.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeCommand, pauseEnd);
                return;
            }
            setTimeout(typeCommand, typeSpeed);
        } else {
            terminalText.textContent = current.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                cmdIndex = (cmdIndex + 1) % commands.length;
                setTimeout(typeCommand, pauseStart);
                return;
            }
            setTimeout(typeCommand, deleteSpeed);
        }
    }

    if (terminalText) {
        setTimeout(typeCommand, 1200);
    }

    // ===== EXTERNAL LINKS =====
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

})();
