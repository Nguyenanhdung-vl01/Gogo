document.addEventListener("DOMContentLoaded", () => {
  // =========================================
  // 1. PRELOADER & INITIALIZATION
  // =========================================
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("preloader-hidden");
        setTimeout(() => {
          preloader.style.display = "none";
          initTerminal();
        }, 800);
      }, 2500);
    });
  }

  // =========================================
  // 2. ADVANCED STARFIELD ENGINE (3D PARALLAX)
  // =========================================
  const starContainer = document.createElement("div");
  starContainer.id = "star-container";
  document.body.appendChild(starContainer);

  const createStars = () => {
    for (let i = 0; i < 300; i++) {
      const star = document.createElement("div");
      star.className = "star";
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const duration = Math.random() * 3 + 2;
      const z = Math.random(); // Depth layer

      star.style.left = `${x}%`;
      star.style.top = `${y}%`;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.setProperty("--duration", `${duration}s`);
      star.style.opacity = z * 0.8 + 0.2;
      star.dataset.z = z;

      starContainer.appendChild(star);
    }
  };
  createStars();

  // Smooth Parallax Logic
  let mouseX = 0,
    mouseY = 0;
  let targetX = 0,
    targetY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
  });

  const animateParallax = () => {
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    Array.from(starContainer.children).forEach((star) => {
      const z = parseFloat(star.dataset.z);
      const moveX = targetX * z * 40;
      const moveY = targetY * z * 40;
      star.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    requestAnimationFrame(animateParallax);
  };
  animateParallax();

  // =========================================
  // 3. VIP PHYSICS CURSOR (WHITE & SMOOTH)
  // =========================================
  const cursor = document.querySelector(".cursor");

  let cursorX = 0,
    cursorY = 0;
  let clientX = 0,
    clientY = 0;

  document.addEventListener("mousemove", (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  const animateCursor = () => {
    // Smooth lerp movement
    cursorX += (clientX - cursorX) * 0.15;
    cursorY += (clientY - cursorY) * 0.15;

    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }

    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Magnetic Effect for Buttons/Links
  const magneticElements = document.querySelectorAll(
    "a, button, .card, .terminal-window",
  );
  magneticElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      if (cursor) cursor.classList.add("hovered");
    });
    el.addEventListener("mouseleave", () => {
      if (cursor) cursor.classList.remove("hovered");
      el.style.transform = ""; // Reset transform
    });

    // Optional: Simple magnetic pull
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      // Only apply small pull to avoid conflict with tilt
      if (!el.classList.contains("tilt-card")) {
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      }
    });
  });

  // =========================================
  // 4. 3D TILT EFFECT FOR CARDS
  // =========================================
  const cards = document.querySelectorAll(".tilt-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // =========================================
  // 5. TERMINAL TYPING EFFECT
  // =========================================
  function initTerminal() {
    const termText = document.getElementById("terminal-text");
    if (!termText) return;

    const cmd = "Khởi động hệ thống lưu trữ hành trình... [OK]";
    let idx = 0;

    const typeCmd = () => {
      if (idx < cmd.length) {
        termText.textContent += cmd.charAt(idx);
        idx++;
        setTimeout(typeCmd, 30 + Math.random() * 50);
      }
    };
    typeCmd();
  }

  // =========================================
  // 6. SCROLL REVEAL ANIMATION
  // =========================================
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("section").forEach((el) => {
    observer.observe(el);
  });

  // Glitch effect on title occasionally
  const title = document.getElementById("site-title");
  setInterval(() => {
    title.classList.add("glitch");
    setTimeout(() => {
      title.classList.remove("glitch");
    }, 500);
  }, 5000);
});
