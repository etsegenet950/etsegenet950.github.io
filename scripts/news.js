document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('news-form');
  const list = document.getElementById('news-list');
  const imageInput = document.getElementById('news-image');
  const imageName = document.getElementById('news-image-name');
  const clearImageBtn = document.getElementById('clear-news-image');

  const LS_KEY = 'news_posts_v1';

  if (!form || !list) return;

  function loadPosts() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function savePosts(posts) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(posts));
    } catch {}
  }

  function renderPosts() {
    const posts = loadPosts().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    list.innerHTML = '';

    if (!posts.length) {
      // No empty-state text per request; leave the list area blank.
      return;
    }

    posts.forEach(post => {
      const card = document.createElement('div');
      card.className = 'about-card';
      card.dataset.id = post.id;

      const title = document.createElement('h3');
      title.textContent = post.title;

      const meta = document.createElement('small');
      meta.style.display = 'block';
      meta.style.marginBottom = '0.5rem';
      meta.textContent = post.date || '';

      const content = document.createElement('p');
      content.textContent = post.content;

      card.appendChild(title);
      card.appendChild(meta);

      if (post.imageDataUrl) {
        const isVideo = post.imageDataUrl.startsWith('data:video/');
        
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
