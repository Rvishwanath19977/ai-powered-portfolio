// ============================================
// VISHWANATH RAJASEKARAN PORTFOLIO
// Premium UI/UX JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initThemeToggle();
    initCustomCursor();
    initChatbotCursorInteractions();
    initCursorGlow();
    initNavbar();
    initMobileMenu();
    initCounterAnimation();
    initScrollAnimations();
    initParallaxEffects();
    initMagneticButtons();
    initCardHoverEffects();
    initSmoothScroll();
    initTypingEffect();
    initTechMarquee();
    initFormEnhancements();
    
    // Console Easter Egg
    console.log('%c✨ Welcome to my portfolio!', 'font-size: 24px; font-weight: bold; background: linear-gradient(90deg, #00ff88, #00d4ff, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
    console.log('%cBuilt with passion for human-centered AI.', 'font-size: 14px; color: #00ff88;');
    console.log('%c📧 vishrajasek@gmail.com', 'font-size: 12px; color: #a1a1aa;');
});

// ============================================
// THEME TOGGLE
// ============================================
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', initialTheme);
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        document.body.classList.add('theme-transitioning');
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 500);
        
        // Haptic feedback on mobile
        if (navigator.vibrate) {
            navigator.vibrate(10);
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        }
    });
}

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .expertise-card, .featured-card, .value-card, .info-card, .tech-item, .skill-category');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    function animateCursor() {
        // Smooth follow for outer cursor
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Faster follow for dot
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

// ============================================
// CURSOR GLOW
// ============================================
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    if (!cursorGlow) return;
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ============================================
// NAVBAR
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show on scroll direction (optional - comment out if not needed)
                // if (currentScroll > lastScroll && currentScroll > 300) {
                //     navbar.style.transform = 'translateY(-100%)';
                // } else {
                //     navbar.style.transform = 'translateY(0)';
                // }
                
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (!navToggle || !mobileMenu) return;
    
    navToggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : '';
        
        // Animate links stagger
        if (isActive) {
            mobileLinks.forEach((link, i) => {
                link.style.transitionDelay = `${0.1 + i * 0.05}s`;
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            });
        } else {
            mobileLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
    const duration = 3500;
    const startTime = performance.now();
    const startValue = 0;
    const suffix = element.dataset.suffix || '';
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(update);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    // In initScrollAnimations(), update the selector to include beyond-card:
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .featured-card, .skill-category, .project-detail, .info-card, .value-card, .timeline-item, .beyond-card'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
    
    // Add animate-in class styles dynamically
    const style = document.createElement('style');
    style.textContent = '.animate-in { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    const orbs = document.querySelectorAll('.hero-orb');
    const profileFrame = document.querySelector('.profile-frame');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                orbs.forEach((orb, index) => {
                    const speed = 0.05 + (index * 0.02);
                    const yOffset = scrolled * speed;
                    orb.style.transform = `translate(${yOffset * 0.3}px, ${yOffset}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Mouse parallax for profile
    if (profileFrame) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX / innerWidth - 0.5) * 20;
            const yPos = (clientY / innerHeight - 0.5) * 20;
            
            profileFrame.style.transform = `rotateY(${xPos}deg) rotateX(${-yPos}deg)`;
        });
    }
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic, .nav-cta');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// CARD HOVER EFFECTS
// ============================================
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.expertise-card, .featured-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.hero-scroll');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const nextSection = document.querySelector('.expertise-section, .about-hero + section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const heroGreeting = document.querySelector('.hero-greeting');
    if (!heroGreeting || heroGreeting.dataset.typed) return;
    
    heroGreeting.dataset.typed = 'true';
    const text = heroGreeting.textContent;
    heroGreeting.textContent = '';
    heroGreeting.style.opacity = '1';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            heroGreeting.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 500);
}

// ============================================
// TECH MARQUEE
// ============================================
function initTechMarquee() {
    const techTrack = document.querySelector('.tech-track');
    if (!techTrack) return;
    
    // Pause on hover handled in CSS, but add touch support
    techTrack.addEventListener('touchstart', () => {
        techTrack.style.animationPlayState = 'paused';
    });
    
    techTrack.addEventListener('touchend', () => {
        techTrack.style.animationPlayState = 'running';
    });
}

// ============================================
// FORM ENHANCEMENTS
// ============================================
function initFormEnhancements() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    
    // Floating label effect
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            if (this.value.trim() !== '') {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Check initial state
        if (input.value.trim() !== '') {
            input.classList.add('has-value');
        }
    });
    
    // Form validation styling
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('error');
                isValid = false;
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

// ============================================
// PAGE TRANSITION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Add loading state
window.addEventListener('beforeunload', () => {
    document.body.classList.remove('loaded');
});

function initChatbotCursorInteractions() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) return;

    // Chatbot elements that SHOULD enlarge cursor
    const chatbotSelectors = [
        '.chatbot-toggle',
        '.chatbot-send',
        '.chatbot-close',        // ✅ ADDED
        '.welcome-suggestion',
        '.suggestion-chip'
    ];

    const bindHover = () => {
        const elements = document.querySelectorAll(chatbotSelectors.join(','));
        elements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });
    };

    // Initial bind
    bindHover();

    // Re-bind for dynamically injected chatbot elements
    const observer = new MutationObserver(bindHover);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

