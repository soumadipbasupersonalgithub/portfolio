import './style.css'

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
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// CV Download Functionality with Color Change
if (cvButton) {
  cvButton.addEventListener('click', (e) => {
    // Add downloaded state to button
    cvButton.classList.add('downloaded');
    
    // Optional: Add success feedback
    const fabText = cvButton.querySelector('.fab-text');
    const originalText = fabText.textContent;
    
    // Temporarily change text to indicate success
    fabText.textContent = '✓';
    
    // Reset text after 2 seconds
    setTimeout(() => {
      fabText.textContent = originalText;
    }, 2000);
    
    console.log('CV download initiated - button color changed to green');
  });
}

// Mobile detection function
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Simple and reliable navigation for both desktop and mobile
navLinks.forEach(link => {
  const scrollToSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    console.log('Navigation clicked:', targetId);
    
    if (targetSection) {
      // Close mobile menu immediately
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      
      // Wait a bit for menu to close on mobile
      const delay = isMobileDevice() ? 300 : 0;
      
      setTimeout(() => {
        if (isMobileDevice()) {
          // Mobile-specific scroll handling
          console.log('Mobile scroll to:', targetId);
          
          // Method 1: Try simple offset calculation
          const rect = targetSection.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const targetPosition = rect.top + scrollTop - 90; // Extra space for mobile
          
          // Use different scroll methods based on browser support
          if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          } else {
            // Fallback for older mobile browsers
            window.scrollTo(0, targetPosition);
          }
          
        } else {
          // Desktop scroll
          const targetPosition = targetSection.offsetTop - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
        
        // Update active link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
      }, delay);
    }
  };
  
  // Handle clicks
  link.addEventListener('click', scrollToSection);
  
  // Special mobile handling
  if (isMobileDevice()) {
    // Remove default touch behaviors that might interfere
    link.style.touchAction = 'manipulation';
    
    // Add mobile-specific touch handling
    link.addEventListener('touchstart', (e) => {
      e.stopPropagation();
    }, { passive: true });
    
    link.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Mobile touch end on:', link.textContent);
      scrollToSection(e);
    }, { passive: false });
  }
});

// Handle Hero Buttons (Check Out My Craft & Get in Touch) with enhanced mobile touch detection
heroButtons.forEach(button => {
  // Touch tracking variables for each button
  let touchStartTime = 0;
  let touchStartX = 0;
  let touchStartY = 0;
  let hasMoved = false;
  let isLongPress = false;
  let touchTimer = null;
  let isScrolling = false;
  
  const scrollToSection = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = button.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    console.log('Hero button clicked:', targetId);
    
    if (targetSection) {
      if (isMobileDevice()) {
        // Mobile-specific scroll handling
        console.log('Mobile scroll to:', targetId);
        
        const rect = targetSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 90; // Extra space for mobile
        
        if ('scrollBehavior' in document.documentElement.style) {
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        } else {
          // Fallback for older mobile browsers
          window.scrollTo(0, targetPosition);
        }
        
      } else {
        // Desktop scroll
        const targetPosition = targetSection.offsetTop - 80;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  };
  
  // Desktop click handler (simple and direct)
  if (!isMobileDevice()) {
    button.addEventListener('click', scrollToSection);
  } else {
    // Enhanced mobile touch handling with scroll detection
    
    // Touch start - initialize tracking
    button.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      hasMoved = false;
      isLongPress = false;
      isScrolling = false;
      
      // Visual feedback
      button.style.transform = 'scale(0.95)';
      button.style.transition = 'transform 0.1s ease';
      
      // Long press detection
      touchTimer = setTimeout(() => {
        isLongPress = true;
        // Haptic feedback for long press
        if (navigator.vibrate) {
          navigator.vibrate([50, 30, 50]);
        }
      }, 500);
      
      // Don't prevent default - allow scrolling to continue naturally
    }, { passive: true });
    
    // Touch move - detect scrolling vs button interaction
    button.addEventListener('touchmove', (e) => {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      
      const deltaX = Math.abs(currentX - touchStartX);
      const deltaY = Math.abs(currentY - touchStartY);
      const totalMovement = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // If user moves more than 15px, consider it scrolling/movement
      if (totalMovement > 15) {
        hasMoved = true;
        isScrolling = true;
        
        // Remove visual feedback immediately
        button.style.transform = '';
        
        // Clear long press timer
        if (touchTimer) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }
      }
      
      // Specifically detect vertical scrolling (primary concern)
      if (deltaY > 20 && deltaY > deltaX) {
        isScrolling = true;
        hasMoved = true;
      }
    }, { passive: true });
    
    // Touch end - determine if this should trigger navigation
    button.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;
      
      // Clear long press timer
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
      
      // Reset visual feedback
      setTimeout(() => {
        button.style.transform = '';
      }, 100);
      
      // Strict criteria for valid tap:
      // 1. No significant movement (< 10px)
      // 2. Not scrolling
      // 3. Reasonable tap duration (50ms - 800ms)
      // 4. Not a long press
      const isValidTap = (
        !hasMoved && 
        !isScrolling && 
        touchDuration >= 50 && 
        touchDuration <= 800 && 
        !isLongPress
      );
      
      console.log('Touch end analysis:', {
        hasMoved,
        isScrolling,
        touchDuration,
        isLongPress,
        isValidTap
      });
      
      if (isValidTap) {
        // This is a genuine tap - proceed with navigation
        e.preventDefault();
        e.stopPropagation();
        
        // Add confirmation feedback
        button.style.transform = 'scale(1.05)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
        
        // Short haptic feedback for confirmation
        if (navigator.vibrate) {
          navigator.vibrate(40);
        }
        
        console.log('Valid tap detected - navigating to:', button.getAttribute('href'));
        
        // Small delay to show feedback, then navigate
        setTimeout(() => {
          scrollToSection(e);
        }, 50);
      } else {
        // Invalid tap - likely accidental during scroll
        console.log('Invalid tap ignored - likely accidental scroll interaction');
        
        // Optional: Brief visual indication that tap was ignored
        button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        setTimeout(() => {
          button.style.borderColor = '';
        }, 200);
      }
      
      // Reset all tracking variables
      touchStartTime = 0;
      touchStartX = 0;
      touchStartY = 0;
      hasMoved = false;
      isLongPress = false;
      isScrolling = false;
    }, { passive: false });
    
    // Touch cancel - clean up
    button.addEventListener('touchcancel', () => {
      // Clear all states
      if (touchTimer) {
        clearTimeout(touchTimer);
        touchTimer = null;
      }
      
      button.style.transform = '';
      
      // Reset tracking variables
      touchStartTime = 0;
      touchStartX = 0;
      touchStartY = 0;
      hasMoved = false;
      isLongPress = false;
      isScrolling = false;
    }, { passive: true });
    
    // Override click events on mobile to prevent double triggering
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Mobile clicks are handled by touch events only
    });
  }
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

