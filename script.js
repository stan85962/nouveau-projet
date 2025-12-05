// --- DONNÉES AVANCÉES ---
const items = [
  { 
    id: 1, title: "Canon EOS R6 + 50mm", category: "tech", price: 45, deposit: 1200, 
    location: "Paris 11e", user: "Sophie L.", 
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 2, title: "Sac Gucci Dionysus", category: "mode", price: 60, deposit: 800, 
    location: "Lyon 2e", user: "Clara M.", 
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 3, title: "Drone DJI Mini 3 Pro", category: "tech", price: 30, deposit: 400, 
    location: "Bordeaux", user: "Marc D.", 
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 4, title: "Perceuse Colonne Pro", category: "maison", price: 20, deposit: 150, 
    location: "Paris 18e", user: "Jean B.", 
    img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 5, title: "Apple Vision Pro", category: "tech", price: 80, deposit: 3500, 
    location: "La Défense", user: "Lucas P.", 
    img: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?auto=format&fit=crop&w=500&q=80" 
  },
  { 
    id: 6, title: "Robe Soirée Soie", category: "mode", price: 40, deposit: 200, 
    location: "Lille", user: "Elena G.", 
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80" 
  }
];

// --- AFFICHAGE GRILLE AVEC LOGISTIQUE ---
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
        // On injecte les données dans le bouton louer pour les récupérer après
        card.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="card-info">
                <div class="card-top">
                    <div class="card-loc"><i class="fa-solid fa-location-dot"></i> ${item.location}</div>
                    <i class="fa-regular fa-heart like-btn" onclick="toggleLike(this)"></i>
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-bottom">
                    <div class="card-price">${item.price}€ <span style="font-size:12px; font-weight:400; color:#888;">/jour</span></div>
                    <div class="badge-protect"><i class="fa-solid fa-shield-halved"></i> Assuré</div>
                </div>
                <button class="btn-rent" onclick="openBooking(${item.id})">Réserver</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- GESTION DE LA RÉSERVATION (CHECKOUT) ---
function openBooking(itemId) {
    const item = items.find(i => i.id === itemId);
    const modal = document.getElementById("modal-booking");
    
    // Remplir les infos dynamiquement
    document.getElementById("book-title").innerText = item.title;
    document.getElementById("book-price").innerText = item.price + ".00€";
    document.getElementById("book-location").innerText = item.location;
    document.getElementById("book-deposit").innerText = item.deposit + "€";
    
    // Calcul total (Prix + 2€ Assurance)
    const total = item.price + 2;
    document.getElementById("book-total").innerText = total + ".00€";

    modal.style.display = "block";
}

function confirmPayment() {
    const modal = document.getElementById("modal-booking");
    modal.style.display = "none";
    
    // Simulation d'un chargement
    alert("✅ Paiement validé !\n\nL'empreinte de caution a été enregistrée.\nLe propriétaire a reçu votre demande.");
}

// --- NAVIGATION & UTILS ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const activeSection = document.getElementById('page-' + pageId);
    if(activeSection) activeSection.style.display = 'block';
    
    const btnIndex = ['home', 'search', 'chat', 'profile'].indexOf(pageId);
    if(btnIndex >= 0) document.querySelectorAll('.nav-btn')[btnIndex].classList.add('active');
    
    if(pageId === 'search') renderGrid(items, 'search-results');
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}
function openCharter() { document.getElementById("modal-charter").style.display = "block"; }

function filterItems(category) {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    const filtered = (category === 'all') ? items : items.filter(i => i.category === category);
    renderGrid(filtered, 'products-grid');
}

// Logique de recherche
const searchInput = document.getElementById('search-input');
if(searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = items.filter(i => i.title.toLowerCase().includes(term));
        renderGrid(filtered, 'search-results');
    });
}

// Init
renderGrid(items, 'products-grid');

// Fermeture des modales au clic extérieur
window.onclick = function(e) {
    if(e.target.classList.contains('modal')) e.target.style.display = "none";
}
function toggleLike(el) { el.classList.toggle('fa-solid'); el.classList.toggle('fa-regular'); el.classList.toggle('liked'); }
