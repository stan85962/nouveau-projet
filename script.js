// --- DONNÉES PRODUITS DISPONIBLES ---
const items = [
  { id: 1, title: "Canon EOS R6", category: "tech", price: 45, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { id: 2, title: "Sac Gucci Dionysus", category: "mode", price: 60, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 3, title: "Drone DJI Mini 3", category: "tech", price: 30, img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" },
  { id: 4, title: "Perceuse Bosch", category: "maison", price: 20, img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80" },
  { id: 5, title: "PS5 Slim", category: "tech", price: 25, img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80" },
  { id: 6, title: "Robe Soirée Rouge", category: "mode", price: 40, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80" }
];

// --- DONNÉES AVIS (QUE DES 5 ÉTOILES POUR STAN) ---
const stanReviews = [
    { author: "Julie M.", text: "Stan est génial ! Matériel en parfait état, super arrangeant sur les horaires. Je recommande à 100%.", date: "Il y a 2 jours" },
    { author: "Thomas L.", text: "Première location sur l'appli et grâce à Stan c'était parfait. Merci !", date: "Il y a 1 semaine" },
    { author: "Sophie B.", text: "Le drone était chargé à bloc, propre, avec tous les câbles. Rien à dire. 👍", date: "Il y a 2 semaines" },
    { author: "Karim Z.", text: "Super sympa et pro. À la prochaine Stan !", date: "Il y a 1 mois" }
];

// --- AFFICHAGE NAVIGATION ---
function showPage(pageId) {
    // Cacher toutes les pages
    document.querySelectorAll('.page-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    // Afficher la page demandée
    const target = document.getElementById('page-' + pageId);
    if(target) target.style.display = 'block';

    // Activer le bouton correspondant
    // Petite logique pour trouver le bon bouton selon l'ordre
    const indexMap = { 'home':0, 'search':1, 'chat':2, 'profile':3 };
    const btn = document.querySelectorAll('.nav-btn')[indexMap[pageId]];
    if(btn) btn.classList.add('active');

    if(pageId === 'search') renderGrid(items, 'search-results');
}

// --- RENDU GRILLE PRODUITS ---
function renderGrid(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="card-info">
                <div class="card-title">${item.title}</div>
                <div class="card-price">${item.price}€ /jour</div>
                <button class="btn-rent" onclick="openBooking(${item.id})">Louer</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// --- RENDU AVIS (POUR STAN) ---
function renderStanReviews() {
    const container = document.getElementById('reviews-list');
    container.innerHTML = '';

    stanReviews.forEach(rev => {
        const div = document.createElement('div');
        div.className = 'review-item';
        div.innerHTML = `
            <div class="review-header">
                <span class="review-author">${rev.author}</span>
                <span class="review-stars">
                    <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
                </span>
            </div>
            <div class="review-text">"${rev.text}"</div>
            <span class="review-date">${rev.date}</span>
        `;
        container.appendChild(div);
    });
}

// --- FILTRES ---
function filterItems(cat) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = cat === 'all' ? items : items.filter(i => i.category === cat);
    renderGrid(filtered, 'products-grid');
}

// --- MODALES SIMPLES ---
function openBooking(id) {
    const item = items.find(i => i.id === id);
    document.getElementById('book-title').innerText = item.title;
    document.getElementById('book-total').innerText = (item.price + 2) + "€";
    document.getElementById('modal-booking').style.display = 'block';
}
function confirmPayment() { alert("Réservation confirmée !"); closeModal('modal-booking'); }
function openCharter() { document.getElementById('modal-charter').style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// --- RECHERCHE ---
document.getElementById('search-input').addEventListener('keyup', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = items.filter(i => i.title.toLowerCase().includes(val));
    renderGrid(filtered, 'search-results');
});

// --- INIT ---
// Lancer tout au démarrage
renderGrid(items, 'products-grid');
renderStanReviews(); // Affiche les avis de Stan
