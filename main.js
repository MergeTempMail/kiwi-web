/**
 * =========================================================================
 * 🚀 KIWIPLAY APK UPDATE CONFIGURATION
 * -------------------------------------------------------------------------
 * When you upload a new APK, you can easily change the date, version, 
 * or APK link right here in this configuration object:
 * =========================================================================
 */
const UPDATE_CONFIG = {
    enabled: true,                         // Set to false to disable update notification
    showAlwaysOnOpen: true,                // If true, shows notification every time user opens the site
    version: 'v2.1.0',                     // Current latest APK version
    releaseDate: '22 November 2026',        // Today's release date
    useDynamicTodayDate: false,            // Set to true if you want it to always show the user's current date
    title: '22 Nov Update Available!',
    apkUrl: 'assets/KiwiPlay.apk',         // Path to your APK file
    apkFileName: 'KiwiPlay.apk',           // Download file name
    fileSize: '23.4 MB',                   // APK file size
    badgeText: '22 Nov Update',
    description: 'A new 22 Nov Update of KiwiPlay APK has been released today with enhanced 4K video playback, stability improvements, and bug fixes.',
    highlights: [
        '22 Nov Update: Released on 22 November 2026 with performance improvements',
        'Enhanced hardware-accelerated 4K/1080p video player engine',
        '100% verified, clean & safe direct APK installer'
    ]
};

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    hamburger.addEventListener('click', toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });


    // --- Interactive Phone Simulator ---
    const simTabs = document.querySelectorAll('.sim-tab');
    const simScreenImg = document.getElementById('sim-screen-img');
    const simCaption = document.getElementById('simulator-caption');

    // Image mapping from screen key to file name
    const screens = {
        library: {
            img: 'assets/images/library_screen.jpg',
            caption: 'Screen 1: KiwiPlay Media Library displaying organized video folders and offline files.',
            isLandscape: false
        },
        stream_dl: {
            img: 'assets/images/stream_dl_screen.jpg',
            caption: 'Screen 2: Stream & Download Hub with instant URL playback and universal video analyzer.',
            isLandscape: false
        },
        player: {
            img: 'assets/images/player_screen.jpg',
            caption: 'Screen 3: 4K Ultra HD Video Player with speed control, multi-audio tracks, and subtitles.',
            isLandscape: true
        },
        browse: {
            img: 'assets/images/browse_screen.jpg',
            caption: 'Screen 4: Video Portal Browser with Hollywood, Bollywood, Anime, and KDrama categories.',
            isLandscape: false
        },
        settings: {
            img: 'assets/images/settings_screen.jpg',
            caption: 'Screen 5: Advanced Player Settings for hardware acceleration, subtitles, and audio customization.',
            isLandscape: false
        }
    };

    simTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            simTabs.forEach(t => t.classList.remove('active'));
            // Add active class to current tab
            tab.classList.add('active');

            const screenKey = tab.getAttribute('data-screen');
            const targetData = screens[screenKey];

            if (targetData) {
                // Fade out current screen
                simScreenImg.style.opacity = 0;

                setTimeout(() => {
                    // Update image and caption
                    simScreenImg.src = targetData.img;
                    simCaption.textContent = targetData.caption;
                    if (targetData.isLandscape) {
                        simScreenImg.classList.add('landscape-screen');
                    } else {
                        simScreenImg.classList.remove('landscape-screen');
                    }
                    // Fade in new screen
                    simScreenImg.style.opacity = 1;
                }, 200); // Matches transition duration in CSS
            }
        });
    });


    // --- Interactive Hero Phone Screen Slider & Gestures ---
    const heroScreenImg = document.getElementById('hero-screen-img');
    const heroPrevBtn = document.getElementById('hero-prev-btn');
    const heroNextBtn = document.getElementById('hero-next-btn');
    const heroTouchArea = document.getElementById('hero-screen-touch-area');

    const heroScreens = [
        'assets/images/library_screen.jpg',
        'assets/images/stream_dl_screen.jpg',
        'assets/images/player_screen.jpg',
        'assets/images/browse_screen.jpg',
        'assets/images/settings_screen.jpg'
    ];
    let currentHeroIndex = 0;
    let autoCycleInterval;

    const updateHeroScreen = (index) => {
        currentHeroIndex = index;

        // Premium fade-out
        heroScreenImg.style.opacity = 0;

        setTimeout(() => {
            const screenSrc = heroScreens[currentHeroIndex];
            heroScreenImg.src = screenSrc;
            if (screenSrc.includes('player_screen')) {
                heroScreenImg.classList.add('landscape-screen');
            } else {
                heroScreenImg.classList.remove('landscape-screen');
            }
            heroScreenImg.style.opacity = 1;
        }, 250);
    };

    const nextHeroScreen = () => {
        const nextIndex = (currentHeroIndex + 1) % heroScreens.length;
        updateHeroScreen(nextIndex);
    };

    const prevHeroScreen = () => {
        const prevIndex = (currentHeroIndex - 1 + heroScreens.length) % heroScreens.length;
        updateHeroScreen(prevIndex);
    };

    const resetAutoCycle = () => {
        clearInterval(autoCycleInterval);
        autoCycleInterval = setInterval(nextHeroScreen, 5000); // Auto rotate every 5 seconds
    };

    // Button Click Handlers
    if (heroPrevBtn) {
        heroPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevHeroScreen();
            resetAutoCycle();
        });
    }

    if (heroNextBtn) {
        heroNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextHeroScreen();
            resetAutoCycle();
        });
    }

    // Tap on screen to skip to next
    if (heroTouchArea) {
        heroTouchArea.addEventListener('click', () => {
            nextHeroScreen();
            resetAutoCycle();
        });

        // Swipe Gestures Support
        let touchStartX = 0;
        let touchEndX = 0;

        heroTouchArea.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        heroTouchArea.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });

        const handleSwipeGesture = () => {
            const swipeThreshold = 50; // Minimum swipe distance in px
            const diffX = touchEndX - touchStartX;

            if (Math.abs(diffX) > swipeThreshold) {
                if (diffX < 0) {
                    // Swiped Left -> Next
                    nextHeroScreen();
                } else {
                    // Swiped Right -> Prev
                    prevHeroScreen();
                }
                resetAutoCycle();
            }
        };
    }

    // Initialize Auto Cycle on Load
    resetAutoCycle();


    // --- FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = null;
            });

            // If not active before, open current item
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


    // --- Scroll Animations (Intersection Observer) ---
    const animateElements = document.querySelectorAll('.feature-card, .step-card, .server-tag, .download-card, .faq-item, .section-header');

    // Add initial hidden styling classes dynamically
    animateElements.forEach(el => {
        el.classList.add('scroll-hidden');
    });

    const observerOptions = {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        observer.observe(el);
    });

    // --- Toast feedback helper ---
    const showDownloadToast = (message) => {
        let toast = document.getElementById('download-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'download-toast';
            toast.className = 'download-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-down"></i> <span>${message}</span>`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    // --- App Update Notification Modal Logic ---
    const initUpdateNotification = () => {
        if (!UPDATE_CONFIG.enabled) return;

        const modalBackdrop = document.getElementById('update-modal-backdrop');
        const closeBtn = document.getElementById('update-modal-close-btn');
        const dismissBtn = document.getElementById('update-dismiss-btn');
        const downloadBtn = document.getElementById('update-download-btn');
        const floatingPill = document.getElementById('update-floating-pill');

        const titleEl = document.getElementById('update-modal-title');
        const dateEl = document.getElementById('update-modal-date');
        const versionBadge = document.getElementById('update-version-badge');
        const badgeText = document.getElementById('update-badge-text');
        const descEl = document.getElementById('update-modal-desc');
        const filenameEl = document.getElementById('update-filename');
        const filesizeEl = document.getElementById('update-filesize');
        const highlightsList = document.getElementById('update-highlights-list');

        // Determine date to display
        const displayDate = UPDATE_CONFIG.useDynamicTodayDate
            ? new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
            : UPDATE_CONFIG.releaseDate;

        // Apply config values to DOM
        if (titleEl) titleEl.textContent = UPDATE_CONFIG.title;
        if (dateEl) dateEl.textContent = displayDate;
        if (versionBadge) versionBadge.textContent = UPDATE_CONFIG.version;
        if (badgeText) badgeText.textContent = UPDATE_CONFIG.badgeText;
        if (descEl) descEl.textContent = UPDATE_CONFIG.description;
        if (filenameEl) filenameEl.textContent = UPDATE_CONFIG.apkFileName;
        if (filesizeEl) filesizeEl.textContent = UPDATE_CONFIG.fileSize;
        if (downloadBtn) {
            downloadBtn.href = UPDATE_CONFIG.apkUrl;
            downloadBtn.setAttribute('download', UPDATE_CONFIG.apkFileName);
        }

        if (floatingPill) {
            const pillText = floatingPill.querySelector('span:not(.pill-pulse-dot)');
            if (pillText) {
                pillText.textContent = `Update Available (${displayDate.split(' ').slice(0, 2).join(' ')})`;
            }
        }

        // Populate highlights if available
        if (highlightsList && UPDATE_CONFIG.highlights && UPDATE_CONFIG.highlights.length > 0) {
            highlightsList.innerHTML = '';
            UPDATE_CONFIG.highlights.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fa-solid fa-circle-check text-primary"></i> <span>${item}</span>`;
                highlightsList.appendChild(li);
            });
        }

        const openModal = () => {
            if (modalBackdrop) {
                modalBackdrop.classList.add('show');
                modalBackdrop.setAttribute('aria-hidden', 'false');
                document.body.classList.add('modal-open');
            }
            if (floatingPill) {
                floatingPill.classList.remove('show');
            }
        };

        const closeModal = () => {
            if (modalBackdrop) {
                modalBackdrop.classList.remove('show');
                modalBackdrop.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('modal-open');
            }
            // Ensure no lingering pill remains on screen
            if (floatingPill) {
                floatingPill.classList.remove('show');
            }
        };

        // Trigger open notification on page load (stays until user explicitly clicks the cross button)
        if (UPDATE_CONFIG.enabled && UPDATE_CONFIG.showAlwaysOnOpen) {
            setTimeout(openModal, 300);
        }

        // Close button click
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        // Dismiss button click
        if (dismissBtn) {
            dismissBtn.addEventListener('click', closeModal);
        }

        // Click outside modal content on backdrop to close
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) {
                    closeModal();
                }
            });
        }

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('show')) {
                closeModal();
            }
        });

        // Floating pill to re-open modal
        if (floatingPill) {
            floatingPill.addEventListener('click', openModal);
            floatingPill.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    openModal();
                }
            });
        }

        // Download button click - show toast notification feedback
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                showDownloadToast(`Downloading ${UPDATE_CONFIG.apkFileName} (${UPDATE_CONFIG.fileSize})...`);
                setTimeout(closeModal, 1200);
            });
        }
    };

    // Initialize update notification
    initUpdateNotification();

    // --- Sticky Banner Bar Close Handler ---
    const stickyClose = document.getElementById('sticky-banner-close-btn');
    const stickyBar = document.getElementById('sticky-banner-bar');
    if (stickyClose && stickyBar) {
        stickyClose.addEventListener('click', () => {
            stickyBar.style.display = 'none';
        });
    }

});
