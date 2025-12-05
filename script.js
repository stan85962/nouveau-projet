// --- RENDU DES CARTES (CORRIGÉ) ---
function renderGrid(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    
    if(data.length === 0) { 
        container.innerHTML = '<p style="color:#666; margin:20px;">Rien à afficher ici.</p>'; 
        return; 
    }

    data.forEach(item => {
        // On vérifie si l'item est dans les favoris
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
