// ========================================
// KIDNEY CAMPAIGN - JavaScript Functions
// ========================================

// Toast notification system
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// Update progress bar with real data
function updateProgress(raised, goal = 5000) {
    const percentage = Math.min((raised / goal) * 100, 100);
    const progressFill = document.getElementById('progress-fill');
    const raisedAmount = document.getElementById('raised-amount');
    
    if (progressFill) {
        progressFill.style.width = percentage + '%';
    }
    if (raisedAmount) {
        raisedAmount.textContent = '$' + Math.round(raised).toLocaleString();
    }
    
   
    // Update progress bar aria attributes
    const progressBar = document.querySelector('[role="progressbar"]');
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', Math.round(percentage));
        progressBar.setAttribute('aria-label', `Fundraising progress: $${Math.round(raised).toLocaleString()} of $${goal.toLocaleString()} dollars raised`);
    }
}

// Share functionality with improved UX
function setupShareButton() {
    const shareBtn = document.getElementById('share-btn');
    
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', async () => {
        const url = window.location.href;
        const title = 'WANTED: A KIDNEY - Help Todd Find a Living Donor';
        const text = 'Todd Lyman is seeking a living kidney donor. Every share increases the chances of finding a match. Please help spread the word!';
        
        // Check if Web Share API is supported
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url
                });
                showToast('Thanks for sharing!');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Error sharing:', err);
                    fallbackCopyToClipboard(url);
                }
            }
        } else {
            // Fallback: Copy to clipboard
            fallbackCopyToClipboard(url);
        }
    });
}

// Fallback clipboard functionality
async function fallbackCopyToClipboard(url) {
    try {
        await navigator.clipboard.writeText(url);
        showToast('✓ Link copied to clipboard! Share it on social media.');
    } catch (err) {
        console.error('Failed to copy:', err);
        // Last resort: show URL in toast
        showToast('Campaign URL: ' + url);
    }
}

// Fetch and update fundraising data from external source
async function fetchFundraisingData() {
    try {
        // Try to fetch from GoFundMe API alternative or your backend
        // This is a placeholder - can be replaced with real API
        const response = await fetch('/api/fundraising-data');
        
        if (response.ok) {
            const data = await response.json();
            updateProgress(data.raised, data.goal);
        } else {
            // Use default values
            updateProgress(0, 50000);
        }
    } catch (error) {
        console.log('Could not fetch fundraising data:', error);
        // Initialize with default values
        updateProgress(0, 50000);
    }
}

// Email validation helper
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle accessibility announcements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = message;
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        announcement.remove();
    }, 1000);
}

// Lazy load images for better performance
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Keyboard navigation enhancement for details elements
function setupDetailsKeyboardNav() {
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(details => {
        const summary = details.querySelector('summary');
        if (summary) {
            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    details.open = !details.open;
                }
            });
        }
    });
}

// Initialize analytics tracking
function setupAnalytics() {
    // Track key user interactions
    document.addEventListener('click', (e) => {
        const target = e.target;
        
        // Track button clicks
        if (target.matches('[class*="btn"]')) {
            const buttonText = target.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'button_text': buttonText,
                    'timestamp': new Date().toISOString()
                });
            }
        }
        
        // Track external links
        if (target.matches('a[target="_blank"]')) {
            const href = target.href;
            console.log('External link clicked:', href);
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    'link_url': href,
                    'link_text': target.textContent.trim()
                });
            }
        }
    });
    
    // Track time on page
    window.addEventListener('beforeunload', () => {
        const timeOnPage = Math.round((Date.now() - window.pageLoadTime) / 1000);
        console.log('Time on page:', timeOnPage + 's');
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_exit', {
                'time_on_page': timeOnPage
            });
        }
    });
    
    // Record page load time
    window.pageLoadTime = Date.now();
}

// Print page functionality
function setupPrintButton() {
    // Add print functionality if needed
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'p' || e.metaKey && e.key === 'p') {
            announceToScreenReader('Print dialog opened');
        }
    });
}

// Performance monitoring
function monitorPerformance() {
    if (window.performance && window.performance.timing) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', pageLoadTime + 'ms');
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'page_load_time', {
                    'load_time_ms': pageLoadTime
                });
            }
        });
    }
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    setupShareButton();
    fetchFundraisingData();
    setupLazyLoading();
    setupDetailsKeyboardNav();
    setupAnalytics();
    setupPrintButton();
    monitorPerformance();
    
    // Accessibility announcement
    announceToScreenReader('Page loaded successfully. Todd Lyman Kidney Campaign website is ready.');
    
    console.log('Kidney Campaign website initialized successfully');
});

// Refresh progress bar every 5 minutes for real-time updates
// ========================================
// Random Kidney Facts Feature
// ========================================
const kidneyFacts = [
    "You keep your old kidneys: In most cases, surgeons leave your original kidneys right where they are and place the new third kidney in the lower abdomen.",
    "The 'Paired Exchange' chain reaction: Mismatched donor and recipient pairs can join a pool to swap kidneys, creating a domino effect that can save dozens of lives across the country!",
    "The ultimate 'upgrade': While dialysis performs about 10% to 15% of the work of a healthy kidney, a transplanted kidney restores about 50% to 85% of normal function.",
    "The first successful human organ transplant in history was a kidney transplant, performed in Boston in 1954 between identical twins.",
    "A Nobel Prize-winning feat: Dr. Joseph Murray won the Nobel Prize in Medicine in 1990 for his groundbreaking work leading the first successful transplant in 1954.",
    "Living donors live just as long: Studies show that kidney donors have the same life expectancy as the general population, and the remaining kidney grows slightly to take over the work!",
    "Cats get kidney transplants too: Specialized veterinary universities can perform them for feline renal failure, provided the owner agrees to adopt the donor cat as well.",
    "Blood type isn't a hard barrier anymore: Modern desensitization treatments and paired-exchange programs mean a different blood type is no longer a dealbreaker.",
    "The oldest living donor: Age is just a number! The oldest known living kidney donor was 84 years old when she successfully donated a kidney to her grandson.",
    "An instant 'wake-up' in the OR: The exact moment new blood vessels are connected during surgery, the transplanted kidney often turns pink and begins working immediately right on the table!"
];

const factBtn = document.getElementById('fact-btn');

if (factBtn) {
    factBtn.addEventListener('click', () => {
        // Pick a random fact from the 10 options
        const randomIndex = Math.floor(Math.random() * kidneyFacts.length);
        const randomFact = kidneyFacts[randomIndex];
        
        // Use your site's native toast system (displays for 15 seconds)
        showToast(randomFact, 15000);
    });
}
