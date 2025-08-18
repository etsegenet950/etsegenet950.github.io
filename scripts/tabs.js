// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    var tabButtons = document.querySelectorAll('.tab-button');
    var tabContents = document.querySelectorAll('.tab-content');
    var howWeHelpSection = document.querySelector('.quick-nav-section');
    var howWeHelpTitle = null;
    if (howWeHelpSection) {
        howWeHelpTitle = howWeHelpSection.querySelector('h2');
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

    // Initialize with the first tab active (About Us)
    showTab('about');

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
