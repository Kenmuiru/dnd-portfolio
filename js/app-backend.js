// API-based app.js - Migrated from localStorage to backend API
// State
let projects = [];
let categories = [];
let currentFilter = 'all';

// DOM Elements & Initialization
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 D&D Portfolio: BACKEND MODE V2.0 ACTIVE');

    // Elements
    const portfolioGrid = document.getElementById('portfolio-grid');
    const portfolioFilters = document.getElementById('portfolio-filters');
    const adminModal = document.getElementById('admin-modal');
    const closeModal = document.querySelector('.close-modal');
    const uploadForm = document.getElementById('upload-form');
    const categoryForm = document.getElementById('category-form');
    const categorySelect = document.getElementById('p-category');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Admin tab buttons
    const tabBtns = document.querySelectorAll('.admin-tab-btn');

    // Load data from API
    try {
        await loadCategories();
        await loadProjects();
    } catch (error) {
        console.error('Failed to load initial data:', error);
        showNotification('Failed to load portfolio data. Please refresh the page.', 'error');
    }

    // Initial Render
    if (portfolioFilters) renderFilters(portfolioFilters);
    if (portfolioGrid) renderProjects(portfolioGrid);
    if (categorySelect) renderCategoryOptions(categorySelect);

    // Event Listeners
    // Check if admin is authenticated via login page
    const urlParams = new URLSearchParams(window.location.search);
    const isAdminMode = urlParams.get('admin') === 'true';
    const token = getAuthToken();

    // Show/hide admin button in navigation based on authentication
    const adminNavBtn = document.getElementById('admin-nav-btn');
    const adminLink = document.getElementById('admin-link');

    if (token && adminNavBtn) {
        // Verify token is still valid
        try {
            await apiCall(API_CONFIG.ENDPOINTS.VERIFY, { method: 'POST' });
            adminNavBtn.style.display = 'block';

            // Handle admin link click
            if (adminLink) {
                adminLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (adminModal) {
                        adminModal.classList.remove('hidden');
                        refreshAdminViews();
                    }
                });
            }
        } catch (error) {
            // Token invalid, clear it
            clearAuthToken();
        }
    }

    if (isAdminMode && token) {
        // Open admin panel automatically for authenticated users
        if (adminModal) {
            adminModal.classList.remove('hidden');
            refreshAdminViews();
            console.log('✅ Admin access granted via login');
        }
    }

    if (closeModal) closeModal.addEventListener('click', () => toggleModal(adminModal));

    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            handleUpload(e, portfolioGrid, adminModal, uploadForm);
        });
    }

    if (categoryForm) {
        categoryForm.addEventListener('submit', (e) => {
            handleAddCategory(e, categorySelect, portfolioFilters);
        });
    }

    // Password change form
    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            handlePasswordChange(e);
        });
    }

    // Image file input handler
    const imageFileInput = document.getElementById('p-image-file');
    const imagePreview = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');
    const copyReminder = document.getElementById('copy-reminder');

    if (imageFileInput) {
        imageFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // Show preview
                const reader = new FileReader();
                reader.onload = (event) => {
                    previewImg.src = event.target.result;
                    imagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);

                // Show reminder - image will be uploaded to server
                copyReminder.style.display = 'block';
                copyReminder.textContent = `📋 "${file.name}" will be uploaded to the server when you submit.`;
            }
        });
    }

    // Admin tabs
    if (tabBtns) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => handleTabSwitch(e));
        });
    }

    // Lightbox Listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            toggleModal(adminModal);
        }
    });

    // Logout button functionality
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Clear session
            clearAuthToken();

            // Close admin modal
            if (adminModal) {
                adminModal.classList.add('hidden');
            }

            // Redirect to main page
            window.location.href = 'index.html';

            console.log('✅ Admin logged out successfully');
        });
    }
});

// API Functions
async function loadProjects() {
    try {
        const data = await apiCall(API_CONFIG.ENDPOINTS.PROJECTS, { method: 'GET' });
        projects = data.projects || [];
        console.log(`Loaded ${projects.length} projects from API`);
    } catch (error) {
        console.error('Failed to load projects:', error);
        projects = [];
        throw error;
    }
}

