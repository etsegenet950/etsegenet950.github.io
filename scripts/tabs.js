document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    // Function to show a specific tab
    function showTab(targetTabId) {
        // Hide all tab contents and deactivate all buttons
        tabContents.forEach(content => content.classList.remove('active'));
        tabButtons.forEach(button => button.classList.remove('active'));

        // Show the target tab content
        const targetContent = document.getElementById(targetTabId);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Activate the target button
        const targetButton = document.querySelector(`[data-tab="${targetTabId}"]`);
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    // Add click event listeners to all tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTabId = this.getAttribute('data-tab');
            showTab(targetTabId);
        });
    });

    // Initialize with the 'home' tab active by default
    showTab('home');

    // Toggle How We Help grid when its title is clicked
    const howWeHelpSection = document.querySelector('.quick-nav-section');
    const howWeHelpTitle = howWeHelpSection ? howWeHelpSection.querySelector('h2') : null;
    if (howWeHelpTitle && howWeHelpSection) {
        function toggleHelp(e) {
            if (e) { e.preventDefault(); }
            howWeHelpSection.classList.toggle('collapsed');
        }
        howWeHelpTitle.addEventListener('click', toggleHelp);
        howWeHelpTitle.addEventListener('touchstart', toggleHelp);
    }
});
