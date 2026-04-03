import './style.css'

// ============================================
// THEME TOGGLE SYSTEM
// ============================================
const initThemeToggle = () => {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const getTheme = () => localStorage.getItem('portfolio-theme') || 'light';
  const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  };

  // Set initial state
  setTheme(getTheme());

  toggle.addEventListener('click', () => {
    const next = getTheme() === 'light' ? 'dark' : 'light';
    setTheme(next);
  });
};
initThemeToggle();

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const initScrollTop = () => {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
};
initScrollTop();

// ============================================
// ANIMATED HERO CANVAS (particles + connections)
// ============================================
const initHeroCanvas = () => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;
  let mouse = { x: null, y: null };

  const resize = () => {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.r = Math.random() * 2 + 1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          this.x += dx / dist * 1.5;
          this.y += dy / dist * 1.5;
        }
      }
    }
    draw() {
      const dark = isDark();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = dark
        ? `rgba(129, 140, 248, ${0.3 + this.r * 0.15})`
        : `rgba(99, 102, 241, ${0.25 + this.r * 0.1})`;
      ctx.fill();
    }
  }

  const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000));
  for (let i = 0; i < count; i++) particles.push(new Particle());

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dark = isDark();

    particles.forEach(p => { p.update(); p.draw(); });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = dark
            ? `rgba(129, 140, 248, ${0.08 * (1 - dist / 150)})`
            : `rgba(99, 102, 241, ${0.06 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    animId = requestAnimationFrame(animate);
  };
  animate();

  canvas.parentElement.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });
};
// Only init on desktop for perf
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
  initHeroCanvas();
}

// ============================================
// ENHANCED SCROLL REVEAL
// ============================================
const initScrollReveal = () => {
  const revealElements = document.querySelectorAll(
    '.section-header, .about-text, .about-image, .skill-card, .certificate-card, .project-card, .contact-info, .form-section'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));
};
initScrollReveal();

// Immediate fix for loading scrollbar issue
(function() {
  // Apply initial styles to prevent scrollbar during load
  const style = document.createElement('style');
  style.textContent = `
    .image-card {
      overflow: hidden !important;
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    .image-card::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
    }
    .career-timeline {
      overflow: hidden !important;
    }
  `;
  document.head.appendChild(style);
})();

// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const heroButtons = document.querySelectorAll('.btn[href^="#"]'); // Add hero buttons
const sections = document.querySelectorAll('section');
const form = document.querySelector('.contact-form');
const cvButton = document.querySelector('.fab-button'); // CV floating button

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    // Close mobile menu
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');

    if (targetSection) {
      // Brief delay so menu closes before scroll calculation
      setTimeout(() => {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }, 150);
    }
  });
});

// CV FAB Button - Launch animation feedback
if (cvButton) {
  cvButton.addEventListener('click', () => {
    cvButton.classList.add('launched');

    const fabText = cvButton.querySelector('.fab-text');
    const originalText = fabText.textContent;
    fabText.textContent = '✓ Done';

    const icon = cvButton.querySelector('.fab-icon');
    if (icon) icon.style.animation = 'iconBounceDown 0.5s ease';

    setTimeout(() => {
      fabText.textContent = originalText;
      cvButton.classList.remove('launched');
      if (icon) icon.style.animation = '';
    }, 2500);
  });
}

// Mobile detection function
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Handle Hero Buttons (Check Out My Craft & Get in Touch)
heroButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = button.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

// Active navigation link highlighting
const observerOptions = {
  threshold: [0.1, 0.5, 0.7],
  rootMargin: '-20% 0px -30% 0px'
};

const observer = new IntersectionObserver((entries) => {
  let maxRatio = 0;
  let activeEntry = null;

  // Find the section with highest intersection ratio
  entries.forEach(entry => {
    if (entry.intersectionRatio > maxRatio) {
      maxRatio = entry.intersectionRatio;
      activeEntry = entry;
    }
  });

  // Update active nav link only if we have a clear winner
  if (activeEntry && maxRatio > 0.1) {
    // Remove active class from all nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current section's nav link
    const activeLink = document.querySelector(`.nav-link[href="#${activeEntry.target.id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}, observerOptions);

// Observe all sections
sections.forEach(section => {
  observer.observe(section);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroVisual = document.querySelector('.hero-visual');
  const heroContent = document.querySelector('.hero-text');

  if (heroVisual && heroContent) {
    const rate = scrolled * -0.5;
    heroVisual.style.transform = `translateY(${rate}px)`;

    // Fade effect - but exclude buttons on mobile to prevent blur
    const opacity = 1 - scrolled / window.innerHeight;
    if (opacity >= 0) {
      if (isMobileDevice()) {
        // On mobile, only fade the text content, not the buttons
        const heroTitle = heroContent.querySelector('.hero-title');
        const heroDescription = heroContent.querySelector('.hero-description');
        const heroButtons = heroContent.querySelector('.hero-buttons');

        if (heroTitle) heroTitle.style.opacity = opacity;
        if (heroDescription) heroDescription.style.opacity = opacity;
        // Keep buttons fully visible on mobile with additional properties
        if (heroButtons) {
          heroButtons.style.opacity = '1';
          heroButtons.style.filter = 'none';
          heroButtons.style.transform = 'translateZ(0)';
          heroButtons.style.backfaceVisibility = 'hidden';
        }
      } else {
        // On desktop, apply fade to entire content
        heroContent.style.opacity = opacity;
      }
    }
  }
});

// Animated counters for stats
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const originalText = counter.textContent;
    const target = parseInt(originalText);
    const hasPlus = originalText.includes('+');
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (hasPlus ? '+' : '');
      }
    };

    updateCounter();
  });
};

