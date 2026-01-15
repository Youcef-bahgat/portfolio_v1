// Enhanced Mobile Navigation with smooth transitions
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

// Toggle menu with animation
menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.classList.toggle('active');
    menuBtn.style.transform = navLinks.classList.contains('active') 
        ? 'rotate(90deg)' 
        : 'rotate(0deg)';
    
    // Animate menu items
    if (navLinks.classList.contains('active')) {
        navItems.forEach((item, index) => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        });
        document.body.style.overflow = 'hidden';
    } else {
        navItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
        });
        document.body.style.overflow = '';
    }
});

// Close menu on link click with animation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.style.transform = 'rotate(0deg)';
        navItems.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
        });
        document.body.style.overflow = '';
    });
});

// Enhanced smooth scrolling with dynamic offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Dynamic offset based on screen size
            const offset = window.innerWidth <= 768 ? 70 : 90;
            
            // Smooth scroll with easing
            window.scrollTo({
                top: targetElement.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// Enhanced Navbar scroll effect with parallax
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    // Add/remove scrolled class with threshold
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Show/hide back to top button with fade effect
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// Back to top button with smooth animation
const backToTopBtn = document.createElement('button');
backToTopBtn.className = 'back-to-top';
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopBtn.setAttribute('aria-label', 'Back to top');
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
document.body.appendChild(backToTopBtn);

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Enhanced animated tools with better physics
const toolsContainer = document.getElementById('toolsContainer');
const toolLogos = [
    { name: 'Python', icon: 'python.png' },
    { name: 'SQL', icon: 'sql.png' },
    { name: 'Power BI', icon: 'power bi.png' },
    { name: 'Tableau', icon: 'tableau.png' },
    { name: 'OpenCV', icon: 'opencv.png' },
    { name: 'Excel', icon: 'excel.png' },
    { name: 'Scikit-learn', icon: 'scikit.png' },
];

// Create flying tool icons with enhanced physics
function createToolIcons() {
    if (!toolsContainer) return;
    
    toolsContainer.innerHTML = '';
    
    const isMobile = window.innerWidth <= 768;
    const maxTools = isMobile ? 8 : toolLogos.length;
    const toolsToShow = toolLogos.slice(0, maxTools);
    const animations = [];
    
    toolsToShow.forEach((tool, index) => {
        const toolElement = document.createElement('div');
        toolElement.className = 'tool-icon';
        toolElement.setAttribute('data-tool', tool.name);
        
        const containerWidth = toolsContainer.offsetWidth;
        const containerHeight = toolsContainer.offsetHeight;
        const iconSize = isMobile ? 50 : 75;
        
        // Random initial position
        const randomX = Math.random() * (containerWidth - iconSize);
        const randomY = Math.random() * (containerHeight - iconSize);
        const randomRotate = Math.random() * 360;
        
        toolElement.style.left = `${randomX}px`;
        toolElement.style.top = `${randomY}px`;
        toolElement.style.transform = `rotate(${randomRotate}deg)`;
        
        // Create image element
        const img = document.createElement('img');
        img.src = `assets/logos/${tool.icon}`;
        img.alt = tool.name;
        img.title = tool.name;
        img.loading = "lazy";
        
        img.onerror = function() {
            this.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'tool-fallback';
            fallback.textContent = tool.name.charAt(0);
            toolElement.appendChild(fallback);
        };
        
        toolElement.appendChild(img);
        toolsContainer.appendChild(toolElement);
        
        // Start animation with delay
        setTimeout(() => {
            const cleanup = animateTool(toolElement, isMobile);
            animations.push(cleanup);
        }, index * 150);
    });
    
    // Return cleanup function
    return () => {
        animations.forEach(cleanup => cleanup && cleanup());
    };
}

// Enhanced animation with improved physics
function animateTool(toolElement, isMobile) {
    let x = parseFloat(toolElement.style.left) || 0;
    let y = parseFloat(toolElement.style.top) || 0;
    let rotation = 0;
    let rotationSpeed = (Math.random() - 0.5) * 0.8;
    let vx = (Math.random() - 0.5) * (isMobile ? 0.8 : 1.5);
    let vy = (Math.random() - 0.5) * (isMobile ? 0.8 : 1.5);
    let isPaused = false;
    let animationId = null;
    
    const iconSize = isMobile ? 50 : 75;
    const friction = 0.99;
    const bounceFactor = 0.8;
    
    function update() {
        if (!toolsContainer.parentElement || isPaused) return;
        
        const containerWidth = toolsContainer.offsetWidth;
        const containerHeight = toolsContainer.offsetHeight;
        
        // Update velocity with friction
        vx *= friction;
        vy *= friction;
        
        // Update position
        x += vx;
        y += vy;
        rotation += rotationSpeed;
        
        // Boundary collision with bounce
        if (x <= 0) {
            x = 0;
            vx = -vx * bounceFactor;
            rotationSpeed = -rotationSpeed * 0.9;
        } else if (x >= containerWidth - iconSize) {
            x = containerWidth - iconSize;
            vx = -vx * bounceFactor;
            rotationSpeed = -rotationSpeed * 0.9;
        }
        
        if (y <= 0) {
            y = 0;
            vy = -vy * bounceFactor;
            rotationSpeed = -rotationSpeed * 0.9;
        } else if (y >= containerHeight - iconSize) {
            y = containerHeight - iconSize;
            vy = -vy * bounceFactor;
            rotationSpeed = -rotationSpeed * 0.9;
        }
        
        // Apply transformations
        toolElement.style.left = `${x}px`;
        toolElement.style.top = `${y}px`;
        toolElement.style.transform = `rotate(${rotation}deg)`;
        
        animationId = requestAnimationFrame(update);
    }
    
    // Interaction handlers
    const handleInteraction = () => {
        isPaused = true;
        toolElement.style.transform = 'scale(1.2) rotate(5deg)';
        toolElement.style.zIndex = '100';
    };
    
    const handleInteractionEnd = () => {
        isPaused = false;
        toolElement.style.zIndex = '1';
        update();
    };
    
    // Event listeners
    toolElement.addEventListener('mouseenter', handleInteraction);
    toolElement.addEventListener('touchstart', handleInteraction, { passive: true });
    toolElement.addEventListener('mouseleave', handleInteractionEnd);
    toolElement.addEventListener('touchend', handleInteractionEnd);
    toolElement.addEventListener('touchcancel', handleInteractionEnd);
    
    // Start animation
    update();
    
    // Cleanup function
    return () => {
        if (animationId) cancelAnimationFrame(animationId);
        toolElement.removeEventListener('mouseenter', handleInteraction);
        toolElement.removeEventListener('touchstart', handleInteraction);
        toolElement.removeEventListener('mouseleave', handleInteractionEnd);
        toolElement.removeEventListener('touchend', handleInteractionEnd);
        toolElement.removeEventListener('touchcancel', handleInteractionEnd);
    };
}

// Enhanced timeline animation with intersection observer
function setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => observer.observe(item));
}

