document.addEventListener("DOMContentLoaded", () => {
  // =================================================================
  // 1. INISIALISASI GLOBAL & EFEK
  // =================================================================
  AOS.init({
    duration: 800, // Durasi animasi dalam milidetik
    once: true, // Animasi hanya berjalan sekali
    offset: 50, // Memicu animasi sedikit lebih awal
  });

  // =================================================================
  // 2. SLIDER TESTIMONI
  // =================================================================
  const testimonialSection = document.querySelector(".testimonial-section");
  if (testimonialSection) {
    const testimonials = [
      {
        quote: "So great! Very thorough and on time!",
        text: "Very pleasant service and thorough cleaning. Came in and got the job done... And a beyond that too. I would definitely recommend them.",
        author: "Amazon",
      },
      {
        quote: "Fantastic service and amazing results.",
        text: "The team was professional, efficient, and delivered results that exceeded our expectations. We saw a significant impact almost immediately.",
        author: "Google",
      },
      {
        quote: "A true partner in our success.",
        text: "They are more than just a service provider; they are a true partner. Their insights and dedication are invaluable to our operations.",
        author: "Uber",
      },
      {
        quote: "Reliable, innovative, and top-quality.",
        text: "We rely on them for critical parts of our business, and they have never failed to deliver. Highly innovative and always professional.",
        author: "Starbucks",
      },
    ];

    // --- Ambil elemen dari HTML ---
    const mainQuoteEl = document.getElementById("main-quote");
    const reviewTextEl = document.getElementById("review-text");
    const authorNameEl = document.getElementById("author-name");
    const paginationDotsEl = document.getElementById("pagination-dots");

    let currentTestimonialIndex = 0;

    // --- Fungsi untuk menampilkan testimoni ---
    function showTestimonial(index) {
      const testimonial = testimonials[index];

      // Tambahkan class 'fading' untuk memicu animasi
      mainQuoteEl.classList.add("fading");
      reviewTextEl.classList.add("fading");
      authorNameEl.classList.add("fading");

      // Tunggu animasi selesai, lalu ganti teks
      setTimeout(() => {
        mainQuoteEl.textContent = testimonial.quote;
        reviewTextEl.textContent = testimonial.text;
        authorNameEl.textContent = testimonial.author;

        // Hapus class 'fading' untuk memunculkan teks baru
        mainQuoteEl.classList.remove("fading");
        reviewTextEl.classList.remove("fading");
        authorNameEl.classList.remove("fading");
      }, 500); // Waktu harus cocok dengan transisi di CSS

      // Update dot yang aktif
      updateDots(index);
    }

    // --- Fungsi untuk membuat dan mengupdate dots ---
    function setupDots() {
      testimonials.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) {
          dot.classList.add("active");
        }
        paginationDotsEl.appendChild(dot);
      });
    }

    function updateDots(index) {
      const dots = paginationDotsEl.children;
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle("active", i === index);
      }
    }

    // --- Otomatisasi Slider ---
    function nextTestimonial() {
      currentTestimonialIndex =
        (currentTestimonialIndex + 1) % testimonials.length;
      showTestimonial(currentTestimonialIndex);
    }

    // Inisialisasi
    setupDots();
    showTestimonial(0); // Tampilkan testimoni pertama
    setInterval(nextTestimonial, 5000); // Ganti testimoni setiap 5 detik
  }

  // =================================================================
  // 3. ANIMASI ELEMEN SAAT MUNCUL DI LAYAR (INTERSECTION OBSERVER)
  // =================================================================
  const animatedElements = document.querySelectorAll(
    ".feature-card, .grid-card, .center-image, .project-card",
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Cek apakah elemen adalah bagian dari grid-card untuk delay berurutan
          if (entry.target.classList.contains("grid-card")) {
            const cards = Array.from(entry.target.parentElement.children);
            const index = cards.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add("visible");
            }, index * 100); // delay 100ms untuk setiap kartu
          } else {
            entry.target.classList.add("visible");
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
  // =================================================================
  // 4. FUNGSI UNTUK MEMBUAT KARTU BISA DIKLIK
  // =================================================================
  const clickableCards = document.querySelectorAll(
    ".grid-card, .project-card, .feature-card",
  );
  clickableCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // Mencegah aksi jika yang diklik adalah link di dalam kartu
      if (e.target.tagName.toLowerCase() !== "a") {
        console.log("Kartu diklik:", card.className);
        // Anda bisa menambahkan aksi di sini, contoh: window.location.href = '#';
      }
    });
  });
});
// =================================================================
// PORTFOLIO PROJECT DATA
// =================================================================
