document.addEventListener('DOMContentLoaded', () => {
    // Scroll revealing sections
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Update nav link active state
                const id = entry.target.getAttribute('id');
                if (id) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });

    // Carousel Logic
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.work-card');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    const dotsContainer = document.querySelector('.carousel-dots');

    if (track && cards.length > 0) {
        let currentIndex = 0;
        const totalItems = cards.length;
        let slideIntervalId;
        const autoSlideDelay = 4000;

        function getItemsPerScreen() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 900) return 2;
            return 3;
        }

        function createDots() {
            dotsContainer.innerHTML = '';
            const items = getItemsPerScreen();
            const slidesNeeded = Math.ceil(totalItems / (items === 1 ? 1 : 1)); // Simplified dot logic: one dot per slide/move?
            // "Osushi-like" usually means one dot per page or per item. 
            // Let's do one dot per valid starting index aka Total Items - Visible + 1? 
            // Or simpler: One dot per item effectively, but handling bounds.
            // Let's stick to: One dot per item, indicating the START item.

            // To be robust: One dot for every possible start index.
            // Max index is totalItems - itemsPerScreen.
            // But loop logic makes it tricky.
            // Let's just create as many dots as total items for simplicity and map index directly.

            for (let i = 0; i < totalItems - (getItemsPerScreen() - 1); i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    currentIndex = i;
                    updateCarousel();
                    resetAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = document.querySelectorAll('.carousel-dot');
            dots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        function updateCarousel() {
            const itemsPerScreen = getItemsPerScreen();
            const maxIndex = totalItems - itemsPerScreen;

            // Boundary checks
            if (currentIndex > maxIndex) currentIndex = 0; // Loop back to start
            if (currentIndex < 0) currentIndex = maxIndex; // Loop to end

            const cardWidth = cards[0].offsetWidth;
            const gap = 20;
            const moveAmount = (cardWidth + gap) * currentIndex;
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Re-generate dots if needed (responsive changes) or just update active class
            // Ideally createDots only on resize, updateDots on move. 
            // But maxIndex changes on resize, so we need to handle that.
            // For now, let's keep it simple: update classes.
            // Note: If resizing changed maxIndex, dots count might be wrong. 
            // Ideally we re-run createDots on resize.
            updateDots();
        }

        function moveNext() {
            currentIndex++;
            updateCarousel();
        }

        function movePrev() {
            currentIndex--;
            updateCarousel();
        }

        function startAutoSlide() {
            slideIntervalId = setInterval(moveNext, autoSlideDelay);
        }

        function resetAutoSlide() {
            clearInterval(slideIntervalId);
            startAutoSlide();
        }

        // Event Listeners
        nextButton.addEventListener('click', () => {
            moveNext();
            resetAutoSlide();
        });

        prevButton.addEventListener('click', () => {
            movePrev();
            resetAutoSlide();
        });

        window.addEventListener('resize', () => {
            createDots(); // Re-create dots based on new screen size (since maxIndex might change)
            updateCarousel();
        });

        // Initialize
        createDots();
        startAutoSlide();
    }

    // Hero Slideshow Logic
    const heroTrack = document.querySelector('.hero-slideshow-track');
    const heroSlides = document.querySelectorAll('.hero-slide');

    if (heroTrack && heroSlides.length > 0) {
        let heroIndex = 0;
        const heroTotal = heroSlides.length;

        function updateHeroSlide() {
            heroIndex++;
            if (heroIndex >= heroTotal) {
                heroIndex = 0;
            }
            const moveAmount = 100 * heroIndex;
            heroTrack.style.transform = `translateX(-${moveAmount}%)`;
        }

        setInterval(updateHeroSlide, 4000); // 4 seconds
    }
});
