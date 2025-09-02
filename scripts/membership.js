document.addEventListener('DOMContentLoaded', function() {
    const membershipForm = document.getElementById('membership-form');
    const otherSkillInput = document.getElementById('other-skill');
    const formMessage = document.getElementById('form-message');
    const submitBtn = membershipForm.querySelector('.submit-btn');
    const btnText = membershipForm.querySelector('.btn-text');
    const btnLoader = membershipForm.querySelector('.btn-loader');

    // Show/hide other skill text input
    document.querySelectorAll('input[name="skills"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === 'other' && this.checked) {
                otherSkillInput.style.display = 'block';
            } else if (this.value === 'other' && !this.checked) {
                otherSkillInput.style.display = 'none';
                otherSkillInput.value = '';
            }
        });
    });

    // Form submission
    if (membershipForm) {
        membershipForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            
            try {
                // Get form data
                const formData = new FormData(membershipForm);
                const data = {};
                
                // Convert FormData to object
                formData.forEach((value, key) => {
                    // Handle checkboxes
                    if (key === 'skills') {
                        if (!data[key]) data[key] = [];
                        data[key].push(value);
                    } else {
                        data[key] = value;
                    }
                });
                
                // Handle other skills
                if (data.skills && data.skills.includes('other') && otherSkillInput.value) {
                    const otherIndex = data.skills.indexOf('other');
                    data.skills[otherIndex] = `other: ${otherSkillInput.value}`;
                }
                
                // Here you would typically send the data to a server
                // For now, we'll simulate a successful submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showMessage('Thank you for your membership application! We will review your information and get back to you soon.', 'success');
                
                // Reset form
                membershipForm.reset();
                otherSkillInput.style.display = 'none';
                
                // In a real application, you would redirect or show a thank you page
                // window.location.href = 'thank-you.html';
                
            } catch (error) {
                console.error('Error submitting form:', error);
                showMessage('There was an error submitting your application. Please try again later.', 'error');
            } finally {
                // Hide loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });
    }
    
    // Terms modal (placeholder - you'll need to implement this)
    const termsLink = document.getElementById('terms-link');
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Terms and Conditions will be displayed here.');
            // In a real implementation, you would show a modal with the terms
        });
    }
    
    // Helper function to show messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide message after 10 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 10000);
    }
    
    // Form validation
    function validateForm() {
        // Add any additional client-side validation here
        return true;
    }
});
