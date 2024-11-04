const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const projectContainer = document.querySelector('.ProjectGridContainer');
const filterButtons = document.querySelectorAll('.filter-btn');
let projectCards = document.querySelectorAll('.ProjectCard'); // Initially, all cards
let currentIndex = 0;
const rotationInterval = 3000;

// Function to update the carousel display
function updateCarousel() {
  const cardWidth = projectContainer.clientWidth / 3;
  projectContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

// Event listeners for carousel navigation buttons
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % getVisibleCards().length;
  updateCarousel();
  resetAutoRotate();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + getVisibleCards().length) % getVisibleCards().length;
  updateCarousel();
  resetAutoRotate();
});

// Auto-rotate function
let autoRotateInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % getVisibleCards().length;
  updateCarousel();
}, rotationInterval);

// Function to reset auto-rotation
function resetAutoRotate() {
  clearInterval(autoRotateInterval);
  autoRotateInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % getVisibleCards().length;
    updateCarousel();
  }, rotationInterval);
}

function getVisibleCards() {
  return Array.from(projectCards).filter(card => card.style.display !== 'none');
}

// Filter functionality
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.getAttribute('data-category');

    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      if (category === 'all' || cardCategory === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    currentIndex = 0;
    updateCarousel();
    resetAutoRotate();
  });
});