// Enhanced project cards animation
function setupProjectsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => observer.observe(card));
}

// Enhanced project click handler
function setupProjectLinks() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `View ${card.querySelector('h3').textContent} project on GitHub`);
        
        const handleClick = (e) => {
            if (e.target.closest('.project-link')) return;
            
            const githubLink = card.getAttribute('data-github');
            if (githubLink) {
                // Ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.width = '100%';
                ripple.style.height = '100%';
                ripple.style.background = 'radial-gradient(circle, rgba(0,173,181,0.3) 0%, transparent 70%)';
                ripple.style.top = '0';
                ripple.style.left = '0';
                ripple.style.borderRadius = '25px';
                ripple.style.animation = 'ripple 0.6s ease-out';
                card.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
                
                // Open link after animation
                setTimeout(() => {
                    window.open(githubLink, '_blank', 'noopener,noreferrer');
                }, 300);
            }
        };
        
        card.addEventListener('click', handleClick);
        card.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick(e);
            }
        });
        
        // GitHub link
        const githubLinkElement = card.querySelector('.project-link');
        if (githubLinkElement) {
            githubLinkElement.addEventListener('click', (e) => {
                e.stopPropagation();
                const githubLink = card.getAttribute('data-github');
                if (githubLink) {
                    window.open(githubLink, '_blank', 'noopener,noreferrer');
                }
            });
        }
    });
}

// Enhanced WhatsApp contact with vibration feedback (if supported)
function setupWhatsAppContact() {
    const whatsappItem = document.getElementById('whatsapp-contact');
    
    if (whatsappItem) {
        const phoneNumber = '201024339216';
        const defaultMessage = encodeURIComponent("Hello Youssef! I saw your portfolio and would like to discuss potential opportunities.");
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
        
        whatsappItem.addEventListener('click', function() {
            // Visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Vibration feedback if supported
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // Open WhatsApp
            window.open(whatsappLink, '_blank', 'noopener,noreferrer');
        });
        
        whatsappItem.setAttribute('role', 'button');
        whatsappItem.setAttribute('tabindex', '0');
        whatsappItem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                whatsappItem.click();
            }
        });
    }
}

// Fix social links
function fixSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        let href = link.getAttribute('href');
        if (href && !href.startsWith('http')) {
            if (href.includes('linkedin.com')) {
                link.href = 'https://' + href;
            }
        }
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    });
}

// Parallax effect for sections
function setupParallax() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.backgroundPosition = `center ${yPos}px`;
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Fix social links
    fixSocialLinks();
    
    // Setup interactions
    setupWhatsAppContact();
    setupProjectLinks();
    
    // Create animated tools
    let cleanupTools = createToolIcons();
    
    // Setup animations
    setupTimelineAnimation();
    setupProjectsAnimation();
    
    // Setup parallax
    setupParallax();
    
    // Scroll event listener
    window.addEventListener('scroll', updateNavbar, { passive: true });
    
    // Initial navbar state
    updateNavbar();
    
    // Handle window resize with cleanup
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (cleanupTools) cleanupTools();
            cleanupTools = createToolIcons();
        }, 250);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            if (cleanupTools) cleanupTools();
            cleanupTools = createToolIcons();
        }, 300);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console greeting
console.log(`
%c🚀 YOUSSEF BAHGAT - AI ENGINEER & DATA SCIENTIST
%c✨ Professional Portfolio v2.0
%c📱 Fully responsive | 🎨 Professional design | ⚡ High performance
`, 
'color: #00ADB5; font-size: 18px; font-weight: bold;',
'color: #00d4ff; font-size: 14px;',
'color: #EEEEEE; font-size: 12px; font-style: italic;'
);