// --- DONNÉES ---
const items = [
  { id: 1, title: "Canon EOS R6", category: "tech", price: "45€", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { id: 2, title: "Sac Gucci Dionysus", category: "mode", price: "60€", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 3, title: "Drone DJI Mini 3", category: "tech", price: "30€", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" },
  { id: 4, title: "Perceuse Colonne", category: "maison", price: "20€", img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80" },
  { id: 5, title: "Apple Vision Pro", category: "tech", price: "80€", img: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?auto=format&fit=crop&w=500&q=80" },
  { id: 6, title: "Robe Soirée Soie", category: "mode", price: "40€", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80" }
];

// --- NAVIGATION ENTRE LES PAGES ---
function showPage(pageId) {
    // 1. Cacher toutes les sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active');
    });

    // 2. Enlever la classe 'active' de tous les boutons nav
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. Afficher la section demandée
    const activeSection = document.getElementById('page-' + pageId);
    if(activeSection) {
        activeSection.style.display = 'block';
        setTimeout(() => activeSection.classList.add('active'), 10); // Petit délai pour anim
    }

    // 4. Activer le bouton correspondant (simple hack visuel)
    const btnIndex = ['home', 'search', 'chat', 'profile'].indexOf(pageId);
    if(btnIndex >= 0) {
        document.querySelectorAll('.nav-btn')[btnIndex].classList.add('active');
    }

    // Cas particulier : si on va sur Recherche, on charge tous les items
    if(pageId === 'search') {
        renderGrid(items, 'search-results');
    }
}

// --- AFFICHAGE DES ITEMS (Fonction Générique) ---
function renderGrid(dataList, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if(dataList.length === 0) {
        container.innerHTML = '<p style="color:#666; width:100%;">Aucun résultat trouvé.</p>';
        return;
    }

    dataList.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="card-info">
                <div class="card-top">
                    <span class="card-cat">${item.category}</span>
                    <i class="fa-regular fa-heart like-btn" onclick="toggleLike(this)"></i>
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-price">${item.price} /jour</div>
                <button class="btn-rent" onclick="louer()">Réserver</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- LOGIQUE HOME (Filtres) ---
function filterItems(category) {
    // Gestion boutons actifs
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    const filtered = (category === 'all') ? items : items.filter(i => i.category === category);
    renderGrid(filtered, 'products-grid');
}

// --- LOGIQUE RECHERCHE ---
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = items.filter(item => item.title.toLowerCase().includes(term));
    renderGrid(filtered, 'search-results');
});

// --- LOGIQUE LIKE ---
function toggleLike(element) {
    // Bascule entre cœur vide (fa-regular) et cœur plein (fa-solid)
    if(element.classList.contains('fa-regular')) {
        element.classList.remove('fa-regular');
        element.classList.add('fa-solid', 'liked');
    } else {
        element.classList.remove('fa-solid', 'liked');
        element.classList.add('fa-regular');
    }
}

// --- ACTIONS DIVERSES ---
function louer() { alert("Demande envoyée !"); }

// Modal Charte
const modal = document.getElementById("modal-charter");
function openCharter() { modal.style.display = "block"; }
function closeCharter() { modal.style.display = "none"; }
function acceptCharter() { closeCharter(); showPage('profile'); } // Redirige vers profil après acceptation
window.onclick = function(e) { if(e.target == modal) closeCharter(); }

// Init : Charger la Home
renderGrid(items, 'products-grid');