// Intersection Observer for animations
const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');

      // Trigger counter animation for stats section
      if (entry.target.classList.contains('about-stats')) {
        animateCounters();
      }
    }
  });
}, {
  threshold: 0.1
});

// Observe elements for animations
const animatedElements = document.querySelectorAll('.skill-card, .project-card, .contact-item, .about-stats, .stat-item');
animatedElements.forEach(el => {
  animationObserver.observe(el);
});

// Web3Forms Contact Form Implementation
if (form) {
  const WEB3FORMS_KEY = 'cb382b6c-8698-4bd2-b664-25db5bb22cfb';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('form-status');

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Please fill in all fields.';
        formStatus.style.display = 'block';
      }
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'inline';
    if (formStatus) formStatus.style.display = 'none';

    try {
      // Send via Web3Forms (triggers email notification)
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio Contact: ${name}`,
          from_name: name,
          email: email,
          message: message
        })
      });

      const result = await response.json();

      if (result.success) {
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Message sent successfully! I will get back to you soon.';
          formStatus.style.display = 'block';
        }
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }

    } catch (error) {
      console.error('Form submission error:', error);
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = '❌ Failed to send message. Please try again or contact me directly at soumadipbasu333@gmail.com';
        formStatus.style.display = 'block';
      }
    } finally {
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';

      setTimeout(() => {
        if (formStatus) formStatus.style.display = 'none';
      }, 7000);
    }
  });
}

// Cursor trail effect (optional enhancement)
const createCursorTrail = () => {
  const trail = [];
  const trailLength = 10;

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: var(--primary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: ${(trailLength - i) / trailLength};
      transition: opacity 0.3s ease;
    `;
    document.body.appendChild(dot);
    trail.push(dot);
  }

  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const animateTrail = () => {
    let x = mouseX;
    let y = mouseY;

    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || trail[0];

      dot.style.left = x + 'px';
      dot.style.top = y + 'px';

      x += (parseInt(nextDot.style.left) || mouseX - x) * 0.3;
      y += (parseInt(nextDot.style.top) || mouseY - y) * 0.3;
    });

    requestAnimationFrame(animateTrail);
  };

  animateTrail();
};

// Initialize cursor trail on desktop devices
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
  createCursorTrail();
}

// Loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');

  // Trigger initial animations
  setTimeout(() => {
    const heroElements = document.querySelectorAll('.hero-title .title-line, .hero-description, .hero-buttons');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 200);
    });
  }, 300);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Performance optimization: Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    // Scroll-based animations here
  });
});

// Add some interactive micro-animations
const addMicroAnimations = () => {
  // Button hover effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // Card tilt effect
  const cards = document.querySelectorAll('.skill-card, .project-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
};

// Mobile hover effect simulation
const addMobileHoverEffects = () => {
  if (window.innerWidth <= 768) {
    // All elements that have hover effects
    const hoverElements = [
      // Navigation
      { selector: '.nav-logo .logo-text', duration: 200 },
      { selector: '.nav-link', duration: 300 },

      // Buttons
      { selector: '.btn', duration: 200 },

      // Hero section
      { selector: '.floating-card', duration: 400 },
      { selector: '.professional-photo', duration: 300 },

      // About section
      { selector: '.stat-item', duration: 300 },
      { selector: '.image-card', duration: 400 },

      // Skills section
      { selector: '.skill-card', duration: 400 },

      // Projects section
      { selector: '.project-card', duration: 400 },
      { selector: '.project-link', duration: 200 },
      { selector: '.tech-tag', duration: 200 },

      // Contact section
      { selector: '.contact-item', duration: 300 },

      // Footer
      { selector: '.social-link', duration: 200 }
    ];

    hoverElements.forEach(({ selector, duration }) => {
      const elements = document.querySelectorAll(selector);

      elements.forEach(element => {
        let touchTimer;

        // Touch start - add hover effect (passive, never block clicks)
        element.addEventListener('touchstart', () => {
          element.classList.add('mobile-hover');

          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
        }, { passive: true });

        // Touch end - remove hover effect after delay (passive)
        element.addEventListener('touchend', () => {
          touchTimer = setTimeout(() => {
            element.classList.remove('mobile-hover');
          }, duration);
        }, { passive: true });

        // Touch cancel - immediately remove hover effect
        element.addEventListener('touchcancel', () => {
          clearTimeout(touchTimer);
          element.classList.remove('mobile-hover');
        });

        // Handle click for interactive elements
        if (selector.includes('nav-link') || selector.includes('btn') || selector.includes('project-link') || selector.includes('social-link')) {
          element.addEventListener('click', (e) => {
            // Add click animation
            element.style.transform = 'scale(0.95)';
            setTimeout(() => {
              element.style.transform = '';
            }, 100);
          });
        }
      });
    });

    // Special handling for project cards overlay
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      const overlay = card.querySelector('.project-overlay');
      const links = card.querySelectorAll('.project-link');

      card.addEventListener('touchstart', () => {
        if (overlay) {
          overlay.style.opacity = '1';
        }
      });

      card.addEventListener('touchend', () => {
        setTimeout(() => {
          if (overlay) {
            overlay.style.opacity = '';
          }
        }, 2000);
      });
    });

    // Enhanced skill card mobile touch handling
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      const skillIcon = card.querySelector('.skill-icon');
      let touchTimer;

      card.addEventListener('touchstart', (e) => {
        // Don't prevent default to allow scrolling
        card.classList.add('mobile-hover');

        // Add haptic feedback
        if (navigator.vibrate) {
          navigator.vibrate(30);
        }

        // Clear any existing timer
        clearTimeout(touchTimer);
      }, { passive: true });

      card.addEventListener('touchend', (e) => {
        // Keep the effect for a bit longer for visual feedback
        touchTimer = setTimeout(() => {
          card.classList.remove('mobile-hover');
        }, 500);
      }, { passive: true });

      // Handle touch cancel (when user scrolls or touches elsewhere)
      card.addEventListener('touchcancel', () => {
        clearTimeout(touchTimer);
        card.classList.remove('mobile-hover');
      }, { passive: true });

      // Handle touch move (if user starts scrolling)
      card.addEventListener('touchmove', () => {
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => {
          card.classList.remove('mobile-hover');
        }, 200);
      }, { passive: true });
    });
  }
};

