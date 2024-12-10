/** @format */

// Navbar showing and not showing on scroll
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const navbar = document.querySelector(".NavContainer");

  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 80) {
      // Scrolling down and scrolled past 80px
      navbar.classList.add("hidden");
    } else if (scrollTop < lastScrollTop) {
      // Scrolling up
      navbar.classList.remove("hidden");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Reset on top
  });
});

// Toggle Hamburger menu
function toggleMenu() {
  document.getElementById("LinkContainer").classList.toggle("show");
}

// Select all filter buttons and project cards
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".ProjectCard");

// Function to filter project cards based on category
function filterProjects(category) {
  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    if (category === "all" || cardCategory === category) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Add event listeners to each filter button
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove 'active' class from all buttons and add to the clicked button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Get the category from the clicked button and filter projects
    const category = button.getAttribute("data-category");
    filterProjects(category);
  });
});

// Make content small
document.addEventListener("DOMContentLoaded", function () {
  const descriptionElements = document.getElementsByClassName("description");

  Array.from(descriptionElements).forEach((descriptionElement) => {
    const originalText = descriptionElement.textContent;

    if (originalText.length > 100) {
      descriptionElement.innerHTML =
        originalText.substring(0, 100) + "<strong>....Read More</strong>";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const subjectInput = document.getElementById("subjectInput");

  if (nameInput && subjectInput) {
    nameInput.addEventListener("input", () => {
      const nameValue = nameInput.value || "unknown";
      subjectInput.value = `New submission from ${nameValue}`;
    });
  } else {
    console.error("Required elements not found in the DOM.");
  }
});
