/* ====================================
   ADVANCED PORTFOLIO - INTERACTIVE FEATURES
   Particles | 3D Effects | Advanced Animations
   ==================================== */

const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// ===== PARTICLE SYSTEM =====
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '#00d4ff' : '#0ef4ff';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity *= 0.99;
        this.size *= 0.98;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let particles = [];

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles(event) {
    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(event.clientX, event.clientY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.opacity > 0.1);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

setupCanvas();
animateParticles();

document.addEventListener('mousemove', createParticles);
window.addEventListener('resize', setupCanvas);

// ===== NAVBAR FUNCTIONALITY =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== BUTTON HOVER EFFECTS =====
const buttons = document.querySelectorAll('.btn, .btn-link, .contact-card, .skill-tag');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== SCROLL REVEAL ANIMATIONS =====
function revealOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.getAttribute('data-aos');
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', revealOnScroll);

// ===== ACTIVE NAV HIGHLIGHTING =====
function highlightActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--accent-blue)';
            }
        });
    });
}

highlightActiveNav();

// ===== PROJECT CARDS STAGGER ANIMATION =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});

// ===== SKILL CARDS INTERACTIVE =====
const skillCards = document.querySelectorAll('.skill-category');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(0, 212, 255, 0.08)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.03)';
    });
});

// ===== ABOUT CARDS ANIMATION =====
const aboutCards = document.querySelectorAll('.about-card');
aboutCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'all 0.6s ease-out';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 150);
});

// ===== TIMELINE ANIMATION =====
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// ===== EXTERNAL LINKS =====
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ===== 3D PHOTO HOVER EFFECT =====
const photoFrame = document.querySelector('.photo-frame');
if (photoFrame) {
    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            const rect = photoFrame.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const rotateX = (y - 0.5) * 20;
            const rotateY = (x - 0.5) * -20;
            
            photoFrame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        }
    });

    photoFrame.addEventListener('mouseleave', () => {
        photoFrame.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
}

// ===== SECTION VISIBILITY ANIMATION =====
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 0.6s ease-out';
    sectionObserver.observe(section);
});

console.log('✨ Advanced Portfolio Loaded! Ready to deploy on Netlify.');
