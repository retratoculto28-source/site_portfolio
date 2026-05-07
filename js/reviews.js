/* ═══════════════════════════════════════════════
   REVIEWS PAGE — reviews.js
   Handles: loading reviews, star selector, form submit
═══════════════════════════════════════════════ */

const API = 'api/reviews.php';

const starLabels = ['', 'Mau 😕', 'Fraco 😐', 'Bom 🙂', 'Muito Bom 😊', 'Excelente! 🤩'];

/* ── Load & render approved reviews ── */
async function loadReviews() {
    const feed = document.getElementById('reviews-feed');
    const noReviews = document.getElementById('no-reviews');

    try {
        const res = await fetch(`${API}?action=list`);
        const data = await res.json();

        feed.innerHTML = '';

        if (!data.reviews || data.reviews.length === 0) {
            feed.style.display = 'none';
            noReviews.style.display = 'block';
            updateStats([], 0);
            return;
        }

        updateStats(data.reviews);

        data.reviews.forEach((review, index) => {
            const card = createReviewCard(review, index);
            feed.appendChild(card);
        });

    } catch (err) {
        feed.innerHTML = '<p style="color:#999; text-align:center;">Não foi possível carregar as avaliações de momento.</p>';
    }
}

/* ── Build a review card element ── */
function createReviewCard(review, index) {
    const card = document.createElement('article');
    card.className = 'review-card';
    card.style.animationDelay = `${index * 0.1}s`;

    const date = new Date(review.created_at).toLocaleDateString('pt-PT', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    const starsHtml = renderStars(review.rating);
    const initials = review.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
    const roleHtml = review.role ? `<span class="reviewer-role">${escapeHtml(review.role)}</span>` : '';

    card.innerHTML = `
        <div class="review-card-top">
            <div class="reviewer-avatar">${initials}</div>
            <div class="reviewer-info">
                <strong class="reviewer-name">${escapeHtml(review.name)}</strong>
                ${roleHtml}
            </div>
            <div class="review-rating">${starsHtml}</div>
        </div>
        <blockquote class="review-comment">"${escapeHtml(review.comment)}"</blockquote>
        <time class="review-date" datetime="${review.created_at}">${date}</time>
    `;
    return card;
}

/* ── Render filled/empty stars ── */
function renderStars(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        html += `<span class="${i <= rating ? 'star filled' : 'star empty'}">★</span>`;
    }
    return html;
}

/* ── Stats banner ── */
function updateStats(reviews) {
    const avgEl = document.getElementById('avg-rating');
    const starsEl = document.getElementById('avg-stars');
    const totalEl = document.getElementById('total-reviews');

    totalEl.textContent = reviews.length;

    if (reviews.length === 0) {
        avgEl.textContent = '—';
        starsEl.innerHTML = '';
        return;
    }

    const avg = reviews.reduce((sum, r) => sum + Number(r.rating), 0) / reviews.length;
    avgEl.textContent = avg.toFixed(1);
    starsEl.innerHTML = renderStars(Math.round(avg));
}

/* ── Star selector interaction ── */
function initStarSelector() {
    const radios = document.querySelectorAll('#star-selector input[type="radio"]');
    const labelEl = document.getElementById('star-label');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            labelEl.textContent = starLabels[radio.value];
        });
    });
}

/* ── Character counter ── */
function initCharCounter() {
    const textarea = document.getElementById('review-comment');
    const counter = document.getElementById('char-count');
    if (!textarea) return;

    textarea.addEventListener('input', () => {
        const len = textarea.value.length;
        counter.textContent = `${len} / 500`;
        counter.style.color = len > 480 ? '#c0392b' : '#999';
        if (len > 500) textarea.value = textarea.value.slice(0, 500);
    });
}

/* ── Form submission ── */
function initForm() {
    const form = document.getElementById('review-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('review-name').value.trim();
        const role = document.getElementById('review-role').value.trim();
        const rating = form.querySelector('input[name="rating"]:checked')?.value;
        const comment = document.getElementById('review-comment').value.trim();

        const errorEl = document.getElementById('form-error');
        const successEl = document.getElementById('form-success');
        errorEl.style.display = 'none';
        successEl.style.display = 'none';

        if (!name || !rating || !comment) {
            errorEl.textContent = '⚠️ Por favor preenche o nome, a classificação e o comentário.';
            errorEl.style.display = 'flex';
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');
        const submitBtn = document.getElementById('submit-btn');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('role', role);
        formData.append('rating', rating);
        formData.append('comment', comment);

        try {
            const res = await fetch(`${API}?action=submit`, { method: 'POST', body: formData });
            const data = await res.json();

            if (data.success) {
                form.reset();
                document.getElementById('char-count').textContent = '0 / 500';
                document.getElementById('star-label').textContent = '';
                successEl.style.display = 'flex';
                successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                errorEl.textContent = data.error || 'Erro desconhecido.';
                errorEl.style.display = 'flex';
            }
        } catch (err) {
            errorEl.textContent = '⚠️ Erro de ligação. Tenta novamente mais tarde.';
            errorEl.style.display = 'flex';
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
}

/* ── Sanitise output ── */
function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    initStarSelector();
    initCharCounter();
    initForm();
});
