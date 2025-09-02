document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = contactForm?.querySelector('button[type="submit"]');
    let isSubmitting = false;

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            if (isSubmitting) return;
            await handleFormSubmit();
        });
    }

    async function handleFormSubmit() {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        // Basic validation
        if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        if (!isValidEmail(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show confirmation dialog
        const summary = [
            'Please review your message:',
            '',
            'Name: ' + (data.name || ''),
            'Email: ' + (data.email || ''),
            (data.subject ? 'Subject: ' + data.subject : ''),
            'Message:',
            (data.message || ''),
            '',
            'Send this message?'
        ].filter(Boolean).join('\n');

        const shouldSend = confirm(summary);
        if (!shouldSend) return;

        // Disable submit button and show loading state
        isSubmitting = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Send data to server with CORS handling
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                mode: 'cors',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject || '',
                    message: data.message
                })
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.error || 'Failed to send message');
            }

            alert('Thank you, ' + data.name + '! ' + (result.message || 'Your message has been sent.'));
            contactForm.reset();
        } catch (error) {
            console.error('Error:', error);
            alert('Sorry, there was an error sending your message. Please try again later.');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            isSubmitting = false;
        }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});