// EmailJS Contact Form Implementation
if (form) {
  // EmailJS Configuration - Your actual credentials
  const EMAILJS_CONFIG = {
    publicKey: 'hf3NIKh30eJc8CihT',
    serviceId: 'service_toq11u8',
    templateId: 'template_j3m9bcp'
  };

  // Initialize EmailJS immediately
  function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
      try {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('EmailJS initialized successfully');
        return true;
      } catch (error) {
        console.error('EmailJS initialization failed:', error);
        return false;
      }
    } else {
      console.error('EmailJS library not loaded');
      return false;
    }
  }

  // Initialize EmailJS on DOM ready
  document.addEventListener('DOMContentLoaded', initializeEmailJS);
  
  // Also try immediate initialization
  initializeEmailJS();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('Form submitted'); // Debug log
    console.log('User agent:', navigator.userAgent); // Mobile debug
    console.log('Screen width:', window.innerWidth); // Mobile debug
    
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const formStatus = document.getElementById('form-status');
    
    // Get form values
    const name = formData.get('from_name');
    const email = formData.get('from_email');
    const message = formData.get('message');
    
    console.log('Form data:', { name, email, message }); // Debug log
    
    // Validate form data
    if (!name || !email || !message) {
      console.error('Missing form data');
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
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';
    }
    
    try {
      // Ensure EmailJS is initialized
      if (!initializeEmailJS()) {
        throw new Error('EmailJS not initialized');
      }
      
      // Prepare email template parameters
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'soumadipbasu111@gmail.com',
        reply_to: email
      };
      
      console.log('Sending email with params:', templateParams); // Debug log
      
      // Send email via EmailJS with better error handling
      let response;
      try {
        response = await emailjs.send(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          templateParams
        );
      } catch (emailError) {
        // Try alternative method if first attempt fails
        console.log('First attempt failed, trying sendForm method:', emailError);
        response = await emailjs.sendForm(
          EMAILJS_CONFIG.serviceId,
          EMAILJS_CONFIG.templateId,
          form
        );
      }
      
      console.log('EmailJS response:', response); // Debug log
      
      if (response.status === 200) {
        // Success
        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.textContent = '✅ Message sent successfully! I will get back to you soon.';
          formStatus.style.display = 'block';
        }
        form.reset();
        console.log('Email sent successfully');
      } else {
        throw new Error(`EmailJS returned status: ${response.status}`);
      }
      
    } catch (error) {
      console.error('EmailJS Error:', error);
      if (formStatus) {
        formStatus.className = 'form-status error';
        formStatus.textContent = `❌ Failed to send message: ${error.message}. Please try again or contact me directly at soumadipbasu333@gmail.com`;
        formStatus.style.display = 'block';
      }
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      if (btnText) btnText.style.display = 'inline';
      if (btnLoading) btnLoading.style.display = 'none';
      
      // Hide status message after 7 seconds
      setTimeout(() => {
        if (formStatus) {
          formStatus.style.display = 'none';
        }
      }, 7000);
    }
  });

  // Test EmailJS connection (for debugging)
  window.testEmailJS = async function() {
    try {
      console.log('Testing EmailJS connection...');
      const testParams = {
        from_name: 'Test User',
        from_email: 'test@example.com',
        message: 'This is a test message',
        to_email: 'soumadipbasu333@gmail.com',
        reply_to: 'test@example.com'
      };
      
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        testParams
      );
      
      console.log('Test email sent successfully:', response);
      return response;
    } catch (error) {
      console.error('Test email failed:', error);
      return error;
    }
  };
  
  // Mobile-specific submit button handler
  if (window.innerWidth <= 768 || 'ontouchstart' in window) {
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      // Mobile touch handling for submit button
      submitBtn.addEventListener('touchend', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Mobile submit button touched');
        
        // Trigger form submission
        const submitEvent = new Event('submit', {
          bubbles: true,
          cancelable: true
        });
        form.dispatchEvent(submitEvent);
      }, { passive: false });
      
      // Fallback click handler for mobile
      submitBtn.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          console.log('Mobile submit button clicked');
          
          // Trigger form submission
          const submitEvent = new Event('submit', {
            bubbles: true,
            cancelable: true
          });
          form.dispatchEvent(submitEvent);
        }
      });
      
      // Add visual feedback for mobile
      submitBtn.addEventListener('touchstart', (e) => {
        submitBtn.style.transform = 'scale(0.95)';
        submitBtn.style.transition = 'transform 0.1s ease';
      }, { passive: true });
      
      submitBtn.addEventListener('touchend', () => {
        setTimeout(() => {
          submitBtn.style.transform = '';
        }, 100);
      }, { passive: true });
    }
  }
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
        
        // Touch start - add hover effect
        element.addEventListener('touchstart', (e) => {
          // Don't prevent default for form submit buttons
          if (!element.matches('button[type="submit"]')) {
            e.preventDefault();
          }
          element.classList.add('mobile-hover');
          
          // Vibration feedback for supported devices
          if (navigator.vibrate) {
            navigator.vibrate(30);
          }
        }, { passive: false });
        
        // Touch end - remove hover effect after delay
        element.addEventListener('touchend', (e) => {
          // Don't prevent default for form submit buttons
          if (!element.matches('button[type="submit"]')) {
            e.preventDefault();
          }
          
          touchTimer = setTimeout(() => {
            element.classList.remove('mobile-hover');
          }, duration);
        }, { passive: false });
        
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

