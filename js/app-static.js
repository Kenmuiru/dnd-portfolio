// Static app.js - Uses LocalStorage and data.js (No Backend Required)

// State
let projects = [];
let categories = ['ankara', 'street', 'eloise', 'official', 'kids', 'casual']; // Default categories
let currentFilter = 'all';

// DOM Elements & Initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Static App initialized');

    // Load initial data
    loadStartData();

    // Elements
    const portfolioGrid = document.getElementById('portfolio-grid');
    const portfolioFilters = document.getElementById('portfolio-filters');
    const adminModal = document.getElementById('admin-modal');
    const closeModal = document.querySelector('.close-modal');
    const uploadForm = document.getElementById('upload-form');
    const categoryForm = document.getElementById('category-form');
    const categorySelect = document.getElementById('p-category');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const tabBtns = document.querySelectorAll('.admin-tab-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Initial Render
    if (portfolioFilters) renderFilters(portfolioFilters);
    if (portfolioGrid) renderProjects(portfolioGrid);
    if (categorySelect) renderCategoryOptions(categorySelect);

    // Login Page Logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('username').value;
            const p = document.getElementById('password').value;
            const msg = document.getElementById('errorMessage');
            const btn = loginForm.querySelector('button');

            if (u === 'admin' && p === 'admin123') {
                localStorage.setItem('isLoggedIn', 'true');
                btn.textContent = '✅ Success!';
                setTimeout(() => {
                    window.location.href = 'index.html?admin=true';
                }, 500);
            } else {
                msg.classList.add('show');
                setTimeout(() => msg.classList.remove('show'), 3000);
            }
        });
        return; // Stop other listeners if on login page
    }

    // Check Login State
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === 'true' || localStorage.getItem('isLoggedIn') === 'true';
    const adminNavBtn = document.getElementById('admin-nav-btn');
    const adminLink = document.getElementById('admin-link');

    if (isAdmin && adminNavBtn) {
        adminNavBtn.style.display = 'block';
        if (urlParams.get('admin') === 'true') {
            // Auto-open modal if redirected from login
            if (adminModal) adminModal.classList.remove('hidden');
        }
    }

    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (adminModal) adminModal.classList.remove('hidden');
            refreshAdminViews();
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'index.html';
        });
    }

    // UI Listeners
    if (closeModal) closeModal.addEventListener('click', () => toggleModal(adminModal));
    window.addEventListener('click', (e) => { if (e.target === adminModal) toggleModal(adminModal); });

    if (uploadForm) uploadForm.addEventListener('submit', handleUpload);
    if (categoryForm) categoryForm.addEventListener('submit', handleAddCategory);

    // Image Preview
    const imageFileInput = document.getElementById('p-image-file');
    if (imageFileInput) {
        imageFileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    document.getElementById('preview-img').src = ev.target.result;
                    document.getElementById('image-preview').style.display = 'block';
                    // We can't really upload in static mode, so we just use the filename
                    // OR we could use the Base64 data (limited storage)
                    // For now, let's just pretend and use the local path instructions
                    document.getElementById('p-image').value = "Images/" + file.name;
                    document.getElementById('copy-reminder').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    if (tabBtns) {
        tabBtns.forEach(btn => btn.addEventListener('click', handleTabSwitch));
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                lightbox.classList.remove('active');
            }
        });
    }
});

// Logic Functions
function loadStartData() {
    // Categories
    const savedCats = localStorage.getItem('dnd_categories');
    if (savedCats) {
        categories = JSON.parse(savedCats);
    }

    // Projects (Merge initial data with local additions)
    const localProjects = JSON.parse(localStorage.getItem('dnd_projects') || '[]');

    // Combine initialProjects (from data.js) and localProjects
    // We filter initialProjects to avoid duplicates if they were somehow saved locally?
    // Actually, simple merge is best for now.
    projects = [...(window.initialProjects || []), ...localProjects];
    console.log(`Loaded ${projects.length} projects`);
}

