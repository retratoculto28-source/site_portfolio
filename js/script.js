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

    // Render Portfolio Gallery with Lightbox
    const portfolioSections = document.getElementById('portfolio-sections');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

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

        function showAdminPanel() {
            loginSection.style.display = 'none';
            adminSection.style.display = 'block';
            errorMsg.style.display = 'none';
            
            fetch('api/admin.php?action=messages')
                .then(res => res.json())
                .then(data => {
                    messagesContainer.innerHTML = '';
                    if (data.error) {
                        messagesContainer.innerHTML = `<div class="paper-note" style="border-left: 5px solid red;"><h3>Erro na Base de Dados</h3><p>${data.error}</p></div>`;
                    } else if (data.messages.length === 0) {
                        messagesContainer.innerHTML = `<div class="paper-note" style="text-align: center;"><p>Ainda não tens nenhuma mensagem. As coisas boas levam tempo! ✨</p></div>`;
                    } else {
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
