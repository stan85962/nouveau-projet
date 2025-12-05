// --- DONNÉES ---
const items = [
  { id: 1, title: "Canon EOS R6", category: "tech", price: 45, deposit: 1200, location: "Paris 11e", user: "Sophie L.", rating: 4.9, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { id: 2, title: "Sac Gucci", category: "mode", price: 60, deposit: 800, location: "Lyon 2e", user: "Clara M.", rating: 4.7, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 3, title: "Drone DJI Mini", category: "tech", price: 30, deposit: 400, location: "Bordeaux", user: "Marc D.", rating: 3.2, img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" },
  { id: 4, title: "Perceuse Pro", category: "maison", price: 20, deposit: 150, location: "Paris 18e", user: "Jean B.", rating: 5.0, img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80" },
  { id: 5, title: "Apple Vision", category: "tech", price: 80, deposit: 3500, location: "La Défense", user: "Lucas P.", rating: 4.8, img: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?auto=format&fit=crop&w=500&q=80" },
  { id: 6, title: "Robe Soie", category: "mode", price: 40, deposit: 200, location: "Lille", user: "Elena G.", rating: 4.6, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80" }
];

// --- DONNÉES AVIS (Simulées pour le profil actuel) ---
const myReviews = [
    { author: "Marc D.", stars: 5, text: "Super locataire ! Très soigneux avec mon matériel. Je recommande.", date: "Il y a 2 jours" },
    { author: "Sophie L.", stars: 1, text: "Attention ! Il a cassé le joystick de la manette et ne m'a rien dit. Déçue.", date: "Il y a 1 semaine" },
    { author: "Karim B.", stars: 4, text: "Tout s'est bien passé, ponctuel.", date: "Il y a 3 semaines" }
];

// --- RENDU GRILLE PRODUITS (Avec notation) ---
function renderGrid(dataList, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if(dataList.length === 0) { container.innerHTML = '<p style="color:#666;">Aucun résultat.</p>'; return; }

    dataList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="card-info">
                <div class="card-top">
                    <div class="user-rating-badge"><i class="fa-solid fa-star"></i> ${item.rating}</div>
                    <div class="card-loc">${item.user}</div>
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-bottom">
                    <div class="card-price">${item.price}€</div>
                    <div class="badge-protect">Assuré</div>
                </div>
                <button class="btn-rent" onclick="openBooking(${item.id})">Réserver</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- RENDU DES AVIS (Profil) ---
function renderReviews() {
    const list = document.getElementById('reviews-list');
    list.innerHTML = '';
    
    myReviews.forEach(review => {
        const div = document.createElement('div');
        div.classList.add('review-item');
        
        // Génération des étoiles
        let starsHtml = '';
        for(let i=1; i<=5; i++) {
            starsHtml += i <= review.stars ? '<i class="fa-solid fa-star"></i>' : '<i class="fa-regular fa-star"></i>';
        }

        // Si 1 ou 2 étoiles, on met le texte en rouge
        const textClass = review.stars <= 2 ? 'review-text bad' : 'review-text';

        div.innerHTML = `
            <div class="review-header">
                <span class="review-author">${review.author}</span>
                <span class="review-stars">${starsHtml}</span>
            </div>
            <div class="${textClass}">"${review.text}"</div>
            <span class="review-date">${review.date}</span>
        `;
        list.appendChild(div);
    });
}

// --- GESTION NOTATION (Ajout d'avis) ---
function openReviewModal() {
    document.getElementById('modal-review').style.display = 'block';
    resetStars();
}

function setRating(val) {
    document.getElementById('selected-rating').value = val;
    const stars = document.querySelectorAll('.star-rating-input i');
    stars.forEach(star => {
        const starVal = parseInt(star.getAttribute('data-val'));
        if(starVal <= val) {
            star.classList.remove('fa-regular');
            star.classList.add('fa-solid', 'active');
        } else {
            star.classList.remove('fa-solid', 'active');
            star.classList.add('fa-regular');
        }
    });
}

function resetStars() {
    document.getElementById('selected-rating').value = 0;
    document.getElementById('review-text').value = '';
    document.querySelectorAll('.star-rating-input i').forEach(s => {
        s.classList.remove('fa-solid', 'active');
        s.classList.add('fa-regular');
    });
}

function submitReview() {
    const rating = document.getElementById('selected-rating').value;
    const text = document.getElementById('review-text').value;
    
    if(rating == 0 || text === "") {
        alert("Merci de mettre une note et un commentaire !");
        return;
    }

    // Ajouter le nouvel avis à la liste
    myReviews.unshift({
        author: "Moi (Test)",
        stars: parseInt(rating),
        text: text,
        date: "À l'instant"
    });

    renderReviews(); // Mettre à jour l'affichage
    closeModal('modal-review');
    alert("Votre avis a été publié !");
}


// --- NAVIGATION & LOGIQUE EXISTANTE ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const activeSection = document.getElementById('page-' + pageId);
    if(activeSection) activeSection.style.display = 'block';
    
    const btnIndex = ['home', 'search', 'chat', 'profile'].indexOf(pageId);
    if(btnIndex >= 0) document.querySelectorAll('.nav-btn')[btnIndex].classList.add('active');
    
    if(pageId === 'search') renderGrid(items, 'search-results');
}

function openBooking(itemId) {
    const item = items.find(i => i.id === itemId);
    document.getElementById("book-title").innerText = item.title;
    document.getElementById("book-price").innerText = item.price + ".00€";
    document.getElementById("book-deposit").innerText = item.deposit + "€";
    document.getElementById("book-total").innerText = (item.price + 2) + ".00€";
    document.getElementById("modal-booking").style.display = "block";
}
function confirmPayment() { alert("Paiement validé !"); closeModal('modal-booking'); }
function closeModal(id) { document.getElementById(id).style.display = "none"; }
function openCharter() { document.getElementById('modal-charter').style.display = 'block'; }

function filterItems(category) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = (category === 'all') ? items : items.filter(i => i.category === category);
    renderGrid(filtered, 'products-grid');
}

// Init
renderGrid(items, 'products-grid');
renderReviews();

window.onclick = function(e) { if(e.target.classList.contains('modal')) e.target.style.display = "none"; }
