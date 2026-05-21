document.addEventListener('DOMContentLoaded', () => {
    // ─────────────────────────────────────────────────────────
    // Dark Mode Toggle
    // ─────────────────────────────────────────────────────────
    const themeToggleBtn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }


    // Spotify Slide-out toggle
    const spotifyBtn = document.getElementById('spotify-btn');
    const spotifyPanel = document.getElementById('spotify-panel');
    
    if (spotifyBtn && spotifyPanel) {
        spotifyBtn.addEventListener('click', () => {
            spotifyPanel.classList.toggle('open');
            if (spotifyPanel.classList.contains('open')) {
                spotifyBtn.innerHTML = '✕ Fechar';
                spotifyBtn.style.right = '320px';
            } else {
                spotifyBtn.innerHTML = 'Playlist';
                spotifyBtn.style.right = '0';
            }
        });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });
        
        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    // Highlight current page link
    const currentPage = window.location.pathname.split('/').pop();
    const navAnchors = document.querySelectorAll('.nav-links a');
    navAnchors.forEach(anchor => {
        const href = anchor.getAttribute('href');
        if (href === currentPage || (href === 'index.html' && (currentPage === '' || currentPage === 'index.html'))) {
            anchor.classList.add('active');
        }
    });

    // Encode a file path so accented chars and spaces work in browsers
    function encodeImagePath(rawPath) {
        // Split by '?' to separate the path from query parameters (like ?v=2)
        const parts = rawPath.split('?');
        const pathPart = parts[0].split('/').map(seg => encodeURIComponent(seg)).join('/');
        
        // If there's a query string, append it back without encoding the ? and =
        if (parts.length > 1) {
            return pathPart + '?' + parts[1];
        }
        return pathPart;
    }

    // Render Portfolio Gallery with Lightbox + Arrow Navigation
    const portfolioSections = document.getElementById('portfolio-sections');
    const lightbox           = document.getElementById('lightbox');
    const lightboxImg        = document.getElementById('lightbox-img');
    const lightboxCaption    = document.getElementById('lightbox-caption');
    const lightboxCounter    = document.getElementById('lightbox-counter');
    const lightboxClose      = document.querySelector('.lightbox-close');
    const lightboxPrev       = document.getElementById('lightbox-prev');
    const lightboxNext       = document.getElementById('lightbox-next');

    // Flat list of all items in display order — populated while building the grid
    let allItems     = [];
    let currentIndex = 0;

    if (portfolioSections && typeof getPortfolioItems === 'function') {
        const items = getPortfolioItems();

        // Group by category, subcategory, and project
        const grouped = {};
        items.forEach(item => {
            const cat = item.category    || 'Outros';
            const sub = item.subcategory || 'Geral';
            const proj = item.project    || 'Geral';
            
            if (!grouped[cat])           grouped[cat]           = {};
            if (!grouped[cat][sub])      grouped[cat][sub]      = {};
            if (!grouped[cat][sub][proj]) grouped[cat][sub][proj] = [];
            
            grouped[cat][sub][proj].push(item);
        });

        for (const cat in grouped) {
            const catHeader = document.createElement('h2');
            catHeader.textContent = cat;
            catHeader.className = 'category-header';
            catHeader.style.marginTop    = '1.5rem';
            catHeader.style.borderBottom = '2px dashed var(--light-blue)';
            catHeader.style.paddingBottom = '0.25rem';
            portfolioSections.appendChild(catHeader);

            for (const sub in grouped[cat]) {
                if (sub !== 'Geral' || Object.keys(grouped[cat]).length > 1) {
                    const subHeader = document.createElement('h3');
                    subHeader.textContent = sub;
                    subHeader.className = 'subcategory-header';
                    subHeader.style.marginTop = '1rem';
                    subHeader.style.color     = 'var(--text-dark)';
                    portfolioSections.appendChild(subHeader);
                }

                for (const proj in grouped[cat][sub]) {
                    if (proj !== 'Geral') {
                        const projHeader = document.createElement('h4');
                        projHeader.textContent = proj;
                        projHeader.className = 'project-header';
                        projHeader.style.marginTop = '0.8rem';
                        projHeader.style.marginBottom = '0.5rem';
                        projHeader.style.color = 'var(--purple)';
                        projHeader.style.fontStyle = 'italic';
                        portfolioSections.appendChild(projHeader);
                    }

                    const grid = document.createElement('section');
                    grid.className = 'gallery-grid';

                    grouped[cat][sub][proj].forEach(item => {
                        const itemIndex = allItems.length;
                        allItems.push(item);

                        const polaroid = document.createElement('div');
                        polaroid.className   = 'polaroid';
                        polaroid.style.cursor = 'pointer';

                        const img = document.createElement('img');
                        img.src     = encodeImagePath('../' + item.imagePath);
                        img.alt     = item.title || 'Portfolio Image';
                        img.loading = 'lazy';

                        // Detect very tall images and span 2 grid rows
                        img.addEventListener('load', () => {
                            const ratio = img.naturalHeight / img.naturalWidth;
                            if (ratio > 1.6) {
                                polaroid.classList.add('polaroid--tall');
                            }
                        });

                        const tape = document.createElement('div');
                        tape.className = 'tape';

                        polaroid.appendChild(tape);
                        polaroid.appendChild(img);

                        // Only show caption if it's not Photography and has a title
                        if (item.category !== 'Fotografia' && item.title) {
                            const caption = document.createElement('div');
                            caption.className   = 'polaroid-caption';
                            caption.textContent = item.title;
                            polaroid.appendChild(caption);
                        } else {
                            // Add extra padding to the bottom to keep the polaroid shape
                            polaroid.style.paddingBottom = '20px';
                        }

                        polaroid.addEventListener('click', () => openLightbox(itemIndex));
                        grid.appendChild(polaroid);
                    });

                    portfolioSections.appendChild(grid);
                }
            }
        }

        /* ── Core lightbox helpers ── */

        function openLightbox(index) {
            currentIndex = index;
            updateLightboxContent();
            lightbox.style.display = 'flex';
            void lightbox.offsetWidth; // trigger reflow
            lightbox.classList.add('show');
        }

        function updateLightboxContent() {
            const item = allItems[currentIndex];

            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.96)';

            setTimeout(() => {
                lightboxImg.src = encodeImagePath('../' + item.imagePath);
                lightboxImg.alt = item.title || 'Portfolio Image';
                
                let categoryInfo = item.category;
                if (item.subcategory) categoryInfo += ' › ' + item.subcategory;
                if (item.project && item.project !== 'Geral') categoryInfo += ' › ' + item.project;

                // Hide title and description for Photography
                const showTitle = item.category !== 'Fotografia' && item.title;
                const showDesc  = item.category !== 'Fotografia' && item.description;

                lightboxCaption.innerHTML = `
                    ${showTitle ? `<h3>${item.title}</h3>` : ''}
                    ${showDesc ? `<p>${item.description}</p>` : ''}
                    <p><small>Categoria: ${categoryInfo}</small></p>
                `;
                if (lightboxCounter) {
                    lightboxCounter.textContent = `${currentIndex + 1} / ${allItems.length}`;
                }
                lightboxImg.style.opacity   = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 180);
        }

        function closeLightbox() {
            lightbox.classList.remove('show');
            setTimeout(() => {
                lightbox.style.display = 'none';
                lightboxImg.src = '';
            }, 300);
        }

        function goPrev() {
            currentIndex = (currentIndex - 1 + allItems.length) % allItems.length;
            updateLightboxContent();
        }

        function goNext() {
            currentIndex = (currentIndex + 1) % allItems.length;
            updateLightboxContent();
        }

        /* ── Event listeners ── */

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev)  lightboxPrev.addEventListener('click',  (e) => { e.stopPropagation(); goPrev(); });
        if (lightboxNext)  lightboxNext.addEventListener('click',  (e) => { e.stopPropagation(); goNext(); });

        // Click outside content to close
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display !== 'flex') return;
            if (e.key === 'Escape')      closeLightbox();
            if (e.key === 'ArrowLeft')   goPrev();
            if (e.key === 'ArrowRight')  goNext();
        });
    }
});