// CV Download Functionality - Enhanced Security Solution
const initializeCVDownload = () => {
  const downloadCVBtn = document.getElementById('downloadCV');
  
  if (downloadCVBtn) {
    const handleCVDownload = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('CV download initiated');
      
      try {
        // Method 1: Use secure download endpoint (primary method)
        const response = await fetch('/download-cv');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Create download link
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.download = 'soumadip_basu_cv.pdf';
        
        // Add to DOM, click, and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the blob URL
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
        
        console.log('CV download completed successfully via secure endpoint');
        
        // Show success feedback
        showDownloadFeedback('Downloaded!', 'success');
        
      } catch (error) {
        console.error('Secure endpoint failed, trying alternative method:', error);
        
        // Method 2: Fetch and create blob from public file (fallback)
        try {
          const response = await fetch('/soumadip_basu_cv.pdf');
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          // Create download link
          const link = document.createElement('a');
          link.style.display = 'none';
          link.href = url;
          link.download = 'soumadip_basu_cv.pdf';
          
          // Add to DOM, click, and clean up
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the blob URL
          setTimeout(() => window.URL.revokeObjectURL(url), 100);
          
          console.log('CV download completed successfully via blob method');
          
          // Show success feedback
          showDownloadFeedback('Downloaded!', 'success');
        
      } catch (error) {
        console.error('Primary download method failed:', error);
        
        // Fallback Method 2: Direct link with proper headers
        try {
          const link = document.createElement('a');
          link.href = `${window.location.origin}/soumadip_basu_cv.pdf`;
          link.download = 'soumadip_basu_cv.pdf';
          link.setAttribute('target', '_self'); // Force same origin
          link.setAttribute('rel', 'noopener');
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          showDownloadFeedback('Downloaded!', 'success');
          
        } catch (fallbackError) {
          console.error('Fallback method failed:', fallbackError);
          
          // Final Fallback Method 3: Open in new tab with instructions
          try {
            const newWindow = window.open(`${window.location.origin}/soumadip_basu_cv.pdf`, '_blank');
            
            if (newWindow) {
              showDownloadFeedback('Opened in new tab', 'info');
              
              // Show user instructions
              setTimeout(() => {
                alert('PDF opened in new tab. Right-click and select "Save As" to download.');
              }, 1000);
            } else {
              throw new Error('Popup blocked');
            }
            
          } catch (finalError) {
            console.error('All download methods failed:', finalError);
            showDownloadFeedback('Download failed - Try right-click', 'error');
            
            // Show manual instructions
            setTimeout(() => {
              alert('Download blocked by browser. Please right-click the "Download CV" button and select "Save link as" or contact me directly for the CV.');
            }, 500);
          }
        }
      }
      }
    };
    
    // Feedback function
    const showDownloadFeedback = (message, type) => {
      const originalText = downloadCVBtn.textContent;
      downloadCVBtn.textContent = message;
      
      // Color coding based on type
      switch (type) {
        case 'success':
          downloadCVBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
          break;
        case 'error':
          downloadCVBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
          break;
        case 'info':
          downloadCVBtn.style.background = 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)';
          break;
      }
      
      setTimeout(() => {
        downloadCVBtn.textContent = originalText;
        downloadCVBtn.style.background = '';
      }, type === 'error' ? 4000 : 2000);
    };
    
    // Add right-click context menu option
    downloadCVBtn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      
      // Create custom context menu for download
      const contextMenu = document.createElement('div');
      contextMenu.style.cssText = `
        position: fixed;
        top: ${e.clientY}px;
        left: ${e.clientX}px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: var(--font-primary);
        min-width: 160px;
      `;
      
      contextMenu.innerHTML = `
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             onmouseover="this.style.background='#f3f4f6'" 
             onmouseout="this.style.background=''"
             onclick="window.open('${window.location.origin}/soumadip_basu_cv.pdf', '_blank')">
          📄 Open CV in New Tab
        </div>
        <div style="padding: 8px 12px; cursor: pointer; border-radius: 4px;" 
             onmouseover="this.style.background='#f3f4f6'" 
             onmouseout="this.style.background=''"
             onclick="navigator.clipboard.writeText('${window.location.origin}/soumadip_basu_cv.pdf').then(() => alert('CV link copied to clipboard!'))">
          🔗 Copy CV Link
        </div>
      `;
      
      document.body.appendChild(contextMenu);
      
      // Remove context menu when clicking elsewhere
      const removeMenu = () => {
        if (document.body.contains(contextMenu)) {
          document.body.removeChild(contextMenu);
        }
        document.removeEventListener('click', removeMenu);
      };
      
      setTimeout(() => document.addEventListener('click', removeMenu), 100);
    });
    
    // Desktop click handler
    downloadCVBtn.addEventListener('click', handleCVDownload);
    
    // Mobile touch handler
    downloadCVBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleCVDownload(e);
    }, { passive: false });
    
    console.log('Enhanced CV download functionality initialized');
  } else {
    console.error('Download CV button not found');
  }
};

// Initialize CV download on DOM ready
document.addEventListener('DOMContentLoaded', initializeCVDownload);

// Also try immediate initialization
initializeCVDownload();

// Initialize View Resume button with same functionality
const initializeViewResume = () => {
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  
  if (viewResumeBtn) {
    const handleViewResume = (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Open PDF in new tab for viewing
      try {
        const newWindow = window.open('/soumadip_basu_cv.pdf', '_blank', 'noopener,noreferrer');
        
        if (!newWindow) {
          // Fallback if popup blocked
          window.location.href = '/soumadip_basu_cv.pdf';
        }
        
        console.log('Resume opened for viewing');
        
      } catch (error) {
        console.error('Error opening resume:', error);
        // Last resort fallback
        window.location.href = '/soumadip_basu_cv.pdf';
      }
    };
    
    viewResumeBtn.addEventListener('click', handleViewResume);
    viewResumeBtn.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleViewResume(e);
    }, { passive: false });
    
    console.log('View Resume functionality initialized');
  }
};

// Initialize View Resume button
document.addEventListener('DOMContentLoaded', initializeViewResume);
initializeViewResume();

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