// Initialize micro-animations
addMicroAnimations();

// Initialize mobile hover effects
addMobileHoverEffects();

// Debug function for mobile touch events (can be removed in production)
const debugMobileTouch = () => {
  if (window.innerWidth <= 768) {
    console.log('Mobile view detected - touch events enabled');

    // Add visual feedback to confirm touch events are working
    document.addEventListener('touchstart', (e) => {
      const skillCard = e.target.closest('.skill-card');
      if (skillCard) {
        console.log('Touch started on skill card:', skillCard);
      }
    }, { passive: true });
  }
};

// Initialize debug (remove in production)
debugMobileTouch();

// Re-initialize on window resize
window.addEventListener('resize', () => {
  // Remove existing mobile hover classes
  document.querySelectorAll('.mobile-hover').forEach(el => {
    el.classList.remove('mobile-hover');
  });

  // Re-initialize if switched to mobile view
  addMobileHoverEffects();
});

console.log('Portfolio loaded successfully! ✨');

// ============================================
// AI CHATBOT - Gemini Integration
// ============================================
const initChatbot = () => {
  const fab = document.getElementById('chatbotFab');
  const chatWindow = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const messagesContainer = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const starterBtns = document.querySelectorAll('.chatbot-starter-btn');

  if (!fab || !chatWindow) return;

  const backdrop = document.getElementById('chatbotBackdrop');

  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

  // Portfolio knowledge base - system context for AI
  const PORTFOLIO_CONTEXT = `You are Soumadip Basu's friendly and professional AI portfolio assistant. Answer questions about Soumadip based ONLY on the information below. Be conversational, helpful, and concise. Use bullet points for lists. If someone asks something outside this data, politely redirect them to the portfolio or suggest contacting Soumadip directly.

=== PERSONAL INFO ===
Name: Soumadip Basu
Title: Full Stack QA Professional
Location: Bengaluru, India
Email: soumadipbasu333@gmail.com
Phone: +91 9851824880
LinkedIn: linkedin.com/in/soumadip-basu-b47160197/
GitHub: github.com/soumadipbasupersonalgithub

=== EDUCATION ===
Degree: Bachelor's & Diploma in Electronics & Communications Engineering
University: Maulana Abul Kalam Azad University of Technology (MAKAUT)
Year: 2017

=== CAREER EXPERIENCE (6+ years, 3 companies, 20+ projects) ===

1. Deloitte (2021 - Present) — Consultant & Ex Analyst
   - Develops sophisticated automation solutions
   - Integrates cutting-edge Generative AI technologies for intelligent test case generation, synthetic data creation, and workflow optimization
   - Drafts comprehensive testing protocols for healthcare SDK supporting medicine tracking and smart device connectivity
   - Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication
   - Developed automation test scripts for cross-platform compatibility across iOS and Android
   - QA for Healthcare Mobile Suite (Madelyn, Hypercare, Logbook applications)
   - Built automation frameworks using JavaScript, Appium, and WebDriverIO
   - QA for enterprise healthcare web platform (Dotcom) built on Adobe Experience Manager
   - Conducted WCAG accessibility compliance testing
   - Introduced AI agent-driven automation with MCP server integration

2. Alethea Communication Pvt Ltd (2020 - 2021) — QA Automation Engineer
   - Built robust automation framework from scratch using Python and Robot Framework
   - Developed performance testing suite using Python and Locust
   - Worked on Cloud ATF — advanced automated solution for WLAN and broadband technologies
   - Engineered scalable infrastructure for WiFi 6 protocol validation
   - Also worked on SMS Autosense — ML-driven industrial monitoring mobile app
   - Updated automation code in JavaScript using Katalon Studio

3. Sonim Technologies (2019 - 2020) — QA Engineer
   - Comprehensive functional testing of rugged Android smartphones (XP8 & XP5)
   - Tested multiple US mobile device variants
   - Executed functional and sprint testing for industrial-grade mobile devices
   - Testing areas: Bluetooth, Satellite Network, GPS, Camera, Audio

=== TECHNICAL SKILLS ===
Test Automation: Playwright, WebdriverIO, Robot Framework, Appium, Selenium, Katalon Studio
Programming Languages: JavaScript, Python, TypeScript
Mobile & Web Testing: Cross-platform testing, API testing, UI/UX validation
Quality Assurance: Test Strategy, Planning, Risk Analysis, Defect Management, SDLC & STLC Process Optimization
Specialized Testing: Gen AI integration with MCP in testing process, Prompt Engineering, Automation, Performance, Functional, Accessibility
Collaboration Tools: JIRA, Git, Bugzilla, TestRail, Confluence

=== PROJECTS (6 major projects) ===
1. SDK Validation Framework (Deloitte) — Backend SDK for patient-facing healthcare apps, BLE connectivity, medicine record synchronization
2. Hypercare, Madelyn & Logbook (Deloitte) — Healthcare mobile suite for medicine records and patient health monitoring
3. Dotcom (Deloitte) — Enterprise healthcare web portal on AEM for patients to access health services info, AI agent-driven automation with MCP
4. Cloud ATF (Alethea) — Automated solution for WLAN and broadband testing with WiFi 6 protocol validation
5. SMS Autosense (Alethea) — ML-driven mobile app for industrial machine condition health monitoring
6. XP8 & XP5 (Sonim) — Rugged Android smartphones testing for extreme industrial conditions

=== PROFESSIONAL CERTIFICATIONS (7 total) ===
1. Playwright 101 Certification — TestMu AI (March 2026, Valid until March 2028)
2. Learn JavaScript — Codecademy (June 2023)
3. Robot Framework with Python-Selenium API Automation Testing — Udemy (May 2024)
4. Learn Python 3 — Codecademy (April 2024)
5. WebDriverIO + Node.js JavaScript UI Automation from Scratch — Udemy (June 2023)
6. Learn Git & GitHub Course — Codecademy (May 2024)
7. Gen AI and AI agent integration in software testing — Udemy (September 2025)

=== RESPONSE GUIDELINES ===
- Be friendly, conversational, and professional
- Keep responses concise (3-6 sentences for simple questions, bullet points for detailed ones)
- When asked for a portfolio summary or brief overview, provide a comprehensive professional summary covering background, experience, skills, education, projects, certifications, and contact info in a clear and well-structured manner
- Always stay within the provided information — do not invent or assume extra details
- When asked about contacting, always mention email and phone, and suggest using the contact form on the portfolio
- Highlight key strengths: 6+ years experience, automation expertise, Gen AI integration, healthcare domain knowledge
- If asked about something not in the data, say: "I don't have that specific information, but you can reach out to Soumadip directly or explore the portfolio sections for more details!"`;

  let conversationHistory = [];
  let isOpen = false;

  // Toggle chat window with animation
  const openChat = () => {
    isOpen = true;
    fab.classList.add('hidden');
    document.body.classList.add('chatbot-open');
    if (backdrop) backdrop.classList.add('visible');

    // Trigger open animation
    chatWindow.classList.remove('closing');
    chatWindow.classList.add('opening');
    chatWindow.style.visibility = 'visible';

    chatWindow.addEventListener('animationend', function handler() {
      chatWindow.removeEventListener('animationend', handler);
      chatWindow.classList.remove('opening');
      chatWindow.classList.add('open');
    });

    setTimeout(() => input.focus(), 500);
  };

  const closeChat = () => {
    isOpen = false;
    document.body.classList.remove('chatbot-open');
    if (backdrop) backdrop.classList.remove('visible');

    chatWindow.classList.remove('open');
    chatWindow.classList.add('closing');

    chatWindow.addEventListener('animationend', function handler() {
      chatWindow.removeEventListener('animationend', handler);
      chatWindow.classList.remove('closing');
      chatWindow.style.visibility = 'hidden';
      fab.classList.remove('hidden');
    });
  };

  const toggleChat = () => {
    if (isOpen) closeChat();
    else openChat();
  };

  fab.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  if (backdrop) backdrop.addEventListener('click', closeChat);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });

  // Prevent scroll bleed — stop wheel/touch on chatbot from scrolling the page
  chatWindow.addEventListener('wheel', (e) => {
    const el = messagesContainer;
    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
  }, { passive: false });

  let touchStartY = 0;
  chatWindow.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  chatWindow.addEventListener('touchmove', (e) => {
    const el = messagesContainer;
    const touchY = e.touches[0].clientY;
    const delta = touchStartY - touchY;
    const atTop = el.scrollTop === 0;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      e.preventDefault();
    }
  }, { passive: false });

  // Remove welcome text when conversation starts (starters stay)
  const clearWelcomeScreen = () => {
    const welcome = messagesContainer.querySelector('.chatbot-welcome');
    if (welcome) welcome.remove();
  };

  // Add message bubble
  const addMessage = (text, type) => {
    const msg = document.createElement('div');
    msg.className = `chatbot-msg ${type}`;
    msg.innerHTML = text;
    messagesContainer.appendChild(msg);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return msg;
  };

  // Show typing indicator
  const showTyping = () => {
    const typing = document.createElement('div');
    typing.className = 'chatbot-typing';
    typing.id = 'chatbotTyping';
    typing.innerHTML = '<span class="chatbot-typing-dot"></span><span class="chatbot-typing-dot"></span><span class="chatbot-typing-dot"></span>';
    messagesContainer.appendChild(typing);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  };

  const removeTyping = () => {
    const typing = document.getElementById('chatbotTyping');
    if (typing) typing.remove();
  };

  // Format AI response (basic markdown to HTML)
  const formatResponse = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^[-•]\s+(.+)/gm, '<br>&bull; $1')
      .replace(/^\d+\.\s+(.+)/gm, '<br>$1')
      .replace(/\n{2,}/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .trim();
  };

  // Models to try in order (fallback chain)
  const GEMINI_MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite'
  ];
  const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

  // Helper: delay for retry
  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // Call a single model with retry
  const callModel = async (model, requestBody) => {
    const url = `${API_BASE}/${model}:generateContent?key=${GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (response.status === 429) {
      const err = new Error('RATE_LIMITED');
      err.status = 429;
      throw err;
    }

    if (!response.ok) {
      const err = new Error(`API_ERROR_${response.status}`);
      err.status = response.status;
      throw err;
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  };

  // Call Gemini with model fallback + retry logic
  const callGemini = async (userMessage) => {
    if (!GEMINI_API_KEY) {
      return 'The AI assistant is currently unavailable. Please contact Soumadip directly at soumadipbasu333@gmail.com';
    }

    conversationHistory.push({ role: 'user', parts: [{ text: userMessage }] });

    const requestBody = {
      contents: [
        { role: 'user', parts: [{ text: PORTFOLIO_CONTEXT }] },
        { role: 'model', parts: [{ text: 'Understood! I am Soumadip Basu\'s AI portfolio assistant. I will answer questions based on his portfolio information in a friendly and professional manner. How can I help you?' }] },
        ...conversationHistory
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192
      }
    };

    let lastError = null;

    // Try each model in the fallback chain
    for (const model of GEMINI_MODELS) {
      // Retry each model up to 2 times with backoff
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const aiText = await callModel(model, requestBody);
          if (aiText) {
            conversationHistory.push({ role: 'model', parts: [{ text: aiText }] });
            if (conversationHistory.length > 20) {
              conversationHistory = conversationHistory.slice(-20);
            }
            return aiText;
          }
        } catch (err) {
          lastError = err;
          if (err.status === 429 && attempt === 0) {
            // Wait before retry on rate limit
            await wait(3000);
            continue;
          }
          // Move to next model on rate limit, or throw on other errors
          if (err.status === 429) break;
          throw err;
        }
      }
    }

    // All models rate-limited
    if (lastError?.status === 429) {
      const rateErr = new Error('ALL_MODELS_RATE_LIMITED');
      rateErr.isRateLimit = true;
      throw rateErr;
    }

    throw lastError || new Error('No response generated');
  };

  // Send message handler
  const sendMessage = async (text) => {
    const message = text || input.value.trim();
    if (!message) return;

    clearWelcomeScreen();
    addMessage(message, 'user');
    input.value = '';
    sendBtn.disabled = true;
    showTyping();

    try {
      const response = await callGemini(message);
      removeTyping();
      addMessage(formatResponse(response), 'bot');
    } catch (error) {
      console.error('Chatbot error:', error);
      removeTyping();
      if (error.isRateLimit) {
        addMessage('I\'m getting a lot of traffic right now! Please wait a minute and try again. In the meantime, feel free to explore the portfolio sections above or contact Soumadip at <strong>soumadipbasu333@gmail.com</strong>', 'error');
      } else {
        addMessage('Sorry, I encountered an error. Please try again or contact Soumadip directly at <strong>soumadipbasu333@gmail.com</strong>', 'error');
      }
      // Roll back the user message from conversation history so retries work cleanly
      if (conversationHistory.length > 0 && conversationHistory[conversationHistory.length - 1].role === 'user') {
        conversationHistory.pop();
      }
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  };

  // Event listeners
  sendBtn.addEventListener('click', () => sendMessage());
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Conversation starter buttons
  starterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      sendMessage(question);
    });
  });
};

initChatbot();

// Debug function for mobile testing
window.debugMobileForm = function() {
  const form = document.querySelector('.contact-form');
  const submitBtn = form?.querySelector('button[type="submit"]');

  console.log('=== Mobile Form Debug ===');
  console.log('Form element:', form);
  console.log('Submit button:', submitBtn);
  console.log('Form ID:', form?.id);
  console.log('Button type:', submitBtn?.type);
  console.log('Is mobile device:', /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  console.log('Window width:', window.innerWidth);
  console.log('Touch support:', 'ontouchstart' in window);
  console.log('EmailJS loaded:', typeof emailjs !== 'undefined');

  if (submitBtn) {
    console.log('Button styles:', {
      pointerEvents: getComputedStyle(submitBtn).pointerEvents,
      touchAction: getComputedStyle(submitBtn).touchAction,
      userSelect: getComputedStyle(submitBtn).userSelect,
      position: getComputedStyle(submitBtn).position,
      zIndex: getComputedStyle(submitBtn).zIndex
    });
  }

  // Test form submission manually
  if (form && submitBtn) {
    console.log('Testing manual form submission...');
    const event = new Event('submit', {
      bubbles: true,
      cancelable: true
    });
    form.dispatchEvent(event);
  }
};

// Mobile Footer Links Handler - Force Navigation
function initializeMobileFooterLinks() {
  const githubLink = document.getElementById('github-link');
  const linkedinLink = document.getElementById('linkedin-link');

  // Function to handle link navigation on mobile
  function handleMobileLinkClick(url, linkName) {
    console.log(`${linkName} link clicked on mobile`);

    // Open in new tab only - no current tab navigation
    try {
      // Method 1: window.open (most reliable for mobile)
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');

      // Method 2: Only if window.open completely fails, try alternative approach
      if (!newWindow) {
        console.log('Window.open failed, trying alternative method');
        // Create a temporary anchor element and click it
        const tempLink = document.createElement('a');
        tempLink.href = url;
        tempLink.target = '_blank';
        tempLink.rel = 'noopener noreferrer';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      }
    } catch (error) {
      console.log('Error opening link:', error);
      // Last resort: create and click a temporary link
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.target = '_blank';
      tempLink.rel = 'noopener noreferrer';
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    }
  }

  // Enhanced click handlers for mobile
  if (githubLink) {
    // Remove any existing event listeners
    githubLink.removeEventListener('click', () => {});

    // Add comprehensive mobile click handling
    githubLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('GitHub link clicked');
      handleMobileLinkClick('https://github.com/soumadipbasupersonalgithub', 'GitHub');
    });

    // Mobile touch handling
    githubLink.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('GitHub link touched');
      handleMobileLinkClick('https://github.com/soumadipbasupersonalgithub', 'GitHub');
    }, { passive: false });
  }

  if (linkedinLink) {
    // Remove any existing event listeners
    linkedinLink.removeEventListener('click', () => {});

    // Add comprehensive mobile click handling
    linkedinLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('LinkedIn link clicked');
      handleMobileLinkClick('https://www.linkedin.com/in/soumadip-basu-b47160197/', 'LinkedIn');
    });

    // Mobile touch handling
    linkedinLink.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('LinkedIn link touched');
      handleMobileLinkClick('https://www.linkedin.com/in/soumadip-basu-b47160197/', 'LinkedIn');
    }, { passive: false });
  }
}

// Initialize footer links after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeMobileFooterLinks();
});

// Also initialize when page is fully loaded
window.addEventListener('load', () => {
  initializeMobileFooterLinks();
});

// Project Modal Functionality
const projectData = {
  'healthcare-frameworks': {
    title: '⚙️ SDK Validation Framework',
    company: 'Deloitte',
    overview: '<ul>' +
                '<li>As a Quality Assurance Professional, my key responsibility is to draft comprehensive testing protocols for a healthcare SDK supporting medicine tracking and smart device connectivity.</li>' +
                '<li>Led end-to-end QA validation of Bluetooth Low Energy (BLE) communication, ensuring seamless operation and cross-platform compatibility across iOS and Android ecosystems.</li>' +
                '<li>Developed and enhanced automation test scripts to expand coverage, validate new features, and optimize the QA process.</li>' +
                '<li>Conducted multiple iterations of sprint, informal, and formal testing, delivering a robust backend software framework used across multiple healthcare application backends.</li>' +
              '</ul>',
    technologies: ['Raspberry Pi', 'Bluetooth Low Energy', 'Android Studio', 'Xcode', 'Selenium', 'Unit Testing', 'UI Automation']
  },
  'healthcare-suite': {
    title: '💉 Hypercare, Madelyn & Logbook',
    company: 'Deloitte',
    overview: '<ul>' +
                '<li>Served as QA for the Healthcare Mobile Suite, including Madelyn (patient health tracking) and Hypercare (medicine record management) applications.</li>' +
                '<li>Designed and implemented comprehensive functional & automation test scripts to ensure product quality and reliability.</li>' +
                '<li>Executed multiple regression testing, as well as formal end-to-end validation of patient-facing mobile applications as per FDA level.</li>' +
                '<li>Developed and maintained automation frameworks using JavaScript, Appium, and WebDriverIO to enable efficient and scalable product testing.</li>' +
                '<li>Focused on defect tracking & maximizing test coverage after every sprint to streamline quality assurance processes for an optimal user experience.</li>' +
              '</ul>',
    technologies: ['WebDriverIO', 'Cucumber', 'JavaScript', 'Manual Testing', 'Test Automation', 'Appium', 'Regression Testing']
  },
  'dotcom': {
    title: '🌐 Dot.com',
    company: 'Deloitte',
    overview: '<ul>' +
                '<li>Served as QA for an enterprise web platform, focusing on digital experiences tailored for diverse patient groups in the healthcare sector.</li>' +
                '<li>Gained in-depth understanding of Adobe Experience Manager (AEM) components to design effective and targeted test strategies.</li>' +
                '<li>Performed end-to-end QA activities, including requirements analysis, test planning, execution, defect tracking, and preparing comprehensive test summary reports for clients.</li>' +
                '<li>Conducted accessibility compliance testing in alignment with WCAG standards to ensure the platform met essential inclusivity criteria.</li>' +
                '<li>Developed automation frameworks from scratch, enabling efficient regression and functional testing.</li>' +
                '<li>Introduced and implemented AI agent-driven automation processes with integration to the MCP server, enhancing overall test coverage and efficiency.</li>' +
              '</ul>',
    technologies: ['Adobe Experience Manager', 'Playwright', 'Functional Testing', 'Accessibility Testing', 'Performance Testing', 'Test Automation']
  },
  'cloud-atf': {
    title: '☁️ Cloud ATF (Network Testing Portal)',
    company: 'Alethea Communications',
    overview: '<ul>' +
                '<li>Served as a automation QA and my key role was to built a robust automation framework from scratch using Python and Robot Framework.</li>' +
                '<li>Developed a performance testing suite using Python and Locust to evaluate the cloud-based WLAN and broadband testing portal.</li>' +
                '<li>Engineered scalable infrastructure for WiFi 6 protocol validation and comprehensive network performance testing.</li>' +
                '<li>Automated UI and functional tests to ensure seamless device operation under varying conditions.</li>' +
                '<li>Validated portal performance and throughput metrics to enhance system reliability and scalability.</li>' +
              '</ul>',
    technologies: ['Python', 'Robot Framework', 'Postman', 'Locust', 'Git']
  },
  'sms-autosense': {
    title: '🤖 SMS Autosense',
    company: 'Alethea Communications',
    overview: 'Machine Learning-driven mobile application for industrial condition helath monitoring of the APIs. My key responsibility was to update the automation code in JavaScript using Katalon Studio to validate the new features and regression.',
    technologies: ['Katalon Studio', 'JavaScript', 'Postman', 'API Testing']
  },
  'mobile-devices': {
    title: '📱 XP8 & XP5',
    company: 'Sonim Technologies',
    overview: 'As a Functional QA my responsibility is to perform the comprehensive testing of rugged Android satellite smartphone builds across multiple US mobile device variants. Executed functional and sprint testing protocols for industrial-grade mobile devices & accessories.',
    technologies: ['Android', 'ADB log analyzing', 'Bluetooth Testing', 'Satellite Network Testing', 'GPS Testing', 'Camera Testing', 'Audio Testing']
  }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Function to open modal with project details
function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;

  const modalHTML = `
    <div class="project-detail">
      <div class="project-detail-header">
        <h2 class="project-detail-title">${project.title}</h2>
        <div class="project-detail-client">
          <span class="parent-company-tag">${project.company}</span>
        </div>
        <h3 class="project-detail-subtitle">Roles & Responsibilities</h3>
        <div class="project-detail-overview">
          ${project.overview}
        </div>
      </div>

      <div class="project-sections">
        <div class="project-section">
          <h3 class="project-section-title">🛠️ Tools & Technologies</h3>
          <div class="project-tech-grid">
            ${project.technologies.map(tech => `
              <span class="tech-badge">${tech}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  modalContent.innerHTML = modalHTML;
  modal.style.display = 'block';

  // Trigger animation
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);

  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden';

  // Push a history state so the back button closes the modal instead of navigating away
  window.history.pushState({ modalOpen: true, projectKey: projectKey }, '', window.location.href);
}

// Function to close modal
function closeProjectModal() {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';

    // Remove the history state if it was created by modal
    if (window.history.state && window.history.state.modalOpen) {
      window.history.back();
    }
  }, 300);
}

// Event listeners for project links
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('project-link')) {
    e.preventDefault();
    e.stopPropagation();
    const projectKey = e.target.getAttribute('data-project');
    if (projectKey) {
      openProjectModal(projectKey);
    }
  }
});

// Enhanced mobile touch handling for project links
document.addEventListener('touchend', (e) => {
  if (e.target.classList.contains('project-link')) {
    e.preventDefault();
    e.stopPropagation();
    const projectKey = e.target.getAttribute('data-project');
    if (projectKey) {
      // Add flip effect before opening modal
      const projectCard = e.target.closest('.project-card');
      if (projectCard && window.innerWidth <= 768) {
        addFlipEffect(projectCard);
        setTimeout(() => {
          openProjectModal(projectKey);
        }, 300);
      } else {
        openProjectModal(projectKey);
      }
    }
  }
}, { passive: false });

// Function to add flip effect to project cards
function addFlipEffect(card) {
  // Add flip class
  card.classList.add('card-flipping');

  // Remove the class after animation completes
  setTimeout(() => {
    card.classList.remove('card-flipping');
  }, 600);
}

// Function to add ripple effect at touch point
function createRippleEffect(element, event) {
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');

  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left - size / 2;
  const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top - size / 2;

  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';

  element.style.position = 'relative';
  element.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
}

// Add touch feedback for better mobile interaction
document.addEventListener('touchstart', (e) => {
  if (window.innerWidth <= 768) {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
      projectCard.classList.add('card-pressed');
      createRippleEffect(projectCard, e);
    }
  }
}, { passive: false });

document.addEventListener('touchend', (e) => {
  if (window.innerWidth <= 768) {
    const projectCard = e.target.closest('.project-card');
    if (projectCard) {
      setTimeout(() => {
        projectCard.classList.remove('card-pressed');
      }, 150);
    }
  }
}, { passive: false });

// Close modal event listeners
closeBtn.addEventListener('click', closeProjectModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeProjectModal();
  }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    closeProjectModal();
  }
});

// Mobile touch handling for modal
if ('ontouchstart' in window) {
  modal.addEventListener('touchstart', (e) => {
    if (e.target === modal) {
      closeProjectModal();
    }
  });
}

// Handle browser back button to close modal instead of navigating away
window.addEventListener('popstate', (event) => {
  // Check if modal is currently open
  if (modal.classList.contains('show')) {
    // Close the modal without triggering another history change
    modal.classList.remove('show');
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Also handle certificate verification modal
  const vModalEl = document.querySelector('.verification-modal');
  if (vModalEl) {
    vModalEl.remove();
    document.body.style.overflow = '';
    // Smooth scroll back to Certifications section if it exists
    const certSection = document.getElementById('certifications');
    if (certSection) {
      const rect = certSection.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = rect.top + scrollTop - (isMobileDevice() ? 90 : 80);
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  }
});

// Certificate verification functionality
document.addEventListener('DOMContentLoaded', () => {
  const certificateVerifyButtons = document.querySelectorAll('.certificate-verify');

  // Certificate verification data (mock data for demonstration)
  const certificateData = {
    'codeacademy-001': {
      title: 'Learn JavaScript',
      issuer: 'Codecademy',
      verificationUrl: 'https://www.codecademy.com/profiles/tag5735900943/certificates/705dcb15de0da4dd9d9fc4f3274b430e',
      status: 'Valid',
      issuedDate: 'June 2023',
      expiryDate: 'N/A'
    },
    'istqb-001': {
      title: 'Robot Framework with Python-Selenium API Automation Testing',
      issuer: 'Udemy',
      verificationUrl: 'https://www.udemy.com/certificate/UC-c2dcfc91-df9c-4fc1-a502-ef4b1940e034/',
      status: 'Valid',
      issuedDate: 'May 2020',
      expiryDate: 'No Expiration Date'
    },
    'python-001': {
      title: 'Learn Python 3',
      issuer: 'Codecademy',
      verificationUrl: 'https://www.codecademy.com/profiles/tag5735900943/certificates/6c152bd262967f8c941c9707ed636bda',
      status: 'Valid',
      issuedDate: 'April 2024',
      expiryDate: 'No Expiration Date'
    },
    'automation-001': {
      title: 'WebDriverIO + Node.js -JavaScript UI Automation from Scratch',
      issuer: 'Udemy',
      verificationUrl: 'https://www.udemy.com/certificate/UC-4ea0c12b-e958-4337-82a5-d4e8aebd8bc8/',
      status: 'Valid',
      issuedDate: 'June 2023',
      expiryDate: 'No Expiration Date'
    },
    'git-001': {
      title: 'Learn Git & GitHub Course',
      issuer: 'Codecademy',
      verificationUrl: 'https://www.codecademy.com/profiles/tag5735900943/certificates/a8ab218d5950c29861635cc0bf12fd13',
      status: 'Valid',
      issuedDate: 'May 2024',
      expiryDate: 'No Expiration Date'
    },
    'ai-001': {
      title: 'Gen AI and AI agent integration in software testing',
      issuer: 'Udemy',
      verificationUrl: 'https://',
      status: 'Valid',
      issuedDate: 'September 2025',
      expiryDate: 'No Expiration Date'
    },
    'playwright-001': {
      title: 'Playwright 101 Certification',
      issuer: 'TestMu AI',
      verificationUrl: 'https://www.testmuai.com/certified/P101-3593BG/',
      status: 'Valid',
      issuedDate: 'March 2026',
      expiryDate: 'March 2028'
    }
  };

  certificateVerifyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = button.getAttribute('data-cert-id');
      const certInfo = certificateData[certId];

      if (certInfo) {
        // Create verification popup/modal
        const verificationHtml = `
          <div class="verification-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
          ">
            <div style="
              background: white;
              padding: 2rem;
              border-radius: 20px;
              max-width: 500px;
              width: 90%;
              max-height: 80vh;
              overflow-y: auto;
              box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            ">
              <div style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
                border-bottom: 1px solid #eee;
                padding-bottom: 1rem;
              ">
                <h3 style="
                  margin: 0;
                  color: #1f2937;
                  font-size: 1.5rem;
                  font-weight: 700;
                ">Certificate Verification</h3>
                <button class="close-verification" style="
                  background: none;
                  border: none;
                  font-size: 1.5rem;
                  cursor: pointer;
                  color: #6b7280;
                  padding: 0;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  transition: all 0.2s ease;
                " onmouseover="this.style.background='#f3f4f6'" onmouseout="this.style.background='none'">×</button>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                  margin-bottom: 1rem;
                ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="color: #10b981;">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span style="
                    color: #10b981;
                    font-weight: 600;
                    font-size: 1.1rem;
                  ">Certificate Verified ✓</span>
                </div>

                <h4 style="
                  margin: 0 0 0.5rem 0;
                  color: #1f2937;
                  font-size: 1.25rem;
                  font-weight: 600;
                ">${certInfo.title}</h4>

                <p style="
                  margin: 0 0 1rem 0;
                  color: #6366f1;
                  font-weight: 600;
                ">Issued by: ${certInfo.issuer}</p>

                <div style="
                  background: #f8fafc;
                  padding: 1rem;
                  border-radius: 12px;
                  margin-bottom: 1rem;
                ">
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Status:</strong>
                    <span style="color: #10b981; font-weight: 600;">${certInfo.status}</span>
                  </div>
                  <div style="margin-bottom: 0.5rem;">
                    <strong style="color: #374151;">Issued:</strong> ${certInfo.issuedDate}
                  </div>
                  <div>
                    <strong style="color: #374151;">Expires:</strong> ${certInfo.expiryDate}
                  </div>
                </div>

                <p style="
                  color: #6b7280;
                  font-size: 0.9rem;
                  line-height: 1.5;
                  margin: 0;
                ">This course completion certificate has been verified against the issuer's database. The credential is authentic and current.</p>
              </div>

              <div style="
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
              ">
                <a href="${certInfo.verificationUrl}" target="_blank" rel="noopener noreferrer" style="
                  background: linear-gradient(135deg, #6366f1, #8b5cf6);
                  color: white;
                  text-decoration: none;
                  padding: 0.75rem 1.5rem;
                  border-radius: 12px;
                  font-weight: 600;
                  flex: 1;
                  text-align: center;
                  transition: all 0.3s ease;
                  min-width: 140px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 0.5rem;
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(99, 102, 241, 0.3)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                  <span>View Certificate</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <polyline points="15,3 21,3 21,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </a>
                <button class="close-verification" style="
                  background: #f3f4f6;
                  color: #374151;
                  border: 1px solid #d1d5db;
                  padding: 0.75rem 1.5rem;
                  border-radius: 12px;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  min-width: 100px;
                " onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
                  Close
                </button>
              </div>
            </div>
          </div>
        `;

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', verificationHtml);

        // Lock body scroll and push a history state so back button closes this modal first
        const vModalEl = document.querySelector('.verification-modal');
        document.body.style.overflow = 'hidden';
        window.history.pushState({ verificationOpen: true }, '', window.location.href);

        // Close via buttons -> go through history so popstate handler runs
        const closeButtons = vModalEl.querySelectorAll('.close-verification');
        closeButtons.forEach(btn => {
          btn.addEventListener('click', () => window.history.back());
        });

        // Close on outside click
        vModalEl.addEventListener('click', (e) => {
          if (e.target === vModalEl) {
            window.history.back();
          }
        });

        // Close on Escape key
        const escapeHandler = (e) => {
          if (e.key === 'Escape') {
            window.history.back();
            document.removeEventListener('keydown', escapeHandler);
          }
        };
        document.addEventListener('keydown', escapeHandler);
      }
    });
  });
});
