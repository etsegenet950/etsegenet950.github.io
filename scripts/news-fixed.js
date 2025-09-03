// News Management Script for Fanos Lehulu Charity Organization

// Prevent multiple initializations
if (!window.newsInitialized) {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing news functionality...');
    
    // DOM Elements
    const newsForm = document.getElementById('news-form');
    const newsContainer = document.getElementById('news-container');
    const adminNewsForm = document.getElementById('admin-news-form');
    const LS_KEY = 'fanos_lehulu_news';
    
    // Check if required elements exist
    if (!newsContainer) {
      console.error('News container element not found');
      return;
    }
    
    // Check if admin mode is enabled
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true';
    
    // Initialize the news functionality
    initNews();
    
    function initNews() {
    // Set up admin form if in admin mode
    if (isAdmin && adminNewsForm) {
      adminNewsForm.style.display = 'block';
      
      // Set up form if it exists
      if (newsForm) {
        setupFormListeners();
        setDefaultDate();
      }
    }
    
    // Mark as initialized
    window.newsInitialized = true;
    
    // Initial render of news
    renderNews();

    // Setup delete listener for admin
    if (isAdmin) {
      newsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('delete-news-btn')) {
          const articleId = parseInt(e.target.getAttribute('data-id'));
          deleteNews(articleId);
        }
      });
    }
  }
  
  // Load news from local storage
  function loadNews() {
    try {
      const savedNews = localStorage.getItem(LS_KEY);
      return savedNews ? JSON.parse(savedNews) : [];
    } catch (error) {
      console.error('Error loading news:', error);
      return [];
    }
  }
  
  // Save news to local storage
  function saveNews(news) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(news));
      return true;
    } catch (error) {
      console.error('Error saving news:', error);
      return false;
    }
  }
  
  // Format date to readable format
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  // Render news articles
  function renderNews() {
    const news = loadNews();
    
    if (news.length === 0) {
      newsContainer.innerHTML = '<p>No news articles found. Check back later for updates!</p>';
      return;
    }
    
    let html = '<div class="news-grid">';
    
    // Sort news by date (newest first)
    const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedNews.forEach(article => {
      const date = article.date ? formatDate(article.date) : 'No date';
      const image = article.image ? 
        `<img src="${article.image}" alt="${article.title}" class="news-image" onerror="this.style.display='none';">` : 
        '';
      
      const adminControls = isAdmin ? 
        `<button class="delete-news-btn" data-id="${article.id}" title="Delete Article">&times;</button>` : 
        '';

      html += `
        <div class="news-card">
          ${adminControls}
          ${image}
          <div class="news-content">
            <h3>${article.title || 'Untitled Article'}</h3>
            <div class="news-meta">${date}</div>
            <div class="news-text">${(article.content || '').replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    newsContainer.innerHTML = html;
  }

  // Delete a news article
  function deleteNews(id) {
    if (!confirm('Are you sure you want to delete this news article?')) {
      return;
    }
    let news = loadNews();
    news = news.filter(article => article.id !== id);
    if (saveNews(news)) {
      renderNews();
      alert('Article deleted successfully.');
    } else {
      alert('Failed to delete article.');
    }
  }
  
  // Set up form event listeners
  function setupFormListeners() {
    if (!newsForm) return;
    
    // Set default date
    setDefaultDate();
    
    // Handle form submission
    newsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('news-title')?.value.trim() || '';
      const date = document.getElementById('news-date')?.value || new Date().toISOString().split('T')[0];
      const image = document.getElementById('news-image')?.value.trim() || '';
      const content = document.getElementById('news-content')?.value.trim() || '';
      
      // Basic validation
      if (!title || !content) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Create new article
      const news = loadNews();
      const newArticle = {
        id: Date.now(),
        title,
        date,
        image: image || null,
        content,
        createdAt: new Date().toISOString()
      };
      
      // Add to beginning of array (newest first)
      news.unshift(newArticle);
      
      // Save and update display
      if (saveNews(news)) {
        renderNews();
        newsForm.reset();
        setDefaultDate();
        alert('News article published successfully!');
      } else {
        alert('Failed to save news article. Please try again.');
      }
    });
  }
  
  // Set default date to today's date
  function setDefaultDate() {
    const dateInput = document.getElementById('news-date');
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
  }
  
  // Initialize the news functionality
  initNews();
  
  // Mark as initialized
  window.newsInitialized = true;
  
  // Initial render of news
  renderNews();
  
  // Expose necessary functions to window if needed
  window.loadNews = loadNews;
  window.saveNews = saveNews;
  window.renderNews = renderNews;
  
  }); // End of DOMContentLoaded
} // End of if (!window.newsInitialized)
