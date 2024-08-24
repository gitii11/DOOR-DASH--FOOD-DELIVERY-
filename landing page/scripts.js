document.querySelectorAll("nav ul li a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form Validation for Contact Form
const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || message === "") {
    alert("Please fill in all fields");
  } else {
    alert("Your message has been sent successfully!");
    contactForm.reset(); // Reset form after submission
  }
});

// Toggle Mobile Menu (if you plan to add a mobile menu)
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

// Change Button Text on Download Buttons
const appStoreBtn = document.querySelector(".app-store");
const googlePlayBtn = document.querySelector(".google-play");

appStoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  alert("App Store download is not available yet!");
});

googlePlayBtn.addEventListener("click", function (e) {
  e.preventDefault();
  alert("Google Play download is not available yet!");
});

// Add Scroll to Top Button (optional)
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerText = "↑ Top";
scrollToTopBtn.classList.add("scroll-to-top");
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// Lazy Loading Images (for better performance)
document.addEventListener("DOMContentLoaded", function () {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for older browsers
    let active = false;
    const lazyLoad = function () {
      if (active === false) {
        active = true;

        setTimeout(function () {
          lazyImages.forEach(function (lazyImage) {
            if (
              lazyImage.getBoundingClientRect().top <= window.innerHeight &&
              lazyImage.getBoundingClientRect().bottom >= 0 &&
              getComputedStyle(lazyImage).display !== "none"
            ) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.classList.remove("lazy");

              lazyImages = lazyImages.filter(function (image) {
                return image !== lazyImage;
              });

              if (lazyImages.length === 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationchange", lazyLoad);
              }
            }
          });

          active = false;
        }, 200);
      }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
  }
});
