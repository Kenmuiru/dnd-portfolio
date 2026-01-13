// API Configuration
const API_CONFIG = {
    // Production API URL (Railway backend)
    // Dynamic API URL: Local vs Production (Render)
    BASE_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:5000/api' // Only use local server if explicitly on localhost
        : (window.location.hostname.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
            ? `http://${window.location.hostname}:5000/api` // LAN IP
            : 'https://dnd-portfolio.onrender.com/api'), // DEFAULT: Use Live Render (Handles file:// and Netlify)

    DEBUG: true,

    ENDPOINTS: {
        // Auth
        LOGIN: '/auth/login',
        VERIFY: '/auth/verify',
        CHANGE_PASSWORD: '/auth/change-password',

        // Projects
        PROJECTS: '/projects',
        PROJECT_BY_ID: (id) => `/projects/${id}`,

        // Categories
        CATEGORIES: '/categories',
        CATEGORY_BY_SLUG: (slug) => `/categories/${slug}`
    }
};

// Helper function to get auth token
function getAuthToken() {
    return sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
}

// Helper function to set auth token
function setAuthToken(token, remember = false) {
    if (remember) {
        localStorage.setItem('auth_token', token);
    } else {
        sessionStorage.setItem('auth_token', token);
    }
}

// Helper function to clear auth token
function clearAuthToken() {
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token');
}

// Helper function to make authenticated API calls
async function apiCall(endpoint, options = {}) {
    const url = API_CONFIG.BASE_URL + endpoint;
    const token = getAuthToken();

    const headers = {
        ...options.headers
    };

    // Add auth token if available (except for multipart/form-data)
    if (token && !options.isMultipart) {
        headers['Authorization'] = `Bearer ${token}`;
    } else if (token && options.isMultipart) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Add Content-Type for JSON (but not for multipart)
    if (!options.isMultipart && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const config = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        // Handle authentication errors
        if (response.status === 401) {
            clearAuthToken();
            if (window.location.pathname !== '/admin.html') {
                // Token expired or invalid
                console.warn('Authentication expired. Please login again.');
            }
            throw new Error(data.error || 'Authentication required');
        }

        if (!response.ok) {
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
}
