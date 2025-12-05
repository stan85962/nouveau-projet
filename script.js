// --- DONNÉES ---
const items = [
  { id: 1, title: "Canon EOS R6", category: "tech", price: 45, user: "Sophie L.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { id: 2, title: "Sac Gucci", category: "mode", price: 60, user: "Clara M.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 3, title: "Drone DJI Mini", category: "tech", price: 30, user: "Marc D.", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" },
  { id: 4, title: "Perceuse Bosch", category: "maison", price: 20, user: "Jean B.", img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80" },
];

let favorites = []; // Liste des favoris

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));

    const target = document.getElementById('page-' + pageId);
    if(target) target.style.display = 'block';

    const indexMap = { 'home':0, 'search':1, 'chat':2, 'profile':3 };
    document.querySelectorAll('.nav-btn')[indexMap[pageId]].classList.add('active');

    // Rafraichir les grilles si besoin
    if(pageId === 'home') renderGrid(items, 'products-grid');
    if(pageId === 'search') renderGrid(items, 'search-results');
    if(pageId === 'profile') renderFavorites(); // Mise à jour des favoris
}

// --- RENDU DES CARTES ---
function renderGrid(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if(data.length === 0) { container.innerHTML = '<p style="color:#666; margin:20px;">Rien à afficher ici.</p>'; return; }

    data.forEach(item => {
        // Vérifier si l'objet est liké
        const isFav = favorites.includes(item.id);
        const heartClass = isFav ? 'fa-solid' : 'fa-regular'; // Plein ou Vide
        const btnClass = isFav ? 'liked' : ''; // Rouge ou Blanc

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <div class="card-top">
                <div class="user-badge">${item.user}</div>
                <div class="like-btn ${btnClass}" onclick="toggleLike(${item.id})">
                    <i class="${heartClass} fa-heart"></i>
                </div>
            </div>
            
            <img src="${item.img}" alt="${item.title}">
            
            <div class="card-info">
                <div class="card-title">${item.title}</div>
                <div class="card-price">${item.price}€ /jour</div>
                <button class="btn-rent" onclick="openBooking('${item.title}', ${item.price})">Louer</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// --- LOGIQUE FAVORIS ---
function toggleLike(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id); // Enlever
    } else {
        favorites.push(id); // Ajouter
    }
    
    // On met à jour l'affichage immédiatement
    const activePage = document.querySelector('.page-section[style*="block"]').id;
    if(activePage === 'page-home') renderGrid(items, 'products-grid');
    if(activePage === 'page-profile') renderFavorites();
}

function renderFavorites() {
    const favItems = items.filter(item => favorites.includes(item.id));
    renderGrid(favItems, 'favorites-grid');
}

// --- LOGIQUE DÉPÔT ANNONCE ---
function openCharter() { document.getElementById('modal-charter').style.display = 'block'; }
function goToPostForm() {
    closeModal('modal-charter');
    document.getElementById('modal-post').style.display = 'block';
}

function submitAd() {
    const title = document.getElementById('post-title').value;
    const price = document.getElementById('post-price').value;
    const cat = document.getElementById('post-cat').value;

    if(!title || !price) { alert("Merci de remplir le titre et le prix !"); return; }

    const newItem = {
        id: items.length + 1,
        title: title,
        price: parseInt(price),
        category: cat,
        user: "Stan (Moi)", 
        img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=80"
    };

    items.unshift(newItem); // Ajouter au début
    closeModal('modal-post');
    alert("🎉 Votre annonce est en ligne !");
    
    document.getElementById('post-title').value = '';
    document.getElementById('post-price').value = '';
    showPage('home'); 
}

// --- LOGIQUE NOTIFICATION ---
setTimeout(() => {
    document.getElementById('notif-badge').style.display = 'block';
    document.getElementById('new-msg').style.display = 'flex';
}, 3000); 

function readMessage() {
    document.getElementById('notif-badge').style.display = 'none';
    document.getElementById('new-msg').style.border = 'none';
    document.getElementById('new-msg').style.background = 'var(--card-glass)';
    document.querySelector('.badge-new').style.display = 'none';
}

// --- PROFIL TABS ---
function switchProfileTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    if (tab === 'reviews') {
        document.getElementById('tab-reviews').style.display = 'block';
        document.getElementById('tab-favorites').style.display = 'none';
    } else {
        document.getElementById('tab-reviews').style.display = 'none';
        document.getElementById('tab-favorites').style.display = 'block';
        renderFavorites();
    }
}

// --- AVIS STAN ---
const stanReviews = [
    { author: "Julie M.", text: "Stan est génial ! Matériel parfait.", date: "Il y a 2 jours" },
    { author: "Thomas L.", text: "Première location au top.", date: "Il y a 1 semaine" }
];
const reviewContainer = document.getElementById('reviews-list');
stanReviews.forEach(rev => {
    reviewContainer.innerHTML += `
        <div class="review-item">
            <div style="font-weight:bold; display:flex; justify-content:space-between;">
                ${rev.author} <span style="color:#fbbf24;">★★★★★</span>
            </div>
            <div style="font-size:13px; color:#ccc; margin-top:5px;">"${rev.text}"</div>
        </div>`;
});

// --- UTILS ---
function filterItems(cat) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = cat === 'all' ? items : items.filter(i => i.category === cat);
    renderGrid(filtered, 'products-grid');
}
function openBooking(title, price) {
    document.getElementById('book-title').innerText = title;
    document.getElementById('book-total').innerText = (price + 2) + "€ (inclus assurance)";
    document.getElementById('modal-booking').style.display = 'block';
}
function confirmPayment() { alert("Réservé !"); closeModal('modal-booking'); }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = function(e) { if(e.target.classList.contains('modal')) e.target.style.display = "none"; }

// Init
renderGrid(items, 'products-grid');
