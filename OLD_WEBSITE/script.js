
// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
const observers = document.querySelectorAll('.animate-on-scroll');

const options = {
  threshold: 0.2  // Trigger when 20% of element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate only once
    }
  });
}, options);

observers.forEach(el => {
  observer.observe(el);
});

// ===== MOUSE PARALLAX EFFECT ON HEADER =====
const headerContent = document.querySelector('.header-content');
const header = document.querySelector('header');

if (headerContent && header) {
  document.addEventListener('mousemove', (e) => {
    const xPos = (e.clientX / window.innerWidth) - 0.5;
    const yPos = (e.clientY / window.innerHeight) - 0.5;
    
    headerContent.style.transform = `perspective(800px) rotateX(${yPos * 8}deg) rotateY(${xPos * 8}deg) translateZ(50px)`;
  });
  
  // Reset on mouse leave with smooth transition
  document.addEventListener('mouseleave', () => {
    headerContent.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  });
}

// ===== FLOATING BLOBS INTERACTIVITY =====
const blobs = document.querySelectorAll('.gradient-blob');
window.addEventListener('mousemove', (e) => {
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  blobs.forEach((blob, index) => {
    const offset = (index + 1) * 50;
    blob.style.transform = `translate(${x * offset}px, ${y * offset}px)`;
  });
});

// ===== SMOOTH SCROLL FUNCTIONALITY =====
document.getElementById("catBtn").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".intro").scrollIntoView({
    behavior: "smooth"
  });
});

// Handle all CTA links with smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href !== '#' && href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// Handle all CTA buttons with smooth scrolling
document.querySelectorAll('.cta-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const href = button.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ===== SCROLL DOWN ARROW CLICK =====
const scrollArrow = document.querySelector('.scroll-down');
if (scrollArrow) {
  scrollArrow.addEventListener('click', () => {
    document.querySelector('.intro').scrollIntoView({
      behavior: 'smooth'
    });
  });
}

// ===== ENHANCED CTA BUTTON RIPPLE EFFECT =====
const ctaButtons = document.querySelectorAll('.cta');
ctaButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.querySelector('.form-submit');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('sending');
        formStatus.className = 'form-status';
        formStatus.textContent = '';
        
        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formStatus.textContent = 'Oops! There was a problem sending your message. Please try again.';
            formStatus.classList.add('error');
        } finally {
            submitBtn.classList.remove('sending');
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        }
    });
}

// Portfolio card animations with stagger
const portfolioCards = document.querySelectorAll('.portfolio-card');
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 150);
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

portfolioCards.forEach(card => {
    cardObserver.observe(card);
});

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach((card, index) => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filterValue === 'all' || categories.includes(filterValue)) {
                setTimeout(() => {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.classList.add('show');
                    }, 50);
                }, index * 100);
            } else {
                card.classList.remove('show');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Smooth scroll for CTA button (guarded)
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
  ctaButton.addEventListener('click', (e) => {
    e.preventDefault();
    const href = ctaButton.getAttribute('href') || (e.target && e.target.getAttribute && e.target.getAttribute('href'));
    const target = href ? document.querySelector(href) : null;
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

// Add ripple effect to buttons
document.querySelectorAll('.filter-btn, .view-project-btn, .cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== TEAM CARDS: Tap-to-flip for touch devices =====
const teamCards = document.querySelectorAll('.team-card');
if (teamCards && teamCards.length) {
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
  teamCards.forEach(card => {
    // Prevent accidental flips when clicking links inside the card
    card.addEventListener('click', (e) => {
      if (!isTouch) return; // only enable on touch devices
      if (e.target.closest('a')) return;
      card.classList.toggle('flipped');
    });
  });
}