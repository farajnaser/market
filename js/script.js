document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Add a subtle fade-in effect to elements as they scroll into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply starting hidden styles to elements that will animate
    const animateElements = document.querySelectorAll('.philosophy-content, .product-card, .store-column, .footer-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Modal Logic
    const contactModal = document.getElementById('contactModal');
    const notifyBtns = document.querySelectorAll('.notify-btn, .open-modal-link');
    const closeModal = document.querySelector('.close-modal');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    if (contactModal) {
        notifyBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Ignore the form's specific submit button inside the modal
                if (btn.classList.contains('form-btn')) return;

                e.preventDefault();
                contactModal.classList.add('active');
            });
        });

        const closeFunc = () => {
            contactModal.classList.remove('active');
        };

        if (closeModal) closeModal.addEventListener('click', closeFunc);
        if (modalBackdrop) modalBackdrop.addEventListener('click', closeFunc);

        // Product Order linking to Modal
        const purchaseBtns = document.querySelectorAll('.purchase-btn');
        const messageField = document.getElementById('message');

        purchaseBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.hasAttribute('disabled')) return;

                const productInfo = btn.closest('.item-info');
                const productName = productInfo ? productInfo.querySelector('h4').innerText : '';

                contactModal.classList.add('active');

                if (messageField) {
                    messageField.value = `I would like to order:\n${productName}\n\nPlease provide me with the next steps regarding shipping and payment.`;
                }
            });
        });
    }

    // Gallery Filtering Logic
    const categoryLinks = document.querySelectorAll('.category-link');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryTitle = document.getElementById('gallery-title');

    categoryLinks.forEach(link => {
        link.addEventListener('click', () => {
            const filter = link.getAttribute('data-filter');
            let titleText = "All Products";

            if (filter === 'decor') titleText = "Home Decor Products";
            if (filter === 'beauty') titleText = "Beauty & Care Products";
            if (filter === 'fashion') titleText = "Fashion Accessories";

            if (galleryTitle) galleryTitle.innerText = titleText;

            galleryItems.forEach(item => {
                if (item.getAttribute('data-category') === filter || filter === 'all') {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });

            // Reveal the gallery smoothly
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.classList.remove('hidden-gallery');
                setTimeout(() => {
                    gallerySection.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }
        });
    });
});
