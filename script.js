
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

  // Smooth scroll from header to intro
document.getElementById("catBtn").addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("cta-intro").addEventListener("click", () => {
  document.getElementsByClassName(".plans").scrollIntoView({
    behavior: "smooth"
  });
});




// Contact form handling
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