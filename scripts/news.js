// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded, initializing news...');
  
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
  
  // Show admin form if in admin mode
  if (isAdmin && adminNewsForm) {
    adminNewsForm.style.display = 'block';
  }
  
  // Initialize the news functionality
  initNews();
  
  function initNews() {
    console.log('Initializing news functionality...');
    
    // Set up form if it exists
    if (newsForm) {
      setupFormListeners();
      setDefaultDate();
    }
    
    // Initial render of news
    renderNews();
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
    
    news.forEach(article => {
      const date = article.date ? formatDate(article.date) : 'No date';
      const image = article.image ? 
        `<img src="${article.image}" alt="${article.title}" class="news-image">` : 
        '';
      
      html += `
        <div class="news-card">
          ${image}
          <div class="news-content">
            <h3>${article.title}</h3>
            <div class="news-meta">${date}</div>
            <div class="news-text">${article.content.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    newsContainer.innerHTML = html;
  }

  function setupFormListeners() {
    console.log('Setting up form event listeners');
    newsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const title = document.getElementById('news-title').value.trim();
      const date = document.getElementById('news-date').value || new Date().toISOString().split('T')[0];
      const image = document.getElementById('news-image').value.trim();
      const content = document.getElementById('news-content').value.trim();
      
      if (!title || !content) {
        alert('Please fill in all required fields');
        return;
      }
      
      const news = loadNews();
      const newArticle = {
        id: Date.now(),
        title,
        date,
        image: image || null,
        content,
        createdAt: new Date().toISOString()
      };
      
      news.unshift(newArticle); // Add new article to beginning of array
      
      if (saveNews(news)) {
        renderNews();
        newsForm.reset();
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
  
  // Close the DOMContentLoaded event listener
});
        
        if (isVideo) {
          const video = document.createElement('video');
          video.src = post.imageDataUrl;
          video.controls = true;
          video.style.width = '100%';
          video.style.borderRadius = '8px';
          video.style.margin = '0.5rem 0 0.75rem';
          video.style.maxHeight = '500px';
          card.appendChild(video);
        } else {
          const img = document.createElement('img');
          img.src = post.imageDataUrl;
          img.alt = post.title || 'News image';
          img.style.width = '100%';
          img.style.borderRadius = '8px';
          img.style.margin = '0.5rem 0 0.75rem';
          img.style.maxHeight = '500px';
          img.style.objectFit = 'contain';
          card.appendChild(img);
        }
      }

      card.appendChild(content);

      const actions = document.createElement('div');
      actions.style.display = 'flex';
      actions.style.justifyContent = 'flex-end';
      actions.style.gap = '0.5rem';
      actions.style.marginTop = '0.75rem';

      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'btn-secondary';
      del.textContent = 'Delete';
      del.addEventListener('click', function () {
        if (!confirm('Delete this news item?')) return;
        const current = loadPosts();
        const next = current.filter(p => p.id !== post.id);
        savePosts(next);
        renderPosts();
      });

      actions.appendChild(del);
      card.appendChild(actions);

      list.appendChild(card);
    });
  }

  function validateImage(file) {
    if (!file) return { ok: true };
    const allowed = [
      'image/jpeg', 'image/png', 'image/gif',
      'video/mp4', 'video/webm', 'video/quicktime'
    ];
    if (!allowed.includes(file.type)) {
      return { ok: false, msg: 'Invalid file type. Please upload an image (JPG, PNG, GIF) or video (MP4, WebM, QuickTime).' };
    }
    return { ok: true };
  }

  function clearImageSelection() {
    if (imageInput) imageInput.value = '';
    if (imageName) imageName.textContent = 'No file selected';
  }

  if (imageInput) {
    imageInput.addEventListener('change', function () {
      const f = imageInput.files && imageInput.files[0] ? imageInput.files[0] : null;
      imageName.textContent = f ? f.name : 'No file selected';
    });
  }

  if (clearImageBtn) {
    clearImageBtn.addEventListener('click', clearImageSelection);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const titleEl = document.getElementById('news-title');
    const dateEl = document.getElementById('news-date');
    const contentEl = document.getElementById('news-content');

    const title = titleEl?.value?.trim();
    const content = contentEl?.value?.trim();
    let date = dateEl?.value?.trim();

    if (!title || !content) {
      alert('Please fill in the Title and Content fields.');
      return;
    }

    if (!date) {
      const d = new Date();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      date = `${d.getFullYear()}-${mm}-${dd}`;
    }

    const file = imageInput && imageInput.files && imageInput.files[0] ? imageInput.files[0] : null;
    const imgCheck = validateImage(file);
    if (!imgCheck.ok) {
      alert(imgCheck.msg);
      return;
    }

    const posts = loadPosts();
    const basePost = {
      id: `n_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title,
      date,
      content,
      createdAt: Date.now()
    };

    function finish(post) {
      posts.push(post);
      savePosts(posts);
      renderPosts();
      form.reset();
      clearImageSelection();
      alert('News published successfully.');
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        finish({ ...basePost, imageDataUrl: reader.result });
      };
      reader.onerror = function () {
        alert('Failed to read the selected image.');
      };
      reader.readAsDataURL(file);
    } else {
      finish(basePost);
    }
  });

  // Initial load
  renderPosts();
});
