// Select all filter buttons and project cards
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.ProjectCard');

// Function to filter project cards based on category
function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Add event listeners to each filter button
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons and add to the clicked button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Get the category from the clicked button and filter projects
        const category = button.getAttribute('data-category');
        filterProjects(category);
    });
});
