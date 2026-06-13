// Custom JavaScript for REDDY BOOK .CLUB NFT Marketplace

document.addEventListener("DOMContentLoaded", () => {
  // --- 3D Coverflow Slider for "Popular this week" ---
  const slider = document.querySelector(".popular-slider");
  const cards = Array.from(document.querySelectorAll(".slider-card"));

  if (slider && cards.length === 5) {
    // Initial positions map: card at index 0 gets pos-0, index 1 gets pos-1, etc.
    let positions = [0, 1, 2, 3, 4];

    function updatePositions() {
      cards.forEach((card, index) => {
        // Remove existing positioning classes
        for (let i = 0; i < 5; i++) {
          card.classList.remove(`pos-${i}`);
        }
        card.classList.remove("active"); // Fallback cleanup

        // Assign new position class based on current state
        const currentPos = positions[index];
        card.classList.add(`pos-${currentPos}`);
      });
    }

    // Setup initial display
    updatePositions();

    function nextSlide() {
      // Shift the array positions: the card that was at pos 1 goes to pos 0, wrapping around.
      positions = positions.map((p) => (p - 1 + 5) % 5);
      updatePositions();
    }

    // Auto slide every 3 seconds
    let slideInterval = setInterval(nextSlide, 3000);

    // Pause auto-sliding when the user hovers over the slider container
    slider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    // Resume auto-sliding when the mouse leaves the container
    slider.addEventListener("mouseleave", () => {
      slideInterval = setInterval(nextSlide, 3000);
    });

    // Allow manual clicking on cards to make them the center (pos-2)
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const clickedPos = positions[index];

        // If it's already the center card, do nothing
        if (clickedPos === 2) return;

        // Calculate how many shifts are needed to bring clicked card to position 2
        let shifts = 2 - clickedPos;

        // Apply shifts to all cards (adding 5 ensures we don't get negative mods)
        positions = positions.map((p) => (p + shifts + 5) % 5);
        updatePositions();

        // Reset the auto-slide timer
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
      });
    });
  }

  // Initialize AOS Animation
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800, // Default animation duration
      once: true, // Whether animation should happen only once - while scrolling down
      offset: 100, // Offset (in px) from the original trigger point
      easing: "ease-out-cubic", // Easing curve
    });
  }
});
