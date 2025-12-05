// --- FONCTION: SWITCH DARK/LIGHT MODE ---
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    if (body.getAttribute('data-theme') === 'light') {
        body.setAttribute('data-theme', 'dark');
        icon.className = 'fa-solid fa-moon';
    } else {
        body.setAttribute('data-theme', 'light');
        icon.className = 'fa-solid fa-sun';
    }
}

// --- DATA ---
const items = [
  { id: 1, title: "Robe de Soirée (Pack 3 soirs)", category: "mode", price: 40, user: "Sophie L.", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=500&q=80" },
  { id: 2, title: "Montre Rolex Submariner", category: "mode", price: 150, user: "Stan M.", img: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=500&q=80" },
  { id: 3, title: "Canon EOS R6 + 50mm", category: "tech", price: 45, user: "Stan M.", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80" },
  { id: 4, title: "Sac Gucci Dionysus", category: "mode", price: 65, user: "Clara M.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80" },
  { id: 5, title: "Drone DJI Mini 3", category: "tech", price: 30, user: "Marc D.", img: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=500&q=80" },
  { id: 6, title: "Skateboard Électrique", category: "loisir", price: 25, user: "Lucas P.", img: "https://images.unsplash.com/photo-1547447901-d8529938848d?auto=format&fit=crop&w=500&q=80" },
];

const reviews = [
    { author: "Julie M.", text: "La robe était magnifique, merci Stan !", stars: 5 },
    { author: "Thomas L.", text: "La montre est incroyable. Super expérience.", stars: 5 },
    { author: "Sophie B.", text: "Je recommande à 100%.", stars: 4 }
];

let favorites = [];

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page-section').forEach
