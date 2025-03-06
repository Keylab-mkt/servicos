document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")
    })
  }

  // Sticky Header
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("sticky")
    } else {
      header.classList.remove("sticky")
    }
  })

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  let currentTestimonial = 0

  function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? "block" : "none"
    })

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })
  }

  // Initialize testimonials
  if (testimonials.length > 0 && dots.length > 0) {
    showTestimonial(currentTestimonial)

    // Add click event to dots
    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        currentTestimonial = i
        showTestimonial(currentTestimonial)
      })
    })

    // Auto slide testimonials
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length
      showTestimonial(currentTestimonial)
    }, 5000)
  }

  // Add animation on scroll
  const animateElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .about-image, .about-text, .testimonial",
  )

  function checkScroll() {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animate")
      }
    })
  }

  window.addEventListener("scroll", checkScroll)
  checkScroll() // Check on load

  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
    .service-card, .portfolio-item, .about-image, .about-text, .testimonial {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .service-card.animate, .portfolio-item.animate, .about-image.animate, .about-text.animate, .testimonial.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .nav-links.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      background-color: white;
      padding: 20px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    
    .nav-links.active li {
      margin: 10px 0;
    }
    
    header.sticky {
      padding: 10px 0;
      background-color: rgba(255, 255, 255, 0.98);
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
  `

  document.head.appendChild(style)
})