function handleUpload(e) {
    e.preventDefault();
    const title = document.getElementById('p-title').value;
    const desc = document.getElementById('p-desc').value;
    const cat = document.getElementById('p-category').value;
    // For static, we assume the user put the image in the folder
    const imgName = document.getElementById('p-image').value || "Images/default.jpg";

    const newProject = {
        id: Date.now(),
        title,
        description: desc,
        category: cat,
        image: imgName,
        isLocal: true // Mark as user-added
    };

    // Save to LocalStorage
    const localProjects = JSON.parse(localStorage.getItem('dnd_projects') || '[]');
    localProjects.push(newProject);
    localStorage.setItem('dnd_projects', JSON.stringify(localProjects));

    // Update state
    projects.push(newProject);

    // Refresh UI
    renderProjects(document.getElementById('portfolio-grid'));
    refreshAdminViews();

    // Reset form
    e.target.reset();
    document.getElementById('image-preview').style.display = 'none';
    alert('Project Added! (Saved to Browser Storage)');
}

function handleDeleteProject(id) {
    if (!confirm('Delete this project? (Reload page to restore default projects)')) return;

    // Remove from state
    projects = projects.filter(p => p.id !== id);
    renderProjects(document.getElementById('portfolio-grid'));
    refreshAdminViews();

    // Remove from LocalStorage
    let localProjects = JSON.parse(localStorage.getItem('dnd_projects') || '[]');
    localProjects = localProjects.filter(p => p.id !== id);
    localStorage.setItem('dnd_projects', JSON.stringify(localProjects));
}

function handleAddCategory(e) {
    e.preventDefault();
    const name = document.getElementById('new-category-name').value.trim();
    if (name && !categories.includes(name.toLowerCase())) {
        categories.push(name.toLowerCase());
        localStorage.setItem('dnd_categories', JSON.stringify(categories));

        // Refresh
        renderFilters(document.getElementById('portfolio-filters'));
        refreshAdminViews();
        e.target.reset();
    }
}

function handleDeleteCategory(cat) {
    if (!confirm('Delete category?')) return;
    categories = categories.filter(c => c !== cat);
    localStorage.setItem('dnd_categories', JSON.stringify(categories));
    refreshAdminViews();
    renderFilters(document.getElementById('portfolio-filters'));
}

// Render Functions (Simplified)
function renderFilters(container) {
    container.innerHTML = '<button class="filter-btn active" onclick="setFilter(\'all\', this)">All</button>';
    categories.forEach(cat => {
        container.innerHTML += `<button class="filter-btn" onclick="setFilter('${cat}', this)">${cat.toUpperCase()}</button>`;
    });
}

window.setFilter = function (cat, btn) {
    currentFilter = cat;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProjects(document.getElementById('portfolio-grid'));
};

function renderProjects(container) {
    container.innerHTML = '';
    const filtered = currentFilter === 'all' ? projects : projects.filter(p => p.category === currentFilter);

    if (!filtered.length) {
        container.innerHTML = '<p class="no-projects">No projects found.</p>';
        return;
    }

    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = 'portfolio-item fade-in';
        div.innerHTML = `
            <img src="${p.image}" alt="${p.title}" onclick="openLightbox('${p.image}')">
            <div class="portfolio-info">
                <span>${p.category.toUpperCase()}</span>
                <h3>${p.title}</h3>
                <p>${p.description}</p>
            </div>
        `;
        container.appendChild(div);
    });
}

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    lb.querySelector('img').src = src;
    lb.classList.add('active');
}

function toggleModal(modal) {
    modal.classList.toggle('hidden');
}

function handleTabSwitch(e) {
    document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.admin-tab-content').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    document.getElementById(e.target.dataset.tab).classList.add('active');
}

function renderCategoryOptions(select) {
    select.innerHTML = '';
    categories.forEach(c => {
        select.innerHTML += `<option value="${c}">${c.toUpperCase()}</option>`;
    });
}

function refreshAdminViews() {
    renderCategoryOptions(document.getElementById('p-category'));
    renderProjectManagement();
    renderCategoryManagement();
}

function renderProjectManagement() {
    const list = document.getElementById('projects-list');
    list.innerHTML = '';
    projects.forEach(p => {
        list.innerHTML += `
            <div class="admin-item">
                <div class="admin-item-info"><b>${p.title}</b> (${p.category})</div>
                <button class="btn-delete" onclick="handleDeleteProject(${p.id})">Delete</button>
            </div>`;
    });
}

function renderCategoryManagement() {
    const list = document.getElementById('categories-list');
    list.innerHTML = '';
    categories.forEach(c => {
        list.innerHTML += `
            <div class="admin-item">
                <div class="admin-item-info"><b>${c.toUpperCase()}</b></div>
                <button class="btn-delete" onclick="handleDeleteCategory('${c}')">Delete</button>
            </div>`;
    });
}
