// Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const newsForm = document.getElementById('news-upload-form');
    const clearNewsForm = document.getElementById('clear-news-form');
    const donationForm = document.getElementById('donation-form');
    const contactForm = document.getElementById('contact-form');

    // Clear News Form
    if (clearNewsForm) {
        clearNewsForm.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear the form?')) {
                newsForm.reset();
            }
        });
    }

    // Handle News Form Submission
    if (newsForm) {
        newsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(newsForm);
            const newsItem = {
                title: formData.get('title'),
                date: formData.get('date'),
                content: formData.get('content'),
                image: formData.get('image')
            };

            // Validate required fields
            if (!newsItem.title || !newsItem.date || !newsItem.content) {
                alert('Please fill in all required fields');
                return;
            }

            // Show confirmation dialog
            const confirmationMessage = `Are you sure you want to publish this news?\n\n` +
                `Title: ${newsItem.title}\n` +
                `Date: ${newsItem.date}\n` +
                `Content: ${newsItem.content.substring(0, 100)}${newsItem.content.length > 100 ? '...' : ''}`;

            if (confirm(confirmationMessage)) {
                // Here you would typically send this to a server
                console.log('News item to be published:', newsItem);
                
                // Show success message
                alert('✅ News item published successfully!');
                newsForm.reset();
            }
        });
    }

    // Handle Donation Form Submission
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(donationForm);
            const donation = {
                name: formData.get('name'),
                email: formData.get('email'),
                amount: formData.get('amount'),
                paymentMethod: formData.get('payment-method'),
                purpose: formData.get('purpose'),
                message: formData.get('message'),
                statement: formData.get('statement')
            };

            // Validate required fields
            if (!donation.name || !donation.email || !donation.amount || !donation.paymentMethod) {
                alert('Please fill in all required fields');
                return;
            }

            // Format amount with currency
            const amount = parseFloat(donation.amount).toLocaleString('en-ET', {
                style: 'currency',
                currency: 'ETB',
                minimumFractionDigits: 2
            });

            // Show confirmation dialog
            const paymentMethodText = {
                'cbe': 'Commercial Bank of Ethiopia',
                'amhara': 'Amhara Bank',
                'telebirr': 'Telebirr',
                'cbe-birr': 'CBE Birr'
            }[donation.paymentMethod] || donation.paymentMethod;

            const confirmationMessage = `Please confirm your donation details:\n\n` +
                `Name: ${donation.name}\n` +
                `Email: ${donation.email}\n` +
                `Amount: ${amount}\n` +
                `Payment Method: ${paymentMethodText}\n` +
                `Purpose: ${donation.purpose || 'General Donation'}\n\n` +
                `Click OK to confirm your donation.`;

            if (confirm(confirmationMessage)) {
                // Here you would typically send this to a server
                console.log('Donation submitted:', donation);
                
                // Show thank you message
                alert(`🙏 Thank you for your generous donation of ${amount}, ${donation.name}!\n\n` +
                      `A confirmation has been sent to ${donation.email}.`);
                donationForm.reset();
            }
        });
    }

    // Format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    // Auto-hide admin section for non-admin users
    // In a real app, this would be handled by server-side authentication
    const adminSection = document.getElementById('admin-news-form');
    if (adminSection && !isAdminUser()) {
        adminSection.style.display = 'none';
    }

    // Helper function to check admin status
    function isAdminUser() {
        // In a real app, this would check the user's authentication status
        // For now, we'll use a simple check for demo purposes
        return window.location.search.includes('admin=true');
    }

    // Handle Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const contactData = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Validate required fields
            if (!contactData.name || !contactData.email || !contactData.message) {
                showAlert('Please fill in all required fields', 'error');
                return;
            }

            // Validate email format
            if (!isValidEmail(contactData.email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }

            // Show confirmation dialog
            const confirmationMessage = `Please confirm your message details:\n\n` +
                `Name: ${contactData.name}\n` +
                `Email: ${contactData.email}\n` +
                `Subject: ${contactData.subject || 'No Subject'}\n` +
                `Message: ${contactData.message.substring(0, 150)}${contactData.message.length > 150 ? '...' : ''}`;

            if (confirm(confirmationMessage)) {
                // Here you would typically send this to a server
                console.log('Contact form submitted:', contactData);
                
                // Show success message
                showAlert('📬 Your message has been sent successfully!\n\n' +
                        'We will get back to you as soon as possible.', 'success');
                contactForm.reset();
            }
        });
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Helper function to show styled alerts
    function showAlert(message, type = 'info') {
        // Check if custom alert exists, if not create one
        let alertDiv = document.getElementById('custom-alert');
        if (!alertDiv) {
            alertDiv = document.createElement('div');
            alertDiv.id = 'custom-alert';
            alertDiv.style.position = 'fixed';
            alertDiv.style.top = '20px';
            alertDiv.style.right = '20px';
            alertDiv.style.padding = '15px 25px';
            alertDiv.style.borderRadius = '4px';
            alertDiv.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            alertDiv.style.zIndex = '1000';
            alertDiv.style.transition = 'all 0.3s ease';
            alertDiv.style.maxWidth = '350px';
            alertDiv.style.transform = 'translateX(120%)';
            alertDiv.style.opacity = '0';
            document.body.appendChild(alertDiv);
        }

        // Set alert content and style based on type
        alertDiv.textContent = message;
        
        // Reset styles
        alertDiv.style.color = '#fff';
        
        switch(type) {
            case 'success':
                alertDiv.style.backgroundColor = '#4caf50';
                break;
            case 'error':
                alertDiv.style.backgroundColor = '#f44336';
                break;
            case 'warning':
                alertDiv.style.backgroundColor = '#ff9800';
                break;
            default:
                alertDiv.style.backgroundColor = '#2196f3';
                alertDiv.style.color = '#fff';
        }

        // Show alert
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(0)';
            alertDiv.style.opacity = '1';
        }, 10);

        // Hide alert after 5 seconds
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(120%)';
            alertDiv.style.opacity = '0';
        }, 5000);
    }
});
