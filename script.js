// --- DATA (Sérieuses) ---
const items = [
  { id: 1, title: "Canon EOS R6 + 50mm", category: "tech", price: 45, user: "Sophie L.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { id: 2, title: "Sac Gucci Dionysus", category: "mode", price: 65, user: "Clara M.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 3, title: "Drone DJI Mini 3", category: "tech", price: 30, user: "Marc D.", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" },
  { id: 4, title: "Skateboard Électrique", category: "loisir", price: 25, user: "Lucas P.", img: "https://images.unsplash.com/photo-1547447901-d8529938848d?auto=format&fit=crop&w=500&q=80" },
  { id: 5, title: "Casque VR Oculus", category: "tech", price: 40, user: "Alex T.", img: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?auto=format&fit=crop&w=500&q=80" },
  { id: 6, title: "Perceuse à Colonne", category: "tech", price: 20, user: "Jean B.", img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80" },
];

// --- AVIS POUR STAN ---
const reviews = [
    { author: "Julie M.", text: "Stan est super réactif. Matériel en état neuf.", stars: 5 },
    { author: "Thomas L.", text: "Première location et tout s'est bien passé.", stars: 5 },
    { author: "Sophie B.", text: "Je recommande à 100%.", stars: 4 }
];

let favorites = [];

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    const target = document.getElementById('page-' + pageId);
    if(target) target.style.display = 'block';

    const indexMap = { 'home':0, 'search':1, 'chat':2, 'profile':3 };
    if(document.querySelectorAll('.nav-item')[indexMap[pageId]]) {
        document.querySelectorAll('.nav-item')[indexMap[pageId]].classList.add('active');
    }

    if(pageId === 'home') renderGrid(items, 'products-grid');
    if(pageId === 'search') renderGrid(items, 'search-results');
    if(pageId === 'profile') {
        renderReviews();
        renderFavorites();
    }
}

// --- RENDER CARDS (MASONRY) ---
function renderGrid(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if(data.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Aucun objet trouvé.</p></div>';
        return;
    }

    data.forEach(item => {
        const isFav = favorites.includes(item.id);
        const heartClass = isFav ? 'liked' : '';
        const heartIcon = isFav ? 'fa-solid fa-heart' : 'fa-regular fa-heart';

        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <div class="card-image-wrapper">
                <div class="card-overlay">
                    <div class="seller-pill"><i class="fa-solid fa-user"></i> ${item.user}</div>
                    <div class="like-trigger ${heartClass}" onclick="toggleLike(${item.id})">
                        <i class="${heartIcon}"></i>
                    </div>
                </div>
                <img src="${item.img}" class="card-img">
            </div>
            <div class="card-details">
                <h3 class="card-title">${item.title}</h3>
                <div class="card-price">${item.price}€ <small>/jour</small></div>
                <button class="rent-action" onclick="openBooking('${item.title}', ${item.price})">Réserver</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// --- ACTIONS ---
function toggleLike(id) {
    if(favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
    } else {
        favorites.push(id);
    }
    const activePage = document.querySelector('.page-section[style*="block"]').id;
    if(activePage === 'page-home') renderGrid(items, 'products-grid');
    if(activePage === 'page-profile') renderFavorites();
    if(activePage === 'page-search') renderGrid(items, 'search-results');
}

function renderReviews() {
    const list = document.getElementById('reviews-list');
    list.innerHTML = '';
    reviews.forEach(rev => {
        let stars = '';
        for(let i=0; i<5; i++) stars += i < rev.stars ? '<i class="fa-solid fa-star" style="color:#fbbf24"></i>' : '<i class="fa-regular fa-star" style="color:#555"></i>';
        
        list.innerHTML += `
            <div style="background:var(--glass); padding:15px; border-radius:15px; margin-bottom:10px;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:5px;">
                    ${rev.author} <span>${stars}</span>
                </div>
                <div style="color:#ccc; font-size:14px;">"${rev.text}"</div>
            </div>
        `;
    });
}

function renderFavorites() {
    const favItems = items.filter(i => favorites.includes(i.id));
    const container = document.getElementById('favorites-grid');
    if(favItems.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fa-regular fa-heart"></i><p>Vous n\'avez aucun favori.</p></div>';
    } else {
        renderGrid(favItems, 'favorites-grid');
    }
}

// --- MODALS & FORMS ---
function openBooking(title, price) {
    document.getElementById('book-title').innerText = title;
    document.getElementById('book-total').innerText = (price + 2) + "€ (inclus assurance)";
    document.getElementById('modal-booking').style.display = 'block';
}
function confirmPayment() { 
    alert("Réservation confirmée ! Le propriétaire a été notifié."); 
    closeModal('modal-booking'); 
}

function submitAd() {
    const title = document.getElementById('post-title').value;
    const price = document.getElementById('post-price').value;
    const cat = document.getElementById('post-cat').value;
    
    if(!title || !price) return alert("Veuillez remplir les informations.");

    const newItem = {
        id: Date.now(),
        title: title,
        category: cat,
        price: parseInt(price),
        user: "Stan M.",
        img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=500&q=80"
    };
    
    items.unshift(newItem);
    closeModal('modal-post');
    document.getElementById('post-title').value = '';
    showPage('home');
}

// --- NOTIFICATION SIMULATION ---
setTimeout(() => {
    document.getElementById('notif-badge').style.display = 'block';
    document.getElementById('new-msg').style.display = 'flex';
}, 3000);

function readMessage() {
    document.getElementById('notif-badge').style.display = 'none';
    document.getElementById('new-msg').style.border = 'none';
    document.getElementById('new-msg').style.background = 'var(--glass)';
    document.querySelector('.unread-dot').style.display = 'none';
}

function filterItems(cat) {
    document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = cat === 'all' ? items : items.filter(i => i.category === cat);
    renderGrid(filtered, 'products-grid');
}

function switchTab(tab) {
    document.querySelectorAll('.tab-link').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('tab-reviews').style.display = tab === 'reviews' ? 'block' : 'none';
    document.getElementById('tab-favs').style.display = tab === 'favs' ? 'block' : 'none';
    if(tab === 'favs') renderFavorites();
}

function openCharter() { document.getElementById('modal-charter').style.display = 'block'; }
function goToPostForm() { closeModal('modal-charter'); document.getElementById('modal-post').style.display = 'block'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }
window.onclick = function(e) { if(e.target.classList.contains('modal-overlay')) e.target.style.display = "none"; };

// INIT
renderGrid(items, 'products-grid');
