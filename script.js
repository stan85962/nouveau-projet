// Simuler une base de données d'objets
const items = [
  {
    id: 1,
    title: "Perceuse à percussion",
    price: "15€ /jour",
    category: "bricolage",
    user: "Jean B.",
    img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "Appareil Photo Canon",
    price: "35€ /jour",
    category: "tech",
    user: "Sophie L.",
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Robe de soirée rouge",
    price: "40€ /3 jours",
    category: "mode",
    user: "Clara M.",
    img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Scie circulaire",
    price: "20€ /jour",
    category: "bricolage",
    user: "Marc D.",
    img: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80"
  },
   {
    id: 5,
    title: "Drone DJI Mini",
    price: "50€ /jour",
    category: "tech",
    user: "Lucas P.",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=400&q=80"
  }
];

const grid = document.getElementById('products-grid');

// Fonction pour afficher les objets
function displayItems(filter = 'all') {
  grid.innerHTML = ''; // On vide la grille avant de remplir
  
  items.forEach(item => {
    // Si le filtre est 'all' OU si la catégorie correspond
    if (filter === 'all' || item.category === filter) {
      
      const card = document.createElement('div');
      card.classList.add('card');
      
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="card-info">
          <div class="card-title">${item.title}</div>
          <div class="card-price">${item.price}</div>
          <div class="card-user">👤 Loué par ${item.user}</div>
          <button onclick="louer(${item.id})" style="width:100%; margin-top:10px; padding:8px; background:#007782; color:white; border:none; border-radius:4px; cursor:pointer;">Louer</button>
        </div>
      `;
      
      grid.appendChild(card);
    }
  });
}

// Fonction pour filtrer
function filterItems(category) {
  displayItems(category);
}

// Fonction simulation de location
function louer(id) {
  alert("Demande de location envoyée pour l'objet #" + id + " !");
}

// Lancer l'affichage au chargement
displayItems();
