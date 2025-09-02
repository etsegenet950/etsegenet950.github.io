// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and contents
    var tabButtons = document.querySelectorAll('.tab-button');
    var tabContents = document.querySelectorAll('.tab-content');
    var howWeHelpSection = document.querySelector('.quick-nav-section');
    var howWeHelpTitle = howWeHelpSection ? howWeHelpSection.querySelector('h2') : null;
    
    // Show the first tab by default if no tab is active
    if (!document.querySelector('.tab-content.active')) {
        tabContents[0].classList.add('active');
        tabButtons[0].classList.add('active');
    }

    // Function to show a specific tab
    function showTab(targetTab) {
        // Hide all tab contents
        Array.prototype.forEach.call(tabContents, function(content) {
            content.classList.remove('active');
        });

        // Remove active class from all buttons
        Array.prototype.forEach.call(tabButtons, function(button) {
            button.classList.remove('active');
        });

        // Show the target tab content
        var targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Add active class to the clicked button
        var targetButton = document.querySelector('[data-tab="' + targetTab + '"]');
        if (targetButton) {
            targetButton.classList.add('active');
        }
    }

    // Add click event listeners to all tab buttons
    Array.prototype.forEach.call(tabButtons, function(button) {
        function activateTab(e) {
            // Prevent duplicate firing on touch + click
            if (e) { e.preventDefault ? e.preventDefault() : null; }
            var targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
        }
        button.addEventListener('click', activateTab);
        button.addEventListener('touchstart', activateTab);
    });

    // Initialize with the home tab active
    showTab('home');
    
    // Ensure all tabs are properly initialized
    function initializeTabs() {
        // Show home tab by default
        document.getElementById('home').classList.add('active');
        
        // Add click handlers for all tabs
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                showTab(targetTab);
            });
        });
    }
    
    // Initialize tabs when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeTabs);
    } else {
        initializeTabs();
    }

    // Toggle How We Help grid when its title is clicked
    if (howWeHelpTitle && howWeHelpSection) {
        function toggleHelp(e){ if (e) { e.preventDefault ? e.preventDefault() : null; }
            if (howWeHelpSection.classList.contains('collapsed')) {
                howWeHelpSection.classList.remove('collapsed');
            } else {
                howWeHelpSection.classList.add('collapsed');
            }
        }
        howWeHelpTitle.addEventListener('click', toggleHelp);
        howWeHelpTitle.addEventListener('touchstart', toggleHelp);
    }
});
