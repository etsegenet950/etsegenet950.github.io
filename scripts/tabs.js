// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const howWeHelpSection = document.querySelector('.quick-nav-section');
    const howWeHelpTitle = howWeHelpSection?.querySelector('h2');

    // Function to show a specific tab
    function showTab(targetTab) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });

        // Show the target tab content
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Add active class to the clicked button
        const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
        });
    });

    // Initialize with the first tab active (About Us)
    showTab('about');

    // Toggle How We Help grid when its title is clicked
    if (howWeHelpTitle && howWeHelpSection) {
        howWeHelpTitle.addEventListener('click', () => {
            howWeHelpSection.classList.toggle('collapsed');
        });
    }
});
