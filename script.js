const items = [
  {
    id: 1,
    title: "Console PS5 + 2 manettes",
    price: "25€ /jour",
    category: "tech",
    user: "Alexandre G.",
    img: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Trotinette Électrique Xiaomi",
    price: "15€ /jour",
    category: "loisir",
    user: "Sarah M.",
    img: "https://images.unsplash.com/photo-1596727147705-54a9d03409a2?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Perceuse Bosch Pro",
    price: "12€ /jour",
    category: "bricolage",
    user: "Karim B.",
    img: "https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Drône DJI Mavic Air",
    price: "45€ /jour",
    category: "tech",
    user: "Julie P.",
    img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    title: "Casque VR Oculus Quest 2",
    price: "30€ /jour",
    category: "tech",
    user: "Thomas L.",
    img: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1ac?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    title: "GoPro Hero 10 Black",
    price: "20€ /jour",
    category: "tech",
    user: "Marie F.",
    img: "https://images.unsplash.com/photo-1564466136-1e62c0e86230?auto=format&fit=crop&w=500&q=80"
  }
];

const grid = document.getElementById('products-grid');

function displayItems(filter = 'all') {
  grid.innerHTML = '';
  
  items.forEach(item => {
    if (filter === 'all' || item.category === filter) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="card-info">
          <div class="card-title">${item.title}</div>
          <div class="card-price">${item.price}</div>
          <div class="card-user">Proposé par ${item.user}</div>
          <button class="btn-rent" onclick="louer(${item.id})">Réserver maintenant</button>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

function filterItems(category) {
    // Gestion visuelle des boutons actifs
    const buttons = document.querySelectorAll('.filters button');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    displayItems(category);
}

function louer(id) {
  alert("🚀 Demande envoyée pour l'objet #" + id + " !");
}

displayItems();