async function loadCategories() {
    try {
        const data = await apiCall(API_CONFIG.ENDPOINTS.CATEGORIES, { method: 'GET' });
        categories = data.categories || [];
        console.log(`Loaded ${categories.length} categories from API`);
    } catch (error) {
        console.error('Failed to load categories:', error);
        categories = [];
        throw error;
    }
}

// Functions
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    if (lightbox && lightboxImg) {
        // Handle API image paths
        const imageUrl = imageSrc.startsWith('/uploads/')
            ? API_CONFIG.BASE_URL.replace('/api', '') + imageSrc
            : imageSrc;
        lightboxImg.src = imageUrl;
        lightbox.classList.add('active');
    }
}

function handleTabSwitch(e) {
    const targetTab = e.target.dataset.tab;

    // Update buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Update content
    document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(targetTab).classList.add('active');

    // Refresh content for the active tab
    if (targetTab === 'manage-projects') {
        renderProjectManagement();
    } else if (targetTab === 'manage-categories') {
        renderCategoryManagement();
    }
}

function refreshAdminViews() {
    renderProjectManagement();
    renderCategoryManagement();
    renderCategoryOptions(document.getElementById('p-category'));
}

function renderFilters(container) {
    if (!container) return;
    container.innerHTML = '<button class="filter-btn active" data-filter="all">All</button>';

    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = `filter-btn ${currentFilter === cat ? 'active' : ''}`;
        btn.dataset.filter = cat;
        btn.textContent = formatCategoryName(cat);
        container.appendChild(btn);
    });

    // Re-attach listeners
    const btns = container.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => handleFilter(e, btns, document.getElementById('portfolio-grid')));
    });
}

function renderCategoryOptions(selectElement) {
    if (!selectElement) return;
    selectElement.innerHTML = '';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = formatCategoryName(cat);
        selectElement.appendChild(option);
    });
}

