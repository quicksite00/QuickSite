
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




