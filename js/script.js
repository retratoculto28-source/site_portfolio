document.addEventListener('DOMContentLoaded', () => {
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
                spotifyBtn.innerHTML = '♫ Playlist';
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

        // Group by category and subcategory
        const grouped = {};
        items.forEach(item => {
            const cat = item.category    || 'Outros';
            const sub = item.subcategory || 'Geral';
            if (!grouped[cat])      grouped[cat]      = {};
            if (!grouped[cat][sub]) grouped[cat][sub] = [];
            grouped[cat][sub].push(item);
        });

        for (const cat in grouped) {
            const catHeader = document.createElement('h2');
            catHeader.textContent = cat;
            catHeader.style.marginTop    = '3rem';
            catHeader.style.borderBottom = '2px dashed var(--light-blue)';
            catHeader.style.paddingBottom = '0.5rem';
            portfolioSections.appendChild(catHeader);

            for (const sub in grouped[cat]) {
                if (sub !== 'Geral' || Object.keys(grouped[cat]).length > 1) {
                    const subHeader = document.createElement('h3');
                    subHeader.textContent = sub;
                    subHeader.style.marginTop = '1.5rem';
                    subHeader.style.color     = 'var(--text-dark)';
                    portfolioSections.appendChild(subHeader);
                }

                const grid = document.createElement('section');
                grid.className = 'gallery-grid';

                grouped[cat][sub].forEach(item => {
                    // Store item with its future index in the flat list
                    const itemIndex = allItems.length;
                    allItems.push(item);

                    const polaroid = document.createElement('div');
                    polaroid.className   = 'polaroid';
                    polaroid.style.cursor = 'pointer';

                    const img = document.createElement('img');
                    img.src     = item.imagePath;
                    img.alt     = item.title;
                    img.loading = 'lazy';

                    const caption = document.createElement('div');
                    caption.className   = 'polaroid-caption';
                    caption.textContent = item.title;

                    const tape = document.createElement('div');
                    tape.className = 'tape';

                    polaroid.appendChild(tape);
                    polaroid.appendChild(img);
                    polaroid.appendChild(caption);

                    // Open Lightbox on click
                    polaroid.addEventListener('click', () => openLightbox(itemIndex));

                    grid.appendChild(polaroid);
                });

                portfolioSections.appendChild(grid);
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

            // Fade the image out, swap src, fade back in
            lightboxImg.style.opacity = '0';
            lightboxImg.style.transform = 'scale(0.96)';

            setTimeout(() => {
                lightboxImg.src = item.imagePath;
                lightboxImg.alt = item.title;
                lightboxCaption.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <p><small>Categoria: ${item.category}${item.subcategory ? ' › ' + item.subcategory : ''}</small></p>
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


    if (portfolioSections && typeof getPortfolioItems === 'function') {
        const items = getPortfolioItems();
        
        // Group by category and subcategory
        const grouped = {};
        items.forEach(item => {
            const cat = item.category || 'Outros';
            const sub = item.subcategory || 'Geral';
            if (!grouped[cat]) grouped[cat] = {};
            if (!grouped[cat][sub]) grouped[cat][sub] = [];
            grouped[cat][sub].push(item);
        });

        for (const cat in grouped) {
            const catHeader = document.createElement('h2');
            catHeader.textContent = cat;
            catHeader.style.marginTop = '3rem';
            catHeader.style.borderBottom = '2px dashed var(--light-blue)';
            catHeader.style.paddingBottom = '0.5rem';
            portfolioSections.appendChild(catHeader);

            for (const sub in grouped[cat]) {
                if (sub !== 'Geral' || Object.keys(grouped[cat]).length > 1) {
                    const subHeader = document.createElement('h3');
                    subHeader.textContent = sub;
                    subHeader.style.marginTop = '1.5rem';
                    subHeader.style.color = 'var(--text-dark)';
                    portfolioSections.appendChild(subHeader);
                }

                const grid = document.createElement('section');
                grid.className = 'gallery-grid';
                
                grouped[cat][sub].forEach(item => {
                    const polaroid = document.createElement('div');
                    polaroid.className = 'polaroid';
                    polaroid.style.cursor = 'pointer';
                    
                    const img = document.createElement('img');
                    img.src = item.imagePath;
                    img.alt = item.title;
                    img.loading = 'lazy';
                    
                    const caption = document.createElement('div');
                    caption.className = 'polaroid-caption';
                    caption.textContent = item.title;
                    
                    const tape = document.createElement('div');
                    tape.className = 'tape';
                    
                    polaroid.appendChild(tape);
                    polaroid.appendChild(img);
                    polaroid.appendChild(caption);
                    
                    // Open Lightbox on click
                    polaroid.addEventListener('click', () => {
                        lightboxImg.src = item.imagePath;
                        lightboxCaption.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p><p><small>Categoria: ${item.category} ${item.subcategory ? '> ' + item.subcategory : ''}</small></p>`;
                        lightbox.style.display = 'flex';
                        // Trigger reflow
                        void lightbox.offsetWidth;
                        lightbox.classList.add('show');
                    });

                    grid.appendChild(polaroid);
                });
                
                portfolioSections.appendChild(grid);
            }
        }

        // Close Lightbox
        if (lightboxClose && lightbox) {
            const closeLightbox = () => {
                lightbox.classList.remove('show');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                    lightboxImg.src = '';
                }, 300); // Wait for transition
            };

            lightboxClose.addEventListener('click', closeLightbox);
            
            // Close when clicking outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });

            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                    closeLightbox();
                }
            });
        }
    }

    // Admin Panel Logic
    const loginSection = document.getElementById('login-section');
    const adminSection = document.getElementById('admin-section');
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');
    const messagesContainer = document.getElementById('messages-container');
    const logoutAdminBtn = document.getElementById('logout-btn');

    if (loginSection && adminSection && loginForm) {
        // Check if already logged in
        fetch('api/admin.php?action=check')
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    showAdminPanel();
                }
            })
            .catch(err => console.error("Erro na verificação de sessão", err));

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            
            fetch('api/admin.php?action=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: 'password=' + encodeURIComponent(password)
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    showAdminPanel();
                } else {
                    errorMsg.textContent = "Palavra-passe incorreta!";
                    errorMsg.style.display = 'block';
                }
            })
            .catch(err => {
                errorMsg.textContent = "Erro ao tentar fazer login. Tem a certeza que o servidor PHP está ativo?";
                errorMsg.style.display = 'block';
            });
        });

        if (logoutAdminBtn) {
            logoutAdminBtn.addEventListener('click', () => {
                fetch('api/admin.php?action=logout').then(() => {
                    loginSection.style.display = 'block';
                    adminSection.style.display = 'none';
                    document.getElementById('password').value = '';
                });
            });
        }

        /* ── Tab switching ── */
        const adminTabs = document.querySelectorAll('.admin-tab');
        const adminPanels = document.querySelectorAll('.admin-panel');

        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                adminTabs.forEach(t => t.classList.remove('active'));
                adminPanels.forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                const target = document.getElementById('panel-' + tab.dataset.tab);
                if (target) target.classList.add('active');
            });
        });

        /* ── Filter buttons in reviews panel ── */
        let allAdminReviews = [];
        let currentFilter = 'pending';

        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.filter;
                renderAdminReviews(allAdminReviews, currentFilter);
            });
        });

        function showAdminPanel() {
            loginSection.style.display = 'none';
            adminSection.style.display = 'block';
            errorMsg.style.display = 'none';
            loadMessages();
            loadAdminReviews();
        }

        /* ── Load contact messages ── */
        function loadMessages() {
            fetch('api/admin.php?action=messages')
                .then(res => res.json())
                .then(data => {
                    messagesContainer.innerHTML = '';
                    if (data.error) {
                        messagesContainer.innerHTML = `<div class="paper-note" style="border-left: 5px solid red;"><h3>Erro na Base de Dados</h3><p>${data.error}</p></div>`;
                    } else if (data.messages.length === 0) {
                        messagesContainer.innerHTML = `<div class="paper-note" style="text-align: center;"><p>Ainda não tens nenhuma mensagem. As coisas boas levam tempo! ✨</p></div>`;
                    } else {
                        const badge = document.getElementById('badge-messages');
                        if (badge) badge.textContent = data.messages.length;

                        data.messages.forEach(msg => {
                            const card = document.createElement('div');
                            card.className = 'message-card';
                            
                            const dateObj = new Date(msg.created_at);
                            const dateStr = dateObj.toLocaleDateString('pt-PT') + ' ' + dateObj.toLocaleTimeString('pt-PT', {hour: '2-digit', minute:'2-digit'});

                            card.innerHTML = `
                                <div class="message-header">
                                    <div>
                                        <span class="message-subject">${escapeHtml(msg.subject)}</span><br>
                                        <strong>De:</strong> ${escapeHtml(msg.name)} &lt;<a href="mailto:${escapeHtml(msg.email)}" style="color: var(--purple);">${escapeHtml(msg.email)}</a>&gt;
                                    </div>
                                    <div class="message-date">${dateStr}</div>
                                </div>
                                <div class="message-body" style="white-space: pre-wrap;">${escapeHtml(msg.message)}</div>
                            `;
                            messagesContainer.appendChild(card);
                        });
                    }
                })
                .catch(err => {
                    messagesContainer.innerHTML = `<div class="paper-note" style="border-left: 5px solid red;"><h3>Erro</h3><p>Não foi possível carregar as mensagens. O servidor pode estar desligado.</p></div>`;
                });
        }

        /* ── Load admin reviews ── */
        function loadAdminReviews() {
            const container = document.getElementById('reviews-admin-container');
            if (!container) return;

            container.innerHTML = '<p style="color:#aaa; padding:2rem 0;">A carregar…</p>';

            fetch('api/reviews.php?action=admin_list')
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        container.innerHTML = `<div class="paper-note" style="border-left: 5px solid red;"><p>${escapeHtml(data.error)}</p></div>`;
                        return;
                    }
                    allAdminReviews = data.reviews || [];

                    // Badge: count pending
                    const pendingCount = allAdminReviews.filter(r => r.approved == 0).length;
                    const badge = document.getElementById('badge-reviews');
                    if (badge) {
                        badge.textContent = pendingCount > 0 ? pendingCount : '';
                    }

                    renderAdminReviews(allAdminReviews, currentFilter);
                })
                .catch(() => {
                    if (container) container.innerHTML = '<p style="color:#c0392b;">Erro ao carregar avaliações.</p>';
                });
        }

        function renderAdminReviews(reviews, filter) {
            const container = document.getElementById('reviews-admin-container');
            if (!container) return;

            let filtered = reviews;
            if (filter === 'pending')  filtered = reviews.filter(r => r.approved == 0);
            if (filter === 'approved') filtered = reviews.filter(r => r.approved == 1);

            container.innerHTML = '';

            if (filtered.length === 0) {
                container.innerHTML = `<div class="paper-note" style="text-align:center; margin-top:1.5rem;">
                    <p>Nenhuma avaliação ${filter === 'pending' ? 'pendente' : filter === 'approved' ? 'aprovada' : ''} de momento. ✨</p>
                </div>`;
                return;
            }

            filtered.forEach(review => {
                const card = document.createElement('div');
                card.className = 'admin-review-card';
                card.id = `rev-${review.id}`;

                const dateStr = new Date(review.created_at).toLocaleDateString('pt-PT');
                const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
                const statusBadge = review.approved == 1
                    ? '<span class="status-badge approved">✔ Aprovada</span>'
                    : '<span class="status-badge pending">⏳ Pendente</span>';

                card.innerHTML = `
                    <div class="admin-review-header">
                        <div>
                            <strong>${escapeHtml(review.name)}</strong>
                            ${review.role ? `<span style="color:#999;font-size:0.85rem;"> · ${escapeHtml(review.role)}</span>` : ''}
                        </div>
                        <div style="display:flex;align-items:center;gap:0.75rem;flex-wrap:wrap;">
                            <span style="color:#f5a623;font-size:1.1rem;">${stars}</span>
                            ${statusBadge}
                            <span style="color:#bbb;font-size:0.8rem;">${dateStr}</span>
                        </div>
                    </div>
                    <p class="admin-review-comment">"${escapeHtml(review.comment)}"</p>
                    <div class="admin-review-actions">
                        ${review.approved == 0
                            ? `<button class="btn-approve" data-id="${review.id}">✔ Aprovar</button>`
                            : '<span style="color:#2d6a4f;font-size:0.9rem;">✔ Já aprovada</span>'
                        }
                        <button class="btn-delete" data-id="${review.id}">✕ Eliminar</button>
                    </div>
                `;

                // Approve
                const approveBtn = card.querySelector('.btn-approve');
                if (approveBtn) {
                    approveBtn.addEventListener('click', () => {
                        approveBtn.disabled = true;
                        approveBtn.textContent = 'A aprovar…';
                        const fd = new FormData();
                        fd.append('id', review.id);
                        fetch('api/reviews.php?action=approve', { method: 'POST', body: fd })
                            .then(r => r.json())
                            .then(d => {
                                if (d.success) {
                                    review.approved = 1;
                                    loadAdminReviews();
                                }
                            });
                    });
                }

                // Delete
                const deleteBtn = card.querySelector('.btn-delete');
                if (deleteBtn) {
                    deleteBtn.addEventListener('click', () => {
                        if (!confirm(`Eliminar a avaliação de "${review.name}"?`)) return;
                        const fd = new FormData();
                        fd.append('id', review.id);
                        fetch('api/reviews.php?action=delete', { method: 'POST', body: fd })
                            .then(r => r.json())
                            .then(d => {
                                if (d.success) loadAdminReviews();
                            });
                    });
                }

                container.appendChild(card);
            });
        }

        function escapeHtml(unsafe) {
            return String(unsafe)
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    }
});
