// Zubair Shoes - Premium Interactive Script

document.addEventListener('DOMContentLoaded', () => {
    console.log('Zubair Shoes initialized.');

    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            if(navMenu) navMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            let isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true' || false;
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }

    // Sticky Navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 10px 30px rgba(255,123,0,0.15)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            } else {
                navbar.style.boxShadow = 'var(--shadow)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            }
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === '#' || href === 'javascript:void(0)') return;
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if(mobileToggle) mobileToggle.classList.remove('active');
                }
            }
        });
    });

    // Quick Add interactions with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            const x = e.pageX - (btn.offsetLeft || 0);
            const y = e.pageY - (btn.offsetTop || 0);
            btn.style.setProperty('--x', x + 'px');
            btn.style.setProperty('--y', y + 'px');
        });
    });

    // Handle cart quick add
    let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
    const cartCountElement = document.getElementById('cartCount');
    
    function updateCart() {
        if(cartCountElement) {
            cartCountElement.textContent = cartCount;
            // Add a little pop animation
            cartCountElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
    updateCart();

    const quickAddButtons = document.querySelectorAll('.quick-add, .btn-primary:not([type="submit"])');
    quickAddButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(btn.tagName === 'BUTTON' || btn.classList.contains('quick-add') || btn.textContent.toLowerCase().includes('add to cart')) {
                // Determine if it is actually a navigation button
                const href = btn.getAttribute('href');
                if (href && href !== '#' && href !== 'javascript:void(0)' && !href.includes('cart.html')) {
                    // Let navigation happen
                    return;
                }
                
                e.preventDefault();
                cartCount++;
                localStorage.setItem('cartCount', cartCount);
                updateCart();
                
                // Show a mini toast
                showToast('Item added to cart!');
            }
        });
    });

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;
        toast.style.position = 'fixed';
        toast.style.bottom = '20px';
        toast.style.right = '20px';
        toast.style.backgroundColor = 'var(--primary-color)';
        toast.style.color = 'white';
        toast.style.padding = '12px 24px';
        toast.style.borderRadius = '8px';
        toast.style.boxShadow = '0 5px 15px rgba(255,123,0,0.3)';
        toast.style.zIndex = '10000';
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        toast.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.transform = 'translateY(100px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
});

// === BEST SELLERS CAROUSEL & DATA ===
document.addEventListener('DOMContentLoaded', () => {
    const bestsellersTrack = document.getElementById('bestsellersTrack');
    
    if (bestsellersTrack) {
        const products = [
            {
                id: 1, name: 'Zubair Classic Formal', brand: 'Zubair Premium',
                price: '₹7,500', originalPrice: '₹9,000', badge: 'Sale',
                image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&auto=format&fit=crop',
                rating: 5
            },
            {
                id: 2, name: 'Zubair Urban Sneaker', brand: 'Zubair Street',
                price: '₹4,800', originalPrice: '₹6,000', badge: 'New',
                image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&auto=format&fit=crop',
                rating: 4
            },
            {
                id: 3, name: 'Zubair Rugged Boot', brand: 'Zubair Outdoors',
                price: '₹8,200', originalPrice: '₹10,500', badge: '',
                image: 'https://images.unsplash.com/photo-1549639426-52d8332557c6?w=400&auto=format&fit=crop',
                rating: 5
            },
            {
                id: 4, name: 'Zubair Comfort Slip-On', brand: 'Zubair Essentials',
                price: '₹3,200', originalPrice: '₹4,500', badge: 'Popular',
                image: 'https://images.unsplash.com/photo-1560769629-975e13f0c470?w=400&auto=format&fit=crop',
                rating: 4
            },
            {
                id: 5, name: 'Zubair Elite Oxford', brand: 'Zubair Premium',
                price: '₹8,900', originalPrice: '₹12,000', badge: '',
                image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&auto=format&fit=crop',
                rating: 5
            }
        ];

        bestsellersTrack.innerHTML = products.map(p => {
            let starsHtml = '';
            for(let i=0; i<5; i++) {
                starsHtml += i < p.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
            }
            
            let badgeHtml = p.badge ? '<span class="product-badge">' + p.badge + '</span>' : '';

            return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${p.image}" alt="${p.name}">
                    ${badgeHtml}
                    <button class="wishlist-btn"><i class="far fa-heart"></i></button>
                    <button class="quick-add">Quick Add</button>
                </div>
                <div class="product-info">
                    <span class="product-brand">${p.brand}</span>
                    <h3 class="product-title">${p.name}</h3>
                    <div class="product-price">
                        <span class="current-price">${p.price}</span>
                        <span class="original-price">${p.originalPrice}</span>
                    </div>
                    <div class="product-rating">
                        <div class="stars">${starsHtml}</div>
                    </div>
                </div>
            </div>
            `;
        }).join('');

        // Carousel Sliding Logic
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        let currentScroll = 0;

        const scrollAmount = 300; // approximate card width + gap

        if(prevBtn && nextBtn) {
            nextBtn.addEventListener('click', () => {
                const maxScroll = bestsellersTrack.scrollWidth - bestsellersTrack.clientWidth;
                if(currentScroll < maxScroll) {
                    currentScroll += scrollAmount;
                    if(currentScroll > maxScroll) currentScroll = maxScroll;
                    bestsellersTrack.style.transform = `translateX(-${currentScroll}px)`;
                }
            });

            prevBtn.addEventListener('click', () => {
                if(currentScroll > 0) {
                    currentScroll -= scrollAmount;
                    if(currentScroll < 0) currentScroll = 0;
                    bestsellersTrack.style.transform = `translateX(-${currentScroll}px)`;
                }
            });
        }
        
        const dynamicAddBtns = bestsellersTrack.querySelectorAll('.quick-add');
        dynamicAddBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let cartCount = parseInt(localStorage.getItem('cartCount') || '0');
                cartCount++;
                localStorage.setItem('cartCount', cartCount);
                
                const cartCountElement = document.getElementById('cartCount');
                if(cartCountElement) {
                    cartCountElement.textContent = cartCount;
                    cartCountElement.style.transform = 'scale(1.3)';
                    setTimeout(() => { cartCountElement.style.transform = 'scale(1)'; }, 200);
                }
                
                const toast = document.createElement('div');
                toast.className = 'toast-message';
                toast.textContent = 'Item added to cart!';
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.right = '20px';
                toast.style.backgroundColor = 'var(--primary-color)';
                toast.style.color = 'white';
                toast.style.padding = '12px 24px';
                toast.style.borderRadius = '8px';
                toast.style.boxShadow = '0 5px 15px rgba(255,123,0,0.3)';
                toast.style.zIndex = '10000';
                toast.style.transform = 'translateY(100px)';
                toast.style.opacity = '0';
                toast.style.transition = 'all 0.3s ease';
                document.body.appendChild(toast);
                
                requestAnimationFrame(() => {
                    toast.style.transform = 'translateY(0)';
                    toast.style.opacity = '1';
                });

                setTimeout(() => {
                    toast.style.transform = 'translateY(100px)';
                    toast.style.opacity = '0';
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            });
        });
    }
});

// === TESTIMONIAL SLIDER ===
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('testimonialDots');
    
    if(slides.length > 0 && dotsContainer) {
        slides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = `dot ${idx === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
                goToSlide(idx);
            });
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        let currentSlide = 0;

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }
});
