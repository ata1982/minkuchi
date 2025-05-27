// Minkuchi Static Site JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Search functionality
    const searchInputs = document.querySelectorAll('.search-input, .hero-search-input');
    const searchButtons = document.querySelectorAll('.search-button, .hero-search-button');
    
    function handleSearch(input) {
        const query = input.value.trim();
        if (query) {
            // In a real application, this would trigger a search
            console.log('Searching for:', query);
            // For demo purposes, show alert
            alert(`「${query}」で検索中...`);
        }
    }
    
    // Add search event listeners
    searchButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            handleSearch(searchInputs[index]);
        });
    });
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(input);
            }
        });
    });

    // Category card click animation
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const categoryName = this.querySelector('.category-name').textContent;
            alert(`「${categoryName}」カテゴリを表示中...`);
        });
    });

    // Feature cards hover effect enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animatedElements = document.querySelectorAll('.feature-card, .category-card, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form validation for search inputs
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.trim();
            if (value.length > 50) {
                this.setCustomValidity('検索キーワードは50文字以内で入力してください');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-primary-large, .btn-secondary-large, .btn-outline-large, .btn-cta');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS animation for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .fade-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize fade-in animation for hero content
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-search, .hero-buttons, .hero-stats');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('fade-in');
        }, index * 200);
    });

    console.log('Minkuchi static site initialized successfully!');
});