function renderProjectManagement() {
    const container = document.getElementById('projects-list');
    if (!container) return;

    if (projects.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center;">No projects yet.</p>';
        return;
    }

    container.innerHTML = '';
    projects.forEach(project => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        item.innerHTML = `
            <div class="admin-item-info">
                <div class="admin-item-title">${project.title}</div>
                <div class="admin-item-meta">${formatCategoryName(project.category)} | ID: ${project.id}</div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-delete" onclick="handleDeleteProject(${project.id})">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
}

function renderCategoryManagement() {
    const container = document.getElementById('categories-list');
    if (!container) return;

    if (categories.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center;">No categories yet.</p>';
        return;
    }

    container.innerHTML = '';
    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'admin-item';
        const projectCount = projects.filter(p => p.category === cat).length;
        item.innerHTML = `
            <div class="admin-item-info">
                <div class="admin-item-title">${formatCategoryName(cat)}</div>
                <div class="admin-item-meta">${projectCount} project${projectCount !== 1 ? 's' : ''}</div>
            </div>
            <div class="admin-item-actions">
                <button class="btn-delete" onclick="handleDeleteCategory('${cat}')">Delete</button>
            </div>
        `;
        container.appendChild(item);
    });
}

async function handleDeleteProject(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    if (confirm(`Delete "${project.title}"? This cannot be undone.`)) {
        try {
            await apiCall(API_CONFIG.ENDPOINTS.PROJECT_BY_ID(projectId), { method: 'DELETE' });

            // Reload projects
            await loadProjects();
            renderProjects(document.getElementById('portfolio-grid'));
            renderProjectManagement();

            showNotification('Project deleted successfully!', 'success');
        } catch (error) {
            showNotification('Failed to delete project: ' + error.message, 'error');
        }
    }
}

async function handleDeleteCategory(categorySlug) {
    const projectCount = projects.filter(p => p.category === categorySlug).length;
    const message = projectCount > 0
        ? `Delete category "${formatCategoryName(categorySlug)}"? This will also delete ${projectCount} project${projectCount !== 1 ? 's' : ''} in this category. This cannot be undone.`
        : `Delete category "${formatCategoryName(categorySlug)}"?`;

    if (confirm(message)) {
        try {
            await apiCall(API_CONFIG.ENDPOINTS.CATEGORY_BY_SLUG(categorySlug), { method: 'DELETE' });

            // Reload data
            await loadCategories();
            await loadProjects();

            renderFilters(document.getElementById('portfolio-filters'));
            renderProjects(document.getElementById('portfolio-grid'));
            renderCategoryManagement();
            renderProjectManagement();
            renderCategoryOptions(document.getElementById('p-category'));

            showNotification('Category deleted successfully!', 'success');
        } catch (error) {
            showNotification('Failed to delete category: ' + error.message, 'error');
        }
    }
}

function formatCategoryName(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function renderProjects(gridElement) {
    if (!gridElement) return;
    gridElement.innerHTML = '';

    const filteredProjects = currentFilter === 'all'
        ? projects
        : projects.filter(p => p.category === currentFilter);

    if (filteredProjects.length === 0) {
        gridElement.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #888;">No projects in this category yet.</p>';
        return;
    }

    filteredProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'portfolio-item fade-in';

        // Handle image paths from API
        const imageUrl = project.image.startsWith('/uploads/')
            ? API_CONFIG.BASE_URL.replace('/api', '') + project.image
            : project.image;

        card.innerHTML = `
            <img src="${imageUrl}" alt="${project.title}" class="portfolio-img" onclick="openLightbox('${project.image}')">
            <div class="portfolio-info">
                <span>${project.category.toUpperCase()}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            </div>
        `;
        gridElement.appendChild(card);
    });
}

function handleFilter(e, buttons, gridElement) {
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    currentFilter = e.target.dataset.filter;
    renderProjects(gridElement);
}

function toggleModal(modal) {
    if (modal) modal.classList.toggle('hidden');
}

async function handleAddCategory(e, selectElement, filterContainer) {
    e.preventDefault();
    const input = document.getElementById('new-category-name');
    const newCategoryName = input.value.trim();

    if (!newCategoryName) {
        showNotification('Please enter a category name', 'error');
        return;
    }

    try {
        await apiCall(API_CONFIG.ENDPOINTS.CATEGORIES, {
            method: 'POST',
            body: JSON.stringify({ name: newCategoryName })
        });

        // Reload categories
        await loadCategories();

        renderFilters(filterContainer);
        renderCategoryOptions(selectElement);
        renderCategoryManagement();
        input.value = '';

        showNotification(`Category "${newCategoryName}" added!`, 'success');
    } catch (error) {
        showNotification('Failed to add category: ' + error.message, 'error');
    }
}

async function handleUpload(e, gridElement, modal, form) {
    e.preventDefault();

    const title = document.getElementById('p-title').value;
    const description = document.getElementById('p-desc').value;
    const category = document.getElementById('p-category').value;
    const imageFile = document.getElementById('p-image-file').files[0];

    if (!imageFile) {
        showNotification('Please select an image file', 'error');
        return;
    }

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('image', imageFile);

    try {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Uploading...';
        submitBtn.disabled = true;

        await apiCall(API_CONFIG.ENDPOINTS.PROJECTS, {
            method: 'POST',
            body: formData,
            isMultipart: true
        });

        // Reload projects
        await loadProjects();
        renderProjects(gridElement);
        renderProjectManagement();
        form.reset();

        // Clear image preview
        const imagePreview = document.getElementById('image-preview');
        const copyReminder = document.getElementById('copy-reminder');
        const imageFileInput = document.getElementById('p-image-file');
        if (imagePreview) imagePreview.style.display = 'none';
        if (copyReminder) copyReminder.style.display = 'none';
        if (imageFileInput) imageFileInput.value = '';

        showNotification('Project uploaded successfully!', 'success');

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        showNotification('Failed to upload project: ' + error.message, 'error');

        // Reset button
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = 'Add Project';
        submitBtn.disabled = false;
    }
}

async function handlePasswordChange(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Validate new password length
    if (newPassword.length < 6) {
        showNotification('❌ New password must be at least 6 characters long!', 'error');
        return;
    }

    // Validate password confirmation
    if (newPassword !== confirmPassword) {
        showNotification('❌ New passwords do not match!', 'error');
        return;
    }

    try {
        await apiCall(API_CONFIG.ENDPOINTS.CHANGE_PASSWORD, {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        });

        // Clear form
        document.getElementById('password-form').reset();

        showNotification('✅ Password updated successfully!', 'success');
    } catch (error) {
        showNotification('❌ ' + error.message, 'error');
    }
}

// Notification helper
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
if (!document.getElementById('notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}
