// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return; // Exit if no gallery grid found
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Image Gallery Modal');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('tabindex', '-1');
    
    // Create modal content
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close" aria-label="Close" tabindex="0">&times;</button>
            <div class="image-container">
                <div class="loading-spinner"></div>
                <img id="modal-image" src="" alt="" tabindex="-1">
            </div>
            <div class="modal-caption" aria-live="polite"></div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Get modal elements
    const modalImage = modal.querySelector('#modal-image');
    const modalContainer = modal.querySelector('.image-container');
    const modalCaption = modal.querySelector('.modal-caption');
    const closeBtn = modal.querySelector('.close');
    let currentIndex = -1;
    let galleryItems = [];
    
    // Initialize gallery items
    function initGallery() {
        galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
        
        // Move last 3 items to the beginning if there are at least 3 items
        if (galleryItems.length >= 3) {
            const lastThree = galleryItems.splice(-3);
            galleryItems = [...lastThree, ...galleryItems];
            
            // Re-append items in new order
            const galleryGrid = document.querySelector('.gallery-grid');
            if (galleryGrid) {
                galleryItems.forEach(item => galleryGrid.appendChild(item));
            }
        }
        
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            if (img) {
                // Set up click handler
                item.addEventListener('click', () => openModal(index));
                
                // Add keyboard support
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.setAttribute('aria-label', `View image ${index + 1}`);
                
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(index);
                    }
                });
                
                // Preload images
                if (img.complete) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    img.addEventListener('load', function() {
                        this.style.opacity = '1';
                    });
                }
            }
        });
    }
    
    // Open modal with specific image
    function openModal(index) {
        if (index < 0 || index >= galleryItems.length) return;
        
        const item = galleryItems[index];
        const img = item.querySelector('img');
        if (!img) return;
        
        currentIndex = index;
        
        // Update modal content
        modalImage.src = ''; // Clear previous image
        modalImage.alt = img.alt || '';
        modalCaption.textContent = img.alt || '';
        modalContainer.classList.add('loading');
        
        // Show modal
        document.body.style.overflow = 'hidden';
        modal.classList.add('active');
        
        // Load new image
        const newImage = new Image();
        newImage.onload = function() {
            modalImage.src = this.src;
            modalImage.onload = function() {
                modalContainer.classList.remove('loading');
                modalImage.classList.add('loaded');
                closeBtn.focus();
            };
        };
        newImage.src = img.src;
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to the gallery item that was clicked
        if (currentIndex >= 0 && galleryItems[currentIndex]) {
            galleryItems[currentIndex].focus();
        }
        
        // Clear the image after animation
        setTimeout(() => {
            modalImage.src = '';
            modalImage.alt = '';
            modalImage.classList.remove('loaded');
            modalContainer.classList.remove('loading');
        }, 300);
    }
    
    // Navigation functions
    function showNext() {
        if (currentIndex < galleryItems.length - 1) {
            openModal(currentIndex + 1);
        }
    }
    
    function showPrev() {
        if (currentIndex > 0) {
            openModal(currentIndex - 1);
        }
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    
    // Close when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
        }
    });
    
    // Initialize the gallery
    initGallery();
});
